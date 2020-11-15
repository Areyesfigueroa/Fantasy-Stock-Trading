const utils = require('./utils');

exports.formatDateDigits = (num) => {
   if(num.toString().length >= 2) return num.toString();
   return ("0" + num).slice(-2);
}

exports.getLatestWeekday = (fromDate) => {
   while(fromDate.getDay() === 0 || fromDate.getDay() === 6) {
      fromDate.setDate(fromDate.getDate() - 1);
   }

   return `${fromDate.getFullYear()}${utils.formatDateDigits(fromDate.getMonth() + 1)}${utils.formatDateDigits(fromDate.getDate())}`;
 }
 