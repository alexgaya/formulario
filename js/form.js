var url="https://rawgit.com/alexgaya/formulario/master/xml/formulario.xml",xhttp=new XMLHttpRequest,formulario=null,puntuacion=0,respMultiple=[],respText=[],respRadio=[],respCheckbox=[],respSelect=[];function comprobar(){for(i=0;i<2;i++)if(""==formulario.elements[i].value)return formulario.elements[i].focus(),alert("Debes responder a la pregunta número "+(i+1)),!1;for(i=2;i<4;i++)if(0==formulario.elements[i].selectedIndex)return formulario.elements[i].focus(),alert("Debes seleccionar una opción en la pregunta número "+(i+1)),!1;for(i=4;i<6;i++){var e=!1;for(j=1;j<formulario.elements[i].length;j++){formulario.elements[i].options[j].selected&&(e=!0)}if(!e)return formulario.elements[i].focus(),alert("Debes seleccionar al menos una opción en la pregunta número "+(i+1)),!1}for(i=6;i<8;i++){var t=!1;for(n=6==i?formulario.ck1:formulario.ck2,j=0;j<n.length;j++)n[j].checked&&(t=!0);if(!t)return n[0].focus(),alert("Debes seleccionar al menos una opción en la pregunta número "+(i+1)),!1}for(i=8;i<10;i++){var n;if(""==(n=8==i?formulario.Radio1:formulario.Radio2).value)return n[0].focus(),alert("Debes seleccionar una opción en la pregunta número "+(i+1)),!1}return!0}function gestionarXml(e){var t=e.responseXML;for(i=0;i<10;i++)document.getElementsByTagName("h3")[i].innerHTML=t.getElementsByTagName("title")[i].innerHTML;for(i=0;i<2;i++)respText[i]=t.getElementsByTagName("question")[i].getElementsByTagName("answer")[0].innerHTML;for(i=2;i<4;i++){var n=[],a=t.getElementsByTagName("question")[i].getElementsByTagName("option").length;for(j=0;j<a;j++)n[j]=t.getElementsByTagName("question")[i].getElementsByTagName("option")[j].innerHTML;ponerDatosSelectHtml(n,i),respSelect[i]=parseInt(t.getElementsByTagName("question")[i].getElementsByTagName("answer")[0].innerHTML)}for(i=4;i<6;i++){var o=[];a=t.getElementsByTagName("question")[i].getElementsByTagName("option").length;for(j=0;j<a;j++)o[j]=t.getElementsByTagName("question")[i].getElementsByTagName("option")[j].innerHTML;ponerDatosSelectMultHtml(o,i);var r=t.getElementsByTagName("question")[i].getElementsByTagName("answer").length;for(respMultiple[i]=[],k=0;k<r;k++)respMultiple[i][k]=t.getElementsByTagName("question")[i].getElementsByTagName("answer")[k].innerHTML}for(i=6;i<8;i++){var l=[];a=t.getElementsByTagName("question")[i].getElementsByTagName("option").length;for(j=0;j<a;j++)l[j]=t.getElementsByTagName("question")[i].getElementsByTagName("option")[j].innerHTML;ponerDatosCheckHtml(l,i);r=t.getElementsByTagName("question")[i].getElementsByTagName("answer").length;for(respCheckbox[i]=[],k=0;k<r;k++)respCheckbox[i][k]=t.getElementsByTagName("question")[i].getElementsByTagName("answer")[k].innerHTML}for(i=8;i<10;i++){var m=[];a=t.getElementsByTagName("question")[i].getElementsByTagName("option").length;for(j=0;j<a;j++)m[j]=t.getElementsByTagName("question")[i].getElementsByTagName("option")[j].innerHTML;ponerDatosRadioHtml(m,i),respRadio[i]=parseInt(t.getElementsByTagName("question")[i].getElementsByTagName("answer")[0].innerHTML)}}function ponerDatosSelectHtml(e,t){var n=document.getElementsByTagName("select")[t-2];for(t=0;t<e.length;t++){var a=document.createElement("option");a.text=e[t],a.value=t+1,n.options.add(a)}}function ponerDatosSelectMultHtml(e,t){var n=document.getElementsByTagName("select")[t-2];for(t=0;t<e.length;t++){var a=document.createElement("option");a.text=e[t],a.value=t+1,n.options.add(a)}}function ponerDatosCheckHtml(e,t){var n,a=document.getElementsByClassName("checkbox")[t-6];for(n=6==t?"ck1":"ck2",t=0;t<e.length;t++){var i=document.createElement("input"),o=document.createElement("label"),r=document.createElement("span");o.innerHTML=e[t],o.className="container",r.className="checkmark",i.type="checkbox",i.id=n,i.value=t+1,a.appendChild(o),o.appendChild(i),o.appendChild(r),a.appendChild(document.createElement("br"))}}function ponerDatosRadioHtml(e,t){var n,a=document.getElementsByClassName("radio")[t-8];for(n=8==t?"Radio1":"Radio2",t=0;t<e.length;t++){var i=document.createElement("input"),o=document.createElement("label"),r=document.createElement("span");o.innerHTML=e[t],o.className="containerRadio",r.className="checkmarkRadio",i.type="radio",i.name=n,i.value=t+1,a.appendChild(o),o.appendChild(i),o.appendChild(r),a.appendChild(document.createElement("br"))}}function corregirText(){for(i=0;i<2;i++){formulario.elements[i].value==respText[i]&&(nota+=1)}}function corregirSelect(){for(i=2;i<4;i++){formulario.elements[i].value.selectedIndex==respSelect[i]&&(nota+=1)}}function corregirMultiple(){for(n=4;n<6;n++){var e=formulario.elements[n],t=[];for(i=1;i<e.length;i++){if(e.options[i].selected){for(t[i]=!1,j=0;j<respMultiple[n].length;j++)i-1==respMultiple[n][j]&&(t[i]=!0);t[i]&&(nota+=1/respMultiple[n].length)}}}}function corregirCheckbox(){var e=document.getElementById("formulario"),t=[];for(n=6;n<8;n++){var a;for(a=6==n?e.ck1:e.ck2,i=0;i<a.length;i++)if(a[i].checked){for(t[i]=!1,j=0;j<respCheckbox[n].length;j++)i==respCheckbox[n][j]&&(t[i]=!0);t[i]&&(nota+=1/respCheckbox[n].length)}}}function corregirRadio(){var e=formulario;for(n=8;n<10;n++){(8==n?e.Radio1:e.Radio2).value==respRadio[n]&&(nota+=1)}}function iniciarNota(){nota=0}function darNota(){nota>4?alert("Nota: "+nota.toFixed(2)+"/10 ¡Felicidades! Has aprobado"):alert("Nota: "+nota.toFixed(2)+"/10 ¡Mala suerte! Has suspendido")}function refrescar(){location.reload()}window.onload=function(){(formulario=document.getElementById("formulario")).onsubmit=function(){return iniciarNota(),comprobar()&&(corregirText(),corregirSelect(),corregirMultiple(),corregirCheckbox(),corregirRadio(),darNota(),refrescar()),!1},xhttp.onreadystatechange=function(){4==this.readyState&&200==this.status&&gestionarXml(this)},xhttp.open("GET",url,!0),xhttp.send()};