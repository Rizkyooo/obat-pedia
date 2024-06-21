"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import ListApoteker from "./listApoteker";
import { createClient } from "@/utils/supabase/client";

export default function ListUser() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const supabase = createClient();

  // Check screen size on initial render and window resize
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
    const fetchMessages = async () => {
      // Fetch messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (messagesError) {
        console.error(messagesError);
        return;
      }

      // Extract unique user IDs
      const userIds = [...new Set([
        ...messagesData.map((msg) => msg.sender_id),
        ...messagesData.map((msg) => msg.receiver_id)
      ])];
      console.log(userIds);

      // Fetch user data
      const { data: usersData, error: usersError } = await supabase
        .from('apoteker')
        .select('*')
        .in('id', userIds);

      if (usersError) {
        console.error(usersError);
        return;
      }
      console.log(usersData, messagesData);

      // Create a mapping of user IDs to names
      const usersMap = usersData.reduce((acc, user) => {
        acc[user?.id] = user?.nama;
        console.log(acc);
        return acc;
      }, {});

      // Count messages per sender
      const messageCounts = messagesData.reduce((acc, curr) => {
        acc[curr.sender_id] = (acc[curr.sender_id] || 0) + 1;
        console.log(Object.values(acc).reduce((sum, count) => sum + count, 0));
        return acc
      }, {});

      // Get the latest message for each sender
      const latestMessages = messagesData.reduce((acc, curr) => {
        if (!acc[curr.sender_id]) {
          acc[curr.sender_id] = {
            message: curr.message,
            senderName: usersMap[curr.sender_id],
            receiverName: usersMap[curr.receiver_id],
            senderId: curr.sender_id,
            senderPicture: usersData.find(user => user.id === curr.sender_id)?.picture,
          };
        }
        console.log(acc);
        return acc;
      }, {});
      const totalMessages = Object.values(messageCounts).reduce((sum, count) => sum + count, 0);

      // Prepare the final response
      const response = Object.keys(latestMessages).map((senderId) => ({
        sender_name: latestMessages[senderId].senderName,
        receiver_name: latestMessages[senderId].receiverName,
        last_message: latestMessages[senderId]?.message,
        message_count: messageCounts[senderId],
        sender_id: senderId,// Correctly referencing senderId here
        sender_picture: latestMessages[senderId].senderPicture,
      }));

      console.log(response);
      setMessages(response);
    };

    fetchMessages();
  }, []);

  // Conditional rendering based on path and screen size
  const isChatPath = pathname === "/tanya-apoteker/chat";

  if ((isChatPath && !isMobile) || (!isChatPath && !isMobile)) {
    return <ListApoteker messages={messages} />;
  }
  if (isChatPath && isMobile) {
    return <ListApoteker messages={messages} />;
  }
  return null;
}
