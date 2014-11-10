
declare module AppData
{
    export var ZERO: any; //used to indicate the indended value is a zero (javascript can mis-interpret this value)

    export class Model
    {
        public DataAccess: IDataAccess;
    }

    export class DataAccessFactory
    {
        static DataAccessType: IDataAccessClass;

        static create(cache?: IDataCache): IDataAccess;
    }

    export interface IPagedDataSource
    {
        (result: (d: IPagedResult) => void, searchString: string, pageIndex: number, pageSize: number, sortColumn: string, sortAscending: boolean): void;
    }

    export interface IPagedResult
    {
        TotalRecords: number;
        Items: any[];
    }

    export interface callback<T>
    {
        (d: T): void;
    }

    export interface promise<T>
    {
        (p: callback<T>): void;
    }

    export interface chain<T>
    {
        then(p: callback<T>): chain<T>;
        error(e: callback<string>): chain<T>;
    }

    export interface func<T, R>
    {
        (data: T): R;
    }

    export interface comparer<T>
    {
        (a: T, b: T): boolean;
    }

    export interface predicate<T>
    {
        (data: T): boolean;
    }

    export interface IEntityChange
    {
        isAdded: boolean;
        isModified: boolean;
        isDeleted: boolean;
    }

    export interface IEntityName extends String
    {
        /* marker interface; will be replaced with constant */
    }

    export interface IAttributeName extends String
    {
        /* marker interface; will be replaced with constant */
    }

    export interface IUniqueidentifier extends String
    {
        /* marker interface; reference values only */
    }

    export interface IEntityReference
    {
        id: string;
        logicalName: string;
        name: string;
    }

    export interface IOptionSetValue<T>
    {
        value: T;
        formattedValue: string;
    }

    export interface IDataCache
    {
        generateKey(...keys: any[]): string;

        clear(prefix?: string): void;

        resetData(key: string): void;

        getData(key: string): any;

        listData(selector?: AppData.predicate<string>): any[];

        storeData(key: string, data: any): void;
    }

    export interface IDeferredOperation<T>
    {
        (promise: (result?: T) => void): void;
    }

    export interface IDeferredExecutionContainer
    {
        execute(operation: IDeferredOperation<any>): void;
        execute<T>(operation: IDeferredOperation<T>, callback?: (results?: T[]) => void, error?: callback<string>): void;
    }

    export interface IDataAccessClass
    {
        new (): IDataAccess;
    }

    export interface IDataAccess extends IDeferredExecutionContainer
    {
        QueryProvider: IQueryProvider;

        single<T>(entityName: IEntityName, entityId: IUniqueidentifier, callback: callback<T>): void;

        create<T>(data: T, entityName: IEntityName, callback: callback<IUniqueidentifier>): void;

        update<T>(data: T, entityName: IEntityName, entityId: IUniqueidentifier, callback: callback<IUniqueidentifier>): void;

        change(entityName: IEntityName, entityId: IUniqueidentifier, stateCode: number, statusCode: number, callback: callback<boolean>): void;

        query(entityName: IEntityName): IQueryExpression;

        optionset<T>(entityName: IEntityName, attributeName: IAttributeName, optionset: any, callback: callback<T[]>): void;

        booleanOptions<T>(entityName: AppData.IEntityName, attributeName: AppData.IAttributeName, isTrueOptionFirst: boolean, callback: callback<T[]>): void;
    }

    export interface IQueryProvider
    {
        execute<T>(query: IQueryExpression, callback: callback<T[]>, pagingContext?: IPagingContext<T>): IPagingContext<T>;
    }

    export interface IQueryExpression
    {
        EntityName: IEntityName;
        PropertyNames: IAttributeName[];
        Constraints: IQueryConstraint[];
        OrExpressions: IQueryExpression[];
        Joins: IJoinExpression[];
        Orders: IQueryOrder[];
        QueryProvider: IQueryProvider;
        PageSize: number;
        RootExpression: IQueryExpression;
        DeferredExecutionContainer: IDeferredExecutionContainer;

        select(...properties: IAttributeName[]): IQueryExpression;
        where(propertyName: IAttributeName, operator: ExpressionOperator, values: any[]): IQueryExpression;
        where(propertyName: IAttributeName, operator: ExpressionOperator, ...values: any[]): IQueryExpression;
        or(build: (orExp: IQueryExpression) => void): IQueryExpression;
        orderBy(propertyName: IAttributeName, sortDescending?: boolean): IQueryExpression;
        outer(entityName: IEntityName, from: IAttributeName, to: IAttributeName): IJoinExpression;
        join(entityName: IEntityName, from: IAttributeName, to: IAttributeName): IJoinExpression;
        execute<T>(callback: callback<T[]>): IPagingContext<T>;
        pageSize(count: number): IQueryExpression;
    }

    export interface IQueryConstraint
    {
        PropertyName: IAttributeName;
        Operator: ExpressionOperator;
        Values: any[];
    }

    export interface IQueryOrder
    {
        PropertyName: IAttributeName;
        SortDescending: boolean;
    }

    export enum ExpressionOperator
    {
        Contains,
        StartsWith,
        Equals,
        NotEquals,
        GreaterThan,
        LessThan,
        In,
        NotIn,
        OnOrBefore,
        OnOrAfter,
        Null,
        NotNull,
        IsOwner
    }

    export interface IJoinExpression extends IQueryExpression
    {
        FromProperty: IAttributeName;
        ToProperty: IAttributeName;
    }

    export interface IPagingContext<T>
    {
        PageNumber: number;
        PageCookie: string;
        HasNextPage: boolean;
        next(callback: callback<T[]>): void;
    }

