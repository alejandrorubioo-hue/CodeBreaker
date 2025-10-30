// app/data/coderunner.ts
export interface CodeChallenge {
  id: number;
  titulo: string;
  descripcion: string;
  codigo: string;
  resultadoEsperado: string;
  opciones: string[];
  puntos: number;
  pista: string;
  explicacion: string;
  dificultad: 'Facil' | 'Medio' | 'Dificil';
}

export const codeRunnerChallenges: CodeChallenge[] = [
  {
    id: 1,
    titulo: "Concatenación de Strings",
    descripcion: "¿Qué imprimirá este código en la consola?",
    codigo: `console.log(2 + "2")`,
    resultadoEsperado: "22",
    opciones: ["4", "22", "undefined", "Error"],
    puntos: 10,
    pista: "Cuando sumas un número con un string...",
    explicacion: "JavaScript convierte el número a string y concatena: 2 + '2' = '22'",
    dificultad: 'Facil'
  },
  {
    id: 2,
    titulo: "Tipo de Dato",
    descripcion: "¿Qué imprimirá typeof en la consola?",
    codigo: `console.log(typeof [])`,
    resultadoEsperado: "object",
    opciones: ["array", "object", "list", "undefined"],
    puntos: 15,
    pista: "Los arrays en JavaScript son un tipo especial de...",
    explicacion: "En JavaScript, los arrays son objetos especiales, por eso typeof [] retorna 'object'",
    dificultad: 'Medio'
  },
  {
    id: 3,
    titulo: "Operador Ternario",
    descripcion: "¿Cuál será el resultado?",
    codigo: `const edad = 18;
const resultado = edad >= 18 ? "Mayor" : "Menor";
console.log(resultado)`,
    resultadoEsperado: "Mayor",
    opciones: ["Mayor", "Menor", "18", "true"],
    puntos: 15,
    pista: "18 >= 18 es verdadero...",
    explicacion: "Como 18 >= 18 es true, el operador ternario retorna 'Mayor'",
    dificultad: 'Facil'
  },
  {
    id: 4,
    titulo: "Array Methods",
    descripcion: "¿Qué imprimirá este map?",
    codigo: `const nums = [1, 2, 3];
const resultado = nums.map(n => n * 2);
console.log(resultado)`,
    resultadoEsperado: "[2,4,6]",
    opciones: ["[1,2,3]", "[2,4,6]", "246", "[1,4,9]"],
    puntos: 20,
    pista: "Map aplica la función a cada elemento...",
    explicacion: "Map multiplica cada elemento por 2: [1*2, 2*2, 3*2] = [2,4,6]",
    dificultad: 'Medio'
  },
  {
    id: 5,
    titulo: "Falsy Values",
    descripcion: "¿Qué imprimirá este código?",
    codigo: `console.log(Boolean(0))`,
    resultadoEsperado: "false",
    opciones: ["true", "false", "0", "undefined"],
    puntos: 15,
    pista: "0 es un valor falsy en JavaScript...",
    explicacion: "En JavaScript, 0 es un valor falsy, por lo que Boolean(0) retorna false",
    dificultad: 'Facil'
  },
  {
    id: 6,
    titulo: "Scope de Variables",
    descripcion: "¿Cuál será el resultado?",
    codigo: `let x = 1;
if (true) {
  let x = 2;
}
console.log(x)`,
    resultadoEsperado: "1",
    opciones: ["1", "2", "undefined", "Error"],
    puntos: 25,
    pista: "let tiene scope de bloque...",
    explicacion: "El let dentro del if crea una nueva variable con scope de bloque, no afecta la x externa",
    dificultad: 'Medio'
  },
  {
    id: 7,
    titulo: "Template Literals",
    descripcion: "¿Qué imprimirá este template string?",
    codigo: `const a = 5;
const b = 10;
console.log(\`Quince es \${a + b}\`)`,
    resultadoEsperado: "Quince es 15",
    opciones: ["Quince es 15", "Quince es 5 + 10", "Quince es ${a + b}", "Error"],
    puntos: 15,
    pista: "Los template literals evalúan expresiones...",
    explicacion: "El template literal evalúa a + b = 15 y lo inserta en el string",
    dificultad: 'Facil'
  },
  {
    id: 8,
    titulo: "Array Destructuring",
    descripcion: "¿Qué valor tendrá 'b'?",
    codigo: `const [a, b, c] = [1, 2];
console.log(b)`,
    resultadoEsperado: "2",
    opciones: ["1", "2", "undefined", "null"],
    puntos: 20,
    pista: "El segundo elemento del array es...",
    explicacion: "b toma el valor del segundo elemento del array, que es 2",
    dificultad: 'Medio'
  }
];