import { mockPurchaseOrders } from "../features/purchase-orders/mock/purchaseOrders";
import { ConfirmCode } from "../features/purchase-orders/types/purchaseOrder";
import { getPurchaseOrderStats } from "../features/purchase-orders/utils/getPurchaseOrderStats";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function DashboardPage() {
  const stats = getPurchaseOrderStats(mockPurchaseOrders);

  const summaryCards = [
    {
      label: "Total POs",
      value: stats.totalPOs,
    },
    {
      label: "Needs Attention",
      value: stats.needsAttention,
    },
    {
      label: "Unconfirmed",
      value: stats.unconfirmed,
    },
    {
      label: "Rejected",
      value: stats.rejected,
    },
    {
      label: "Delivered",
      value: stats.delivered,
    },
    {
      label: "Total Amount",
      value: stats.totalAmount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      }),
    },
  ];

  const confirmCodeChartData = [
    {
      status: "Needs Attention",
      count: stats.needsAttention,
    },
    {
      status: "Unconfirmed",
      count: stats.unconfirmed,
    },
    {
      status: "Rejected",
      count: stats.rejected,
    },
    {
      status: "Delivered",
      count: stats.delivered,
    },
  ];

  return (
    <main className="min-w-0 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Summary of purchase order activity and vendor follow-up.
        </p>
      </div>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">
              {card.label}
            </p>

            <p className="mt-2 text-2xl font-semibold text-gray-900">
              {card.value}
            </p>
          </div>
        ))}
      </section>

      <section className="mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-semibold text-gray-900">
            Purchase Orders by Status
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Overview of purchase orders grouped by current status.
          </p>
        </div>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={confirmCodeChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#005EB8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
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
              .filter(
                (po) =>
                  po.confirmCode ===
                  ConfirmCode.NEEDS_ATTENTION
              )
              .slice(0, 5)
              .map((po) => (
                <div
                  key={po.poNumber}
                  className="flex items-center justify-between rounded-md bg-gray-50 p-3 text-sm"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      {po.poNumber}
                    </p>

                    <p className="text-gray-500">
                      {po.vendorName}
                    </p>
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
              .filter(
                (po) =>
                  po.comments &&
                  po.comments.length > 0
              )
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