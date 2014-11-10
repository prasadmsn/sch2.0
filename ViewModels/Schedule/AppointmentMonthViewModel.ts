
module Ccx.Scheduling.ViewModels.Schedule
{
    export enum IAppointmentType
    {
        Hold= 803080000,
        ClientService= 803080001,
        Group= 803080002
    }
    export interface ICalendarRow
    {
        Days: ICalendarDay[];
    }
    export interface ICalendarDay
    {
        IsCurrentMonth: boolean;
        Month: number;
        Day: number;
        Date: Date;
    }
    enum MonthNames
    {
        January,
        February,
        March,
        April,
        May,
        June,
        July,
        August,
        September,
        October,
        November,
        December
    }

    export interface ICalendarSchedule
    {
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

    export enum AppointmentScheduleType
    {
        AllDay,
        Duraion
    }

    export interface IProviderLocation
    {
        ScheduledStart: string;
        LocationName: string;
        PartialLocationName: string;
        Id: string;
        BorderColor?: string;
        BorderColorCode?: KnockoutObservable<string>;
        Color?: KnockoutObservable<string>;
        IsActive?: boolean;


    }

    export class AppointmentMonthViewModel implements IAppointmentView
    {

        public SelectedDate: KnockoutObservable<Date>;
        public ViewByFilter: KnockoutObservable<any>;
        public SelectedMonth: KnockoutComputed<string>;
        public WorkHours: KnockoutObservableArray<Ccx.Scheduling.Models.IAppointments>;
        public CalendarRows: KnockoutComputed<ICalendarRow[]>;
        public allAppointments: KnockoutObservableArray<Ccx.Scheduling.Models.IAppointments>;
        public ProviderLocations: KnockoutObservableArray<Ccx.Scheduling.ViewModels.Schedule.IProviderLocation>;
        public ProviderLocationsMonthFilter: KnockoutObservableArray<IProviderLocation>;
        public ProviderId: KnockoutObservable<string>;
        public FilteredLocation: KnockoutObservable<any>;
        public FilterAppointments: Ccx.Scheduling.Models.IAppointments[];
        public colors: Array<any>;
        public SelectedMonthLocations: KnockoutObservableArray<IProviderLocation>;
        public HeaderText: KnockoutComputed<string>;
        public static _self: AppointmentMonthViewModel;
        constructor(providerId?: AppData.IUniqueidentifier, selectedDate?: Date, selectedDateTime?: Date)
        {
            AppointmentMonthViewModel._self = this;
            this.ProviderId = ko.observable(providerId.toString());
            this.FilteredLocation = ko.observable('');
            this.allAppointments = ko.observableArray([]);
            this.ProviderLocations = ko.observableArray([]);
            this.FilterAppointments = [];
            this.WorkHours = ko.observableArray(<Ccx.Scheduling.Models.IAppointments[]>[]);
            this.ProviderLocationsMonthFilter = ko.observableArray(<IProviderLocation[]>[]);
            this.ProviderLocations = ko.observableArray(<IProviderLocation[]>[]);
            this.SelectedDate = ko.observable(selectedDate || new Date());
            this.SelectedMonth = ko.computed(() => {return this.getMonthName(this.SelectedDate()) });
            this.HeaderText = ko.computed(() =>
            {
                return this.SelectedMonth() + ' ,' + this.SelectedDate().getFullYear();

            });
            this.CalendarRows = ko.computed(() =>
            {
                var selectedDate = this.SelectedDate();
                var thisMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                var startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), -(thisMonth.getDay() - 1));
                var days: ICalendarDay[] = [];
                for (var d = 0; d <= 42; d++)
                {
                    var date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + d);
                    days.push({
                        IsCurrentMonth: date.getMonth() == selectedDate.getMonth(),
                        Month: date.getMonth() + 1,
                        Day: date.getDate(),
                        Date: date
                    });
                }
                var rows: ICalendarRow[] = [];
                for (var d = 0; d <= days.length; d++)
                {
                    if (d % 7 == 0)
                    {
                        rows.push({
                            Days: days.slice(d - 7, d)
                        });
                    }
                }
                return rows;
            });
            this.SelectedMonthLocations = ko.observableArray(<IProviderLocation[]>[]);
            this.GetProviderAppointments(this.SelectedDate());
            var providerModel = new Models.Appointment();
        }

        public GetProviderAppointments(date?: Date)
        {
            try
            {
                var doneLoading = AppUI.loading('Loading...', 1, $('.scheduling-provider-workhours-calendar')[0]);
                var thisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
                var startDate = new Date(date.getFullYear(), date.getMonth(), -(thisMonth.getDay() - 1));
                var endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 42);
                this.SelectedMonthLocations.removeAll();
                CrmData.CalendarUtils.GetProviderAppointments(this.ProviderId(), startDate.toDateString(), endDate.toDateString(), (result) =>
                {
                    this.ProviderLocations(result.providerLocations);
                    this.allAppointments(result.allAppointments);
                    CrmData.CalendarUtils.ColorMapping(this.ProviderLocations);
                    CrmData.CalendarUtils.ColorMappingAppointment(this.allAppointments, this.ProviderLocations());
                    this.FilterAppointments = this.allAppointments();
                });
            }
            catch (ex)
            {
                console.log(ex);
            }
        }
        private EncompassBorder()
        {

        }

        public daysAreEqual(date1: string, date2: Date): boolean
        {
            var date = new Date(date1);
            return (date.getFullYear() == date2.getFullYear() && date.getMonth() == date2.getMonth() && date.getDate() == date2.getDate());
        }
        public getMonthName(date: Date): string
        {
            var month = date.getMonth();
            return MonthNames[month];
        }
        public showRelated(item: ICalendarSchedule)
        {
            if (!item.LinkVisible && item.LinkId)
            {
                item.LinkVisible = true;
                $('.link-' + item.LinkId).addClass('related');
            }
        }


        public OnNextClick()
        {
            try
            {
                var vm = AppointmentMonthViewModel._self;
                var selectedDate = vm.SelectedDate();
                var newMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
                vm.SelectedDate(newMonth);
            }
            catch (ex)
            {
                console.log(ex);
            }
        }
        public OnPreviousClick()
        {
            try
            {
                var vm = AppointmentMonthViewModel._self;
                var tempDate: IProviderLocation[];
                var selectedDate = vm.SelectedDate();
                var newMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
                vm.SelectedDate(newMonth);
            }
            catch (ex)
            {
                console.log(ex);
            }
        }
        public CurrentMonth()
        {
            try
            {
                var currentMonth = new Date();
                var newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
                this.SelectedDate(newMonth);
            }
            catch (ex)
            {
                console.log(ex);
            }
        }
        public OnRefreshClick()
        {
            try
            {
                var vm = AppointmentMonthViewModel._self;
                vm.allAppointments([]);
                vm.ProviderLocations([]);
                $("#ddllocations").css("display", "none");
                vm.GetProviderAppointments(vm.SelectedDate());
            }
            catch (ex)
            {
                console.log(ex);
            }

        }
        public hideRelated(item: ICalendarSchedule)
        {
            if (item.LinkVisible && item.LinkId)
            {
                item.LinkVisible = false;
                $('.link-' + item.LinkId).removeClass('related');
            }
        }
        public formatTime(datetime, military)
        {
            var appoitmentStartTime = datetime;
            if (appoitmentStartTime)
            {
                return appoitmentStartTime.getHours() + ":" + appoitmentStartTime.getMinutes();
            }
            return "";
        }

        /*
         * Show/Hide filter drop down
         */
        public filter(event)
        {
            $('#ddllocations').stop().slideToggle(500);
            //  this.FilteredLocation('');
        }

        public viewBy()
        {
            //  $('#ddviewfilter').stop().slideToggle(500);
        }


        public OnLocationSelected(selected: any)
        {
            try
            {
                var vm = AppointmentMonthViewModel._self;
                vm.allAppointments(vm.FilterAppointments.filter((wh) => wh.equipmentid == selected.Id));
                //if (!this.FilteredLocation()) {
                vm.FilteredLocation(selected);
                $('#ddllocations').stop().slideUp(500);
                //}
            }
            catch (ex)
            {
                console.log(ex);
            }
        }

        public hoverValues(scheduledstart, subject, name)
        {
            return ("Start Time: " + scheduledstart + "\nClient Name: " + subject + "\nLocation :" + name);

        }





    }
}
