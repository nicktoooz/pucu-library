function calculateEndDate(startDate) {
    const date = new Date(startDate);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const lastDay = new Date(year, date.getMonth() + 1, 0).getDate();
    return `${year}-${month}-${lastDay}`;
  }
  
  function isDateInRange(dateToCheck, startDate, endDate) {
    const dateCheck = new Date(dateToCheck);
    const rangeStart = new Date(startDate);
    const rangeEnd = new Date(endDate);
  
    return dateCheck >= rangeStart && dateCheck <= rangeEnd;
  }
  
  function getFormattedDate(daysAgo = 0) {
    const today = new Date();
    today.setDate(today.getDate() - daysAgo);
  
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = today.getDate().toString().padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  export {calculateEndDate, isDateInRange, getFormattedDate}