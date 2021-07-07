// var m={}
// for(var i=0;i<1e6;i++){
//     m[i]=1
// }
// suma=0
// for(var i=1e5;i<1e7;i++){
//     suma+=(i in m)
// }
// console.log(suma)
var mp={}
mp[[2,3]]=[2,2]
mp[[2,4]]=[2,2]
mp[[3,4]]=[2,2]
console.log(mp)
console.log([2,3] in mp)
console.log([2,4] in mp)
console.log([3,4] in mp)
console.log([2,2] in mp)
var m={}
m[2]={}
m[2]
