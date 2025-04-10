"use client"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function PaginationDemo() {
  const searchParams = useSearchParams();
  const [page, setPage] = useState<string | null>(null);

  // Ensure we handle the searchParams properly
  useEffect(() => {
    const pageParam = searchParams.get("page");
    setPage(pageParam); // Set the page parameter
  }, [searchParams]);

  // Ensure `page` is available before rendering
  if (page === null) {
    return null; // Optionally show a loading state if needed
  }

  const createQueryString = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(name, value);
    return params.toString();
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        {["1", "2", "3"].map((a) => (
          <PaginationItem key={a}>
            <PaginationLink
              href={"/products" + "?" + createQueryString("page", a)}
              isActive={page === a} // Using `page` here for active state
            >
              {a}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
