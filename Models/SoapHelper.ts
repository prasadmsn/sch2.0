declare var XrmServiceToolkit;

module CrmData
{
    export interface IQueryMultipleSchedulesResponse
    {
        TimeInfos: {
            ActivityStatusCode: number;
            CalendarId: string;
            DisplayText: string;
            Effort: number;
            End?: Date;
            IsActivity: boolean;
            SourceId: string;
            SourceTypeCode: number;
            Start?: Date;
            SubCode: SubCode;
            TimeCode: TimeCode;
        }[][];
    }
    export interface ScheduleInfos
    {
        calendarid: string;
        calendarruleid: string;
        innercalendarid: string;
        starttime: Date;
        timezonecode: string;
        pattern: string;
        effectiveintervalend?: Date;
        isvaried?: boolean;
        groupdesignator?: string;

    }

    export enum SubCode
    {
        Unspecified = 0,
        Schedulable = 1,
        Committed = 2,
        Uncommitted = 3,
        Break = 4,
        Holiday = 5,
        Vacation = 6,
        Appointment = 7,
        ResourceStartTime = 8,
        ResourceServiceRestriction = 9,
        ResourceCapacity = 10,
        ServiceRestriction = 11,
        ServiceCost = 12
    }

    export enum TimeCode
    {
        Available = 0,
        Busy = 1,
        Unavailable = 2,
        Filter = 3
    }

