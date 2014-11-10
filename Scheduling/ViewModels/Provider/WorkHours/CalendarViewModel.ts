declare var REMOVE_ITEM_DELEGATE_TEMP: (item: Ccx.Scheduling.ViewModels.Provider.WorkHours.ICalendarSchedule) => void;
declare var CALENDAR_RULES_COLLECTION: any[];
var NOLOCATIONFOUND = 'There is no location(s) found';
var NOCALENDARINFOFOUND = 'There is no calendar info found';
var NOWORKHOURFOUND = 'There are no work hours found';
module Ccx.Scheduling.ViewModels.Provider.WorkHours
{
    export interface ICalendarRow
    {
        Days: ICalendarDay[];
    }

    export interface IProviderLocation
    {
        LocationName: string;
        PartialLocationName: string;
        Id: string;
        BorderColorCode?: KnockoutObservable<string>;
        Color?: KnockoutObservable<string>;
        IsActive?: boolean;
    }
    export interface IScheduleTypeInfo
    {
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
    export interface ILocation
    {
        AgencyLocationName: string;
        AgencyLocatoinId: string;
        CreatedOn: string;
        AddressType: string;
        Telephone1: string;
    }
    export interface IFacilityEquipment
    {
        Name: string;
    }
    export interface ICalendarDay
    {
        IsCurrentMonth: boolean;
        Month: number;
        Day: number;
        Date: Date;
    }
    export enum LocationColorCode
    {
        Green,
        Blue,
        Orange,
        Purple,
        Red,
        Yellow,
        Pink
    }
    export interface ICalendarSchedule
    {
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

    export enum CalendarScheduleType
    {
        Weekly,
        Daily,
        TimeOff,
        Break,
        Entire
    }

    export interface ICalendarViewModelParameter
    {
        providerId: string;
        selectedDate?: Date;
        timezonecode?: any;
    }

    export class CalendarViewModel
    {
        public SelectedDate: KnockoutObservable<Date>;
        public WorkHours: KnockoutObservableArray<ICalendarSchedule>;
        public FilterWorkHours: ICalendarSchedule[];
        public CalendarRows: KnockoutComputed<ICalendarRow[]>;
        public SelectedMonth: KnockoutComputed<string>;
        public ProviderLocations: KnockoutObservableArray<IProviderLocation>;
        public LocationRows: KnockoutComputed<any>;
        public colors: Array<any>;
        public SelectAll: KnockoutObservable<boolean>;
        public SelectedItemIds: KnockoutObservableArray<any>;
        public ProviderId: KnockoutObservable<string>;
        public FilteredLocation: KnockoutObservable<any>;
        public TimezoneCode: string;
        private SelectedDateForAddItem: Date;
        public IsWorkhouRefreshed: KnockoutObservable<boolean>;
        private HighlightedItem: ICalendarSchedule;
        public SelectedMonthLocations: KnockoutObservableArray<IProviderLocation>;
        constructor(data?: ICalendarViewModelParameter)
        {

            this.ParameterDeclaration(data);
            this.GetAllLocation();
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

            this.formatLocationInRows();
            CrmData.SingletonClass.setDocumentClickHandler();
        }

