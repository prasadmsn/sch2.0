var NOUSERINFOFOUND = 'There is no user info found';
var DEFAULTSTART_DATE = '2000-01-01T00:00:00Z';
var DEFAULTEND_DATE = '9999-12-30T00:00:00Z';
var DEFAULT_SCHEDULE_START_TIME = '12:00 AM';
var DEFAULT_SCHEDULE_END_TIME = '12:05 AM';
module Ccx.Scheduling.ViewModels.Provider.WorkHours
{
    export interface IProvider
    {
        ProviderId: string;
        BusinessUnit: string;
        ProviderName: string;
        Timezonecode: number;
    }
    export class LocationViewModel
    {
        private ProviderLocations: string[];
        private providerInformation: IProvider;
        public AgencyLocations: KnockoutObservableArray<Models.ILocations>;
        public SelectedLocation: KnockoutObservable<any>;
        private ParentContext: any;
        public IsSelected: KnockoutObservable<boolean>;
        public IsEnable: KnockoutObservable<boolean>;
        private providerModel: Models.ProviderSchedule;
        private TimeZoneCode: string;
        private IsSaved: boolean;
        constructor(providerLocations: string[], providerId: string, timeZoneCode: string, private OnLocationAdded?: AppData.callback<any>)
        {
            this.TimeZoneCode = (timeZoneCode) ? timeZoneCode : '0';
            this.providerModel = new Models.ProviderSchedule();
            this.AgencyLocations = ko.observableArray([]);
            this.GetProviderDetails(providerId);
            this.SelectedLocation = ko.observable(null);
            this.LoadData(providerLocations);
            this.IsSelected = ko.observable(false);
            this.IsEnable = ko.observable(false);
            this.IsSaved = false;
            //this.resize();
        }

        //private resize()
        //{
        //    (function ($)
        //    {

        //        /**
        //         * Widget makes columns of a table resizable.
        //         */
        //        $.widget("ih.resizableColumns", {

        //            /**
        //             * initializing columns
        //             */
        //            _create: function ()
        //            {
        //                this._initResizable();
        //            },

        //            /**
        //             * init jQuery UI sortable
        //             */
        //            _initResizable: function ()
        //            {

        //                var colElement, colWidth, originalSize;
        //                var table = this.element;

        //                this.element.find("th").resizable({
        //                    // use existing DIV rather than creating new nodes
        //                    handles: {
        //                        "e": " .resizeHelper"
        //                    },

        //                    // default min width in case there is no label
        //                    minWidth: 10,

        //                    // set min-width to label size
        //                    create: function (event, ui)
        //                    {
        //                        var minWidth = $(this).find(".columnLabel").width();
        //                        if (minWidth)
        //                        {

        //                            // FF cannot handle absolute resizable helper
        //                            /*if ($.browser.mozilla) {
        //                                minWidth += $(this).find(".ui-resizable-e").width();
        //                            }*/
        //                            minWidth += $(this).find(".ui-resizable-e").width();

        //                            $(this).resizable("option", "minWidth", minWidth);
        //                        }
        //                    },

        //                    // set correct COL element and original size
        //                    start: function (event, ui)
        //                    {
        //                        var colIndex = ui.helper.index() + 1;
        //                        colElement = table.find("colgroup > col:nth-child(" + colIndex + ")");
        //                        colWidth = parseInt(colElement.get(0).style.width, 10); // faster than width
        //                        originalSize = ui.size.width;
        //                    },

        //                    // set COL width
        //                    resize: function (event, ui)
        //                    {
        //                        var resizeDelta = ui.size.width - originalSize;

        //                        var newColWidth = colWidth + resizeDelta;
        //                        colElement.width(newColWidth);

        //                        // height must be set in order to prevent IE9 to set wrong height
        //                        $(this).css("height", "auto");
        //                    }
        //                });
        //            }

        //        });

        //        // init resizable
        //        $(".resizable").resizableColumns();
        //    })(jQuery);
        //}


        /*
         * Load Locations into Grid
         * @param: Providerlocations => locations associated with the provider already. these locations will be excluded in the result set.
         */
        public LoadData(providerLocations)
        {
            try
            {
                var doneLoading = AppUI.loading('Loading...', 1, $('.scheduling-provider-workhours-addlocation-popup')[0]);
                var providerModel = new Models.ProviderSchedule();
                var self = this;
                providerModel.GetAllLocations(providerLocations, (allLocations) =>
                {
                    this.SelectRow(this);
                    this.AgencyLocations(allLocations);
                    if (this.AgencyLocations().length > 0)
                    {
                        this.IsEnable(true);
                    }
                    else
                    {
                        this.IsEnable(false);
                        CrmData.Common.showMessage("No location found");
                    }

                    doneLoading();
                });
            } catch (ex)
            {
                console.log(ex);
            }
        }

