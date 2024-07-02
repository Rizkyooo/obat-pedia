'use client';
import { createClient } from "@/utils/supabase/client";
import { Button, Input, User } from "@nextui-org/react";
import { ArrowLeft, Send } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { format } from 'date-fns';
import { id as localeID } from "date-fns/locale";
import { useRouter } from "next/navigation";

export default function Chat({ id, userId }) {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const scrollRef = useRef(null);
  const supabase = createClient();

  async function fetchUser(id) {
    try {
      console.log(id);
      if (!id) return;
      const { data, error } = await supabase
        .from("apoteker")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        return console.log(error);
      }
      if (data) {
        console.log(data);
        setUser(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function getMessages(userId, id) {
    if (!userId || !id) return;
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`and(sender_id.eq.${userId},receiver_id.eq.${id}),and(sender_id.eq.${id},receiver_id.eq.${userId})`)
      .order('created_at', { ascending: true });
    if (error) {
      console.log(error);
      throw new Error(error?.message);
    }
    console.log(data);
    setMessages(data);
  }

  async function sendAutomaticReply() {
    const { data, error } = await supabase
      .from("messages")
      .insert([{ receiver_id: userId, message: "Terima kasih telah menghubungi kami. Mohon tunggu sebentar, chat Anda akan segera kami balas 😇", sender_id: id }]);
    if (error) {
      console.error("Error sending automatic reply:", error?.message);
    }
  }

  useEffect(() => {
    fetchUser(id);
    getMessages(userId, id);

    const channel = supabase
      .channel('messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        if ((payload?.new?.sender_id === userId && payload?.new?.receiver_id === id) ||
          (payload?.new?.sender_id === id && payload?.new?.receiver_id === userId)) {
          setMessages((prevMessages) => [...prevMessages, payload?.new]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, userId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const memoizedMessages = useMemo(() => messages, [messages]);
  const memoizeUser = useMemo(() => user, [user]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() === "") return;

    const pharmacistReplied = messages.some(message => message.sender_id === id);

    const { data, error } = await supabase
      .from("messages")
      .insert([{ receiver_id: id, message: inputMessage, sender_id: userId }]);
    if (error) {
      console.error("Error sending message:", error?.message);
      return;
    }

    setInputMessage("");

    if (!pharmacistReplied) {
      await sendAutomaticReply();
    }
  };

  const router = useRouter();

  return (
    <div className="flex flex-col" style={{ height: "calc(100vh - 65px)" }}>
      <div className="px-4 z-50 sticky top-0 py-2 bg-white flex gap-1 items-center">
        <div className="flex gap-1 items-center py-2">
          <div onClick={() => router.push("/tanya-apoteker/chat")}>
            <ArrowLeft size={37} cursor={"pointer"} className="sm:hidden text-[#EE0037]" />
          </div>
          <User
            name={(<p className="text-md">{user?.nama}</p>)}
            avatarProps={{
              src:
              user?.picture ||
                "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
              size: "md",
            }}
          />
        </div>
      </div>

      <div ref={scrollRef} className="overflow-y-scroll mb-4 scroll-smooth h-screen bg-slate-100 border-l-1 flex justify-center">
        <div className="w-full flex pt-9 flex-col items-center">
          {messages.map((msg, index) => (
            <div key={index} className={`relative ${msg?.sender_id === userId ? "self-end bg-[#EE0037] text-white" : "self-start bg-white text-black"} text-sm max-w-[50%] px-2 py-1 rounded-lg shadow-md mb-4 ${msg.sender_id === userId ? "mr-4" : "ml-4"}`}>
              <p className="text-sm pt-1">{msg?.message}</p>
              <p className="text-[0.55rem] px-2 self-end">{format(new Date(msg.created_at), "HH:mm", { locale: localeID })}</p>
              <div className={`absolute top-0 ${msg?.sender_id === userId ? "right-[-8px] border-l-[#EE0037]" : "left-[-8px] border-r-white"} w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent`}></div>
            </div>
          ))}
        </div>
      </div>

      <div className="justify-center items-center w-full sticky flex bottom-2 gap-1 px-2 bg-gray-100">
        <Input
          className="bg-white rounded-full"
          type="text"
          variant="bordered"
          placeholder="masukkan pesan"
          size="lg"
          color="default"
          fullWidth
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <Button color="danger" startContent={<Send size={20} />} size="md" onClick={handleSendMessage}></Button>
      </div>
    </div>
  );
}
