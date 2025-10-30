// app/hooks/useGameData.ts
import { useState, useEffect } from 'react';

export interface GameData {
  puntosTotal: number;
  puzzlesCompletados: number[];
  rango: 'Junior' | 'Mid' | 'Senior';
  rachaActual: number;
  mejorRacha: number;
  ultimoAcceso: string;
}

export function useGameData() {
  const [gameData, setGameData] = useState<GameData>({
    puntosTotal: 0,
    puzzlesCompletados: [],
    rango: 'Junior',
    rachaActual: 0,
    mejorRacha: 0,
    ultimoAcceso: new Date().toISOString()
  });

  // Cargar datos al iniciar
  useEffect(() => {
    const datos = localStorage.getItem('codebreaker_gamedata');
    if (datos) {
      setGameData(JSON.parse(datos));
    }
  }, []);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('codebreaker_gamedata', JSON.stringify(gameData));
  }, [gameData]);

  // Actualizar puntos
  const actualizarPuntos = (nuevosPuntos: number) => {
    setGameData(prev => {
      const puntosActualizados = prev.puntosTotal + nuevosPuntos;

      // Determinar nuevo rango
      let nuevoRango: 'Junior' | 'Mid' | 'Senior' = 'Junior';
      if (puntosActualizados >= 200) nuevoRango = 'Senior';
      else if (puntosActualizados >= 100) nuevoRango = 'Mid';

      return {
        ...prev,
        puntosTotal: puntosActualizados,
        rango: nuevoRango
      };
    });
  };

  // Agregar puzzle completado
  const agregarPuzzleCompletado = (puzzleId: number) => {
    setGameData(prev => {
      if (!prev.puzzlesCompletados.includes(puzzleId)) {
        return {
          ...prev,
          puzzlesCompletados: [...prev.puzzlesCompletados, puzzleId]
        };
      }
      return prev;
    });
  };

  // Actualizar racha
  const actualizarRacha = () => {
    const hoy = new Date().toDateString();
    const ultimoAcceso = new Date(gameData.ultimoAcceso).toDateString();

    setGameData(prev => {
      if (hoy !== ultimoAcceso) {
        const ayer = new Date();
        ayer.setDate(ayer.getDate() - 1);

        if (ayer.toDateString() === ultimoAcceso) {
          // Mantiene la racha
          return {
            ...prev,
            rachaActual: prev.rachaActual + 1,
            mejorRacha: Math.max(prev.mejorRacha, prev.rachaActual + 1),
            ultimoAcceso: new Date().toISOString()
          };
        } else {
          // Perdió la racha
          return {
            ...prev,
            rachaActual: 1,
            ultimoAcceso: new Date().toISOString()
          };
        }
      }
      return prev;
    });
  };

  // Resetear progreso
  const resetearProgreso = () => {
    const datosIniciales: GameData = {
      puntosTotal: 0,
      puzzlesCompletados: [],
      rango: 'Junior',
      rachaActual: 0,
      mejorRacha: 0,
      ultimoAcceso: new Date().toISOString()
    };
    setGameData(datosIniciales);
    localStorage.setItem('codebreaker_gamedata', JSON.stringify(datosIniciales));
  };

  return {
    gameData,
    actualizarPuntos,
    agregarPuzzleCompletado,
    actualizarRacha,
    resetearProgreso
  };
}