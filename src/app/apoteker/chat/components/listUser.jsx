"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import ListApoteker from "./listApoteker";
import { createClient } from "@/utils/supabase/client";
import { getUser } from "@/libs/actions";

import toast from "react-hot-toast";

export default function ListUser() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const supabase = createClient();
  useEffect(() => {
    if (window.Notification && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);
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

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    async function fetchConversations() {
      try {
        // Fetch user ID
        const user = await getUser();
        const userId = user?.id;
        setUserId(userId);
  
        // If userId does not exist, return early
        if (!userId) return;
  
        // Fetch messages and sender profiles concurrently
        const [{ data: receivedMessages, error: messagesError }, { data: senderProfiles, error: profileError }] = await Promise.all([
          supabase
            .from("messages")
            .select("*")
            .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
            .order("created_at", { ascending: false }),
          supabase
            .from("pengguna")
            .select("*")
            .neq("id", userId)
        ]);
  
        if (messagesError) {
          console.error("Error fetching received messages:", messagesError.message);
          return [];
        }
  
        if (profileError) {
          console.error("Error fetching sender profiles:", profileError.message);
          return [];
        }
  
        // Combine messages with sender profiles
        const messagesWithProfiles = receivedMessages.map((msg) => {
          const senderProfile = senderProfiles.find(
            (profile) => profile.id === msg.sender_id || profile.id === msg.receiver_id
          );
          return {
            ...msg,
            senderProfile,
          };
        });
  
        // Create a map to store the latest message for each conversation
        const latestMessages = messagesWithProfiles.reduce((acc, msg) => {
          const otherUserId = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
          if (!acc[otherUserId] || new Date(msg.created_at) > new Date(acc[otherUserId].created_at)) {
            acc[otherUserId] = msg;
          }
          return acc;
        }, {});
  
        // Convert the map to an array of messages
        const latestMessagesArray = Object.values(latestMessages);
        setMessages(latestMessagesArray);
  
        // Subscribe to real-time updates from the messages table
        const subscription = supabase
          .channel("message")
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "messages" },
            (payload) => {
              const newMessage = payload.new;
              if (newMessage.receiver_id === userId || newMessage.sender_id === userId) {
                const senderProfile = senderProfiles.find(
                  (profile) => profile.id === newMessage.sender_id
                );
                setMessages((prevMessages) => [
                  ...prevMessages,
                  {
                    ...newMessage,
                    senderProfile: {
                      id: senderProfile?.id,
                      nama: senderProfile?.nama,
                      picture: senderProfile?.picture,
                    },
                  },
                ]);
                if (newMessage.receiver_id === userId) {
                  showNotification(newMessage);
                }
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
  

  const showNotification = (message) => {
    console.log(message); 
    if (Notification.permission === "granted") {
      const notification = new Notification('New Message', {
        body: `pesan: ${message?.message}`,
        icon: message?.senderProfile?.picture || 'https://example.com/default-profile-picture.png', // Ganti dengan URL gambar profil jika ada
      });
  
      // Atur event listener jika pengguna mengklik notifikasi
      notification.onclick = () => {
        // Implementasikan navigasi atau tindakan yang sesuai saat notifikasi diklik
        console.log('Notification clicked');
      };
    }
  };

  const [userId, setUserId] = useState(null);
 
  const isChatPath = pathname === "/apoteker/chat";

  
  const memoizedMessages = useMemo(() => messages, [messages]);
  if ((isChatPath && !isMobile) || (!isChatPath && !isMobile)) {
    return <ListApoteker userId={userId} messages={memoizedMessages} />;
  }
  if (isChatPath && isMobile) {
    return <ListApoteker userId={userId} messages={memoizedMessages} />;
  }
  return null;
}
