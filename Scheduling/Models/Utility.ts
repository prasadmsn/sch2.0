module CrmData
{
    export enum MonthNames
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
    export enum WeekDays
    {
        Sunday = 0,
        Monday = 1,
        Tuesday = 2,
        Wednesday = 3,
        Thursday = 4,
        Friday= 5,
        Saturday = 6
    }
    export class CalendarUtils
    {
        //static GetWeekDays(dateTimeStr?: string)
        //{
        //    ///<summary>Returns the First Date of the week</summary>
        //    ///<param name="dateTimeStr">Optional, if not provided it returns based on current date</param>
        //    var dte: Date = (dateTimeStr) ? new Date(dateTimeStr) : new Date();
        //    var firstDayOfWeek: Date = new Date();
        //    firstDayOfWeek.setDate(dte.getDate() - dte.getDay());
        //    var weekArrStr: Array<string> = new Array<string>();
        //    weekArrStr.push(firstDayOfWeek.toUTCString());
        //    for (var i = 1; i <= 6; i++)
        //    {
        //        dte = new Date(firstDayOfWeek.toString());
        //        dte.setDate(firstDayOfWeek.getDate() + i);
        //        weekArrStr.push(dte.toUTCString());
        //    }
        //    return weekArrStr;
        //}
        static colors = [{ 'color': '#F4A49B', 'BorderColor': '#E41300' }, { 'color': '#DD9DAB', 'BorderColor': '#9F0625' },
            { 'color': '#A6E4F3', 'BorderColor': '#19A0E0' }, { 'color': '#B6DCB7', 'BorderColor': '#038D02' },
            { 'color': '#FAC8EB', 'BorderColor': '#F374CF' },
            { 'color': '#C1FFC0', 'BorderColor': '#01FE03' },
            { 'color': '#FEC49E', 'BorderColor': '#FB6600' },
            { 'color': '#C6D1c1', 'BorderColor': '#69885E' },
            { 'color': '#C8C1D1', 'BorderColor': '#776188' }];

        static GetWeekDays(dateTimeStr?: string)
        {
            ///<summary>Returns all the dates of the week</summary>
            ///<param name="dateTimeStr">Optional, if not provided it returns based on current date</param>
            var dte: Date = (dateTimeStr) ? new Date(dateTimeStr) : new Date();
            var firstDayOfWeek: Date = new Date(dte.toString());
            firstDayOfWeek.setDate(dte.getDate() - dte.getDay());
            var weekArrStr: Array<Date> = new Array<Date>();
            weekArrStr.push(firstDayOfWeek);
            for (var i = 1; i <= 6; i++)
            {
                dte = new Date(firstDayOfWeek.toString());
                dte.setDate(firstDayOfWeek.getDate() + i);
                weekArrStr.push(dte);
            }
            return weekArrStr;
        }
        static getMonthName(date: Date): string
        {
            var month = date.getMonth();
            return MonthNames[month];
        }

        static daysAreEqual(date1: string, date2: Date): boolean
        {
            var date = new Date(date1);
            return (date.getFullYear() == date2.getFullYear() && date.getMonth() == date2.getMonth() && date.getDate() == date2.getDate());
        }

        static GetProviderAppointments(providerId: string, startDate: string, endDate: string, callback: any)
        {
            var doneLoading = AppUI.loading('Loading...', 1, $('.scheduling-provider-appointmenthours-appointmentweekly')[0]);
            var allAppointments = [];
            var providerLocations = [];
            //var thisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            //var startDate = new Date(date.getFullYear(), date.getMonth(), -(thisMonth.getDay() - 1));
            //var endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 42);
            var appointmentMode = new Ccx.Scheduling.Models.Appointment();
            appointmentMode.GetProviderAppointmentsByDate(providerId, startDate, endDate, (appointments) =>
            {
                if (appointments.length > 0)
                {
                    appointments = AppData.sort(appointments, (l) =>
                    {
                        return (l['activityparty.partyid_name']).split('-')[1]
                    }, false);

                    var facilityName;
                    for (var i = 0; i < appointments.length; i++)
                    {
                        facilityName = appointments[i]['activityparty.partyid_name'];
                        allAppointments.push(<Ccx.Scheduling.Models.IAppointments>{
                            subject: appointments[i]['subject'],
                            scheduledstart: appointments[i]['scheduledstart'],
                            scheduledend: appointments[i]['scheduledend'],
                            isalldayevent: appointments[i]['isalldayevent'],
                            activityid: appointments[i]['activityid'],
                            scheduleddurationminutes: appointments[i]['scheduleddurationminutes'],
                            equipmentid: appointments[i]['activityparty.partyid'],
                            name: appointments[i]['activityparty.partyid_name'],
                            bordercolorcode: ko.observable(''),
                            color: ko.observable(''),
                            location: facilityName.split('-')[1].toString().trim(),
                            regardingobjectid: appointments[i]['regardingobjectid'],
                            regardingobjectidname: appointments[i]['regardingobjectid_name'],
                            title: this.GetTitleForAppointment(appointments[i])
                        });

                        providerLocations.push(<Ccx.Scheduling.ViewModels.Schedule.IProviderLocation>
                            {
                                LocationName: (facilityName.split('-')[1].length > 20 ? facilityName.split('-')[1].substring(1, 19) + '...' : facilityName.split('-')[1]),
                                Id: appointments[i]['activityparty.partyid'],
                                PartialLocationName: (facilityName.split('-')[1].length > 20 ? facilityName.split('-')[1].substring(1, 19) + '...' : facilityName.split('-')[1]),
                                ScheduledStart: appointments[i]['scheduledstart'],
                                BorderColorCode: ko.observable(''),
                                Color: ko.observable('')
                            }
                            );

                    }
                }
                doneLoading();
                providerLocations = AppData.distinct(providerLocations, (l) => l.Id);
                var returnObj = { "allAppointments": allAppointments, "providerLocations": providerLocations };
                callback(returnObj);
            });

        }

        static GetTitleForAppointment(app: any)
        {
            var text: string;
            text = 'Date: ' + AppData.formatDate(app['scheduledstart']) + "( " + AppData.formatTime(app['scheduledstart']) + " - " + AppData.formatTime(app['scheduledend']) + ")";
            if (app["regardingobjectid_name"])
            {
                text += "\n Patient: " + app["regardingobjectid_name"];
            }
            text += "\n Facility: " + (app['activityparty.partyid_name']).split('-')[1].toString().trim();
            return text;
        }
        static ColorMapping(ProviderLocations: KnockoutObservableArray<Ccx.Scheduling.ViewModels.Schedule.IProviderLocation>)
        {
            var locCount = ProviderLocations().length;
            var i = 0;
            var m = locCount / (CalendarUtils.colors.length);
            var reminder = locCount % (CalendarUtils.colors.length);
            if (m >= 1)
            {
                while (i < locCount)
                {
                    for (var y = 1; y <= m; y++)
                    {
                        for (var z = 0; z < this.colors.length; z++)
                        {
                            if (ProviderLocations()[i])
                            {
                                ProviderLocations()[i]["BorderColorCode"](this.colors[z]["BorderColor"]);
                                ProviderLocations()[i]["Color"](this.colors[z]["color"]);

                                i = i + 1;
                            }
                        }
                    }
                    if (reminder >= 1)
                    {
                        for (var k = 0; k < reminder; k++)
                        {
                            if (ProviderLocations()[i])
                            {
                                ProviderLocations()[i]["BorderColorCode"](this.colors[k]["BorderColor"]);
                                ProviderLocations()[i]["Color"](this.colors[k]["color"]);
                                i = i + 1;
                            }
                        }
                    }
                }
            }
            else
            {
                for (var z = 0; z < this.colors.length; z++)
                {
                    if (ProviderLocations()[i])
                    {
                        ProviderLocations()[i]["BorderColorCode"](this.colors[z]["BorderColor"]);
                        ProviderLocations()[i]["Color"](this.colors[z]["color"]);
                        i = i + 1;
                    }
                }
            }
        }
        static ColorMappingAppointment(appointments: KnockoutObservableArray<Ccx.Scheduling.Models.IAppointments>, ProviderLocations: Ccx.Scheduling.ViewModels.Schedule.IProviderLocation[])
        {
            var location: Array<any>;
            ko.utils.arrayForEach(appointments(), (app) =>
            {
                location = AppData.where(ProviderLocations, function (loc)
                {
                    return (loc.Id == app.equipmentid);
                });

                if (location && location.length > 0)
                {
                    app.bordercolorcode(location[0]["BorderColorCode"]);
                    app.color(location[0]["Color"]);
                }
            });
        }
    }
}
