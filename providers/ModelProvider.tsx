"use client";
import { useState, useEffect } from "react";
import AuthModel from "@/components/AuthModel";
import UploadModal from "@/components/UploadModal";

const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <UploadModal />
      <AuthModel />
    </>
  );
};

export default ModelProvider;

