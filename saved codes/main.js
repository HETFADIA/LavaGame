var colors={}
diagonal=0
function updateColorDict(){
    colors['lava']='red'
    colors['start']='green'
    colors['obstacle']='yellow'
    colors['cell']='black'
}
function split(arr){
    arr=arr.split(" ");
    newarr=[]
    for(var i=0;i<arr.length;i++){
        if(arr[i]!=""){
            newarr.push(arr[i]);
        }
    }
    return newarr;
}
function myFunction(){
    updateColorDict()
    var arr=document.getElementById("length").value
    arr=split(arr)
    n=+arr[0]
    m=+arr[1]
    var string=""
    for( var i=0;i<n;i++){
        for(var j=0;j<m;j++){

            string+='<div class="container" onclick="ithbox('+i+')"></div>'
        }
    }
    for(var i=0;i<32;i++){
        string+="<br>";
    }
    document.getElementById("matrix").innerHTML=string;
    var widthofdevice=window.innerWidth
    var setMargin=n<=(3.8*widthofdevice/100);//margin disappers above certain n for different devices
 
    var marginx=0
    var marginy=0
    if(setMargin){
        marginx=100/(50*n)
        marginy=100/(50*m)
    }
    let divisionx=(100/n-2*marginx).toString();
    let divisiony=(100/n-2*marginy).toString();


    for(var i=0;i<n*m;i++){
        document.getElementsByClassName("container")[i].style.width=divisionx+"%"
        document.getElementsByClassName("container")[i].style.height=divisiony+"vh"
        document.getElementsByClassName("container")[i].style.margin=marginx+"%";
    }
}