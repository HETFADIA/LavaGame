document.body.style.backgroundColor = 'lightblue'
var colors = {}
var representation = {}
var celltype = {}
var reverseCellType={}
var prevStrtCell = 0
var startCell = 0
var dp = []

var element = document.getElementsByClassName("container");
var TotalCells = element.length;
var lengthOfTopRow = Math.floor(Math.sqrt(TotalCells));


function updateColorDict() {
    colors = {}
    colors['lava'] = 'red'
    colors['lavapath'] = 'rgb(200,10,0)'
    colors['start'] = 'rgb(10,150,10)' //green
    colors['obstacle'] = 'lightblue'
    colors['normal'] = 'black'
    colors['path'] = 'rgb(10,185,10)'
    colors['LavaCapturedNormal']='#880000'
    colors['LavaCaptureStart']='#'
}
function updateRepresentation() {
    representation = {}
    representation['lava'] = 'M'
    representation['start'] = 'A'
    representation['obstacle'] = '#'
    representation['normal'] = '.'
}
function random(a, b) {
    let minimum = a;
    let difference = b - a;
    return Math.floor(minimum + Math.random() * difference);
}
function gridIndex(i, j) {
    return i * lengthOfTopRow + j;
}
function reverseGridIndex(indexa){
    return [int(indexa/lengthOfTopRow),indexa%lengthOfTopRow]
}
function setStart(n, m) {
    var x = random(0, m)
    var y = random(0, n)
    if (n > 2 && m > 2) {
        while (x == 0 || y == 0 || x == n - 1 || y == m - 1) {
            x = random(0, m)
            y = random(0, n)
        }
    }
    randomIndex = gridIndex(y, x)
    celltype[randomIndex] = 'start'
    if(!('start' in reverseCellType)){
        reverseCellType['start']=new Set()
    }
    
    reverseCellType['start'].add(randomIndex)
    
    startCell = randomIndex
    element[randomIndex].style.backgroundColor = colors['start']
}
function min(a, b) {
    return Math.min(a, b)
}
function int(a,b=undefined){
    if(b==undefined){
        return parseInt(a);
    }
    else if(b==0){
        
        if(a.slice(0,2)=='0b'){
            return parseInt(a.slice(2),2)
        }
        else if(a.slice(0,2)=="0x"){
            return parseInt(a.slice(2),16)
        }
        else if(a.slice(0,2)=="0o"){
            console.log("oct")
            return parseInt(a.slice(2),8)
        }
        return parseInt(a,10)
    }
    else{
        return parseInt(a,b);
    }
}
function setlava(n, m) {
    product = n * m;
    for (var j = 0; j < min(n, m) / 2; j++) {
        i = random(0, n * m)
        if (celltype[i] == 'normal') {
            celltype[i] = 'lava'
            element[i].style.backgroundColor = colors['lava']

        }
    }
}
function setObstacle(n, m) {
    product = n * m;
    for (var j = 0; j < min(n, m); j++) {
        i = random(0, n * m)
        if (celltype[i] == 'normal') {
            celltype[i] = 'obstacle'
            element[i].style.backgroundColor = colors['obstacle']

        }
    }
}
function reloadPage() {
    history.go(0)
}
function reset() {
    reverseCellType={}
    mp={}
    var n = +document.getElementById("length").value;
    manual(0)
    setlava(n, n)
    // setObstacle(n,n)
    simulate()
}
function manual(run=1) {
    var string = "";
    var n = +document.getElementById("length").value;

    for (var i = 0; i < n * n; i++) {
        string += `<div class="container" onclick="ithbox(${i})" onmousedown="rightclick(${i})"></div>`
    }
    for (var i = 0; i < 25; i++) {
        string += "<br>";
    }
    document.getElementById("matrix").innerHTML = string;
    var widthofdevice = window.innerWidth
    var setMargin = n <= (3.8 * widthofdevice / 100);//margin disappers above certain n for different devices

    var margin = 0
    if (setMargin) {
        margin = 100 / (50 * n)
    }
    let division = (100 / n - 2 * margin).toString();

    celltype = {}
    dp = []
    updateColorDict()
    updateRepresentation()
    for (var i = 0; i < n * n; i++) {
        document.getElementsByClassName("container")[i].style.width = division + "%"
        document.getElementsByClassName("container")[i].style.height = 0.9 * division + "vh"
        document.getElementsByClassName("container")[i].style.margin = margin + "%";
        celltype[i] = 'normal'
        element[i].style.backgroundColor = 'black'
    }
    element = document.getElementsByClassName("container");
    TotalCells = element.length;
    lengthOfTopRow = Math.floor(Math.sqrt(TotalCells));

    percolatevar = document.getElementsByClassName("changetext");
    setStart(n, n)
    if(run){
        simulate()
    }
}
function setCellLava(i) {
    celltype[i] = 'lava'
    element[i].style.backgroundColor = colors['lava']

}
function setCellStart(i) {
    celltype[i] = 'start'
    element[i].style.backgroundColor = colors['start']
    startCell = i
    reverseCellType['start']=new Set()
    reverseCellType['start'].add(startCell)
}
function setCellObstacle(i) {
    celltype[i] = 'obstacle'
    element[i].style.backgroundColor = colors['obstacle']
}
function setCellNormal(i) {
    celltype[i] = 'normal'
    element[i].style.backgroundColor = colors['normal']
}

