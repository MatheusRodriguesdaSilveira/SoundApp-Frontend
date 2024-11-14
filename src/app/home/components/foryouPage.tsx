"use client";

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ImageTemplate } from "@/components/ui/imageExample";

export const ForYouPage = () => {
  return (
    <>
      <DropdownMenuSeparator />

      <div className="flex ">
        <div>
          <ImageTemplate />
        </div>
      </div>
    </>
  );
};
