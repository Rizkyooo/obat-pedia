import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/navbar";
import BottomNav from "@/components/bottomNav";
import Footer from "@/components/footer";
const inter = Inter({ subsets: ["latin"] });
import { getUserFromDatabase } from "@/services/getUserFromDatabase";
import { getUser } from "@/libs/actions";
import SetOnlineUser from "@/components/SetOnlineUser";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "obat pedia",
  description: "website edukasi obat-obatan terlengkap",
};

export default async function RootLayout({ children }) {
  const role = await getUser();  const user = await getUserFromDatabase(role?.user_metadata?.role || 'pengguna');
  console.log(user);
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#f6f8fd]`}>
        <Providers>
          <SetOnlineUser userId={user?.id} role={user?.role}/>
            <Header
              user={user}
              name={user?.nama}
              avatar_url={user?.picture}
            />
          <BottomNav />
          {children}
          <Footer />
        </Providers>
        <Toaster/>
      </body>
    </html>
  );
}
