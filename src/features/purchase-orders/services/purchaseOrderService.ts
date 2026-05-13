import { mockPurchaseOrders } from "../mock/purchaseOrders";
import type { PurchaseOrder } from "../types/purchaseOrder";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPurchaseOrders(): Promise<PurchaseOrder[]> {
  await delay(400);
  return mockPurchaseOrders;
}

export async function getPurchaseOrderByNumber(
  poNumber: string
): Promise<PurchaseOrder | undefined> {
  await delay(250);
  return mockPurchaseOrders.find((po) => po.poNumber === poNumber);
}