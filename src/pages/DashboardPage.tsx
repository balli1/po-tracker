import { mockPurchaseOrders } from "../features/purchase-orders/mock/purchaseOrders";
import { ConfirmCode, WorkStatus } from "../features/purchase-orders/types/purchaseOrder";

export function DashboardPage() {
  const totalPOs = mockPurchaseOrders.length;

  const needsAttention = mockPurchaseOrders.filter(
    (po) => po.confirmCode === ConfirmCode.NEEDS_ATTENTION
  ).length;

  const unconfirmed = mockPurchaseOrders.filter(
    (po) => po.confirmCode === ConfirmCode.UNCONFIRMED
  ).length;

  const rejected = mockPurchaseOrders.filter(
    (po) => po.confirmCode === ConfirmCode.ITEM_REJECTED
  ).length;

  const delivered = mockPurchaseOrders.filter(
    (po) => po.workStatus === WorkStatus.DELIVERED
  ).length;

  const totalAmount = mockPurchaseOrders.reduce(
    (total, po) => total + po.amount,
    0
  );

  const stats = [
    { label: "Total POs", value: totalPOs },
    { label: "Needs Attention", value: needsAttention },
    { label: "Unconfirmed", value: unconfirmed },
    { label: "Rejected", value: rejected },
    { label: "Delivered", value: delivered },
    {
      label: "Total Amount",
      value: totalAmount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
    },
  ];

  return (
    <main className="min-w-0 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Summary of purchase order activity and vendor follow-up.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {stat.value}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900">
            POs Needing Attention
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Purchase orders that may require follow-up.
          </p>

          <div className="mt-4 space-y-3">
            {mockPurchaseOrders
              .filter((po) => po.confirmCode === ConfirmCode.NEEDS_ATTENTION)
              .slice(0, 5)
              .map((po) => (
                <div
                  key={po.poNumber}
                  className="flex items-center justify-between rounded-md bg-gray-50 p-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-gray-900">{po.poNumber}</p>
                    <p className="text-gray-500">{po.vendorName}</p>
                  </div>

                  <p className="font-medium text-gray-900">
                    {po.amount.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </p>
                </div>
              ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="text-base font-semibold text-gray-900">
            Recent Activity
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Recent purchase order updates and comments.
          </p>

          <div className="mt-4 space-y-3 text-sm">
            {mockPurchaseOrders
              .filter((po) => po.comments && po.comments.length > 0)
              .slice(0, 5)
              .map((po) => (
                <div
                  key={po.poNumber}
                  className="rounded-md border border-gray-100 bg-gray-50 p-3"
                >
                  <p className="font-medium text-gray-900">
                    PO {po.poNumber} updated
                  </p>
                  <p className="mt-1 text-gray-600">
                    {po.comments?.[0]?.message}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}