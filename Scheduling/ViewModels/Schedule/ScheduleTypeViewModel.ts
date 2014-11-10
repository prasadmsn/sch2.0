
module Ccx.Scheduling.ViewModels 
{


    export class ScheduleTypeViewModel
    {

        public ScheduleStartedDate: KnockoutObservable<string>;
        public SelectedDate: KnockoutObservable<string>;
        public ScheduleType: KnockoutObservable<string>;
        private ProviderInfo: Models.ProviderSchedule;
        private TimeZoneCode: string;
        private EquipmentId: string;
        private ScheduleDetails: Ccx.Scheduling.ViewModels.Provider.WorkHours.ICalendarSchedule;
        private ScheduleInfoArray: any;
        public IsNotStartDateofRecurrence: KnockoutObservable<boolean>;
        constructor(data: any, equipmentID: string, timezonecode: string, scheduleTypeInforArray?: any, private OnSave?: AppData.callback<any>)
        {
            this.TimeZoneCode = timezonecode;
            this.EquipmentId = equipmentID;
            this.ScheduleStartedDate = ko.observable(AppData.formatDate(scheduleTypeInforArray.StartTime));
            this.SelectedDate = ko.observable(AppData.formatDate(data.Date));
            this.ScheduleType = ko.observable('0');//Daily Schedule
            this.ProviderInfo = new Models.ProviderSchedule();
            this.ScheduleDetails = data;
            this.ScheduleInfoArray = (scheduleTypeInforArray) ? scheduleTypeInforArray : undefined;
            $('#w2ui-overlay').find('.close').click();
            this.IsNotStartDateofRecurrence = ko.observable(true);

            if (this.ScheduleStartedDate())
            {
                if (AppData.formatDate(this.SelectedDate()) === AppData.formatDate(this.ScheduleStartedDate()))
                {
                    this.IsNotStartDateofRecurrence = ko.observable(false);
                }
            }
        }

        public Close()
        {
            AppUI.Popup.hideAll();
            CrmData.Common.enableHTMLScroll();
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
                    CrmData.Common.enableHTMLScroll();
                }
            };
            element['showPopup'] = () =>
            {
                if (popupElement)
                {
                    $('.ccx-ui-popup', popupElement).fadeIn('fast');
                    CrmData.Common.disableHTMLScroll();
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
        /*
         * Show weekly schedule popup 
         */
        public ShowSchedule()
        {
            AppUI.Popup.hideAll();
            var element = null;
            var viewContext = null;
            var ViewName = "Scheduling-WeeklySchedule";
            var self = this;
            var ScheduleType: RecurrenceEditType;
            ScheduleType = (this.ScheduleType() == Ccx.Scheduling.ViewModels.RecurrenceEditType.Entire.toString()) ? RecurrenceEditType.Entire : RecurrenceEditType.SelectedDayForward;
            switch (this.ScheduleType())
            {
                case Ccx.Scheduling.ViewModels.RecurrenceEditType.Entire.toString():
                case Ccx.Scheduling.ViewModels.RecurrenceEditType.SelectedDayForward.toString():
                    element = this.showPopup(null, "Edit Schedule");
                    viewContext = new Ccx.Scheduling.ViewModels.WeeklyScheduleViewModel(IScheduleType.RecurringSchedule, this.TimeZoneCode, this.EquipmentId, this.ScheduleDetails, null, null, false, ScheduleType, this.ScheduleInfoArray.ProviderID ,(onsave) =>
                    {
                        if (onsave)
                        {
                            this.OnSave(true);
                        }
                    });
                    break;
                   
                case Ccx.Scheduling.ViewModels.RecurrenceEditType.SingleDay.toString():
                    element = this.showPopup(null, "Set Work Hours and Service Restrictions");
                    viewContext = new Ccx.Scheduling.ViewModels.WeeklyScheduleViewModel(IScheduleType.SingleDaySchedule, this.TimeZoneCode, this.EquipmentId, this.ScheduleDetails, null, null, true, RecurrenceEditType.SingleDay, this.ScheduleInfoArray.ProviderID,(onsave) =>
                    {
                        if (onsave)
                        {
                            this.OnSave(true);                                      
                        }
                    });
                    break;
            }
            $(element).addClass('ccx-page').css('position', 'static');
            $('.ccx-ui-popup-content').css('max-width', '870px');
            App.View.load(
                {
                    ViewName: ViewName,
                    ViewContext: viewContext
                }, element);
            
        }

    }
}
