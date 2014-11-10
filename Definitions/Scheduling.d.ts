declare module Ccx.Scheduling.Models {
    interface IAppointments {
        subject: string;
        activityid: string;
        scheduledstart: string;
        scheduledend: string;
        name: string;
        regardingobjectid: string;
        isalldayevent: boolean;
        scheduleddurationminutes: string;
        instanceyypecode: string;
        equipmentid: string;
        bordercolorcode: KnockoutObservable<string>;
        color: KnockoutObservable<string>;
        location: string;
        regardingobjectidname: string;
        title: string;
    }
    class Appointment extends AppData.Model {
        public ListResources(callback: (results: any[]) => void): void;
        public GetProviderAppointments(providerId: string, callback: AppData.callback<IAppointments[]>): void;
        public GetProviderAppointmentsByDate(providerId: string, startDate: string, endDate: string, callback: AppData.callback<any[]>): void;
        public ListAppointments(selectedDateTime: Date, callback: (results: any[]) => void): void;
    }
}
declare module Ccx.Scheduling.Models {
    interface IWorkHour {
        RecurrenceId?: string;
        Reason: string;
        Location: string;
        LocationID?: string;
        Date: Date;
        StartTime: any;
        EndTime: any;
        IsTimeOff?: boolean;
        IsBreak?: boolean;
        EquipmentId?: string;
        CalendarId: string;
        ParentCalendarId?: string;
        Pattern?: string;
        ScheduleInfoStartTime?: Date;
        TimezoneCode?: string;
        EffectiveIntervalEnd?: Date;
        IsVaried?: boolean;
        GroupDesignator?: string;
        LinkID?: string;
    }
    interface IEquipments {
        name: string;
        equipmentid?: string;
        ccx_agencylocation?: string;
        ccx_agencylocation_name?: string;
        ccx_provider?: string;
        businessunitid?: string;
        timezonecode?: number;
        ccx_schedulestatus?: boolean;
        calendarid?: string;
    }
    interface ILocations {
        FacilityId: string;
        FacilityName: string;
        Createdon?: string;
        OfficeAddress?: string;
        MainPhone?: string;
        FacilityShortName?: string;
    }
    interface ICalendarRules {
        CalendarId: string;
        CalendarRules: CrmData.ScheduleInfos[];
    }
    interface ICalendarIdMappings {
        CalendarId: string;
        InnerCalendarId: string;
        Pattern: string;
        StartTime: Date;
        TimezoneCode: string;
        EffectiveIntervalEnd?: Date;
        IsVaried?: boolean;
        GroupDesignator?: string;
    }
    class ProviderSchedule extends AppData.Model {
        constructor();
        public UpdateCalendarStatus(EquipmentID: AppData.IUniqueidentifier, callback: AppData.callback<any>): void;
        public GetCalendar(calendarid: string, callback: AppData.callback<any>): void;
        public GetCalenderId(equipmentid: string, callback: AppData.callback<any>): void;
        public GetTimeZone(callback: AppData.callback<AppUI.IListItem[]>): void;
        public GetFacilityEquipmentResourceIds(providerId: string, callback: AppData.callback<IEquipments[]>): void;
        public GetProviderLocations(providerId: string, callback: AppData.callback<any[]>): void;
        public GetFaciliytName(equipmentId: string, callback: AppData.callback<any>): void;
        public GetAllLocations(providerLocations: any[], callback: (results: any[]) => void): void;
        public GetLocations(providerLocations: any[], callback: AppData.callback<any[]>): void;
        public GetProviderInformation(providerId: string, callback: AppData.callback<any>): void;
        public LoadCalendarIdMappings(rulesCollection: any): ICalendarIdMappings[];
        public GetProviderWorkHours(locations: IEquipments[], startDate: Date, endDate: Date, callback: (results: IWorkHour[]) => void): void;
        public GetProviderWorkHourForEdit(locationId: string, locationName: string, startDate: Date, endDate: Date, callback: (results: any[]) => void): void;
        public SaveFacilityEquipment(equipment: IEquipments, callback: AppData.callback<AppData.IUniqueidentifier>): void;
    }
}
declare module Ccx.Scheduling.Models {
    interface IDataServicesProviders {
        Name: string;
        Location: string;
        Id: AppData.IUniqueidentifier;
    }
    class ProviderSearch extends AppData.Model {
        public GetProviders(name: string, callback: AppData.callback<AppUI.IListItem[]>): void;
    }
}
declare module SchedulingApp {
    function InitApplication(): void;
}
declare module Ccx.Scheduling.Models {
    class Settings {
    }
}
declare var XrmServiceToolkit: any;
declare module CrmData {
    interface IQueryMultipleSchedulesResponse {
        TimeInfos: {
            ActivityStatusCode: number;
            CalendarId: string;
            DisplayText: string;
            Effort: number;
            End?: Date;
            IsActivity: boolean;
            SourceId: string;
            SourceTypeCode: number;
            Start?: Date;
            SubCode: SubCode;
            TimeCode: TimeCode;
        }[][];
    }
    interface ScheduleInfos {
        calendarid: string;
        calendarruleid: string;
        innercalendarid: string;
        starttime: Date;
        timezonecode: string;
        pattern: string;
        effectiveintervalend?: Date;
        isvaried?: boolean;
        groupdesignator?: string;
    }
    enum SubCode {
        Unspecified = 0,
        Schedulable = 1,
        Committed = 2,
        Uncommitted = 3,
        Break = 4,
        Holiday = 5,
        Vacation = 6,
        Appointment = 7,
        ResourceStartTime = 8,
        ResourceServiceRestriction = 9,
        ResourceCapacity = 10,
        ServiceRestriction = 11,
        ServiceCost = 12,
    }
    enum TimeCode {
        Available = 0,
        Busy = 1,
        Unavailable = 2,
        Filter = 3,
    }
    class ScheduleData {
        static QueryMultipleSchedulesRequest(resourceIds: string[], startDate: Date, endDate: Date, timeCode: TimeCode, callback: AppData.callback<IQueryMultipleSchedulesResponse>): void;
        static AddWorkHours(startDate: string, startTime: string, endDate: string, endTime: string, breakStartTime: string, breakEndTime: string, equipmentid: string, days: string, timezonecode: number, innercalid: string, typecode: number, isedit: boolean, isdelete: boolean, observe: boolean, selecteddate: string, vbdpattern: string, recsubtype: number, callback: AppData.callback<any>): void;
        static DeleteSchedule(equipmentId: string, innerCalendarId: string, typecode: number, selecteddate: string, recsubtype: number, callback: AppData.callback<any>): void;
        static DeleteSingleDaySchedule(equipmentId: string, startDate: string, innerCalendarId: string, typecode: number, selecteddate: string, recsubtype: number, callback: AppData.callback<any>): void;
        static QueryUserWorkHours(resourceIds: string[], startDate: Date, endDate: Date, callback: AppData.callback<IQueryMultipleSchedulesResponse>): void;
        static GetCalendar(calendarid: string, callback: AppData.callback<any>): void;
    }
    class SoapHelper {
        static soapExecuteRequest<T>(actionName: string, parameters: {
            [key: string]: ICustomActionParameter;
        }, callback: AppData.callback<T>): void;
        static encodeValue(value: any): any;
        static xmlEncode(text: any): any;
        static encodeDate(dateTime: Date): string;
        static padNumber(str: any, len?: number): any;
        static convertValue(val: any): any;
        static getValueType(val: any): string;
    }
    class Common {
        static showMessage(message: string, duration?: number): void;
        static enableHTMLScroll(): void;
        static disableHTMLScroll(): void;
        static ShowBusyIndicator(): void;
        static HideBusyIndicator(): void;
    }
    class SingletonClass {
        private static _instance;
        constructor();
        static setDocumentClickHandler(): void;
    }
}
declare module CrmData {
    enum MonthNames {
        January = 0,
        February = 1,
        March = 2,
        April = 3,
        May = 4,
        June = 5,
        July = 6,
        August = 7,
        September = 8,
        October = 9,
        November = 10,
        December = 11,
    }
    enum WeekDays {
        Sunday = 0,
        Monday = 1,
        Tuesday = 2,
        Wednesday = 3,
        Thursday = 4,
        Friday = 5,
        Saturday = 6,
    }
    class CalendarUtils {
        static colors: {
            'color': string;
            'BorderColor': string;
        }[];
        static GetWeekDays(dateTimeStr?: string): Date[];
        static getMonthName(date: Date): string;
        static daysAreEqual(date1: string, date2: Date): boolean;
        static GetProviderAppointments(providerId: string, startDate: string, endDate: string, callback: any): void;
        static GetTitleForAppointment(app: any): string;
        static ColorMapping(ProviderLocations: KnockoutObservableArray<Ccx.Scheduling.ViewModels.Schedule.IProviderLocation>): void;
        static ColorMappingAppointment(appointments: KnockoutObservableArray<Ccx.Scheduling.Models.IAppointments>, ProviderLocations: Ccx.Scheduling.ViewModels.Schedule.IProviderLocation[]): void;
    }
}
declare module Ccx.Scheduling.ViewModels {
    class AdministrationViewModel {
        public SelectedView: KnockoutObservable<string>;
        public CalendarSubMenuVisibility: KnockoutObservable<boolean>;
        public IsManualSchedulerVisible: KnockoutObservable<boolean>;
        private clicks;
        private timer;
        constructor();
        public SetCalendarSubMenuVisibility(): void;
        public SetSubMenusVisibility(): void;
        public LoadView(viewName: string, targetContainer: any, viewContext?: any): void;
    }
}
declare module Ccx.Scheduling.ViewModels {
    class CalendarAdministrationMyServicesViewModel {
        public ColumnValue: KnockoutObservableArray<AppUI.IListItem>;
        public RowValue: KnockoutObservableArray<AppUI.IListItem>;
        constructor();
        public test3(): void;
    }
}
declare module Ccx.Scheduling.ViewModels {
    class ConfirmationViewModel {
        private OnSave;
        public IsConflict: KnockoutObservable<boolean>;
        public ConflictFacilityName: KnockoutObservable<string>;
        public ConflictSchedule: KnockoutObservable<string>;
        constructor(IsConflict: boolean, conflictFacilityName: string, ConflictSchedule: string, OnSave?: AppData.callback<any>);
        public SaveConflict(): void;
        public CancelConflict(): void;
    }
}
declare var REMOVE_ITEM_DELEGATE_TEMP: (item: Ccx.Scheduling.ViewModels.Provider.WorkHours.ICalendarSchedule) => void;
declare var CALENDAR_RULES_COLLECTION: any[];
declare var NOLOCATIONFOUND: string;
declare var NOCALENDARINFOFOUND: string;
declare var NOWORKHOURFOUND: string;
declare module Ccx.Scheduling.ViewModels.Provider.WorkHours {
    interface ICalendarRow {
        Days: ICalendarDay[];
    }
    interface IProviderLocation {
        LocationName: string;
        PartialLocationName: string;
        Id: string;
        BorderColorCode?: KnockoutObservable<string>;
        Color?: KnockoutObservable<string>;
        IsActive?: boolean;
    }
    interface IScheduleTypeInfo {
        Frequency: CalendarScheduleType;
        Days: string;
        StartTime: Date;
        EffectiveIntervalEnd: string;
        IsVaried: boolean;
        TimeZoneCode: string;
        GroupDesignator?: string;
        ParentCalendarId?: string;
        ProviderID?: string;
    }
    interface ILocation {
        AgencyLocationName: string;
        AgencyLocatoinId: string;
        CreatedOn: string;
        AddressType: string;
        Telephone1: string;
    }
    interface IFacilityEquipment {
        Name: string;
    }
    interface ICalendarDay {
        IsCurrentMonth: boolean;
        Month: number;
        Day: number;
        Date: Date;
    }
    enum LocationColorCode {
        Green = 0,
        Blue = 1,
        Orange = 2,
        Purple = 3,
        Red = 4,
        Yellow = 5,
        Pink = 6,
    }
    interface ICalendarSchedule {
        LinkId?: string;
        Reason: string;
        Location: string;
        LocationID?: string;
        PartialLocation?: string;
        Date: Date;
        IsAllDay?: boolean;
        StartTime: Date;
        EndTime: Date;
        Type: CalendarScheduleType;
        LinkVisible?: boolean;
        BorderColor?: string;
        Color?: string;
        EquipmentId?: string;
        CalendarId: string;
        ScheduleTypeInfo?: IScheduleTypeInfo;
        IsFirstClick: KnockoutObservable<boolean>;
    }
    enum CalendarScheduleType {
        Weekly = 0,
        Daily = 1,
        TimeOff = 2,
        Break = 3,
        Entire = 4,
    }
    interface ICalendarViewModelParameter {
        providerId: string;
        selectedDate?: Date;
        timezonecode?: any;
    }
    class CalendarViewModel {
        public SelectedDate: KnockoutObservable<Date>;
        public WorkHours: KnockoutObservableArray<ICalendarSchedule>;
        public FilterWorkHours: ICalendarSchedule[];
        public CalendarRows: KnockoutComputed<ICalendarRow[]>;
        public SelectedMonth: KnockoutComputed<string>;
        public ProviderLocations: KnockoutObservableArray<IProviderLocation>;
        public LocationRows: KnockoutComputed<any>;
        public colors: any[];
        public SelectAll: KnockoutObservable<boolean>;
        public SelectedItemIds: KnockoutObservableArray<any>;
        public ProviderId: KnockoutObservable<string>;
        public FilteredLocation: KnockoutObservable<any>;
        public TimezoneCode: string;
        private SelectedDateForAddItem;
        public IsWorkhouRefreshed: KnockoutObservable<boolean>;
        private HighlightedItem;
        public SelectedMonthLocations: KnockoutObservableArray<IProviderLocation>;
        constructor(data?: ICalendarViewModelParameter);
        private formatLocationInRows();
        private ParameterDeclaration(data);
        public GetAllLocation(): void;
        private ColorMapping();
        public prevMonth(): void;
        public nextMonth(): void;
        public showPopup(element?: HTMLElement, title?: string): HTMLElement;
        public showRelated(item: ICalendarSchedule): void;
        public hideRelated(item: ICalendarSchedule): void;
        public showDetail(item: ICalendarSchedule): void;
        public removeItem(item: ICalendarSchedule): void;
        public addLocation(date: any): void;
        public addItem(date: Date): void;
        public showSchedule(type: CalendarScheduleType, equipmentID?: string, selectedDayDetails?: ICalendarSchedule, selectedDayDate?: Date): void;
        public showEditOption(data: any, Index: any, scheduleInfoArray?: any): void;
        public selectLocation(arrayOfLocations: any[], callback: AppData.callback<any>): void;
        public selectType(callback: AppData.callback<CalendarScheduleType>): void;
        public selectRecurrence(date: Date, callback: AppData.callback<string>): void;
        public getMonthName(date: Date): string;
        public daysAreEqual(date1: Date, date2: Date): boolean;
        public reload(): void;
        public filter(event: any): void;
        public HighLightSelection(viewdata: any, event: any, data: any, Index: any): void;
        public filterLocation(selected: any): void;
        public getFacilityResourceIds(providerId: string): void;
        public EditWorkHours(schedule: ICalendarSchedule, e: any, Index: any): void;
        private RemoveDefaultWorkhour();
        private updateWorkHours(date, locations);
        public formatTime(datetime: any, military: any): any;
    }
}
declare var NOUSERINFOFOUND: string;
declare var DEFAULTSTART_DATE: string;
declare var DEFAULTEND_DATE: string;
declare var DEFAULT_SCHEDULE_START_TIME: string;
declare var DEFAULT_SCHEDULE_END_TIME: string;
declare module Ccx.Scheduling.ViewModels.Provider.WorkHours {
    interface IProvider {
        ProviderId: string;
        BusinessUnit: string;
        ProviderName: string;
        Timezonecode: number;
    }
    class LocationViewModel {
        private OnLocationAdded;
        private ProviderLocations;
        private providerInformation;
        public AgencyLocations: KnockoutObservableArray<Models.ILocations>;
        public SelectedLocation: KnockoutObservable<any>;
        private ParentContext;
        public IsSelected: KnockoutObservable<boolean>;
        public IsEnable: KnockoutObservable<boolean>;
        private providerModel;
        private TimeZoneCode;
        private IsSaved;
        constructor(providerLocations: string[], providerId: string, timeZoneCode: string, OnLocationAdded?: AppData.callback<any>);
        public LoadData(providerLocations: any): void;
        public SelectRow(location: any): void;
        public GetProviderDetails(providerId: string): void;
        public SavefacilityRecordEquipment(): void;
        public SaveFacilityEquipementRecord(): void;
    }
}
declare var LOCATION_ORIGIN: string;
declare var IMAGE_URL: string;
declare var EDIT_PROFILE_URL: string;
declare module Ccx.Scheduling.ViewModels {
    class ProviderProfileViewModel {
        public SearchLabel: KnockoutObservable<string>;
        public SearchExpression: KnockoutObservable<string>;
        public InFormulary: KnockoutObservable<boolean>;
        private provider;
        private selectedMedication;
        private PrevProviderName;
        public IsSmartSearchEnabled: KnockoutObservable<boolean>;
        public ProviderSearchVisibility: KnockoutObservable<boolean>;
        public ProviderDetailsVisibility: KnockoutObservable<boolean>;
        public ProviderSearchvalue: KnockoutObservable<string>;
        public isProviderSelected: KnockoutObservable<boolean>;
        public IsSearching: KnockoutObservable<boolean>;
        public ProviderName: KnockoutObservable<string>;
        public ProviderFullName: KnockoutObservable<string>;
        public ProviderId: KnockoutObservable<string>;
        public ProviderImageUrl: KnockoutObservable<string>;
        public ProviderProfileUrl: KnockoutObservable<string>;
        public ProviderTitle: KnockoutObservable<string>;
        public TimezoneCode: KnockoutObservable<String>;
        constructor();
        public ProviderSearch(search: string, callback: AppData.callback<AppUI.IListItem[]>): boolean;
        public ShowCalendar(): void;
        public ShowServicesUI(): void;
        private ClearAppointmentView();
        public ShowAppointments(): void;
        private onProviderSelected();
        public SelectItem(item: any, callback?: AppData.callback<AppUI.IListItem[]>): boolean;
        public ViewProviderDetails(profileInfo: any): void;
        private validateResults(list, callback?);
        public BindProviderDetails(providerId: string): void;
        public ShowWeeklyAppointments(): void;
    }
}
declare module Ccx.Scheduling.ViewModels.Schedule {
    class AppointmentFlyoutViewModel {
        public SelectedData: KnockoutObservable<Models.IAppointments>;
        constructor(data: Models.IAppointments);
        public formatTime(datetime: any, military: any): string;
    }
}
declare module Ccx.Scheduling.ViewModels.Schedule {
    enum IAppointmentType {
        Hold = 803080000,
        ClientService = 803080001,
        Group = 803080002,
    }
    interface ICalendarRow {
        Days: ICalendarDay[];
    }
    interface ICalendarDay {
        IsCurrentMonth: boolean;
        Month: number;
        Day: number;
        Date: Date;
    }
    interface ICalendarSchedule {
        LinkId?: string;
        Reason: string;
        Location: string;
        Date: Date;
        IsAllDay?: boolean;
        StartTime: string;
        EndTime: string;
        Type: AppointmentScheduleType;
        LinkVisible?: boolean;
        BorderColor?: string;
        Color?: string;
    }
    enum AppointmentScheduleType {
        AllDay = 0,
        Duraion = 1,
    }
    interface IProviderLocation {
        ScheduledStart: string;
        LocationName: string;
        PartialLocationName: string;
        Id: string;
        BorderColor?: string;
        BorderColorCode?: KnockoutObservable<string>;
        Color?: KnockoutObservable<string>;
        IsActive?: boolean;
    }
    class AppointmentMonthViewModel implements IAppointmentView {
        public SelectedDate: KnockoutObservable<Date>;
        public ViewByFilter: KnockoutObservable<any>;
        public SelectedMonth: KnockoutComputed<string>;
        public WorkHours: KnockoutObservableArray<Models.IAppointments>;
        public CalendarRows: KnockoutComputed<ICalendarRow[]>;
        public allAppointments: KnockoutObservableArray<Models.IAppointments>;
        public ProviderLocations: KnockoutObservableArray<IProviderLocation>;
        public ProviderLocationsMonthFilter: KnockoutObservableArray<IProviderLocation>;
        public ProviderId: KnockoutObservable<string>;
        public FilteredLocation: KnockoutObservable<any>;
        public FilterAppointments: Models.IAppointments[];
        public colors: any[];
        public SelectedMonthLocations: KnockoutObservableArray<IProviderLocation>;
        public HeaderText: KnockoutComputed<string>;
        static _self: AppointmentMonthViewModel;
        constructor(providerId?: AppData.IUniqueidentifier, selectedDate?: Date, selectedDateTime?: Date);
        public GetProviderAppointments(date?: Date): void;
        private EncompassBorder();
        public daysAreEqual(date1: string, date2: Date): boolean;
        public getMonthName(date: Date): string;
        public showRelated(item: ICalendarSchedule): void;
        public OnNextClick(): void;
        public OnPreviousClick(): void;
        public CurrentMonth(): void;
        public OnRefreshClick(): void;
        public hideRelated(item: ICalendarSchedule): void;
        public formatTime(datetime: any, military: any): string;
        public filter(event: any): void;
        public viewBy(): void;
        public OnLocationSelected(selected: any): void;
        public hoverValues(scheduledstart: any, subject: any, name: any): string;
    }
}
declare module Ccx.Scheduling.ViewModels.Schedule {
    interface IAppointmentView {
        OnNextClick(): void;
        OnPreviousClick(): void;
        OnRefreshClick(): void;
        ProviderLocations: KnockoutObservableArray<IProviderLocation>;
        HeaderText: KnockoutComputed<string>;
        OnLocationSelected(location: any): void;
    }
    class AppointmentViewModel {
        public ProviderId: KnockoutObservable<string>;
        public CurrentView: KnockoutObservable<IAppointmentView>;
        public CurrentViewName: string;
        constructor(ProviderId: any);
        public selectedView(viewName: string): void;
        public filter(event: any): void;
        public filterAppointmentByLocation(location: any): void;
    }
}
declare module Ccx.Scheduling.ViewModels.Schedule {
    class Day {
        public dayOfMonth: number;
        public dayOfWeek: string;
        constructor(monthDay: any, weekDay: any);
    }
    class dayHour {
        public hour: string;
        public suffix: string;
        constructor(hr: any, sfx: any);
        public PastHalfHour(): dayHour;
        public IsHalfPastHour(): boolean;
    }
    interface IAppointmentWeeklyViewModelParameter {
        providerId: string;
        selectedDate?: Date;
        timezonecode?: any;
    }
    class Appointment {
        public ProgramUnit: string;
        public Patient: string;
        public StartDateTime: string;
        public Duration: number;
        public Recurrence: string;
        public Subject: string;
    }
    class AppointmentWeeklyViewModel implements IAppointmentView {
        public weekdays: KnockoutObservableArray<Date>;
        public timings: KnockoutObservableArray<dayHour>;
        public weekAppointments: KnockoutObservableArray<Models.IAppointments>;
        private appointmentsCopy;
        public allAppointments: Models.IAppointments[];
        public ProviderLocations: KnockoutObservableArray<IProviderLocation>;
        public HeaderText: KnockoutComputed<string>;
        public hourFormat: string;
        public providerID: string;
        static _self: AppointmentWeeklyViewModel;
        constructor(data: IAppointmentWeeklyViewModelParameter);
        public getWeekAppointments(): void;
        public getAppointments(): void;
        public filterAppointmentByLocation(location: any): void;
        public filter(event: any): void;
        public getDayHours(format: any): dayHour[];
        public onCellClick(): void;
        public OnRefreshClick(): void;
        public isCurrentTimeSlotAppointment(timeslot: dayHour, weekDay: Date, currentApt: Models.IAppointments): boolean;
        public OnPreviousClick(): void;
        public OnNextClick(): void;
        public OnLocationSelected(selected: any): void;
    }
}
declare module Ccx.Scheduling.ViewModels {
    class ScheduleTypeViewModel {
        private OnSave;
        public ScheduleStartedDate: KnockoutObservable<string>;
        public SelectedDate: KnockoutObservable<string>;
        public ScheduleType: KnockoutObservable<string>;
        private ProviderInfo;
        private TimeZoneCode;
        private EquipmentId;
        private ScheduleDetails;
        private ScheduleInfoArray;
        public IsNotStartDateofRecurrence: KnockoutObservable<boolean>;
        constructor(data: any, equipmentID: string, timezonecode: string, scheduleTypeInforArray?: any, OnSave?: AppData.callback<any>);
        public Close(): void;
        public showPopup(element?: HTMLElement, title?: string): HTMLElement;
        public ShowSchedule(): void;
    }
}
declare var DEFAULTSTARTTIME: string;
declare var DEFAULTENDTIME: string;
declare var UNTILDATE_CONFLICT_MESSAGE: string;
declare var DELETE_CALENDAR_CONFIRM: string;
declare var DELETE_SUCCESS: string;
declare var DELETE_FAIL: string;
declare var ADD_SUCCESS: string;
declare var UPDATE_SUCCESS: string;
declare var ADD_UPDATE_FAIL: string;
declare var WORK_RANGE_CONFLICT: string;
declare var NOENDDATE: string;
declare var MAXDATE: string;
declare var MINIMUM_DURATION_ALERT: string;
declare module Ccx.Scheduling.ViewModels {
    interface IWorkHourDetails {
        WorkStartTime: KnockoutObservable<string>;
        WorkEndTime: KnockoutObservable<string>;
        IsBreak: KnockoutObservable<boolean>;
        Index: KnockoutObservable<number>;
        ButtonStatus: KnockoutObservable<boolean>;
    }
    enum IScheduleType {
        RecurringSchedule = 0,
        SingleDaySchedule = 1,
        TimerOff = 2,
        EntireSchedule = 3,
    }
    enum RecurrenceEditType {
        SingleDay = 0,
        SelectedDayForward = 1,
        Entire = 2,
    }
    enum DayIndex {
        SU = 0,
        MO = 1,
        TU = 2,
        WE = 3,
        TH = 4,
        FR = 5,
        SA = 6,
    }
    interface IConflictDetails {
        CStartTime: KnockoutObservable<string>;
        CEndTime: KnockoutObservable<string>;
        CIndex: KnockoutObservable<number>;
    }
    interface IVaryByDayData {
        Day: KnockoutObservable<number>;
        Data: KnockoutObservableArray<IWorkHourDetails>;
    }
    interface IWorkDaysDetails {
        WorkDay: KnockoutObservable<string>;
        IsChecked: KnockoutObservable<boolean>;
        Color: KnockoutObservable<string>;
        vbd_LinkText: KnockoutObservable<string>;
    }
    interface IConflictsSaveData {
        StartDate: string;
        StartTime: string;
        EndDate: string;
        EndTime: string;
        BreakStartTime: string;
        BreakEndTime: string;
        EquipmentId: string;
        WorkDays: string;
        TimeZoneValue: string;
        InnerCalendarID: string;
        ScheduleType: number;
        IsEdit: boolean;
        IsClose: boolean;
        IsDeleteSchedule: boolean;
        IsFirstTime: boolean;
        CloseEvent: any;
    }
    interface IDayWiseInnerCalendarIds {
        Day: string;
        InnerCalendarId: string;
    }
    class WeeklyScheduleViewModel {
        private OnSave;
        public WorkhourType: KnockoutObservable<string>;
        public IsDeleteAvailable: KnockoutObservable<boolean>;
        public EntireSchedule: KnockoutObservable<boolean>;
        public IsDataChanged: KnockoutComputed<boolean>;
        public EnableSaveBtn: KnockoutComputed<boolean>;
        private IsFirstTime;
        public WeeklySchedule: KnockoutObservable<boolean>;
        public WorkHour: KnockoutObservable<boolean>;
        public VaryByDay: KnockoutObservable<boolean>;
        public WorkdaysVBD: KnockoutObservableArray<string>;
        public Workdays: KnockoutObservableArray<AppUI.IListItem>;
        public SelectedWorkDays: KnockoutObservableArray<string>;
        public Business: KnockoutObservableArray<AppUI.IListItem>;
        public Closures: KnockoutObservable<string>;
        public UntilDate: KnockoutObservable<Date>;
        public DateRange: KnockoutObservable<string>;
        public TimeZone: KnockoutObservableArray<AppUI.IListItem>;
        public TimezoneValue: KnockoutObservable<string>;
        public SetWorkHour: KnockoutObservable<boolean>;
        public Total: KnockoutObservable<string>;
        public TimeTypeBreaks: KnockoutObservable<string>;
        public TimeTypeWorking: KnockoutObservable<string>;
        public TimeTypeTotal: KnockoutObservable<string>;
        public Working: KnockoutObservable<string>;
        public Breaks: KnockoutObservable<string>;
        public TimeChoices: KnockoutObservableArray<AppUI.IListItem>;
        public UntilDateString: KnockoutObservable<string>;
        public vbd_SelectedDays: KnockoutObservableArray<string>;
        public isClose: boolean;
        public BusinessClosure: KnockoutObservable<string>;
        public BreakCount: number;
        public IsRemoveItem: boolean;
        public DaysCollection: KnockoutObservableArray<IWorkDaysDetails>;
        public DailySchedule: KnockoutObservable<boolean>;
        public ScheduleRows: KnockoutObservableArray<IWorkHourDetails>;
        public vbd_ScheduleRowsContainer: KnockoutObservableArray<IVaryByDayData>;
        public Conflicts: KnockoutObservableArray<IConflictDetails>;
        public selectedDate: KnockoutObservable<string>;
        public ItemsAdded: boolean;
        public ItemsLoaded: boolean;
        private schedule;
        public vbd_CurIndex: number;
        public ScheduleRowsBackup: KnockoutObservableArray<IWorkHourDetails>;
        public ConflictBackupValue: string;
        public EquipmentId: KnockoutObservable<string>;
        public IsEdit: KnockoutObservable<boolean>;
        public IsEditMode: KnockoutObservable<boolean>;
        public IsVaryDaysChangeOnEdit: KnockoutObservable<boolean>;
        public IsDeleteSchedule: KnockoutObservable<boolean>;
        public LinkText: KnockoutObservable<string>;
        public StartConflictVal: KnockoutObservable<string>;
        public EndConflictVal: KnockoutObservable<string>;
        private EditScheduleDetails;
        private ScheduleInfoArray;
        public FacilityName: KnockoutObservable<string>;
        private RecSubType;
        public vbd_PrevDayColl: number[];
        public vbd_NewDayColl: number[];
        public ConflictFacilityName: string;
        public ConflictSchedule: string;
        public ProviderId: KnockoutObservable<string>;
        public SED_enable: KnockoutObservable<boolean>;
        public VBD_enable: KnockoutObservable<boolean>;
        private User_TimezoneCode;
        constructor(type: IScheduleType, timezonecode?: string, equipmentID?: string, selectedDayWorkHour?: Provider.WorkHours.ICalendarSchedule, selectedDateForAddItem?: Date, scheduleTypeInfoArray?: any, IsSingleDayEditOnRecurring?: boolean, recurrenceEditSubType?: RecurrenceEditType, providerId?: string, OnSave?: AppData.callback<any>);
        public SubscribeObs(): void;
        public SetVBDDays(): void;
        public ScheduleTypeAction(type: any, selectedDayWorkHour: any, subType: any): void;
        private ParameterDeclaration(type, timezonecode?, equipmentID?, selectedDayWorkHour?, selectedDateForAddItem?, scheduleTypeInfoArray?, IsSingleDayEditOnRecurring?, recurrenceEditSubType?, providerId?);
        private BindFacilityName(equipmentId);
        public SetSpinnerOnTop(): void;
        public LoadWorkHoursForVaryByDay(selectedDayWorkHour: any): void;
        public LoadWorkHours(results: any[]): IWorkHourDetails[];
        public LoadWorkHoursForSingleDayEdit(selectedDayWorkHour: Provider.WorkHours.ICalendarSchedule): void;
        public formatTime(datetime: any, military: any): any;
        public showSetWorkHour(index: any): void;
        public BindChoices(): void;
        public CalculateTimeDifference(time1: any, time2: any): number;
        public ComputeDefaultBreak(index: any): void;
        public AddDefaultBreak(index: number, Start: string, End: string): void;
        public EnableDisableButton(index: number): void;
        public CalcuateDayPeriod(value: string): string;
        public CompareTimeNew(time1: any, time2: any): number;
        public ConvertToHour(minute: number, category: string): number;
        public SetTimeTypes(type: string, category: string): void;
        public vbd_Save(): void;
        public ClosePopup(msg: any): void;
        public GetVBDDataforSave(): any;
        public GetPattern(): string;
        public SaveWeeklySchedule(): void;
        public CheckVBDRows(): boolean;
        public SaveVaryByDay(pattern: any): void;
        public IsMSIE(): boolean;
        private GetInnerCalendarIdsForVaryByEdit();
        public SaveSingleDay(): void;
        private ResetWorkHoursTotal();
        public SaveWorkHour(isClose: boolean, event: any): void;
        public ClosePopuponSave(targetElement: any): void;
        public CalculateObservableChanges(type: string, indx: number): void;
        public ValidateRangeNew(type: string, index: number): number;
        public ComputeWorkAndBreakHours(): void;
        public CanAddMoreRows(index: any): boolean;
        public AddItems(index: any): void;
        public AdjustButtonsForIE(): void;
        public SetDefaultValuesforConflict(): void;
        public DeleteItems(index: any): void;
        public onRemoveItem(RowIndex: any): void;
        public onSaveClick(arrayValue: any, day: any, isClose: any, innerCalendarID: any): void;
        public SaveDataToCRM(arrayValue: any, day: any, isClose: any, innerCalendarID: any, endDate: any): void;
        public WorkHoursConflictCheck(startDate: any, startTime: any, endTime: any, enddate: any, ConflictTypeCode: any, pattern: any, typeCode: any, subTypeCode: any, days: any, callback: AppData.callback<any>): void;
        private ConflictCheckWorkHour(startDate, startTime, endTime, enddate, typeCode, pattern, days, callback?);
        private ShowConflict(result, IsSave?);
    }
}
