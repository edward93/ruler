import React, { useRef } from "react";
import "./ruler.component.css";

/** Ruler component props type */
type RulerComponentProps = {
  /** Number of marks on the ruler - Default: 20 */
  numMarks?: number;
  /** Height of a small hash mark - Default: 10*/
  smallMarkHeight?: number;
  /** Height of a large hash mark - Default: 20*/
  largeMarkHeight?: number;
  /** Color of the marks */
  markingsColor?: string;
  /** Label text */
  label?: string;
};

/**
 * Ruler Component
 * @param props - Ruler Component props
 * @returns Ruler Component
 */
const RulerComponent = (props: RulerComponentProps): JSX.Element => {
  /** SVG ref object */
  const svgRef = useRef<SVGSVGElement>(null);
  // deconstruct the props
  const { numMarks, smallMarkHeight, largeMarkHeight, markingsColor, label } = props;

  /** Config object */
  const config = {
    /** Ruler label */
    label: label,

    /** Number of marks on the ruler */
    numMarks: numMarks ?? 20,
    /** Height of a small hash mark */
    smallMarkHeight: smallMarkHeight ?? 10,
    /** Height of a large hash mark */
    largeMarkHeight: largeMarkHeight ?? 20,
    /** Width of a mark */
    markWidth: 1,

    /** Color of the marks */
    markingsColor: markingsColor ?? "rgba(243, 243, 243, 0.5)",

    /** Width of the SVG */
    svgWidth: 1000,
    /** Height of the SVG */
    svgHeight: 40,
  };

  // DEBUG: delete from final version
  console.log(config);

  /** Space between neighboring marks */
  const spaceBetweenMarks = 50;

  // TODO: move to a util folder
  const calculateMarkPositions = (): number[] => {
    const positions: number[] = [];
    for (let i = 0; i < config.numMarks; i++) {
      // calculate position
      const markPosition = numMarks === 1 ? spaceBetweenMarks : spaceBetweenMarks * i;
      // add to the list of positions
      positions.push(markPosition);
    }

    return positions;
  };

  /** Positions of an each hash mark */
  const markPositions = calculateMarkPositions();

  return (
    <div className="rc-container">
      <svg
        viewBox={`0 0 ${config.svgWidth} ${config.svgHeight}`}
        ref={svgRef}
        preserveAspectRatio="xMidYMin meet"
        className="rc-svg-ruler"
      >
        {markPositions.map((pos, index: number) => (
          <g key={pos} transform={`translate(${pos}, 2)`}>
            <line
              // key={pos}
              x1={0}
              y1={2}
              x2={0}
              y2={(index + 1) % 10 === 0 || index === 0 ? config.largeMarkHeight : config.smallMarkHeight}
              className="rc-ruler-hash-mark"
              stroke={config.markingsColor}
              strokeWidth={config.markWidth}
            />
          </g>
        ))}
      </svg>
      <>
        {config.label && (
          <section className="rc-ruler-label-section">
            <p>{config.label}</p>
          </section>
        )}
      </>
    </div>
  );
};

export default RulerComponent;
