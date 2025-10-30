// app/data/bugs.ts
export interface BugChallenge {
  id: number;
  titulo: string;
  descripcion: string;
  codigo: string[];  // Array de líneas de código
  lineasConError: number[]; // Líneas que tienen errores (empezando en 1)
  errores: {
    linea: number;
    error: string;
    correccion: string;
  }[];
  pista: string;
  puntos: number;
  explicacion: string;
}

export const bugs: BugChallenge[] = [
  {
    id: 1,
    titulo: "Error de Sintaxis Básico",
    descripcion: "Encuentra la línea con el error de sintaxis",
    codigo: [
      'const mensaje = "Hola Mundo"',
      'const nombre = "CodeBreaker"',
      'consol.log(mensaje)',
      'console.log(nombre)'
    ],
    lineasConError: [3], // Línea 3 tiene error
    errores: [{
      linea: 3,
      error: "consol.log",
      correccion: "console.log"
    }],
    pista: "Revisa cómo se escribe el método para imprimir",
    puntos: 10,
    explicacion: "El método correcto es 'console.log', no 'consol.log'"
  },
  {
    id: 2,
    titulo: "Función Mal Declarada",
    descripcion: "¿En qué línea está el error?",
    codigo: [
      'function saludar(nombre) {',
      '  const saludo = "Hola " + nombre',
      '  return saludo',
      '}',
      '',
      'const sumar = (a, b) -> {',
      '  return a + b',
      '}'
    ],
    lineasConError: [6],
    errores: [{
      linea: 6,
      error: "->",
      correccion: "=>"
    }],
    pista: "Las funciones flecha usan un símbolo específico",
    puntos: 15,
    explicacion: "En JavaScript se usa '=>' no '->'"
  },
  {
    id: 3,
    titulo: "Variable No Definida",
    descripcion: "Encuentra el error de referencia",
    codigo: [
      'let edad = 25',
      'let nombre = "Ana"',
      '',
      'if (edad >= 18) {',
      '  console.log(nombre + " es mayor de edad")',
      '  console.log("Tiene " + edadd + " años")',
      '}'
    ],
    lineasConError: [6],
    errores: [{
      linea: 6,
      error: "edadd",
      correccion: "edad"
    }],
    pista: "Revisa el nombre de las variables",
    puntos: 10,
    explicacion: "La variable se llama 'edad', no 'edadd'"
  },
  {
    id: 4,
    titulo: "Array con Error",
    descripcion: "El array no está bien declarado",
    codigo: [
      'const frutas = ["manzana", "pera", "uva"]',
      'const numeros = [1, 2, 3, 4, 5]',
      'const mixto = [true, 42, "texto"',
      '',
      'console.log(frutas[0])',
      'console.log(numeros.length)'
    ],
    lineasConError: [3],
    errores: [{
      linea: 3,
      error: "Falta cerrar el array",
      correccion: '[true, 42, "texto"]'
    }],
    pista: "Los arrays deben cerrarse correctamente",
    puntos: 20,
    explicacion: "Faltaba el ] para cerrar el array"
  },
  {
    id: 5,
    titulo: "Template String Incorrecto",
    descripcion: "El template string no funciona",
    codigo: [
      'const usuario = "Carlos"',
      'const edad = 30',
      '',
      'const mensaje = "El usuario ${usuario} tiene ${edad} años"',
      'console.log(mensaje)'
    ],
    lineasConError: [4],
    errores: [{
      linea: 4,
      error: "Comillas incorrectas",
      correccion: "`El usuario ${usuario} tiene ${edad} años`"
    }],
    pista: "Los template strings necesitan backticks",
    puntos: 25,
    explicacion: "Usa ` en lugar de \" para template strings"
  }
];