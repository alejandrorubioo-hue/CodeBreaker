"use client";

import { useState } from 'react';
import { puzzles } from '../data/puzzles';
import { Puzzle } from '../types/puzzle';

export default function PuzzlesPage() {
  const [puzzleActual, setPuzzleActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState('');
  const [puntos, setPuntos] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [puzzlesCompletados, setPuzzlesCompletados] = useState<number[]>([]);

  const puzzle: Puzzle = puzzles[puzzleActual];

  const verificarRespuesta = () => {
    setMostrarResultado(true); // Primero mostrar resultado

    if (respuestaSeleccionada === puzzle.respuestaCorrecta) {
      setPuntos(puntos + puzzle.puntos);
      setPuzzlesCompletados([...puzzlesCompletados, puzzle.id]);
    }
    // NO cambiar de puzzle automáticamente
  };

  const siguientePuzzle = () => {
    if (puzzleActual < puzzles.length - 1) {
      setPuzzleActual(puzzleActual + 1);
      setRespuestaSeleccionada(''); // Limpiar selección
      setMostrarResultado(false); // Ocultar resultado
    }
  };

  const reiniciarJuego = () => {
    setPuzzleActual(0);
    setRespuestaSeleccionada('');
    setPuntos(0);
    setMostrarResultado(false);
    setPuzzlesCompletados([]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header con puntos */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">🧩 Puzzle {puzzleActual + 1} de {puzzles.length}</h1>
          <div className="text-xl font-semibold text-blue-600">
            ⭐ {puntos} puntos
          </div>
        </div>
      </div>

      {/* Puzzle Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
        {/* Info del puzzle */}
        <div className="mb-6">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {puzzle.lenguaje}
          </span>
          <span className="ml-3 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {puzzle.dificultad}
          </span>
          <span className="ml-3 text-gray-600">
            +{puzzle.puntos} puntos
          </span>
        </div>

        {/* Título y descripción */}
        <h2 className="text-xl font-bold mb-3">{puzzle.titulo}</h2>
        <p className="text-gray-600 mb-6">{puzzle.descripcion}</p>

        {/* Código con espacio en blanco */}
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono mb-6">
          <pre>{puzzle.codigoIncompleto}</pre>
        </div>

        {/* Opciones */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {puzzle.opciones.map((opcion) => (
            <button
              key={opcion}
              onClick={() => setRespuestaSeleccionada(opcion)}
              className={`p-3 rounded-lg border-2 transition-all ${
                respuestaSeleccionada === opcion
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              } ${mostrarResultado ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={mostrarResultado}
            >
              <code className="text-lg">{opcion}</code>
            </button>
          ))}
        </div>

        {/* Pista */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm">
            <strong>💡 Pista:</strong> {puzzle.pista}
          </p>
        </div>

        {/* Resultado */}
        {mostrarResultado && (
          <div className={`p-4 rounded-lg mb-6 ${
            respuestaSeleccionada === puzzle.respuestaCorrecta
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {respuestaSeleccionada === puzzle.respuestaCorrecta ? (
              <div>
                <strong>✅ ¡Correcto!</strong> Has ganado {puzzle.puntos} puntos
              </div>
            ) : (
              <div>
                <strong>❌ Incorrecto.</strong> La respuesta correcta es: <code>{puzzle.respuestaCorrecta}</code>
              </div>
            )}
          </div>
        )}

        {/* Botones de acción */}
        <div className="flex gap-4">
          {!mostrarResultado ? (
            <button
              onClick={verificarRespuesta}
              disabled={!respuestaSeleccionada}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Verificar Respuesta
            </button>
          ) : (
            <>
              {puzzleActual < puzzles.length - 1 ? (
                <button
                  onClick={siguientePuzzle}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Siguiente Puzzle →
                </button>
              ) : (
                <div className="flex gap-4">
                  <span className="bg-yellow-100 text-yellow-800 px-6 py-3 rounded-lg font-bold">
                    🎉 ¡Juego Completado! Total: {puntos} puntos
                  </span>
                  <button
                    onClick={reiniciarJuego}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    🔄 Jugar de Nuevo
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}