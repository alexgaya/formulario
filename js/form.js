// fichoro xml que está en el servidor rawgit
var url="https://rawgit.com/alexgaya/formulario/master/xml/formulario.xml";
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
 if (this.readyState == 4 && this.status == 200) {
  // función personalizada que gestiona la respuesta a la petición de fichero
  gestionarXml(this); 
 }
};
xhttp.open("GET", url, true); //url del fichero
xhttp.send();

window.onload = function(){
	gestionarXml();
}

// función personalizada que gestiona la respuesta a la petición de fichero
function gestionarXml(dadesXml){
	var xmlDoc = dadesXml.responseXML;
	for(var i = 0; i < 10; i++){
  		document.getElementsByTagName("h3")[i].innerHTML = xmlDoc.getElementsByTagName("title")[i].innerHTML;
    }	  
    for(var i = 0; i < 15; i++){
    	document.getElementsByTagName("option")[i].innerHTML = xmlDoc.getElementsByTagName("option")[i].innerHTML;
    }
    for(var i = 0; i < 16; i++){
    	document.getElementsByTagName("label")[i].innerHTML = xmlDoc.getElementsByTagName("option")[i + 15].innerHTML;
    }
}
