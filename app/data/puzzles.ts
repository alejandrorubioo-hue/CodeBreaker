// app/data/puzzles.ts
import { Puzzle } from '../types/puzzle';

export const puzzles: Puzzle[] = [
  {
    id: 1,
    lenguaje: 'JavaScript',
    titulo: 'Declaración de Variables',
    descripcion: 'Completa la declaración de variable que no se puede reasignar',
    codigoIncompleto: '___ PI = 3.14159;',
    respuestaCorrecta: 'const',
    opciones: ['var', 'let', 'const', 'static'],
    pista: 'Esta palabra clave previene la reasignación',
    puntos: 10,
    dificultad: 'Facil'
  },
  {
    id: 2,
    lenguaje: 'TypeScript',
    titulo: 'Tipos Básicos',
    descripcion: 'Declara el tipo correcto para un número',
    codigoIncompleto: 'let edad: ___ = 25;',
    respuestaCorrecta: 'number',
    opciones: ['string', 'number', 'int', 'Number'],
    pista: 'En TypeScript, los tipos primitivos van en minúscula',
    puntos: 10,
    dificultad: 'Facil'
  },
  {
    id: 3,
    lenguaje: 'JavaScript',
    titulo: 'Métodos de Array',
    descripcion: '¿Qué método crea un nuevo array con los elementos que cumplen una condición?',
    codigoIncompleto: 'const pares = numeros.___(n => n % 2 === 0);',
    respuestaCorrecta: 'filter',
    opciones: ['map', 'forEach', 'filter', 'find'],
    pista: 'Este método "filtra" elementos',
    puntos: 15,
    dificultad: 'Facil'
  },
  {
    id: 4,
    lenguaje: 'TypeScript',
    titulo: 'Interfaces',
    descripcion: 'Define correctamente una interfaz en TypeScript',
    codigoIncompleto: '___ Persona { nombre: string; edad: number; }',
    respuestaCorrecta: 'interface',
    opciones: ['class', 'type', 'interface', 'struct'],
    pista: 'Palabra clave específica para definir la forma de un objeto',
    puntos: 20,
    dificultad: 'Medio'
  },
  {
    id: 5,
    lenguaje: 'JavaScript',
    titulo: 'Promesas',
    descripcion: 'Maneja el resultado exitoso de una promesa',
    codigoIncompleto: 'fetchDatos().___(data => console.log(data));',
    respuestaCorrecta: 'then',
    opciones: ['catch', 'then', 'await', 'resolve'],
    pista: 'Encadena esto después de una promesa',
    puntos: 20,
    dificultad: 'Medio'
  },
  {
    id: 6,
    lenguaje: 'TypeScript',
    titulo: 'Tipos Union',
    descripcion: 'Define una variable que puede ser string o number',
    codigoIncompleto: 'let valor: string ___ number;',
    respuestaCorrecta: '|',
    opciones: ['&', '||', '|', 'or'],
    pista: 'Un solo carácter para unión de tipos',
    puntos: 15,
    dificultad: 'Medio'
  },
  {
    id: 7,
    lenguaje: 'JavaScript',
    titulo: 'Destructuring',
    descripcion: 'Extrae name de un objeto',
    codigoIncompleto: 'const ___ name } = user;',
    respuestaCorrecta: '{',
    opciones: ['[', '(', '{', '<'],
    pista: 'Los objetos usan llaves',
    puntos: 15,
    dificultad: 'Facil'
  },
  {
    id: 8,
    lenguaje: 'TypeScript',
    titulo: 'Tipos Genéricos',
    descripcion: 'Define una función genérica',
    codigoIncompleto: 'function identity___T>(value: T): T { return value; }',
    respuestaCorrecta: '<',
    opciones: ['(', '[', '{', '<'],
    pista: 'Los genéricos usan estos símbolos',
    puntos: 25,
    dificultad: 'Dificil'
  },
  {
    id: 9,
    lenguaje: 'JavaScript',
    titulo: 'Async/Await',
    descripcion: 'Marca una función como asíncrona',
    codigoIncompleto: '___ function fetchData() { }',
    respuestaCorrecta: 'async',
    opciones: ['await', 'async', 'promise', 'defer'],
    pista: 'Va antes de function para hacerla asíncrona',
    puntos: 20,
    dificultad: 'Medio'
  },
  {
    id: 10,
    lenguaje: 'TypeScript',
    titulo: 'Type Assertion',
    descripcion: 'Convierte un valor a un tipo específico',
    codigoIncompleto: 'const input = document.getElementById("mi-input") ___ HTMLInputElement;',
    respuestaCorrecta: 'as',
    opciones: ['to', 'as', 'is', 'cast'],
    pista: 'Palabra clave de 2 letras',
    puntos: 25,
    dificultad: 'Dificil'
  }
];