inf=Infinity
class Queue {
    constructor() {
      this.items = {};
      this.headIndex = 0;
      this.tailIndex = 0;
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
function matrix(n,m,initialize=0){
    var arr=[]
    for(var i=0;i<n;i++){
        arr.push([])
        for(var j=0;j<m;j++){
            arr[i].push(initialize)
        }
    }
    return arr;
}
function bfs_monster(monsters,dp,s){
    n=dp.size();m=dp[0].size()
    visited=matrix(n,m)
    var q= new Queue()
    lvl=0
    for(var i=0;i<monsters.length;i++){
        q.enqueue(i)
    }
    while(!q.empty()){
        lvl++;
        t=q.length;
        for(var i=0;i<t;i++){
            
        }
    }

}
for(let tcs=0;tcs<1;tcs++){
    var n=5;
    var m=8;
    var s=[
        '########',
        '#M..A..#',
        '#M..A..#',
        '#.#.M#.#',
        '#M#..#..',
        '#.######'
      ]
    dp=matrix(n,m,inf)
    var monsters=[]
    var a,b;
    for(var i=0;i<n;i++){
        for(var j=0;j<m;j++){
            if(s[i][j]=='M'){
                monsters.push([i,j])
            }
            else if(s[i][j]=='A'){
                a=i;
                b=j;
            }
        }
    }
    bfs_monster(monsters,dp,s)
    
}