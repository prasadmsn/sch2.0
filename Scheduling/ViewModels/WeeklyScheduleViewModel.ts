var DEFAULTSTARTTIME = "08:00 AM";
var DEFAULTENDTIME = "05:00 PM";

var UNTILDATE_CONFLICT_MESSAGE = "Until Date cannot be less than Start Date";
var DELETE_CALENDAR_CONFIRM = "Do you want to delete this calendar? You can't undo this action.";
var DELETE_SUCCESS = "Work hours deleted successfully!";
var DELETE_FAIL = "Data delete not successfull";
var ADD_SUCCESS = "Work hours added successfully!";
var UPDATE_SUCCESS = "Work hours updated successfully!";
var ADD_UPDATE_FAIL = "Data save/Update not successfull";
var WORK_RANGE_CONFLICT = "Your entry conflicts with the Work Range.Please correct the entries";
var NOENDDATE = 'No End Date';
var MAXDATE = '12/30/9999';
var MINIMUM_DURATION_ALERT='Minimum schedule duration must be 10 minutes or more';
module Ccx.Scheduling.ViewModels
{
    export interface IWorkHourDetails
    {
        WorkStartTime: KnockoutObservable<string>;
        WorkEndTime: KnockoutObservable<string>;
        IsBreak: KnockoutObservable<boolean>;
        Index: KnockoutObservable<number>;
        ButtonStatus: KnockoutObservable<boolean>;
    }
    export enum IScheduleType
    {
        RecurringSchedule,
        SingleDaySchedule,
        TimerOff,
        EntireSchedule
    }

    export enum RecurrenceEditType
    {
        SingleDay,
        SelectedDayForward,
        Entire
    }

    export enum DayIndex
    {
        SU,
        MO,
        TU,
        WE,
        TH,
        FR,
        SA


    }
    export interface IConflictDetails
    {
        CStartTime: KnockoutObservable<string>;
        CEndTime: KnockoutObservable<string>;
        CIndex: KnockoutObservable<number>;
    }

    export interface IVaryByDayData
    {
        Day: KnockoutObservable<number>;
        Data: KnockoutObservableArray<IWorkHourDetails>;
    }


    export interface IWorkDaysDetails
    {
        WorkDay: KnockoutObservable<string>;
        IsChecked: KnockoutObservable<boolean>;
        Color: KnockoutObservable<string>;
        vbd_LinkText: KnockoutObservable<string>;
    }
    export interface IConflictsSaveData
    {
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

    export interface IDayWiseInnerCalendarIds
    {
        Day: string;
        InnerCalendarId: string;
    }

