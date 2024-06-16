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
  title: "Spotify Clone: Your Ultimate Music Hub",
  description:
    "Spotify is a cutting-edge music streaming platform that brings your favorite songs, albums, and artists right to your fingertips. With an extensive library of music from various genres and personalized recommendations, Spotify ensures a seamless listening experience. Create and share playlists, discover new music, and enjoy high-quality audio on any device. Dive into the world of music with Spotify, where your soundtrack is always playing.",
  openGraph: {
    title: "Spotify Clone: Your Ultimate Music Hub",
    description:
      "Spotify is a cutting-edge music streaming platform that brings your favorite songs, albums, and artists right to your fingertips. With an extensive library of music from various genres and personalized recommendations, Spotify ensures a seamless listening experience. Create and share playlists, discover new music, and enjoy high-quality audio on any device. Dive into the world of music with Spotify, where your soundtrack is always playing.",
    type: "website",
    locale: "en_IN",
    url: "https://spotify-iota-three.vercel.app/",
    siteName: "Spotify Clone",
    images: [
      {
        url: "https://github.com/psykat1116/Spotify/blob/master/public/OpenGraph.png?raw=true",
        width: 1200,
        height: 630,
        alt: "Spotify Clone: Your Ultimate Music Hub",
      },
    ],
  },
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
            <ModelProvider products={products} />
            <Sidebar songs={userSong}>{children}</Sidebar>
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
