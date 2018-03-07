// fichoro xml que está en el servidor rawgit
var url="https://rawgit.com/alexgaya/formulario/master/xml/from2.xml";
var xhttp = new XMLHttpRequest();
var formulario = null;
var puntuacion = 0;

var respMultiple = [];
var respText = [];
var respRadio = [];
var respCheckbox = [];
var respSelect = [];

window.onload = function(){

  formulario = document.getElementById("formulario");
  formulario.onsubmit = function(){
    iniciarNota();
    if(comprobar()){
      corregirText();
      corregirSelect();
      corregirMultiple();
      corregirCheckbox();
      corregirRadio();
      darNota();
      refrescar();
   }
    return false;
  }


  xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
    // función personalizada que gestiona la respuesta a la petición de fichero
    gestionarXml(this); 
   }
  };
  xhttp.open("GET", url, true); //url del fichero
  xhttp.send();
}

//comprobación
function comprobar(){
  //text
  for(i = 0; i < 2; i++){
    if (formulario.elements[i].value=="") {
      formulario.elements[i].focus();
      alert("Debes responder a la pregunta número "+(i+1));
      return false;
    }
  }

  //select
  for(i = 2; i < 4; i++){
    if (formulario.elements[i].selectedIndex==0) {
      formulario.elements[i].focus();
      alert("Debes seleccionar una opción en la pregunta número "+(i+1));
      return false;
    }
  }

  //select mútliple
  for(i = 4; i < 6; i++){
    var respuestas=false;
    for(j = 1; j < (formulario.elements[i].length); j ++){
      var opt = formulario.elements[i].options[j];
      if(opt.selected){
        respuestas = true;
      }
    }
    if (!respuestas) {
      formulario.elements[i].focus();
      alert("Debes seleccionar al menos una opción en la pregunta número "+(i+1));
      return false;
    }
  }

  //checkbox
  for(i = 6; i < 8; i++){
  var checked=false;
  var nombre;
    if (i==6){
      nombre=formulario.ck1;
    } else {
      nombre=formulario.ck2;
      }
      for (j = 0; j < nombre.length; j++) {  
        if (nombre[j].checked) {
          checked=true;
        }
      }
      if (!checked) {
        nombre[0].focus();
        alert("Debes seleccionar al menos una opción en la pregunta número "+(i+1));
        return false;
      }
   }

   //radio
  for(i = 8; i < 10; i++){
    var nombre;
    if (i==8){
      nombre=formulario.Radio1;
    } else {
      nombre=formulario.Radio2;
    }
    if (nombre.value=="") {
      nombre[0].focus();
      alert("Debes seleccionar una opción en la pregunta número "+(i+1));
      return false;
    }   
  }
  return true;
}

