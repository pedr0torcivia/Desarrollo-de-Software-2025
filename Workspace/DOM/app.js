// ACCEDER A ELEMENTOS
// TODO ESTO PUEDE SER OBSERVADO MEDIANTE LA CONSOLA EN EL NAVEGADOR
console.log(document);

// getElementById: acceder a elemento con sus propiedades accediendo por ID
let titulo = document.getElementById("h1");
console.log(titulo);

let mainDiv = document.getElementById("card"); 
console.log(mainDiv);

// Acceder a elemento por otro atributo
// querySelector: solo devuelve el primer elemento que concuerde
let card = document.querySelector(".card"); 
console.log(card);

// querySelectAll: nos trae todos los elementos bajo esa clase.
let list = document.querySelectorAll("ul.list > li");
console.log(list);

// MODIFICAR ELEMENTOS
titulo.textContent = "ManipulanDOM"; 
titulo.innerHTML = "Manipulando DOM";

let image = document.querySelector("img");
image.addEventListener("click", function(){
    image.setAttribute("src", "https://preview.redd.it/what-about-when-sasuke-tried-a-new-hairstyle-for-the-ch%C5%ABnin-v0-4w96syqfj97a1.jpg?width=1080&crop=smart&auto=webp&s=2e97316201ffba45fd7a9420d6aa026974292fa1");
})
image.classList.add("img-fluid"); 

mainDiv.style.backgroundColor = "#0032";

// ELIMINAR ELEMENTOS
let oldDiv = document.querySelector(".old-div");
document.body.removeChild(oldDiv);

// CREAR ELEMENTOS
let newDiv = document.createElement("div"); // Se pueden poner todos los elementos de HTML
newDiv.innerText = "Soy el nuevo texto";
document.body.appendChild(newDiv);

// EVENTOS: Acciones realizadas por usuarios en una página
let button = document.querySelector("button");
button.addEventListener("click", function(){
    alert("boton presionado");
    }) // Los eventos están en la documentación de JS