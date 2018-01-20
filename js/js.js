var botonMenuX = false;
var elem = [];
var content = [];
var contenido = null;
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


	/*EVENTOS BOTON MENú*/
	document.getElementById("boton").onclick = function(){
		cambiarBoton();
	}
	/*EVENTOS OPCIONES*/
	/*for(var i = 0; i < elem.length; i++){
		elem[i].onclick = function(){
			transicionPlus();
		}
	}*/
	elem[0].onclick = function(){
		transicionPlus();
		contenido = 0;
		/*cambiarContenido();*/
	}
	elem[1].onclick = function(){
		transicionPlus();
		contenido = 1;
		/*cambiarContenido();*/
	}
	elem[2].onclick = function(){
		transicionPlus();
		contenido = 2;
		/*cambiarContenido();*/
	}
	elem[3].onclick = function(){
		transicionPlus();
		contenido = 3;
		/*cambiarContenido();*/
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
			/*for(var i = 0; i < elem.length; i++){
				elem[i].style.display = "inline-block";
			}*/
			document.getElementById("lista").style.display = "block";
			animationOpenMenu();
		} else {
			pos ++;
			document.getElementById("izquierda").style.width = pos + "%";
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
			document.getElementById("izquierda").style.width = pos + "%";
		}
	}
}

function animationSeparador(){
	for (var i = 0; i < 3; i++){
		document.getElementsByClassName("separacion")[i].style.display = "block";
	}
	/*document.getElementsByClassName("separacion")[0].style.marginTop = 22 + "%";
	document.getElementsByClassName("separacion")[1].style.marginTop = 52 + "%";
	document.getElementsByClassName("separacion")[2].style.marginTop = 82 + "%";*/
	var pos = 0;
	var id = setInterval(plus, 10);
	function plus(){
		if (pos == 80) {
			clearInterval(id);
		} else {
			pos ++;
			for(var i = 0; i < 3; i++){
				document.getElementsByClassName("separacion")[i].style.width = pos + "%";
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
			document.getElementById("izquierda").style.width = 50 + "px";
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
			document.getElementById("izquierda").style.width = pos + "%";
			if (pos == 30) {
				/*for(var i = 0; i < elem.length; i++){
					elem[i].style.display = "none";
				}*/
				document.getElementById("lista").style.display = "none";
				for(var i = 0; i < 3; i++){
					document.getElementsByClassName("separacion")[i].style.display = "none";
				}	
				for(var i = 0; i < 3; i++){
					document.getElementsByClassName("separacion")[i].style.width = 0 + "%";
				}
			}
		}
	}
}

function transicionPlus(){
	document.getElementById("transicion").style.display = "block";
	var pos = 0;
	var id = setInterval(plus, 5);
 	function plus(){
 		if (pos == 65) {
 			clearInterval(id);
 			transicionLess();
 		} else {
 			pos ++;
 			document.getElementById("transicion").style.width = pos + "%";
 		}
 	}	
}

function transicionLess(){	
	var pos = 65;
	var id = setInterval(less, 5);
 	function less(){
 		if (pos == 0) {
 			clearInterval(id);
 			document.getElementById("transicion").style.display = "none";
 			cambiarContenido();
 			if(contenido==4){
 				document.getElementById("logo").style.display = "block";
				document.getElementById("welcome").style.display = "block";
				document.getElementById("joinDiv").style.display = "block";
 			}
 		} else {
 			pos --;
 			document.getElementById("transicion").style.width = pos + "%";
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
