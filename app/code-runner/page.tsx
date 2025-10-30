"use client";

import { useState, useEffect } from 'react';
import { codeRunnerChallenges } from '../data/coderunner';
import { CodeChallenge } from '../data/coderunner';

export default function CodeRunnerPage() {
  const [desafioActual, setDesafioActual] = useState(0);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [puntos, setPuntos] = useState(0);
  const [hp, setHp] = useState(3); // Puntos de vida
  const [posicion, setPosicion] = useState(0); // Posición en el dungeon
  const [tesoros, setTesoros] = useState(0); // Tesoros recolectados
  const [gameOver, setGameOver] = useState(false);
  const [victoria, setVictoria] = useState(false);

  const desafio: CodeChallenge = codeRunnerChallenges[desafioActual];
  const totalRooms = codeRunnerChallenges.length;

  // Generar el mapa del dungeon
  const renderDungeon = () => {
    const rooms = [];
    for (let i = 0; i < totalRooms; i++) {
      if (i === posicion) {
        rooms.push('😊'); // Jugador
      } else if (i < posicion) {
        rooms.push('✅'); // Completado
      } else if (i === totalRooms - 1) {
        rooms.push('🐉'); // Boss/Final
      } else if (i === posicion + 1) {
        rooms.push('[?]'); // Siguiente sala
      } else {
        rooms.push('[ ]'); // Salas futuras
      }
    }
    return rooms.join('--');
  };

  const verificarRespuesta = () => {
    setMostrarResultado(true);

    if (respuestaSeleccionada === desafio.resultadoEsperado) {
      // ¡Acierto! Avanza
      setPuntos(puntos + desafio.puntos);
      setTesoros(tesoros + 1);

      // Animación de avance
      setTimeout(() => {
        if (desafioActual < codeRunnerChallenges.length - 1) {
          setPosicion(posicion + 1);
          setDesafioActual(desafioActual + 1);
          setRespuestaSeleccionada('');
          setMostrarResultado(false);
        } else {
          setVictoria(true);
        }
      }, 2000);
    } else {
      // ¡Fallo! Pierde HP
      const newHp = hp - 1;
      setHp(newHp);

      if (newHp <= 0) {
        setGameOver(true);
      } else {
        // Puede intentar de nuevo
        setTimeout(() => {
          setRespuestaSeleccionada('');
          setMostrarResultado(false);
        }, 2000);
      }
    }
  };

  const reiniciarJuego = () => {
    setDesafioActual(0);
    setPosicion(0);
    setHp(3);
    setPuntos(0);
    setTesoros(0);
    setGameOver(false);
    setVictoria(false);
    setRespuestaSeleccionada('');
    setMostrarResultado(false);
  };

  // Pantalla de Game Over
  if (gameOver) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-900 text-white rounded-lg p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">💀 Game Over 💀</h1>
          <p className="text-xl mb-4">¡Te quedaste sin vida en el dungeon!</p>
          <p className="mb-6">Tesoros recolectados: {tesoros} 💰</p>
          <button
            onClick={reiniciarJuego}
            className="bg-white text-red-900 px-6 py-3 rounded-lg font-bold hover:bg-gray-100"
          >
            🔄 Intentar de Nuevo
          </button>
        </div>
      </div>
    );
  }

  // Pantalla de Victoria
  if (victoria) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-green-600 text-white rounded-lg p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">🏆 ¡Victoria! 🏆</h1>
          <p className="text-xl mb-4">¡Derrotaste al dragón y completaste el dungeon!</p>
          <p className="text-2xl mb-2">Puntos totales: {puntos} ⭐</p>
          <p className="text-xl mb-6">Tesoros recolectados: {tesoros} 💰</p>
          <button
            onClick={reiniciarJuego}
            className="bg-white text-green-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100"
          >
            🎮 Jugar de Nuevo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* HUD - Información del juego */}
      <div className="bg-gray-900 text-white rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            {/* HP */}
            <div className="flex items-center gap-2">
              <span>HP:</span>
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="text-2xl">
                    {i < hp ? '❤️' : '💔'}
                  </span>
                ))}
              </div>
            </div>

            {/* Tesoros */}
            <div>💰 Tesoros: {tesoros}</div>

            {/* Puntos */}
            <div>⭐ Puntos: {puntos}</div>
          </div>

          {/* Sala actual */}
          <div className="text-lg">
            📍 Sala {posicion + 1} de {totalRooms}
          </div>
        </div>
      </div>

      {/* Mapa del Dungeon */}
      <div className="bg-gray-800 text-white rounded-lg p-6 mb-6 overflow-x-auto">
        <h3 className="text-sm mb-3 text-gray-400">MAPA DEL DUNGEON:</h3>
        <div className="font-mono text-2xl whitespace-nowrap">
          🚪--{renderDungeon()}--🏁
        </div>
      </div>

      {/* Desafío actual */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Información del desafío */}
        <div className="mb-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
            desafio.dificultad === 'Facil' ? 'bg-green-100 text-green-800' :
            desafio.dificultad === 'Medio' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {desafio.dificultad}
          </span>
          <span className="ml-3 text-gray-600">+{desafio.puntos} puntos</span>
        </div>

        {/* Título y descripción */}
        <h2 className="text-xl font-bold mb-3">{desafio.titulo}</h2>
        <p className="text-gray-600 mb-6">{desafio.descripcion}</p>

        {/* Código */}
        <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono mb-6">
          <pre>{desafio.codigo}</pre>
        </div>

        {/* Opciones */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {desafio.opciones.map((opcion) => (
            <button
              key={opcion}
              onClick={() => setRespuestaSeleccionada(opcion)}
              disabled={mostrarResultado}
              className={`p-3 rounded-lg border-2 transition-all ${
                respuestaSeleccionada === opcion
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              } ${mostrarResultado ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <code className="text-lg">{opcion}</code>
            </button>
          ))}
        </div>

        {/* Pista */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-sm">
            <strong>💡 Pista:</strong> {desafio.pista}
          </p>
        </div>

        {/* Resultado */}
        {mostrarResultado && (
          <div className={`p-4 rounded-lg mb-6 ${
            respuestaSeleccionada === desafio.resultadoEsperado
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {respuestaSeleccionada === desafio.resultadoEsperado ? (
              <div>
                <strong>⚔️ ¡Excelente!</strong> Avanzas a la siguiente sala...
                <br />+{desafio.puntos} puntos | +1 tesoro 💰
              </div>
            ) : (
              <div>
                <strong>💥 ¡Auch!</strong> Perdiste 1 HP. La respuesta correcta es: <code>{desafio.resultadoEsperado}</code>
                <br />HP restante: {hp}/3
              </div>
            )}
          </div>
        )}

        {/* Botón de acción */}
        {!mostrarResultado && (
          <button
            onClick={verificarRespuesta}
            disabled={!respuestaSeleccionada}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-bold"
          >
            ⚔️ Enfrentar Desafío
          </button>
        )}
      </div>
    </div>
  );
}