import { useState } from "React";
import type { PurchaseOrder } from "../types/purchaseOrder";

interface PurchaseOrderDetailsDrawerProps {
  purchaseOrder: PurchaseOrder | null;
  onClose: () => void;
  onAddComment: (poNumber: string, message: string) => void;
}

export function PurchaseOrderDetailsDrawer({
  purchaseOrder,
  onClose,
  onAddComment,
}: PurchaseOrderDetailsDrawerProps) {
  const [commentText, setCommentText] = useState("");

  function handleAddComment() {
    const trimmedComment = commentText.trim();
  
    if (!trimmedComment) {
      return;
    }
  
    onAddComment(purchaseOrder.poNumber, trimmedComment);
    setCommentText("");
  }

  if (!purchaseOrder) {
    return null;
  } 

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/20 transition-opacity duration-200">
      <aside className="h-full w-full max-w-xl animate-[slideIn_400ms_ease-out] overflow-y-auto bg-white p-6 shadow-xl">
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
            Comments
          </h3>

          <div className="mb-4 space-y-3">
            {purchaseOrder.comments && purchaseOrder.comments.length > 0 ? (
              purchaseOrder.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="rounded-md border border-gray-100 bg-gray-50 p-3 text-sm"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <p className="font-medium text-gray-900">
                      {comment.author}
                    </p>

                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleString("en-US")}
                    </p>
                  </div>

                  <p className="text-gray-700">{comment.message}</p>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No comments yet.
              </p>
            )}
          </div>

          <div className="space-y-3">
            <textarea
              value={commentText}
              onChange={(event) => setCommentText(event.target.value)}
              placeholder="Add a comment about vendor follow-up..."
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />

            <button
              type="button"
              onClick={handleAddComment}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Add Comment
            </button>
          </div>
        </section>

        <section className="mb-6 rounded-lg border border-gray-200 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">
            EDI / Line Details
          </h3>

          <div className="space-y-3">
            {purchaseOrder.lines.map((line) => (
              <div
                key={line.vendorCatalogId}
                className="rounded-md border border-gray-100 bg-gray-50 p-4 text-sm"
              >
                <div className="mb-2 flex items-start justify-between">
                  <div>
                    <p className="font-medium text-gray-900">
                      Line {line.lineNumber}
                    </p>

                    <p className="text-gray-700">
                      {line.description}
                    </p>
                  </div>

                  <div className="text-right text-gray-700">
                    <p>
                      {line.quantity} {line.uom}
                    </p>

                    <p>
                      {line.unitPrice.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </p>
                  </div>
                </div>

                <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                  <div>
                    <dt className="text-gray-500">Vendor Catalog ID</dt>
                    <dd className="font-medium text-gray-900">
                      {line.vendorCatalogId}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-gray-500">Responded Date/Time</dt>
                    <dd className="font-medium text-gray-900">
                      {line.respondedDateTime.toLocaleString("en-US")}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-gray-500">HDR Status</dt>
                    <dd className="font-medium text-gray-900">
                      {line.hdrStatus ?? "—"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-gray-500">Line Status</dt>
                    <dd className="font-medium text-gray-900">
                      {line.lineStatus ?? "—"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-gray-500">Ship Code</dt>
                    <dd className="font-medium text-gray-900">
                      {line.shipCodeDesc ?? "—"}
                    </dd>
                  </div>

                  <div>
                    <dt className="text-gray-500">Ship Date</dt>
                    <dd className="font-medium text-gray-900">
                      {line.shipDate.toLocaleDateString("en-US")}
                    </dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-6 rounded-lg border border-gray-200 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">Purchase Order</h3>

            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
            >
              Print
            </button>
          </div>

          <div className="rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 text-sm">
            <p className="font-medium text-gray-900">Ship To</p>
            <p>{purchaseOrder.shippingInfo.facilityName}</p>
            <p>{purchaseOrder.shippingInfo.addressLine1}</p>
            {purchaseOrder.shippingInfo.addressLine2 && (
              <p>{purchaseOrder.shippingInfo.addressLine2}</p>
            )}
            <p>
              {purchaseOrder.shippingInfo.city}, {purchaseOrder.shippingInfo.state}{" "}
              {purchaseOrder.shippingInfo.zipCode}
            </p>
          </div>
        </section>

        <section className="mb-6 rounded-lg border border-gray-200 p-4">
          <h3 className="mb-3 text-sm font-semibold text-gray-900">Vendor Info</h3>

          <div className="space-y-1 text-sm text-gray-700">
            <p className="font-medium text-gray-900">
              {purchaseOrder.vendorInfo.name}
            </p>
            <p>{purchaseOrder.vendorInfo.addressLine1}</p>
            {purchaseOrder.vendorInfo.addressLine2 && (
              <p>{purchaseOrder.vendorInfo.addressLine2}</p>
            )}
            <p>
              {purchaseOrder.vendorInfo.city}, {purchaseOrder.vendorInfo.state}{" "}
              {purchaseOrder.vendorInfo.zipCode}
            </p>
            <p>{purchaseOrder.vendorInfo.phone}</p>
            {purchaseOrder.vendorInfo.email && <p>{purchaseOrder.vendorInfo.email}</p>}
          </div>
        </section>
      </aside>
    </div>
  );
}