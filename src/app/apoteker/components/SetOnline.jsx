'use client'
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
export default function SetOnline({userId, role}) {
  const [onlineStatus, setOnlineStatus] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const roomOne = supabase.channel('tanya-apoteker');

    roomOne.subscribe(async (status) => {
      console.log(userId)
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

  // Loop through presence state keys
  for (const key in newState) {
    // Get the user ID for each presence state key
    const userId = newState[key][0].user; // Assuming newState[key][0].user contains the user ID
    newOnlineStatus.push(userId); // Push the user ID to newOnlineStatus array
  }
  updateOnlineStatus(true, newOnlineStatus[0]);

  console.log('newOnlineStatus', newOnlineStatus[0]);
  setOnlineStatus(newOnlineStatus[0]); 
    });


const updateOnlineStatus = async (isOnline, id) => {
      const { data, error } = await supabase
        .from(role)
        .update({ is_online: isOnline })
        .eq('id', id); // Ganti dengan kriteria yang sesuai dengan pengguna yang sedang online

      if (error) console.error('Error updating online status:', error);
    };

    return () => {
      roomOne.untrack();
      updateOnlineStatus(false, userId);
    };
  }, [userId]);


  
  return (
    <div></div>
  );
}
