let miArray = [3,5,7]; 
let longitud = miArray.length;

console.log(longitud),

miArray.push(20);
console.log(miArray);

miArray.pop();
console.log(miArray);

console.log(typeof miArray);

if (miArray.constructor.toString().indexOf('Array') > -1) {
    console.log("Es un array")
} else {
    console.log("No es un array")
}

for(let i = 0; i<miArray.length; i++){
    console.log(miArray[i]);}


miArray.splice(1,1);
console.log(miArray);

miArray.splice(1,1,10);
console.log(miArray);

miArray.reverse()
console.log(miArray);