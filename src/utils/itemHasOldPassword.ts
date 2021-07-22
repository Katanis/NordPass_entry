import { IItem } from "~/services/getUserItems";

const itemHasOldPassword = (itemList: Array<IItem>) => {
    const currenttime = new Date();
    const maxDays = 30;
    const d = new Date(Date.UTC(currenttime.getFullYear(), currenttime.getMonth(), currenttime.getDate() - maxDays));
    return itemList.filter(item => new Date(item.createdAt) <= d)
        .sort((a, b) => a.createdAt.localeCompare(b.createdAt));
};

export default itemHasOldPassword;