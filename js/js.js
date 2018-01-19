var botonMenuX = false;
var elem0 = null;
var elem1 = null;
var elem2 = null;
var elem3 = null;
window.onload = function(){
	elem0 = document.getElementById("opcionesInicio"); 
	elem1 = document.getElementById("opcionesInfo");
	elem2 = document.getElementById("opcionesUbic");
	elem3 = document.getElementById("opcionesAbout");
	document.getElementById("boton").onclick = function(){
		cambiarBoton();
	}
	elem0.onclick = function(){
		transicionPlus();
	}
	elem1.onclick = function(){
		transicionPlus();
	}
	elem2.onclick = function(){
		transicionPlus();
	}
	elem3.onclick = function(){
		transicionPlus();
	}
}

function cambiarBoton(){
	if(!botonMenuX){
		document.getElementById("botonMenu").src = "img/buttons/xMaterial.png"
		openMenu();
		botonMenuX = true;
	} else {
		document.getElementById("botonMenu").src = "img/buttons/menuMaterial.png"
		closeMenu();
		botonMenuX = false;
	}
}

function openMenu(){
	var pos = 3;
	var id = setInterval(plus, 10);
	function plus(){
		if (pos == 25) {
			clearInterval(id);
			elem0.style.display = "block";
			elem1.style.display = "block";
			elem2.style.display = "block";
			elem3.style.display = "block";
			animationOpenMenu();
		} else {
			pos ++;
			document.getElementById("izquierda").style.width = pos + "%";
		}
	}
}
function animationOpenMenu(){
	var pos = 25;
	var id = setInterval(less, 10);
	function less(){
		if (pos == 20) {
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
	document.getElementsByClassName("separacion")[0].style.marginTop = 22 + "%";
	document.getElementsByClassName("separacion")[1].style.marginTop = 52 + "%";
	document.getElementsByClassName("separacion")[2].style.marginTop = 82 + "%";
	var pos = 0;
	var id = setInterval(plus, 10);
	function plus(){
		if (pos == 80) {
			clearInterval(id);
		} else {
			pos ++;
			document.getElementsByClassName("separacion")[0].style.width = pos + "%";
			document.getElementsByClassName("separacion")[1].style.width = pos + "%";
			document.getElementsByClassName("separacion")[2].style.width = pos + "%";
		}
	}
}

function closeMenu(){
	var pos = 20;
	var id = setInterval(less, 10);
	function less(){
		if (pos == 3) {
			clearInterval(id);
			document.getElementById("izquierda").style.width = 50 + "px";
		} else {
			pos --;
			document.getElementById("izquierda").style.width = pos + "%";
			if (pos == 12) {
				elem0.style.display = "none";
				elem1.style.display = "none";
				elem2.style.display = "none";
				elem3.style.display = "none";
				document.getElementsByClassName("separacion")[0].style.display = "none";
				document.getElementsByClassName("separacion")[1].style.display = "none";
				document.getElementsByClassName("separacion")[2].style.display = "none";
				for(var i = 0; i < 3; i++){
					document.getElementsByClassName("separacion")[i].style.width = 0 + "%";
				}
			}
		}
	}
}
/*function showButtons(){
	if(!botonMenuX){
		document.getElementById("opcionesInicio").style.display = "block";
		document.getElementById("opcionesInfo").style.display = "block";
		document.getElementById("opcionesUbic").style.display = "block";
		document.getElementById("opcionesAbout").style.display = "block";
		myMovePlus();	
	} else {
		myMoveLess();
	}
}

function myMovePlus(){	
 	var pos = 0;
 	var id = setInterval(frame, 10);
 	function frame(){
	 	if (pos == 100){
	 		clearInterval(id)
	 	} else {
	 		pos++;
			elem0.style.width = pos + "%";
			elem1.style.width = pos + "%";
			elem2.style.width = pos + "%";
			elem3.style.width = pos + "%";
			if (pos == 22){
				document.getElementById("opcionesInicioP").style.display = "block";
			}
			if (pos == 51){
				document.getElementById("opcionesInfoP").style.display = "block";
			}
			if (pos == 40) {
				document.getElementById("opcionesUbicP").style.display = "block";
			}
			if (pos == 37) {
				document.getElementById("opcionesAboutP").style.display = "block";
			}
	 	}
 	}
}

function myMoveLess(){
 	var pos = 100;
 	var id = setInterval(frame, 10);
 	function frame(){
	 	if (pos == 0){
	 		clearInterval(id)
	 		elem0.style.display = "none";
			elem1.style.display = "none";
			elem2.style.display = "none";
			elem3.style.display = "none";
	 	} else {
	 		pos--;
			elem0.style.width = pos + "%";
			elem1.style.width = pos + "%";
			elem2.style.width = pos + "%";
			elem3.style.width = pos + "%";
			if (pos == 22){
				document.getElementById("opcionesInicioP").style.display = "none";
			}
			if (pos == 51){
				document.getElementById("opcionesInfoP").style.display = "none";
			}
			if (pos == 40) {
				document.getElementById("opcionesUbicP").style.display = "none";
			}
			if (pos == 37) {
				document.getElementById("opcionesAboutP").style.display = "none";
			}
	 	}
 	}

}*/

function transicionPlus(){
	document.getElementById("transicion").style.display = "block";
	var pos = 0;
	var id = setInterval(plus, 5);
 	function plus(){
 		if (pos == 80) {
 			clearInterval(id);
 			transicionLess();
 		} else {
 			pos ++;
 			document.getElementById("transicion").style.width = pos + "%";
 		}
 	}	
}

function transicionLess(){	
	var pos = 80;
	var id = setInterval(less, 5);
 	function less(){
 		if (pos == 0) {
 			clearInterval(id);
 			document.getElementById("transicion").style.display = "none";
 		} else {
 			pos --;
 			document.getElementById("transicion").style.width = pos + "%";
 		}
 	}	
}