function ithbox(i) {
    var pathIndices=[]
    if('path' in reverseCellType){
        for(var i1 of reverseCellType['path']){
            pathIndices.push(i1)
        }
    }
    delete reverseCellType['path']
    for(var j of pathIndices){
        setCellNormal(j)
    }
    if (celltype[i] == 'obstacle') {

        celltype[startCell] = 'normal'
        element[startCell].style.backgroundColor = colors['normal']
        
        setCellStart(i)
    }
    else if (celltype[i] == 'normal') {
        setCellLava(i)
    }
    else if (celltype[i] == 'lava') {
        setCellObstacle(i)
    }
    else if (celltype[i] == 'obstacle') {
        setCellNormal(i)
    }
    else if (celltype[i] == 'start') {
        setCellStart((i - 1 + element.length) % element.length)
        setCellNormal(i)
    }
    simulate()
}
function rightclick(i) {
    var rightclick;
    var e = window.event;
    if (e.which) rightclick = (e.which == 3);
    else if (e.button) rightclick = (e.button == 2);
    if(rightclick){
        var pathIndices=[]
        if('path' in reverseCellType){
            for(var i1 of reverseCellType['path']){
                pathIndices.push(i1)
            }
        }
        delete reverseCellType['path']
        for(var j of pathIndices){
            setCellNormal(j)
        }
        celltype[startCell] = 'normal'
        element[startCell].style.backgroundColor = colors['normal']
        
        setCellStart(i)
        simulate()
    }
}
function updatePathDoesNotExist() {
    var string = "Path Does not exist"
    document.getElementsByClassName('changetext')[0].innerHTML = string
}
function updatePath(ans, n, m) {
    var string = "Path Found"
    document.getElementsByClassName('changetext')[0].innerHTML = string
    for (var [a1, b1] of ans) {
        var indexa = gridIndex(a1, b1)
        if (celltype[indexa] == 'normal') {
            celltype[indexa] = 'path'
            if(!('path' in reverseCellType)){
                reverseCellType['path']=new Set()
            }
            reverseCellType['path'].add(indexa)
            element[indexa].style.backgroundColor = colors['path']
        }
    }



}
function simulate() {
    mp={}
    var pathIndices=[]
    if('path' in reverseCellType){
        for(var i of reverseCellType['path']){
            pathIndices.push(i)
        }
    }
    delete reverseCellType['path']
    for(var j of pathIndices){
        setCellNormal(j)
    }
    m = lengthOfTopRow
    n = element.length / m;
    s = matrix(n, m)
    
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            temp = celltype[gridIndex(i, j)]

            s[i][j] = representation[temp]

        }
    }
    
    ans = path(n, m, s)

    if (ans == -1) {
        updatePathDoesNotExist()
    }
    else {
        updatePath(ans, n, m)

    }
}
function myFunction() {

    reset()
}




var inf = Infinity
var mp = {}
var exit = []

