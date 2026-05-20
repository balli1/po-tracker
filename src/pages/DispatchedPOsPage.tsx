import { useEffect, useState } from "react";
import { PurchaseOrdersTable } from "../features/purchase-orders/components/PurchaseOrdersTable";
import { getPurchaseOrders } from "../features/purchase-orders/services/purchaseOrderService";
import type { PurchaseOrder } from "../features/purchase-orders/types/purchaseOrder";
import { BusinessUnit, ConfirmCode } from "../features/purchase-orders/types/purchaseOrder";
import { PurchaseOrderDetailsDrawer } from "../features/purchase-orders/components/PurchaseOrderDetailsDrawer";
import { filterPurchaseOrders } from "../features/purchase-orders/utils/filterPurchaseOrders";
import {
  addCommentToPurchaseOrders,
  createComment,
} from "../features/purchase-orders/utils/addCommentToPurchaseOrders";
import { ChevronDown } from "lucide-react"; 

export function DispatchedPOsPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConfirmCode, setSelectedConfirmCode] = useState<string>("all");
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState<string>("all");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("all");
  const [selectedAssignee, setSelectedAssignee] = useState<string>("all");

  const [selectedPurchaseOrder, setSelectedPurchaseOrder] = useState<PurchaseOrder | null>(null);

  useEffect(() => {
    async function loadPurchaseOrders() {
      const data = await getPurchaseOrders();
      setPurchaseOrders(data);
      setIsLoading(false);
    }

    loadPurchaseOrders();
  }, []);

  function handleAddComment(poNumber: string, message: string) {
    const newComment = createComment(message);
  
    if (!newComment) {
      return;
    }
  
    setPurchaseOrders((currentPurchaseOrders) =>
      addCommentToPurchaseOrders(
        currentPurchaseOrders,
        poNumber,
        newComment
      )
    );
  
    setSelectedPurchaseOrder((currentSelectedPurchaseOrder) => {
      if (
        !currentSelectedPurchaseOrder ||
        currentSelectedPurchaseOrder.poNumber !== poNumber
      ) {
        return currentSelectedPurchaseOrder;
      }
  
      return {
        ...currentSelectedPurchaseOrder,
        comments: [
          ...(currentSelectedPurchaseOrder.comments ?? []),
          newComment,
        ],
      };
    });
  }

  const assigneeOptions = Array.from(
    new Set(
      purchaseOrders
        .map((po) => po.assignedTo)
        .filter((assignee): assignee is string => Boolean(assignee))
    )
  ).sort();

  const filteredPurchaseOrders = filterPurchaseOrders(purchaseOrders, {
    searchTerm,
    selectedDateRange,
    selectedConfirmCode,
    selectedAssignee,
    selectedBusinessUnit,
  });

  if (isLoading) {
    return <main className="p-6">Loading purchase orders...</main>;
  }

  return (
    <main className="min-w-0 overflow-x-hidden p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Dispatched POs
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track purchase orders requiring vendor confirmation and follow-up.
        </p>
      </div>
      <div className="mb-4 grid gap-3 rounded-lg border border-gray-200 bg-white p-4 sm:grid-cols-2 xl:grid-cols-6">
    <input
      type="text"
      placeholder="Search PO or vendor"
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      className="rounded-md border border-gray-300 px-3 py-2 text-sm"
    />

      <div className="relative w-full">
        <select
          value={selectedDateRange}
          onChange={(event) => setSelectedDateRange(event.target.value)}
          className="w-full appearance-none rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm"
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>

      <div className="relative w-full">
        <select
          value={selectedConfirmCode}
          onChange={(event) => setSelectedConfirmCode(event.target.value)}
          className="w-full appearance-none rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm"
        >
          <option value="all">All Confirm Codes</option>

          {Object.values(ConfirmCode).map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>

      <div className="relative w-full">
        <select
          value={selectedAssignee}
          onChange={(event) => setSelectedAssignee(event.target.value)}
          className="w-full appearance-none rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm"
        >
          <option value="all">All Assignees</option>

          {assigneeOptions.map((assignee) => (
            <option key={assignee} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>

      <div className="relative w-full">
        <select
          value={selectedBusinessUnit}
          onChange={(event) => setSelectedBusinessUnit(event.target.value)}
          className="w-full appearance-none rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm"
        >
          <option value="all">All Business Units</option>

          {Object.values(BusinessUnit).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        />
      </div>

      <button
        type="button"
        onClick={() => {
          setSearchTerm("");
          setSelectedDateRange("all");
          setSelectedConfirmCode("all");
          setSelectedAssignee("all");
          setSelectedBusinessUnit("all");
        }}
        className="rounded-md border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Clear
      </button>
    </div>

      <div className="mb-3 flex items-center justify-between text-sm text-gray-600">
        <span>
          Showing{" "}
          <span className="font-medium text-gray-900">
            {filteredPurchaseOrders.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-900">
            {purchaseOrders.length}
          </span>{" "}
          purchase orders
        </span>

        <span>
          <span className="font-medium text-gray-900">
            {filteredPurchaseOrders.reduce(
              (total, po) => total + po.lines.length,
              0
            )}
          </span>{" "}
          line items shown
        </span>
      </div>
      <div className="w-full min-w-0">
        <PurchaseOrdersTable
          purchaseOrders={filteredPurchaseOrders}
          onRowClick={setSelectedPurchaseOrder}
        />
      </div>

        <PurchaseOrderDetailsDrawer
          purchaseOrder={selectedPurchaseOrder}
          onClose={() => setSelectedPurchaseOrder(null)}
          onAddComment={handleAddComment}
        />
    </main>
  );
}