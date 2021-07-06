arr=[[1,2],[3,4],[5,6]]
for(var [a,b] of adj(3,4)){
    console.log(a,b)
}
// console.log(0<=4<=5)
// console.log(-10<=-4<=-1)
// console.log(10>=3<=5)
function adj(a,b){
    return [[a-1,b],[a+1,b],[a,b-1],[a,b+1]]
}
// for(var [a1,b1] of adj(3,4)){
//     console.log(a1,b1)
// }
a=4
b=3
console.log(adj(a,b))