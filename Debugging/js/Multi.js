var inf=Infinity
var mp={}
const min = (a,b)=>{
    return Math.min(a,b)
}
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
    n=dp.length;m=dp[0].length
    visited=matrix(n,m)
    var q= new Queue()
    lvl=0
    for(var i of monsters){
        
        q.enqueue(i)
    }
    while(!q.empty()){
        lvl++;
        t=q.length;
        for(var i=0;i<t;i++){
            var items=q.dequeue();
            
            
            a=items[0]
            b=items[1]
            
            if(dp[a][b]>lvl){
                dp[a][b]=lvl
                if(a-1>=0 && !visited[a-1][b] && s[a-1][b]!='#') q.enqueue([a-1,b]);
                if(b-1>=0 && !visited[a][b-1] && s[a][b-1]!='#') q.enqueue([a,b-1]);
                if(a+1<n && !visited[a+1][b] && s[a+1][b]!='#') q.enqueue([a+1,b]);
                if(b+1<m && !visited[a][b+1] && s[a][b+1]!='#') q.enqueue([a,b+1]);
                visited[a][b]=true;
            }
        }
    }

}
function bfs_a(x,y,dp,s,mp){
    n=dp.length
    m=dp[0].length
    visited=matrix(n,m)
    lvl=0
    q= new Queue()
    
    q.enqueue([x,y])
    while(!q.empty()){
        lvl++;
        t=q.length;
        for(var i=0;i<t;i++){
            arr=q.dequeue()
            a=arr[0]
            b=arr[1]
            if(a>=0 && b>=0 && a<n && b<m && !visited[a][b] && dp[a][b]>lvl && s[a][b]!='#')
            {
                dp[a][b]=min(dp[a][b],lvl);
                q.enqueue([a-1,b]);
                q.enqueue([a,b-1]);
                q.enqueue([a+1,b]);
                q.enqueue([a,b+1]);
                if(!([a-1,b] in mp)) mp[[a-1,b]]=[a,b];
                if(!([a+1,b] in mp)) mp[[a+1,b]]=[a,b];
                if(!([a,b-1] in mp)) mp[[a,b-1]]=[a,b];
                if(!([a,b+1] in mp)) mp[[a,b+1]]=[a,b];
                console.log(mp)
                visited[a][b]=true;
                if(a==0 || b==0 || a==n-1 || b==m-1)
                {
                    s[a][b]='E';
                    console.log(a,b,n,m,"return")
                    return true;
                }
            }
        }
    }
    
    return false;
}
for(let tcs=0;tcs<1;tcs++){
    var n=5;
    var m=8;
    var s=[
        '########',
        '#M..A..#',
        '#.#.M#.#',
        '#M#..#..',
        '#.######'
      ]
    dp=matrix(n,m,inf)
    var monsters=[]
    var astart,bstart;
    for(var i=0;i<n;i++){
        for(var j=0;j<m;j++){
            if(s[i][j]=='M'){
                monsters.push([i,j])
            }
            else if(s[i][j]=='A'){
                astart=i;
                bstart=j;
            }
        }
    }
    
    bfs_monster(monsters,dp,s)
    
    bfs_a(astart,bstart,dp,s,mp)
    console.log(mp)
}