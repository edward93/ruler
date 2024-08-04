/** Ruler component props type */
export type RulerComponentProps = {
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

/** Config type */
export type RulerConfig = {
  /** Ruler label */
  label?: string;

  /** Number of marks on the ruler */
  numMarks: number;
  /** Height of a small hash mark */
  smallMarkHeight: number;
  /** Height of a large hash mark */
  largeMarkHeight: number;
  /** Width of a mark */
  markWidth: number;

  /** Color of the marks */
  markingsColor: string;

  /** Width of the SVG */
  svgWidth: number;
  /** Height of the SVG */
  svgHeight: 50;
  /** Default SVG padding */
  padding: [top: number, right: number, bottom: number, left: number];
  /** Marks options */
  marksOptions: MarksOptions;
};

/** Mark options */
export type MarkOptions = {
  /** Frequency of the mark */
  frequency: number;
  /** Offset of the mark */
  offset: number;
  /** Height of the mark */
  height: number;
  /** Font size of the mark label */
  fontSize: number;
};

/** Options for all the marks */
export type MarksOptions = {
  /** Major mark options */
  majorMark: MarkOptions;
  /** Special mark options */
  specialMark: MarkOptions;
  /** Minor mark options */
  minorMark: MarkOptions;
};
