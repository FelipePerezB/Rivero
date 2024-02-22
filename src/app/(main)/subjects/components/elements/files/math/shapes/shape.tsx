export default function Shape({
  sizes,
  distanceUnit,
  coords,
}: {
  sizes?: boolean;
  coords: { x1: number; x2: number; y1: number; y2: number }[];
  distanceUnit: number;
}) {
  return (
    <>
      <polygon
      fill="white"
      stroke="black"
      strokeWidth={1.5}
        points={coords.map(({ x1, y1 }) => {
          const scaledX = x1 * distanceUnit;
          const scaledY = y1 * distanceUnit;
          return `${scaledX},${scaledY}`
        }).join(' ')}
      />
      {!!sizes && coords.map(({ x1, x2, y1, y2 }, i) => {
        const scaledX1 = x1 * distanceUnit;
        const scaledX2 = x2 * distanceUnit;
        const scaledY1 = y1 * distanceUnit;
        const scaledY2 = y2 * distanceUnit;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const size = Math.sqrt(dx ** 2 + dy ** 2); // Distancia euclidiana

        const textX = (scaledX1 + scaledX2) / 2; // Calcular el centro x
        const textY = (scaledY1 + scaledY2) / 2; // Poner el texto 5px arriba de la línea
        return (
          <g key={`line-${i}`}>
            <line
              className="relative z-0"
              x1={scaledX1}
              y1={scaledY1}
              x2={scaledX2}
              y2={scaledY2}
              stroke="black"
              strokeWidth="2"
            />
            {coords.length <= 15 && size > 30 && (
              <>
                <rect
                  x={`calc(${textX}px - 1.4em)`}
                  y={`calc(${textY}px - 1em)`}
                  width="2.8em"
                  height="1.3em"
                  fill="white"
                  stroke="black"
                  rx={"0.05em"}
                  ry={"0.05em"}
                  strokeWidth="1"
                />
                <text x={textX} y={textY} textAnchor="middle">{`${Number(
                  size.toFixed(1)
                )}`}</text>
              </>
            )}
          </g>
        );
      })}
    </>
  );
}
