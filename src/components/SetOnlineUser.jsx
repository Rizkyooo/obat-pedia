'use client'
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
export default function SetOnlineUser({userId, role}) {
  const [onlineStatus, setOnlineStatus] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const roomOne = supabase.channel('apoteker');

    roomOne.subscribe(async (status) => {
      console.log('UserId for subscribe:', userId)
      if (status !== 'SUBSCRIBED') return;
        await roomOne.track({
          user: userId,
          online_at: new Date().toISOString(),
        });
    });
  
    roomOne.on('presence', { event: 'sync' }, () => {
      const newState = roomOne.presenceState();
      console.log('sync', newState);

      // Loop through presence state keys
      const newOnlineStatus = [];

      for (const key in newState) {
        const userId = newState[key][0].user;
        newOnlineStatus.push(userId);
      }
      updateOnlineStatus(true, newOnlineStatus[0]);

      console.log('newOnlineStatus', newOnlineStatus[0]);
      setOnlineStatus(newOnlineStatus[0]); 
    });

    const updateOnlineStatus = async (isOnline, id) => {
      const roles = role ? role : 'pengguna';
      console.log('Updating online status for:', { roles, id, isOnline });
      const { data, error, status, statusText } = await supabase
        .from(roles)
        .update({ is_online: isOnline })
        .eq('id', id);

      if (error || !data) {
        console.error('Error updating online status:', { error, data, status, statusText });
      } else {
        console.log('Online status updated:', data);
      }
    };

    return () => {
      roomOne.untrack();
      updateOnlineStatus(false, userId);
    };
  }, [userId, role]);

  return (
    <div></div>
  );
}
