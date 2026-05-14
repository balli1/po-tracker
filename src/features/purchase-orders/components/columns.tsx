import { createColumnHelper } from "@tanstack/react-table";
import type { PurchaseOrder } from "../types/purchaseOrder";
import { ConfirmCode } from "../types/purchaseOrder";

const columnHelper = createColumnHelper<PurchaseOrder>();

function getConfirmCodeBadgeClass(confirmCode: ConfirmCode) {
    switch (confirmCode) {
      case ConfirmCode.CONFIRMED:
        return "bg-green-50 text-green-700 ring-green-600/20 whitespace-nowrap";
  
      case ConfirmCode.NEEDS_ATTENTION:
        return "bg-yellow-50 text-yellow-800 ring-yellow-600/20 whitespace-nowrap";
  
      case ConfirmCode.ITEM_REJECTED:
        return "bg-red-50 text-red-700 ring-red-600/20 whitespace-nowrap";
  
      case ConfirmCode.UNCONFIRMED:
        return "bg-gray-50 text-gray-700 ring-gray-600/20 whitespace-nowrap";
  
      default:
        return "bg-gray-50 text-gray-700 ring-gray-600/20 whitespace-nowrap";
    }
  }

  export const columns = [
    columnHelper.accessor("poNumber", {
      header: "PO Number",
      cell: (info) => (
        <span className="font-medium text-gray-900">{info.getValue()}</span>
      ),
    }),
  
    columnHelper.accessor("poDate", {
        header: "Date",
        cell: (info) => {
          const date = new Date(info.getValue());
      
          return `${date.toLocaleDateString("en-US")} ${date.toLocaleTimeString(
            "en-US",
            {
              hour: "numeric",
              minute: "2-digit",
            }
          )}`;
        },
      }),
  
    columnHelper.accessor("vendorName", {
      header: "Vendor",
    }),
  
    columnHelper.accessor("businessUnit", {
      header: "Business Unit",
    }),
  
    columnHelper.accessor("confirmCode", {
      header: "Confirm Code",
      cell: (info) => {
        const confirmCode = info.getValue();
  
        return (
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${getConfirmCodeBadgeClass(
              confirmCode
            )}`}
          >
            {confirmCode}
          </span>
        );
      },
    }),
  
    columnHelper.accessor("confirmSourceCode", {
      header: "Confirm Source",
      cell: (info) => info.getValue() ?? "—",
    }),
  
    columnHelper.accessor("workStatus", {
      header: "Work Status",
      cell: (info) => info.getValue() ?? "—",
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