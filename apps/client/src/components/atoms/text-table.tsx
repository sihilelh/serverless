import * as React from "react";

import { cn } from "@/utils/shadcn.utils";

function TextTable({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="text-table-container"
      className="my-6 w-full overflow-y-auto"
    >
      <table
        data-slot="text-table"
        className={cn("w-full", className)}
        {...props}
      />
    </div>
  );
}

function TextTableHeader({
  className,
  ...props
}: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="text-table-header"
      className={cn("", className)}
      {...props}
    />
  );
}

function TextTableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="text-table-body"
      className={cn("", className)}
      {...props}
    />
  );
}

function TextTableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="text-table-row"
      className={cn("even:bg-muted m-0 border-t p-0", className)}
      {...props}
    />
  );
}

function TextTableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="text-table-head"
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  );
}

function TextTableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="text-table-cell"
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  );
}

export {
  TextTable,
  TextTableHeader,
  TextTableBody,
  TextTableRow,
  TextTableHead,
  TextTableCell,
};
