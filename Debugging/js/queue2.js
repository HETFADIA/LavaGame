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
q=new Queue([1,2,3])
console.log(q.length)
console.log(q.dequeue())
console.log(q.dequeue())
console.log(q.dequeue())