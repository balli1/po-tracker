import { useEffect, useState } from "react";
import { getPurchaseOrders } from "../features/purchase-orders/services/purchaseOrderService";
import type { PurchaseOrder } from "../features/purchase-orders/types/purchaseOrder";

export function DispatchedPOsPage() {
    const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function loadPurchaseOrders(){
            const data = await getPurchaseOrders();
            setPurchaseOrders(data);
            setIsLoading(false);
        }

        loadPurchaseOrders();
}, []);

if (isLoading) {
    return <div className="p-6">Loading purchase orders..</div>;
}

return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Dispatched POs
        </h1>
        <p className="text-sm text-gray-500">
          Track purchase orders requiring vendor confirmation and follow-up.
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                PO Number
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Vendor
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Business Unit
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Confirm Code
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Lines
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Amount
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Assigned To
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {purchaseOrders.map((po) => (
              <tr key={po.poNumber} className="hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-900">
                  {po.poNumber}
                </td>
                <td className="px-4 py-3 text-gray-700">{po.vendorName}</td>
                <td className="px-4 py-3 text-gray-700">{po.businessUnit}</td>
                <td className="px-4 py-3 text-gray-700">{po.confirmCode}</td>
                <td className="px-4 py-3 text-gray-700">
                  {po.lines.length}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {po.amount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {po.assignedTo ?? "Unassigned"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}