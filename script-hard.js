
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