        private formatLocationInRows()
        {
            this.LocationRows = ko.computed(() =>
            {
                var result = [],
                    row,
                    colLength = 3;

                //loop through items and push each item to a row array that gets pushed to the final result
                for (var i = 0, j = this.ProviderLocations().length; i < j; i++)
                {
                    if (i % colLength === 0)
                    {
                        if (row)
                        {
                            result.push(row);
                        }
                        row = [];
                    }

                    row.push(this.ProviderLocations()[i]);
                }

                //push the final row  
                if (row)
                {
                    result.push(row);
                }

                return result;
            });
        }
        /* Parameter declaration*/
        private ParameterDeclaration(data)
        {
            this.IsWorkhouRefreshed = ko.observable(false);
            this.TimezoneCode = data.timezonecode || '';
            this.ProviderId = ko.observable(data.providerId);
            this.FilteredLocation = ko.observable('');
            this.SelectAll = ko.observable(false);
            this.SelectedItemIds = ko.observableArray([]);
            this.colors = [{ 'color': '#F4A49B', 'BorderColor': '#E41300' }, { 'color': '#DD9DAB', 'BorderColor': '#9F0625' },
                { 'color': '#A6E4F3', 'BorderColor': '#19A0E0' }, { 'color': '#B6DCB7', 'BorderColor': '#038D02' },
                { 'color': '#FAC8EB', 'BorderColor': '#F374CF' },
                { 'color': '#C1FFC0', 'BorderColor': '#01FE03' },
                { 'color': '#FEC49E', 'BorderColor': '#FB6600' },
                { 'color': '#C6D1c1', 'BorderColor': '#69885E' },
                { 'color': '#C8C1D1', 'BorderColor': '#776188' }];

            REMOVE_ITEM_DELEGATE_TEMP = this.removeItem.bind(this);//this is temporary
            this.SelectedDate = ko.observable(data.selectedDate || new Date());
            this.SelectedMonth = ko.computed(() => {return this.getMonthName(this.SelectedDate()) });
            this.WorkHours = ko.observableArray(<ICalendarSchedule[]>[]);
            this.FilterWorkHours = []
            this.ProviderLocations = ko.observableArray(<IProviderLocation[]>[]);
            this.SelectedMonthLocations = ko.observableArray(<IProviderLocation[]>[]);
            var providerModel = new Models.ProviderSchedule();
        }
        /*
        * Get All Provider Locations
        */
        public GetAllLocation()
        {
            try
            {
                var providerModel = new Models.ProviderSchedule();
                providerModel.GetProviderLocations(this.ProviderId(), (locations) =>
                {
                    if (locations)
                    {
                        locations = AppData.sort(locations, (l) =>
                        {
                        return l.ccx_agencylocation_name
                    }, false);
                        this.ProviderLocations(AppData.select(locations, (item) =>
                        {
                            return {
                                LocationName: item['ccx_agencylocation_name'],
                                Id: item['equipmentid'],
                                PartialLocationName: (item['ccx_agencylocation_name'].length > 20) ? item['ccx_agencylocation_name'].substring(0, 19) + '...' : item['ccx_agencylocation_name'],
                                BorderColorCode: ko.observable(''),
                                Color: ko.observable(''),
                                IsActive: item['ccx_schedulestatus']
                            };
                        }));
                        this.ColorMapping();


                        //this.SelectedDate.subscribe(() =>
                        //{
                        //    this.IsWorkhouRefreshed = ko.observable(false);
                        //    this.getFacilityResourceIds(this.ProviderId());
                        //});

                        //if (!this.IsWorkhouRefreshed()) {
                        //    this.getFacilityResourceIds(this.ProviderId());
                        //}
                    }
                });

                this.SelectedDate.subscribe(() =>
                {
                    this.IsWorkhouRefreshed = ko.observable(false);
                    this.getFacilityResourceIds(this.ProviderId());
                });
                if (!this.IsWorkhouRefreshed())
                {
                    this.getFacilityResourceIds(this.ProviderId());
                }

            }
            catch (ex)
            {
                console.log(ex);
            }
        }

