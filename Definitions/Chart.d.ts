
export interface IChartData
{
    value: number;
    color?: string;
}

export interface IChartDataSet
{
    fillColor?: string;
    strokeColor?: string;
    pointColor?: string;
    pointStrokeColor?: string;
    data: Array<number>;
}

export interface IChartDataSetInput
{
    labels: Array<string>;
    datasets: Array<IChartDataSet>;
}

//declare enum ChartAnimation
//{
//    linear,
//    easeInQuad,
//    easeOutQuad,
//    easeInOutQuad,
//    easeInCubic,
//    easeOutCubic,
//    easeInOutCubic,
//    easeInQuart,
//    easeOutQuart,
//    easeInOutQuart,
//    easeInQuint,
//    easeOutQuint,
//    easeInOutQuint,
//    easeInSine,
//    easeOutSine,
//    easeInOutSine,
//    easeInExpo,
//    easeOutExpo,
//    easeInOutExpo,
//    easeInCirc,
//    easeOutCirc,
//    easeInOutCirc,
//    easeInElastic,
//    easeOutElastic,
//    easeInOutElastic,
//    easeInBack,
//    easeOutBack,
//    easeInOutBack,
//    easeInBounce,
//    easeOutBounce,
//    easeInOutBounce
//}

export interface IChartOptions
{
    animation?: boolean;
    animationSteps?: number;
    animationEasing?: string;//ChartAnimation;
    onAnimationComplete?: () => void;
}

export interface IChartScaleOptions extends IChartOptions
{
    scaleOverlay?: boolean;
    scaleOverride?: boolean;
    scaleSteps?: number;
    scaleStepWidth?: number;
    scaleStartValue?: number;
    scaleShowLine?: boolean;
    scaleLineColor?: string;
    scaleLineWidth?: number;
    scaleShowLabels?: boolean;
    scaleLabel?: string;
    scaleFontFamily?: string;
    scaleFontSize?: number;
    scaleFontStyle?: string;
    scaleFontColor?: string;

    scaleShowLabelBackdrop?: boolean;
    scaleBackdropColor?: string;
    scaleBackdropPaddingY?: number;
    scaleBackdropPaddingX?: number;
}

export interface IChartPolarAreaOptions extends IChartScaleOptions
{
    animateRotate?: boolean;
    animateScale?: boolean;
    segmentShowStroke?: boolean;
    segmentStrokeColor?: string;
    segmentStrokeWidth?: number;
}

export interface IChartRadarOptions extends IChartScaleOptions
{
    angleShowLineOut?: boolean;
    angleLineColor?: string;
    angleLineWidth?: number;
    pointLabelFontFamily?: string;
    pointLabelFontStyle?: string;
    pointLabelFontSize?: number;
    pointLabelFontColor?: string;
    pointDot?: boolean;
    pointDotRadius?: number;
    pointDotStrokeWidth?: number;
    datasetStroke?: boolean;
    datasetStrokeWidth?: number;
    datasetFill?: boolean;
}

export interface IChartPieOptions extends IChartOptions
{
    animateRotate?: boolean;
    animateScale?: boolean;
    segmentShowStroke?: boolean;
    segmentStrokeColor?: string;
    segmentStrokeWidth?: number;
}

export interface IChartDoughnutOptions extends IChartOptions
{
    animateRotate?: boolean;
    animateScale?: boolean;
    segmentShowStroke?: boolean;
    segmentStrokeColor?: string;
    segmentStrokeWidth?: number;
    percentageInnerCutout?: number;
}

export interface IChartLineOptions extends IChartScaleOptions
{
    scaleShowGridLines?: boolean;
    scaleGridLineColor?: string;
    scaleGridLineWidth?: number;
    bezierCurve?: boolean;
    pointDot?: boolean;
    pointDotRadius?: number;
    pointDotStrokeWidth?: number;
    datasetStroke?: boolean;
    datasetStrokeWidth?: number;
    datasetFill?: boolean;
}

export interface IChartBarOptions extends IChartScaleOptions
{
    scaleShowGridLines?: boolean;
    scaleGridLineColor?: string;
    scaleGridLineWidth?: number;
    barShowStroke?: boolean;
    barStrokeWidth?: number;
    barValueSpacing?: number;
    barDatasetSpacing?: number;
}

declare class Chart
{
    constructor(canvas: CanvasRenderingContext2D);

    public PolarArea(data: Array<IChartData>, options?: IChartPolarAreaOptions): void;

    public Radar(data: IChartDataSetInput, options?: IChartRadarOptions): void;

    public Pie(data: Array<IChartData>, options?: IChartPieOptions): void;

    public Doughnut(data: Array<IChartData>, options?: IChartDoughnutOptions): void;

    public Line(data: IChartDataSetInput, options?: IChartLineOptions): void;

    public Bar(data: IChartDataSetInput, options?: IChartBarOptions): void;
}
