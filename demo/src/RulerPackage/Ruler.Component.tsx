import React, { useRef } from "react";
import "./ruler.component.css";
import { RulerComponentProps, RulerConfig } from "./Ruler.Component.Types";

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
  const config: RulerConfig = {
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
    /** Mark options */
    marksOptions: {
      /** Major mark options */
      majorMark: { frequency: 10, height: 20, offset: 0 },
      /** Minor mark options */
      minorMark: { frequency: -1, height: 7, offset: 0 },
      /** Special mark options */
      specialMark: { frequency: 10, height: 15, offset: 5 },
    },
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
  return (
    <div className="rc-container">
      <svg
        viewBox={`0 0 ${config.svgWidth} ${config.svgHeight}`}
        ref={svgRef}
        preserveAspectRatio="xMidYMin meet"
        className="rc-svg-ruler"
      >
        {markPositions.map((pos, index: number) => (
          <MarkComponent key={index} position={pos} index={index} config={config} />
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

/**
 * Renders a mark based on the index
 *
 * @param props - Mark Component props
 * @returns Either Major, Minor or Special Mark
 */
const MarkComponent = (props: { position: number; index: number; config: RulerConfig }) => {
  // TODO: do not hard code
  const markBaseMargin = 15;

  const { index, position, config } = props;
  const [paddingTop, paddingRight, paddingBottom, paddingLeft] = config.padding;

  // marks options
  const { majorMark, specialMark, minorMark } = config.marksOptions;

  // TODO: create 3 separate components
  if ((index - majorMark.offset) % majorMark.frequency === 0) {
    // this is a major mark
    return (
      <g key={position} transform={`translate(${position}, ${paddingTop})`}>
        <text x={0} y={10} fill="white" textAnchor="middle" fontSize="0.8rem">
          {index}
        </text>
        <g transform={`translate(0, ${markBaseMargin})`}>
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={majorMark.height}
            className="rc-ruler-hash-mark"
            stroke={config.markingsColor}
            strokeWidth={config.markWidth}
          />
        </g>
      </g>
    );
  } else if ((index - specialMark.offset) % specialMark.frequency === 0) {
    return (
      <g key={position} transform={`translate(${position}, ${paddingTop})`}>
        <text x={0} y={10} fill="white" textAnchor="middle" fontSize="0.5rem">
          {index % specialMark.frequency}
        </text>
        <g transform={`translate(0, ${markBaseMargin})`}>
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={specialMark.height}
            className="rc-ruler-hash-mark"
            stroke={config.markingsColor}
            strokeWidth={config.markWidth}
          />
        </g>
      </g>
    );
  } else {
    return (
      <g key={position} transform={`translate(${position}, ${paddingTop})`}>
        <text x={0} y={10} fill="white" textAnchor="middle" fontSize="0.3rem">
          {index % majorMark.frequency}
        </text>
        <g transform={`translate(0, ${markBaseMargin})`}>
          <line
            x1={0}
            y1={0}
            x2={0}
            y2={minorMark.height}
            className="rc-ruler-hash-mark"
            stroke={config.markingsColor}
            strokeWidth={config.markWidth}
          />
        </g>
      </g>
    );
  }
};

export default RulerComponent;
