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
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
  
  export function PaginationDemo() {
    const searchParams = useSearchParams()
   
    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
      (name: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(name, value)
   
        return params.toString()
      },
      [searchParams]
    )
   
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          {["1", "2", "3"].map((a) => (
               <PaginationItem>
               <PaginationLink href={"/products" + "?" + createQueryString("page", a)}
                isActive = {searchParams.get("page") === a}> {a} </PaginationLink>
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
    )
  }
  