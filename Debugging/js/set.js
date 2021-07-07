s= new Set()
s.add(3)
console.log(s)
s.add(4)
console.log(s)
s.add(5)
console.log(s)
var arr=[]
for(var i of s){
    console.log(i)
    arr.push(i)
}
for(var j of arr){
    delete s[j]
}
