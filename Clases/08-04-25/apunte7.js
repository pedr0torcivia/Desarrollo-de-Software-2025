// OBJETOS EN JAVASCRIPT: un objeto es una colección de propiedades y métodos.
// CREACIÓN DE OBJETOS CON EL CONSTRUCTOR OBJECT
var Persona = new Object();  
persona.nombre = "Pedro"; 
persona.edad = 19; 
persona.saludar = function() { 
    console.log("Hola, mi nombre es " + this.nombre);
};


//CREACIÓN DE OBJETOS CON LA NOTACIÓN LITERAL
var Persona = { // Se crea un objeto con propiedades y métodos
    nombre: "Pedro",
    edad: 19,
    saludar: function() { // Se añade un método
        console.log("Hola, mi nombre es " + this.nombre);
    }
};

//CREACIÓN DE OBJETOS CON FUNCIONES CONSTRUCTORAS
function Persona(nombre, edad) { // Se crea una función constructora
    this.nombre = nombre; 
    this.edad = edad;
    this.saludar = function() { 
        console.log("Hola, mi nombre es " + this.nombre);
    };
}
