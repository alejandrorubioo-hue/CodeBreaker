// app/types/puzzle.ts
export interface Puzzle {
  id: number;
  lenguaje: 'JavaScript' | 'TypeScript';  // Solo JS y TS
  titulo: string;
  descripcion: string;
  codigoIncompleto: string;
  respuestaCorrecta: string;
  opciones: string[];
  pista: string;
  puntos: number;
  dificultad: 'Facil' | 'Medio' | 'Dificil';
}

export interface Usuario {
  nombre: string;
  rango: 'Junior' | 'Mid' | 'Senior';
  puntosTotal: number;
  puzzlesCompletados: number[];
  rachaActual: number;
}

export interface Logro {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  desbloqueado: boolean;
}