// función personalizada que gestiona la respuesta a la petición de fichero
function gestionarXml(dadesXml){
	var xmlDoc = dadesXml.responseXML;
	for(i = 0; i < 10; i++){
  		document.getElementsByTagName("h3")[i].innerHTML = xmlDoc.getElementsByTagName("title")[i].innerHTML;
    }

  //text
  for (i = 0; i < 2; i++) {
    respText[i] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[0].innerHTML;
  }
  //LEER SELECTS
  for(i = 2; i < 4; i++){
    var opcionesSelect = [];
    var largo = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
    for (j = 0; j < largo; j++) { 
      opcionesSelect[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option')[j].innerHTML;
    }
    ponerDatosSelectHtml(opcionesSelect, i); /*INTRODUCIR DATOS*/
    /*correccion*/
    respSelect[i] = parseInt(xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[0].innerHTML);
  }
  //LEER SELECTS MÚLTIPLES
  for(i = 4; i < 6; i++){
    var opcionesSelectMult = [];
    var largo = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
    for(j = 0; j < largo; j++){
      opcionesSelectMult[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option')[j].innerHTML;
    }
    ponerDatosSelectMultHtml(opcionesSelectMult, i); /*INTRODUCIR DATOS*/
    /*correccion*/
    var resp = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('answer').length;
    respMultiple[i]=[];
    for (k = 0; k < resp; k++){
      respMultiple[i][k] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[k].innerHTML;
    }
  }
  //LEER CHECKBOX
  for(i = 6; i < 8; i++){
    var opcionesCheck = [];
    var largo = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
    for(j = 0; j < largo; j++){
      opcionesCheck[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option')[j].innerHTML;
    }
    ponerDatosCheckHtml(opcionesCheck, i); /*INTRODUCIR DATOS*/
    /*correccion*/
    var resp = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('answer').length;
    respCheckbox[i]=[];
    for (k = 0; k < resp; k++){
      respCheckbox[i][k] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[k].innerHTML;
    }
  }
  //LEER RADIO
  for(i = 8; i < 10; i++){
    var opcionesRadio = [];
    var largo = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
    for(j = 0; j < largo; j++){
      opcionesRadio[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option")[j].innerHTML;
    }
    ponerDatosRadioHtml(opcionesRadio, i); /*INTRODUCIR DATOS*/
    /*correccion*/
    respRadio[i] = parseInt(xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("answer")[0].innerHTML);
  }
}
function ponerDatosSelectHtml(optSelect, i){
  var select = document.getElementsByTagName("select")[i-2]; 
  for(i = 0; i < optSelect.length; i++){ 
    var option = document.createElement("option");   
    option.text = optSelect[i];
    option.value = i + 1;
    select.options.add(option);
  }
}
function ponerDatosSelectMultHtml(optSelectMult, i){
  var selectMult = document.getElementsByTagName("select")[i-2];
  for(i = 0; i < optSelectMult.length; i++){
    var option = document.createElement("option");
    option.text = optSelectMult[i];
    option.value = i + 1;
    selectMult.options.add(option);
  }
}
function ponerDatosCheckHtml(optCheck, i){
  var check = document.getElementsByClassName("checkbox")[i-6];
  var forAttribute;
  if(i == 6){
    forAttribute = "ck1";
  }else{
    forAttribute = "ck2";
  }
  for(i = 0; i < optCheck.length; i++){
    var input = document.createElement("input");
    var label = document.createElement("label");
    var span = document.createElement("span");
    label.innerHTML = optCheck[i];
    //label.setAttribute("for", forAttribute);
    label.className = "container";
    span.className = "checkmark";
    input.type = "checkbox";
    //input.name = "opcion" + (i+1);
    input.id = forAttribute;
    input.value = i + 1;
    check.appendChild(label);
    label.appendChild(input); 
    label.appendChild(span);
    check.appendChild(document.createElement("br"));
  }
}
function ponerDatosRadioHtml(optRadio, i){
  var radio = document.getElementsByClassName("radio")[i-8];
  var nameRadio;
  if(i == 8){
    nameRadio = "Radio1";
  }else{
    nameRadio = "Radio2";
  }
  for(i = 0; i < optRadio.length; i++){
    var input = document.createElement("input");
    var label = document.createElement("label");
    var span = document.createElement("span");
    label.innerHTML = optRadio[i];
    label.className = "containerRadio";
    span.className = "checkmarkRadio";
    input.type = "radio";
    input.name = nameRadio;
    input.value = i + 1;
    radio.appendChild(label);
    label.appendChild(input);
    label.appendChild(span);
    radio.appendChild(document.createElement("br"));
  }
}

/*CORRECCIÓNES*/

function corregirText() {
  for(i = 0; i < 2; i++){
  var txt = formulario.elements[i].value;  
    if (txt==respText[i]) {
      nota +=1;
    }
  }
}

function corregirSelect() {
  for(i = 2; i < 4; i++){
  var sel = formulario.elements[i].value;  
    if (sel.selectedIndex==respSelect[i]) {
      nota +=1;
    }     
  }    
}

function corregirMultiple(){
  for(n = 4; n < 6; n++){
  var sel = formulario.elements[n];
  var correcta=[];
    for(i = 1; i < (sel.length); i++){
    var opt=sel.options[i];
      if(opt.selected){
        correcta[i]=false; 
        for (j = 0; j < respMultiple[n].length; j++) {
          if ((i-1)==respMultiple[n][j]) correcta[i]=true;
        }
        if (correcta[i]) {
          nota +=1.0/respMultiple[n].length;      
        }
      }
    }       
  }
}

function corregirCheckbox(){
  var f=document.getElementById("formulario");
  var correcta = [];
  for (n = 6; n < 8; n++){
    var nombre;
    if (n==6){
      nombre=f.ck1;
    } else {
      nombre=f.ck2;
    }
    for (i = 0; i < nombre.length; i++) {  
      if (nombre[i].checked) {
        correcta[i]=false;     
        for (j = 0; j < respCheckbox[n].length; j++) {
          if (i==respCheckbox[n][j]) correcta[i]=true;
        }
        if (correcta[i]) {
          nota +=1.0/respCheckbox[n].length;      
        }   
      } 
    }
  }
}

function corregirRadio(){
  var f=formulario;
  for(n=8;n<10;n++){
    var nombreRadio;
    if (n==8){
      nombreRadio=f.Radio1;
    } else {
      nombreRadio=f.Radio2;
      }
    if (nombreRadio.value==respRadio[n]) {
      nota +=1;
    }
  }        
}

function iniciarNota() {
  nota = 0.0;
}

function darNota(){
  if (nota > 4) {
    alert("Nota: " + nota.toFixed(2) + "/10 ¡Felicidades! Has aprobado");
  }else {
    alert("Nota: " + nota.toFixed(2) + "/10 ¡Mala suerte! Has suspendido");
  }
}

function refrescar() {
    location.reload();
}
