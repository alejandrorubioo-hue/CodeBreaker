// app/components/RankBadge.tsx
interface RankBadgeProps {
  rango: 'Junior' | 'Mid' | 'Senior';
  puntos: number;
}

export default function RankBadge({ rango, puntos }: RankBadgeProps) {
  const rangos = {
    Junior: { min: 0, max: 100, color: 'bg-green-500', next: 'Mid' },
    Mid: { min: 100, max: 250, color: 'bg-blue-500', next: 'Senior' },
    Senior: { min: 250, max: 999999, color: 'bg-purple-500', next: null }
  };

  const rangoInfo = rangos[rango];
  const puntosParaSiguiente = rangoInfo.next ? rangos[rangoInfo.next as keyof typeof rangos].min - puntos : 0;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Tu Rango</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className={`${rangoInfo.color} text-white px-4 py-2 rounded-full text-xl font-bold`}>
              {rango}
            </span>
            <span className="text-2xl font-bold">{puntos} pts</span>
          </div>
        </div>
        <div className="text-6xl">
          {rango === 'Junior' ? '🌱' : rango === 'Mid' ? '🚀' : '⭐'}
        </div>
      </div>

      {rangoInfo.next && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-2">
            {puntosParaSiguiente} puntos para {rangoInfo.next}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`${rangoInfo.color} h-full rounded-full transition-all duration-500`}
              style={{ width: `${((puntos - rangoInfo.min) / (rangos[rangoInfo.next as keyof typeof rangos].min - rangoInfo.min)) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}