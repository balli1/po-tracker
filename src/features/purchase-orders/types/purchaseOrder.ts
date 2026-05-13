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
    vendorCatalogId: string,
    lineNumber: number, 
    description: string,
    quantity: number,
    unitPrice: number,
    respondedDateTime: Date,
    hdrStatus?: HdrStatus, 
    lineStatus?: LineStatus,
    shipDate: Date,
}

export interface PurchaseOrder {
    poNumber: string;
    poDate: string;

    vendorName: string;

    businessUnit: BusinessUnit;

    confirmCode: ConfirmCode;
    confirmSourceCode?: ConfirmSourceCode;

    amount: number;

    assignedTo?: string;

    comments?: Comment[];

    lines: PurchaseOrderLine[];

    workStatus?: WorkStatus;

}