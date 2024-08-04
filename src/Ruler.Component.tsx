import React, { useRef } from "react";
import "./ruler.component.css";
import { RulerComponentProps, RulerConfig } from "./Ruler.Component.Types";
import MarkComponent from "./Mark.Component";

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
      majorMark: { frequency: 10, height: 20, offset: 0, fontSize: 0.8 },
      /** Minor mark options */
      minorMark: { frequency: -1, height: 7, offset: 0, fontSize: 0.4 },
      /** Special mark options */
      specialMark: { frequency: 10, height: 15, offset: 5, fontSize: 0.7 },
    },
  };

  /** Paddings */
  const [, paddingRight, , paddingLeft] = config.padding;

  /** Available content width (after padding) */
  const svgContentWidth = config.svgWidth - (paddingLeft + paddingRight);

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
      {config.label && (
        <section className="rc-ruler-label-section">
          <p>{config.label}</p>
        </section>
      )}
    </div>
  );
};

export default RulerComponent;
