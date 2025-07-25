'use client';
import { createClient } from "@/utils/supabase/client";
import { Badge, Button, Input, User } from "@heroui/react";
import { ArrowLeft, Send } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { originalDate } from "@/utils/timeZone";
export default function Chat({ id, userId }) {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const scrollRef = useRef(null);
  const supabase = useMemo(() => createClient(), []);

  const fetchUser = useCallback(async (id) => {
    if (!id) return null;
    const { data, error } = await supabase
      .from("pengguna")
      .select("*")
      .eq("id", id)
      .single();
    if (error) {
      console.error(error);
      return null;
    }
    return data;
  }, [supabase]);

  const getMessages = useCallback(async (userId, id) => {
    if (!userId || !id) return [];
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`and(sender_id.eq.${userId},receiver_id.eq.${id}),and(sender_id.eq.${id},receiver_id.eq.${userId})`)
      .order('created_at', { ascending: true });
    if (error) {
      console.error(error);
      throw new Error(error.message);
    }
    return data;
  }, [supabase]);

  const sendAutomaticReply = useCallback(async () => {
    const { error } = await supabase
      .from("messages")
      .insert([{ receiver_id: userId, message: "Terima kasih telah menghubungi kami. Mohon tunggu sebentar, chat Anda akan segera kami balas 😇", sender_id: id }]);
    if (error) {
      console.error("Error sending automatic reply:", error.message);
    }
  }, [supabase, id, userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, messagesData] = await Promise.all([
          fetchUser(id),
          getMessages(userId, id)
        ]);
        setUser(userData);
        setMessages(messagesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    const channel = supabase
      .channel('messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        if ((payload.new.sender_id === userId && payload.new.receiver_id === id) ||
          (payload.new.sender_id === id && payload.new.receiver_id === userId)) {
          setMessages((prevMessages) => [...prevMessages, payload.new]);
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchUser, getMessages, id, supabase, userId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = useCallback(async () => {
    if (inputMessage.trim() === "") return;

    // const pharmacistReplied = messages.some(message => message.sender_id === id);

    const { error } = await supabase
      .from("messages")
      .insert([{ receiver_id: id, message: inputMessage, sender_id: userId }]);
    if (error) {
      console.error("Error sending message:", error.message);
      return;
    }
    setInputMessage("");

    // if (!pharmacistReplied) {
    //   await sendAutomaticReply();
    // }
  }, [inputMessage, messages, supabase, id, userId]);

  const memoizedMessages = useMemo(() => messages, [messages]);
  const memoizedUser = useMemo(() => user, [user]);

  // const formattedDate = format(artikel?.created_at, 'dd MMM yyyy ', { timeZone });
  

  return (
    <div className="flex flex-col max-h-screen">
      <div className="px-4 z-50 sticky top-0 py-2 bg-white flex gap-1 items-center">
        <div className="flex gap-1 items-center py-2">
          <div onClick={() => window.history.back()}>
            <ArrowLeft size={37} cursor={"pointer"} className="sm:hidden text-[#EE0037]" />
          </div>
          <Badge className={`${memoizedUser?.is_online ? "block" : "hidden"}`} content="" color={`${memoizedUser?.is_online ? "success" : ""}`} shape={`${memoizedUser?.is_online ? "circle" : ""}`} placement={`${memoizedUser?.is_online ? "bottom-left" : ""}`}>
          <User
            name={<p className="text-md">{memoizedUser?.nama}</p>}
            avatarProps={{
              src: memoizedUser?.picture || "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=",
              size: "md",
            }}
          />
          </Badge>
        </div>
      </div>
      
      <div ref={scrollRef} className="overflow-y-scroll mb-4 h-screen bg-slate-100 border-l-1 flex justify-center">
        <div className="w-full flex pt-9 flex-col items-center">
          {memoizedMessages.map((msg, index) => (
            <div key={index} className={`relative ${msg?.sender_id === userId ? "self-end bg-blue-500 text-white" : "self-start bg-white text-black"} text-sm max-w-[50%] px-2 py-1 rounded-lg shadow-md mb-4 ${msg?.sender_id === userId ? "mr-4" : "ml-4"}`}>
              <p className="text-sm pt-1">{msg?.message}</p>
              <p className="text-[0.55rem] px-2 self-end"> {originalDate(msg?.created_at)}</p>
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
        <Button                       color="primary" startContent={<Send size={20} />} size="md" onClick={handleSendMessage}></Button>
      </div>
    </div>
  );
}
