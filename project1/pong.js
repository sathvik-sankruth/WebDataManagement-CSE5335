var vx,vy,x,y,cw,ch,to,count;
function initialize(){
	vx=1;
	vy=1;
	x=0;
	y=0;
	count=0;
	ch=document.getElementById('court').style.height;
	cw=document.getElementById('court').style.width;
	document.getElementById('score').innerHTML=0;
	//document.getElementById('ball').style.left=0+'px';
	//document.getElementById('ball').style.top=Math.floor(Math.random() * (400 - 0) + 0)+'px';
	//var val=parseInt(document.getElementById('score').innerHTML);
	//console.log(val);

}
function movePaddle(e){
	var pad=document.getElementById('paddle');
	if(e.clientY<'150'){
		pad.style.top='0px';
	}
	else if(e.clientY>'550'){
		pad.style.top='400px'
	}
	else{
	pad.style.top=e.clientY-'150'+'px';		
	}
	//document.getElementById('messages').innerHTML='x '+x+' y '+y;
	//document.getElementById('messages').innerHTML='ch'+ch+'cw'+cw;

}
function pausegame(){
	clearTimeout(to);
	x=0;
	y=0;
	var val=parseInt(document.getElementById('score').innerHTML);
	//console.log(val);
	if(count>val){
		document.getElementById('score').innerHTML=count;	
	}
	
	document.getElementById('strikes').innerHTML=0;
	count=0;
	document.getElementById('ball').style.left=0+'px';
	document.getElementById('ball').style.top=Math.floor(Math.random() * (400 - 0) + 0)+'px';
}
function startGame(){
	x+=vx;
	y+=vy;
	if(y>400 || y<-80){
		vy=-1*vy;
	}
	if(x>800 ){
		pausegame();
		console.log("HIII");
		//initialize();		
		return;

		//clearTimeout(to);
		//document.getElementById('ball').style.left=0+'px';
		//document.getElementById('ball').style.top=0+'px';

	}
	if(x>750){
		if((y+80)>=parseInt(document.getElementById('paddle').style.top) && (y+80)<parseInt(document.getElementById('paddle').style.top)+80) {
		count++;
		document.getElementById('strikes').innerHTML=count;
		vx=-1*vx;
		}
	}
	
	if(x<0){
		vx=-1*vx;
	}
	
	//document.getElementById('messages').innerHTML=parseInt(document.getElementById('paddle').style.top);
	//document.getElementById('messages').innerHTML=parseInt(document.getElementById('paddle').style.top)+20;
	
	//document.getElementById('messages').innerHTML='x '+x+' y '+y;
	
	document.getElementById('ball').style.left=x+'px';
	document.getElementById('ball').style.top=y+'px';
	to=setTimeout(startGame,5);

}


function resetGame(){
	clearTimeout(to);
	window.location.reload();

}
function setSpeed(val){
	vx=val;
	vy=val;

}