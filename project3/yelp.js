var map;
var marker;
var nlat=32.75;
var nlon=-97.13;
var radius=784;
var markers = [];
function initialize () {
  var input = document.getElementById("search");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    
});

google.maps.event.addListener(map,'idle',function(){
    nlat=map.getCenter().lat();
    nlon=map.getCenter().lng();
    var bounds=map.getBounds();
    var center=map.getCenter();
    if(bounds && center){
      var northeast=bounds.getNorthEast();
      
      radius=parseInt(google.maps.geometry.spherical.computeDistanceBetween(center,northeast));
      
      sendRequest();
    }
  });
}
function initMap() {
  var myLatLng = {lat: 32.75, lng: -97.13};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: myLatLng
  });  

}
function mark(latt,lon,i,name){
   marker = new google.maps.Marker({
    position: new google.maps.LatLng(latt ,lon),
    label: i.toString()
  });
  marker.setMap(map);
  markers.push(marker);
  Message(marker,name);
}
function Message(marker, msg) {
  var infowindow = new google.maps.InfoWindow({
    content: msg
  });

  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });
  
}
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setMapOnAll(null);
}

function sendRequest () {
   var xhr = new XMLHttpRequest();
   var query = document.getElementById("search").value;

   //indian+restaurant
   xhr.open("GET", "proxy.php?term="+query+"&latitude="+nlat+"&longitude="+nlon+"&radius="+radius+"&location=Arlington+Texas&limit=10");
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
        document.getElementById("output").innerHTML="<br>";

        clearMarkers();
          var json = JSON.parse(this.responseText);
          var x=json.businesses;
          if(x==null){
            return;
          }
          for(var i=0;i<x.length;i++){

            var br = document.createElement("br");
            document.getElementById("output").appendChild(br);
            var link=document.createElement("a");
            document.getElementById("output").appendChild(document.createTextNode(i+1+")  "));
            link.appendChild(document.createTextNode(x[i].name));
            link.href = x[i].url;
            var xa = document.createElement("IMG");
            xa.setAttribute("src", x[i].image_url);
            xa.setAttribute("width", "90");
            xa.setAttribute("height", "90");
            xa.setAttribute("alt", "image not found");
            link.appendChild(br);
            link.appendChild(xa);
            link.appendChild(document.createElement("br"));
            link.appendChild(document.createTextNode("Ratings: "+x[i].rating+"/5"));
            link.appendChild(document.createElement("br"));
            document.getElementById("output").appendChild(link);
            
            
            var lat=parseFloat(x[i].coordinates.latitude);
            var lon=parseFloat(x[i].coordinates.longitude);

            mark(lat,lon,i+1,x[i].name);
            
          }
       }
   };
   xhr.send(null);
}
