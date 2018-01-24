var botonMenuX = false;
var elem = [];
var content = [];
var contenido = null;
var trans = null;
var menu = null;
var lineas = null;
window.onload = function(){
	/*OPCIONES MENÚ*/
	elem[0] = document.getElementById("opcionesInicio"); 
	elem[1] = document.getElementById("opcionesInfo");
	elem[2] = document.getElementById("opcionesUbic");
	elem[3] = document.getElementById("opcionesJoin");

	/*CONTENIDO OPCIONES*/
	content[0] = document.getElementById("inicioContent");
	content[1] = document.getElementById("infoContent");
	content[2] = document.getElementById("ubicContent");

	/*ELEMENTOS ANIMACIÓN*/
	trans = document.getElementById("transicion");
	menu = document.getElementById("izquierda");
	lineas = document.getElementsByClassName("separacion");

	/*EVENTO BOTON EXAMEN*/
	document.getElementById("joinDiv").onclick = function(){
		location.href = "formulario.html";
	}

	/*EVENTOS BOTON MENú*/
	document.getElementById("boton").onclick = function(){
		cambiarBoton();
	}
	/*EVENTOS OPCIONES*/
	elem[0].onclick = function(){
		transicionPlus();
		contenido = 0;
	}
	elem[1].onclick = function(){
		transicionPlus();
		contenido = 1;
	}
	elem[2].onclick = function(){
		transicionPlus();
		contenido = 2;
	}
	elem[3].onclick = function(){
		transicionPlus();
		contenido = 3;
	}
/*FINAL WINDOW ONLOAD*/
}

function cambiarBoton(){
	if(!botonMenuX){
		document.getElementById("botonMenu").src = "img/buttons/xMaterial.png";
		document.getElementById("logo").style.display = "none";
		document.getElementById("welcome").style.display = "none";
		document.getElementById("joinDiv").style.display = "none";
		openMenu();
		botonMenuX = true;
	} else {
		document.getElementById("botonMenu").src = "img/buttons/menuMaterial.png";
		closeMenu();
		botonMenuX = false;
	}
}

function openMenu(){
	var pos = 3;
	var id = setInterval(plus, 10);
	function plus(){
		if (pos == 40) {
			clearInterval(id);
			contenido = null;
			document.getElementById("lista").style.display = "block";
			animationOpenMenu();
		} else {
			pos ++;
			menu.style.width = pos + "%";
		}
	}
}

function animationOpenMenu(){
	var pos = 40;
	var id = setInterval(less, 10);
	function less(){
		if (pos == 35) {
			clearInterval(id);
			animationSeparador();
		} else {
			pos --;
			menu.style.width = pos + "%";
		}
	}
}

function animationSeparador(){
	for (var i = 0; i < 3; i++){
		lineas[i].style.display = "block";
	}
	var pos = 0;
	var id = setInterval(plus, 10);
	function plus(){
		if (pos == 80) {
			clearInterval(id);
		} else {
			pos ++;
			for(var i = 0; i < 3; i++){
				lineas[i].style.width = pos + "%";
			}
		}
	}
}

function closeMenu(){
	var pos = 35;
	var id = setInterval(less, 10);
	function less(){
		if (pos == 3) {
			clearInterval(id);
			menu.style.width = 50 + "px";
			if(contenido < 4 && contenido != null){
				contenido = 4;
				transicionPlus();
			}
			if (contenido == null) {
				document.getElementById("logo").style.display = "block";
				document.getElementById("welcome").style.display = "block";
				document.getElementById("joinDiv").style.display = "block";
			}
		} else {
			pos --;
			menu.style.width = pos + "%";
			if (pos == 30) {
				document.getElementById("lista").style.display = "none";
				for(var i = 0; i < 3; i++){
					lineas[i].style.display = "none";
				}	
				for(var i = 0; i < 3; i++){
					lineas[i].style.width = 0 + "%";
				}
			}
		}
	}
}

function transicionPlus(){
	trans.style.display = "block";
	var pos = 0;
	var id = setInterval(plus, 5);
 	function plus(){
 		if (pos == 65) {
 			clearInterval(id);
 			transicionLess();
 		} else {
 			pos ++;
 			trans.style.width = pos + "%";
 		}
 	}	
}

function transicionLess(){	
	var pos = 65;
	var id = setInterval(less, 5);
 	function less(){
 		if (pos == 0) {
 			clearInterval(id);
 			trans.style.display = "none";
 			cambiarContenido();
 			if(contenido==4){
 				document.getElementById("logo").style.display = "block";
				document.getElementById("welcome").style.display = "block";
				document.getElementById("joinDiv").style.display = "block";
 			}
 		} else {
 			pos --;
 			trans.style.width = pos + "%";
 		}
 	}	
}

function cambiarContenido(){
	switch(contenido){
		case 0:
			for(var i = 1; i < content.length; i++){
				content[i].style.display ="none";
			}
			content[0].style.display = "block";
			break;
		case 1:
			content[0].style.display = "none";
			content[2].style.display = "none";
			content[1].style.display = "block";
			break;
		case 2:
			for(var i = 0; i < content.length - 1; i++){
				content[i].style.display = "none";
			}
			content[2].style.display = "block";
			break;
		case 4:
			for(var i = 0; i < content.length; i++){
				content[i].style.display = "none";
			}
			break;
	}
}
