module Ccx.Scheduling.ViewModels.Schedule
{

    export class Day
    {
        public dayOfMonth: number;
        public dayOfWeek: string;
        constructor(monthDay, weekDay)
        {
            this.dayOfMonth = monthDay;
            this.dayOfWeek = weekDay;
        }
    }

    export class dayHour
    {
        public hour: string;
        public suffix: string;
        constructor(hr, sfx)
        {
            this.hour = hr;
            this.suffix = sfx ? sfx : '';
        }

        public PastHalfHour()
        {

            var srcHour = this;
            var hr = new dayHour(srcHour.hour + ":30", srcHour.suffix);
            return hr;
        }

        public IsHalfPastHour()
        {
            if (this.hour.indexOf(":30") > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    export interface IAppointmentWeeklyViewModelParameter
    {
        providerId: string;
        selectedDate?: Date;
        timezonecode?: any;
    }

    export class Appointment
    {
        public ProgramUnit: string;
        public Patient: string;
        public StartDateTime: string;
        public Duration: number;
        public Recurrence: string;
        public Subject: string;

    }
    export class AppointmentWeeklyViewModel implements IAppointmentView
    {
        public weekdays: KnockoutObservableArray<Date>;
        public timings: KnockoutObservableArray<dayHour>;
        public weekAppointments: KnockoutObservableArray<Ccx.Scheduling.Models.IAppointments>;
        private appointmentsCopy: Ccx.Scheduling.Models.IAppointments[];
        public allAppointments: Ccx.Scheduling.Models.IAppointments[];
        public ProviderLocations: KnockoutObservableArray<Ccx.Scheduling.ViewModels.Schedule.IProviderLocation>;
        public HeaderText: KnockoutComputed<string>;
        public hourFormat: string = '24';
        public providerID: string;
        static _self: AppointmentWeeklyViewModel;
        constructor(data: IAppointmentWeeklyViewModelParameter)
        {
            AppointmentWeeklyViewModel._self = this;
            this.providerID = data.providerId;
            this.weekdays = ko.observableArray(CrmData.CalendarUtils.GetWeekDays());
            this.HeaderText = ko.computed(() =>
            {
                var monthDesc: string = '';
                monthDesc += CrmData.MonthNames[(this.weekdays()[CrmData.WeekDays.Sunday]).getMonth()] + " " + (this.weekdays()[CrmData.WeekDays.Sunday]).getDate() + "- ";
                if ((this.weekdays()[CrmData.WeekDays.Sunday]).getMonth() != (this.weekdays()[CrmData.WeekDays.Saturday]).getMonth())
                {
                    monthDesc += CrmData.MonthNames[(this.weekdays()[CrmData.WeekDays.Saturday]).getMonth()] + " ";
                }
                monthDesc += (this.weekdays()[CrmData.WeekDays.Saturday]).getDate() + ", " + (this.weekdays()[CrmData.WeekDays.Sunday]).getFullYear();

                return monthDesc;
            });
            this.timings = ko.observableArray(this.getDayHours(this.hourFormat));
            this.weekAppointments = ko.observableArray(<Ccx.Scheduling.Models.IAppointments[]>[]);
            this.ProviderLocations = ko.observableArray(<Ccx.Scheduling.ViewModels.Schedule.IProviderLocation[]>[]);
            this.getAppointments();
            setTimeout(function ()
            {
                $('.calendar-body').animate({ scrollTop: ($("#tr_16").offset().top - $(".calendar-body").offset().top) }, 'slow');
            });


        }

        public getWeekAppointments()
        {
            var vm = AppointmentWeeklyViewModel._self;
            //this.weekAppointments = ko.observableArray(<Ccx.Scheduling.Models.IAppointments[]>[]);
            var x = AppData.where(this.allAppointments, function (app)
            {
                var tempDate = new Date();
                // 1st day of week
                var day1 = new Date(tempDate.toString());
                day1.setDate((vm.weekdays()[0]).getDate());
                day1.setMonth((vm.weekdays()[0]).getMonth());
                day1.setFullYear((vm.weekdays()[0]).getFullYear());
                // last day of week
                var day7 = new Date(tempDate.toString());
                day7.setDate((vm.weekdays()[6]).getDate());
                day7.setMonth((vm.weekdays()[6]).getMonth());
                day7.setFullYear((vm.weekdays()[6]).getFullYear());

                var appDate: Date = new Date(app.scheduledstart);
                // appointment date
                var compareDate = new Date(tempDate.toString());
                compareDate.setDate(appDate.getDate());
                compareDate.setMonth(appDate.getMonth());
                compareDate.setFullYear(appDate.getFullYear());
                // mapped all the dates to tempdate, to keep time and any other factor same in the dates except date, month and year before comparing.
                if (compareDate >= day1 && compareDate <= day7)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            });

            this.weekAppointments(x);
            this.appointmentsCopy = this.weekAppointments();

        }

        public getAppointments()
        {
            CrmData.CalendarUtils.GetProviderAppointments(this.providerID, this.weekdays()[0].toDateString(), this.weekdays()[6].toDateString(), function (result)
            {
                AppointmentWeeklyViewModel._self.allAppointments = result.allAppointments;
                AppointmentWeeklyViewModel._self.getWeekAppointments();

                AppointmentWeeklyViewModel._self.ProviderLocations(result.providerLocations);
                CrmData.CalendarUtils.ColorMapping(AppointmentWeeklyViewModel._self.ProviderLocations);
                CrmData.CalendarUtils.ColorMappingAppointment(AppointmentWeeklyViewModel._self.weekAppointments, AppointmentWeeklyViewModel._self.ProviderLocations());
            });
        }

        public filterAppointmentByLocation(location: any)
        {
            console.log(" || location: " + JSON.stringify(location));
        }
        public filter(event)
        {
            $('#ddllocations').stop().slideToggle(500);
            //  this.FilteredLocation('');
        }
        public getDayHours(format)
        {
            var timeArr: Array<dayHour> = [];
            var hr: dayHour;
            var halfHr: dayHour;
            if (format == '24')
            {
                hr = new dayHour('00', 'am');
            }
            else
            {
                hr = new dayHour('12', 'am');
            }
            timeArr.push(hr);
            timeArr.push(hr.PastHalfHour());
            ///<summary> returns array of dayHour in 12 hour/ 24 hour format</summary>
            for (var i = 1; i < 24; i++)
            {
                if (i >= 12)
                {
                    if (i == 12)
                    {
                        hr = new dayHour(i.toString(), 'pm');
                    } else
                    {
                        if (format == '24')
                        {
                            hr = new dayHour(i.toString(), '00');
                        }
                        else
                        {
                            hr = new dayHour((i - 12).toString(), '00');
                        }
                    }
                }
                else
                {
                    if (i == 8)
                    {
                        hr = new dayHour(i.toString(), 'am');
                    }
                    else
                    {
                        hr = new dayHour(i.toString(), '00');
                    }
                }
                timeArr.push(hr);
                timeArr.push(hr.PastHalfHour());
            }
            return timeArr;
        }

        public onCellClick()
        {
            console.log(JSON.stringify(this));
        }

        public OnRefreshClick()
        {
            try
            {

                $("#ddllocations").css("display", "none");
                AppointmentWeeklyViewModel._self.getAppointments();
            }
            catch (ex)
            {
                console.log(ex);
            }
        }


        public isCurrentTimeSlotAppointment(timeslot: dayHour, weekDay: Date, currentApt: Models.IAppointments)
        {
            var aptDate: Date;
            aptDate = new Date(currentApt.scheduledstart);
            if (aptDate.getDate() == weekDay.getDate())
            {
                if (aptDate.getHours() == Number(timeslot.hour))
                {

                    return true;
                }
                else { return false; }
            }
            else
            {
                return false;
            }

        }

        public OnPreviousClick()
        {
            var vm = AppointmentWeeklyViewModel._self;
            var currWeekDay1 = vm.weekdays()[CrmData.WeekDays.Sunday];
            var prevWeekDay7 = new Date(currWeekDay1.toString());
            prevWeekDay7.setDate(currWeekDay1.getDate() - 1);
            vm.weekdays(CrmData.CalendarUtils.GetWeekDays(prevWeekDay7.toString()));
            vm.getAppointments();
        }

        public OnNextClick()
        {
            var vm = AppointmentWeeklyViewModel._self;
            var currWeekDay7 = vm.weekdays()[CrmData.WeekDays.Saturday];
            var nextWeekDay1 = new Date(currWeekDay7.toString());
            nextWeekDay1.setDate(currWeekDay7.getDate() + 1);
            vm.weekdays(CrmData.CalendarUtils.GetWeekDays(nextWeekDay1.toString()));
            vm.getAppointments();
        }

        public OnLocationSelected(selected: any)
        {
            try
            {
                var vm = AppointmentWeeklyViewModel._self;
                vm.weekAppointments(vm.appointmentsCopy.filter((wh) => wh.equipmentid == selected.Id));
                $('#ddllocations').stop().slideUp(500);
            }
            catch (ex)
            {
                console.log(ex);
            }
        }

    }
}