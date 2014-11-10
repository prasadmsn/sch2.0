
declare var AbstractClass: Function; //attribute for marking classes as abstract

declare module App
{
    export function GetDataParameter<T>(): any;

    export class Composition
    {
        static loadViews(path: string): void;
        static addTemplate(template: string): string;
        static loadPage(container: HTMLElement, defaultViewName: string, defaultViewContext?: any): void;
    }

    export class View
    {
        static load(view: AppUI.IView, container?: HTMLElement): void;
        static location(viewName: string, viewContext?: any, viewContextType?: string): void;
    }

    export class Navigation
    {
        static goBack(): void;

        static go(viewName: string, viewContext?: any, reload?: boolean): void;

        static goHome(): void;

        static goTo(url: string, container?: HTMLElement): void;
    }
}

declare module AppUI
{
    export interface ISliderOptions
    {
        MinimumValue: number;
        MaximumValue: number;
        Value: KnockoutObservable<number>;
        OnComplete?: (v: number) => void;
    }

    export interface IView
    {
        ViewName: string;
        ViewContext?: any;
    }

    export interface IViewEngine
    {
        render(view: IView): HTMLElement;
    }

    export interface ITemplate
    {
        render(data: any): HTMLElement;
        destroy(): void;
    }

    export interface IListItem
    {
        Text: string;
        Value: string; 
    }

    export enum FieldType
    {
        text,
        date,
        time,
        integer,
        decimal,
        lookup,
        choice,
        toggle,
        custom
    }

    export function confirm(message: string, yesCallback: () => void, noCallback?: () => void): void;

    export function loading(message?: string, timeoutSeconds?: number, element?: HTMLElement): () => void;

    export function listMap(map: Object): IListItem[];
    export function list<T, R>(collection: T[], textSelector: AppData.func<T, R>, valueSelector?: AppData.func<T, R>): IListItem[];
    export function getListItemText(list: AppUI.IListItem[], itemValue: any): string;
    export function createElementTree(tree: Object, parentNode?: HTMLElement): HTMLElement;
    export function createElement(tag: any, nodes: any): HTMLElement;

    export function cancelEvent(e: any): void;
    export function await<T>(expression: any, callback: AppData.callback<T>): void;
    export function createGlobalCallback(callback: AppData.callback<any>, context?: any): string;
    
    export var colors: {
        magenta: string;
        purple: string;
        teal: string;
        lime: string;
        brown: string;
        pink: string;
        orange: string;
        blue: string;
        red: string;
        gray: string;
        indigo: string;
        seagreen: string;
        brightgreen: string;
        deepblue: string;
        green: string;
        paleblue: string;
        darkbrown: string;
        mutered: string;
        muteorange: string;
        muteyellow: string;
        mutegreen: string;
        mutegray: string;
        muteblue: string;
        mutepurple: string;
        muteindigo: string;
    }

    export var icons: {
        add: string;
        edit: string;
        remove: string;
        warning: string;
        search: string;
        closeLight: string;
        closeDark: string;
    }

    export class Popup
    {
        static showMessage(message: string, duration?: number): void;
        static showDialog(element?: HTMLElement, title?: string): HTMLElement;
        static show(element?: HTMLElement, title?: string): HTMLElement;
        static hideAll(): void;
    }

    export interface IGridDefinition
    {
        Views: IGridDefinitionView[];
        NoResultsMessage?: string;
        NoSelectionMessage?: string;
        SelectedItemsMessage?: string;
        ShowViewSelection?: boolean;
        Buttons?: IGridButton[];
    }

    export interface IGridButton
    {
        Text: string;
        Action: AppData.callback<any>;
    }

    export interface IGridDefinitionView
    {
        Name: string;
        Columns: IGridDefinitionColumn[];
        DataSource: any;
        EnablePaging?: boolean;
        PageSize?: number;
        EnableSearching?: boolean;
        EnableMultiSelect?: boolean;
        EnableRowSelect?: boolean;
        MultiSelectKeyPropertyName?: string;
        ShowSelectionPreview?: boolean;
        DontHideSelectedItems?: boolean;
    }

    export interface IGridDefinitionColumn
    {
        Header: string;
        PropertyName: string;
        ClientTemplate?: string;
        EnableSorting?: boolean;
    }

    export interface IGridLoader
    {
        reload: () => void;
        getSelectedItems: () => any[];
    }

    export class Grid
    {
        static create(): Grid;

        static view(data, enablePaging?: boolean, readOnly?: boolean): GridView;

        public load(element: HTMLElement): IGridLoader;

        public popup(): void;

        public addView(name: string, dataSource: AppData.promise<any[]>): GridView;

        public addPagedView(name: string, dataSource: AppData.IPagedDataSource, pageSize?: number): GridView;

        public addButton<T>(text: string, action: AppData.callback<T>): Grid;
    }

    export class GridView
    {
        public allowMultiSelect(keyPropertyName?: string): GridView;

        public allowMultiSelectWithPreview(keyPropertyName?: string, dontHideSelectedItems?: boolean): GridView;

        public addTemplateColumn(propertyName: string, header: string, enableSorting: boolean, template: GridColumnTemplate): GridView;

        public addCustomColumn(header: string, template: string): GridView;

        public addColumn(propertyName: string, header: string, enableSorting?: boolean): GridView;

        public addListboxColumn(propertyName: string, header: string, ...items: IListItem[]): GridView;

