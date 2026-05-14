import type { PurchaseOrder } from "../types/purchaseOrder";

interface PurchaseOrderDetailsDrawerProps {
  purchaseOrder: PurchaseOrder | null;
  onClose: () => void;
}

export function PurchaseOrderDetailsDrawer({
  purchaseOrder,
  onClose,
}: PurchaseOrderDetailsDrawerProps) {
  if (!purchaseOrder) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20">
      <aside className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              PO {purchaseOrder.poNumber}
            </h2>
            <p className="text-sm text-gray-500">
              {purchaseOrder.vendorName}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-gray-300 px-3 py-1 text-sm text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
        </div>

        <section className="mb-6 rounded-lg border border-gray-200 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            PO Details
          </h3>

          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <dt className="text-gray-500">Business Unit</dt>
              <dd className="font-medium text-gray-900">
                {purchaseOrder.businessUnit}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">Amount</dt>
              <dd className="font-medium text-gray-900">
                {purchaseOrder.amount.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">Confirm Code</dt>
              <dd className="font-medium text-gray-900">
                {purchaseOrder.confirmCode}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">Confirm Source</dt>
              <dd className="font-medium text-gray-900">
                {purchaseOrder.confirmSourceCode ?? "—"}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">Work Status</dt>
              <dd className="font-medium text-gray-900">
                {purchaseOrder.workStatus ?? "—"}
              </dd>
            </div>

            <div>
              <dt className="text-gray-500">Assigned To</dt>
              <dd className="font-medium text-gray-900">
                {purchaseOrder.assignedTo ?? "Unassigned"}
              </dd>
            </div>
          </dl>
        </section>

        <section className="mb-6 rounded-lg border border-gray-200 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Line Items
          </h3>

          <div className="space-y-3">
            {purchaseOrder.lines.map((line) => (
              <div
                key={line.vendorCatalogId}
                className="rounded-md border border-gray-100 bg-gray-50 p-3 text-sm"
              >
                <div className="flex justify-between">
                  <span className="font-medium text-gray-900">
                    Line {line.lineNumber}: {line.description}
                  </span>
                  <span className="text-gray-600">
                    {line.quantity} ×{" "}
                    {line.unitPrice.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}
                  </span>
                </div>

                <div className="mt-2 text-xs text-gray-500">
                  Vendor Catalog ID: {line.vendorCatalogId}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            Comments
          </h3>

          <p className="text-sm text-gray-500">
            Comment workflow will be added next.
          </p>
        </section>
      </aside>
    </div>
  );
}