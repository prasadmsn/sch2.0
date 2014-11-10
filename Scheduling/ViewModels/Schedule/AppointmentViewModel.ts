
module Ccx.Scheduling.ViewModels.Schedule
{

    export interface IAppointmentView
    {
        OnNextClick(): void;
        OnPreviousClick(): void;
        OnRefreshClick(): void;
        ProviderLocations: KnockoutObservableArray<Ccx.Scheduling.ViewModels.Schedule.IProviderLocation>
        HeaderText: KnockoutComputed<string>;
        OnLocationSelected(location: any): void;
    }

    export class AppointmentViewModel
    {
        public ProviderId: KnockoutObservable<string>;
        public CurrentView: KnockoutObservable<IAppointmentView>;
        public CurrentViewName: string;


        constructor(ProviderId: any)
        {
            var self = this;
            self.ProviderId = ko.observable('');
            self.CurrentView = ko.observable(<IAppointmentView>{});
            self.ProviderId(ProviderId);
            self.CurrentViewName = 'Week';
        }

        public selectedView(viewName: string)
        {
            var self = this;
            $(".weekView").addClass(".defaultViewColor");

            if (viewName != '' && viewName.toLowerCase() != self.CurrentViewName)
            {
                switch (viewName.toLowerCase())
                {
                    case 'day'://when day button clicked
                        var viewContext = new Scheduling.ViewModels.Schedule.AppointmentWeeklyViewModel({ providerId: self.ProviderId() });
                        self.CurrentView(viewContext);
                        App.View.load({
                            ViewName: 'Scheduling-Schedule-AppointmentWeekly',
                            ViewContext: viewContext
                        }, document.getElementById('selectedViewContent'));
                        self.CurrentViewName = viewName;
                        break;

                    case 'week'://when Week button clicked
                        var viewContext = new Scheduling.ViewModels.Schedule.AppointmentWeeklyViewModel({ providerId: self.ProviderId() });
                        self.CurrentView(viewContext);
                        App.View.load({
                            ViewName: 'Scheduling-Schedule-AppointmentWeekly',
                            ViewContext: viewContext
                        }, document.getElementById('selectedViewContent'));
                        self.CurrentViewName = viewName;
                        break;

                    case 'month'://when Month button clicked
                        var viewContext = new Scheduling.ViewModels.Schedule.AppointmentWeeklyViewModel({ providerId: self.ProviderId() });
                        self.CurrentView(viewContext);
                        App.View.load({
                            ViewName: 'Scheduling-Schedule-AppointmentWeekly',
                            ViewContext: viewContext
                        }, document.getElementById('selectedViewContent'));
                        self.CurrentViewName = viewName;
                        break;

                    //if none of the cases match then execute this
                    default:
                        var viewContext = new Scheduling.ViewModels.Schedule.AppointmentWeeklyViewModel({ providerId: self.ProviderId() });
                        self.CurrentView(viewContext);
                        App.View.load({
                            ViewName: 'Scheduling-Schedule-AppointmentWeekly',
                            ViewContext: viewContext
                        }, document.getElementById('selectedViewContent'));
                        $(".weekView").addClass(".selectedViewColor");
                }
            }

        }

        public filter(event)
        {
            $('#ddllocations').stop().slideToggle(500);
            //  this.FilteredLocation('');
        }

        public filterAppointmentByLocation(location: any)
        {
            //console.log(" || location: " + JSON.stringify(location));
        }


    }

}