    export class ScheduleData
    {
        static QueryMultipleSchedulesRequest(resourceIds: string[], startDate: Date, endDate: Date, timeCode: TimeCode, callback: AppData.callback<IQueryMultipleSchedulesResponse>)
        {
            try
            {
                SoapHelper.soapExecuteRequest('QueryMultipleSchedulesRequest', {
                    ResourceIds: { type: 'guid', value: resourceIds },
                    Start: { type: 'dateTime', value: startDate },
                    End: { type: 'dateTime', value: endDate },
                    TimeCodes: { type: 'TimeCode', value: [TimeCode[timeCode]] }
                }, callback);
            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }
        static AddWorkHours(startDate: string, startTime: string, endDate: string, endTime: string, breakStartTime: string, breakEndTime: string, equipmentid: string, days: string, timezonecode: number, innercalid: string, typecode: number, isedit: boolean, isdelete: boolean, observe: boolean, selecteddate: string, vbdpattern: string, recsubtype: number, callback: AppData.callback<any>)
        {
            try
            {
                SoapHelper.soapExecuteRequest('ccx_Schedule', {
                    startDate: { type: 'dateTime', value: startDate },
                    endDate: { type: 'dateTime', value: endDate },
                    equipment: { type: 'EntityReference', value: equipmentid, logicalName: 'equipment' },
                    startTime: { type: 'string', value: startTime },
                    endTime: { type: 'string', value: endTime },
                    breakStartTime: { type: 'string', value: breakStartTime },
                    breakEndTime: { type: 'string', value: breakEndTime },
                    days: { type: 'string', value: days },
                    timezonecode: { type: 'int', value: timezonecode },
                    Typecode: { type: 'int', value: typecode },
                    isedit: { type: 'boolean', value: isedit },
                    isdelete: { type: 'boolean', value: isdelete },
                    observe: { type: 'boolean', value: observe },
                    Innercalid: { type: 'string', value: innercalid },
                    selectedDate: { type: 'dateTime', value: selecteddate },
                    vbdpattern: { type: 'string', value: vbdpattern },
                    recSubType: { type: 'int', value: recsubtype }

                }, callback);

            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }

        static DeleteSchedule(equipmentId: string, innerCalendarId: string, typecode: number, selecteddate: string, recsubtype: number, callback: AppData.callback<any>)
        {
            SoapHelper.soapExecuteRequest('ccx_Schedule', {
                startDate: { type: 'dateTime', value: $.datepicker.formatDate('yy-mm-dd', new Date()) },
                endDate: { type: 'dateTime', value: $.datepicker.formatDate('yy-mm-dd', new Date()) },
                equipment: { type: 'EntityReference', value: equipmentId, logicalName: 'equipment' },
                startTime: { type: 'string', value: '08:00 AM' },
                endTime: { type: 'string', value: '08:00 AM' },
                breakStartTime: { type: 'string', value: '' },
                breakEndTime: { type: 'string', value: '' },
                days: { type: 'string', value: '' },
                timezonecode: { type: 'int', value: '35' },
                Typecode: { type: 'int', value: typecode },
                isedit: { type: 'boolean', value: false },
                isdelete: { type: 'boolean', value: true },
                observe: { type: 'boolean', value: false },
                Innercalid: { type: 'string', value: innerCalendarId },
                selectedDate: { type: 'dateTime', value: selecteddate },
                vbdpattern: { type: 'string', value: '' },
                recSubType: { type: 'int', value: recsubtype }
            }, callback);
        }

        static DeleteSingleDaySchedule(equipmentId: string, startDate: string, innerCalendarId: string, typecode: number, selecteddate: string, recsubtype: number, callback: AppData.callback<any>)
        {
            SoapHelper.soapExecuteRequest('ccx_Schedule', {
                startDate: { type: 'dateTime', value: $.datepicker.formatDate('yy-mm-dd', new Date()) },
                endDate: { type: 'dateTime', value: $.datepicker.formatDate('yy-mm-dd', new Date()) },
                equipment: { type: 'EntityReference', value: equipmentId, logicalName: 'equipment' },
                startTime: { type: 'string', value: '08:00 AM' },
                endTime: { type: 'string', value: '08:00 AM' },
                breakStartTime: { type: 'string', value: '' },
                breakEndTime: { type: 'string', value: '' },
                days: { type: 'string', value: '' },
                timezonecode: { type: 'int', value: '35' },
                Typecode: { type: 'int', value: typecode },
                isedit: { type: 'boolean', value: false },
                isdelete: { type: 'boolean', value: true },
                observe: { type: 'boolean', value: false },
                Innercalid: { type: 'string', value: innerCalendarId },
                selectedDate: { type: 'dateTime', value: selecteddate },
                vbdpattern: { type: 'string', value: '' },
                recSubType: { type: 'int', value: recsubtype }
            }, callback);
        }
        static QueryUserWorkHours(resourceIds: string[], startDate: Date, endDate: Date, callback: AppData.callback<IQueryMultipleSchedulesResponse>)
        {
            try
            {
                SoapHelper.soapExecuteRequest('QueryMultipleSchedulesRequest', {
                    ResourceIds: { type: 'guid', value: resourceIds },
                    Start: { type: 'dateTime', value: new Date(startDate.setHours(0)) },
                    End: { type: 'dateTime', value: new Date(endDate.setHours(23, 59)) },
                    TimeCodes: { type: 'TimeCode', value: [TimeCode[CrmData.TimeCode.Available], TimeCode[CrmData.TimeCode.Unavailable]] }
                }, callback);
            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }

        static GetCalendar(calendarid: string, callback: AppData.callback<any>)
        {
            try
            {
                var request = "<fetch version='1.0' output-format='xml - platform' mapping='logical'><entity name='calendar'><filter type='and'>" +
                    "<condition attribute='calendarid' operator='eq' value='" + calendarid + "'/></filter><all-attributes/></entity></fetch>";
                SoapHelper.soapExecuteRequest('RetrieveMultipleRequest', {
                    Query: { type: 'FetchExpression', value: request }
                }, callback);
            }
            catch (ex)
            {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }
    }

    export class SoapHelper
    {
        static soapExecuteRequest<T>(actionName: string, parameters: { [key: string]: ICustomActionParameter }, callback: AppData.callback<T>)
        {
            var requestXML = [];

            requestXML.push('<request xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts"');
            requestXML.push('         xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic"');
            requestXML.push('         xmlns:c="http://schemas.microsoft.com/crm/2011/Contracts"');
            requestXML.push('         xmlns:d="http://www.w3.org/2001/XMLSchema"');
            requestXML.push('         xmlns:e="http://www.w3.org/2001/XMLSchema-instance"');
            requestXML.push('         xmlns:f="http://schemas.microsoft.com/2003/10/Serialization/Arrays">');
            requestXML.push('<a:Parameters>');

            var dTypes = ['int', 'decimal', 'double', 'boolean', 'dateTime', 'string', 'guid'];

            $.each(parameters, function (key, param: ICustomActionParameter)
            {
                requestXML.push('<a:KeyValuePairOfstringanyType>');
                requestXML.push('<b:key>' + key + '</b:key>');
                if (param.type == 'EntityReference' || param.type == 'a:EntityReference') //TODO: remove a: prefix from callers (Technical_Debt)
                {
                    requestXML.push('<b:value e:type="a:EntityReference">');
                    requestXML.push('<a:Id>' + param.value + '</a:Id>');
                    requestXML.push('<a:LogicalName>' + param.logicalName + '</a:LogicalName>');
                    requestXML.push('<a:Name e:nil="true" />');
                    requestXML.push('</b:value>');
                }
                else if (param.type == 'OptionSetValue')
                {
                    requestXML.push('<b:value e:type="a:OptionSetValue">');
                    requestXML.push('<a:Value>' + param.value + '</a:Value>');
                    requestXML.push('</b:value>');
                }
                else if (param.type == 'FetchExpression' || param.type == 'a:FetchExpression')
                {
                    requestXML.push('<b:value e:type="a:FetchExpression">');
                    requestXML.push('<a:Query>' + SoapHelper.encodeValue(param.value) + '</a:Query>');
                    requestXML.push('</b:value>');
                }
                else if (param.type)
                {
                    var isCrmType = (param.type.charAt(0).toUpperCase() == param.type.charAt(0));
                    var isPrimType = ($.inArray(param.type, dTypes) > -1);
                    if ($.isArray(param.value))
                    {
                        var typePrefix = (isPrimType ? 'f:' : isCrmType ? 'c:' : 'f:');
                        var itemType = typePrefix + param.type;
                        var arrayType = typePrefix + 'ArrayOf' + param.type;
                        requestXML.push('<b:value e:type="' + arrayType + '">');
                        $.each(param.value, function (i, item)
                        {
                            requestXML.push('<' + itemType + '>');
                            requestXML.push(SoapHelper.encodeValue(item));
                            requestXML.push('</' + itemType + '>');
                        });
                        requestXML.push('</b:value>');
                    }
                    else
                    {
                        var typePrefix = (isPrimType ? 'd:' : isCrmType ? 'c:' : 'f:');
                        var itemType = typePrefix + param.type;
                        requestXML.push('<b:value e:type="' + itemType + '">');
                        requestXML.push(SoapHelper.encodeValue(param.value));
                        requestXML.push('</b:value>');
                    }
                }
                else
                {
                    var type = 'd:' + SoapHelper.getValueType(param.value);
                    requestXML.push('<b:value e:type="' + type + '">');
                    requestXML.push(SoapHelper.encodeValue(param.value));
                    requestXML.push('</b:value>');
                }
                requestXML.push('</a:KeyValuePairOfstringanyType>');
            });

            requestXML.push("</a:Parameters>");
            requestXML.push("<a:RequestId e:nil=\"true\" />");
            if (actionName.indexOf('ccx_') == 0)
            {
                requestXML.push("<a:RequestName>" + actionName + "</a:RequestName>");
            }
            else
            {
                requestXML.push("<a:RequestName>" + actionName.replace('Request', '') + "</a:RequestName>");
            }
            requestXML.push("</request>");

            XrmServiceToolkit.Soap.Execute(requestXML.join(''), (responseXML) =>
            {
                var result = {};
                if (actionName === "RetrieveMultipleRequest")
                {
                    var itemCollection = [];
                    var nodes = $(responseXML).find("a\\:Entities a\\:Entity a\\:Attributes a\\:Entities a\\:Entity,Entities Entity Attributes Entities Entity");
                    nodes.each((i, n) =>
                    {
                        var node = $(n);
                        var attributes = node.find("a\\:attributes, attributes");
                        attributes.each((k, nd) =>
                        {
                            var keyvaluePair = $(nd).find("a\\:KeyValuePairOfstringanyType, KeyValuePairOfstringanyType");
                            var item: any;
                            item = {};
                            keyvaluePair.each((m, s) =>
                            {
                                var pair = $(s);
                                var key = pair.find('b\\:key, key').text();//second selector is for chrome
                                var valueNodes = pair.find('b\\:value, value');//second selector is for chrome

                                switch (key.toLowerCase())
                                {
                                    case "calendarid":
                                       
                                        var value = valueNodes.find('a\\:id, id');
                                        item.calendarid = SoapHelper.convertValue(value.text());
                                        break;
                                    case "calendarruleid":
                                        item.calendarruleid = SoapHelper.convertValue(valueNodes.text());
                                        break;
                                    case "innercalendarid":
                                        var value = valueNodes.find('a\\:id, id');
                                        item.innercalendarid = SoapHelper.convertValue(value.text());
                                        break;
                                    case "starttime":
                                        //item.starttime = SoapHelper.convertValue(valueNodes.text());
                                        var d = new Date(valueNodes.text());
                                        d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
                                        item.starttime = new Date(d.getFullYear(), d.getMonth(), d.getDate());
                                        break;
                                    case "timezonecode":
                                        item.timezonecode = SoapHelper.convertValue(valueNodes.text());
                                        break;
                                    case "effectiveintervalend":
                                        item.effectiveintervalend = SoapHelper.convertValue(valueNodes.text());
                                        break;
                                    case "isvaried":
                                        item.isvaried = SoapHelper.convertValue(valueNodes.text());
                                        break;
                                    case "pattern":
                                        item.pattern = SoapHelper.convertValue(valueNodes.text());
                                        break;
                                    case "groupdesignator":
                                        item.groupdesignator = SoapHelper.convertValue(valueNodes.text());
                                        break;
                                }
                            });
                            if (item)
                            {
                                itemCollection.push(item);
                            }
                        });
                    });
                    if (itemCollection.length > 0)
                    {
                        result["scheduleInfo"] = itemCollection;
                    }
                }
                else
                {
                    var nodes = $(responseXML).find('a\\:Results a\\:KeyValuePairOfstringanyType, KeyValuePairOfstringanyType');//second selector is for chrome
                    nodes.each((i, n) =>
                    {
                        var node = $(n);
                        var key = node.find('b\\:key, key').text();//second selector is for chrome
                        var valueNodes = node.find('b\\:value, value');//second selector is for chrome
                        if (valueNodes[0] && valueNodes[0].childNodes[0] && valueNodes[0].childNodes[0].nodeType == 1)
                        {
                            if (valueNodes[0].childNodes[0].nodeName.indexOf('ArrayOf') > -1)
                            {
                                if (valueNodes[0].childNodes.length > 0)
                                {
                                    var multi = [];
                                    $.each(valueNodes[0].childNodes, function (m, outer)
                                    {
                                        var items = []; 
                                        $.each(outer.childNodes, function (o, obj)
                                        {
                                            var item = {};
                                            $.each(obj.childNodes, function (p, prop)
                                            {
                                                var name = (prop.nodeName.indexOf(':') > -1 ? prop.nodeName.split(':')[1] : prop.nodeName);
                                                item[name] = SoapHelper.convertValue($(prop).text());
                                            });
                                            items.push(item);
                                        });
                                        multi.push(items);
                                    });
                                    result[key] = multi;
                                } 
                                else
                                {
                                    var items = [];
                                    $.each(valueNodes[0].childNodes[0].childNodes, function (o, obj)
                                    {
                                        var item = {};
                                        $.each(obj.childNodes, function (p, prop)
                                        {
                                            var name = (prop.nodeName.indexOf(':') > -1 ? prop.nodeName.split(':')[1] : prop.nodeName);
                                            item[name] = SoapHelper.convertValue($(prop).text());
                                        });
                                        items.push(item);
                                    });
                                    result[key] = items;
                                }
                            }
                            else
                            {
                                var item = {};
                                $.each(valueNodes[0].childNodes[0].childNodes, function (p, prop)
                                {
                                    var name = (prop.nodeName.indexOf(':') > -1 ? prop.nodeName.split(':')[1] : prop.nodeName);
                                    item[name] = SoapHelper.convertValue($(prop).text());
                                });
                                result[key] = item;
                            }
                        }
                        else
                        {
                            result[key] = SoapHelper.convertValue(valueNodes.text());
                        }
                    });
                }

                callback(<T>result);
            });
        }

        static encodeValue(value)
        {
            if (value === 0) return '0';
            if (value === true) return 'true';
            if (value === false) return 'false';
            if (!value) return '';
            return (typeof (value) === 'object' && value.getTime ? SoapHelper.encodeDate(value) : SoapHelper.xmlEncode(value.toString()));
        }

        static xmlEncode(text)
        {
            if (text === null || typeof text != 'string')
                return text;

            text = text.replace(/&/g, '&amp;');
            text = text.replace(/\"/g, '&quot;');
            text = text.replace(/\'/g, '&apos;');
            text = text.replace(/</g, '&lt;');
            text = text.replace(/>/g, '&gt;');

            return text;
        }

        static encodeDate(dateTime: Date)
        {
            return dateTime.getFullYear() + "-" +
                SoapHelper.padNumber(dateTime.getMonth() + 1) + "-" +
                SoapHelper.padNumber(dateTime.getDate()) + "T" +
                SoapHelper.padNumber(dateTime.getHours()) + ":" +
                SoapHelper.padNumber(dateTime.getMinutes()) + ":" +
                SoapHelper.padNumber(dateTime.getSeconds());
        }

        static padNumber(str: any, len: number = 2)
        {
            str = (str && str.toString()) || '';
            while (str.length < len)
            {
                str = '0' + str;
            }
            return str;
        }

        static convertValue(val: any)
        {
            if (val === 'true')
            {
                return true;
            }
            else if (val === 'false')
            {
                return false;
            }
            else if (val > 0)
            {
                return parseFloat(val);
            }
            else if (val && val.indexOf('20') == 0 && val.indexOf('T') > -1 && val.slice(-1) == 'Z')
            {
                return AppData.parseDate(val);
            }
            else
            {
                return val;
            }
        }

        static getValueType(val: any)
        {
            var valStr = ((val && val.toString()) || '');
            if (val === true || val === false)
            {
                return 'boolean';
            }
            else if (valStr.indexOf('.') > -1 && (val === 0 || val > 0))
            {
                return 'decimal';
            }
            else if (val === 0 || val > 0)
            {
                return 'int';
            }
            else if (val && typeof (val) == 'object' && val.getTime)
            {
                return 'dateTime';
            }
            else if (valStr.length == 36 && valStr.split('-').join('').length == 32)
            {
                return 'guid';
            }
            else if (valStr.length == 38 && valStr.split('-').join('').length == 34)
            {
                return 'guid';
            }
            else
            {
                return 'string';
            }
        }
    }

    export class Common
    {
        static showMessage(message: string, duration?: number)
        {
            AppUI.Popup.showMessage(message,duration);
            Common.enableHTMLScroll();
        }
        
        static enableHTMLScroll()
        {
            if ($("html"))
            {
                $("html").css("overflow", "auto");
            }
        }
        static disableHTMLScroll()
        {
            if ($("html"))
            {
                $("html").css("overflow", "hidden");
            }
        }
        static ShowBusyIndicator()
        {
        }
        static HideBusyIndicator()
        {
        }
    }

    export class SingletonClass
    {
        private static _instance: SingletonClass = null;
        constructor()
        {
            SingletonClass._instance = this;
        }

        public static setDocumentClickHandler()
        {
            if (SingletonClass._instance == null)
            {
                SingletonClass._instance = new SingletonClass();
                $(document).click((o) =>
                {
                    try
                    {
                        var src: Element = <Element>o.target;
                        if (src && src.getAttribute && !(src.getAttribute('id') == "FilterButtonImg" || src.getAttribute('id') == "FilterButton") && $('#ddllocations') && $('#ddllocations:visible').length > 0)
                        {
                            $('#ddllocations').stop().slideUp(500);
                        }

                    } catch (ex)
                    {
                        console.log(ex);
                    }

                });
            }
        }
    }
}