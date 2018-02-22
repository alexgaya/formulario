// fichoro xml que está en el servidor rawgit
var url="https://rawgit.com/alexgaya/formulario/master/xml/formulario.xml";
var xhttp = new XMLHttpRequest();
window.onload = function(){
  xhttp.onreadystatechange = function() {
   if (this.readyState == 4 && this.status == 200) {
    // función personalizada que gestiona la respuesta a la petición de fichero
    gestionarXml(this); 
   }
  };
  xhttp.open("GET", url, true); //url del fichero
  xhttp.send();

}

// función personalizada que gestiona la respuesta a la petición de fichero
function gestionarXml(dadesXml){
	var xmlDoc = dadesXml.responseXML;
	for(i = 0; i < 10; i++){
  		document.getElementsByTagName("h3")[i].innerHTML = xmlDoc.getElementsByTagName("title")[i].innerHTML;
    }
  //LEER SELECTS
  for(i = 2; i < 4; i++){
    var opcionesSelect = [];
    var largo = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
    for (j = 0; j < largo; j++) { 
      opcionesSelect[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option')[j].innerHTML;
    }
    ponerDatosSelectHtml(opcionesSelect, i); /*INTRODUCIR DATOS*/
  }
  //LEER SELECTS MÚLTIPLES
  for(i = 4; i < 6; i++){
    var opcionesSelectMult = [];
    var largo = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
    for(j = 0; j < largo; j++){
      opcionesSelectMult[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option')[j].innerHTML;
    }
    ponerDatosSelectMultHtml(opcionesSelectMult, i); /*INTRODUCIR DATOS*/
  }
  //LEER CHECKBOX
  for(i = 6; i < 8; i++){
    var opcionesCheck = [];
    var largo = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
    for(j = 0; j < largo; j++){
      opcionesCheck[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option')[j].innerHTML;
    }
    ponerDatosCheckHtml(opcionesCheck, i); /*INTRODUCIR DATOS*/
  }
  //LEER RADIO
  for(i = 8; i < 10; i++){
    var opcionesRadio = [];
    var largo = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName('option').length;
    for(j = 0; j < largo; j++){
      opcionesRadio[j] = xmlDoc.getElementsByTagName("question")[i].getElementsByTagName("option")[j].innerHTML;
    }
    ponerDatosRadioHtml(opcionesRadio, i); /*INTRODUCIR DATOS*/
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
    //input.id = forAttribute;
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