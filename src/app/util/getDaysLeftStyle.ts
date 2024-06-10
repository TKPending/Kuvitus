export const getDaysLeftStyle = (daysLeft: number, darkMode?: boolean): {text: string, style: string} => {
    const urgentStyle: string = "text-red-600";
    const regularStyle: string = darkMode ? "text-black" : "text-white";
    const doneStyle: string = "text-green-600";

    if (daysLeft > 0) {
        if (daysLeft <= 3) {
            const days: string = daysLeft === 1 ? "day" : "days";
            return { text: `${daysLeft} ${days} left`, style: urgentStyle };
        } else {
            return { text: `${daysLeft} days left`,  style: regularStyle }
        }
    } else if (daysLeft === 0) {
        return { text: "Due Today", style: doneStyle };
    } else {
        return { text: "Overdue", style: urgentStyle};
    }
};
