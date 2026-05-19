import type { PurchaseOrder } from "../types/purchaseOrder";

export interface PurchaseOrderFilters {
  searchTerm: string;
  selectedDateRange: string;
  selectedConfirmCode: string;
  selectedAssignee: string;
  selectedBusinessUnit: string;
}

export function filterPurchaseOrders(
  purchaseOrders: PurchaseOrder[],
  filters: PurchaseOrderFilters
) {
  const {
    searchTerm,
    selectedDateRange,
    selectedConfirmCode,
    selectedAssignee,
    selectedBusinessUnit,
  } = filters;

  return purchaseOrders.filter((po) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      po.poNumber.toLowerCase().includes(search) ||
      po.vendorName.toLowerCase().includes(search);

    const matchesConfirmCode =
      selectedConfirmCode === "all" || po.confirmCode === selectedConfirmCode;

    const matchesBusinessUnit =
      selectedBusinessUnit === "all" ||
      po.businessUnit === selectedBusinessUnit;

    const matchesAssignee =
      selectedAssignee === "all" || po.assignedTo === selectedAssignee;

    const poDate = new Date(po.poDate);
    const today = new Date();

    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    let matchesDateRange = true;

    if (selectedDateRange === "today") {
      matchesDateRange = poDate >= startOfToday;
    }

    if (selectedDateRange === "last7") {
      const sevenDaysAgo = new Date(startOfToday);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      matchesDateRange = poDate >= sevenDaysAgo;
    }

    if (selectedDateRange === "last30") {
      const thirtyDaysAgo = new Date(startOfToday);
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      matchesDateRange = poDate >= thirtyDaysAgo;
    }

    return (
      matchesSearch &&
      matchesConfirmCode &&
      matchesBusinessUnit &&
      matchesAssignee &&
      matchesDateRange
    );
  });
}