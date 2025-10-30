"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [usuario, setUsuario] = useState({
    nombre: "Alejandro",
    rango: "Junior",
    puntosTotal: 0,
    rachaActual: 0,
    puzzlesCompletados: 0,
    ultimoAcceso: new Date().toISOString()
  });

  // Cargar datos del localStorage
  useEffect(() => {
    const datosGuardados = localStorage.getItem('codebreaker_usuario');
    if (datosGuardados) {
      setUsuario(JSON.parse(datosGuardados));
    }

    // Actualizar último acceso
    const hoy = new Date().toDateString();
    const ultimoAcceso = localStorage.getItem('codebreaker_ultimo_acceso');

    if (ultimoAcceso !== hoy) {
      // Nueva visita diaria
      localStorage.setItem('codebreaker_ultimo_acceso', hoy);
    }
  }, []);

  // Determinar rango basado en puntos
  const obtenerRango = (puntos: number) => {
    if (puntos < 100) return "Junior 👶";
    if (puntos < 300) return "Mid 💪";
    return "Senior 🚀";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header de Bienvenida */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg p-6 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          ¡Hola, {usuario.nombre}! 👋
        </h1>
        <p className="text-lg opacity-90">
          Sigue rompiendo códigos y mejora tus habilidades
        </p>
      </div>

      {/* Grid de Estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Card de Rango */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm mb-2">Rango Actual</p>
          <p className="text-2xl font-bold text-blue-600">
            {obtenerRango(usuario.puntosTotal)}
          </p>
        </div>

        {/* Card de Puntos */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm mb-2">Puntos Totales</p>
          <p className="text-2xl font-bold text-green-600">
            ⭐ {usuario.puntosTotal}
          </p>
        </div>

        {/* Card de Puzzles */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm mb-2">Puzzles Completados</p>
          <p className="text-2xl font-bold text-purple-600">
            🧩 {usuario.puzzlesCompletados}
          </p>
        </div>

        {/* Card de Racha */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 text-sm mb-2">Racha Diaria</p>
          <p className="text-2xl font-bold text-orange-600">
            🔥 {usuario.rachaActual} días
          </p>
        </div>
      </div>

      {/* Acciones Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Jugar */}
        <Link href="/puzzles" className="group">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">🎮 Jugar Ahora</h2>
              <span className="text-3xl group-hover:scale-110 transition-transform">→</span>
            </div>
            <p className="text-gray-600">
              Resuelve puzzles de JavaScript y TypeScript
            </p>
            <div className="mt-4">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full inline-block text-sm">
                10 puzzles disponibles
              </div>
            </div>
          </div>
        </Link>

        {/* Card Logros */}
        <Link href="/logros" className="group">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow cursor-pointer border-2 border-transparent hover:border-purple-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">🏆 Ver Logros</h2>
              <span className="text-3xl group-hover:scale-110 transition-transform">→</span>
            </div>
            <p className="text-gray-600">
              Revisa tu progreso y desbloquea recompensas
            </p>
            <div className="mt-4">
              <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full inline-block text-sm">
                Próximo logro: 50 puntos
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Progreso hacia el siguiente rango */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h3 className="text-lg font-bold mb-4">📈 Progreso al Siguiente Rango</h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>{obtenerRango(usuario.puntosTotal)}</span>
            <span>{usuario.puntosTotal < 100 ? 'Mid Level' : 'Senior Level'}</span>
          </div>
          <div className="bg-gray-200 rounded-full h-4 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-full transition-all duration-500"
              style={{
                width: `${usuario.puntosTotal < 100
                  ? (usuario.puntosTotal / 100) * 100
                  : usuario.puntosTotal < 300
                    ? ((usuario.puntosTotal - 100) / 200) * 100
                    : 100}%`
              }}
            />
          </div>
          <p className="text-sm text-gray-600">
            {usuario.puntosTotal < 100
              ? `${100 - usuario.puntosTotal} puntos para Mid Level`
              : usuario.puntosTotal < 300
                ? `${300 - usuario.puntosTotal} puntos para Senior Level`
                : '¡Eres un Senior Developer! 🎉'}
          </p>
        </div>
      </div>
    </div>
  );
}