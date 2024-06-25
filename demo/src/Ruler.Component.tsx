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
  /** SVG padding */
  padding?: [top: number, right: number, bottom: number, left: number];
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
  const { numMarks, smallMarkHeight, largeMarkHeight, markingsColor, label, padding } = props;

  /** Config object */
  const config = {
    /** Ruler label */
    label: label,

    /** Number of marks on the ruler */
    numMarks: numMarks ?? 21,
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
    svgHeight: 50,
    /** Default SVG padding */
    padding: padding ?? [2, 20, 2, 20],
  };

  // DEBUG: delete from final version
  // console.log(config);

  /** Space between neighboring marks */
  // const maxSpaceBetweenMarks = 50;

  /** Paddings */
  const [paddingTop, paddingRight, paddingBottom, paddingLeft] = config.padding;

  /** Available content width (after padding) */
  const svgContentWidth = config.svgWidth - (paddingLeft + paddingRight);
  /** Available content height (after padding) */
  // const svgContentHeight = config.svgWidth - (paddingTop + paddingBottom);

  // TODO: move to a util folder
  const calculateMarkPositions = (): number[] => {
    const positions: number[] = [];

    // actual space between marks after padding
    const actualSpaceBetweenMarks = svgContentWidth / (config.numMarks - 1);
    // TODO: depending on the distance between marks the font size of the marks will be recalculated

    for (let i = 0; i < config.numMarks; i++) {
      // calculate position
      const markPosition = numMarks === 1 ? paddingLeft : paddingLeft + actualSpaceBetweenMarks * i;
      // add to the list of positions
      positions.push(markPosition);
    }

    return positions;
  };

  /** Positions of an each hash mark */
  const markPositions = calculateMarkPositions();
  // space from the base of the mark to the closest edge
  const markBaseMargin = 15;
  // TODO: introduce 3 type of marks major (the largest), minor (smallest), special (half points)
  return (
    <div className="rc-container">
      <svg
        viewBox={`0 0 ${config.svgWidth} ${config.svgHeight}`}
        ref={svgRef}
        preserveAspectRatio="xMidYMin meet"
        className="rc-svg-ruler"
      >
        {markPositions.map((pos, index: number) => (
          <g key={pos} transform={`translate(${pos}, ${paddingTop})`}>
            <text x={0} y={10} fill="white" textAnchor="middle" fontSize="0.8rem">
              {index % 10 === 0 ? index : index % 10}
            </text>
            <line
              x1={0}
              y1={markBaseMargin}
              x2={0}
              y2={index % 10 === 0 ? config.largeMarkHeight + markBaseMargin : config.smallMarkHeight + markBaseMargin}
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
