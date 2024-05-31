import { createClient } from "@/utils/supabase/client";
export const getUserWithRole = async (userId) => {

    const supabase = createClient();
    try {

      let { data: pengguna, error: penggunaError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
    
        if (penggunaError) {
            throw penggunaError
          }
    
      if (pengguna) {
        console.log(pengguna)
        return pengguna;
      }
    } catch (error) {
        console.log(error)
        
    }

        


  

  return null;

}