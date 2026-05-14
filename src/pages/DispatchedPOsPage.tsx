import { useEffect, useState } from "react";
import { PurchaseOrdersTable } from "../features/purchase-orders/components/PurchaseOrdersTable";
import { getPurchaseOrders } from "../features/purchase-orders/services/purchaseOrderService";
import type { PurchaseOrder } from "../features/purchase-orders/types/purchaseOrder";

export function DispatchedPOsPage() {
  const [purchaseOrders, setPurchaseOrders] = useState<PurchaseOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPurchaseOrders() {
      const data = await getPurchaseOrders();
      setPurchaseOrders(data);
      setIsLoading(false);
    }

    loadPurchaseOrders();
  }, []);

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

      <PurchaseOrdersTable purchaseOrders={purchaseOrders} />
    </main>
  );
}