import React, { useRef } from "react";

/**
 * Ruler component
 * @returns  Ruler Component
 */
const RulerComponent = (): JSX.Element => {
  /** SVG ref object */
  const svgRef = useRef<SVGSVGElement>(null);

  /** Width of the SVG */
  const svgWidth = 1000;
  /** Height of the SVG */
  const svgHeight = 40;
  /** Number of marks on the ruler */
  let numMarks = 20;

  /** Height of a small hash mark */
  const smallMarkHeight = 10;
  /** Height of a large hash mark */
  const largeMarkHeight = 20;
  /** Width of a mark */
  const markWidth = 1;

  /** Space between neighboring marks */
  const spaceBetweenMarks = 50;

  // TODO: move to a util folder
  const calculateMarkPositions = (): number[] => {
    let positions: number[] = [];
    for (let i = 0; i < numMarks; i++) {
      const markPosition = numMarks === 1 ? spaceBetweenMarks : spaceBetweenMarks + spaceBetweenMarks * i;
    }

    return positions;
  };

  /** Positions of an each hash mark */
  const markPositions = calculateMarkPositions();

  return (
    <div className="rc-container">
      <svg
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        ref={svgRef}
        preserveAspectRatio="xMidYMin meet"
        className="rc-svg-ruler"
      >
        {markPositions.map((pos, index: number) => (
          <line
            key={pos}
            x1={pos}
            y1={2}
            x2={pos}
            y2={index % 10 === 0 ? largeMarkHeight : smallMarkHeight}
            className="rc-ruler-hash-mark"
            strokeWidth={markWidth}
          />
        ))}
      </svg>
      Ruler component
    </div>
  );
};

export default RulerComponent;
