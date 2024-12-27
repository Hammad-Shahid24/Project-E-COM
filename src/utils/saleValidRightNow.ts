import { Timestamp } from "firebase/firestore";

interface SaleValidOrNot {
    (startDate: Date | Timestamp | string, endDate: Date | Timestamp | string): boolean;
}

export const saleValidRightNow: SaleValidOrNot = (startDate, endDate) => {
    if (endDate && startDate) {
        const now = new Date();
        const start = startDate instanceof Timestamp ? startDate.toDate() : new Date(startDate);
        const end = endDate instanceof Timestamp ? endDate.toDate() : new Date(endDate);

        return now >= start && now <= end;
    }
    return false;
};