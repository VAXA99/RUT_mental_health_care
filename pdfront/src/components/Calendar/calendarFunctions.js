const Days_In_Month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export function isLeapYear(year) {
    return !((year % 4) || (!(year % 100) && (year % 400)));
}

export function areEqual(a, b) {
    if (!a || !b) return false;
    return (
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate()
    );

}

export function getDaysInMonth(date) {

    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = Days_In_Month[month]

    if (isLeapYear(year) && month === 1) {
        return daysInMonth + 1;
    } else {
        return daysInMonth;
    }
}

export function getDayOfWeek(date) {
    const dayOfWeek = date.getDay();

    if (dayOfWeek === 0) return 6

    return dayOfWeek + 1;
}

export function getMonthData(year, month) {
    const result = [];
    const date = new Date(year, month);
    let day = 1;
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDayOfWeek(date);

    for (let i = 0; i < (daysInMonth + monthStartsOn) / 7; i++) {
        result[i] = [];

        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
                result[i][j] = undefined;
            } else {
                result[i][j] = new Date(year, month, day++);

            }
        }
    }

    return result;
}
  