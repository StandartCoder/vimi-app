export const getFormattedDate = () => {
    const daysOfWeek = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    const months = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
    
    const date = new Date();
    const dayName = daysOfWeek[date.getDay()];
    const day = date.getDate();
    const monthName = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day}. ${monthName} ${year}`;
};