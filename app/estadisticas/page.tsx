"use client";

import { useState, useEffect } from 'react';
import { useGameData } from '../hooks/useGameData';
import { puzzles } from '../data/puzzles';

export default function EstadisticasPage() {
  const { gameData } = useGameData();
  const [stats, setStats] = useState({
    tasaExito: 0,
    tiempoJugado: 0,
    mejorRacha: 0,
    puzzlesFaciles: 0,
    puzzlesMedios: 0,
    puzzlesDificiles: 0,
    lenguajeFavorito: 'JavaScript'
  });

  useEffect(() => {
    calcularEstadisticas();
  }, [gameData]);

  const calcularEstadisticas = () => {
    const completados = gameData.puzzlesCompletados.length;
    const total = puzzles.length;
    const tasa = total > 0 ? (completados / total) * 100 : 0;

    // Contar por dificultad
    const faciles = gameData.puzzlesCompletados.filter(id =>
      puzzles.find(p => p.id === id)?.dificultad === 'Facil'
    ).length;

    const medios = gameData.puzzlesCompletados.filter(id =>
      puzzles.find(p => p.id === id)?.dificultad === 'Medio'
    ).length;

    const dificiles = gameData.puzzlesCompletados.filter(id =>
      puzzles.find(p => p.id === id)?.dificultad === 'Dificil'
    ).length;

    setStats({
      tasaExito: tasa,
      tiempoJugado: completados * 2, // Aproximado 2 min por puzzle
      mejorRacha: gameData.mejorRacha,
      puzzlesFaciles: faciles,
      puzzlesMedios: medios,
      puzzlesDificiles: dificiles,
      lenguajeFavorito: determinarLenguajeFavorito()
    });
  };

  const determinarLenguajeFavorito = () => {
    const lenguajes = gameData.puzzlesCompletados.map(id =>
      puzzles.find(p => p.id === id)?.lenguaje
    );

    const conteo = lenguajes.reduce((acc, lang) => {
      if (lang) acc[lang] = (acc[lang] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.keys(conteo).reduce((a, b) =>
      conteo[a] > conteo[b] ? a : b, 'JavaScript'
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">📊 Tus Estadísticas</h1>

      {/* Grid de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Tasa de éxito */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Progreso General</h3>
          <div className="text-3xl font-bold text-blue-600">{stats.tasaExito.toFixed(1)}%</div>
          <p className="text-gray-600">Puzzles completados</p>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${stats.tasaExito}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tiempo jugado */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Tiempo Jugado</h3>
          <div className="text-3xl font-bold text-green-600">{stats.tiempoJugado}</div>
          <p className="text-gray-600">Minutos totales</p>
        </div>

        {/* Mejor racha */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Mejor Racha</h3>
          <div className="text-3xl font-bold text-purple-600">🔥 {gameData.mejorRacha}</div>
          <p className="text-gray-600">Días consecutivos</p>
        </div>

        {/* Puzzles por dificultad */}
        <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2 lg:col-span-1">
          <h3 className="text-lg font-semibold mb-4">Por Dificultad</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-green-600">Fácil</span>
              <span className="font-bold">{stats.puzzlesFaciles}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-yellow-600">Medio</span>
              <span className="font-bold">{stats.puzzlesMedios}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-600">Difícil</span>
              <span className="font-bold">{stats.puzzlesDificiles}</span>
            </div>
          </div>
        </div>

        {/* Lenguaje favorito */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Lenguaje Favorito</h3>
          <div className="text-2xl font-bold text-indigo-600">
            {stats.lenguajeFavorito === 'JavaScript' ? '🟨 JavaScript' : '🔷 TypeScript'}
          </div>
          <p className="text-gray-600">Más puzzles completados</p>
        </div>

        {/* Rango actual */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-2">Rango Actual</h3>
          <div className="text-2xl font-bold">
            {gameData.rango === 'Junior' && '👶 Junior Dev'}
            {gameData.rango === 'Mid' && '💻 Mid Developer'}
            {gameData.rango === 'Senior' && '🚀 Senior Developer'}
          </div>
          <p className="text-gray-600">{gameData.puntosTotal} puntos totales</p>
        </div>
      </div>
    </div>
  );
}