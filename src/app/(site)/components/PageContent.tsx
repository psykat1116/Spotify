"use client";
import React from "react";
import { Song } from "../../../../types";
import SongItem from "./SongItem";

interface PageContentProps {
  songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({ songs }) => {
  if (songs.length === 0)
    return <div className="mt-4 text-neutral-400">No songs found</div>;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4">
      {songs.map((song) => {
        return <SongItem key={song.id} onClick={() => {}} data={song} />;
      })}
    </div>
  );
};

export default PageContent;
