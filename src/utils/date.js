/**
 * * Function for getting a day of the week
 * @param  {Number} numOfDay
 * @returns {String}
 */
const getDayByNum = (numOfDay) => {
   switch (numOfDay) {
      case 0:
         return 'Sunday';
      case 1:
         return 'Monday';
      case 2:
         return 'Tuesday';
      case 3:
         return 'Wednesday';
      case 4:
         return 'Thursday';
      case 5:
         return 'Friday';
      case 6:
         return 'Saturday';
      default:
         return null;
   }
};

const getDayFromFormatDay = (formatDay) => {
   let day;
   switch (formatDay) {
      case 'Mon':
         day = 'monday';
         break;
      case 'Tue':
         day = 'tuesday';
         break;
      case 'Wed':
         day = 'wednesday';
         break;
      case 'Thu':
         day = 'thursday';
         break;
      case 'Fri':
         day = 'friday';
         break;
      case 'Sat':
         day = 'saturday';
         break;
      case 'Sun':
         day = 'sunday';
         break;
      default:
         break;
   }
   return day;
};

const getMonthFromFormatMonth = (formatMonth) => {
   let month;
   switch (formatMonth) {
      case 'Jan':
         month = 'january';
         break;
      case 'Feb':
         month = 'february';
         break;
      case 'Mar':
         month = 'march';
         break;
      case 'Apr':
         month = 'april';
         break;
      case 'May':
         month = 'may';
         break;
      case 'Jun':
         month = 'june';
         break;
      case 'Jul':
         month = 'july';
         break;
      case 'Aug':
         month = 'august';
         break;
      case 'Sep':
         month = 'september';
         break;
      case 'Oct':
         month = 'october';
         break;
      case 'Nov':
         month = 'november';
         break;
      case 'Dec':
         month = 'december';
         break;
      default:
         break;
   }
   return month;
};

const getDayMonthFromFormatDate = (date) => {
   const [formatDay, formatMonth] = String(date).split(' ');
   return { day: getDayFromFormatDay(formatDay), month: getMonthFromFormatMonth(formatMonth) };
};

/**
 * * Create a formatted string for viewing date in div element with class 'date-block'
 * @returns {String}
 */
const getFormattedDateForDateBlock = (vocabular) => {
   const date = new Date();
   const preparedDate = date
      .toString()
      .slice(0, date.toString().indexOf('GMT'))
      .slice(0, date.toString().lastIndexOf(':'));
   const [, , numDay, year, time] = preparedDate.split(' ');
   const dayMonth = getDayMonthFromFormatDate(preparedDate);
   const formattedDate = `${vocabular.dayOfWeek[dayMonth.day]}, ${numDay} ${
      vocabular.month[dayMonth.month]
   }  ${year} ${time}`;
   return formattedDate;
};

const newDay = () => {
   const date = new Date();
   if (date.getHours === 0 && date.getMinutes === 0 && date.getSeconds === 0) {
      return true;
   }
   return false;
};

/**
 * * Formatting date for searching weather
 * @param  {Date} date
 * @param  {Boolean} isToday
 * @returns {String}
 */
const formatDateForSearch = (date, isToday) => {
   const defaultTime = '12:00:00';
   return `${date.getFullYear()}-${
      date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
   }-${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()} ${
      isToday
         ? `${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:00:00`
         : defaultTime
   }`;
};

/**
 * * Formatting date for searching weather in certain periods of time
 * @param  {Date} date
 * @returns {String}
 */
const getNearestTimeDateForTodaySearch = (date) => {
   const HOUR_AND_HALF = 60 * 90 * 1000;
   const startOfDay = new Date(date);
   startOfDay.setHours(0, 0, 0);
   let index = 0;
   for (let i = 1; i <= 23; i += 2) {
      index += 1;
      if (
         date.getTime() >= startOfDay.getTime() + HOUR_AND_HALF * i &&
         date.getTime() < startOfDay.getTime() + HOUR_AND_HALF * (i + 2)
      ) {
         date.setHours(3 * index, 0, 0);
      }
   }
   return formatDateForSearch(date, true);
};

export {
   newDay,
   getDayByNum,
   getDayFromFormatDay,
   getDayMonthFromFormatDate,
   getFormattedDateForDateBlock,
   getNearestTimeDateForTodaySearch,
   formatDateForSearch
};
