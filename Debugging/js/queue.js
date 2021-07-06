class Queue {
  constructor(arr=[]) {
      this.items = {};
      this.headIndex = 0;
      this.tailIndex = 0;
      for(var i of arr){
          this.enqueue(i)
      }
  }

  enqueue(item) {
      this.items[this.tailIndex] = item;
      this.tailIndex++;
  }

  dequeue() {
      const item = this.items[this.headIndex];
      delete this.items[this.headIndex];
      this.headIndex++;
      return item;
  }

  peek() {
      return this.items[this.headIndex];
  }
  
  back(){
      return this.items[this.tailIndex-1]
  }

  empty(){
      return this.tailIndex==this.headIndex;
  }

  get length() {
      return this.tailIndex - this.headIndex;
  }

}
var queue= new Queue()
console.log("is queue empty",queue.empty())
queue.enqueue(4)
queue.dequeue()
console.log("is queue empty",queue.empty())
for(var i=0;i<1e5;i++){
    queue.enqueue(i);
}
for(var i=0;i<10;i++){
    var a=queue.dequeue()
    console.log(a)
}
for(var i=0;i<9*1e4;i++){
    var a=queue.dequeue()
}
console.log(queue.peek())
console.log(queue.back())
console.log(queue.length)
console.log("is queue empty",queue.empty())