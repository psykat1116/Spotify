"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import qs from "query-string";
import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [search, setSearch] = useState<string>("");
  const debounceValue = useDebounce<string>(search, 500);

  useEffect(() => {
    const query = { title: debounceValue };
    const url = qs.stringifyUrl({
      url: "/search",
      query: query,
    });
    router.push(url);
  }, [debounceValue, router]);

  return (
    <Input
      placeholder="What do you want to listen to"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchInput;
