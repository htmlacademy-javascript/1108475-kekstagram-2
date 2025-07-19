// Функция для проверки длины строки
const checkStringLength = (string, number) => string.length <= number;

checkStringLength('проверяемая строка', 18);


// Функция для проверки палиндрома
const checkPalindrome1 = function(string) {
  const newString = string.replaceAll(' ', '').toLowerCase();
  const palindrome = newString.split('').reverse().join('');

  return newString === palindrome;
};

checkPalindrome1('Лёша на полке клопа нашёл ');

// // Функция для проверки палиндрома через цикл
const checkPalindrome2 = function (string) {
  const newString = string.replaceAll(' ', '').toLowerCase();
  let palindrome = '';
  for (let i = newString.length - 1; i >= 0; i--) {
    palindrome += newString[i];
  }

  return newString === palindrome;
};

checkPalindrome2('Лёша на полке клопа нашёл ');


// Функция возвращения целого положительного числа
const getIntegerNumber = function (param) {
  const newString = param.toString();
  let numberString = '';
  for (let i = 0; i < newString.length; i++) {
    if (!Number.isNaN(parseInt(newString[i], 10))) {
      numberString += newString[i];
    }
  }

  return parseInt(numberString, 10);
};

getIntegerNumber('1 кефир, 0.5 батона');

const checkMeetingTime = function (workStart, workEnd, meetingTime, meetingDuration) {

  //Добавляет ноль в случае, если время указано одной цифрой
  const addZeroToString = function (string) {
    const splittedStr = string.split(':');
    if (splittedStr[0].length === 1) {
      splittedStr[0] = `0${splittedStr[0]}`;
    }
    if (splittedStr[1].length === 1) {
      splittedStr[1] = `0${splittedStr[1]}`;
    }

    return splittedStr.join(':');
  };

  // Если рабочий день не укладывается в одни календарные сутки
  if (addZeroToString(workStart) >= addZeroToString(workEnd)) {
    return false;
  }

  let meetingTimes = meetingTime.split(':');

  const meetingMinutes = (parseInt(meetingTimes[1], 10)) + meetingDuration;

  if (meetingMinutes >= 60) {
    const hours = Math.floor(meetingMinutes / 60);
    const minutes = meetingMinutes % 60;
    meetingTimes[0] = (parseInt(meetingTimes[0], 10) + hours).toString();
    meetingTimes[1] = minutes.toString();
  } else {
    meetingTimes[1] = meetingMinutes.toString();
  }

  // Если встреча не укладывается в одни календарные сутки
  if (meetingTimes[0] > 23) {
    return false;
  }

  meetingTimes = meetingTimes.join(':');

  return (addZeroToString(meetingTimes) >= addZeroToString(workStart) && addZeroToString(meetingTimes) <= addZeroToString(workEnd));
};

checkMeetingTime('08:00', '17:30', '14:00', 90);
checkMeetingTime('8:0', '10:0', '8:0', 120);
checkMeetingTime('08:00', '14:30', '14:00', 90);
checkMeetingTime('14:00', '17:30', '08:0', 90);
checkMeetingTime('8:00', '17:30', '08:00', 900);
