// // CountDown Clock
// // Version   : 1.0.1
// // Developer : Ekrem KAYA
// // Website   : https://e-piksel.com
// // GitHub    : https://github.com/epiksel/countdown

// (function ($) {
//   $.fn.countdown = function (options, callback) {
//     var settings = $.extend(
//       {
//         date: new Date("2023-06-03"),
//         offset: 1,
//         day: "Hari",
//         days: "Hari",
//         hour: "Jam",
//         hours: "Jam",
//         minute: "Menit",
//         minutes: "Menit",
//         second: "Detik",
//         seconds: "Detik",
//       },
//       options
//     );

//     // Throw error if date is not set
//     if (!settings.date) {
//       $.error("Date is not defined.");
//     }

//     // Throw error if date is set incorectly
//     if (!Date.parse(settings.date)) {
//       $.error(
//         "Incorrect date format, it should look like this, 12/24/2012 12:00:00."
//       );
//     }

//     // Save container
//     var container = this;

//     /**
//      * Change client's local date to match offset timezone
//      * @return {Object} Fixed Date object.
//      */
//     var currentDate = function () {
//       // get client's current date
//       var date = new Date();

//       // turn date to utc
//       var utc = date.getTime() + date.getTimezoneOffset() * 60000;

//       // set new Date object
//       var new_date = new Date(utc + 3600000 * settings.offset);

//       return new_date;
//     };

//     /**
//      * Main countdown function that calculates everything
//      */
//     function countdown() {
//       var target_date = new Date(settings.date), // set target date
//         current_date = currentDate(); // get fixed current date

//       // difference of dates
//       var difference = target_date - current_date;

//       // if difference is negative than it's pass the target date
//       if (difference < 0) {
//         // stop timer
//         clearInterval(interval);

//         if (callback && typeof callback === "function") callback();

//         return;
//       }

//       // basic math variables
//       var _second = 1000,
//         _minute = _second * 60,
//         _hour = _minute * 60,
//         _day = _hour * 24;

//       // calculate dates
//       var days = Math.floor(difference / _day),
//         hours = Math.floor((difference % _day) / _hour),
//         minutes = Math.floor((difference % _hour) / _minute),
//         seconds = Math.floor((difference % _minute) / _second);

//       // based on the date change the refrence wording
//       var text_days = days === 1 ? settings.day : settings.days,
//         text_hours = hours === 1 ? settings.hour : settings.hours,
//         text_minutes = minutes === 1 ? settings.minute : settings.minutes,
//         text_seconds = seconds === 1 ? settings.second : settings.seconds;

//       // fix dates so that it will show two digets
//       days = String(days).length >= 2 ? days : "0" + days;
//       hours = String(hours).length >= 2 ? hours : "0" + hours;
//       minutes = String(minutes).length >= 2 ? minutes : "0" + minutes;
//       seconds = String(seconds).length >= 2 ? seconds : "0" + seconds;

//       // set to DOM
//       container.find(".days").text(days);
//       container.find(".hours").text(hours);
//       container.find(".minutes").text(minutes);
//       container.find(".seconds").text(seconds);

//       container.find(".days_text").text(text_days);
//       container.find(".hours_text").text(text_hours);
//       container.find(".minutes_text").text(text_minutes);
//       container.find(".seconds_text").text(text_seconds);
//     }

//     // start
//     var interval = setInterval(countdown, 1000);
//   };
// })(jQuery);
/************************************************ */
// (function ($) {
//   $.fn.countdown = function (options, callback) {
//     var settings = $.extend(
//       {
//         // date: new Date("2023-06-03"),
//         date: null,
//         timezone: "UTC",
//         dayText: ["one day", "{0} days"],
//         hourText: ["one hour", "{0} hours"],
//         minuteText: ["one minute", "{0} minutes"],
//         secondText: ["one second", "{0} seconds"],
//       },
//       options
//     );

//     if (!settings.date) {
//       console.log("Нету даты");
//       $.error("Date is not defined.");
//     }

//     var container = this;
//     var pluralRules = new Intl.PluralRules();

//     function countdown() {
//       var targetDate = new Date(settings.date);
//       var currentDate = new Date();
//       var timezoneOffset =
//         targetDate.getTimezoneOffset() - currentDate.getTimezoneOffset();

//       // Adjust the target date to the client's timezone
//       targetDate.setMinutes(targetDate.getMinutes() + timezoneOffset);

//       var difference = targetDate - currentDate;

//       if (difference < 0) {
//         clearInterval(interval);

//         if (callback && typeof callback === "function") {
//           callback();
//         }

//         return;
//       }

//       var days = Math.floor(difference / (1000 * 60 * 60 * 24));
//       var hours = Math.floor(
//         (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
//       var seconds = Math.floor((difference % (1000 * 60)) / 1000);

//       var text_days = settings.dayText[pluralRules.select(days)].replace(
//         "{0}",
//         days
//       );
//       var text_hours = settings.hourText[pluralRules.select(hours)].replace(
//         "{0}",
//         hours
//       );
//       var text_minutes = settings.minuteText[
//         pluralRules.select(minutes)
//       ].replace("{0}", minutes);
//       var text_seconds = settings.secondText[
//         pluralRules.select(seconds)
//       ].replace("{0}", seconds);

//       container.find(".days").text(days.toString().padStart(2, "0"));
//       container.find(".hours").text(hours.toString().padStart(2, "0"));
//       container.find(".minutes").text(minutes.toString().padStart(2, "0"));
//       container.find(".seconds").text(seconds.toString().padStart(2, "0"));

//       container.find(".days_text").text(text_days);
//       container.find(".hours_text").text(text_hours);
//       container.find(".minutes_text").text(text_minutes);
//       container.find(".seconds_text").text(text_seconds);
//     }

//     var interval = setInterval(countdown, 1000);
//   };
// })(jQuery);

/**=========== */

// Установим конечную дату в формате миллисекунд
var endDate = new Date("06/03/2023").getTime();
console.log("end", endDate);

// Обновляем обратный отсчет каждую секунду
var timer = setInterval(function () {
  // Получаем текущую дату и время в миллисекундах
  var now = new Date().getTime();
  console.log("now", now);

  // Рассчитываем разницу между текущей датой и конечной датой
  var distance = endDate - now;
  console.log("diff", distance);

  // Рассчитываем количество дней, часов, минут и секунд до конечной даты
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Обновляем элементы p с отсчетом времени
  document.querySelector(".days").innerHTML = days;
  document.querySelector(".hours").innerHTML = hours;
  document.querySelector(".minutes").innerHTML = minutes;
  document.querySelector(".seconds").innerHTML = seconds;

  // Если обратный отсчет закончился, останавливаем таймер
  if (distance < 0) {
    clearInterval(timer);
    document.querySelector(".days").innerHTML = "0";
    document.querySelector(".hours").innerHTML = "0";
    document.querySelector(".minutes").innerHTML = "0";
    document.querySelector(".seconds").innerHTML = "0";
  }
}, 1000);
