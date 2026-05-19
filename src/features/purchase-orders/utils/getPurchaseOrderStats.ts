import { ConfirmCode, WorkStatus } from "../types/purchaseOrder";
import type { PurchaseOrder } from "../types/purchaseOrder";

export function getPurchaseOrderStats(
  purchaseOrders: PurchaseOrder[]
) {
  const totalPOs = purchaseOrders.length;

  const needsAttention = purchaseOrders.filter(
    (po) => po.confirmCode === ConfirmCode.NEEDS_ATTENTION
  ).length;

  const unconfirmed = purchaseOrders.filter(
    (po) => po.confirmCode === ConfirmCode.UNCONFIRMED
  ).length;

  const rejected = purchaseOrders.filter(
    (po) => po.confirmCode === ConfirmCode.ITEM_REJECTED
  ).length;

  const delivered = purchaseOrders.filter(
    (po) => po.workStatus === WorkStatus.DELIVERED
  ).length;

  const totalAmount = purchaseOrders.reduce(
    (total, po) => total + po.amount,
    0
  );

  return {
    totalPOs,
    needsAttention,
    unconfirmed,
    rejected,
    delivered,
    totalAmount,
  };
}