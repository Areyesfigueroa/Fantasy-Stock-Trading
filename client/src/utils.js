const formatNumToCurrency = (num) => {
    const formatter = new Intl.NumberFormat('en-US', {
       style: 'currency',
       currency: 'USD',
       minimumFractionDigits: 2
     });
 
     return formatter.format(num);
 }
 
const getCardItemVariant = (currentValue, prevValue) => {
  if(currentValue > prevValue) return "success";
  if(currentValue < prevValue) return "danger";
  return "";
}

 export { formatNumToCurrency, getCardItemVariant }