import { createColumnHelper } from "@tanstack/react-table";
import type { PurchaseOrder } from "../types/purchaseOrder";

const columnHelper = createColumnHelper<PurchaseOrder>();

export const columns = [
  columnHelper.accessor("poNumber", {
    header: "PO Number",
    cell: (info) => (
      <span className="font-medium text-gray-900">
        {info.getValue()}
      </span>
    ),
  }),

  columnHelper.accessor("vendorName", {
    header: "Vendor",
  }),

  columnHelper.accessor("businessUnit", {
    header: "Business Unit",
  }),

  columnHelper.accessor("confirmCode", {
    header: "Confirm Code",
  }),

  columnHelper.accessor("lines", {
    header: "Lines",
    cell: (info) => info.getValue().length,
  }),

  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) =>
      info.getValue().toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
  }),

  columnHelper.accessor("assignedTo", {
    header: "Assigned To",
    cell: (info) => info.getValue() ?? "Unassigned",
  }),
];