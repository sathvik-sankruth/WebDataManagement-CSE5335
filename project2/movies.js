function initialize () {
  var input = document.getElementById("form-input");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    
});
}
function castfun(id){
  var xhr2= new XMLHttpRequest();
  xhr2.open("GET","proxy.php?method=/3/movie/"+id+"/casts");
  xhr2.setRequestHeader("Accept","application/json");
  xhr2.onreadystatechange=function(){
    if(this.readyState==4){
      var json2=JSON.parse(this.responseText);
      var y=json2.cast;
      var txt2='';
      document.getElementById("output3").innerHTML="<h4>Top 5 Casts: </h4>";
      var x1 = document.createElement("UL");
      x1.setAttribute("id", "myUL");
      document.getElementById("output3").appendChild(x1);
      
      for(i=0;i<5;i++){
        var z = document.createElement("LI");
        var t = document.createTextNode(y[i].name);
        z.appendChild(t);
        document.getElementById("myUL").appendChild(z);
      }
    }
  };
   xhr2.send();
}
function clickfun(id){
  var xhr1=new XMLHttpRequest();
  var query1=id.target.myParam;
  xhr1.open("GET","proxy.php?method=/3/movie/"+query1);
  xhr1.setRequestHeader("Accept","application/json");
  xhr1.onreadystatechange=function(){
    if(this.readyState ==4){
      var json1=JSON.parse(this.responseText);
      var txt1='';
      document.getElementById("output2").innerHTML="<h3>TITLE: "+json1.title+"</h3>";
      var xa = document.createElement("IMG");
      xa.setAttribute("src", "http://image.tmdb.org/t/p/w185/"+json1.poster_path);
      xa.setAttribute("width", "304");
      xa.setAttribute("height", "228");
      xa.setAttribute("alt", "image not found");
      document.getElementById("output2").appendChild(xa)+"<br>";
      var br = document.createElement("br");
      document.getElementById("output2").appendChild(br);
      var x1=json1.genres
      for(i=0;i<x1.length;i++){
        txt1=txt1+" "+x1[i].name+",";
      }
      document.getElementById("output2").innerHTML +="<h4>Genres: "+ txt1+"</h4>";
      document.getElementById("output2").innerHTML+="<h4>OverView: "+json1.overview+"</h4>";
      castfun(json1.id);
    }
  };
   xhr1.send();
}

function sendRequest () {
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var txt='';
          var x=json.results;
          document.getElementById("output").innerHTML="<br>";
          
          for (i = 0; i < x.length; i++) {
            var br = document.createElement("br");
            document.getElementById("output").appendChild(br);
            var link=document.createElement("a");
            link.appendChild(document.createTextNode(x[i].title+" =>  "+x[i].release_date));
            link.href = '#';
            
            link.addEventListener('click',clickfun,false);
            link.myParam = x[i].id;
            
            document.getElementById("output").appendChild(link);

 
          }
       }
   };
   xhr.send(null);
}