exports.makeid = (length) => {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

const formatDigits = (num) => {
   if(num.toString().length >= 2) return num;
   return ("0" + num).slice(-2);
}

exports.getLatestWeekday = (fromDate) => {
   while(fromDate.getDay() === 0 || fromDate.getDay() === 6) {
      fromDate.setDate(fromDate.getDate() - 1);
   }
   
   return `${fromDate.getFullYear()}${formatDigits(fromDate.getMonth() + 1)}${formatDigits(fromDate.getDate())}`;
 }
 