    export class WeeklyScheduleViewModel
    {
        public WorkhourType: KnockoutObservable<string>;
        public IsDeleteAvailable: KnockoutObservable<boolean>;
        public EntireSchedule: KnockoutObservable<boolean>;
        public IsDataChanged: KnockoutComputed<boolean>;
        public EnableSaveBtn: KnockoutComputed<boolean>;
        private IsFirstTime: KnockoutObservable<boolean>;
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
        /*   Dyanamic Control Variables  */
        public ScheduleRows: KnockoutObservableArray<IWorkHourDetails>;
        public vbd_ScheduleRowsContainer: KnockoutObservableArray<IVaryByDayData>;
        public Conflicts: KnockoutObservableArray<IConflictDetails>;
        public selectedDate: KnockoutObservable<string>;
        public ItemsAdded: boolean;
        public ItemsLoaded: boolean;
        private schedule: Models.ProviderSchedule;
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
        private EditScheduleDetails: Provider.WorkHours.ICalendarSchedule;
        private ScheduleInfoArray: any;
        public FacilityName: KnockoutObservable<string>;
        private RecSubType: RecurrenceEditType;
        public vbd_PrevDayColl: Array<number>;
        public vbd_NewDayColl: Array<number>;
        public ConflictFacilityName: string;
        public ConflictSchedule: string;
        public ProviderId: KnockoutObservable<string>;
        public SED_enable: KnockoutObservable<boolean>;
        public VBD_enable: KnockoutObservable<boolean>;
        private User_TimezoneCode: string;
        constructor(type: IScheduleType, timezonecode?: string, equipmentID?: string, selectedDayWorkHour?: ViewModels.Provider.WorkHours.ICalendarSchedule, selectedDateForAddItem?: Date, scheduleTypeInfoArray?: any, IsSingleDayEditOnRecurring?: boolean, recurrenceEditSubType?: RecurrenceEditType, providerId?: string, private OnSave?: AppData.callback<any>)
        {
            
            $(document).click();
            this.ParameterDeclaration(type, timezonecode, equipmentID, selectedDayWorkHour, selectedDateForAddItem, scheduleTypeInfoArray, IsSingleDayEditOnRecurring, recurrenceEditSubType, providerId);
            this.ScheduleTypeAction(type, selectedDayWorkHour, recurrenceEditSubType);
            this.Workdays = ko.observableArray([
                <AppUI.IListItem>{ Text: 'Sun', Value: 'SU' },
                < AppUI.IListItem > { Text: 'Mon', Value: 'MO' },
                < AppUI.IListItem > { Text: 'Tue', Value: 'TU' },
                < AppUI.IListItem > { Text: 'Wed', Value: 'WE' },
                < AppUI.IListItem > { Text: 'Thu', Value: 'TH' },
                < AppUI.IListItem > { Text: 'Fri', Value: 'FR' },
                < AppUI.IListItem > { Text: 'Sat', Value: 'SA' },
            ]);

            this.WorkdaysVBD = ko.observableArray(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
            this.SetVBDDays();
            this.selectedDate.subscribe(() =>
            {
                if (selectedDayWorkHour)
                {
                    selectedDayWorkHour.Date = new Date(this.selectedDate());
                    this.LoadWorkHoursForSingleDayEdit(selectedDayWorkHour);
                }
            });
            this.Business = ko.observableArray([
                <AppUI.IListItem>{ Text: 'Observe', Value: 'OBS' },
                < AppUI.IListItem > { Text: 'Do not observe', Value: 'DNO' }
            ]);
            this.BindChoices();
            this.BusinessClosure = ko.observable('DNO');
            this.Closures = ko.observable("checked");
            this.schedule.GetTimeZone((list) =>
            {
                this.TimeZone(list);
            });

            this.Total = ko.observable('9');
            this.Working = ko.observable('9');
            this.Breaks = ko.observable('0');
            this.TimeTypeBreaks = ko.observable('minutes');
            this.TimeTypeTotal = ko.observable('hours');
            this.TimeTypeWorking = ko.observable('hours');
            if (!this.IsEditMode() && selectedDateForAddItem)
            {
                this.UntilDate(new Date(this.DateRange()));
                this.UntilDate().setDate(selectedDateForAddItem.getDate() + 1);
                this.UntilDateString = ko.observable(AppData.formatDate(this.UntilDate()));
            }

            if (recurrenceEditSubType) { this.RecSubType = recurrenceEditSubType }
            this.SubscribeObs();

            this.EnableSaveBtn = ko.computed(() =>
            {

                this.ScheduleRows(),
                this.vbd_ScheduleRowsContainer();
                if (this.WeeklySchedule())
                {
                    if (!this.VaryByDay())
                    {
                        if (this.ScheduleRows().length > 0 && this.SelectedWorkDays().length > 0)
                            return true;
                        else
                            return false;
                    }
                    else
                    {
                        if (this.vbd_ScheduleRowsContainer().length > 0)
                            return true;
                        else
                            return false;
                    }
                }
                else
                {
                    return true;
                }
            });
            this.IsDataChanged = ko.computed(() =>
            { 
                return false;
            });
            this.IsDataChanged = ko.computed(() =>
            {
                this.WorkHour(),
                this.VaryByDay(),
                this.DaysCollection(),
                this.ScheduleRows(),
                this.SetWorkHour(),
                this.IsDeleteSchedule(),
                this.SelectedWorkDays(),
                this.BusinessClosure(),
                this.DateRange(),
                this.UntilDateString(),
                this.TimezoneValue(),
                this.selectedDate(),
                this.IsFirstTime(),
                this.Total();

                if (!this.IsFirstTime())
                {
                    return true;
                }
                else //if(!this.IsDataChanged())
                {
                    this.IsFirstTime = ko.observable(false);
                    return false;
                }
            });
            //this.IsDeleteSchedule.subscribe(()=>
            //    { 
            //    );
            if (this.IsMSIE())
            {
                setTimeout(() =>
                {
                    $('.ccx-ui-popup-content').css('max-width', '950px');
                    $('.ccx-ui-popup-content').css('width', '950px');
                }, 200);
            }
          this.AdjustButtonsForIE();
        }

        
        public SubscribeObs()
        {
            this.DateRange.subscribe(() =>
            {
                if (this.DateRange().toString() != '')
                {
                    if (this.UntilDateString().trim() !== MAXDATE)
                    {
                        this.UntilDate().setDate(new Date(this.DateRange().toString()).getDate() + 1);
                        this.UntilDateString(AppData.formatDate(this.UntilDate()));
                    }
                }
            });

            this.UntilDateString.subscribe(() =>
            {
                if (this.UntilDateString().length > 0 && this.UntilDateString().trim() !== MAXDATE)
                {
                    var startDate = new Date(this.DateRange().toString());
                    var untilDate = new Date(this.UntilDateString().toString());
                    if (untilDate < startDate)
                    {
                        CrmData.Common.showMessage(UNTILDATE_CONFLICT_MESSAGE);
                        this.UntilDateString('');
                        
                    }
                } 
            });

            this.VaryByDay.subscribe(() =>
            {
                if (this.VaryByDay())
                {
                    //if(this.IsMSIE()) {
                    //    setTimeout(() => {
                    //        $('.ccx-ui-popup-content').css('max-width', '930px');
                    //        $('.ccx-ui-popup-content').css('width', '930px');
                    //    }, 200);
                    //}
                    this.WorkHour(false);
                    this.SetWorkHour(false);
                    if (this.vbd_ScheduleRowsContainer().length > 0 && !this.IsEditMode())
                        this.vbd_ScheduleRowsContainer.removeAll();
                }
            });

            this.WorkHour.subscribe(() =>
            {
                if (this.WorkHour())
                {
                    if (!this.IsMSIE())
                    //{
                    //    $('.ccx-ui-popup-content').css('max-width', '930px');
                    //    $('.ccx-ui-popup-content').css('width', '930px');
                    //}
                    //else
                    { $('.ccx-ui-popup-content').css('max-width', '800px'); }
                    this.VaryByDay(false);
                    this.SelectedWorkDays(['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']);
                    this.SetWorkHour(false);
                }
            });
            this.WorkhourType.subscribe(() =>
            {
                if (this.WorkhourType().toString() == "1")//Same each day.
                {
                    this.VaryByDay(false);
                    this.WorkHour(true);
                }
                else
                {
                    this.VaryByDay(true);
                    this.WorkHour(false);
                }

            });
           
        }

        public SetVBDDays()
        {
            for (var i = 0; i < 7; i++)
            {
                if (!this.IsEditMode())
                {
                    this.DaysCollection.push(<IWorkDaysDetails>{
                        WorkDay: ko.observable(this.WorkdaysVBD()[i]),
                        IsChecked: ko.observable(true),
                        Color: ko.observable('black'),
                        vbd_LinkText: ko.observable('Set Work Hours')
                    });
                }
                else
                {
                    this.DaysCollection.push(<IWorkDaysDetails>{
                        WorkDay: ko.observable(this.WorkdaysVBD()[i]),
                        IsChecked: ko.observable(false),
                        Color: ko.observable('black'),
                        vbd_LinkText: ko.observable('Set Work Hours')
                    });
                    
                }
            }
        }

        public ScheduleTypeAction(type, selectedDayWorkHour, subType)
        {
            if (type == IScheduleType.SingleDaySchedule)
            {
                if (selectedDayWorkHour) // Edit Single Day Schedule
                {
                    if (selectedDayWorkHour.ScheduleTypeInfo.IsVaried)
                    {
                        this.WorkhourType("2");//vary by day
                        this.VaryByDay(true);
                        this.SED_enable(false);
                    }
                    this.EditScheduleDetails = selectedDayWorkHour;
                    this.LoadWorkHoursForSingleDayEdit(selectedDayWorkHour);
                }
                else // Single Day Schedule Add
                {
                    this.ScheduleRows.push(<IWorkHourDetails>{
                        WorkStartTime: ko.observable(DEFAULTSTARTTIME),
                        WorkEndTime: ko.observable(DEFAULTENDTIME),
                        IsBreak: ko.observable(false),
                        Index: ko.observable(1),
                        ButtonStatus: ko.observable(true)
                    });
                    
                }
                this.AdjustButtonsForIE();
            }
            else if (type == IScheduleType.RecurringSchedule)
            {
                if (subType)
                {
                    switch (subType)
                    {
                        case RecurrenceEditType.SingleDay:
                            this.EditScheduleDetails = selectedDayWorkHour;
                            this.LoadWorkHoursForSingleDayEdit(selectedDayWorkHour);
                            this.IsDeleteAvailable = ko.observable(false);
                            break;
                        case RecurrenceEditType.SelectedDayForward:
                            this.IsDeleteAvailable = ko.observable(false);
                            if (selectedDayWorkHour && selectedDayWorkHour.ScheduleTypeInfo.IsVaried)
                            {
                                this.WorkhourType("2");//vary by day
                                this.VaryByDay(true);
                                //if (this.IsMSIE()) {
                                //    setTimeout(() => {
                                //        $('.ccx-ui-popup-content').css('max-width', '930px');
                                //        $('.ccx-ui-popup-content').css('width', '930px');
                                //    }, 300);
                                //}
                                this.EditScheduleDetails = selectedDayWorkHour;
                                this.WorkHour(false);
                                this.SED_enable(false);
                                this.DateRange(AppData.formatDate(new Date(this.selectedDate())));
                                if (selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd)
                                    this.UntilDateString(AppData.formatDate(selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd));
                                else
                                    this.UntilDateString('12/30/9999');
                                this.LoadWorkHoursForVaryByDay(selectedDayWorkHour);
                            }
                            else if (selectedDayWorkHour && !selectedDayWorkHour.ScheduleTypeInfo.IsVaried)
                            {
                                this.VBD_enable(false);
                                if (type == IScheduleType.RecurringSchedule)
                                {
                                    this.DateRange(AppData.formatDate(new Date(this.selectedDate())));
                                    
                                }
                                else
                                {
                                    this.DateRange(AppData.formatDate(selectedDayWorkHour.ScheduleTypeInfo.StartTime));
                                }
                                if (selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd)
                                    this.UntilDateString(AppData.formatDate(selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd));
                                else
                                    this.UntilDateString('12/30/9999');
                                this.EditScheduleDetails = selectedDayWorkHour;
                                this.LoadWorkHoursForSingleDayEdit(selectedDayWorkHour);
                                var Days = selectedDayWorkHour.ScheduleTypeInfo.Days.split(',');
                                for (var i = 0; i < Days.length; i++)
                                    this.SelectedWorkDays.push(Days[i].toUpperCase());

                            }
                            break;
                        case RecurrenceEditType.Entire:
                            this.IsDeleteAvailable = ko.observable(true);
                            this.DateRange(AppData.formatDate(selectedDayWorkHour.ScheduleTypeInfo.StartTime));
                            if (selectedDayWorkHour && selectedDayWorkHour.ScheduleTypeInfo.IsVaried)
                            {
                                if (selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd)
                                    this.UntilDateString(AppData.formatDate(selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd));
                                else
                                    this.UntilDateString('12/30/9999');

                                this.VaryByDay(true);
                                //if (this.IsMSIE()) {
                                //    setTimeout(() => {
                                //        $('.ccx-ui-popup-content').css('max-width', '930px');
                                //        $('.ccx-ui-popup-content').css('width', '930px');
                                //    }, 300);
                                //}
                                this.WorkhourType("2");//vary by day
                                this.EditScheduleDetails = selectedDayWorkHour;
                                this.WorkHour(false);
                                this.SED_enable(false);
                                this.LoadWorkHoursForVaryByDay(selectedDayWorkHour);
                            }
                            else if (selectedDayWorkHour && !selectedDayWorkHour.ScheduleTypeInfo.IsVaried)
                            {
                                this.VBD_enable(false);
                                if (selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd)
                                    this.UntilDateString(AppData.formatDate(selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd));
                                else
                                    this.UntilDateString('12/30/9999');
                                this.EditScheduleDetails = selectedDayWorkHour;
                                this.LoadWorkHoursForSingleDayEdit(selectedDayWorkHour);
                                var Days = selectedDayWorkHour.ScheduleTypeInfo.Days.split(',');
                                for (var i = 0; i < Days.length; i++)
                                    this.SelectedWorkDays.push(Days[i].toUpperCase());
                            }
                            break;
                    }
                }
            }
        }

        private ParameterDeclaration(type: IScheduleType, timezonecode?: string, equipmentID?: string, selectedDayWorkHour?: ViewModels.Provider.WorkHours.ICalendarSchedule, selectedDateForAddItem?: Date, scheduleTypeInfoArray?: any, IsSingleDayEditOnRecurring?: boolean, recurrenceEditSubType?: RecurrenceEditType, providerId?: string)
        {
            this.User_TimezoneCode = timezonecode || '';
            this.ProviderId = ko.observable(providerId || '');
            this.WorkhourType = ko.observable('1');//By default to Same Each day.
            this.RecSubType = recurrenceEditSubType;
            this.IsFirstTime = ko.observable(true);
            this.isClose = false;
            this.StartConflictVal = ko.observable('');
            this.EndConflictVal = ko.observable('');
            this.TimeZone = ko.observableArray(<AppUI.IListItem[]>[]);
            this.TimezoneValue = ko.observable('');
            this.EquipmentId = ko.observable('');
            this.schedule = new Models.ProviderSchedule();
            this.TimeChoices = ko.observableArray([]);
            this.SetWorkHour = ko.observable(false);
            this.WeeklySchedule = ko.observable((type == IScheduleType.RecurringSchedule || type == IScheduleType.EntireSchedule) ? true : false);
            this.EntireSchedule = ko.observable((type == IScheduleType.EntireSchedule) ? true : false);
            this.DailySchedule = ko.observable((type == IScheduleType.SingleDaySchedule) ? true : false);
            this.selectedDate = (selectedDayWorkHour) ? ko.observable(AppData.formatDate(selectedDayWorkHour.Date)) : ((selectedDateForAddItem) ? ko.observable(AppData.formatDate(selectedDateForAddItem)) : ko.observable(AppData.formatDate(new Date)));
            this.WorkHour = ko.observable(true);
            this.VaryByDay = ko.observable(false);
            this.BreakCount = 1;
            this.IsVaryDaysChangeOnEdit = ko.observable(false);
            this.IsRemoveItem = false;
            this.vbd_CurIndex = 0;
            this.SED_enable = ko.observable(true);
            this.VBD_enable = ko.observable(true);
            this.ItemsAdded = false;
            this.Conflicts = ko.observableArray([]);
            this.ScheduleRows = ko.observableArray([]);
            this.vbd_ScheduleRowsContainer = ko.observableArray([]);
            this.ConflictBackupValue = '';
            this.EquipmentId = ko.observable(equipmentID || '');
            this.IsEdit = ko.observable(false);
            this.IsDeleteSchedule = ko.observable(false);
            this.UntilDateString = ko.observable('');
            this.UntilDate = ko.observable(new Date);
            this.IsEditMode = ko.observable(false);
            this.DateRange = ko.observable(AppData.formatDate(new Date));
            this.vbd_SelectedDays = ko.observableArray([]);
            this.ScheduleInfoArray = (scheduleTypeInfoArray || undefined);
            this.LinkText = ko.observable('Set Work Hours');
            this.vbd_PrevDayColl = [];
            this.vbd_NewDayColl = [];
           
            if (timezonecode)
                this.TimezoneValue = ko.observable(timezonecode);
            else
                this.TimezoneValue = ko.observable('');
            //if (selectedDayWorkHour)
            //{
            //    this.TimezoneValue = ko.observable(selectedDayWorkHour.ScheduleTypeInfo.TimeZoneCode);
            //}

            this.DaysCollection = ko.observableArray([]);
            this.IsEditMode = ko.observable((selectedDayWorkHour) ? true : false);
            this.IsEdit = ko.observable((selectedDayWorkHour && (!IsSingleDayEditOnRecurring)) ? true : false);
            this.IsEdit = ko.observable((recurrenceEditSubType && recurrenceEditSubType == RecurrenceEditType.SelectedDayForward) ? false : this.IsEdit());
            if (!this.IsEditMode())
            {
                this.SelectedWorkDays = ko.observableArray(['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']);
                this.DateRange = ko.observable(AppData.formatDate(selectedDateForAddItem));
            }
            else
            {
                this.SelectedWorkDays = ko.observableArray([]);
                this.DateRange = ko.observable(AppData.formatDate(new Date));
            }

            this.FacilityName = ko.observable('');
            this.BindFacilityName(this.EquipmentId());
            this.IsDeleteAvailable = ko.observable((this.IsEditMode() && !IsSingleDayEditOnRecurring) ? true : false);
        }



        private BindFacilityName(equipmentId: string)
        {
            var Model = new Models.ProviderSchedule();
            Model.GetFaciliytName(equipmentId, (item) =>
            {
                this.FacilityName(item['ccx_agencylocation_name']);
            });
        }

        public SetSpinnerOnTop() {
            setTimeout(() => {
                $('.w2ui-lock').css('z-index', 1000000);
                $('.w2ui-lock-msg').css('z-index', 1000001);
            }, 200);
        }

        public LoadWorkHoursForVaryByDay(selectedDayWorkHour)
        {
            var doneLoading = AppUI.loading('Loading...', 10, $('.ccx-ui-popup')[0]);
            this.SetSpinnerOnTop();
            this.vbd_ScheduleRowsContainer([]);
            //$('.ccx-ui-popup-content').css('max-width', '930px');
            //$('.ccx-ui-popup-content').css('width', '930px');
            $('.ccx-ui-popup-content').css('display', 'block');
            var startDate = selectedDayWorkHour.ScheduleTypeInfo.StartTime;//selectedDayWorkHour.Date;
            var endDate = startDate.toString();
            endDate = new Date(endDate);
            endDate.setDate(endDate.getDate() + 6);

            var DayCollection: Array<number>;
            DayCollection = [];
            $.each(selectedDayWorkHour.ScheduleTypeInfo['Days'].split(','), (i, day) =>
            {
                DayCollection.push(parseInt(DayIndex[day]));
                this.vbd_PrevDayColl.push(parseInt(DayIndex[day]));
            });

            var Model = new Models.ProviderSchedule();
            
                Model.GetProviderWorkHourForEdit(selectedDayWorkHour.EquipmentId, selectedDayWorkHour.Location, startDate, endDate, (workHours) => {
                var workHoursCol: any[];
                workHoursCol = [];
                $.each(DayCollection, (i, d) => {
                    $.each(workHours, (k, w) => {
                        if (w.IsBreak === false && w.Date.getDay() === d) {
                            workHoursCol.push(w);
                        }
                    });
                    //workHoursCol.push(AppData.where(workHours, (w) => { return w.IsBreak === false && w.Date.getDay() === d })[0]);
                });
                
                    $.each(workHoursCol, (i, w) => {
                    var day = w.StartTime.getDay();
                        var WorKHourDetails = this.LoadWorkHours(AppData.where(workHours, (whr) => { return AppData.formatDate(whr.Date) === AppData.formatDate(w.Date) }));
                        var timediff = this.CalculateTimeDifference(WorKHourDetails[0].WorkStartTime().split(':'), WorKHourDetails[0].WorkEndTime().split(':'));
                        if (timediff > 5) {
                            this.DaysCollection()[day].IsChecked(true);
                            var l_text = WorKHourDetails[0].WorkStartTime() + ' - ' + WorKHourDetails[WorKHourDetails.length - 1].WorkEndTime();
                            this.DaysCollection()[day].vbd_LinkText(l_text);
                            this.vbd_ScheduleRowsContainer.push(<IVaryByDayData>{
                                Data: ko.observable(WorKHourDetails),
                                Day: ko.observable(day)
                            });
                        }
                });
                //this.ComputeWorkAndBreakHours();
                    doneLoading();
            });
            
        }

        public LoadWorkHours(results: any[])
        {
            var breakCount = 0;
            var workHoursRowCount = 0;
            var workHourDetails: IWorkHourDetails[];
            workHourDetails = [];
            breakCount = AppData.where(results, (s) => s.IsBreak == true).length;
            if (breakCount > 0)
            {
                workHoursRowCount = (2 * breakCount) + 1;
                var workHourStartTime = this.formatTime(AppData.where(results, (s) => s.IsBreak == false)[0]['StartTime'], false);
                var workHoursEndTime = this.formatTime(AppData.where(results, (s) => s.IsBreak == false)[0]['EndTime'], false);
                var l_text = workHourStartTime + ' - ' + workHoursEndTime;
                this.LinkText(l_text);
                var breaks = AppData.where(results, (s) => s.IsBreak == true);
                breaks = AppData.sort(breaks, (b) => { return b['StartTime'] }, false);

                var j = 0;
                for (var i = 0; i < workHoursRowCount; i++)
                {
                    if (i % 2 == 0)
                    {
                        if (i == 0)
                        {
                            workHourDetails.push(<IWorkHourDetails>{
                                WorkStartTime: ko.observable(workHourStartTime),
                                WorkEndTime: ko.observable(this.formatTime(breaks[0]['StartTime'], false)),
                                IsBreak: ko.observable(false),
                                Index: ko.observable(i),
                                ButtonStatus: ko.observable(true)
                            });
                        }
                        else if (i == (workHoursRowCount - 1))
                        {
                            workHourDetails.push(<IWorkHourDetails>{
                                WorkStartTime: ko.observable(this.formatTime(breaks[breakCount - 1]['EndTime'], false)),
                                WorkEndTime: ko.observable(workHoursEndTime),
                                IsBreak: ko.observable(false),
                                Index: ko.observable(i),
                                ButtonStatus: ko.observable(true)
                            });
                        }
                        else
                        {
                            workHourDetails.push(<IWorkHourDetails>{
                                WorkStartTime: ko.observable(this.formatTime(breaks[j - 1]['EndTime'], false)),
                                WorkEndTime: ko.observable(this.formatTime(breaks[j]['StartTime'], false)),
                                IsBreak: ko.observable(false),
                                Index: ko.observable(i),
                                ButtonStatus: ko.observable(true)
                            });
                        }
                    }
                    else
                    {
                        if (j < breakCount)
                        {
                            workHourDetails.push(<IWorkHourDetails>{
                                WorkStartTime: ko.observable(this.formatTime(breaks[j]['StartTime'], false)),
                                WorkEndTime: ko.observable(this.formatTime(breaks[j]['EndTime'], false)),
                                IsBreak: ko.observable(true),
                                Index: ko.observable(i),
                                ButtonStatus: ko.observable(true)
                            });

                            j++;
                        }
                    }
                    this.EnableDisableButton(i);
                }
            }
            else
            {
                workHourDetails.push(<IWorkHourDetails>{
                    WorkStartTime: ko.observable(this.formatTime(results[0]['StartTime'], false)),
                    WorkEndTime: ko.observable(this.formatTime(results[0]['EndTime'], false)),
                    IsBreak: ko.observable(false),
                    Index: ko.observable(i),
                    ButtonStatus: ko.observable(true)
                });

                var l_text = this.formatTime(results[0]['StartTime'], false) + ' - ' + this.formatTime(results[0]['EndTime'], false);
                this.LinkText(l_text);
            }
            return workHourDetails;
        }
        /*
         * Load Work Hours for EDIT single day Schedule
         */
        public LoadWorkHoursForSingleDayEdit(selectedDayWorkHour: ViewModels.Provider.WorkHours.ICalendarSchedule)
        { 
            var doneLoading = AppUI.loading('Loading...', 10, $('.ccx-ui-popup')[0]);
            this.SetSpinnerOnTop();
            this.ItemsLoaded = true;
            this.ScheduleRows.removeAll();
            var Model = new Models.ProviderSchedule();

            var stDate: Date;
            stDate = null;
            stDate = selectedDayWorkHour.Date;
            try
            {
                Model.GetProviderWorkHourForEdit(selectedDayWorkHour.EquipmentId, selectedDayWorkHour.Location, stDate, stDate, (results) =>
                {
                    if (results.length > 0)
                    {
                        this.ScheduleRows(this.LoadWorkHours(results));
                        this.ComputeWorkAndBreakHours();
                        this.SetDefaultValuesforConflict();
                        
                    }
                    else
                    {
                        this.ScheduleRows([]);
                        this.ScheduleRows.push(<IWorkHourDetails>{
                            WorkStartTime: ko.observable(DEFAULTSTARTTIME),
                            WorkEndTime: ko.observable(DEFAULTENDTIME),
                            IsBreak: ko.observable(false),
                            Index: ko.observable(1),
                            ButtonStatus: ko.observable(true)
                        });
                        this.ComputeWorkAndBreakHours();
                    }
                    this.AdjustButtonsForIE();
                    this.IsFirstTime = ko.observable(true);
                    doneLoading();
                });
            
            }
            catch (ex)
            {
              
            }
        }

        /*
         * Format time as "HH:MM TT"
         */
        public formatTime(datetime, military)
        {
            var jsDate = AppData.parseDate(datetime);
            if (!jsDate)
                return '';
            var h = jsDate.getHours();
            var m = jsDate.getMinutes();
            var s = jsDate.getSeconds();
            var normalTime = '';
            var a = (h >= 12 ? ' PM' : ' AM');
            if (h == 0)
                h = 12;
            if (h > 12)
                h -= 12;
            if (h < 10)
            {
                normalTime = ('0' + h + ':' + (m < 10 ? '0' : '') + m + a);
            }
            else
            {
                normalTime = (h + ':' + (m < 10 ? '0' : '') + m + a);
            }
            if (military)
            {
                var time = $.datepicker['parseTime']('h:mm tt', normalTime);
                var timeString = $.datepicker['formatTime']('HH:mm', time);
                return timeString;
            }
            else
            {
                return normalTime;
            }
        }

        public showSetWorkHour(index)
        {
            if (this.VaryByDay())
            {
                if (!this.IsEditMode())
                {
                    if (this.SetWorkHour() && index == this.vbd_CurIndex)
                    {
                        this.SetWorkHour(false);
                        this.DaysCollection()[index].Color('black');
                    }
                    else
                    {
                        var varybydata = AppData.where(this.vbd_ScheduleRowsContainer(), (r) => { return (r.Day() === index) });
                        if (varybydata.length > 0)
                        {
                            this.ScheduleRows(varybydata[0].Data());
                        }
                        else
                        {
                            this.ScheduleRows([]);
                            this.ScheduleRows.push(<IWorkHourDetails>{
                                WorkStartTime: ko.observable(DEFAULTSTARTTIME),
                                WorkEndTime: ko.observable(DEFAULTENDTIME),
                                IsBreak: ko.observable(false),
                                Index: ko.observable(1),
                                ButtonStatus: ko.observable(true)
                            });
                            this.SetDefaultValuesforConflict();

                        }
                        this.DaysCollection()[this.vbd_CurIndex].Color('black');
                        this.vbd_CurIndex = index;
                        this.SetWorkHour(true);
                        this.DaysCollection()[index].Color('blue');
                        this.ComputeWorkAndBreakHours();
                    }
                    this.SelectedWorkDays.removeAll();
                    
                    
                }
                else
                {
                    if (this.SetWorkHour() && index == this.vbd_CurIndex) {
                        this.SetWorkHour(false);
                        this.DaysCollection()[index].Color('black');
                    }
                    else {
                        this.SetWorkHour(true);
                        this.DaysCollection()[this.vbd_CurIndex].Color('black');
                        this.vbd_CurIndex = index;
                        this.DaysCollection()[index].Color('blue');
                        var varybydata = AppData.where(this.vbd_ScheduleRowsContainer(), (r) => { return (r.Day() === index) });
                        if (varybydata.length > 0) {
                            this.ScheduleRows(varybydata[0].Data());
                            window.setTimeout(this.ComputeWorkAndBreakHours(), 200);
                        }
                        else {
                            this.ScheduleRows([]);
                            this.ScheduleRows.push(<IWorkHourDetails>{
                                WorkStartTime: ko.observable(DEFAULTSTARTTIME),
                                WorkEndTime: ko.observable(DEFAULTENDTIME),
                                IsBreak: ko.observable(false),
                                Index: ko.observable(1),
                                ButtonStatus: ko.observable(true)
                            });
                        
                            this.SetDefaultValuesforConflict();

                        }
                    }
                }
                
            }
            else
            {
                if (this.IsEditMode())
                {
                    this.SetWorkHour(true);
                }
                else
                {
                    if (this.SetWorkHour())
                    {
                        this.SetWorkHour(false);
                    }
                    else
                    {
                        this.ScheduleRows.removeAll();
                        this.ScheduleRows.push(<IWorkHourDetails>{
                            WorkStartTime: ko.observable(DEFAULTSTARTTIME),
                            WorkEndTime: ko.observable(DEFAULTENDTIME),
                            IsBreak: ko.observable(false),
                            Index: ko.observable(1),
                            ButtonStatus: ko.observable(true)
                        });
                        
                        this.SetDefaultValuesforConflict();
                        this.SetWorkHour(true);
                    }
                }
            }
            this.AdjustButtonsForIE();
        }

        public BindChoices()
        {
            for (var i = 0; i < 24; i++)
            {
                var hr = i > 12 ? i - 12 : i;
                if (i == 0) hr = 12;
                var disphr = hr.toString().length == 1 ? '0' + hr.toString() : hr.toString();
                for (var j = 0; j < 60; j = j + 5)
                {
                    var min = j;
                    var dispmin = j.toString().length == 1 ? '0' + j.toString() : j.toString();
                    var period = i < 12 ? ' AM' : ' PM';
                    var result = disphr + ':' + dispmin + period;
                    this.TimeChoices.push(<AppUI.IListItem> { Text: result, Value: result });
                }
            }
        }
        //Calculate diff between two times in minutes
        public CalculateTimeDifference(time1: any, time2: any): number
        {
            var stHr = time1[1].indexOf('PM') > 0 && parseInt(time1[0]) != 12 ? parseInt(time1[0]) + 12 : parseInt(time1[0]);
            var etHr = time2[1].indexOf('PM') > 0 && parseInt(time2[0]) != 12 ? parseInt(time2[0]) + 12 : parseInt(time2[0]);
            if (stHr == 12 && time1[1].indexOf('AM') > 0)
                stHr = 0;
            if (etHr == 12 && time2[1].indexOf('AM') > 0)
                etHr = 0;
            var date = 0;

            var startDate = new Date(0, 0, date, stHr, time1[1].substring(0, 2), 0);
            if (time1[1].indexOf('PM') > 0 && time2[1].indexOf('AM') > 0)
                date = 1;
            var endDate = new Date(0, 0, date, etHr, time2[1].substring(0, 2), 0);
            var diff = Math.abs(endDate.getTime() - startDate.getTime());
            var hours = Math.floor(diff / 1000 / 60 / 60);
            diff = diff - hours * 1000 * 60 * 60;
            var minutes = Math.floor(diff / 1000 / 60);
            return minutes + hours * 60;
        }

        public ComputeDefaultBreak(index)
        {
            if (!this.ScheduleRows()[index])
                return;
            var strtTime = this.ScheduleRows()[index].WorkStartTime().split(':');
            var endTime = this.ScheduleRows()[index].WorkEndTime().split(':');

            //calcualtion wether work gap is more than 2.91 hours
            var diff = this.CalculateTimeDifference(strtTime, endTime);
            var brkMin = diff > 175 ? 30 : 5;

            var stHr = strtTime[1].indexOf('PM') > 0 && parseInt(strtTime[0]) != 12 ? parseInt(strtTime[0]) + 12 : parseInt(strtTime[0]);
            var etHr = endTime[1].indexOf('PM') > 0 && parseInt(endTime[0]) != 12 ? parseInt(endTime[0]) + 12 : parseInt(endTime[0]);
            if (stHr == 12 && strtTime[1].indexOf('AM') > 0)
                stHr = 0;
            if (etHr == 12 && endTime[1].indexOf('AM') > 0)
                etHr = 0;
            var stMin = parseInt(strtTime[1].substr(0, 2).toString());
            var diff2 = Math.floor(diff / 2);
            var newstHr1 = stHr + Math.floor(diff2 / 60);
            if (newstHr1 >= 24 && strtTime[1].indexOf('PM') > 0)
                newstHr1 = newstHr1 - 24;
            var newstMin1 = stMin + (diff2 % 60);
            if (newstMin1 >= 60)
            {
                newstHr1 = newstHr1 + 1;
                newstMin1 = newstMin1 - 60;
            }
            var newstHr = newstHr1;

            var stAMPM = newstHr < 12 ? ' AM' : ' PM';
            var newstMin = newstMin1.toString();
            var newdispstHr = newstHr <= 12 ? (newstHr == 0 ? '12' : newstHr.toString()) : (newstHr - 12).toString();
            newstMin = parseInt(newstMin) % 5 == 0 ? newstMin : (parseInt(newstMin) - (parseInt(newstMin) % 5)).toString();

            var newetHr = (newstMin1 + brkMin) >= 60 ? newstHr1 + 1 : newstHr1;
            var etAMPM = newetHr < 12 ? ' AM' : ' PM';
            var newdispetHr = newetHr <= 12 ? (newetHr == 0 ? '12' : newetHr.toString()) : (newetHr - 12).toString();
            var newetMin = (newstMin1 + brkMin) >= 60 ? (brkMin + newstMin1 - 60).toString() : (newstMin1 + brkMin).toString();
            newetMin = parseInt(newetMin) % 5 == 0 ? newetMin : (parseInt(newetMin) - (parseInt(newetMin) % 5)).toString();

            newdispstHr = newdispstHr.length == 1 ? '0' + newdispstHr : newdispstHr;
            newdispetHr = newdispetHr.length == 1 ? '0' + newdispetHr : newdispetHr;
            newstMin = newstMin.length == 1 ? '0' + newstMin : newstMin;
            newetMin = newetMin.length == 1 ? '0' + newetMin : newetMin;

            var newdispStTime = newdispstHr.toString() + ':' + newstMin.toString() + stAMPM;
            var newdispEtTime = newdispetHr.toString() + ':' + newetMin.toString() + etAMPM;
            this.AddDefaultBreak(index, newdispStTime, newdispEtTime);
        }

        public AddDefaultBreak(index: number, Start: string, End: string)
        {
            this.ScheduleRows()[index + 1].WorkStartTime(Start);
            this.ScheduleRows()[index + 1].WorkEndTime(End);

            this.ScheduleRows()[index + 2].WorkEndTime(this.ScheduleRows()[index].WorkEndTime());
            this.ScheduleRows()[index].WorkEndTime(this.ScheduleRows()[index + 1].WorkStartTime());
            this.ScheduleRows()[index + 2].WorkStartTime(this.ScheduleRows()[index + 1].WorkEndTime());

            this.EnableDisableButton(index + 2);
            this.EnableDisableButton(index);
        }

        public EnableDisableButton(index: number)
        {
            setTimeout(() =>
            {
                if (this.ScheduleRows()[index] && this.ScheduleRows()[index].WorkStartTime() && this.ScheduleRows()[index].WorkEndTime())
                {
                    var diff = this.CalculateTimeDifference(this.ScheduleRows()[index].WorkStartTime().split(':'), this.ScheduleRows()[index].WorkEndTime().split(':'));
                    if (diff < 15 && !this.ScheduleRows()[index].IsBreak())
                        this.ScheduleRows()[index].ButtonStatus(false);
                    else
                        this.ScheduleRows()[index].ButtonStatus(true);
                }
            }, 300);
        }

        public CalcuateDayPeriod(value: string): string
        {
            if (value.indexOf('AM') > 0)
                return 'AM';
            else
                return 'PM';
        }

        public CompareTimeNew(time1: any, time2: any): number
        {
            var stHr = time1[1].indexOf('PM') > 0 && parseInt(time1[0]) != 12 ? parseInt(time1[0]) + 12 : parseInt(time1[0]);
            var etHr = time2[1].indexOf('PM') > 0 && parseInt(time2[0]) != 12 ? parseInt(time2[0]) + 12 : parseInt(time2[0]);
            if (stHr == 12 && time1[1].indexOf('AM') > 0)
                stHr = 0;
            if (etHr == 12 && time2[1].indexOf('AM') > 0)
                etHr = 0;
            var startDate = new Date(0, 0, 0, stHr, time1[1].substring(0, 2), 0);
            var endDate = new Date(0, 0, 0, etHr, time2[1].substring(0, 2), 0);
            var diff = endDate.getTime() - startDate.getTime();
            return diff;
        }

        public ConvertToHour(minute: number, category: string): number
        {
            if (minute >= 60)
            {
                this.SetTimeTypes('hours', category);
                return minute / 60;
            }
            else
            {
                this.SetTimeTypes('minutes', category);
                return minute;
            }
        }

        public SetTimeTypes(type: string, category: string)
        {
            if (category == 'Working')
                this.TimeTypeWorking(type);
            else if (category == 'Total')
                this.TimeTypeTotal(type);
            else if (category == 'Breaks')
                this.TimeTypeBreaks(type);
        }

        public vbd_Save()
        {
            //var temp = new Array();
            var temp: IWorkHourDetails[];
            temp = [];
            temp = AppData.select(this.ScheduleRows(), (s) =>
            {
                return s;
            });
            var varybydata = AppData.where(this.vbd_ScheduleRowsContainer(), (r) => { return (r.Day() === this.vbd_CurIndex) });
            if (varybydata.length > 0)
                this.vbd_ScheduleRowsContainer.remove(varybydata[0]);
            this.vbd_ScheduleRowsContainer.push(<IVaryByDayData>{
                Day: ko.observable(this.vbd_CurIndex),
                Data: ko.observableArray(temp)
            });
            this.vbd_SelectedDays.push(this.WorkdaysVBD()[this.vbd_CurIndex].substring(0, 1));
            var l_text = temp[0].WorkStartTime() + ' - ' + temp[temp.length - 1].WorkEndTime();
            this.DaysCollection()[this.vbd_CurIndex].vbd_LinkText(l_text);

            this.SetWorkHour(false);
            this.ScheduleRows([]);
            this.DaysCollection()[this.vbd_CurIndex].Color('black');
        }
        public ClosePopup(msg)
        {
            this.IsFirstTime = ko.observable(true);
            if (this.isClose)
            {
                this.ClosePopuponSave(event);
                this.ScheduleRows.removeAll();
            }
            var self = this;
            CrmData.Common.showMessage(msg);
            CrmData.Common.disableHTMLScroll();// since save doesn't close popup but showmessage() enables scroll.
            window.setTimeout(self.OnSave(true), 1000);//to reload the calendar
        }

        public GetVBDDataforSave(): any
        {
            this.vbd_NewDayColl = [];
            if (this.IsEditMode())
            {
                var CalId = this.GetInnerCalendarIdsForVaryByEdit();
            }
            var pattern = '';
            var CalendarIdString = '';
            for (var i = 0; i < this.DaysCollection().length; i++) {
                if(this.DaysCollection()[i].IsChecked()) {
                    this.vbd_NewDayColl.push(DayIndex[this.DaysCollection()[i].WorkDay().substring(0, 2).toUpperCase()]);
                }
            }
            var length = this.vbd_ScheduleRowsContainer().length;
            for (var i = 0; i < length; i++)
            {
                //this.vbd_NewDayColl.push(this.vbd_ScheduleRowsContainer()[i].Day());
                if (this.IsEditMode())
                {
                    var CalData = AppData.where(CalId, (s) => { return s.Day === this.Workdays()[this.vbd_ScheduleRowsContainer()[i].Day()].Value })[0];
                    if (CalData) {
                    CalendarIdString += CalData.InnerCalendarId;
                        CalendarIdString += ',';
                }
                }
            }
            if (CalendarIdString.length > 0)
                CalendarIdString = CalendarIdString.substring(0, CalendarIdString.length - 1);
            var IsDaysChanged = this.CheckVBDRows();
            if (IsDaysChanged && this.IsEditMode() && this.RecSubType === RecurrenceEditType.Entire) {
                var startDate = (this.RecSubType && this.RecSubType === RecurrenceEditType.Entire) ? $.datepicker.formatDate('yy-mm-dd', this.EditScheduleDetails.ScheduleTypeInfo.StartTime) : ((this.RecSubType && this.RecSubType === RecurrenceEditType.SelectedDayForward) ? $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate())) : $.datepicker.formatDate('yy-mm-dd', new Date(this.DateRange())));
                var endDate = "9999-12-30T23:59:59Z";
                CrmData.ScheduleData.AddWorkHours(startDate, "12:00 AM", endDate, "12:00 AM", "12:00 AM", "12:00 AM", this.EquipmentId(), '', parseInt(this.User_TimezoneCode), CalendarIdString, 3, false, true, false, $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate())) + "T00:00:00Z", '', -1, (result) =>
                {
                    if (result && result.issuccess) {
                        pattern = this.GetPattern();
                        this.IsVaryDaysChangeOnEdit(true);
                        this.SaveVaryByDay(pattern);
                    }
                    else {
                    }
                });
                
            }
            else {
                pattern = this.GetPattern();
            if (this.RecSubType === RecurrenceEditType.SelectedDayForward)
                CalendarIdString = '';
                if (this.IsEditMode() && CalendarIdString.length > 0) {
                    this.SaveVaryByDay(pattern + '%%%' + CalendarIdString);
                }
                else
                    this.SaveVaryByDay(pattern);
            }
        }

        public GetPattern() : string {
            var data = '';
            var length = this.vbd_ScheduleRowsContainer().length;
            for (var i = 0; i < length; i++) {
                var rowLength = this.vbd_ScheduleRowsContainer()[i].Data().length;
                data += this.Workdays()[this.vbd_ScheduleRowsContainer()[i].Day()].Value;
                var brkStart = '';
                var brkEnd = '';
                for (var j = 0; j < rowLength; j++) {
                    var row = this.vbd_ScheduleRowsContainer()[i].Data()[j];
                    if (j == 0)
                        data += '#' + row.WorkStartTime();
                    if (j == rowLength - 1)
                        data += '#' + row.WorkEndTime();
                    else {
                        if (row.IsBreak()) {
                            brkStart += row.WorkStartTime();
                            brkEnd += row.WorkEndTime();
                            if (j != rowLength - 2) {
                                brkStart += ',';
                                brkEnd += ',';
                            }
                        }
                    }
                }
                data += '#' + brkStart;
                data += '#' + brkEnd;
                if (i != length - 1) {
                    data += '$';
                }
            }
            return data;
        }

        public SaveWeeklySchedule()
        {
            if (this.VaryByDay())
            {
                this.GetVBDDataforSave();
                    //this.vbd_ScheduleRowsContainer.removeAll();
            }
            else if (!this.VaryByDay())
            {
                if (this.SetWorkHour() || this.RecSubType >= 0)
                {
                    this.onSaveClick(this.ScheduleRows(), this.SelectedWorkDays().toString(), this.isClose, (this.EditScheduleDetails) ? this.EditScheduleDetails.CalendarId : '');
                }
            }
        }

        public CheckVBDRows() {
            this.vbd_NewDayColl.sort();
            this.vbd_PrevDayColl.sort();

            if (this.vbd_NewDayColl.toString() == this.vbd_PrevDayColl.toString()) {
                return false;
            }
            else {
                var days = '';
                for (var i = 0; i < 7; i++) {
                    days += !this.DaysCollection()[i].IsChecked() ? this.DaysCollection()[i].WorkDay() : '';
                    days += ',';
                }
                days = days.substring(0, days.length - 1);

                var DaysColl = days.split(',');
                for (var i = 0; i < DaysColl.length; i++) {
                    var varybydata = AppData.where(this.vbd_ScheduleRowsContainer(), (r) => { return (r.Day() === this.WorkdaysVBD.indexOf(DaysColl[i])) });
                    if (varybydata)
                        this.vbd_ScheduleRowsContainer.remove(varybydata[0]);
                }

                return true;
            }

        }

        public SaveVaryByDay(pattern) {
            var CalIdString = '';
            if (this.IsEditMode()) {
                CalIdString = pattern.split('%%%')[1];
                pattern = pattern.split('%%%')[0];
            }
            var utcStart = "T00:00:00Z";          
            var utcEnd = "T23:59:59Z";
            var startDate = (this.RecSubType && this.RecSubType === RecurrenceEditType.Entire) ? $.datepicker.formatDate('yy-mm-dd', this.EditScheduleDetails.ScheduleTypeInfo.StartTime) : ((this.RecSubType && this.RecSubType === RecurrenceEditType.SelectedDayForward) ? $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate())) : $.datepicker.formatDate('yy-mm-dd', new Date(this.DateRange())));
            var businessClosure = (this.BusinessClosure() !== null && this.BusinessClosure().length > 0) ? (this.BusinessClosure() === "OBS" ? true : false) : false;
            var ConflictStartDate = startDate + "T12:00:00Z";
            startDate = startDate + utcStart;
            var endDate = '';
            var eDate = '';
            var typeCode = (this.RecSubType === RecurrenceEditType.SingleDay && !this.IsDeleteSchedule()) ? 1 : 3;
            if (this.UntilDateString().length > 0) {
                eDate = this.UntilDateString();
            }
            else {
                CrmData.Common.showMessage('End date cannot be empty.Please enter an End date');
                return;
            }
            var subCode = this.RecSubType !== null && this.RecSubType !== undefined ? this.RecSubType : -1;
            eDate = $.datepicker.formatDate('yy-mm-dd', new Date(eDate));
            endDate = eDate + utcEnd;

            this.IsEdit((this.RecSubType == RecurrenceEditType.Entire && !this.IsDeleteSchedule()) ? true : false);
            this.IsEdit(this.IsVaryDaysChangeOnEdit() ? false : this.IsEdit());
            if (this.IsDeleteSchedule()) {
                if (this.RecSubType == RecurrenceEditType.SingleDay) {
                    startDate = $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate()));
                    startDate = startDate + utcStart;
                    subCode = 0;
                }
                else {
                    subCode = this.RecSubType == RecurrenceEditType.SelectedDayForward ? 1 : -1;
                }

                AppUI.confirm(DELETE_CALENDAR_CONFIRM, () => {
                    var doneLoading = AppUI.loading('Deleting schedule...', 10, $('.ccx-ui-popup')[0]);
                    CrmData.ScheduleData.AddWorkHours(startDate, "12:00 AM", endDate, "12:00 AM", "12:00 AM", "12:00 AM", this.EquipmentId(), '', parseInt(this.User_TimezoneCode),CalIdString, typeCode, false, this.IsDeleteSchedule(), false, $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate())) + "T00:00:00Z", '', subCode, (result) => {
                        if (result && result.issuccess) {
                            doneLoading();
                            this.ClosePopup(DELETE_SUCCESS);
                        }
                        else {
                            doneLoading();
                            CrmData.Common.showMessage(DELETE_FAIL);
                        }
                    });
                });

            }
            else {
                var doneLoading = AppUI.loading('Please wait...', 10, $('.ccx-ui-popup')[0]);
                this.WorkHoursConflictCheck(startDate, '12:00 AM', '12:00 AM', endDate, 33, pattern, typeCode, subCode,'', (SaveDate) => {

                    if (SaveDate) {
                        CrmData.ScheduleData.AddWorkHours(startDate, '12:00 AM', endDate, '12:00 AM', '12:00 AM', '12:00 AM', this.EquipmentId(), '', parseInt(this.User_TimezoneCode), CalIdString, typeCode, this.IsEdit(), false, businessClosure, startDate, pattern,subCode, (result) => {
                    if (result && result.issuccess) {
                        doneLoading();
                        (!this.IsEdit()) ? this.ClosePopup(ADD_SUCCESS) : this.ClosePopup(UPDATE_SUCCESS);
                    }
                    else {
                        doneLoading();
                        CrmData.Common.showMessage(ADD_UPDATE_FAIL);
                        CrmData.Common.disableHTMLScroll();
                    }
                });
                    }
                });
            }
        }
        public IsMSIE() {
            if (window.navigator.userAgent.toLowerCase().indexOf("msie") > 0 || window.navigator.userAgent.toLowerCase().indexOf("trident") > 0)
                return true;
            else
                return false;
        }


        private GetInnerCalendarIdsForVaryByEdit()
        {
            var result: IDayWiseInnerCalendarIds[];
            result = [];
            var col: any;
            var ruleCollection = AppData.where(CALENDAR_RULES_COLLECTION, (c) => { return c.CalendarId === this.EditScheduleDetails.ScheduleTypeInfo.ParentCalendarId })[0];
            if (this.EditScheduleDetails.ScheduleTypeInfo['EffectiveIntervalEnd'])
            {
                col = AppData.where(ruleCollection['CalendarRules'].scheduleInfo, (s) => { return (s['isvaried'] && AppData.formatDate(s['starttime']) === AppData.formatDate(this.EditScheduleDetails.ScheduleTypeInfo['StartTime']) && AppData.formatDate(s['effectiveintervalend']) === AppData.formatDate(this.EditScheduleDetails.ScheduleTypeInfo['EffectiveIntervalEnd'])) });
            }
            else
            {
                col = AppData.where(ruleCollection['CalendarRules'].scheduleInfo, (s) => { return (s['isvaried'] && AppData.formatDate(s['starttime']) === AppData.formatDate(this.EditScheduleDetails.ScheduleTypeInfo['StartTime'])) });
            }
            $.each(col, (i, r) =>
            {
                var patternCol = r.pattern.split(';');
                var day = patternCol[2].split('=')[1];
                if (day.length > 2)
                {
                    var days = day.split(',');
                    $.each(days,(j,item) => {
                        result.push(<IDayWiseInnerCalendarIds>{
                            Day: item,
                            InnerCalendarId: r.innercalendarid
                        });
                    });
                }
                else {
                result.push(<IDayWiseInnerCalendarIds>{
                    Day: day,
                    InnerCalendarId: r.innercalendarid
                });
                }
            });

            return result;
        }
        public SaveSingleDay()
        {
            
            this.IsEdit = ko.observable((this.EntireSchedule()) ? true : this.IsEdit());
            var innerCalendarID = (this.EditScheduleDetails && this.IsEditMode()) ? this.EditScheduleDetails.CalendarId : '';
            var typecode = IScheduleType.SingleDaySchedule;
            var startTime = '';
            var endTime = '';
            var breakStartTime = '';
            var breakEndTime = '';
            var days = '';
            var timezonecode = this.TimezoneValue();
            var enddate = '';
            var startDate = (this.RecSubType && this.RecSubType === RecurrenceEditType.SingleDay) ? $.datepicker.formatDate('yy-mm-dd', this.EditScheduleDetails.ScheduleTypeInfo.StartTime) : $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate())); 
            if (this.ScheduleRows().length > 0)
            {
                startTime = this.ScheduleRows()[0].WorkStartTime();
                endTime = this.ScheduleRows()[this.ScheduleRows().length - 1].WorkEndTime();
            }
            var ConflictStartDate = startDate  + "T12:00:00Z";
            enddate = startDate + "T23:59:59Z";
            startDate = startDate + "T00:00:00Z";
            ko.utils.arrayForEach(this.ScheduleRows(), (elem)=>{
                if (elem.IsBreak())
                {
                    breakEndTime = breakEndTime + elem.WorkEndTime() + ',';
                    breakStartTime = breakStartTime + elem.WorkStartTime() + ',';
                }
            });
            breakEndTime = breakEndTime.substring(0, breakEndTime.length - 1);
            breakStartTime = breakStartTime.substring(0, breakStartTime.length - 1);
            if (this.IsDeleteSchedule()) {
                if (this.ScheduleRows().length > 0) {
                    AppUI.confirm(DELETE_CALENDAR_CONFIRM, () => {
                        var doneLoading = AppUI.loading('Deleting schedule...', 10, $('.ccx-ui-popup')[0]);
                        CrmData.ScheduleData.DeleteSingleDaySchedule(this.EquipmentId(), startDate, innerCalendarID, 1, $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate())), 0, (result) => {
                            if (result && result.issuccess) {
                                doneLoading();
                                this.ScheduleRows([]); // Empty Work Hours Grid.
                                this.ResetWorkHoursTotal();// Update work hours computation on delete
                                this.ClosePopup(DELETE_SUCCESS);
                            }
                            else {
                                doneLoading();
                                CrmData.Common.showMessage(DELETE_FAIL);
                            }
                        });
                    });
                }
            }
            else {
                var doneLoading = AppUI.loading('Please wait...', 10, $('.ccx-ui-popup')[0]);
                this.WorkHoursConflictCheck(startDate, startTime, endTime, enddate, 22, '', typecode, 0,'', (SaveDate) => {
                    if (SaveDate) {
                        CrmData.ScheduleData.AddWorkHours(startDate, startTime, enddate, endTime, breakStartTime, breakEndTime, this.EquipmentId(), '', parseInt(this.User_TimezoneCode), innerCalendarID, IScheduleType.SingleDaySchedule, this.IsEdit(), this.IsDeleteSchedule(), false, $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate())), '', 0, (result) => {
                            if (result && result.issuccess) {
                                doneLoading();
                                (!this.IsEdit()) ? this.ClosePopup(ADD_SUCCESS) : this.ClosePopup(UPDATE_SUCCESS);
                            }
                            else {
                                doneLoading();
                                CrmData.Common.showMessage(ADD_UPDATE_FAIL);
                                CrmData.Common.disableHTMLScroll();
                            }
                        });
                    }
                });
            }
        }

        private ResetWorkHoursTotal()
        {
            this.Total(this.ConvertToHour(0, 'Total').toString());
            this.Working(this.ConvertToHour(0, 'Working').toString());
            this.Breaks(this.ConvertToHour(0, 'Breaks').toString());
        }
        public SaveWorkHour(isClose: boolean, event)
        { 
            this.IsFirstTime = ko.observable(true);
            this.isClose = isClose;
            if (this.WeeklySchedule())
            {
                
                    this.SaveWeeklySchedule();
                
            }
            else if (this.DailySchedule())
            {
                if (this.RecSubType === RecurrenceEditType.SingleDay)
                {
                    if (this.IsDeleteSchedule())
                    {
                     
                        this.SaveWeeklySchedule();
                    }
                    else
                    {
                        this.SaveSingleDay();
                    }
                   
                }
                else
                {

                    this.SaveSingleDay();
                }

            }
        }

        public ClosePopuponSave(targetElement)
        {

            $('.ccx-ui-popup-container .ccx-ui-popup-close').click(targetElement);
            $('.ccx-ui-popup-container').fadeOut('fast', () =>
            {
                $('.ccx-ui-popup-container').remove();
                CrmData.Common.enableHTMLScroll();
            });
        }

        public CalculateObservableChanges(type: string, indx: number)
        {

            this.ConflictBackupValue = '';
            if (this.IsRemoveItem || this.ItemsAdded || this.ItemsLoaded)
            {
                this.IsRemoveItem = false;
                this.ItemsAdded = false;
                this.ItemsLoaded = false;
                return;
            }

            switch (type)
            {
                case 'Start':
                    if (indx != 0)
                        this.ConflictBackupValue = this.ScheduleRows()[indx - 1].WorkEndTime();
                    else
                        this.ConflictBackupValue = this.StartConflictVal();
                    if (!this.ValidateRangeNew('Start', indx))
                    {
                        if (this.ScheduleRows()[indx].IsBreak())
                        {
                            this.ScheduleRows()[indx - 1].WorkEndTime(this.ScheduleRows()[indx].WorkStartTime());
                            this.ScheduleRows()[indx + 1].WorkStartTime(this.ScheduleRows()[indx].WorkEndTime());
                        }
                        else
                        {
                            if (this.ScheduleRows()[indx - 1])
                                this.ScheduleRows()[indx - 1].WorkEndTime(this.ScheduleRows()[indx].WorkStartTime());
                        }
                    }
                    break;
                case 'End':
                    if (indx != this.ScheduleRows().length - 1)
                        this.ConflictBackupValue = this.ScheduleRows()[indx + 1].WorkStartTime();
                    else
                        this.ConflictBackupValue = this.EndConflictVal();

                    if (!this.ValidateRangeNew('End', indx))
                    {
                        if (this.ScheduleRows()[indx].IsBreak())
                        {
                            this.ScheduleRows()[indx + 1].WorkStartTime(this.ScheduleRows()[indx].WorkEndTime());
                        }
                        else
                        {
                            if (this.ScheduleRows()[indx + 1])
                                this.ScheduleRows()[indx + 1].WorkStartTime(this.ScheduleRows()[indx].WorkEndTime());
                        }
                    }
                    break;
            }

            this.ComputeWorkAndBreakHours();
            this.EnableDisableButton(indx);
            this.SetDefaultValuesforConflict();
            if (this.VaryByDay() && this.IsEditMode()) {
                var l_text = this.ScheduleRows()[0].WorkStartTime() + ' - ' + this.ScheduleRows()[this.ScheduleRows().length - 1].WorkEndTime();
                this.DaysCollection()[this.vbd_CurIndex].vbd_LinkText(l_text);
            }
        }

        public ValidateRangeNew(type: string, index: number): number
        {
            if (this.ItemsAdded)
            {
                this.ItemsAdded = false;
                return 1;
            }
            var result = false;

            var TimeSelected = type == 'Start' ? this.ScheduleRows()[index].WorkStartTime() : this.ScheduleRows()[index].WorkEndTime();
            if (!TimeSelected)
                return 1;
            var diff = 0;

            
            if (type == 'Start')
            {
                var diffUp = 0;
                if (index != 0)
                    diffUp = this.CompareTimeNew(TimeSelected.split(':'), this.ScheduleRows()[index - 1].WorkStartTime().split(':'));
                var diffRight = this.CompareTimeNew(TimeSelected.split(':'), this.ScheduleRows()[index].WorkEndTime().split(':'));
                if (index != 0)
                    result = diffUp <= -300000 && diffRight >= 300000;
                else
                    result = diffRight >= 300000;
            }
            else
            {
                var diffDown = 0;
                if (index != this.ScheduleRows().length - 1)
                    diffDown = this.CompareTimeNew(TimeSelected.split(':'), this.ScheduleRows()[index + 1].WorkEndTime().split(':'));
                var diffLeft = this.CompareTimeNew(TimeSelected.split(':'), this.ScheduleRows()[index].WorkStartTime().split(':'));
                if (index != this.ScheduleRows().length - 1)
                    result = diffDown >= 300000 && diffLeft <= -300000;
                else
                    result = diffLeft <= -300000;
            }

            var diffResult = false;
            if (!this.ScheduleRows()[index].IsBreak() && this.ScheduleRows()[index].WorkStartTime() && this.ScheduleRows()[index].WorkEndTime()) {
                var start = this.ScheduleRows()[index].WorkStartTime();
                var end = this.ScheduleRows()[index].WorkEndTime();
                var diff = this.CalculateTimeDifference(start.split(':'), end.split(':'));
                diffResult = diff > 5 ? true : false;
            }

            if (result && diffResult)
            {
                return;
            }
            else
            {
                if (type == 'Start')
                    this.ScheduleRows()[index].WorkStartTime(this.ConflictBackupValue);
                else
                    this.ScheduleRows()[index].WorkEndTime(this.ConflictBackupValue);
                if (!result) {
                    CrmData.Common.showMessage(WORK_RANGE_CONFLICT);
                }
                else if (!diffResult && result) {
                    CrmData.Common.showMessage(MINIMUM_DURATION_ALERT);
                }

                $('#w2ui-popup').css('z-index', '1000000');
                
            }
        }

        public ComputeWorkAndBreakHours()
        {
            setTimeout(() =>
            {
                var startTime = this.ScheduleRows()[0].WorkStartTime();
                var endTime = this.ScheduleRows()[this.ScheduleRows().length - 1].WorkEndTime();
                if (!startTime || !endTime)
                    return;
                var TotalTime = this.CalculateTimeDifference(startTime.split(':'), endTime.split(':'));
                var TotalBreakMinutes = 0;
                for (var i = 0; i < this.ScheduleRows().length; i++)
                {
                    if (this.ScheduleRows()[i].IsBreak())
                    {
                        TotalBreakMinutes += this.CalculateTimeDifference(this.ScheduleRows()[i].WorkStartTime().split(':'), this.ScheduleRows()[i].WorkEndTime().split(':'));
                    }
                }

                var TotalWorkHr = TotalTime - TotalBreakMinutes;
                this.Total((this.ConvertToHour(TotalTime, 'Total')).toPrecision(3));
                this.Working((this.ConvertToHour(TotalWorkHr, 'Working')).toPrecision(3));
                if (this.TimeTypeBreaks('minutes'))
                    this.Breaks((this.ConvertToHour(TotalBreakMinutes, 'Breaks')).toPrecision(2));
                else
                    this.Breaks((this.ConvertToHour(TotalBreakMinutes, 'Breaks')).toPrecision(3));
            }, 300);
        }

        public CanAddMoreRows(index)
        {
            if (this.ScheduleRows()[index].WorkStartTime() && this.ScheduleRows()[index].WorkEndTime()) {
                var start = this.ScheduleRows()[index].WorkStartTime();
                var end = this.ScheduleRows()[index].WorkEndTime();
                var diff = this.CalculateTimeDifference(start.split(':'), end.split(':'));
                return diff < 15 ? false : true;
            }
        }
        /* Dynamic Control Adding Method */
        public AddItems(index)
        {
            if (!this.CanAddMoreRows(index))
                return;
            this.ItemsAdded = true;
            this.ScheduleRows.splice(index + 1, 0, <IWorkHourDetails>{
                WorkStartTime: ko.observable(''),
                WorkEndTime: ko.observable(''),
                IsBreak: ko.observable(true),
                Index: ko.observable(index + 1),
                ButtonStatus: ko.observable(true)
            });
            this.ScheduleRows.splice(index + 2, 0, <IWorkHourDetails>{
                WorkStartTime: ko.observable(''),
                WorkEndTime: ko.observable(''),
                IsBreak: ko.observable(false),
                Index: ko.observable(index + 2),
                ButtonStatus: ko.observable(true)
            });
            this.BreakCount = this.BreakCount + 1;

            this.AdjustButtonsForIE();

            this.ComputeDefaultBreak(index);

            this.ComputeWorkAndBreakHours();
            this.SetDefaultValuesforConflict();

        }

        public AdjustButtonsForIE() {
            setTimeout(() => {
                if (this.IsMSIE()) {
                    $(".dummyClsAddSchedule").css({'padding': '3px', 'margin': '1px','line-height': 'normal' });
                }
            }, 0);
        }

        public SetDefaultValuesforConflict()
        {
            if (this.ScheduleRows()[0].WorkStartTime())
                this.StartConflictVal(this.ScheduleRows()[0].WorkStartTime());
            if (this.ScheduleRows()[this.ScheduleRows().length - 1].WorkEndTime())
                this.EndConflictVal(this.ScheduleRows()[this.ScheduleRows().length - 1].WorkEndTime());
        }

        /* Dynamic Control Deletion Method */
        public DeleteItems(index)
        {
            this.IsRemoveItem = true;
            this.BreakCount = this.BreakCount - 1;
            this.onRemoveItem(index);

            this.ScheduleRows.remove(this.ScheduleRows()[index]);
            this.ScheduleRows.remove(this.ScheduleRows()[index]);

            this.ComputeWorkAndBreakHours();
            this.EnableDisableButton(index - 1);
            this.SetDefaultValuesforConflict();
        }

        public onRemoveItem(RowIndex)
        {
            this.ScheduleRows()[RowIndex - 1].WorkEndTime(this.ScheduleRows()[RowIndex + 1].WorkEndTime());
        }

        public onSaveClick(arrayValue, day, isClose, innerCalendarID)
        {
            var endDate = '';
            if (this.UntilDateString().length > 0)
            {
                endDate = this.UntilDateString();
            }
            else
            {
                CrmData.Common.showMessage('End date cannot be empty.Please enter an End date');
                return;
            }
            this.SaveDataToCRM(arrayValue, day, isClose, innerCalendarID, endDate);

        }

        /*
         * Save Method for Same Each Day recurrence
         */
        public SaveDataToCRM(arrayValue, day, isClose, innerCalendarID, endDate)
        {
            var utcStart = "T00:00:00Z";          
            var utcEnd = "T23:59:59Z";
            var startTime = arrayValue[0].WorkStartTime();
            var endTime = arrayValue[arrayValue.length - 1].WorkEndTime();
            var typeCode = 0;
            var workDays = day;
            var startDate = this.DateRange();
            var breakStartTime = "";
            var breakEndTime = "";
            var subTypeCode = (this.RecSubType !== null && this.RecSubType !== undefined && this.RecSubType !== RecurrenceEditType.Entire) ? this.RecSubType : -1;
            var startDate = (this.RecSubType && this.RecSubType ===RecurrenceEditType.Entire) ? $.datepicker.formatDate('yy-mm-dd', this.EditScheduleDetails.ScheduleTypeInfo.StartTime) : ((this.RecSubType && this.RecSubType === RecurrenceEditType.SelectedDayForward) ? $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate())) : $.datepicker.formatDate('yy-mm-dd', new Date(this.DateRange())));
            var ConflictStartDate = startDate + "T12:00:00Z";
            startDate = startDate + utcStart;
            var edate = $.datepicker.formatDate('yy-mm-dd', new Date(endDate));
            endDate = edate + utcEnd;
            for (var index = 1; index < arrayValue.length; index = index + 2) // Concatenating start and end time
            {
                breakStartTime = breakStartTime + "," + arrayValue[index].WorkStartTime();
                breakEndTime = breakEndTime + "," + arrayValue[index].WorkEndTime();
            }
            breakStartTime = breakStartTime.substr(1, breakStartTime.length);
            breakEndTime = breakEndTime.substr(1, breakEndTime.length);
            var isEdit = this.IsEdit();
            var businessClosure = (this.BusinessClosure() !== null && this.BusinessClosure().length > 0)? (this.BusinessClosure() === "OBS" ? true : false ) : false;
            if (this.IsDeleteSchedule()) {
                AppUI.confirm(DELETE_CALENDAR_CONFIRM, () => {
                    var doneLoading = AppUI.loading('Deleting Schedule...', 10, $('.ccx-ui-popup')[0]);
                    CrmData.ScheduleData.AddWorkHours(startDate, startTime, endDate, endTime, breakStartTime, breakEndTime, this.EquipmentId(), workDays, parseInt(this.User_TimezoneCode), innerCalendarID, 0, false, this.IsDeleteSchedule(), false, $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate())) + "T00:00:00Z", '', subTypeCode, (result) => {
                        if (result && result.issuccess) {
                            doneLoading();
                            this.ClosePopup(DELETE_SUCCESS);
                            if (this.VaryByDay()) //Clear work Hours grid.
                            {
                                this.vbd_ScheduleRowsContainer([]);

                            }
                            else {
                                this.ScheduleRows([]);
                                this.ResetWorkHoursTotal();
                            }
                        }
                        else {
                            doneLoading();
                            CrmData.Common.showMessage(ADD_UPDATE_FAIL);
                            CrmData.Common.disableHTMLScroll();
                        }
                    });

                });

            }
            else {
                var doneLoading = AppUI.loading('Please wait...', 10, $('.ccx-ui-popup')[0]);
                if (this.RecSubType === null) {
                    isEdit = false;
                }
                else {
                    isEdit = (this.RecSubType === RecurrenceEditType.Entire) ? true : false;
                }

                this.WorkHoursConflictCheck(startDate, startTime, endTime, endDate, 11, '', typeCode, subTypeCode,workDays, (SaveDate) => {

                    if (SaveDate) {

                        CrmData.ScheduleData.AddWorkHours(startDate, startTime, endDate, endTime, breakStartTime, breakEndTime, this.EquipmentId(), workDays, parseInt(this.User_TimezoneCode), innerCalendarID, 0, isEdit, this.IsDeleteSchedule(), businessClosure, $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate())), '', subTypeCode, (result) => {
                            if (result && result.issuccess) {

                                if (!this.IsEdit()) {
                                    doneLoading();
                                    this.ClosePopup(ADD_SUCCESS);
                                } else {
                                    doneLoading();
                                    this.ClosePopup(UPDATE_SUCCESS);
                                }
                            }
                            else {
                                doneLoading();
                                CrmData.Common.showMessage(ADD_UPDATE_FAIL);
                                CrmData.Common.disableHTMLScroll();
                            }
                        });
                    }
                });
            }
        }

        public WorkHoursConflictCheck(startDate, startTime, endTime, enddate, ConflictTypeCode, pattern, typeCode, subTypeCode, days, callback: AppData.callback<any>) {
            var Day = '';
            var SaveDate = true;
            var CalenderId = '';
            var providerModel = new Models.ProviderSchedule();
            this.ConflictCheckWorkHour(startDate, startTime, endTime, enddate, ConflictTypeCode, pattern,days, (result) => {
                if (result && result.issuccess) {
                    this.ShowConflict(result, (Isave) => {
                        if (Isave) {
                            var d = result.scheduleStartDate;
                            d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
                            var scheduleStartDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
                            CrmData.ScheduleData.AddWorkHours($.datepicker.formatDate('yy-mm-dd', scheduleStartDate) + "T00:00:00Z", startTime, enddate, endTime, '', '', result.ConflictEquipmentId, '', parseInt(this.User_TimezoneCode), result.ConflictCalendarid, result.conflictTypeCode, false, true, false,$.datepicker.formatDate('yy-mm-dd', new Date(startDate)) + "T00:00:00Z", '', subTypeCode, (result) => {
                                if (result && result.issuccess) {
                                    // call save method here.
                                    callback(true);
                                }
                                else
                                {
                                    CrmData.Common.showMessage('Data delete not successfull');
                                }
                            });

                        }
                        else {
                            callback(false);
                        }
                    });
                }
                else {
                    callback(true);
                }       
            });
        }

        private ConflictCheckWorkHour(startDate: string, startTime: string, endTime: string, enddate: string, typeCode: number, pattern: any,days:string, callback?: AppData.callback<any>) {
            
            CrmData.ScheduleData.AddWorkHours(startDate, startTime, enddate, endTime, '', '', this.EquipmentId(), days, parseInt(this.User_TimezoneCode), this.ProviderId(), typeCode, false, false, false, $.datepicker.formatDate('yy-mm-dd', new Date(startDate)), pattern, 4, (result) => {
                if (result && result.isconflict) {
                    callback(result);//calendarid- Timings-location
                }
                else {
                    callback(null)
                }
            });
        }

        private ShowConflict(result: any, IsSave?: AppData.callback<any>) {           

            var d = result.ConflictDate;
            d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
            var conflictDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());           

            var year = (conflictDate).toString().split(' ')[3];
            if (year == "00:00:00")
            {
                year = (conflictDate).toString().split(' ')[5];
            }   
            var Day = (conflictDate).toString().split(' ')[0] + ' ' + (conflictDate).toString().split(' ')[1] + ' ' + (conflictDate).toString().split(' ')[2] + ' ' + year;

            this.ConflictFacilityName = result.locationname;
            var cStartTime = ":00";
            var cEndTime = ":00";
            var conflictStartTime = result.ConflictStartTime;
            var conflictEndTime = result.ConflictEndTime;
            var ScheduleStart = '';

            if (result.conflictTypeCode == 0) {
                ScheduleStart = "Starts from "
            }

            var cStartFirst = ' ';
            var cEndTimeFirst = '';
            if ((conflictStartTime).toString().split(':')[0].length == 1) {
                cStartFirst = "0";
            }
            if ((conflictEndTime).toString().split(':')[0].length == 1) {
                cEndTimeFirst = "0";
            }

            if ((conflictStartTime).toString().split(':')[1] == 0) {
                conflictStartTime = conflictStartTime.toString().split(':')[0] + cStartTime;
            }
            if ((conflictEndTime).toString().split(':')[1] == 0) {
                conflictEndTime = conflictEndTime.toString().split(':')[0] + cEndTime;
            }
            if ((conflictStartTime).toString().split(':')[1] != 0 && (conflictStartTime).toString().split(':')[1].length == 1) {
                conflictStartTime = conflictStartTime.toString().split(':')[0] + ":" + "0" + (conflictStartTime).toString().split(':')[1];
            }
            if ((conflictEndTime).toString().split(':')[1] != 0 && (conflictEndTime).toString().split(':')[1].length  == 1) {
                conflictEndTime = conflictEndTime.toString().split(':')[0] + ":" + "0" + (conflictEndTime).toString().split(':')[1];
            }

            this.ConflictSchedule = ScheduleStart + Day + ": " + cStartFirst + conflictStartTime + " - " + cEndTimeFirst + conflictEndTime;
            var element = AppUI.Popup.show(null, 'Schedule Conflict!');
            CrmData.Common.disableHTMLScroll();
            var viewContext = new Ccx.Scheduling.ViewModels.ConfirmationViewModel(true, this.ConflictFacilityName, this.ConflictSchedule, (onsave) => {
                if (onsave) {
                    IsSave(true);
                }
            });
            App.View.load({
                ViewName: 'Scheduling-ConfirmationView',
                ViewContext: viewContext
            }, element);
            
        }

        
    }
}
