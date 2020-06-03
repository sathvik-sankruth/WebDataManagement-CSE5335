var vx,vy,x,y,cw,ch,to,count,rads,speed=1,angle,speeds;
function initialize(){
	//vx=1;
	//vy=1;
	x=0;
	//y=0;
	//speed=1;
	speeds=speed*50;
	count=0;
	document.getElementById('ball').style.left=0+'px';
	document.getElementById('ball').style.top=Math.floor(Math.random() * (400 - 0) + 0)+'px';
	y=parseInt(document.getElementById('ball').style.top);
	angle=Math.floor(Math.random() * (45 - (-45)) + (-45));
	if(angle==0){
		angle=45;
	}
	rads = angle * Math.PI / 180;

    //calculate the x and y components of the velocity in pixels per frame
    //speed is in pixels per second, so divide by 60 to get pixels per frame
     vx = Math.cos(rads)*speeds/60;
     vy = Math.sin(rads)*speeds/60;
	//document.getElementById('score').innerHTML=0;
	document.getElementById('messages').innerHTML=angle;
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
	//document.getElementById('messages').innerHTML=pad.style.top;

}
function startGame(){
	x+=vx;
	y+=vy;
	if(y>400 || y<-80){
		vy=-1*vy;
	}
	if(x>800 ){
		pausegame();
		//initialize();		
		return;

	}
	if(x>750){
		if(parseInt(y+80)>=parseInt(document.getElementById('paddle').style.top) && parseInt(y+80)<=parseInt(document.getElementById('paddle').style.top)+102) {
		count++;
		document.getElementById('strikes').innerHTML=count;
		vx=-1*vx;
		}
	}
	
	if(x<0){
		vx=-1*vx;
	}
	//document.getElementById('messages').innerHTML=parseInt(document.getElementById('paddle').style.top)+" "+parseInt(y);
	document.getElementById('ball').style.left=x+'px';
	document.getElementById('ball').style.top=y+'px';
	to=setTimeout(startGame,5);

}
function pausegame(){
	clearTimeout(to);
	var val=parseInt(document.getElementById('score').innerHTML);
	
	if(count>val){
		document.getElementById('score').innerHTML=count;	
	}
	
	document.getElementById('strikes').innerHTML=0;
	count=0;
	x=0;
	initialize();

}


function resetGame(){
	clearTimeout(to);
	window.location.reload();

}
function setSpeed(val){
	speed=val;
	speeds=speed*50;
	angle=Math.floor(Math.random() * (45 - (-45)) + (-45));
	rads = angle * Math.PI / 180;

     vx = Math.cos(rads)*speeds/60;
     vy = Math.sin(rads)*speeds/60;
	
}