
const num = 266219;
const arrNums = num.toString().split('');

console.log(arrNums);
console.log(typeof arrNums);

let number = 1;

for (let i = 0; i < arrNums.length; i++) {   

   number *= arrNums[i];    
}

console.log(number);
const cubeNumber = number ** 3;

console.log(cubeNumber.toString().slice(0,2));







// ) Создать переменную num со значением 266219 (тип данных число)

// 2) Вывести в консоль произведение (умножение) цифр этого числа
// Например: число 123, при помощи javaScript получить каждую цифру ( 1, 2, 3 ) и перемножить их. Правильно использовать цикл или методы перебора.

// 3) Полученный результат возвести в степень 3, используя только 1 оператор (Math.pow не подходит)

// 4) Вывести в консоль первые 2 цифры полученного числа




