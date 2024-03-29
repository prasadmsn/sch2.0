
module Ccx.Scheduling.Models
{
    export interface IAppointments
    {
        subject: string;
        activityid: string;
        scheduledstart: string;
        scheduledend: string;
        name: string;
        regardingobjectid: string;
        isalldayevent: boolean;
        scheduleddurationminutes: string;
        instanceyypecode: string;
        equipmentid: string;
        bordercolorcode: KnockoutObservable<string>;
        color: KnockoutObservable<string>;
        location: string;
        regardingobjectidname: string;
        title: string;
    }

    export class Appointment extends AppData.Model
    {
        public ListResources(callback: (results: any[]) => void)
        {
            //use mock data
            callback([
                { text: "Alex", value: 1, color: "#f8a398" },
                { text: "Bob", value: 2, color: "#51a0ed" },
                { text: "Charlie", value: 3, color: "#56ca85" }
            ]);
        }


        public GetProviderAppointments(providerId: string, callback: AppData.callback<IAppointments[]>)
        {

            this.DataAccess.query("appointment")
                .where("statecode", AppData.ExpressionOperator.NotEquals, 2)
                .where("ccx_apptcategory", AppData.ExpressionOperator.NotNull)
                .select("scheduledstart",
                "scheduledend",
                "subject",
                "scheduleddurationminutes",
                "location",
                "regardingobjectidname",
                "regardingobjectid",
                "ccx_programunit",
                "ccx_programunitname",
                "ownerid",
                "owneridname",
                "ccx_apptcategory")
                .orderBy("scheduledstart", false)
                .join("activityparty", "activityid", "activityid").where("participationtypemask", AppData.ExpressionOperator.Equals, 5)
                .select("partyid")
                .join("equipment", "equipmentid", "partyid").where("ccx_provider", AppData.ExpressionOperator.Equals, providerId).execute(callback);

        }
        public GetProviderAppointmentsByDate(providerId: string, startDate: string, endDate: string, callback: AppData.callback<any[]>)
        {
            this.DataAccess.query("appointment")
                .where("statecode", AppData.ExpressionOperator.NotEquals, 2)
                .where("ccx_apptcategory", AppData.ExpressionOperator.NotNull)
                .where("scheduledstart", AppData.ExpressionOperator.OnOrAfter, startDate)
                .where("scheduledstart", AppData.ExpressionOperator.OnOrBefore, endDate)
                .select("scheduledstart",
                "scheduledend",
                "subject",
                "scheduleddurationminutes",
                "location",
                "regardingobjectidname",
                "regardingobjectid",
                "ccx_programunit",
                "ccx_programunitname",
                "ownerid",
                "owneridname",
                "seriesid",
                "activityid",
                "ccx_anyprovidercanmodify",
                "ccx_serviceitem",
                "ccx_serviceitemname",
                "optionalattendees",
                "ccx_servicestatus",
                "ccx_servicestatusname",
                "ccx_recordedservice",
                "ccx_recordedservicename",
                "ccx_plannedservice",
                "ccx_plannedservicename"
                )
                .orderBy("scheduledstart", false)
                .join("activityparty", "activityid", "activityid").where("participationtypemask", AppData.ExpressionOperator.Equals, 5)
                .select("partyid")
                .join("equipment", "equipmentid", "partyid").where("ccx_provider", AppData.ExpressionOperator.Equals, providerId).execute(callback);

        }

        //public GetMonthlyProviderLocations(providerId: string, startDate: Date, endDate: Date, callback: AppData.callback<ILocations[]>) {
        //    this.DataAccess.query('ccx_agencylocation')
        //        .select('ccx_agencylocationid', 'ccx_name')
        //        .where('', AppData.ExpressionOperator.GreaterThan, '')
        //        .where('', AppData.ExpressionOperator.LessThan, '')
        //        .orderBy('ccx_name', false)
        //        .join('equipment', 'ccx_agencylocation', 'ccx_agencylocationid')
        //        .where('ccx_provider', AppData.ExpressionOperator.Equals, providerId)
        //        .execute(callback);
        //}

