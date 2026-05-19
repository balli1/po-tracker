import type { Comment, PurchaseOrder } from "../types/purchaseOrder";

export function createComment(message: string): Comment | null {
  const trimmedMessage = message.trim();

  if (!trimmedMessage) {
    return null;
  }

  return {
    id: crypto.randomUUID(),
    author: "Current User",
    message: trimmedMessage,
    createdAt: new Date().toISOString(),
  };
}

export function addCommentToPurchaseOrders(
  purchaseOrders: PurchaseOrder[],
  poNumber: string,
  comment: Comment
): PurchaseOrder[] {
  return purchaseOrders.map((po) => {
    if (po.poNumber !== poNumber) {
      return po;
    }

    return {
      ...po,
      comments: [...(po.comments ?? []), comment],
    };
  });
}