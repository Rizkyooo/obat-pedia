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
    // Meminta izin notifikasi dari pengguna
    Notification.requestPermission();
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

        // If userId does not exist, return early
        if (!userId) return;

        // Fetch all messages involving the current user as sender or receiver
        const { data: receivedMessages, error } = await supabase
          .from("messages")
          .select("*")
          .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching received messages:", error.message);
          return [];
        }

        // Extract sender IDs from received messages
        const senderIds = receivedMessages
          .map((msg) => msg.sender_id)
          .filter(
            (value, index, self) =>
              self.indexOf(value) === index && value !== userId
          );

        // Fetch profiles of senders
        const { data: senderProfiles, error: profileError } = await supabase
          .from("apoteker")
          .select("*")
          .in("id", senderIds);

        if (profileError) {
          console.error(
            "Error fetching sender profiles:",
            profileError.message
          );
          return [];
        }

        // Combine messages with sender profiles
        const messagesWithProfiles = receivedMessages.map((msg) => {
          const senderProfile = senderProfiles.find(
            (profile) =>
              profile.id === msg.sender_id || profile.id === msg.receiver_id
          );
          return {
            ...msg,
            senderProfile,
          };
        });

        // Create a map to store the latest message for each conversation
        const latestMessages = {};

        messagesWithProfiles.forEach((msg) => {
          const otherUserId =
            msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
          if (
            !latestMessages[otherUserId] ||
            new Date(msg.created_at) >
              new Date(latestMessages[otherUserId].created_at)
          ) {
            latestMessages[otherUserId] = msg;
          }
        });

        // Convert the map to an array of messages
        const latestMessagesArray = Object.values(latestMessages);

        // Log the result

        setMessages(latestMessagesArray);

        // Subscribe untuk update real-time dari tabel messages
        const subscription = supabase
          .channel("message")
          .on(
            "postgres_changes",
            { event: "INSERT", schema: "public", table: "messages" },
            (payload) => {
              const newMessage = payload.new;
              console.log(newMessage);
              if (
                newMessage?.receiver_id === userId ||
                newMessage?.sender_id === userId
              ) {
                // Find sender's profile
                const senderProfile = senderProfiles.find(
                  (profile) => profile.id === newMessage.sender_id
                );

                // Update messages state with new message and sender's profile
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
                console.log(newMessage);
                if(newMessage?.receiver_id === userId){
                  toast('pesan baru: '+newMessage?.message, {duration: 3000});
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
    fetchUser();
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

  async function fetchUser() {
    const user = await getUser();
    setUserId(user?.id);
  }

  const [userId, setUserId] = useState(null);
 
  const isChatPath = pathname === "/tanya-apoteker/chat";

  
  const memoizedMessages = useMemo(() => messages, [messages]);
  if ((isChatPath && !isMobile) || (!isChatPath && !isMobile)) {
    return <ListApoteker userId={userId} messages={memoizedMessages} />;
  }
  if (isChatPath && isMobile) {
    return <ListApoteker userId={userId} messages={memoizedMessages} />;
  }
  return null;
}