    export class InMemoryDataCache implements IDataCache
    {
        public generateKey(...keys: any[]): string;

        public clear(prefix?: string): void;

        public resetData(key: string): void;

        public getData(key: string): any;

        public listData(selector?: AppData.predicate<string>): any[];

        public storeData(key: string, data: any): void;
    }

    export class LocalStorageDataCache implements IDataCache
    {
        constructor(storageId: string);

        public generateKey(...keys: any[]): string;

        public clear(prefix?: string): void;

        public resetData(key: string): void;

        public getData(key: string): any;

        public listData(selector?: AppData.predicate<string>): any[];

        public storeData(key: string, data: any): void;
    }

    export class DeferredExecutionContainer implements IDeferredExecutionContainer
    {
        public execute<T>(operation: IDeferredOperation<T>, callback?: (results?: T[]) => void, error?: callback<string>): void;
    }

    export interface IGrouping<T>
    {
        Group: string;
        Items: T[];
    }

    export function processChanges<T>(dataAccess: IDataAccess, changes: T[], entityName: IEntityName, idName: IAttributeName, delState: number, delStatus: number, callback: callback<boolean>, observer?: callback<T>): void;
    export function changeAdded(entity: any): void;
    export function changeModified(entity: any): void;
    export function changeRemoved(entity: any): boolean;
    export function changeIcon(entity: any): string;

    export function invoke<T>(obj: any, method: string, ...args: any[]): T;
    export function observe<T>(vm: any, data: any, propertyName: string): KnockoutObservable<T>;
    export function modifier<T>(data: T, propertyName: string, modifiedPropertyName?: string): KnockoutObservable<T>;
    export function makeObservable<T>(data: T, propertyName: string): KnockoutObservable<T>;
    export function setObservable(data: any, propertyName: string, value: any): void;
    export function select<T, R>(collection: T[], selector: func<T, R>): R[];
    export function where<T>(collection: T[], predicate: predicate<T>): T[];
    export function many<T, R>(collection: T[], selector: func<T, R[]>): R[];
    export function group<T>(collection: T[], propertyName: string, headerSelector?: func<T, string>): IGrouping<T>[]
    export function sort<T>(collection: T[], selector: func<T, any>, descending?: boolean): T[];
    export function distinct<T>(collection: T[], keySelector?: func<T, string>): string[];
    export function min<T>(collection: T[]): T;
    export function max<T>(collection: T[]): T;
    export function parseDate(date: any): Date;
    export function formatDateTime(date: any, military?: boolean): string;
    export function formatDate(date: any): string;
    export function formatTime(date: any, military?: boolean): string;
    export function daysApart(date1: any, date2: any): number;
    export function minutesApart(date1: any, date2: any): number;
    export function formatNumber(num: any, precision?: number): string;
    export function createId(): string;
    export function getHashCode(str: string): number;
}

declare module CrmData
{
    export function GetOptionSetList(entityName: AppData.IEntityName, attributeName: AppData.IAttributeName, callback: AppData.callback<AppUI.IListItem[]>): void;

    export interface ICustomAction
    {
        soapExecuteRequest<T>(actionName: string, parameters: { [key: string]: ICustomActionParameter }, callback: AppData.callback<T>): void;
    }

    export function getCurrentUserId(): string;

    export interface ICustomActionParameter
    {
        type: string;
        logicalName?: string;
        value: any;
    }

    export interface IFetchData
    {
        fetch<T>(xml: string, callback: AppData.callback<T[]>): void;
    }

    export interface IAssignEntity
    {
        assign(entityName: AppData.IEntityName, entityId: AppData.IUniqueidentifier, ownerEntityName: AppData.IEntityName, ownerEntityId: AppData.IUniqueidentifier, callback: AppData.callback<boolean>): void;
    }

    export class CrmDataAccess extends AppData.DeferredExecutionContainer implements AppData.IDataAccess, ICustomAction, IFetchData, IAssignEntity
    {
        QueryProvider: AppData.IQueryProvider;

        single<T>(entityName: AppData.IEntityName, entityId: AppData.IUniqueidentifier, callback: AppData.callback<T>): void;

        create<T>(data: T, entityName: AppData.IEntityName, callback: AppData.callback<AppData.IUniqueidentifier>): void;

        update<T>(data: T, entityName: AppData.IEntityName, entityId: AppData.IUniqueidentifier, callback: AppData.callback<AppData.IUniqueidentifier>): void;

        change(entityName: AppData.IEntityName, entityId: AppData.IUniqueidentifier, stateCode: number, statusCode: number, callback: AppData.callback<boolean>): void;

        query(entityName: AppData.IEntityName): AppData.IQueryExpression;

        fetch<T>(xml: string, callback: AppData.callback<T[]>): void;

        optionset<T>(entityName: AppData.IEntityName, attributeName: AppData.IAttributeName, optionset: any, callback: AppData.callback<T[]>): void;

        booleanOptions<T>(entityName: AppData.IEntityName, attributeName: AppData.IAttributeName, isTrueOptionFirst: boolean, callback: AppData.callback<T[]>): void;

        soapExecuteRequest<T>(actionName: string, parameters: { [key: string]: ICustomActionParameter }, callback: AppData.callback<T>): void;

        assign(entityName: AppData.IEntityName, entityId: AppData.IUniqueidentifier, ownerEntityName: AppData.IEntityName, ownerEntityId: AppData.IUniqueidentifier, callback: AppData.callback<boolean>): void;

        static GetEntityMetadata(entityName: AppData.IEntityName, callback: AppData.callback<any[]>, async?: boolean): void;
    }
}