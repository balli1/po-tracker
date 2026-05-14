import { useEffect, useState } from "react";
import { PurchaseOrdersTable } from "../features/purchase-orders/components/PurchaseOrdersTable";
import { getPurchaseOrders } from "../features/purchase-orders/services/purchaseOrderService";
import type { PurchaseOrder } from "../features/purchase-orders/types/purchaseOrder";
import { BusinessUnit, ConfirmCode } from "../features/purchase-orders/types/purchaseOrder";

export function DispatchedPOsPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConfirmCode, setSelectedConfirmCode] = useState<string>("all");
  const [selectedBusinessUnit, setSelectedBusinessUnit] = useState<string>("all");
  const [selectedDateRange, setSelectedDateRange] = useState<string>("all");
  const [selectedAssignee, setSelectedAssignee] = useState<string>("all");

  useEffect(() => {
    async function loadPurchaseOrders() {
      const data = await getPurchaseOrders();
      setPurchaseOrders(data);
      setIsLoading(false);
    }

    loadPurchaseOrders();
  }, []);

  const assigneeOptions = Array.from(
    new Set(
      purchaseOrders
        .map((po) => po.assignedTo)
        .filter((assignee): assignee is string => Boolean(assignee))
    )
  ).sort();

  const filteredPurchaseOrders = purchaseOrders.filter((po) => {
    const search = searchTerm.toLowerCase();
  
    const matchesSearch =
      po.poNumber.toLowerCase().includes(search) ||
      po.vendorName.toLowerCase().includes(search);
  
    const matchesConfirmCode =
      selectedConfirmCode === "all" || po.confirmCode === selectedConfirmCode;
  
    const matchesBusinessUnit =
      selectedBusinessUnit === "all" || po.businessUnit === selectedBusinessUnit;
  
    const matchesAssignee =
      selectedAssignee === "all" || po.assignedTo === selectedAssignee;
  
    const poDate = new Date(po.poDate);
    const today = new Date();
      
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
      
    let matchesDateRange = true;
      
    if (selectedDateRange === "today") {
      matchesDateRange = poDate >= startOfToday;
    }
      
    if (selectedDateRange === "last7") {
      const sevenDaysAgo = new Date(startOfToday);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      matchesDateRange = poDate >= sevenDaysAgo;
    }
      
    if (selectedDateRange === "last30") {
      const thirtyDaysAgo = new Date(startOfToday);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      matchesDateRange = poDate >= thirtyDaysAgo;
    }   

    return (
      matchesSearch &&
      matchesConfirmCode &&
      matchesBusinessUnit &&
      matchesAssignee &&
      matchesDateRange
    );
  });

  if (isLoading) {
    return <main className="p-6">Loading purchase orders...</main>;
  }

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Dispatched POs
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track purchase orders requiring vendor confirmation and follow-up.
        </p>
      </div>
      <div className="mb-4 grid gap-3 rounded-lg border border-gray-200 bg-white p-4 md:grid-cols-6">        <input
          type="text"
          placeholder="Search PO or vendor"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        />

        <select
          value={selectedDateRange}
          onChange={(event) => setSelectedDateRange(event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="last7">Last 7 Days</option>
          <option value="last30">Last 30 Days</option>
        </select>

        <select
          value={selectedConfirmCode}
          onChange={(event) => setSelectedConfirmCode(event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="all">All Confirm Codes</option>
          {Object.values(ConfirmCode).map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>

        <select
          value={selectedAssignee}
          onChange={(event) => setSelectedAssignee(event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="all">All Assignees</option>
          {assigneeOptions.map((assignee) => (
            <option key={assignee} value={assignee}>
              {assignee}
            </option>
          ))}
        </select>

        <select
          value={selectedBusinessUnit}
          onChange={(event) => setSelectedBusinessUnit(event.target.value)}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
        >
          <option value="all">All Business Units</option>
          {Object.values(BusinessUnit).map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

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
        <PurchaseOrdersTable purchaseOrders={filteredPurchaseOrders} />
    </main>
  );
}