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
