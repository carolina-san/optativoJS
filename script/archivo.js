document.addEventListener("DOMContentLoaded", function(){
	let form=document.querySelector("#registroForm");
    let form2=document.querySelector("#formLogin");
    let boton=document.querySelector("#btnTabla");
    const lista = document.getElementById("resultado-lista");
    if(form!=null){
        form.addEventListener("submit", comprobarRegistro);
        let camponombre=document.querySelector("#nombre");
        let campopassword=document.querySelector("#password");
        let camporeppassword=document.querySelector("#reppassword");
        let campocorreo=document.querySelector("#correo");
        let campofecha=document.querySelector("#fecha");
        let campociudad=document.querySelector("#ciudad");
        let campofoto=document.querySelector("#foto");
        camponombre.addEventListener("focus", () => estilonormal(camponombre));
        campopassword.addEventListener("focus", () => estilonormal(campopassword));
        camporeppassword.addEventListener("focus", () => estilonormal(camporeppassword));
        campocorreo.addEventListener("focus", () => estilonormal(campocorreo));
        campofecha.addEventListener("focus", () => estilonormal(campofecha));
        campociudad.addEventListener("focus", () => estilonormal(campociudad));
        campofoto.addEventListener("focus", () => estilonormal(campofoto));
    }
    else if(form2!=null){
        form2.addEventListener("submit", comprobarLogin);
        let campouser=document.querySelector("#username");
        campouser.addEventListener("focus", () => estilonormal(campouser));
        let campopass=document.querySelector("#password");
        campopass.addEventListener("focus", () => estilonormal(campopass));
    }else if(lista!=null){
     
        let btnFecha=document.querySelector("#btnFecha");
        let btnTitulo=document.querySelector("#btnTitulo");
        let btnAutor=document.querySelector("#btnAutor");
        let btnPais=document.querySelector("#btnPais");
        btnFecha.addEventListener("click",() => ordenar('fecha'));
        btnTitulo.addEventListener("click", () =>ordenar('titulo'));
        btnAutor.addEventListener("click", () =>ordenar('autor'));
        btnPais.addEventListener("click", () =>ordenar('pais'));
        
        const lista = document.getElementById("resultado-lista");
        lista.innerHTML = "";
        crearListaFotos();
        
    }
    else if(boton!=null){
        crearTablaTarifas();
        boton.addEventListener("click", mostrarTabla);
    }
    const estiloGuardado = getCookie('estilo');

    if (estiloGuardado) {
        document.getElementById('selectorEstilo').value = estiloGuardado;
        aplicarEstilo(estiloGuardado); // Usa el estilo de la cookie
    }
    
    document.getElementById('selectorEstilo').addEventListener('change', function () {
        const nuevoEstilo = this.value;
        aplicarEstilo(nuevoEstilo);
        setCookie('estilo', nuevoEstilo, 45); // Guarda el estilo seleccionado en la cookie
    });
});