        public ListAppointments(selectedDateTime: Date, callback: (results: any[]) => void)
        {
            //use mock data
            callback([
                {
                    "TaskID": 4,
                    "OwnerID": 2,
                    "Title": "Bowling tournament",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1370811600000)\/",
                    "End": "\/Date(1370822400000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 5,
                    "OwnerID": 2,
                    "Title": "Take the dog to the vet",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1370847600000)\/",
                    "End": "\/Date(1370851200000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 6,
                    "OwnerID": 2,
                    "Title": "Call Charlie about the project",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1370950200000)\/",
                    "End": "\/Date(1370955600000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 7,
                    "OwnerID": 3,
                    "Title": "Meeting with Alex",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1371034800000)\/",
                    "End": "\/Date(1371038400000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 9,
                    "OwnerID": 2,
                    "Title": "Alex's Birthday",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1371175200000)\/",
                    "End": "\/Date(1371175200000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": true
                },
                {
                    "TaskID": 12,
                    "OwnerID": 2,
                    "Title": "Car Service",
                    "Description": "Might come to work later!",
                    "StartTimezone": null,
                    "Start": "\/Date(1372062600000)\/",
                    "End": "\/Date(1372066200000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 14,
                    "OwnerID": 3,
                    "Title": "Replace the printer on the 1st floor",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372068000000)\/",
                    "End": "\/Date(1372071600000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 15,
                    "OwnerID": 1,
                    "Title": "Attending HR Conference",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372118400000)\/",
                    "End": "\/Date(1372204800000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": true
                },
                {
                    "TaskID": 16,
                    "OwnerID": 1,
                    "Title": "Business Lunch with Gregory Watkins",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372161600000)\/",
                    "End": "\/Date(1372165200000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 17,
                    "OwnerID": 1,
                    "Title": "Breakfast with CFO and COO",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372321800000)\/",
                    "End": "\/Date(1372325400000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 18,
                    "OwnerID": 1,
                    "Title": "Job Interview - Mathew Stevens",
                    "Description": "Junior Researcher",
                    "StartTimezone": null,
                    "Start": "\/Date(1372327200000)\/",
                    "End": "\/Date(1372330800000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 19,
                    "OwnerID": 1,
                    "Title": "Review CVs with Tim",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372330800000)\/",
                    "End": "\/Date(1372332600000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 20,
                    "OwnerID": 1,
                    "Title": "Lunch with Monica",
                    "Description": "Discuss the Employee handbook",
                    "StartTimezone": null,
                    "Start": "\/Date(1372334400000)\/",
                    "End": "\/Date(1372339800000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 21,
                    "OwnerID": 1,
                    "Title": "Job Interview - John Stewart",
                    "Description": "Accountant",
                    "StartTimezone": null,
                    "Start": "\/Date(1372341600000)\/",
                    "End": "\/Date(1372345200000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 22,
                    "OwnerID": 1,
                    "Title": "Job Interview - Mary Smith",
                    "Description": "Accountant",
                    "StartTimezone": null,
                    "Start": "\/Date(1372347000000)\/",
                    "End": "\/Date(1372350600000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 24,
                    "OwnerID": 3,
                    "Title": "Register new Access Cards",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372075200000)\/",
                    "End": "\/Date(1372077000000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 25,
                    "OwnerID": 1,
                    "Title": "HR Lecture",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1370372400000)\/",
                    "End": "\/Date(1370379600000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": "FREQ=WEEKLY;BYDAY=TU,TH",
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 26,
                    "OwnerID": 1,
                    "Title": "Dentist",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372406400000)\/",
                    "End": "\/Date(1372410000000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 27,
                    "OwnerID": 1,
                    "Title": "Job Interview - Laura Bailey",
                    "Description": "Helpdesk",
                    "StartTimezone": null,
                    "Start": "\/Date(1372411800000)\/",
                    "End": "\/Date(1372415400000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 28,
                    "OwnerID": 1,
                    "Title": "Job Interview - Jenny Baxter",
                    "Description": "Helpdesk",
                    "StartTimezone": null,
                    "Start": "\/Date(1372417200000)\/",
                    "End": "\/Date(1372420800000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 31,
                    "OwnerID": 1,
                    "Title": "Team building prep tasks",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372428000000)\/",
                    "End": "\/Date(1372438800000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 32,
                    "OwnerID": 1,
                    "Title": "Job Interview - Bernard Atkins",
                    "Description": "Helpdesk",
                    "StartTimezone": null,
                    "Start": "\/Date(1372080600000)\/",
                    "End": "\/Date(1372084200000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 34,
                    "OwnerID": 1,
                    "Title": "Review Job Applications",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372086000000)\/",
                    "End": "\/Date(1372095000000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 35,
                    "OwnerID": 1,
                    "Title": "Grand Canyon tour",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1371945600000)\/",
                    "End": "\/Date(1371945600000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": true
                },
                {
                    "TaskID": 40,
                    "OwnerID": 3,
                    "Title": "Install new laptops in conference rooms",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372080600000)\/",
                    "End": "\/Date(1372096800000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 66,
                    "OwnerID": 3,
                    "Title": "Bob's Birthday",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372492800000)\/",
                    "End": "\/Date(1372485600000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": true
                },
                {
                    "TaskID": 68,
                    "OwnerID": 1,
                    "Title": "Breakfast with Tom",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372062600000)\/",
                    "End": "\/Date(1372064400000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 69,
                    "OwnerID": 2,
                    "Title": "Team planning meeting",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372068000000)\/",
                    "End": "\/Date(1372075200000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 70,
                    "OwnerID": 2,
                    "Title": "Support Phone Call",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372089600000)\/",
                    "End": "\/Date(1372091400000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 71,
                    "OwnerID": 2,
                    "Title": "Business breakfast with Caroline",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372150800000)\/",
                    "End": "\/Date(1372154400000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 72,
                    "OwnerID": 2,
                    "Title": "Discuss preojects' deadlines",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372158000000)\/",
                    "End": "\/Date(1372159800000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 73,
                    "OwnerID": 2,
                    "Title": "Support Meeting",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372172400000)\/",
                    "End": "\/Date(1372176000000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 74,
                    "OwnerID": 2,
                    "Title": "Dine with Mathew",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372185000000)\/",
                    "End": "\/Date(1372190400000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 79,
                    "OwnerID": 2,
                    "Title": "Banking",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372237200000)\/",
                    "End": "\/Date(1372240800000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 80,
                    "OwnerID": 3,
                    "Title": "Software updates",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372154400000)\/",
                    "End": "\/Date(1372161600000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 81,
                    "OwnerID": 3,
                    "Title": "UPS maintenance",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372177800000)\/",
                    "End": "\/Date(1372183200000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 82,
                    "OwnerID": 2,
                    "Title": "Support Call",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372246200000)\/",
                    "End": "\/Date(1372248000000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 83,
                    "OwnerID": 3,
                    "Title": "Phone Sync with NY office ",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372253400000)\/",
                    "End": "\/Date(1372257000000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 84,
                    "OwnerID": 3,
                    "Title": "Phone Sync with Boston Office",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372258800000)\/",
                    "End": "\/Date(1372262400000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 85,
                    "OwnerID": 3,
                    "Title": "Server maintenance",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372271400000)\/",
                    "End": "\/Date(1372282200000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 86,
                    "OwnerID": 2,
                    "Title": "Status meeting",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372426200000)\/",
                    "End": "\/Date(1372433400000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 87,
                    "OwnerID": 3,
                    "Title": "Helpdesk status meeting",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372329000000)\/",
                    "End": "\/Date(1372332600000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 88,
                    "OwnerID": 2,
                    "Title": "Business Lunch",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372334400000)\/",
                    "End": "\/Date(1372338000000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 89,
                    "OwnerID": 3,
                    "Title": "Employee database update",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372341600000)\/",
                    "End": "\/Date(1372347000000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 90,
                    "OwnerID": 3,
                    "Title": "Website upload",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372318200000)\/",
                    "End": "\/Date(1372321800000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 91,
                    "OwnerID": 2,
                    "Title": "Meeting with marketing guys",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372352400000)\/",
                    "End": "\/Date(1372357800000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 92,
                    "OwnerID": 3,
                    "Title": "Meeting with Internet provider",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372415400000)\/",
                    "End": "\/Date(1372419000000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 93,
                    "OwnerID": 3,
                    "Title": "Bob's Birthday Party",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1372536000000)\/",
                    "End": "\/Date(1372548600000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": null,
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 95,
                    "OwnerID": 2,
                    "Title": "Dance Practice",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1370284200000)\/",
                    "End": "\/Date(1370289600000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": "FREQ=WEEKLY;BYDAY=MO,WE",
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 114,
                    "OwnerID": 3,
                    "Title": "Software updates",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1370336400000)\/",
                    "End": "\/Date(1370347200000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": "",
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 115,
                    "OwnerID": 1,
                    "Title": "Breakfast at Starbucks",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1370332800000)\/",
                    "End": "\/Date(1370338200000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": "",
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 116,
                    "OwnerID": 2,
                    "Title": "Performance review",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1370354400000)\/",
                    "End": "\/Date(1370365200000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": "",
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 118,
                    "OwnerID": 1,
                    "Title": "HR seminar preparation",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1370426400000)\/",
                    "End": "\/Date(1370433600000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": "",
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 119,
                    "OwnerID": 3,
                    "Title": "Helpdesk weekly meeting",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1370444400000)\/",
                    "End": "\/Date(1370448000000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": "FREQ=WEEKLY;BYDAY=WE",
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                },
                {
                    "TaskID": 120,
                    "OwnerID": 3,
                    "Title": "Website upload",
                    "Description": "",
                    "StartTimezone": null,
                    "Start": "\/Date(1370588400000)\/",
                    "End": "\/Date(1370593800000)\/",
                    "EndTimezone": null,
                    "RecurrenceRule": "",
                    "RecurrenceID": null,
                    "RecurrenceException": null,
                    "IsAllDay": false
                }
            ]);
        }
    }
} 