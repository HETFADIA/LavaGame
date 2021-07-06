var colors={}
var celltype={}
diagonal=0
element = document.getElementsByClassName("container");
var TotalCells= element.length;
var lengthOfTopRow= Math.floor(Math.sqrt(TotalCells));
function updateColorDict(){
    colors['lava']='red'
    colors['start']='green'
    colors['obstacle']='yellow'
    colors['cell']='black'
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
    var randomIndex=random(0,n*m)
    element[randomIndex].style.backgroundColor=colors['start']
}
function myFunction(){
    updateColorDict()
    var string="";
    var n=+document.getElementById("length").value;
    console.log(n)
    for( var i=0;i<n*n;i++){
        string+='<div class="container" onclick="ithbox('+i+')"></div>'
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
    }
    element = document.getElementsByClassName("container");
    TotalCells= element.length;
    lengthOfTopRow= Math.floor(Math.sqrt(TotalCells));
    // using percolatevar i have selected all the boxes in which the text changes
    percolatevar = document.getElementsByClassName("changetext");
    setStart(n,n)
}