function comprobarRegistro(event) {
    let mensaje = "";
    let form = document.querySelector("#registroForm");

    let camponombre = document.querySelector("#nombre");
    let nombre = camponombre.value.replaceAll(/\s|\t/g, "");

    let campopassword = document.querySelector("#password");
    let password = campopassword.value.replaceAll(/\s|\t/g, "");

    let camporeppassword = document.querySelector("#reppassword");
    let reppassword = camporeppassword.value.replaceAll(/\s|\t/g, "");

    let campocorreo = document.querySelector("#correo");
    let correo = campocorreo.value.replaceAll(/\s|\t/g, "");

    let campofecha = document.querySelector("#fecha");
    let fecha = campofecha.value.replaceAll(/\s|\t/g, "");

    const sexo = document.querySelector('input[name="sexo"]:checked');
    const fechaActual = new Date();
    const fechaLimite = new Date();
    fechaLimite.setFullYear(fechaActual.getFullYear() - 18);
	const [dia, mes, año] = fecha.split('/');
    const fechaFormateada = `${año}-${mes}-${dia}`;
    const fechaNacimiento = new Date(fechaFormateada);

	nombre=nombre.replaceAll(/\s/g, "");
	nombre=nombre.replaceAll(/\t/g, "");
	password=password.replaceAll(/\s/g, "");
	password=password.replaceAll(/\t/g, "");
    reppassword=reppassword.replaceAll(/\s/g, "");
    reppassword=reppassword.replaceAll(/\t/g, "");
    correo=correo.replaceAll(/\s/g, "");
    correo=correo.replaceAll(/\t/g, "");
    fecha=fecha.replaceAll(/\s/g, "");
    fecha=fecha.replaceAll(/\t/g, "");
    const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d-_]{6,15}$/;
	const regexNombre = /^[A-Za-z][A-Za-z0-9]{2,14}$/;
    const regexCorreo = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~.-]{1,64}@[A-Za-z0-9-]{1,255}\.[A-Za-z]{2,63}$/;
	if (!nombre) {
        mensaje = "El nombre de usuario no puede estar vacío\n";
        estiloerror(camponombre);
    } else if (!regexNombre.test(nombre)) {
        mensaje = "El nombre de usuario debe empezar por una letra y tener entre 3 y 15 caracteres\n";
        estiloerror(camponombre);
    } 
    else{
        if (!password) {
            mensaje = "El campo contraseña no puede estar vacío\n";
            estiloerror(campopassword);
        } else if (!regexPassword.test(password)) {
            mensaje = "La contraseña debe tener entre 6 y 15 caracteres, al menos una letra mayúscula, una minúscula y un número\n";
            estiloerror(campopassword);
        } else if (password !== reppassword) {
            mensaje = "Las contraseñas no coinciden\n";
            estiloerror(camporeppassword);
        }else{
             // Validar correo electrónico
             mensaje="";
           
            if (!correo) {
                mensaje = "El campo correo no puede estar vacío\n";
                estiloerror(campocorreo);
            } else if (!regexCorreo.test(correo)){
                mensaje = "Formato de correo no válido\n";
                estiloerror(campocorreo);
            } else if( correo.length > 254) {
                mensaje = "El correo excede los 254 caracteres\n";
                estiloerror(campocorreo);
            }else{
                console.log(fechaNacimiento);
                mensaje="";
                if(sexo==null){
                    mensaje="Debes seleccionar un sexo\n";
                }
                else{
                    mensaje="";
                    if(fecha==""){
                        mensaje="El campo fecha no puede estar vacio\n";
                        estiloerror(campofecha);
                    }
                    else{
                        if(fechaNacimiento>fechaActual){
                            mensaje="La fecha de nacimiento no puede ser en el futuro\n";
                            estiloerror(campofecha);
                        }else if(fechaNacimiento>fechaLimite){
                            mensaje="Debes ser mayor de edad para registrarte\n";
                            estiloerror(campofecha);
                        }
                    }
                }
            }
        }
    }             
                        
	if(mensaje!=""){
		if(document.querySelector("#mensaje")!=null){
			document.querySelector("#mensaje").remove();
		}
		let p=document.createElement("p");
		p.setAttribute("id", "mensaje");
		p.innerHTML=mensaje.replace(/\n/g, "<br>");
		form.prepend(p);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });		
        event.preventDefault();
	}
}



function estilonormal(campo){
    campo.style.backgroundColor="white";
    campo.style.border="1px solid grey";
}

function estiloerror(campo){
    campo.style.backgroundColor="#ffb097";
    campo.style.border="2px solid grey";
}

function comprobarLogin(event){
	let mensaje="";
	let nombre=document.querySelector("#username").value;
	let password=document.querySelector("#password").value;
	let form=document.querySelector("#formLogin");
    let camponombre=document.querySelector("#username");
    let campopassword=document.querySelector("#password");
   
	nombre=nombre.replaceAll(/\s/g, "");
	nombre=nombre.replaceAll(/\t/g, "");
	password=password.replaceAll(/\s/g, "");
	password=password.replaceAll(/\t/g, "");
	
	if(nombre==""){
		mensaje+="El campo nombre no puede estar vacío\n";
        estiloerror(camponombre);
	}
	else if(password==""){
		mensaje+="El campo contraseña no puede estar vacío\n";
        estiloerror(campopassword);
	}
	if(mensaje!=""){
		if(document.querySelector("#mensaje")!=null){
			document.querySelector("#mensaje").remove();
		}
		let p=document.createElement("p");
		p.setAttribute("id", "mensaje");
		p.innerHTML=mensaje.replace(/\n/g, "<br>");
		form.prepend(p);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });	
		event.preventDefault();
	}
}


function mostrarTabla(){
    const tabla = document.getElementById("tablaTarifas");
    const button = document.getElementById("btnTabla");
    if(tabla.style.display==="none"){
        tabla.style.display="block";
        button.textContent="Ocultar Tabla Avanzada de Precios";
    }
    else{
        tabla.style.display="none";
        button.textContent="Ver Tabla Avanzada de Precios";
    }
}


