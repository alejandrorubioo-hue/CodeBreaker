"use client";

import { useState, useEffect } from 'react';
import { puzzles } from '../data/puzzles';
import { Puzzle } from '../types/puzzle';
import { useGameData } from '../hooks/useGameData';

export default function PuzzlesPage() {
  const [puzzleActual, setPuzzleActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState('');
  const [puntosPartida, setPuntosPartida] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [juegoCompletado, setJuegoCompletado] = useState(false);

  // Usar el hook para datos globales
  const { gameData, actualizarPuntos, agregarPuzzleCompletado } = useGameData();

  const puzzle: Puzzle = puzzles[puzzleActual];

  // Cargar puzzles completados al inicio
  useEffect(() => {
    // Si ya completó algunos puzzles, empezar donde se quedó
    const ultimoPuzzle = Math.max(...gameData.puzzlesCompletados, 0);
    if (ultimoPuzzle > 0 && ultimoPuzzle < puzzles.length) {
      setPuzzleActual(ultimoPuzzle);
    }
  }, [gameData.puzzlesCompletados]);

  const verificarRespuesta = () => {
    if (respuestaSeleccionada === puzzle.respuestaCorrecta) {
      setPuntosPartida(puntosPartida + puzzle.puntos);

      // Actualizar datos globales
      actualizarPuntos(puzzle.puntos);
      agregarPuzzleCompletado(puzzle.id);

      setMostrarResultado(true);
    } else {
      setMostrarResultado(true);
    }
  };

  const siguientePuzzle = () => {
    if (puzzleActual < puzzles.length - 1) {
      setPuzzleActual(puzzleActual + 1);
      setRespuestaSeleccionada('');
      setMostrarResultado(false);
    } else {
      setJuegoCompletado(true);
    }
  };

  const reiniciarJuego = () => {
    setPuzzleActual(0);
    setRespuestaSeleccionada('');
    setPuntosPartida(0);
    setMostrarResultado(false);
    setJuegoCompletado(false);
  };

  // Si completó todos los puzzles
  if (juegoCompletado) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">🎉 ¡Felicidades!</h1>
          <p className="text-xl mb-4">Has completado todos los puzzles</p>
          <div className="bg-blue-50 rounded-lg p-6 mb-6">
            <p className="text-2xl font-bold text-blue-600">
              Puntos en esta sesión: {puntosPartida}
            </p>
            <p className="text-lg text-gray-600 mt-2">
              Puntos totales: {gameData.puntosTotal}
            </p>
            <p className="text-lg text-gray-600">
              Rango actual: {gameData.rango}
            </p>
          </div>
          <button
            onClick={reiniciarJuego}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
            🔄 Jugar de Nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header con puntos */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-2xl font-bold">
            🧩 Puzzle {puzzleActual + 1} de {puzzles.length}
          </h1>
          <div className="flex gap-4 items-center">
            <div className="text-xl font-semibold text-blue-600">
              ⭐ Sesión: {puntosPartida} pts
            </div>
            <div className="text-lg text-gray-600">
              Total: {gameData.puntosTotal} pts
            </div>
            <button
              onClick={reiniciarJuego}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            >
              🔄 Reiniciar
            </button>
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
              }`}
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
        <div className="flex gap-4 flex-wrap">
          {!mostrarResultado ? (
            <button
              onClick={verificarRespuesta}
              disabled={!respuestaSeleccionada}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Verificar Respuesta
            </button>
          ) : (
            <button
              onClick={siguientePuzzle}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              {puzzleActual >= puzzles.length - 1 ? 'Ver Resultados 🏆' : 'Siguiente Puzzle →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}