        public allowSearching(): GridView;
    }

    export enum GridColumnTemplate
    {
        Date,
        DateTime,
        Checkbox,
        Textbox,
        DatePicker,
        TimePicker
    }

    export interface IFormField
    {
        Columns?: number;
        Section?: string;
        Layout?: ColumnLayout;
        Label: string;
        PropertyName: string;
        Type: AppUI.FieldType;
        ReadOnly?: boolean;
        Required?: boolean;
        Visible?: boolean;

        /* FieldType.text */
        Format?: string;
        MaxLength?: number;
        Lines?: number;

        /* FieldType.date */
        MinDate?: Date;
        MaxDate?: Date;

        /* FieldType.time */
        MinHour?: number;
        MaxHour?: number;
        Military?: boolean;

        /* FieldType.integer */
        IntegerMin?: number;
        IntegerMax?: number;
        IntegerSlider?: boolean;
        IntegerRange?: boolean;

        /* FieldType.decimal */
        DecimalMin?: number;
        DecimalMax?: number;
        DecimalPrecision?: number;

        /* FieldType.choice */
        Choices?: AppUI.IListItem[];
        ChoiceSelectMultiple?: boolean;

        /* FieldType.custom */
        CustomView?: string;
        CustomViewContext?: any;
    }

    export interface IRuntimeFormField extends IFormField
    {
        Validate?: AppData.predicate<any>;
        RequiredObservable?: KnockoutObservable<boolean>;
        VisibleObservable?: KnockoutObservable<boolean>;
        FormatFunc?: AppData.func<any, string>;
        ChoicesObservable?: KnockoutObservableArray<AppUI.IListItem>;
        ChoiceSelect?: AppData.callback<any>;
    }

    export class Form extends PageLayout
    {
        static create(build: () => IFormField[], data?: AppData.promise<any>): Form;

        constructor(fields: IFormField[], data?: AppData.promise<any>);

        public getData(): any;

        public render(data: any): HTMLElement;
    }

    export enum ColumnLayout
    {
        Single,
        Double,
        Triple
    }

    export interface IPageDefinition
    {
        Title?: string;
        Actions?: IPageAction[];
        Tabs?: IPageAction[];
        Nav?: IPageActionPreview[];
        Steps?: IPageAction[];
        Sidebar?: KnockoutObservable<AppUI.ITemplate>;
        Content?: KnockoutObservable<AppUI.ITemplate>;
    }

    export interface IPageAction
    {
        Title?: string;
        Icon?: string;
        Description?: string;
        View?: string;
        ViewContext?: any;
        Action?: AppData.callback<any>;
    }

    export interface IPageActionPreview extends IPageAction
    {
        Items?: string[];
    }

    export class PageLayout implements ITemplate
    {
        constructor(title?: string, width?: ColumnLayout);

        public render(data: any): HTMLElement;

        public destroy(): void;

        public addColumn(title?: string, width?: ColumnLayout): HTMLElement;
    }

    export interface ITreeDefinition
    {
        Type: TreeViewType;
        Data: AppData.promise<any[]>;
        IdProperty: string;
        ParentIdProperty?: string;
        OnSelected?: AppData.callback<any>;
        OnAdd?: AppData.callback<any>;
        OnRemove?: AppData.callback<any>;
        ItemIcon?: string;
        IconProperty?: string;
        LabelProperty: string;
        DescriptionProperty?: string;
    }

    export enum TreeViewType
    {
        tree,
        table,
        diagram,
        workflow
    }

    export class Tree implements ITemplate
    {
        constructor(definition: ITreeDefinition);

        public add(item: any, parentItem?: any): void;

        public getData(): any[];

        public loadData(): void;

        public render(data: any): HTMLElement;

        public destroy(): void;

        public reload(): void;
    }

    export interface IFlowDefinition
    {
        Steps: IFlowStep[];
        Title?: string;
        InputData?: any;
        OnComplete?: (context: any[]) => void;
    }

    export interface IFlowStep
    {
        Title?: string;
        Icon?: string;
        View: string;
        ViewModelType: IFlowStepInitializer;
    }

    export interface IFlowStepInitializer
    {
        new (): IFlowStepViewModel;
        new (next: (output?: any) => void): Object;
    }

    export interface IFlowStepViewModel
    {
        Title?: KnockoutObservable<string>;
        CanGoBack?: KnockoutObservable<boolean>;
        CanGoNext?: KnockoutObservable<boolean>;
        FlowContext?: any[];
        GoBack?: () => void;
        GoNext?: (output?: any) => void;
    }

    export class Flow
    {
        static create(): Flow;

        public load(element: HTMLElement): void;

        public popup(): void;

        public withTitle(title: string): Flow;

        public withInput(input: any): Flow;

        public addStep(title: string, view: string, viewModelType: IFlowStepInitializer): Flow;

        public addGridStep(): Grid;

        public addFormStep(): Flow;

        public addMenuStep(): Flow;

        public addListStep(): Flow;

        public addTreeStep(): Flow;

        public addRepeatingStep(): Flow;
    }
}

declare class IScroll
{
    constructor(selector: any, options?: {
        mouseWheel?: boolean;
        scrollbars?: boolean;
        startX?: number;
        startY?: number;
        scrollX?: boolean;
        scrollY?: boolean;
    });

    public on(eventName: string, handler: () => void): void;
    public on(eventName: 'scrollEnd', handler: () => void): void;
}