        /*
         * map background color based on location index
         */
        private ColorMapping()
        {
            var locCount = this.ProviderLocations().length;
            var i = 0;
            var m = locCount / (this.colors.length);
            var reminder = locCount % (this.colors.length);
            if (m >= 1)
            {
                while (i < locCount)
                {
                    for (var y = 1; y <= m; y++)
                    {
                        for (var z = 0; z < this.colors.length; z++)
                        {
                            if (this.ProviderLocations()[i])
                            {
                                this.ProviderLocations()[i]["BorderColorCode"](this.colors[z]["BorderColor"]);
                                this.ProviderLocations()[i]["Color"](this.colors[z]["color"]);

                                i = i + 1;
                            }
                        }
                    }
                    if (reminder >= 1)
                    {
                        for (var k = 0; k < reminder; k++)
                        {
                            if (this.ProviderLocations()[i])
                            {
                                this.ProviderLocations()[i]["BorderColorCode"](this.colors[k]["BorderColor"]);
                                this.ProviderLocations()[i]["Color"](this.colors[k]["color"]);
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
                    if (this.ProviderLocations()[i])
                    {
                        this.ProviderLocations()[i]["BorderColorCode"](this.colors[z]["BorderColor"]);
                        this.ProviderLocations()[i]["Color"](this.colors[z]["color"]);
                        i = i + 1;
                    }
                }
            }
        }
        /*
         * Update Calendar month to previous month
         */
        public prevMonth()
        {
            try
            {
                var selectedDate = this.SelectedDate();
                var newMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
                this.SelectedDate(newMonth);
            }
            catch (ex)
            {
                console.log(ex);
            }
        }

        /*
         * Update Calendar month to next month
         */
        public nextMonth()
        {
            try
            {
                var selectedDate = this.SelectedDate();
                var newMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
                this.SelectedDate(newMonth);
            }
            catch (ex)
            {
                console.log(ex);
            }
        }
        public showPopup(element: HTMLElement = null, title: string = ''): HTMLElement
        {
            CrmData.Common.disableHTMLScroll();
            if (!element)
            {
                element = document.createElement('DIV');
            }
            var contentWidth = $(element).innerWidth();
            var contentHeight = $(element).innerHeight();
            var elementOwner = <HTMLElement>element.parentNode;
            var closePopupDelegate = element['closePopup'] = (e, data) =>
            {
                if ($(popupElement).find('#spnDataChanged').text().toLowerCase() == "true")
                {
                    var scheduleType = ($(popupElement).find('#spnScheduleType').text().toLowerCase() == "true") ? 'Recurring' : 'Single Day';
                    AppUI.confirm('Your changes will be lost if you continue, press yes to close or no to return to Set ' + scheduleType + ' Schedule', () =>
                        contentElement.fadeOut('fast', () =>
                        {
                            if (popupElement)
                            {
                                if (elementOwner)
                                {
                                    elementOwner.appendChild(element);
                                }
                                $(popupElement).remove();
                                popupElement = null;
                                if ($('.ccx-ui-popup-container').length == 0)
                                {
                                    document.body.style.overflow = 'auto';
                                }
                                if (element['onHidePopup'])
                                {
                                    element['onHidePopup']();
                                }
                            }
                            CrmData.Common.enableHTMLScroll();
                        }));

                }
                else
                {
                    if (popupElement)
                    {
                        if (elementOwner)
                        {
                            elementOwner.appendChild(element);
                        }
                        $(popupElement).remove();
                        popupElement = null;
                        if ($('.ccx-ui-popup-container').length == 0)
                        {
                            document.body.style.overflow = 'auto';
                        }
                        if (element['onHidePopup'])
                        {
                            element['onHidePopup']();
                        }
                    }
                    CrmData.Common.enableHTMLScroll();
                }
            };
            element['hidePopup'] = () =>
            {
                if (popupElement)
                {
                    $('.ccx-ui-popup', popupElement).fadeOut('fast');
                    $('#w2ui-global-items').remove();
                   
                }
            };
            element['showPopup'] = () =>
            {
                if (popupElement)
                {
                    $('.ccx-ui-popup', popupElement).fadeIn('fast');
                   
                }
            };
            var popupElement = AppUI.createElementTree({
                '@class': 'ccx-ui-popup-container',
                '.ccx-ui-popup-shade': {
                    //'onclick': closePopupDelegate //Removed per Task 3988
                },
                '.ccx-ui-popup': {
                    //'onclick': closePopupDelegate, //Removed per Task 3988
                    '.ccx-ui-popup-content': {
                        'onclick': (e) => AppUI.cancelEvent(e),
                        '.ccx-ui-popup-title': {
                            '.ccx-ui-popup-close': {
                                'onclick': (e) => closePopupDelegate(e)
                            },
                            'H4': title
                        },
                        '.ccx-ui-popup-body': element
                    }
                }
            });
            var contentElement = $('.ccx-ui-popup-content', popupElement);
            $(contentElement).css('max-width', '870px');
            var bodyElement = $('.ccx-ui-popup-body', popupElement);
            if ($('.ccx-ui-popup-shade').length > 0)
            {
                $('.ccx-ui-popup-shade', popupElement).remove();
                contentElement.addClass('ccx-ui-noshadow');
            }
            if (contentWidth > 0)
            {
                contentElement.width(contentWidth);
            }
            if (contentHeight > 0)
            {
                bodyElement.css("overflow", "auto");
            }
            contentElement.hide();
            document.body.style.overflow = 'auto';
            $(popupElement).appendTo(document.body);
            contentElement.fadeIn('slow');
            return element;
        }

        public showRelated(item: ICalendarSchedule)
        {
            $('.schedule-item').removeClass('related');
            if (this.HighlightedItem) { this.HighlightedItem.LinkVisible = false; }
            if (!item.LinkVisible && item.LinkId)
            {
                item.LinkVisible = true;
                $('.link-' + item.LinkId).addClass('related');
                this.HighlightedItem = item;
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

        public showDetail(item: ICalendarSchedule)
        {
            var element = AppUI.Popup.show(null, 'Schedule Detail');
            CrmData.Common.disableHTMLScroll();
            $(element).addClass('read-only').addClass('ccx-page').addClass('static');
            App.View.load({
                ViewName: 'Scheduling-Provider-WorkHours-WorkHourFlyout',
                ViewContext: item
            }, element);
            
        }

        /*
         * Delete work hour schedule
         */
        public removeItem(item: ICalendarSchedule)
        {
            try
            {
                $(document).click();//close flyout

                if (item.LinkId)
                {
                    this.selectRecurrence(item.Date, (r) =>
                    {
                        AppUI.Popup.hideAll();
                        if (r == 'Single')
                        {
                            this.WorkHours.remove(item);
                        }
                        else if (r == 'Remaining')
                        {
                            this.WorkHours.remove((wh) => wh.LinkId == item.LinkId && wh.Date >= item.Date);
                        }
                        else if (r == 'All')
                        {
                            this.WorkHours.remove((wh) => wh.LinkId == item.LinkId);
                        }
                    });
                }
                else
                {
                    if (AppUI.confirm('Are you sure you want to remove this item?', () =>
                    {
                        this.WorkHours.remove(item);
                    }));
                }
            
            }
            catch (ex)
            {
                console.log(ex);
            }
        }

        /*
         * Initiates the add location popup
         */
        public addLocation(date)
        {
            try
            {
                var self = this;
                if (self.ProviderLocations().length > 0)
                {
                    var providerModel = new Models.ProviderSchedule();

                    var providerLocations = AppData.select(self.ProviderLocations(), (location) =>
                    {
                        return location.LocationName;
                    });
                    var element = AppUI.Popup.show(null, 'Select a Facility To Add:');
                    CrmData.Common.disableHTMLScroll();
                    App.View.load({
                        ViewName: 'Scheduling-Provider-WorkHours-AddLocationPopup',
                        ViewContext: new LocationViewModel(providerLocations, this.ProviderId(), this.TimezoneCode, (id) =>
                        {
                            providerModel.GetProviderLocations(this.ProviderId(), (locations) =>
                            {
                                this.ProviderLocations(AppData.select(locations, (item) =>
                                {
                                    return {
                                        LocationName: item['ccx_agencylocation_name'],
                                        Id: item['equipmentid'],
                                        PartialLocationName: (item['ccx_agencylocation_name'].length > 20) ? item['ccx_agencylocation_name'].substring(0, 19) + '...' : item['ccx_agencylocation_name'],
                                        BorderColorCode: ko.observable(''),
                                        Color: ko.observable(''),
                                        IsActive: item['ccx_schedulestatus']
                                    };
                                }));
                                this.ColorMapping();
                            });

                            self.reload();

                            self.selectType((type) =>
                            {
                                AppUI.Popup.hideAll();
                                CrmData.Common.enableHTMLScroll();
                                this.showSchedule(type, id, null, date);
                            });
                        })
                    }, element);
                }
            
            }
            catch (ex)
            {
                console.log(ex);
            }
        }

        /*
         * Show add schedule popup
         * @param: date => the work hour is to be scheduled on this date
         */
        public addItem(date: Date)
        {
            try
            {
                if (this.ProviderLocations().length > 0)
                {
                    this.selectLocation(this.LocationRows(), (location) =>
                    {
                        AppUI.Popup.hideAll();
                        CrmData.Common.enableHTMLScroll();
                        if (location == "Add New")
                        {
                            this.addLocation(date);
                        } else
                        {
                            this.selectType((type) =>
                            {
                                this.SelectedDateForAddItem = date;
                                AppUI.Popup.hideAll(); CrmData.Common.enableHTMLScroll();
                                this.showSchedule(type, location['Id'], undefined, date);
                            });
                        }
                    });
                }
                else
                {
                    var providerModel = new Models.ProviderSchedule();
                    var element = AppUI.Popup.show(null, 'Select a Facility To Add:');
                    CrmData.Common.disableHTMLScroll();
                    App.View.load({
                        ViewName: 'Scheduling-Provider-WorkHours-AddLocationPopup',
                        ViewContext: new LocationViewModel(null, this.ProviderId(), this.TimezoneCode, (id) =>
                        {
                            if (id)
                            {
                                this.reload();
                                this.selectType((type) =>
                                {
                                    AppUI.Popup.hideAll();
                                    CrmData.Common.enableHTMLScroll();
                                    this.showSchedule(type, id, null, date);
                                });
                            }
                            else
                            {
                                providerModel.GetAllLocations(null, (locations) =>
                                {
                                    this.ProviderLocations(AppData.select(locations, (item) =>
                                    {
                                        return {
                                            LocationName: item['ccx_agencylocation_name'],
                                            Id: item['equipmentid'],
                                            PartialLocationName: (item['ccx_agencylocation_name'].length > 20) ? item['ccx_agencylocation_name'].substring(0, 19) + '...' : item['ccx_agencylocation_name'],
                                            BorderColorCode: ko.observable(''),
                                            Color: ko.observable(''),
                                            IsActive: item['ccx_schedulestatus']
                                        };
                                    }));
                                });
                            }
                        })
                    }, element);

                }
            
            }
            catch (ex)
            {
                console.log(ex);
            }
        }

        /*
         * Show weekly schedule popup 
         */
        public showSchedule(type: CalendarScheduleType, equipmentID?: string, selectedDayDetails?: ICalendarSchedule, selectedDayDate?: Date)
        {
            var self = this;
            var element = null;
            var viewContext = null;
            var ViewName = "Scheduling-WeeklySchedule";
            switch (type)
            {
                case Ccx.Scheduling.ViewModels.Provider.WorkHours.CalendarScheduleType.Weekly:

                    element = this.showPopup(null, "Set Recurring Weekly Schedule");
                    viewContext = new Ccx.Scheduling.ViewModels.WeeklyScheduleViewModel(IScheduleType.RecurringSchedule, this.TimezoneCode, equipmentID, undefined, selectedDayDate, undefined, false, null, this.ProviderId(), (onsave) =>
                    {
                        if (onsave)
                        {
                            self.reload();
                        }
                    });


                    break;
                case Ccx.Scheduling.ViewModels.Provider.WorkHours.CalendarScheduleType.Daily:
                    if (selectedDayDetails)
                    {
                        element = this.showPopup(null, "Edit Schedule");
                        viewContext = new Ccx.Scheduling.ViewModels.WeeklyScheduleViewModel(IScheduleType.SingleDaySchedule, this.TimezoneCode, equipmentID, selectedDayDetails, null, undefined, false, null, this.ProviderId(), (onsave) =>
                        {
                            if (onsave)
                            {
                                self.reload();
                            }
                        });
                    }
                    else
                    {
                        element = this.showPopup(null, "Set Work Hours and Service Restrictions");
                        viewContext = new Ccx.Scheduling.ViewModels.WeeklyScheduleViewModel(IScheduleType.SingleDaySchedule, this.TimezoneCode, equipmentID, undefined, selectedDayDate, undefined, false, null, this.ProviderId(), (onsave) =>
                        {
                            if (onsave)
                            {
                                self.reload();
                            }
                        });
                    }
                    break;
            }
            $(element).addClass('ccx-page').css('position', 'static');
            App.View.load(
                {
                    ViewName: ViewName,
                    ViewContext: viewContext
                }, element);
            
        }

        /*
        * Show weekly schedule popup 
        */
        public showEditOption(data: any, Index: any, scheduleInfoArray?: any)
        {
            var self = this;

            var equipmentid = AppData.where(this.ProviderLocations(), (l) => l.LocationName == data.Location)[0]['Id'];
            var element = AppUI.Popup.show(null, "Edit Schedule"); 
            CrmData.Common.disableHTMLScroll();
            var ViewName = "Scheduling-Schedule-ScheduleType";
            App.View.load(
                {
                    ViewName: ViewName,
                    ViewContext: new Ccx.Scheduling.ViewModels.ScheduleTypeViewModel(data, equipmentid, this.TimezoneCode, scheduleInfoArray, (onsave) =>
                    {
                        self.reload();
                    })
                }, element);
            
            $('#w2ui-overlay').find('.close').click();// to close flyout

        }

        /*
         * Show Select location popup (add schedule work flow step: select location)
         */
        public selectLocation(arrayOfLocations: any[], callback: AppData.callback<any>)
        {
            try
            {
            var element = AppUI.Popup.show(null, 'Add Schedule');
            CrmData.Common.disableHTMLScroll();
                App.View.load({
                    ViewName: 'Scheduling-Provider-WorkHours-ScheduleLocationPopup',
                    ViewContext: {
                        locations: arrayOfLocations,
                        select: callback.bind(this),
                        location: (l) =>
                        {
                            callback(l);
                        }
                    }
                }, element);
            }
            catch (ex)
            {
                console.log(ex);
            }
        }

        /*
         * Show Select schedule type popup (add schedule work flow step: select schedule type)
         */
        public selectType(callback: AppData.callback<CalendarScheduleType>)
        {
            try
            {
            var element = AppUI.Popup.show(null, 'Add Schedule');
            CrmData.Common.disableHTMLScroll();
                App.View.load({
                    ViewName: 'Scheduling-Provider-WorkHours-ScheduleTypePopup',
                    ViewContext: {
                        select: callback.bind(this)
                    }
                }, element);
            }
            catch (ex)
            {
                console.log(ex)
            }
        }

        /*
         * Show Select Recurrence Popup (Add Schedule popup workflow step: Select Recurrence)
         */
        public selectRecurrence(date: Date, callback: AppData.callback<string>)
        {
            try
            {
            var element = AppUI.Popup.show(null, 'Remove Schedule');
            CrmData.Common.disableHTMLScroll();
                App.View.load({
                    ViewName: 'Scheduling-Provider-WorkHours-ScheduleRecurrencePopup',
                    ViewContext: {
                        date: date,
                        select: callback.bind(this)
                    }
                }, element);
            }
            catch (ex)
            {
                console.log(ex);
            }
        }

        /*
         * Get month name from the date value
         * Returns Month Name
         */
        public getMonthName(date: Date): string
        {
            try
            {
                var month = date.getMonth();
                return MonthNames[month];
            }
            catch (ex)
            {
                console.log(ex);
            }
        }

        /*
         * Compare dates and return boolean(true/false)
         */
        public daysAreEqual(date1: Date, date2: Date): boolean
        {
            if (date1 && date2)
            {
                return (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate());
            }
        }

        /*
         * Reload the calendar data
         */
        public reload()
        {
            try
            {
                this.FilteredLocation('');
                $("#ddllocations").css("display", "none");
                this.IsWorkhouRefreshed(false);
                this.getFacilityResourceIds(this.ProviderId()); //Provider Id hardcoded
                this.GetAllLocation();
            }
            catch (ex)
            {
                console.log(ex);
            }
        }


        /*
         * Show/Hide filter drop down
         */
        public filter(event)
        {
            $('#ddllocations').stop().slideToggle(500);
            // this.FilteredLocation('');
            //this.ColorMapping();
        }
        public HighLightSelection(viewdata, event, data, Index)
        {
            $('.calendar-table').find('.schedule-item.selected').removeClass('selected');
            $('.calendar-table').find('.calendar-day.selected').removeClass('selected');

            $(event.srcElement).parent('.schedule-item').addClass("selected");
            $(event.srcElement).closest('.calendar-day').addClass("selected");

        }

        /*
         * Filter work hours 
         * @param: selected=> filter location
         */
        public filterLocation(selected: any)
        {
            try
            {
                this.WorkHours(this.FilterWorkHours.filter((wh) => wh.Location == selected.LocationName));
                //if (!this.FilteredLocation())
                //{
                this.FilteredLocation(selected);
                $('#ddllocations').stop().slideUp(500);
                //}
            }
            catch (ex)
            {
                console.log(ex);
            }
        }

        /*
         * Get Facility Equipment Resource Ids(GUIDs) and pass them to the soap call to get the work hours
         * @param: Provider Id: Selected Provider id from Provider search
         */
        public getFacilityResourceIds(providerId: string)
        {
            try
            {
                if (!this.IsWorkhouRefreshed())
                {
                    var NoworkHours = true;
                    var count = 0;
                    var providerModel = new Models.ProviderSchedule();
                    var providerProfile = new ViewModels.ProviderProfileViewModel();
                    this.SelectedMonthLocations.removeAll();
                    providerModel.GetFacilityEquipmentResourceIds(providerId, (locations) =>
                    {
                        if (locations && locations.length > 0)
                        {
                            NoworkHours = false;
                            this.updateWorkHours(this.SelectedDate(), locations);
                        }
                        else
                        {
                            this.WorkHours([]);
                            CrmData.Common.showMessage(NOWORKHOURFOUND);
                        }
                    });
                    this.IsWorkhouRefreshed = ko.observable(true);

                }
            }
            catch (ex)
            {
                console.log(ex);
            }
        }
        /* Loading work hour on edit mode */
        public EditWorkHours(schedule: ICalendarSchedule, e, Index)
        {
            $(document).click();
            schedule.ScheduleTypeInfo.ProviderID = this.ProviderId();
            if ($(e.srcElement).parent('.schedule-item').hasClass('selected'))
            {
                schedule.EquipmentId = AppData.where(this.ProviderLocations(), (l) => l.LocationName == schedule.Location)[0]['Id'];
                if (schedule.ScheduleTypeInfo.Frequency == CalendarScheduleType.Weekly)
                {
                    this.showEditOption(schedule, Index, schedule.ScheduleTypeInfo);
                }
                else
                {
                    this.showSchedule(schedule.Type, schedule.EquipmentId, schedule);
                }
            }
        }
        /* Removing default workhour 12:00 to 12:05 am*/
        private RemoveDefaultWorkhour()
        {
            var allWorkhour = AppData.where(this.WorkHours(), function (s) { return (s.EndTime.getHours() - s.StartTime.getHours() == 0 && s.EndTime.getMinutes() - s.StartTime.getMinutes() == 5); })
            ko.utils.arrayForEach(allWorkhour,  (item)=>
            {
                this.WorkHours.remove(item);
            });
        }
        /*
         * Update the Calendar work hours
         * @param:date - Selected date, locations - provider associated locations
         */
        private updateWorkHours(date: Date, locations: Models.IEquipments[])
        {
            var doneLoading = AppUI.loading('Loading...', 10, $('.scheduling-provider-workhours-calendar')[0]);
            var thisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
            var startDate = new Date(date.getFullYear(), date.getMonth(), -(thisMonth.getDay() - 1));
            var endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 42);
            var providerModel = new Models.ProviderSchedule();

            providerModel.GetProviderWorkHours(locations, startDate, endDate, (wh) =>
            {
                if (wh && wh.length > 0)
                {
                    this.WorkHours(AppData.select(wh, (item) =>
                    {
                        var borderColor = AppData.where(this.ProviderLocations(), (l) => l.LocationName == item.Location)[0].BorderColorCode();
                        var color = AppData.where(this.ProviderLocations(), (l) => l.LocationName == item.Location)[0].Color();

                        //Pattern Manipulatation
                        var pattern: string;
                        pattern = item.Pattern;
                        var patternCol = pattern.split(';');
                        var freq = (patternCol[0].split('=')[1].toLowerCase() == "daily") ? "Daily" : "Weekly";
                        var days = '';
                        //GET Days from rules collection if recurrence type is varied.
                        var col = {};
                        if (item.IsVaried)
                        {
                            var ruleCollection = AppData.where(CALENDAR_RULES_COLLECTION, (c) => { return c.CalendarId === item.ParentCalendarId })[0];
                            col = AppData.where(ruleCollection['CalendarRules'].scheduleInfo, (s) => { return (s['isvaried'] && AppData.formatDate(s['starttime']) === AppData.formatDate(item['ScheduleInfoStartTime'])) });

                            $.each(col, (i, p) =>
                            {

                                days += p['pattern'].split(';')[2].split('=')[1] + ',';
                            });
                            if (days)
                            {
                                days = days.substring(0, days.lastIndexOf(','));
                            }
                        }
                        else
                        {
                            days = ((patternCol[2]) ? patternCol[2].split('=')[1] : '')
                        }

                        return {
                            LinkId: item.LinkID,
                            Reason: item.Reason,
                            Location: item.Location,
                            LocationID: item.LocationID,
                            PartialLocation: (item.Location.length > 7) ? item.Location.substring(0, 6) + '...' : item.Location,
                            Date: item.Date,
                            IsAllDay: (item.StartTime === item.EndTime),
                            StartTime: item.StartTime,
                            EndTime: item.EndTime,
                            CalendarId: item.CalendarId,
                            Type: (item.IsTimeOff ? CalendarScheduleType.TimeOff : item.IsBreak ?
                            CalendarScheduleType.Break : (freq === "Weekly") ?
                            CalendarScheduleType.Weekly : CalendarScheduleType.Daily),
                            BorderColor: borderColor,
                            Color: color,
                            IsFirstClick: ko.observable(true),
                            ScheduleTypeInfo: {
                                Frequency: CalendarScheduleType[freq],
                                Days: days,
                                StartTime: item.ScheduleInfoStartTime,
                                EffectiveIntervalEnd: (item.EffectiveIntervalEnd) ? AppData.formatDate(item.EffectiveIntervalEnd) : '',
                                IsVaried: (item.IsVaried) ? item.IsVaried : false,
                                TimeZoneCode: item.TimezoneCode,
                                GroupDesignator: (item.GroupDesignator) ? item.GroupDesignator : null,
                                ParentCalendarId: item.ParentCalendarId
                            }

                        };
                    }));
                    this.RemoveDefaultWorkhour();
                    var currentMonthLocation = <IProviderLocation[]>[];
                    var distinctLocation = AppData.distinct(this.WorkHours(), (i) => i.Location);
                    ko.utils.arrayForEach(distinctLocation, (item) =>
                    {
                        var result =
                            AppData.where(this.ProviderLocations(), (s) =>
                            {
                                if (s['LocationName'] === item['Location'])
                                {
                                    return <any>{
                                        LocationName: s['LocationName'],
                                        PartialLocationName: s['PartialLocationName'],
                                        Id: s['Id'],
                                        BorderColorCode: ko.observable(s['BorderColorCode']),
                                        Color: ko.observable(s['Color']),
                                        IsActive: s['IsActive']
                                    };

                                }

                            });
                        currentMonthLocation.push(result[0]);
                    });
                    this.SelectedMonthLocations(currentMonthLocation);
                    doneLoading();
                }
                else
                {
                    doneLoading();
                    this.WorkHours([]);
                    CrmData.Common.showMessage(NOWORKHOURFOUND);
                }
                this.FilterWorkHours = this.WorkHours();
                if (this.FilteredLocation())
                {
                    this.filterLocation(this.FilteredLocation());
                }

            });

        }

        /*
         * formate time and convert to military time
         * @param: dateTime , military: boolean
         */
        public formatTime(datetime, military)
        {
            var jsDate = AppData.parseDate(datetime);
            if (!jsDate)
                return '';
            var h = jsDate.getHours();
            var m = jsDate.getMinutes();
            var s = jsDate.getSeconds();
            var a = (h >= 12 ? 'PM' : 'AM');
            if (h == 0)
                h = 12;
            if (h > 12)
                h -= 12;
            var normalTime = (h + ':' + (m < 10 ? '0' : '') + m + a);
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



}