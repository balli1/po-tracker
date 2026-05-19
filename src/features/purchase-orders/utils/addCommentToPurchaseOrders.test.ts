import { describe, expect, it } from "vitest";
import { mockPurchaseOrders } from "../mock/purchaseOrders";
import {
  addCommentToPurchaseOrders,
  createComment,
} from "./addCommentToPurchaseOrders";

describe("createComment", () => {
  it("creates a comment from a non-empty message", () => {
    const comment = createComment("Called vendor for update");

    expect(comment).not.toBeNull();
    expect(comment?.message).toBe("Called vendor for update");
    expect(comment?.author).toBe("Current User");
    expect(comment?.id).toBeTruthy();
    expect(typeof comment?.id).toBe("string");
  });

  it("returns null for an empty comment", () => {
    const comment = createComment("   ");

    expect(comment).toBeNull();
  });
});

describe("addCommentToPurchaseOrders", () => {
  it("adds a comment to the matching purchase order", () => {
    const comment = {
      id: "comment-test",
      author: "Current User",
      message: "Vendor confirmed revised ship date",
      createdAt: "2026-05-14T12:00:00",
    };

    const targetPo = mockPurchaseOrders[0];

    const result = addCommentToPurchaseOrders(
      mockPurchaseOrders,
      targetPo.poNumber,
      comment
    );

    const updatedPo = result.find((po) => po.poNumber === targetPo.poNumber);

    expect(updatedPo?.comments).toContainEqual(comment);
  });

  it("does not modify non-matching purchase orders", () => {
    const comment = {
      id: "comment-test",
      author: "Current User",
      message: "Vendor confirmed revised ship date",
      createdAt: "2026-05-14T12:00:00",
    };

    const targetPo = mockPurchaseOrders[0];
    const nonMatchingPo = mockPurchaseOrders[1];

    const result = addCommentToPurchaseOrders(
      mockPurchaseOrders,
      targetPo.poNumber,
      comment
    );

    const unchangedPo = result.find(
      (po) => po.poNumber === nonMatchingPo.poNumber
    );

    expect(unchangedPo?.comments).toEqual(nonMatchingPo.comments);
  });
});