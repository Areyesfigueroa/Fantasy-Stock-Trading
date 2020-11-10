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

exports.getLatestWeekday = () => {
   const today = new Date();
   while(today.getDay() === 0 || today.getDay() === 6) {
     today.setDate(today.getDate() - 1);
   }
   
   return `${today.getFullYear()}${formatDigits(today.getMonth() + 1)}${formatDigits(today.getDate())}`;
 }
 