import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "../../providers/SupabaseProvider";
import UserProvider from "../../providers/UserProvider";
import ModelProvider from "../../providers/ModelProvider";
import ToasterProvider from "../../providers/ToasterProvider";
import getSongsByUserId from "../../actions/getSongsByUserId";
import Player from "@/components/Player";
import getActiveProductsWithPrices from "../../actions/getActiveProductsWithPrices";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify Clone - The Best Platform For Music Lovers",
  description: "Listen To Music For Free.",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSong = await getSongsByUserId();
  const products = await getActiveProductsWithPrices();
  return (
    <html lang="en">
      <body className={figtree.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModelProvider products={products}/>
            <Sidebar songs={userSong}>{children}</Sidebar>
            <Player/>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
