"use client";

import { useState, useEffect } from 'react';

interface LogroItem {
  id: number;
  titulo: string;
  descripcion: string;
  icono: string;
  desbloqueado: boolean;
  requisito: number; // Puntos necesarios
}

export default function LogrosPage() {
  const [puntosUsuario, setPuntosUsuario] = useState(0);

  // Lista de logros disponibles
  const logros: LogroItem[] = [
    {
      id: 1,
      titulo: "Primer Paso",
      descripcion: "Completa tu primer puzzle",
      icono: "🎯",
      desbloqueado: puntosUsuario >= 10,
      requisito: 10
    },
    {
      id: 2,
      titulo: "Aprendiz",
      descripcion: "Alcanza 50 puntos",
      icono: "📚",
      desbloqueado: puntosUsuario >= 50,
      requisito: 50
    },
    {
      id: 3,
      titulo: "Desarrollador Junior",
      descripcion: "Alcanza 100 puntos",
      icono: "👨‍💻",
      desbloqueado: puntosUsuario >= 100,
      requisito: 100
    },
    {
      id: 4,
      titulo: "Maestro del Código",
      descripcion: "Alcanza 200 puntos",
      icono: "🏅",
      desbloqueado: puntosUsuario >= 200,
      requisito: 200
    },
    {
      id: 5,
      titulo: "Experto TypeScript",
      descripcion: "Alcanza 300 puntos",
      icono: "💎",
      desbloqueado: puntosUsuario >= 300,
      requisito: 300
    },
    {
      id: 6,
      titulo: "Leyenda",
      descripcion: "Alcanza 500 puntos",
      icono: "👑",
      desbloqueado: puntosUsuario >= 500,
      requisito: 500
    }
  ];

  // Cargar puntos del localStorage al montar
  useEffect(() => {
    const puntosGuardados = localStorage.getItem('codebreaker-puntos');
    if (puntosGuardados) {
      setPuntosUsuario(parseInt(puntosGuardados));
    }
  }, []);

  const logrosDesbloqueados = logros.filter(l => l.desbloqueado).length;
  const progreso = (logrosDesbloqueados / logros.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header con estadísticas */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold mb-4">🏆 Tus Logros</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Puntos Totales</p>
            <p className="text-2xl font-bold text-blue-600">⭐ {puntosUsuario}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Logros Desbloqueados</p>
            <p className="text-2xl font-bold text-green-600">{logrosDesbloqueados} / {logros.length}</p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-gray-600 text-sm">Progreso Total</p>
            <p className="text-2xl font-bold text-purple-600">{progreso.toFixed(0)}%</p>
          </div>
        </div>

        {/* Barra de progreso general */}
        <div className="mt-4">
          <div className="bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progreso}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid de logros */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logros.map((logro) => (
          <div
            key={logro.id}
            className={`relative rounded-lg p-6 transition-all duration-300 ${
              logro.desbloqueado
                ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-2 border-yellow-400 transform hover:scale-105'
                : 'bg-gray-100 border-2 border-gray-300 opacity-60'
            }`}
          >
            {/* Icono del logro */}
            <div className="text-4xl mb-3">{logro.icono}</div>

            {/* Información del logro */}
            <h3 className={`font-bold text-lg mb-2 ${
              logro.desbloqueado ? 'text-gray-800' : 'text-gray-500'
            }`}>
              {logro.titulo}
            </h3>

            <p className={`text-sm mb-3 ${
              logro.desbloqueado ? 'text-gray-600' : 'text-gray-400'
            }`}>
              {logro.descripcion}
            </p>

            {/* Requisito */}
            <div className={`text-xs font-medium ${
              logro.desbloqueado ? 'text-green-600' : 'text-gray-500'
            }`}>
              {logro.desbloqueado ? '✅ Desbloqueado' : `🔒 Requiere ${logro.requisito} puntos`}
            </div>

            {/* Badge de NEW si está recién desbloqueado */}
            {logro.desbloqueado && (
              <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full animate-bounce">
                NEW!
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}