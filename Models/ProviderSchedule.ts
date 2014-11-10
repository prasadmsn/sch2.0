module Ccx.Scheduling.Models
{
    export interface IWorkHour
    {
        RecurrenceId?: string;
        Reason: string;
        Location: string;
        LocationID?: string;
        Date: Date;
        StartTime: any;
        EndTime: any;
        IsTimeOff?: boolean;
        IsBreak?: boolean;
        EquipmentId?: string;
        CalendarId: string;
        ParentCalendarId?: string;
        Pattern?: string;
        ScheduleInfoStartTime?: Date;
        TimezoneCode?: string;
        EffectiveIntervalEnd?: Date;
        IsVaried?: boolean;
        GroupDesignator?: string;
        LinkID?: string;
    }

    export interface IEquipments
    {
        name: string;
        equipmentid?: string;
        ccx_agencylocation?: string;
        ccx_agencylocation_name?: string;
        ccx_provider?: string;
        businessunitid?: string;
        timezonecode?: number;
        ccx_schedulestatus?: boolean;
        calendarid?: string;
    }

    export interface ILocations
    {
        FacilityId: string;
        FacilityName: string;
        Createdon?: string;
        OfficeAddress?: string;
        MainPhone?: string;
        FacilityShortName?: string;
    }

    export interface ICalendarRules
    {
        CalendarId: string;
        CalendarRules: CrmData.ScheduleInfos[];
    }

    export interface ICalendarIdMappings
    {
        CalendarId: string;
        InnerCalendarId: string;
        Pattern: string;
        StartTime: Date;
        TimezoneCode: string;
        EffectiveIntervalEnd?: Date;
        IsVaried?: boolean;
        GroupDesignator?: string;
    }

    export class ProviderSchedule extends AppData.Model
    {
        constructor()
        {
            super();
        }

        public UpdateCalendarStatus(EquipmentID: AppData.IUniqueidentifier, callback: AppData.callback<any>)
        {
            this.DataAccess.update({'ccx_schedulestatus':false}, 'equipment', EquipmentID, callback); 

        }

        public GetCalendar(calendarid: string, callback: AppData.callback<any>)
        {
            CrmData.ScheduleData.GetCalendar(calendarid, callback);
        }
        public GetCalenderId(equipmentid: string, callback: AppData.callback<any>)
        {
            try
            {
                this.DataAccess.query('equipment')
                    .select('calendarid')
                    .where('equipmentid', AppData.ExpressionOperator.Equals, equipmentid)
                    .execute(callback);
            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }

        /*
        * Get timezone
        */
        public GetTimeZone(callback: AppData.callback<AppUI.IListItem[]>)
        {
            try
            {
                var timeZones = <AppUI.IListItem[]>[];
                this.DataAccess.query('timezonedefinition')
                    .select('userinterfacename', 'timezonecode')
                    .orderBy('userinterfacename')
                    .execute(<IDataServicesProviders>(timezone) =>
                    {
                        timezone.forEach(function (elem, i, array)
                        {
                            timeZones.push(<AppUI.IListItem>{
                                Text: (elem.userinterfacename) ? elem.userinterfacename : "No time zone name found",
                                Value: <any>elem.timezonecode
                            });
                        });
                        callback(timeZones);
                    });
            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }

        /*
         * Get Facility/Equipment Record GUIDs associated with a provider
         * @param:Provider Id
         */
        public GetFacilityEquipmentResourceIds(providerId: string, callback: AppData.callback<IEquipments[]>)
        {
            try
            {
                this.DataAccess.query('equipment')
                    .select('equipmentid', 'name', 'ccx_agencylocation', 'calendarid')
                    .where('ccx_provider', AppData.ExpressionOperator.Equals, providerId)
                    .where('ccx_schedulestatus', AppData.ExpressionOperator.Equals, true) //Value should be changed to true once existing records updated
                    .execute(callback);
            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }

        /*
         * Get ccxagency locations that a provider is associated
         * @param: Provider id
         */
        public GetProviderLocations(providerId: string, callback: AppData.callback<any[]>)
        {
            try
            {
                this.DataAccess.query('equipment')
                    .select('ccx_agencylocation', 'equipmentid', 'ccx_schedulestatus')
                    .where('ccx_provider', AppData.ExpressionOperator.Equals, providerId)
                    .execute(callback);
            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }

        public GetFaciliytName(equipmentId: string, callback: AppData.callback<any>)
        {
            try
            {
              this.DataAccess.single('equipment', equipmentId, callback);
            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }
        
        /*
         * Map all Agency locations to Ilocation and return the results
         */
        public GetAllLocations(providerLocations: any[], callback: (results: any[]) => void)
        {
            try
            {
                this.GetLocations(providerLocations, (results) =>
                {
                    callback(AppData.select(results, (l) =>
                    {
                        return <ILocations>{
                            FacilityId: l['ccx_agencylocationid'],
                            FacilityName: l['ccx_name'],
                            OfficeAddress: (l['ccx_agencylocationaddress.ccx_addresstype']) ? ((l['ccx_agencylocationaddress.ccx_addresstype'] != '100000000') ? ((l['ccx_agencylocationaddress.ccx_line1']) ? l['ccx_agencylocationaddress.ccx_line1'] : '') + ((l['ccx_agencylocationaddress.ccx_city']) ? (', ' + l['ccx_agencylocationaddress.ccx_city']) : '') + ((l['ccx_agencylocationaddress.ccx_state']) ? (', ' + l['ccx_agencylocationaddress.ccx_state']) : '') + ((l['ccx_agencylocationaddress.ccx_postalcode']) ? (', ' + l['ccx_agencylocationaddress.ccx_postalcode']) : '') : '') : l['ccx_agencylocationaddress.ccx_name'],
                            MainPhone: l['ccx_agencylocationaddress.ccx_telephone1']
                        };
                    }));
                });
            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }
        /*
         * Get all agency locations, exclude the provider associated locations from the result
         */
        public GetLocations(providerLocations: any[], callback: AppData.callback<any[]>)
        {
            try
            {
                if (providerLocations)
                {
                    this.DataAccess.query('ccx_agencylocation')
                        .select('ccx_agencylocationid', 'ccx_name', 'createdon')
                        .orderBy('ccx_name', false)
                        .where('ccx_name', AppData.ExpressionOperator.NotIn, providerLocations)
                        .join('ccx_agencylocationaddress', 'ccx_parentid', 'ccx_agencylocationid')
                        .select('ccx_name', 'ccx_telephone1', 'ccx_addresstype', 'ccx_line1', 'ccx_city', 'ccx_state', 'ccx_postalcode')
                        .execute(callback);
                }
                else
                {
                    this.DataAccess.query('ccx_agencylocation')
                        .select('ccx_agencylocationid', 'ccx_name', 'createdon')
                        .orderBy('ccx_name', false)
                        .join('ccx_agencylocationaddress', 'ccx_parentid', 'ccx_agencylocationid')
                        .select('ccx_name', 'ccx_telephone1', 'ccx_addresstype', 'ccx_line1', 'ccx_city', 'ccx_state', 'ccx_postalcode')
                        .execute(callback);
                }
            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }

        /*
         * Get Provider details from User and User Settings Entity
         */
        public GetProviderInformation(providerId: string, callback: AppData.callback<any>)
        {
            try
            {
                this.DataAccess.query('systemuser')
                    .where('systemuserid', AppData.ExpressionOperator.Equals, providerId)
                    .select('fullname', 'systemuserid', 'businessunitid', 'photourl', 'title')
                    .join('usersettings', 'systemuserid', 'systemuserid')
                    .select('timezonecode')
                    .execute(callback);
            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }

        /*
         * Map CalendarId and InnerCalendarId from Calendar rules Collection
         */
        public LoadCalendarIdMappings(rulesCollection: any)
        {
            var CalendIdMappingArray: ICalendarIdMappings[];
            CalendIdMappingArray = [];
            if (rulesCollection)
            {
                $.each(rulesCollection, (i, rules) =>
                {
                    if (rules.scheduleInfo)
                    {
                        $.each(rules.scheduleInfo, (j, rule) =>
                        {
                            if (CalendIdMappingArray.length > 0)
                            {
                                var existingCount = AppData.where(CalendIdMappingArray, (r) => { return r.InnerCalendarId === rule['innercalendarid'] });
                                if (existingCount.length === 0)
                                {
                                    CalendIdMappingArray.push(<ICalendarIdMappings>{
                                        CalendarId: rule['calendarid'],
                                        InnerCalendarId: rule['innercalendarid'],
                                        Pattern: rule['pattern'],
                                        StartTime: rule['starttime'],
                                        GroupDesignator: rule['groupdesignator'],
                                        EffectiveIntervalEnd: rule['effectiveintervalend'],
                                        TimezoneCode: rule['timezonecode'],
                                        IsVaried: (rule['isvaried'])? rule['isvaried'] : false
                                    });
                                }
                            }
                            else
                            {
                                CalendIdMappingArray.push(<ICalendarIdMappings>{
                                    CalendarId: rule['calendarid'],
                                    InnerCalendarId: rule['innercalendarid'],
                                    Pattern: rule['pattern'],
                                    StartTime: rule['starttime'],
                                    GroupDesignator: rule['groupdesignator'],
                                    EffectiveIntervalEnd: rule['effectiveintervalend'],
                                    TimezoneCode: rule['timezonecode'],
                                    IsVaried: (rule['isvaried']) ? rule['isvaried'] : false
                                });
                            }
                        });
                    }
                });
            }

            return CalendIdMappingArray;
        }

        /*
         * Get Provider work Hours from Facilty/Equipment entity calendar
         * @param: locations : Provider associated locations with Resource ids, start date, end date
         */
        public GetProviderWorkHours(locations: IEquipments[], startDate: Date, endDate: Date, callback: (results: IWorkHour[]) => void)
        {
            try
            {
                //Get Calendar rules for Locations.
                var CalendarRulesArray: ICalendarRules[];
                CalendarRulesArray = [];
                var Rules: any[];
                Rules = [];
                var CalendarInnerCalendarIdMappings: ICalendarIdMappings[];
                CalendarInnerCalendarIdMappings = [];
                var locCount = 0;
                if (locations)
                {
                    $.each(locations, (i, loc) =>
                    {
                        this.GetCalendar(loc.calendarid, (calendarRules) =>
                        {
                            CalendarRulesArray.push(<ICalendarRules>{
                                CalendarId: loc.calendarid,
                                CalendarRules: calendarRules
                            });

                            Rules.push(calendarRules);
                            
                            locCount++;
                            if (locCount === locations.length)
                            {
                                CALENDAR_RULES_COLLECTION = CalendarRulesArray;
                                CalendarInnerCalendarIdMappings = this.LoadCalendarIdMappings(Rules);
                                //console.log(CalendarInnerCalendarIdMappings);
                                var resourceIds = AppData.select(locations, (l) => l.equipmentid);
                                CrmData.ScheduleData.QueryMultipleSchedulesRequest(resourceIds, startDate, endDate, CrmData.TimeCode.Available, (results) =>
                                {
                                    var allResults = [];
                                    $.each(results.TimeInfos, (i, locationTimes) =>
                                    {
                                        var locationName = '';
                                        var locationId = '';
                                        //if (locations[i])
                                        //{
                                        //locationName = locations[i].ccx_agencylocation_name;
                                        $.each(locationTimes, (i, t) =>
                                        {
                                            if (t.ActivityStatusCode.toString() !== "4")
                                            {
                                            var calendarRule = AppData.where(CalendarInnerCalendarIdMappings, (m) => { return m.InnerCalendarId === t.CalendarId })[0];
                                            locationName = AppData.where(locations, (l) => {return l.calendarid === calendarRule.CalendarId })[0].ccx_agencylocation_name;
                                            locationId = AppData.where(locations, (l) => {return l.calendarid === calendarRule.CalendarId })[0].ccx_agencylocation;

                                            allResults.push(<IWorkHour>{
                                                RecurrenceId: (calendarRule.IsVaried) ? calendarRule.GroupDesignator + '-' + AppData.formatDate(calendarRule.StartTime).toString().replace('/', '-').replace('/', '-') : calendarRule.InnerCalendarId,
                                                LinkID: (calendarRule.IsVaried) ? calendarRule.GroupDesignator +locationId+ '-' + AppData.formatDate(calendarRule.StartTime).toString().replace('/', '-').replace('/', '-') : calendarRule.InnerCalendarId,
                                                Reason: t.DisplayText,
                                                Location: locationName,
                                                LocationID:locationId,
                                                Date: t.Start,
                                                StartTime: t.Start,
                                                EndTime: t.End,
                                                CalendarId: t.CalendarId,
                                                IsTimeOff: (t.SubCode == CrmData.SubCode.Vacation),
                                                IsBreak: (t.SubCode == CrmData.SubCode.Break),
                                                Pattern: calendarRule.Pattern,
                                                ParentCalendarId: calendarRule.CalendarId,
                                                EffectiveIntervalEnd: (calendarRule.EffectiveIntervalEnd) ? calendarRule.EffectiveIntervalEnd : null,
                                                ScheduleInfoStartTime: calendarRule.StartTime,
                                                TimezoneCode: calendarRule.TimezoneCode,
                                                GroupDesignator: calendarRule.GroupDesignator,
                                                IsVaried: calendarRule.IsVaried
                                            });
                                            }
                                        });
                                        //}
                                    });
                                    callback(allResults);
                                });
                                return;
                            }
                        });
                    });
                }
            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
                return;
            }
        }

        public GetProviderWorkHourForEdit(locationId: string, locationName: string, startDate: Date, endDate: Date, callback: (results: any[]) => void)
        {
            try
            {
                CrmData.ScheduleData.QueryUserWorkHours([locationId], startDate, endDate, (results) =>
                {
                    var allResults = [];

                    $.each(results.TimeInfos, (i, timeInfo) =>
                    {
                        $.each(timeInfo, (j, t) =>
                        {
                            allResults.push(<IWorkHour>{
                                RecurrenceId: '',
                                Reason: t.DisplayText,
                                Location: locationName,
                                Date: t.Start,
                                StartTime: t.Start,
                                EndTime: t.End,
                                CalendarId: t.CalendarId,
                                IsTimeOff: (t.SubCode == CrmData.SubCode[CrmData.SubCode.Vacation]),
                                IsBreak: (t.SubCode == CrmData.SubCode[CrmData.SubCode.Break])
                            });
                        });
                    });

                    callback(allResults);
                });
            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }

        /*
         * Add new facility equipment record to Facility/equipment entity.
         * @param: Equipment Interface ( Required Fields: name,businessunitid,providerid,timezonecode
         */
        public SaveFacilityEquipment(equipment: IEquipments, callback: AppData.callback<AppData.IUniqueidentifier>)
        {
            try
            {
                this.DataAccess.create(equipment, "equipment", (id) =>
                {
                    equipment.equipmentid = id.toString();
                    callback(id);
                });
            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }
    }
} 