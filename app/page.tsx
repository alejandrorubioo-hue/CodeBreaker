"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { puzzles } from './data/puzzles';
import { bugs } from './data/bugs';
import { codeRunnerChallenges } from './data/coderunner';

export default function Home() {
  const [stats, setStats] = useState({
    puntosTotal: 0,
    puzzlesCompletados: 0,
    bugsEncontrados: 0,
    codesCompletados: 0,
    rango: 'Junior' as 'Junior' | 'Mid' | 'Senior',
    porcentajeTotal: 0
  });

  useEffect(() => {
    // Cargar estadísticas de cada modo de juego
    const puzzleData = localStorage.getItem('codebreaker_puzzles');
    const bugData = localStorage.getItem('codebreaker_bugs');
    const runnerData = localStorage.getItem('codebreaker_runner');

    let puntosTotales = 0;
    let puzzlesHechos = 0;
    let bugsHechos = 0;
    let runnerHechos = 0;

    if (puzzleData) {
      const data = JSON.parse(puzzleData);
      puntosTotales += data.puntos || 0;
      puzzlesHechos = data.completados || 0;
    }

    if (bugData) {
      const data = JSON.parse(bugData);
      puntosTotales += data.puntos || 0;
      bugsHechos = data.completados || 0;
    }

    if (runnerData) {
      const data = JSON.parse(runnerData);
      puntosTotales += data.puntos || 0;
      runnerHechos = data.completados || 0;
    }

    // Calcular rango basado en puntos
    let rangoActual: 'Junior' | 'Mid' | 'Senior' = 'Junior';
    if (puntosTotales >= 300) {
      rangoActual = 'Senior';
    } else if (puntosTotales >= 150) {
      rangoActual = 'Mid';
    }

    // Calcular porcentaje total
    const totalDesafios = puzzles.length + bugs.length + codeRunnerChallenges.length;
    const completados = puzzlesHechos + bugsHechos + runnerHechos;
    const porcentaje = Math.round((completados / totalDesafios) * 100);

    setStats({
      puntosTotal: puntosTotales,
      puzzlesCompletados: puzzlesHechos,
      bugsEncontrados: bugsHechos,
      codesCompletados: runnerHechos,
      rango: rangoActual,
      porcentajeTotal: porcentaje
    });
  }, []);

  // Función para obtener color del rango
  const getRangoColor = (rango: string) => {
    switch(rango) {
      case 'Senior': return 'text-purple-600 bg-purple-100';
      case 'Mid': return 'text-blue-600 bg-blue-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  // Función para obtener próximo rango
  const getProximoRango = () => {
    if (stats.rango === 'Junior') return { nombre: 'Mid', puntos: 150 };
    if (stats.rango === 'Mid') return { nombre: 'Senior', puntos: 300 };
    return null;
  };

  const proximoRango = getProximoRango();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Card de Bienvenida con Rango */}
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-lg p-6 shadow-lg md:col-span-2 lg:col-span-1">
          <h1 className="text-2xl font-bold mb-2">¡Bienvenido a CodeBreaker!</h1>
          <p className="mb-4">Tu rango actual:</p>
          <div className={`inline-block px-4 py-2 rounded-full font-bold text-lg ${getRangoColor(stats.rango)}`}>
            🎖️ {stats.rango} Developer
          </div>
          {proximoRango && (
            <p className="mt-4 text-sm">
              {proximoRango.puntos - stats.puntosTotal} puntos para {proximoRango.nombre}
            </p>
          )}
        </div>

        {/* Card de Puntos Totales */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Puntos Totales</h2>
            <span className="text-3xl font-bold text-blue-600">⭐ {stats.puntosTotal}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${Math.min((stats.puntosTotal / 300) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Card de Progreso General */}
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Progreso Total</h2>
          <div className="relative">
            <div className="text-center">
              <span className="text-4xl font-bold text-green-600">{stats.porcentajeTotal}%</span>
              <p className="text-sm text-gray-600 mt-2">Completado</p>
            </div>
          </div>
        </div>

        {/* Card de Puzzles */}
        <Link href="/puzzles" className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">🧩 Puzzles</h3>
              <p className="text-sm text-gray-500">Rompecabezas de código</p>
            </div>
            <span className="text-2xl font-bold text-purple-600">
              {stats.puzzlesCompletados}/{puzzles.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full transition-all"
              style={{ width: `${(stats.puzzlesCompletados / puzzles.length) * 100}%` }}
            />
          </div>
        </Link>

        {/* Card de Bug Hunter */}
        <Link href="/bug-hunter" className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">🐛 Bug Hunter</h3>
              <p className="text-sm text-gray-500">Encuentra los errores</p>
            </div>
            <span className="text-2xl font-bold text-red-600">
              {stats.bugsEncontrados}/{bugs.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full transition-all"
              style={{ width: `${(stats.bugsEncontrados / bugs.length) * 100}%` }}
            />
          </div>
        </Link>

        {/* Card de Code Runner */}
        <Link href="/code-runner" className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">🏃‍♂️ Code Runner</h3>
              <p className="text-sm text-gray-500">Predice el resultado</p>
            </div>
            <span className="text-2xl font-bold text-green-600">
              {stats.codesCompletados}/{codeRunnerChallenges.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${(stats.codesCompletados / codeRunnerChallenges.length) * 100}%` }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}