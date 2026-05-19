import { describe, expect, it } from "vitest";
import { mockPurchaseOrders } from "../mock/purchaseOrders";
import { filterPurchaseOrders } from "./filterPurchaseOrders";

const defaultFilters = {
  searchTerm: "",
  selectedDateRange: "all",
  selectedConfirmCode: "all",
  selectedAssignee: "all",
  selectedBusinessUnit: "all",
};

describe("filterPurchaseOrders", () => {
  it("returns all purchase orders when no filters are applied", () => {
    const result = filterPurchaseOrders(mockPurchaseOrders, defaultFilters);

    expect(result).toHaveLength(mockPurchaseOrders.length);
  });

  it("filters by search term", () => {
    const result = filterPurchaseOrders(mockPurchaseOrders, {
      ...defaultFilters,
      searchTerm: "Cardinal",
    });

    expect(result).toHaveLength(1);
    expect(result[0].vendorName).toContain("Cardinal");
  });

  it("filters by confirm code", () => {
    const result = filterPurchaseOrders(mockPurchaseOrders, {
      ...defaultFilters,
      selectedConfirmCode: "Needs Attention",
    });

    expect(result.every((po) => po.confirmCode === "Needs Attention")).toBe(
      true
    );
  });

  it("filters by assignee", () => {
    const result = filterPurchaseOrders(mockPurchaseOrders, {
      ...defaultFilters,
      selectedAssignee: "Mohammed Rahman",
    });

    expect(result.every((po) => po.assignedTo === "Mohammed Rahman")).toBe(
      true
    );
  });
});