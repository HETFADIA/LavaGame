var colors={}
var representation={}
var celltype={}
diagonal=0
element = document.getElementsByClassName("container");
var TotalCells= element.length;
var lengthOfTopRow= Math.floor(Math.sqrt(TotalCells));
function updateColorDict(){
    colors['lava']='red'
    colors['lavapath']='rgb(200,10,0)'
    colors['start']='rgb(10,150,10)' //green
    colors['obstacle']='blue'
    colors['normal']='black'
    colors['path']='rgb(10,185,10)'
}
function updateRepresentation(){
    representation['lava']='M'
    representation['start']='A'
    representation['obstacle']='#'
    representation['normal']='.'
}
function random(a,b){
    let minimum=a;
    let difference=b-a;
    return Math.floor(minimum+Math.random()*difference);
}
function gridIndex(i,j){
    return i*lengthOfTopRow+j;
}
function setStart(n,m){
    var x=random(0,m)
    var y=random(0,n)
    if(n>2 && m>2){
        while(x==0 || y==0 || x==n-1 || y==m-1){
            x=random(0,m)
            y=random(0,n)
        }
    }
    randomIndex=gridIndex(y,x)
    celltype[randomIndex]='start'
    element[randomIndex].style.backgroundColor=colors['start']
}
function min(a,b){
    return Math.min(a,b)
}
function setlava(n,m){
    product=n*m;
    for(var j=0;j<min(n,m)/2;j++){
        i=random(0,n*m)
        if(celltype[i]=='normal'){
            celltype[i]='lava'
            element[i].style.backgroundColor=colors['lava']
            
        }
    }
}
function setObstacle(n,m){
    product=n*m;
    for(var j=0;j<min(n,m);j++){
        i=random(0,n*m)
        if(celltype[i]=='normal'){
            celltype[i]='obstacle'
            element[i].style.backgroundColor=colors['obstacle']
            
        }
    }
}
function reset(){

}
function ithbox(i){
    
}
function updatePathDoesNotExist(){
    var string="Path Does not exist"
    document.getElementsByClassName('changetext')[0].innerHTML=string
}
function updatePath(ans){
    var string="Path Found"
    document.getElementsByClassName('changetext')[0].innerHTML=string
    for(var [a1,b1] of ans){
        var indexa=gridIndex(a1,b1)
        if(celltype[indexa]=='normal')
        element[indexa].style.backgroundColor=colors['path']
    }
}
function simulate(){
    m=lengthOfTopRow
    n=element.length/m;
    s=matrix(n,m,0)
    for(var i=0;i<n;i++){
        for(var j=0;j<m;j++){
            temp=celltype[gridIndex(i,j)]
            
            s[i][j]=representation[temp]
            
        }
    }
    ans=path(n,m,s)
    if(ans==-1){
        updatePathDoesNotExist()
    }
    else{
        updatePath(ans)
    }
}
function myFunction(){
    updateColorDict()
    updateRepresentation()
    var string="";
    var n=+document.getElementById("length").value;
    
    for( var i=0;i<n*n;i++){
        string+=`<div class="container" onclick="ithbox(${i})"></div>`
    }
    for(var i=0;i<32;i++){
        string+="<br>";
    }
    document.getElementById("matrix").innerHTML=string;
    var widthofdevice=window.innerWidth
    var setMargin=n<=(3.8*widthofdevice/100);//margin disappers above certain n for different devices
 
    var margin=0
    if(setMargin){
        margin=100/(50*n)
    }
    let division=(100/n-2*margin).toString();


    for(var i=0;i<n*n;i++){
        document.getElementsByClassName("container")[i].style.width=division+"%"
        document.getElementsByClassName("container")[i].style.height=division+"vh"
        document.getElementsByClassName("container")[i].style.margin=margin+"%";
        celltype[i]='normal'
    }
    element = document.getElementsByClassName("container");
    TotalCells= element.length;
    lengthOfTopRow= Math.floor(Math.sqrt(TotalCells));
    // using percolatevar i have selected all the boxes in which the text changes
    percolatevar = document.getElementsByClassName("changetext");
    setStart(n,n)
    setlava(n,n)
    setObstacle(n,n)
}




var inf=Infinity
var mp={}
var exit=[]

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
diagonal=1
function adj(a,b){
    if(diagonal==0)
    return [[a-1,b],[a+1,b],[a,b-1],[a,b+1]]
    return [[a-1,b],[a+1,b],[a,b-1],[a,b+1],[a-1,b-1],[a-1,b+1],[a+1,b-1],[a+1,b+1]]
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
                visited[a][b]=true;
                for(var [a1,b1] of adj(a,b)){
                    
                    if(0<=a1 && a1<n && 0<=b1 && b1<m && !visited[a1][b1] && s[a1][b1]!='#') q.enqueue([a1,b1])
                }
                // if(a-1>=0 && !visited[a-1][b] && s[a-1][b]!='#') q.enqueue([a-1,b]);
                // if(b-1>=0 && !visited[a][b-1] && s[a][b-1]!='#') q.enqueue([a,b-1]);
                // if(a+1<n && !visited[a+1][b] && s[a+1][b]!='#') q.enqueue([a+1,b]);
                // if(b+1<m && !visited[a][b+1] && s[a][b+1]!='#') q.enqueue([a,b+1]);
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
                
                for(var [a1,b1] of adj(a,b)){
                    
                    q.enqueue([a1,b1])
                }
                // q.enqueue([a-1,b]);
                // q.enqueue([a,b-1]);
                // q.enqueue([a+1,b]);
                // q.enqueue([a,b+1]);
                
                for(var [a1,b1] of adj(a,b)){
                    
                    if(!([a1,b1] in mp)){
                        
                        mp[[a1,b1]]=[a,b]
                    }
                }
                // if(!([a-1,b] in mp)) mp[[a-1,b]]=[a,b];
                // if(!([a+1,b] in mp)) mp[[a+1,b]]=[a,b];
                // if(!([a,b-1] in mp)) mp[[a,b-1]]=[a,b];
                // if(!([a,b+1] in mp)) mp[[a,b+1]]=[a,b];
                
                visited[a][b]=true;
                
                if(a==0 || b==0 || a==n-1 || b==m-1)
                {
                    exit=[a,b]
                    s[a][b]='E';
                    
                    return true;
                }
            }
        }
    }
    
    return false;
}
function findpath(mp,s,x,y){
    a=exit[0]
    b=exit[1]
    v=[[a,b]]

    while(a!=x || b!=y){
        temp=mp[[a,b]]
        p=temp[0]
        q=temp[1]
        v.push([p,q])
        a=p;
        b=q;
    }
    v.reverse()
    return v;
}
function path(n,m,s){
    
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
    
    var path=bfs_a(astart,bstart,dp,s,mp)
    
    if(path)
    {
        v=findpath(mp,s,astart,bstart)
        return v;
    }
    else{
        return -1
    }
}