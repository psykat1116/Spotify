"use client";
import { useState, useEffect } from "react";
import AuthModel from "@/components/AuthModel";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";
import { ProductWithPrice } from "../types";

interface ModelProviderProps {
  products: ProductWithPrice[];
}

const ModelProvider: React.FC<ModelProviderProps> = ({ products }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <UploadModal />
      <AuthModel />
      <SubscribeModal products={products} />
    </>
  );
};

export default ModelProvider;
