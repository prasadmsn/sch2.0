module Ccx.Scheduling.Models
{
    export interface IDaylightSavingsDate
    {
        StartDate: string;
        EndDate: string;
    }

    export interface IUserTimeZoneData
    {
        Names: string[];
        Code: string;
        CrmCodeNo: number;
        CodeDaylightSavings: number;
        GmtOffsetMinutes: number;
        GmtOffsetMinutesDaylightSavings: number;
    }

    export class TimeZoneData
    {

        static Dates = <IDaylightSavingsDate[]>[
            { StartDate: '3/9/2014', EndDate: '11/2/2014' },
            { StartDate: '3/8/2015', EndDate: '11/1/2015' },
            { StartDate: '3/13/2016', EndDate: '11/6/2016' },
            { StartDate: '3/12/2017', EndDate: '11/5/2017' },
            { StartDate: '3/11/2018', EndDate: '11/4/2018' }
        ];

        static TimeZones = <IUserTimeZoneData[]>[
            {
                Names: [
                    'Eastern Time (US & Canada)',
                    'Indiana (East)'
                ],
                Code: 'EST',
                CrmCodeNo: 35,
                CodeDaylightSavings: 'EDT',
                GmtOffsetMinutes: -300, // -5 hours
                GmtOffsetMinutesDaylightSavings: -240 // -4 hours
            },
            {
                Names: [
                    'Central Time (US & Canada)'
                ],
                Code: 'CST',
                CrmCodeNo: 33,
                CodeDaylightSavings: 'CDT',
                GmtOffsetMinutes: -360, // -6 hours
                GmtOffsetMinutesDaylightSavings: -300 // -5 hours
            },
            {
                Names: [
                    'Mountain Time (US & Canada)'
                ],
                Code: 'MST',
                CrmCodeNo: 12,
                CodeDaylightSavings: 'MDT',
                GmtOffsetMinutes: -420, // -7 hours
                GmtOffsetMinutesDaylightSavings: -360 // -6 hours
            },
            {
                Names: [
                    'Pacific Time (US & Canada)'
                ],
                Code: 'PST',
                CrmCodeNo: 5,
                CodeDaylightSavings: 'PDT',
                GmtOffsetMinutes: -480, // -8 hours
                GmtOffsetMinutesDaylightSavings: -420 // -7 hours
            }
        ];

    }

    export class UserTimeZoneInfo extends AppData.Model
    {
        private userId: string;
        private userSettingsEntity: AppData.IEntityName;
        public UserTimeZoneData: IUserTimeZoneData;

        constructor(userId: string)
        {
            super();
            this.userId = userId;
            this.userSettingsEntity = "usersettings";
        }

        public getTimeZoneCode(callback:any): void
        {
            var timeZoneCodeNo: number = 0;
            this.DataAccess.single<any>(this.userSettingsEntity, this.userId, callback);
        }
    }
}