function crearTablaTarifas(){
    const contenedor = document.getElementById("tablas");
    const table = document.createElement("table");
    table.style.display = "none";
    table.id = "tablaTarifas";
    const caption = document.createElement("caption");
    caption.textContent = "Tarifas de impresión";
    table.appendChild(caption);

    const fila1 = document.createElement("tr");
    const headerVacio = document.createElement("th");
    const headerVacio2 = document.createElement("th");
    fila1.appendChild(headerVacio);
    fila1.appendChild(headerVacio2);
    const bnHeader = document.createElement("th");
    bnHeader.setAttribute("colspan", "2"); 
    bnHeader.textContent = "Blanco y Negro";
    fila1.appendChild(bnHeader);
    const colorHeader = document.createElement("th");
    colorHeader.setAttribute("colspan", "2");
    colorHeader.textContent = "Color";
    fila1.appendChild(colorHeader);
    table.appendChild(fila1);

    const headers = ["Número de páginas", "Número de fotos", "150-300 dpi","450-900 dpi", "150-300 dpi","450-900 dpi"];
    const fila2 = document.createElement("tr");
    headers.forEach(texto => {
        const th = document.createElement("th");
        th.textContent = texto;
        fila2.appendChild(th);
    });
    table.appendChild(fila2);
    const base=10;
    const calidad=0.2;
    const color=0.5;
    let precio1=0;
    let precio2=0;
    let precio3=0;
    for(let i=1;i<=15;i++){
        precio2,precio3=0;
        const fila = document.createElement("tr");
        let paginasCaras=0;
        let paginasMedias=0;
        let paginasBaratas=0;
        if (i > 10){//si hay mas de 10, las primeras 4 son caras, las siguientes 6 medias y las ultimas baratas
            precio3 = 1.6;
            precio2 = 1.8;
            precio1 = 2;
            paginasCaras = 4;
            paginasMedias = 6;
            paginasBaratas = i - (paginasMedias + paginasCaras);
        } 
        else if (i<=10 && i>=5){//si hay mas de 5 y menos de 10, las primeras 4 son caras y las siguientes medias
            precio2 = 1.8;
            precio1 = 2;
            paginasCaras = 4;
            paginasMedias = i - paginasCaras;
        } 
        else if (i < 5){//si hay menos de 5 todas son caras
            paginasCaras = i;
            precio1 = 2;
        } 
        for(let j=1;j<=6;j++){
            const celda = document.createElement("td");
            let contenido="";
            let cantidadFotos=i*3;
           
            switch(j){
                case 1:
                    contenido=i;
                    break;
                case 2:
                    contenido=i*3;
                    break;
                case 3:
                    contenido=(base+paginasCaras*precio1+paginasMedias*precio2+paginasBaratas*precio3).toFixed(2)+"€";
                    break;
                case 4:
                    contenido=(base+paginasCaras*precio1+paginasMedias*precio2+paginasBaratas*precio3+(cantidadFotos*calidad)).toFixed(2)+"€";
                    break;
                case 5:
                    contenido=( base+paginasCaras*precio1+paginasMedias*precio2+paginasBaratas*precio3+(cantidadFotos*color)).toFixed(2)+"€";
                    break;
                case 6:
                    contenido=(base+paginasCaras*precio1+paginasMedias*precio2+paginasBaratas*precio3+(cantidadFotos*color)+(cantidadFotos*calidad)).toFixed(2)+"€";
                    break;  
            }
            celda.textContent = contenido;
            fila.appendChild(celda);
        }
        table.appendChild(fila);
   }
    contenedor.appendChild(table);
}

