import { MarkOptions, RulerConfig } from "./Ruler.Component.Types";

/**
 * Renders a Major mark
 * @param props - MajorMark component props
 */
export const MajorMarkComponent = (props: {
  index: number;
  position: number;
  paddingTop: number;
  options: MarkOptions;
  color: string;
  width: number;
}) => {
  const { index, position, paddingTop, options, color, width } = props;
  // TODO: do not hard code
  const markTopMargin = 15;

  return (
    <g key={position} transform={`translate(${position}, ${paddingTop})`}>
      <text x={0} y={10} fill="white" textAnchor="middle" fontSize={`${options.fontSize}rem`}>
        {index}
      </text>
      <g transform={`translate(0, ${markTopMargin})`}>
        <line
          x1={0}
          y1={0}
          x2={0}
          y2={options.height}
          className="rc-ruler-hash-mark rc-ruler-major-hash-mark"
          stroke={color}
          strokeWidth={width}
        />
      </g>
    </g>
  );
};

/**
 * Renders a Special mark
 * @param props - MajorMark component props
 */
export const SpecialMarkComponent = (props: {
  index: number;
  position: number;
  paddingTop: number;
  options: MarkOptions;
  color: string;
  width: number;
}) => {
  const { index, position, paddingTop, options, color, width } = props;
  // TODO: do not hard code
  const markTopMargin = 15;

  return (
    <g key={position} transform={`translate(${position}, ${paddingTop})`}>
      <text x={0} y={10} fill="white" textAnchor="middle" fontSize={`${options.fontSize}rem`}>
        {index}
      </text>
      <g transform={`translate(0, ${markTopMargin})`}>
        <line
          x1={0}
          y1={0}
          x2={0}
          y2={options.height}
          className="rc-ruler-hash-mark rc-ruler-special-hash-mark"
          stroke={color}
          strokeWidth={width}
        />
      </g>
    </g>
  );
};

/**
 * Renders a Special mark
 * @param props - MajorMark component props
 */
export const MinorMarkComponent = (props: {
  index: number;
  position: number;
  paddingTop: number;
  options: MarkOptions;
  color: string;
  width: number;
}) => {
  const { index, position, paddingTop, options, color, width } = props;
  // TODO: do not hard code
  const markTopMargin = 15;

  return (
    <g key={position} transform={`translate(${position}, ${paddingTop})`}>
      <text x={0} y={10} fill="white" textAnchor="middle" fontSize={`${options.fontSize}rem`}>
        {index}
      </text>
      <g transform={`translate(0, ${markTopMargin})`}>
        <line
          x1={0}
          y1={0}
          x2={0}
          y2={options.height}
          className="rc-ruler-hash-mark rc-ruler-minor-hash-mark"
          stroke={color}
          strokeWidth={width}
        />
      </g>
    </g>
  );
};

/**
 * Renders a mark based on the index
 *
 * @param props - Mark Component props
 * @returns Either Major, Minor or Special Mark
 */
const MarkComponent = (props: { position: number; index: number; config: RulerConfig }) => {
  // props destructuring
  const { index, position, config } = props;
  const [paddingTop, , ,] = config.padding;

  // marks options
  const { majorMark, specialMark, minorMark } = config.marksOptions;

  if ((index - majorMark.offset) % majorMark.frequency === 0) {
    return (
      <MajorMarkComponent
        index={index}
        position={position}
        paddingTop={paddingTop}
        options={majorMark}
        color={config.markingsColor}
        width={config.markWidth}
      />
    );
  } else if ((index - specialMark.offset) % specialMark.frequency === 0) {
    return (
      <SpecialMarkComponent
        index={index}
        position={position}
        paddingTop={paddingTop}
        options={specialMark}
        color={config.markingsColor}
        width={config.markWidth}
      />
    );
  } else {
    return (
      <MinorMarkComponent
        index={index}
        position={position}
        paddingTop={paddingTop}
        options={minorMark}
        color={config.markingsColor}
        width={config.markWidth}
      />
    );
  }
};

export default MarkComponent;
