var LOCATION_ORIGIN = document.location.href.substring(0, document.location.href.indexOf(document.location.pathname)); //since location.origin is not available in the lib.
var IMAGE_URL = "https://scheduling.cocentrix.com/Image/download.aspx?Entity=systemuser&Attribute=entityimage&Id=";
var EDIT_PROFILE_URL = "/main.aspx?etc=8&pagetype=entityrecord&id=";
module Ccx.Scheduling.ViewModels
{
    export class ProviderProfileViewModel
    {
        public SearchLabel: KnockoutObservable<string>;
        public SearchExpression: KnockoutObservable<string>;
        public InFormulary: KnockoutObservable<boolean>;
        private provider: Models.ProviderSearch;
        private selectedMedication: Models.IDataServicesProviders[];
        private PrevProviderName: string;
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
        constructor()
        {
            this.ProviderSearchvalue = ko.observable('');
            this.ProviderSearchVisibility = ko.observable(true);
            this.ProviderDetailsVisibility = ko.observable(false);
            this.SearchLabel = ko.observable('');
            this.SearchExpression = ko.observable('');
            this.TimezoneCode = ko.observable('');
            this.InFormulary = ko.observable(true);
            this.provider = new Models.ProviderSearch();
            this.IsSmartSearchEnabled = ko.observable(true);
            this.isProviderSelected = ko.observable(Boolean(this.SearchExpression()));
            this.IsSearching = ko.observable(false);
            this.ProviderName = ko.observable('');
            this.ProviderFullName = ko.observable('');
            this.ProviderId = ko.observable('');
            this.ProviderImageUrl = ko.observable(LOCATION_ORIGIN + '/_imgs/ContactPhoto.png');
            this.ProviderProfileUrl = ko.observable('');
            this.ProviderTitle = ko.observable('');
        }
        /// <summary>Search provider</summary>
        /// <param name="search" type="string">provider name to search</param>
        /// <returns type="boolean" />
        public ProviderSearch(search: string, callback: AppData.callback<AppUI.IListItem[]>): boolean
        {
            this.provider.GetProviders(search, (list: AppUI.IListItem[]) =>
            {
                this.validateResults(list, callback);
            });
            return true;
        }
        /// <summary>show calander view</summary>
        public ShowCalendar()
        {
            var viewContext = new Provider.WorkHours.CalendarViewModel({
                providerId: this.ProviderId(),
                timezonecode: this.TimezoneCode()
            });  //Need to replace GUID

            App.View.load({
                ViewName: 'Scheduling-Provider-WorkHours-CalendarView',
                ViewContext: viewContext
            }, document.getElementById('divRight-tab'));
        }

        public ShowServicesUI() {
            var viewContext = new CalendarAdministrationMyServicesViewModel();  //Need to replace GUID

            App.View.load({
                ViewName: 'Scheduling-CalendarAdministrationMyServices',
                ViewContext: viewContext
            }, document.getElementById('divRight-tab'));
        }
        
        /* Clear the calendar view */
        private ClearAppointmentView()
        {
            $('#divRight-tab').empty();
        }
        /*Load calendarview*/
        public ShowAppointments()
        {

            // App.Navigation.go('Scheduling-Provider-WorkHours-CalendarView', new Ccx.Scheduling.ViewModels.Provider.WorkHours.CalendarViewModel({providerId:providerID}), false);
            var viewContext = new Ccx.Scheduling.ViewModels.Schedule.AppointmentViewModel(this.ProviderId());  //Need to replace GUID

            App.View.load({
                ViewName: 'Scheduling-Schedule-AppointmentView',
                ViewContext: viewContext
            }, document.getElementById('divRight-tab'));

            viewContext.selectedView('month');
            $(".weekView").css("background", "#A7CDF0");
        }


        private onProviderSelected() {//name: string, drug: Models.IDataServicesDispensableDrug, fullOrder: Models.IDataServicesFullMedOrder) {
            var findFDBId = (fdbId: number, lookup: any[]): string => {   // find dose unit, freq, route by fdb correlation id
                var match = $.grep(lookup, function (item) {
                    return (item["Id"] == fdbId);
                });
                if (match.length > 0)
                {
                    return match[0]["Value"];
                }
                else
                {
                    return null;
                }
            }
        }
        /// <summary>on change of provider selection</summary>
        /// <param name="item" type="any">selected list object</param>
        /// <param name="callback" type="function">callbackfunction</param>
        /// <returns type="boolean" />
        public SelectItem(item: any, callback?: AppData.callback<AppUI.IListItem[]>): boolean
        {
            if (item)
            {
                var meds = <Models.IDataServicesProviders[]>item.Value;
                this.selectedMedication = meds;
                this.SearchExpression(item.Text);
                this.IsSmartSearchEnabled(true);
                this.IsSearching(false);
                $('.lookup').blur();
                callback(item);
                this.ClearAppointmentView();
                this.ViewProviderDetails(item);
                return true;
            }
        }

        /// <summary>bind provider details</summary>
        /// <param name="profileInfo" type="any">provider's profile info</param>

        public ViewProviderDetails(profileInfo: any)
        {
            this.ProviderDetailsVisibility(true);
            this.ProviderSearchVisibility(false);
            this.ProviderSearchvalue('');
            this.ProviderName(profileInfo.Text);
            this.BindProviderDetails(profileInfo.Value);
            
        }
        /// <summary>validating result </summary>
        /// <param name="list" type="AppUI.IListItem[]">provider's profile info</param>
        /// <param name="callback" type="function">callbackfunction</param>
        private validateResults(list: AppUI.IListItem[], callback?: AppData.callback<AppUI.IListItem[]>)
        {
            if (list.length == 0 && this.PrevProviderName)
            {
                CrmData.Common.showMessage('No Results Found. Selecting previous provider.', 5);
                this.SearchExpression(this.PrevProviderName);
                $('.lookup').blur();    // force lookup to close
            }
            else
            {
                callback(list);
            }
        }
        /// <summary>bind provider detail </summary>
        /// <param name="providerId" type="string">provider id</param>
        public BindProviderDetails(providerId: string)
        {
            var Model = new Models.ProviderSchedule();

            Model.GetProviderInformation(providerId, (Provider) =>
            {
                this.ProviderFullName(Provider[0]['fullname']);
                this.ProviderTitle(Provider[0]['title']);
                this.ProviderId(providerId);
                this.ProviderImageUrl(IMAGE_URL + providerId);
                this.ProviderProfileUrl(EDIT_PROFILE_URL + providerId);
                this.TimezoneCode(Provider[0]['usersettings.timezonecode']);
            });
        }

        public ShowWeeklyAppointments()
        {
            var viewContext = new Scheduling.ViewModels.Schedule.AppointmentWeeklyViewModel({ providerId: this.ProviderId()});  //Need to replace GUID

            App.View.load({
                ViewName: 'Scheduling-Schedule-AppointmentWeekly',
                ViewContext: viewContext
            }, document.getElementById('divRight-tab'));
        }
    }
}