function ordenar(criterio){
    const lista = document.getElementById("resultado-lista");
    let btnFecha = document.querySelector("#btnFecha");
    let btnTitulo = document.querySelector("#btnTitulo");
    let btnAutor = document.querySelector("#btnAutor");
    let btnPais = document.querySelector("#btnPais");
    const ant = sessionStorage.getItem('criterio');
    let orden = sessionStorage.getItem('orden');
    let flecha='';
    const items = Array.from(lista.children);
    if(ant!==criterio){
        btnFecha.classList.remove('activo');
        btnTitulo.classList.remove('activo');
        btnAutor.classList.remove('activo');
        btnPais.classList.remove('activo');
    }
    if (ant===criterio&&orden==='desc'){
        sessionStorage.removeItem('criterio');
        sessionStorage.removeItem('orden');
        btnFecha.innerHTML = "Fecha";
        btnTitulo.innerHTML = "Título";
        btnAutor.innerHTML = "Autor";
        btnPais.innerHTML = "País";
        lista.innerHTML = "";
        //quitar los botones de activo
        crearListaFotos();//se crea la lista como estaba
        btnFecha.classList.remove('activo');
        btnTitulo.classList.remove('activo');
        btnAutor.classList.remove('activo');
        btnPais.classList.remove('activo');
        return;
    }else if(ant===criterio && orden==='asc'){
        orden='desc';
        flecha='  &#x23F7;';
    }else{
        orden='asc';
        flecha='  &#x23F6;';
    }
    btnFecha.innerHTML = "Fecha";
    btnTitulo.innerHTML = "Título";
    btnAutor.innerHTML = "Autor";
    btnPais.innerHTML = "País";
    
    if (criterio === 'fecha'){
        btnFecha.innerHTML += flecha;
        btnFecha.classList.add('activo');
    }
    if (criterio === 'titulo'){
        btnTitulo.innerHTML += flecha;
        btnTitulo.classList.add('activo');
    } 
    if (criterio === 'autor') {
        btnAutor.innerHTML += flecha;
        btnAutor.classList.add('activo');
    }
    if (criterio === 'pais'){
        btnPais.innerHTML += flecha;
        btnPais.classList.add('activo');
    }

    items.sort((a, b) =>{
        let valA = a.getAttribute(`data-${criterio}`).toLowerCase();
        let valB = b.getAttribute(`data-${criterio}`).toLowerCase();
        if (criterio==='fecha'){
            valA=new Date(valA);
            valB=new Date(valB);
            return orden==='asc'?valA-valB:valB-valA;
        }
        return orden==='asc'?valA.localeCompare(valB):valB.localeCompare(valA);
    });
    lista.replaceChildren();
    items.forEach(item => lista.appendChild(item));
    sessionStorage.setItem('criterio', criterio);
    sessionStorage.setItem('orden', orden);
}


function crearListaFotos() {
    const lista = document.getElementById("resultado-lista");
    const fotos = [
        { titulo: "Foto A", fecha: "2023-05-20", autor: "Juan Pérez", pais: "España", src: "fotos/foto1.jpg", alt: "Foto 1" },
        { titulo: "Foto B", fecha: "2021-04-15", autor: "Ana Gómez", pais: "Francia", src: "fotos/foto2.jpg", alt: "Foto 2" },
        { titulo: "Foto C", fecha: "2022-08-10", autor: "Carlos Ruiz", pais: "Italia", src: "fotos/foto3.jpeg", alt: "Foto 3" }
    ];
    
    fotos.forEach(foto => {
        const li = document.createElement("li");
        li.setAttribute("data-titulo", foto.titulo);
        li.setAttribute("data-fecha", foto.fecha);
        li.setAttribute("data-autor", foto.autor);
        li.setAttribute("data-pais", foto.pais);

        // Crear el enlace
        const link = document.createElement("a");
        link.href = `foto.html`;

        const img = document.createElement("img");
        img.src = foto.src;
        img.alt = foto.alt;

        // Agregar la imagen al enlace
        link.appendChild(img);

        const h3 = document.createElement("h3");
        h3.textContent = `Título: ${foto.titulo}`;
        const pFecha = document.createElement("p");
        pFecha.textContent = `Fecha: ${foto.fecha}`;
        const pAutor = document.createElement("p");
        pAutor.textContent = `Autor: ${foto.autor}`;
        const pPais = document.createElement("p");
        pPais.textContent = `País: ${foto.pais}`;

        // Añadir el enlace (con la imagen) y los textos al elemento de lista
        li.appendChild(link);
        li.appendChild(h3);
        li.appendChild(pFecha);
        li.appendChild(pAutor);
        li.appendChild(pPais);
        lista.appendChild(li);
    });
}


function setCookie(c_name, value, expiredays){
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) +
        ((expiredays == null) ? "" : ";expires="+ exdate.toGMTString());
    
    
}

function getCookie(c_name) {
    if(document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if(c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if(c_end == -1)
                c_end = document.cookie.length;
                return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}




function aplicarEstilo(estiloSeleccionado) {
    document.querySelectorAll('link[rel="alternate stylesheet"]').forEach(link => {
        link.disabled = true;
    });

    if (estiloSeleccionado !== 'default') {
        const link = document.querySelector(`link[title="${estiloSeleccionado}"]`);
        if (link) {
            link.disabled = false;
        }
    }
}



