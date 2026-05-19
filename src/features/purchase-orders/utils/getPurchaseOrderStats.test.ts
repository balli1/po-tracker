import { describe, expect, it } from "vitest";
import { mockPurchaseOrders } from "../mock/purchaseOrders";
import { getPurchaseOrderStats } from "./getPurchaseOrderStats";

describe("getPurchaseOrderStats", () => {
  it("calculates purchase order dashboard statistics", () => {
    const stats = getPurchaseOrderStats(mockPurchaseOrders);

    expect(stats.totalPOs).toBe(mockPurchaseOrders.length);

    expect(stats.totalAmount).toBeGreaterThan(0);

    expect(stats.needsAttention).toBeGreaterThanOrEqual(0);

    expect(stats.rejected).toBeGreaterThanOrEqual(0);

    expect(stats.delivered).toBeGreaterThanOrEqual(0);
  });
});