"use client";

import { useState } from 'react';
import { bugs } from '../data/bugs';

export default function BugHunterPage() {
  const [bugActual, setBugActual] = useState(0);
  const [lineaSeleccionada, setLineaSeleccionada] = useState<number | null>(null);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [puntos, setPuntos] = useState(0);
  const [mostrarPista, setMostrarPista] = useState(false);

  const bug = bugs[bugActual];

  const verificarLinea = () => {
    if (lineaSeleccionada === null) return;

    const esCorrecta = bug.lineasConError.includes(lineaSeleccionada);
    setMostrarResultado(true);

    if (esCorrecta) {
      setPuntos(puntos + bug.puntos);
    }
  };

  const siguienteBug = () => {
    if (bugActual < bugs.length - 1) {
      setBugActual(bugActual + 1);
      setLineaSeleccionada(null);
      setMostrarResultado(false);
      setMostrarPista(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            🐛 Bug {bugActual + 1} de {bugs.length}
          </h1>
          <div className="text-xl font-semibold text-green-600">
            ⭐ {puntos} puntos
          </div>
        </div>
      </div>

      {/* Challenge Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-3">{bug.titulo}</h2>
        <p className="text-gray-600 mb-6">{bug.descripcion}</p>

        {/* Código con líneas numeradas */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6">
          <div className="font-mono text-sm">
            {bug.codigo.map((linea, index) => {
              const numeroLinea = index + 1;
              const estaSeleccionada = lineaSeleccionada === numeroLinea;
              const esError = bug.lineasConError.includes(numeroLinea);

              return (
                <div
                  key={index}
                  onClick={() => !mostrarResultado && setLineaSeleccionada(numeroLinea)}
                  className={`
                    flex hover:bg-gray-800 cursor-pointer transition-all
                    ${estaSeleccionada ? 'bg-blue-900' : ''}
                    ${mostrarResultado && esError ? 'bg-red-900' : ''}
                    ${mostrarResultado && estaSeleccionada && esError ? 'bg-green-900' : ''}
                    ${mostrarResultado && estaSeleccionada && !esError ? 'bg-red-800' : ''}
                  `}
                >
                  <span className="text-gray-500 w-12 text-right pr-4 select-none">
                    {numeroLinea}
                  </span>
                  <pre className="text-green-400 flex-1">{linea || ' '}</pre>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pista */}
        {!mostrarResultado && (
          <button
            onClick={() => setMostrarPista(!mostrarPista)}
            className="text-blue-600 underline mb-4"
          >
            {mostrarPista ? 'Ocultar pista' : 'Mostrar pista 💡'}
          </button>
        )}

        {mostrarPista && !mostrarResultado && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <p className="text-sm">{bug.pista}</p>
          </div>
        )}

        {/* Resultado */}
        {mostrarResultado && (
          <div className={`p-4 rounded-lg mb-6 ${
            lineaSeleccionada && bug.lineasConError.includes(lineaSeleccionada)
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {lineaSeleccionada && bug.lineasConError.includes(lineaSeleccionada) ? (
              <>
                <strong>✅ ¡Correcto!</strong> Has ganado {bug.puntos} puntos.
                <p className="mt-2">{bug.explicacion}</p>
                <p className="mt-1 font-mono text-sm">
                  Error: {bug.errores[0].error} → Corrección: {bug.errores[0].correccion}
                </p>
              </>
            ) : (
              <>
                <strong>❌ Incorrecto.</strong> El error estaba en la línea {bug.lineasConError[0]}.
                <p className="mt-2">{bug.explicacion}</p>
              </>
            )}
          </div>
        )}

        {/* Botones */}
        <div className="flex gap-4">
          {!mostrarResultado ? (
            <button
              onClick={verificarLinea}
              disabled={lineaSeleccionada === null}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Verificar Línea {lineaSeleccionada ? lineaSeleccionada : ''}
            </button>
          ) : (
            <button
              onClick={siguienteBug}
              disabled={bugActual >= bugs.length - 1}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300"
            >
              {bugActual >= bugs.length - 1 ? '¡Completado!' : 'Siguiente Bug →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}