class Queue {
    constructor(arr = []) {
        this.items = {};
        this.headIndex = 0;
        this.tailIndex = 0;
        for (var i of arr) {
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

    back() {
        return this.items[this.tailIndex - 1]
    }

    empty() {
        return this.tailIndex == this.headIndex;
    }

    get length() {
        return this.tailIndex - this.headIndex;
    }

}
function matrix(n, m, initialize = 0) {
    var arr = []
    for (var i = 0; i < n; i++) {
        arr.push([])
        for (var j = 0; j < m; j++) {
            arr[i].push(initialize)
        }
    }
    
    return arr;
}
diagonal = 1
function adj(a, b) {
    if (diagonal == 0)
        return [[a - 1, b], [a + 1, b], [a, b - 1], [a, b + 1]]
    return [[a - 1, b], [a + 1, b], [a, b - 1], [a, b + 1], [a - 1, b - 1], [a - 1, b + 1], [a + 1, b - 1], [a + 1, b + 1]]
}
function bfs_monster(monsters, dp, s) {
    n = dp.length; m = dp[0].length
    visited = matrix(n, m)
    var q = new Queue()
    lvl = 0
    for (var i of monsters) {
        
        q.enqueue(i)
    }
    
    while (!q.empty()) {
        lvl++;
        t = q.length;
        for (var i = 0; i < t; i++) {
            var items = q.dequeue();


            a = items[0]
            b = items[1]

            if (dp[a][b] > lvl) {
                dp[a][b] = lvl
                visited[a][b] = true;
                for (var [a1, b1] of adj(a, b)) {

                    if (0 <= a1 && a1 < n && 0 <= b1 && b1 < m && !visited[a1][b1] && s[a1][b1] != '#') q.enqueue([a1, b1])
                }
            }
        }
    }
    

}
function bfs_a(x, y, dp, s, mp) {
    n = dp.length
    m = dp[0].length
    visited = matrix(n, m)
    queuevisited={}
    lvl = 0
    q = new Queue()

    q.enqueue([x, y])
    queuevisited[[x,y]]=1
    while (!q.empty()) {
        lvl++;
        t = q.length;
        for (var i = 0; i < t; i++) {
            arr = q.dequeue()
            a = arr[0]
            b = arr[1]
            if (a >= 0 && b >= 0 && a < n && b < m && !visited[a][b] && dp[a][b] > lvl && s[a][b] != '#') {
                // dp[a][b] = min(dp[a][b], lvl);

                for (var [a1, b1] of adj(a, b)) {
                    
                    if(!queuevisited[[a1,b1]]){
                        if(0 <= a1 && a1 < n && 0 <= b1 && b1 < m){

                            q.enqueue([a1, b1])
                        }
                    }
                    
                }

                for (var [a1, b1] of adj(a, b)) {

                    if (!([a1, b1] in mp)) {
                        if(0 <= a1 && a1 < n && 0 <= b1 && b1 < m){

                            mp[[a1, b1]] = [a, b]
                        }
                    }
                    
                }

                visited[a][b] = true;

                if (a == 0 || b == 0 || a == n - 1 || b == m - 1) {
                    exit = [a, b]
                    s[a][b] = 'E';

                    return true;
                }
            }
        }
    }

    return false;
}
function findpath(mp, s, x, y) {
    a = exit[0]
    b = exit[1]
    v = [[a, b]]
    var counter=0;
    while (a != x || b != y) {
        counter++;
        if(counter==1000){
            return [[x,y],exit]
        }
        temp = mp[[a, b]]
        p = temp[0]
        q = temp[1]
        v.push([p, q])
        a = p;
        b = q;
    }
    v.reverse()
    return v;
}
function path(n, m, s) {

    dp = matrix(n, m, inf)
    var monsters = []
    var astart, bstart;
    for (var i = 0; i < n; i++) {
        for (var j = 0; j < m; j++) {
            if (s[i][j] == 'M') {
                monsters.push([i, j])
            }
            else if (s[i][j] == 'A') {
                astart = i;
                bstart = j;
            }
        }
    }

    bfs_monster(monsters, dp, s)

    var path = bfs_a(astart, bstart, dp, s, mp)

    if (path) {
        v = findpath(mp, s, astart, bstart)
        return v;
    }
    else {
        return -1
    }
}