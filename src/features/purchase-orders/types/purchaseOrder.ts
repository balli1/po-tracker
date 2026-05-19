export enum ConfirmCode {
    UNCONFIRMED = "Unconfirmed",
    ITEM_REJECTED = "Item Rejected",
    NEEDS_ATTENTION = "Needs Attention",
    CONFIRMED = "Confirmed",
}

export enum ConfirmSourceCode {
    EDI = "EDI",
    EMAIL = "Email",
    MANUAL = "Manual",
    PORTAL = "Portal",
    NO_RESPONSE = "No Response",
}

export enum WorkStatus {
    APPROVED = "Approved",
    REJECTED = "Rejected",
    PENDING = "Pending",
    DELIVERED = "Delivered",
}

export enum HdrStatus {
    NO_REPONSE = "No Response",
    ACKNOWLEDGED = "Acknowledged",
}

export enum LineStatus {
    NO_REPONSE = "No Response",
    BACKORDERED = "Backordered",
    ACCEPTED_PRICE_PENDING = "Accepted - Price Pending",
}

export enum BusinessUnit {
    PCORP = "PCORP",
    PMAN1 = "PMAN1",
    PSIUH = "PSIUH",
    PLHH1 = "PLHH1",
}

export interface Comment {
    id: string;
    author: string;
    message: string;
    createdAt: string;
}

export interface PurchaseOrderLine {
    vendorCatalogId: string;
    lineNumber: number;
    description: string;
    quantity: number;
    unitPrice: number;
    uom: string;
    respondedDateTime: Date;
    hdrStatus?: HdrStatus;
    lineStatus?: LineStatus;
    shipCodeDesc?: string;
    shipDate: Date;
}

export interface VendorInfo {
    name: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
    email?: string;
  }
  
  export interface ShippingInfo {
    facilityName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    zipCode: string;
  }

export interface PurchaseOrder {
    poNumber: string;
    poDate: string;

    vendorName: string;
    vendorInfo: VendorInfo;
    shippingInfo: ShippingInfo;

    businessUnit: BusinessUnit;

    confirmCode: ConfirmCode;
    confirmSourceCode?: ConfirmSourceCode;

    amount: number;

    assignedTo?: string;

    comments?: Comment[];

    lines: PurchaseOrderLine[];

    workStatus?: WorkStatus;
}