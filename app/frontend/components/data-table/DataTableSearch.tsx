"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/helpers/hooks";

interface DataTableSearchProps {
  placeholder: string;
}

export const DataTableSearch = ({ placeholder }: DataTableSearchProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState<string>("");
  const debouncedInputValue = useDebounce(inputValue, 500);

  useEffect(() => {
    const filterValue = searchParams.get("filter") || "";
    setInputValue(filterValue);
  }, [searchParams]);

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    if (debouncedInputValue && debouncedInputValue.length >= 2) {
      newSearchParams.set("filter", debouncedInputValue);
    } else {
      newSearchParams.delete("filter");
    }

    router.replace(`?${newSearchParams.toString()}`);
  }, [debouncedInputValue, router, searchParams]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
  };

  return (
    <div className="w-full md:w-[70%] lg:w-[450px] h-full relative dark:border dark:rounded-md">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="w-5 h-5 text-slate-500" />
      </span>
      <Input
        className="pl-10"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />
    </div>
  );
};
