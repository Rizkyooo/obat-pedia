"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ListApoteker from "./listApoteker";
import { createClient } from "@/utils/supabase/client";
import { getUser } from "@/libs/actions";

export default function ListUser() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const supabase = createClient();
const [checkSender, setCheckSender]  = useState()
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640); // Tailwind's sm breakpoint is 640px
    };

    // Check initial screen size
    handleResize();

    // Add event listener to handle window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Logging for debugging purposes
  useEffect(() => {
    console.log("Current Path:", pathname);
    console.log("Is Mobile:", isMobile);
  }, [pathname, isMobile]);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchConversations() {
      try {
        const user = await getUser();
        const userId = user?.id;
        if (!userId) return;

        // Ambil semua pesan yang melibatkan pengguna saat ini sebagai penerima
        const { data: receivedMessages, error } = await supabase
          .from("messages")
          .select("*")
          .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching received messages:", error.message);
          return [];
        }

        // Ambil pengirim pesan unik dari pesan yang diterima
        const uniqueSenders = Array.from(
          new Set(receivedMessages.map((msg) => msg.sender_id))
        );

        // Ambil pesan terbaru dari setiap pengirim
        const latestMessages = await Promise.all(
          uniqueSenders.map(async (senderId) => {
            // Query untuk mencari pesan terakhir dari sender ke user saat ini
            const { data: latestMessageSender } = await supabase
              .from("messages")
              .select("*")
              .eq("sender_id", senderId)
              .order("created_at", { ascending: false })
              .limit(1)
              .single();

            // Query untuk mencari pesan terakhir dari user saat ini kepada sender
            const { data: latestMessageReceiver } = await supabase
              .from("messages")
              .select("*")
              .eq("receiver_id", senderId)
              .order("created_at", { ascending: false })
              .limit(1)
              .single();

              console.log(latestMessageSender, latestMessageReceiver);

              const latestMessage = latestMessageReceiver&&latestMessageSender!==null? (latestMessageSender?.created_at > latestMessageReceiver?.created_at ? latestMessageSender : latestMessageReceiver): latestMessageSender;

              const latestMessagex = latestMessageSender || latestMessageReceiver;
              console.log("Selected latest message:", latestMessage);
              console.log(latestMessagex)
              return latestMessagex;
          })
        );

        // Filter pesan yang tidak null (tidak ada pesan terbaru dari sender ke user saat ini)
        const filteredMessages = latestMessages.filter((msg) => msg !== null);

        console.log(filteredMessages);

        // Ambil informasi pengguna (user) berdasarkan sender_id dari pesan-pesan terbaru

        const usersData = await Promise.all(
          filteredMessages.map(async (message) => {
            console.log(message?.sender_id===userId);
            if(message?.sender_id===userId){
              setCheckSender(message?.receiver_id)
            }else{
              setCheckSender(message?.sender_id)
            }
            const { data: userData, error: userError } = await supabase
              .from("pengguna")
              .select("id, nama, picture")
              .or(`id.eq.${message?.sender_id},id.eq.${message?.receiver_id}`)
              .single();

            if (userError) {
              console.error(
                `Error fetching user data for user ID ${checkSender}:`,
                userError.message
              );
              return null;
            }

            console.log(userData);
            return userData;
          })
        );

        // Gabungkan informasi pengguna dengan pesan-pesan terbaru
        const messagesWithUsers = filteredMessages.map((msg, index) => ({
          ...msg,
          sender_name: usersData[index]?.nama,
          sender_picture: usersData[index]?.picture,
        }));

        console.log(messagesWithUsers);

        setMessages(messagesWithUsers);

        // Subscribe untuk update real-time dari tabel messages
        const subscription = supabase
          .channel("message")
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "messages" },
            (payload) => {
              const newMessage = payload.new;
              console.log(newMessage);
              if (newMessage?.receiver_id === userId || newMessage?.sender_id === userId) {
                // Jika pesan baru diterima, perbarui state messages
                setMessages((prevMessages) => [
                  ...prevMessages,
                  {
                    ...newMessage,
                    sender_name: usersData?.find(
                      (user) => user?.id === newMessage?.sender_id
                    )?.nama,
                    sender_picture: usersData?.find(
                      (user) => user?.id === newMessage?.sender_id
                    )?.picture,
                  },
                ]);
              }
            }
          )
          .subscribe();

        // Cleanup subscription
        return () => {
          supabase.removeChannel(subscription);
        };
      } catch (error) {
        console.error("Error fetching conversations:", error.message);
      }
    }

    fetchConversations();
  }, [messages]);
  console.log(messages);
  

  const [userId, setUserId] = useState(null);
  useEffect(()=>{
    async function fetchUser(){
      const user = await getUser();
      setUserId(user.id);
    }

    fetchUser();

  },[])

  // Conditional rendering based on path and screen size
  const isChatPath = pathname === "/apoteker/chat";

  

  if ((isChatPath && !isMobile) || (!isChatPath && !isMobile)) {
    return <ListApoteker userId={userId} messages={messages} />;
  }
  if (isChatPath && isMobile) {
    return <ListApoteker userId={userId} messages={messages} />;
  }
  return null;
}
