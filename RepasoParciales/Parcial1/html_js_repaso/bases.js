let a = 1;
let b = 2;

const persona1 = {
    nombre: "Lionel Messi",
    profesion: "Futbolista",
    edad: 37,
    saludar: function() {
      console.log(`Hola, soy ${this.nombre}, un ${this.profesion}. Tengo ${this.edad} años.`);
    }
  };
  
const persona2 = {
    nombre: "Eminem",
    profesion: "Rapero",
    edad: 52,
    saludar: function() {
      console.log(`Hola, soy ${this.nombre}, un ${this.profesion}. Tengo ${this.edad} años.`);
    }
  };
  
const persona3 = {
    nombre: "Steve Jobs",
    profesion: "Empresario tecnológico",
    edad: 56,
    saludar: function() {
      console.log(`Hola, soy ${this.nombre}, un ${this.profesion}. Tengo ${this.edad} años.`);
    }
  };
  
const persona4 = {
    nombre: "Millie Bobby Brown",
    profesion: "Actriz",
    edad: 20,
    saludar: function() {
      console.log(`Hola, soy ${this.nombre}, una ${this.profesion}. Tengo ${this.edad} años.`);
    }
  };
  

const personas = [persona1, persona2, persona3];
const mayores20 = personas.filter(persona => persona.edad > 20);

personas.map(persona => persona.saludar());
console.log(mayores20);
console.log(`La suma es ${a + b}`);