        /*
         * Select Grid row and  set selected location observable property 
         * @param: location
         */
        public SelectRow(location)
        {
            if (location)
            {
                this.SelectedLocation(location);
                if (location.FacilityName)
                {
                    this.IsSelected(true);
                }
                else
                {
                    this.IsSelected(false);
                }
            }

        }

        /*
        * Get Provider details
        * @param: Provider Id (GUID)
        * returns Provider Name,busines unit,
        */
        public GetProviderDetails(providerId: string)
        {
            try
            {
                this.providerModel.GetProviderInformation(providerId, (user) =>
                {
                    if (user[0])
                    {
                        this.providerInformation = <IProvider>{
                            ProviderName: user[0]['fullname'], ProviderId: user[0]['systemuserid'], BusinessUnit: user[0]['businessunitid'], BusinessUnitName: user[0]['businessunitid_name'], Timezonecode: user[0]['usersettings.timezonecode']
                        }
                      }

                });
            }
            catch (ex)
            {
                console.log(ex);
            }
        }

        /*
         * Add facility equipment record to CRM
         * step 1: add the location
         * Step 2: Delete the default calendar
         * Step 3: creates same each day (12.00 AM to 12.01 AM) schedule
         */

        public SavefacilityRecordEquipment()
        {
            try
            {
                var equipment: Models.IEquipments;
                var facilityName: string;
                var self = this;

                facilityName = this.SelectedLocation().FacilityName;

                if (this.providerInformation)
                {

                    equipment = <Models.IEquipments>{
                        ccx_agencylocation: this.SelectedLocation().FacilityId,
                        name: this.providerInformation.ProviderName + '-' + facilityName,
                        ccx_provider: this.providerInformation.ProviderId,
                        businessunitid: this.providerInformation.BusinessUnit,
                        timezonecode: this.providerInformation.Timezonecode,
                        ccx_schedulestatus: false
                    }

            this.providerModel.SaveFacilityEquipment(equipment, (Equipmentid) =>
                    {
                        if (Equipmentid)
                        {
                            
                            if (this.OnLocationAdded)
                            {
                                ////Deleting default calendar rule
                                CrmData.ScheduleData.AddWorkHours(DEFAULTSTART_DATE, DEFAULT_SCHEDULE_START_TIME, DEFAULTEND_DATE, DEFAULT_SCHEDULE_END_TIME, '', '', Equipmentid.toString(), '', parseInt(this.TimeZoneCode), '', 0, false, true, false, DEFAULTEND_DATE, '', -1, (result) =>
                                {
                                    if (result && result.issuccess)
                                    {
                                        CrmData.ScheduleData.AddWorkHours(DEFAULTSTART_DATE, DEFAULT_SCHEDULE_START_TIME, DEFAULTEND_DATE, DEFAULT_SCHEDULE_END_TIME, '', '', Equipmentid.toString(), 'SU,MO,TU,WE,TH,FR,SA', parseInt(this.TimeZoneCode), '', 0, false, false, false, DEFAULTSTART_DATE, '', -1, (isAdded) =>
                                        {
                                            if (isAdded && isAdded.issuccess)
                                            {
                                                this.providerModel.UpdateCalendarStatus(Equipmentid, (isUpdated) =>
                                                {
                                                    CrmData.Common.showMessage("Location added successfully!");
                                                    AppUI.Popup.hideAll();
                                                    CrmData.Common.enableHTMLScroll();
                                                    this.OnLocationAdded(Equipmentid);
                                                });
                                            }
                                        });
                                    }
                                });

                            }
                        }
                        else
                        {
                            CrmData.Common.showMessage("Error");
                        }
                    });
                }
            }
            catch (ex)
            {
                console.log(ex);
            }
        }

        public SaveFacilityEquipementRecord()
        {
            var self = this;
            if (self.AgencyLocations().length > 0 && self.IsSelected())// self.IsEnable())
            {
                if (!self.IsSaved)
                {
                    self.IsSaved = true;
                    AppUI.confirm('Are you sure you want to add this location?',
                        () =>
                        {
                            if (self.IsEnable())
                            {
                                self.IsEnable(false);
                                self.SavefacilityRecordEquipment();
                            }
                        },
                        () =>
                        {
                            self.IsEnable(true);
                            self.IsSaved = false;
                        });
                    setTimeout(() => {
                        $('#w2ui-lock').css('z-index', 99999);
                    }, 200);
                }
            }
            else
            {
                CrmData.Common.showMessage("Please select a location to add.");
            }
        }

        
    }
} 