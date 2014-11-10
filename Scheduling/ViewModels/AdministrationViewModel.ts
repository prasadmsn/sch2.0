module Ccx.Scheduling.ViewModels
{
    export class AdministrationViewModel
    {
        public SelectedView: KnockoutObservable<string>;
        public CalendarSubMenuVisibility: KnockoutObservable<boolean>;
        public IsManualSchedulerVisible: KnockoutObservable<boolean>;
        private clicks: number;
        private timer: any;
        constructor()
        {
            this.SelectedView = ko.observable('');
            this.CalendarSubMenuVisibility = ko.observable(false);
            this.IsManualSchedulerVisible = ko.observable(this.CalendarSubMenuVisibility());
            this.clicks = 0;
            CrmData.SingletonClass.setDocumentClickHandler();           
        }

        /*
         * Display Calendar Sub Menus
         */
        public SetCalendarSubMenuVisibility()
        {
            this.CalendarSubMenuVisibility(true);
            this.LoadView('Scheduling-ProviderProfileDisplay', 'LeftPanelTargetContainer', new ProviderProfileViewModel());
        }

        /*
         * Hide Sub menus and clear the left panel target container
         */
        public SetSubMenusVisibility()
        {
            this.CalendarSubMenuVisibility(false);
            $("#LeftPanelTargetContainer").empty();
        }

        /*
         * Load view utility funtion
         */
        public LoadView(viewName: string, targetContainer: any, viewContext?: any)
        {
            App.View.load({
                ViewName: viewName,
                ViewContext: viewContext
            }, document.getElementById(targetContainer));
        }
    }
}