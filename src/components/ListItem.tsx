"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface ListItemProps {
  image: string;
  name: string;
  href: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
  const router = useRouter();

  const OnClick = () => {
    // Add Authentication Before Push
    router.push(href);
  };

  return (
    <button className="relative group flex items-center rounded-md overflow-hidden hover:bg-neutral-100/20 bg-neutral-100/10 gap-x-4 transition pr-4" onClick={OnClick}>
      <div className="relative min-h-[64px] min-w-[64px]">
        <Image className="object-cover" fill alt="image" src={image} />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div className="absolute transtion opacity-0 rounded-full flex items-center justify-center bg-green-500 p-3 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110 text-sm">
        <FaPlay className="text-black"/>
      </div>
    </button>
  );
};

export default ListItem;
