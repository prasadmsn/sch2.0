var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (Models) {
            var Appointment = (function (_super) {
                __extends(Appointment, _super);
                function Appointment() {
                    _super.apply(this, arguments);
                }
                Appointment.prototype.ListResources = function (callback) {
                    callback([
                        { text: "Alex", value: 1, color: "#f8a398" },
                        { text: "Bob", value: 2, color: "#51a0ed" },
                        { text: "Charlie", value: 3, color: "#56ca85" }
                    ]);
                };

                Appointment.prototype.GetProviderAppointments = function (providerId, callback) {
                    this.DataAccess.query("appointment").where("statecode", AppData.ExpressionOperator.NotEquals, 2).where("ccx_apptcategory", AppData.ExpressionOperator.NotNull).select("scheduledstart", "scheduledend", "subject", "scheduleddurationminutes", "location", "regardingobjectidname", "regardingobjectid", "ccx_programunit", "ccx_programunitname", "ownerid", "owneridname", "ccx_apptcategory").orderBy("scheduledstart", false).join("activityparty", "activityid", "activityid").where("participationtypemask", AppData.ExpressionOperator.Equals, 5).select("partyid").join("equipment", "equipmentid", "partyid").where("ccx_provider", AppData.ExpressionOperator.Equals, providerId).execute(callback);
                };
                Appointment.prototype.GetProviderAppointmentsByDate = function (providerId, startDate, endDate, callback) {
                    this.DataAccess.query("appointment").where("statecode", AppData.ExpressionOperator.NotEquals, 2).where("ccx_apptcategory", AppData.ExpressionOperator.NotNull).where("scheduledstart", AppData.ExpressionOperator.OnOrAfter, startDate).where("scheduledstart", AppData.ExpressionOperator.OnOrBefore, endDate).select("scheduledstart", "scheduledend", "subject", "scheduleddurationminutes", "location", "regardingobjectidname", "regardingobjectid", "ccx_programunit", "ccx_programunitname", "ownerid", "owneridname", "seriesid", "activityid", "ccx_anyprovidercanmodify", "ccx_serviceitem", "ccx_serviceitemname", "optionalattendees", "ccx_servicestatus", "ccx_servicestatusname", "ccx_recordedservice", "ccx_recordedservicename", "ccx_plannedservice", "ccx_plannedservicename").orderBy("scheduledstart", false).join("activityparty", "activityid", "activityid").where("participationtypemask", AppData.ExpressionOperator.Equals, 5).select("partyid").join("equipment", "equipmentid", "partyid").where("ccx_provider", AppData.ExpressionOperator.Equals, providerId).execute(callback);
                };

                Appointment.prototype.ListAppointments = function (selectedDateTime, callback) {
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
                };
                return Appointment;
            })(AppData.Model);
            Models.Appointment = Appointment;
        })(Scheduling.Models || (Scheduling.Models = {}));
        var Models = Scheduling.Models;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (Models) {
            var ProviderSchedule = (function (_super) {
                __extends(ProviderSchedule, _super);
                function ProviderSchedule() {
                    _super.call(this);
                }
                ProviderSchedule.prototype.UpdateCalendarStatus = function (EquipmentID, callback) {
                    this.DataAccess.update({ 'ccx_schedulestatus': false }, 'equipment', EquipmentID, callback);
                };

                ProviderSchedule.prototype.GetCalendar = function (calendarid, callback) {
                    CrmData.ScheduleData.GetCalendar(calendarid, callback);
                };
                ProviderSchedule.prototype.GetCalenderId = function (equipmentid, callback) {
                    try  {
                        this.DataAccess.query('equipment').select('calendarid').where('equipmentid', AppData.ExpressionOperator.Equals, equipmentid).execute(callback);
                    } catch (ex) {
                        AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
                    }
                };

                ProviderSchedule.prototype.GetTimeZone = function (callback) {
                    try  {
                        var timeZones = [];
                        this.DataAccess.query('timezonedefinition').select('userinterfacename', 'timezonecode').orderBy('userinterfacename').execute(function (timezone) {
                            timezone.forEach(function (elem, i, array) {
                                timeZones.push({
                                    Text: (elem.userinterfacename) ? elem.userinterfacename : "No time zone name found",
                                    Value: elem.timezonecode
                                });
                            });
                            callback(timeZones);
                        });
                    } catch (ex) {
                        AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
                    }
                };

                ProviderSchedule.prototype.GetFacilityEquipmentResourceIds = function (providerId, callback) {
                    try  {
                        this.DataAccess.query('equipment').select('equipmentid', 'name', 'ccx_agencylocation', 'calendarid').where('ccx_provider', AppData.ExpressionOperator.Equals, providerId).where('ccx_schedulestatus', AppData.ExpressionOperator.Equals, true).execute(callback);
                    } catch (ex) {
                        AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
                    }
                };

                ProviderSchedule.prototype.GetProviderLocations = function (providerId, callback) {
                    try  {
                        this.DataAccess.query('equipment').select('ccx_agencylocation', 'equipmentid', 'ccx_schedulestatus').where('ccx_provider', AppData.ExpressionOperator.Equals, providerId).execute(callback);
                    } catch (ex) {
                        AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
                    }
                };

                ProviderSchedule.prototype.GetFaciliytName = function (equipmentId, callback) {
                    try  {
                        this.DataAccess.single('equipment', equipmentId, callback);
                    } catch (ex) {
                        AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
                    }
                };

                ProviderSchedule.prototype.GetAllLocations = function (providerLocations, callback) {
                    try  {
                        this.GetLocations(providerLocations, function (results) {
                            callback(AppData.select(results, function (l) {
                                return {
                                    FacilityId: l['ccx_agencylocationid'],
                                    FacilityName: l['ccx_name'],
                                    OfficeAddress: (l['ccx_agencylocationaddress.ccx_addresstype']) ? ((l['ccx_agencylocationaddress.ccx_addresstype'] != '100000000') ? ((l['ccx_agencylocationaddress.ccx_line1']) ? l['ccx_agencylocationaddress.ccx_line1'] : '') + ((l['ccx_agencylocationaddress.ccx_city']) ? (', ' + l['ccx_agencylocationaddress.ccx_city']) : '') + ((l['ccx_agencylocationaddress.ccx_state']) ? (', ' + l['ccx_agencylocationaddress.ccx_state']) : '') + ((l['ccx_agencylocationaddress.ccx_postalcode']) ? (', ' + l['ccx_agencylocationaddress.ccx_postalcode']) : '') : '') : l['ccx_agencylocationaddress.ccx_name'],
                                    MainPhone: l['ccx_agencylocationaddress.ccx_telephone1']
                                };
                            }));
                        });
                    } catch (ex) {
                        AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
                    }
                };

                ProviderSchedule.prototype.GetLocations = function (providerLocations, callback) {
                    try  {
                        if (providerLocations) {
                            this.DataAccess.query('ccx_agencylocation').select('ccx_agencylocationid', 'ccx_name', 'createdon').orderBy('ccx_name', false).where('ccx_name', AppData.ExpressionOperator.NotIn, providerLocations).join('ccx_agencylocationaddress', 'ccx_parentid', 'ccx_agencylocationid').select('ccx_name', 'ccx_telephone1', 'ccx_addresstype', 'ccx_line1', 'ccx_city', 'ccx_state', 'ccx_postalcode').execute(callback);
                        } else {
                            this.DataAccess.query('ccx_agencylocation').select('ccx_agencylocationid', 'ccx_name', 'createdon').orderBy('ccx_name', false).join('ccx_agencylocationaddress', 'ccx_parentid', 'ccx_agencylocationid').select('ccx_name', 'ccx_telephone1', 'ccx_addresstype', 'ccx_line1', 'ccx_city', 'ccx_state', 'ccx_postalcode').execute(callback);
                        }
                    } catch (ex) {
                        AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
                    }
                };

                ProviderSchedule.prototype.GetProviderInformation = function (providerId, callback) {
                    try  {
                        this.DataAccess.query('systemuser').where('systemuserid', AppData.ExpressionOperator.Equals, providerId).select('fullname', 'systemuserid', 'businessunitid', 'photourl', 'title').join('usersettings', 'systemuserid', 'systemuserid').select('timezonecode').execute(callback);
                    } catch (ex) {
                        AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
                    }
                };

                ProviderSchedule.prototype.LoadCalendarIdMappings = function (rulesCollection) {
                    var CalendIdMappingArray;
                    CalendIdMappingArray = [];
                    if (rulesCollection) {
                        $.each(rulesCollection, function (i, rules) {
                            if (rules.scheduleInfo) {
                                $.each(rules.scheduleInfo, function (j, rule) {
                                    if (CalendIdMappingArray.length > 0) {
                                        var existingCount = AppData.where(CalendIdMappingArray, function (r) {
                                            return r.InnerCalendarId === rule['innercalendarid'];
                                        });
                                        if (existingCount.length === 0) {
                                            CalendIdMappingArray.push({
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
                                    } else {
                                        CalendIdMappingArray.push({
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
                };

                ProviderSchedule.prototype.GetProviderWorkHours = function (locations, startDate, endDate, callback) {
                    var _this = this;
                    try  {
                        var CalendarRulesArray;
                        CalendarRulesArray = [];
                        var Rules;
                        Rules = [];
                        var CalendarInnerCalendarIdMappings;
                        CalendarInnerCalendarIdMappings = [];
                        var locCount = 0;
                        if (locations) {
                            $.each(locations, function (i, loc) {
                                _this.GetCalendar(loc.calendarid, function (calendarRules) {
                                    CalendarRulesArray.push({
                                        CalendarId: loc.calendarid,
                                        CalendarRules: calendarRules
                                    });

                                    Rules.push(calendarRules);

                                    locCount++;
                                    if (locCount === locations.length) {
                                        CALENDAR_RULES_COLLECTION = CalendarRulesArray;
                                        CalendarInnerCalendarIdMappings = _this.LoadCalendarIdMappings(Rules);

                                        var resourceIds = AppData.select(locations, function (l) {
                                            return l.equipmentid;
                                        });
                                        CrmData.ScheduleData.QueryMultipleSchedulesRequest(resourceIds, startDate, endDate, 0 /* Available */, function (results) {
                                            var allResults = [];
                                            $.each(results.TimeInfos, function (i, locationTimes) {
                                                var locationName = '';
                                                var locationId = '';

                                                $.each(locationTimes, function (i, t) {
                                                    if (t.ActivityStatusCode.toString() !== "4") {
                                                        var calendarRule = AppData.where(CalendarInnerCalendarIdMappings, function (m) {
                                                            return m.InnerCalendarId === t.CalendarId;
                                                        })[0];
                                                        locationName = AppData.where(locations, function (l) {
                                                            return l.calendarid === calendarRule.CalendarId;
                                                        })[0].ccx_agencylocation_name;
                                                        locationId = AppData.where(locations, function (l) {
                                                            return l.calendarid === calendarRule.CalendarId;
                                                        })[0].ccx_agencylocation;

                                                        allResults.push({
                                                            RecurrenceId: (calendarRule.IsVaried) ? calendarRule.GroupDesignator + '-' + AppData.formatDate(calendarRule.StartTime).toString().replace('/', '-').replace('/', '-') : calendarRule.InnerCalendarId,
                                                            LinkID: (calendarRule.IsVaried) ? calendarRule.GroupDesignator + locationId + '-' + AppData.formatDate(calendarRule.StartTime).toString().replace('/', '-').replace('/', '-') : calendarRule.InnerCalendarId,
                                                            Reason: t.DisplayText,
                                                            Location: locationName,
                                                            LocationID: locationId,
                                                            Date: t.Start,
                                                            StartTime: t.Start,
                                                            EndTime: t.End,
                                                            CalendarId: t.CalendarId,
                                                            IsTimeOff: (t.SubCode == 6 /* Vacation */),
                                                            IsBreak: (t.SubCode == 4 /* Break */),
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
                                            });
                                            callback(allResults);
                                        });
                                        return;
                                    }
                                });
                            });
                        }
                    } catch (ex) {
                        AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
                        return;
                    }
                };

                ProviderSchedule.prototype.GetProviderWorkHourForEdit = function (locationId, locationName, startDate, endDate, callback) {
                    try  {
                        CrmData.ScheduleData.QueryUserWorkHours([locationId], startDate, endDate, function (results) {
                            var allResults = [];

                            $.each(results.TimeInfos, function (i, timeInfo) {
                                $.each(timeInfo, function (j, t) {
                                    allResults.push({
                                        RecurrenceId: '',
                                        Reason: t.DisplayText,
                                        Location: locationName,
                                        Date: t.Start,
                                        StartTime: t.Start,
                                        EndTime: t.End,
                                        CalendarId: t.CalendarId,
                                        IsTimeOff: (t.SubCode == CrmData.SubCode[6 /* Vacation */]),
                                        IsBreak: (t.SubCode == CrmData.SubCode[4 /* Break */])
                                    });
                                });
                            });

                            callback(allResults);
                        });
                    } catch (ex) {
                        AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
                    }
                };

                ProviderSchedule.prototype.SaveFacilityEquipment = function (equipment, callback) {
                    try  {
                        this.DataAccess.create(equipment, "equipment", function (id) {
                            equipment.equipmentid = id.toString();
                            callback(id);
                        });
                    } catch (ex) {
                        AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
                    }
                };
                return ProviderSchedule;
            })(AppData.Model);
            Models.ProviderSchedule = ProviderSchedule;
        })(Scheduling.Models || (Scheduling.Models = {}));
        var Models = Scheduling.Models;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (Models) {
            var ProviderSearch = (function (_super) {
                __extends(ProviderSearch, _super);
                function ProviderSearch() {
                    _super.apply(this, arguments);
                }
                ProviderSearch.prototype.GetProviders = function (name, callback) {
                    try  {
                        var providers = [];
                        this.DataAccess.query('systemuser').or(function (orExp) {
                            orExp.where('lastname', AppData.ExpressionOperator.Contains, '%%' + name + '%%');
                            orExp.where('fullname', AppData.ExpressionOperator.Contains, '%%' + name + '%%');
                            orExp.where('firstname', AppData.ExpressionOperator.Contains, '%%' + name + '%%');
                        }).select('fullname', 'firstname', 'lastname', 'internalemailaddress', 'systemuserid').orderBy('fullname', false).execute(function (provider) {
                            ko.utils.arrayForEach(provider, function (elem) {
                                providers.push({
                                    Text: elem['fullname'] + " | " + ((elem['internalemailaddress']) ? elem['internalemailaddress'] : "No email found"),
                                    Value: elem['systemuserid']
                                });
                            });
                            callback(providers);
                        });
                    } catch (ex) {
                        AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
                    }
                };
                return ProviderSearch;
            })(AppData.Model);
            Models.ProviderSearch = ProviderSearch;
        })(Scheduling.Models || (Scheduling.Models = {}));
        var Models = Scheduling.Models;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var SchedulingApp;
(function (SchedulingApp) {
    function InitApplication() {
    }
    SchedulingApp.InitApplication = InitApplication;
})(SchedulingApp || (SchedulingApp = {}));
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (Models) {
            var Settings = (function () {
                function Settings() {
                }
                return Settings;
            })();
            Models.Settings = Settings;
        })(Scheduling.Models || (Scheduling.Models = {}));
        var Models = Scheduling.Models;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var CrmData;
(function (CrmData) {
    (function (SubCode) {
        SubCode[SubCode["Unspecified"] = 0] = "Unspecified";
        SubCode[SubCode["Schedulable"] = 1] = "Schedulable";
        SubCode[SubCode["Committed"] = 2] = "Committed";
        SubCode[SubCode["Uncommitted"] = 3] = "Uncommitted";
        SubCode[SubCode["Break"] = 4] = "Break";
        SubCode[SubCode["Holiday"] = 5] = "Holiday";
        SubCode[SubCode["Vacation"] = 6] = "Vacation";
        SubCode[SubCode["Appointment"] = 7] = "Appointment";
        SubCode[SubCode["ResourceStartTime"] = 8] = "ResourceStartTime";
        SubCode[SubCode["ResourceServiceRestriction"] = 9] = "ResourceServiceRestriction";
        SubCode[SubCode["ResourceCapacity"] = 10] = "ResourceCapacity";
        SubCode[SubCode["ServiceRestriction"] = 11] = "ServiceRestriction";
        SubCode[SubCode["ServiceCost"] = 12] = "ServiceCost";
    })(CrmData.SubCode || (CrmData.SubCode = {}));
    var SubCode = CrmData.SubCode;

    (function (TimeCode) {
        TimeCode[TimeCode["Available"] = 0] = "Available";
        TimeCode[TimeCode["Busy"] = 1] = "Busy";
        TimeCode[TimeCode["Unavailable"] = 2] = "Unavailable";
        TimeCode[TimeCode["Filter"] = 3] = "Filter";
    })(CrmData.TimeCode || (CrmData.TimeCode = {}));
    var TimeCode = CrmData.TimeCode;

    var ScheduleData = (function () {
        function ScheduleData() {
        }
        ScheduleData.QueryMultipleSchedulesRequest = function (resourceIds, startDate, endDate, timeCode, callback) {
            try  {
                SoapHelper.soapExecuteRequest('QueryMultipleSchedulesRequest', {
                    ResourceIds: { type: 'guid', value: resourceIds },
                    Start: { type: 'dateTime', value: startDate },
                    End: { type: 'dateTime', value: endDate },
                    TimeCodes: { type: 'TimeCode', value: [TimeCode[timeCode]] }
                }, callback);
            } catch (ex) {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        };
        ScheduleData.AddWorkHours = function (startDate, startTime, endDate, endTime, breakStartTime, breakEndTime, equipmentid, days, timezonecode, innercalid, typecode, isedit, isdelete, observe, selecteddate, vbdpattern, recsubtype, callback) {
            try  {
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
            } catch (ex) {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        };

        ScheduleData.DeleteSchedule = function (equipmentId, innerCalendarId, typecode, selecteddate, recsubtype, callback) {
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
        };

        ScheduleData.DeleteSingleDaySchedule = function (equipmentId, startDate, innerCalendarId, typecode, selecteddate, recsubtype, callback) {
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
        };
        ScheduleData.QueryUserWorkHours = function (resourceIds, startDate, endDate, callback) {
            try  {
                SoapHelper.soapExecuteRequest('QueryMultipleSchedulesRequest', {
                    ResourceIds: { type: 'guid', value: resourceIds },
                    Start: { type: 'dateTime', value: new Date(startDate.setHours(0)) },
                    End: { type: 'dateTime', value: new Date(endDate.setHours(23, 59)) },
                    TimeCodes: { type: 'TimeCode', value: [TimeCode[0 /* Available */], TimeCode[2 /* Unavailable */]] }
                }, callback);
            } catch (ex) {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        };

        ScheduleData.GetCalendar = function (calendarid, callback) {
            try  {
                var request = "<fetch version='1.0' output-format='xml - platform' mapping='logical'><entity name='calendar'><filter type='and'>" + "<condition attribute='calendarid' operator='eq' value='" + calendarid + "'/></filter><all-attributes/></entity></fetch>";
                SoapHelper.soapExecuteRequest('RetrieveMultipleRequest', {
                    Query: { type: 'FetchExpression', value: request }
                }, callback);
            } catch (ex) {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        };
        return ScheduleData;
    })();
    CrmData.ScheduleData = ScheduleData;

    var SoapHelper = (function () {
        function SoapHelper() {
        }
        SoapHelper.soapExecuteRequest = function (actionName, parameters, callback) {
            var requestXML = [];

            requestXML.push('<request xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts"');
            requestXML.push('         xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic"');
            requestXML.push('         xmlns:c="http://schemas.microsoft.com/crm/2011/Contracts"');
            requestXML.push('         xmlns:d="http://www.w3.org/2001/XMLSchema"');
            requestXML.push('         xmlns:e="http://www.w3.org/2001/XMLSchema-instance"');
            requestXML.push('         xmlns:f="http://schemas.microsoft.com/2003/10/Serialization/Arrays">');
            requestXML.push('<a:Parameters>');

            var dTypes = ['int', 'decimal', 'double', 'boolean', 'dateTime', 'string', 'guid'];

            $.each(parameters, function (key, param) {
                requestXML.push('<a:KeyValuePairOfstringanyType>');
                requestXML.push('<b:key>' + key + '</b:key>');
                if (param.type == 'EntityReference' || param.type == 'a:EntityReference') {
                    requestXML.push('<b:value e:type="a:EntityReference">');
                    requestXML.push('<a:Id>' + param.value + '</a:Id>');
                    requestXML.push('<a:LogicalName>' + param.logicalName + '</a:LogicalName>');
                    requestXML.push('<a:Name e:nil="true" />');
                    requestXML.push('</b:value>');
                } else if (param.type == 'OptionSetValue') {
                    requestXML.push('<b:value e:type="a:OptionSetValue">');
                    requestXML.push('<a:Value>' + param.value + '</a:Value>');
                    requestXML.push('</b:value>');
                } else if (param.type == 'FetchExpression' || param.type == 'a:FetchExpression') {
                    requestXML.push('<b:value e:type="a:FetchExpression">');
                    requestXML.push('<a:Query>' + SoapHelper.encodeValue(param.value) + '</a:Query>');
                    requestXML.push('</b:value>');
                } else if (param.type) {
                    var isCrmType = (param.type.charAt(0).toUpperCase() == param.type.charAt(0));
                    var isPrimType = ($.inArray(param.type, dTypes) > -1);
                    if ($.isArray(param.value)) {
                        var typePrefix = (isPrimType ? 'f:' : isCrmType ? 'c:' : 'f:');
                        var itemType = typePrefix + param.type;
                        var arrayType = typePrefix + 'ArrayOf' + param.type;
                        requestXML.push('<b:value e:type="' + arrayType + '">');
                        $.each(param.value, function (i, item) {
                            requestXML.push('<' + itemType + '>');
                            requestXML.push(SoapHelper.encodeValue(item));
                            requestXML.push('</' + itemType + '>');
                        });
                        requestXML.push('</b:value>');
                    } else {
                        var typePrefix = (isPrimType ? 'd:' : isCrmType ? 'c:' : 'f:');
                        var itemType = typePrefix + param.type;
                        requestXML.push('<b:value e:type="' + itemType + '">');
                        requestXML.push(SoapHelper.encodeValue(param.value));
                        requestXML.push('</b:value>');
                    }
                } else {
                    var type = 'd:' + SoapHelper.getValueType(param.value);
                    requestXML.push('<b:value e:type="' + type + '">');
                    requestXML.push(SoapHelper.encodeValue(param.value));
                    requestXML.push('</b:value>');
                }
                requestXML.push('</a:KeyValuePairOfstringanyType>');
            });

            requestXML.push("</a:Parameters>");
            requestXML.push("<a:RequestId e:nil=\"true\" />");
            if (actionName.indexOf('ccx_') == 0) {
                requestXML.push("<a:RequestName>" + actionName + "</a:RequestName>");
            } else {
                requestXML.push("<a:RequestName>" + actionName.replace('Request', '') + "</a:RequestName>");
            }
            requestXML.push("</request>");

            XrmServiceToolkit.Soap.Execute(requestXML.join(''), function (responseXML) {
                var result = {};
                if (actionName === "RetrieveMultipleRequest") {
                    var itemCollection = [];
                    var nodes = $(responseXML).find("a\\:Entities a\\:Entity a\\:Attributes a\\:Entities a\\:Entity,Entities Entity Attributes Entities Entity");
                    nodes.each(function (i, n) {
                        var node = $(n);
                        var attributes = node.find("a\\:attributes, attributes");
                        attributes.each(function (k, nd) {
                            var keyvaluePair = $(nd).find("a\\:KeyValuePairOfstringanyType, KeyValuePairOfstringanyType");
                            var item;
                            item = {};
                            keyvaluePair.each(function (m, s) {
                                var pair = $(s);
                                var key = pair.find('b\\:key, key').text();
                                var valueNodes = pair.find('b\\:value, value');

                                switch (key.toLowerCase()) {
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
                            if (item) {
                                itemCollection.push(item);
                            }
                        });
                    });
                    if (itemCollection.length > 0) {
                        result["scheduleInfo"] = itemCollection;
                    }
                } else {
                    var nodes = $(responseXML).find('a\\:Results a\\:KeyValuePairOfstringanyType, KeyValuePairOfstringanyType');
                    nodes.each(function (i, n) {
                        var node = $(n);
                        var key = node.find('b\\:key, key').text();
                        var valueNodes = node.find('b\\:value, value');
                        if (valueNodes[0] && valueNodes[0].childNodes[0] && valueNodes[0].childNodes[0].nodeType == 1) {
                            if (valueNodes[0].childNodes[0].nodeName.indexOf('ArrayOf') > -1) {
                                if (valueNodes[0].childNodes.length > 0) {
                                    var multi = [];
                                    $.each(valueNodes[0].childNodes, function (m, outer) {
                                        var items = [];
                                        $.each(outer.childNodes, function (o, obj) {
                                            var item = {};
                                            $.each(obj.childNodes, function (p, prop) {
                                                var name = (prop.nodeName.indexOf(':') > -1 ? prop.nodeName.split(':')[1] : prop.nodeName);
                                                item[name] = SoapHelper.convertValue($(prop).text());
                                            });
                                            items.push(item);
                                        });
                                        multi.push(items);
                                    });
                                    result[key] = multi;
                                } else {
                                    var items = [];
                                    $.each(valueNodes[0].childNodes[0].childNodes, function (o, obj) {
                                        var item = {};
                                        $.each(obj.childNodes, function (p, prop) {
                                            var name = (prop.nodeName.indexOf(':') > -1 ? prop.nodeName.split(':')[1] : prop.nodeName);
                                            item[name] = SoapHelper.convertValue($(prop).text());
                                        });
                                        items.push(item);
                                    });
                                    result[key] = items;
                                }
                            } else {
                                var item = {};
                                $.each(valueNodes[0].childNodes[0].childNodes, function (p, prop) {
                                    var name = (prop.nodeName.indexOf(':') > -1 ? prop.nodeName.split(':')[1] : prop.nodeName);
                                    item[name] = SoapHelper.convertValue($(prop).text());
                                });
                                result[key] = item;
                            }
                        } else {
                            result[key] = SoapHelper.convertValue(valueNodes.text());
                        }
                    });
                }

                callback(result);
            });
        };

        SoapHelper.encodeValue = function (value) {
            if (value === 0)
                return '0';
            if (value === true)
                return 'true';
            if (value === false)
                return 'false';
            if (!value)
                return '';
            return (typeof (value) === 'object' && value.getTime ? SoapHelper.encodeDate(value) : SoapHelper.xmlEncode(value.toString()));
        };

        SoapHelper.xmlEncode = function (text) {
            if (text === null || typeof text != 'string')
                return text;

            text = text.replace(/&/g, '&amp;');
            text = text.replace(/\"/g, '&quot;');
            text = text.replace(/\'/g, '&apos;');
            text = text.replace(/</g, '&lt;');
            text = text.replace(/>/g, '&gt;');

            return text;
        };

        SoapHelper.encodeDate = function (dateTime) {
            return dateTime.getFullYear() + "-" + SoapHelper.padNumber(dateTime.getMonth() + 1) + "-" + SoapHelper.padNumber(dateTime.getDate()) + "T" + SoapHelper.padNumber(dateTime.getHours()) + ":" + SoapHelper.padNumber(dateTime.getMinutes()) + ":" + SoapHelper.padNumber(dateTime.getSeconds());
        };

        SoapHelper.padNumber = function (str, len) {
            if (typeof len === "undefined") { len = 2; }
            str = (str && str.toString()) || '';
            while (str.length < len) {
                str = '0' + str;
            }
            return str;
        };

        SoapHelper.convertValue = function (val) {
            if (val === 'true') {
                return true;
            } else if (val === 'false') {
                return false;
            } else if (val > 0) {
                return parseFloat(val);
            } else if (val && val.indexOf('20') == 0 && val.indexOf('T') > -1 && val.slice(-1) == 'Z') {
                return AppData.parseDate(val);
            } else {
                return val;
            }
        };

        SoapHelper.getValueType = function (val) {
            var valStr = ((val && val.toString()) || '');
            if (val === true || val === false) {
                return 'boolean';
            } else if (valStr.indexOf('.') > -1 && (val === 0 || val > 0)) {
                return 'decimal';
            } else if (val === 0 || val > 0) {
                return 'int';
            } else if (val && typeof (val) == 'object' && val.getTime) {
                return 'dateTime';
            } else if (valStr.length == 36 && valStr.split('-').join('').length == 32) {
                return 'guid';
            } else if (valStr.length == 38 && valStr.split('-').join('').length == 34) {
                return 'guid';
            } else {
                return 'string';
            }
        };
        return SoapHelper;
    })();
    CrmData.SoapHelper = SoapHelper;

    var Common = (function () {
        function Common() {
        }
        Common.showMessage = function (message, duration) {
            AppUI.Popup.showMessage(message, duration);
            Common.enableHTMLScroll();
        };

        Common.enableHTMLScroll = function () {
            if ($("html")) {
                $("html").css("overflow", "auto");
            }
        };
        Common.disableHTMLScroll = function () {
            if ($("html")) {
                $("html").css("overflow", "hidden");
            }
        };
        Common.ShowBusyIndicator = function () {
        };
        Common.HideBusyIndicator = function () {
        };
        return Common;
    })();
    CrmData.Common = Common;

    var SingletonClass = (function () {
        function SingletonClass() {
            SingletonClass._instance = this;
        }
        SingletonClass.setDocumentClickHandler = function () {
            if (SingletonClass._instance == null) {
                SingletonClass._instance = new SingletonClass();
                $(document).click(function (o) {
                    try  {
                        var src = o.target;
                        if (src && src.getAttribute && !(src.getAttribute('id') == "FilterButtonImg" || src.getAttribute('id') == "FilterButton") && $('#ddllocations') && $('#ddllocations:visible').length > 0) {
                            $('#ddllocations').stop().slideUp(500);
                        }
                    } catch (ex) {
                        console.log(ex);
                    }
                });
            }
        };
        SingletonClass._instance = null;
        return SingletonClass;
    })();
    CrmData.SingletonClass = SingletonClass;
})(CrmData || (CrmData = {}));
var CrmData;
(function (CrmData) {
    (function (MonthNames) {
        MonthNames[MonthNames["January"] = 0] = "January";
        MonthNames[MonthNames["February"] = 1] = "February";
        MonthNames[MonthNames["March"] = 2] = "March";
        MonthNames[MonthNames["April"] = 3] = "April";
        MonthNames[MonthNames["May"] = 4] = "May";
        MonthNames[MonthNames["June"] = 5] = "June";
        MonthNames[MonthNames["July"] = 6] = "July";
        MonthNames[MonthNames["August"] = 7] = "August";
        MonthNames[MonthNames["September"] = 8] = "September";
        MonthNames[MonthNames["October"] = 9] = "October";
        MonthNames[MonthNames["November"] = 10] = "November";
        MonthNames[MonthNames["December"] = 11] = "December";
    })(CrmData.MonthNames || (CrmData.MonthNames = {}));
    var MonthNames = CrmData.MonthNames;
    (function (WeekDays) {
        WeekDays[WeekDays["Sunday"] = 0] = "Sunday";
        WeekDays[WeekDays["Monday"] = 1] = "Monday";
        WeekDays[WeekDays["Tuesday"] = 2] = "Tuesday";
        WeekDays[WeekDays["Wednesday"] = 3] = "Wednesday";
        WeekDays[WeekDays["Thursday"] = 4] = "Thursday";
        WeekDays[WeekDays["Friday"] = 5] = "Friday";
        WeekDays[WeekDays["Saturday"] = 6] = "Saturday";
    })(CrmData.WeekDays || (CrmData.WeekDays = {}));
    var WeekDays = CrmData.WeekDays;
    var CalendarUtils = (function () {
        function CalendarUtils() {
        }
        CalendarUtils.GetWeekDays = function (dateTimeStr) {
            var dte = (dateTimeStr) ? new Date(dateTimeStr) : new Date();
            var firstDayOfWeek = new Date(dte.toString());
            firstDayOfWeek.setDate(dte.getDate() - dte.getDay());
            var weekArrStr = new Array();
            weekArrStr.push(firstDayOfWeek);
            for (var i = 1; i <= 6; i++) {
                dte = new Date(firstDayOfWeek.toString());
                dte.setDate(firstDayOfWeek.getDate() + i);
                weekArrStr.push(dte);
            }
            return weekArrStr;
        };
        CalendarUtils.getMonthName = function (date) {
            var month = date.getMonth();
            return MonthNames[month];
        };

        CalendarUtils.daysAreEqual = function (date1, date2) {
            var date = new Date(date1);
            return (date.getFullYear() == date2.getFullYear() && date.getMonth() == date2.getMonth() && date.getDate() == date2.getDate());
        };

        CalendarUtils.GetProviderAppointments = function (providerId, startDate, endDate, callback) {
            var _this = this;
            var doneLoading = AppUI.loading('Loading...', 1, $('.scheduling-provider-appointmenthours-appointmentweekly')[0]);
            var allAppointments = [];
            var providerLocations = [];

            var appointmentMode = new Ccx.Scheduling.Models.Appointment();
            appointmentMode.GetProviderAppointmentsByDate(providerId, startDate, endDate, function (appointments) {
                if (appointments.length > 0) {
                    appointments = AppData.sort(appointments, function (l) {
                        return (l['activityparty.partyid_name']).split('-')[1];
                    }, false);

                    var facilityName;
                    for (var i = 0; i < appointments.length; i++) {
                        facilityName = appointments[i]['activityparty.partyid_name'];
                        allAppointments.push({
                            subject: appointments[i]['subject'],
                            scheduledstart: appointments[i]['scheduledstart'],
                            scheduledend: appointments[i]['scheduledend'],
                            isalldayevent: appointments[i]['isalldayevent'],
                            activityid: appointments[i]['activityid'],
                            scheduleddurationminutes: appointments[i]['scheduleddurationminutes'],
                            equipmentid: appointments[i]['activityparty.partyid'],
                            name: appointments[i]['activityparty.partyid_name'],
                            bordercolorcode: ko.observable(''),
                            color: ko.observable(''),
                            location: facilityName.split('-')[1].toString().trim(),
                            regardingobjectid: appointments[i]['regardingobjectid'],
                            regardingobjectidname: appointments[i]['regardingobjectid_name'],
                            title: _this.GetTitleForAppointment(appointments[i])
                        });

                        providerLocations.push({
                            LocationName: (facilityName.split('-')[1].length > 20 ? facilityName.split('-')[1].substring(1, 19) + '...' : facilityName.split('-')[1]),
                            Id: appointments[i]['activityparty.partyid'],
                            PartialLocationName: (facilityName.split('-')[1].length > 20 ? facilityName.split('-')[1].substring(1, 19) + '...' : facilityName.split('-')[1]),
                            ScheduledStart: appointments[i]['scheduledstart'],
                            BorderColorCode: ko.observable(''),
                            Color: ko.observable('')
                        });
                    }
                }
                doneLoading();
                providerLocations = AppData.distinct(providerLocations, function (l) {
                    return l.Id;
                });
                var returnObj = { "allAppointments": allAppointments, "providerLocations": providerLocations };
                callback(returnObj);
            });
        };

        CalendarUtils.GetTitleForAppointment = function (app) {
            var text;
            text = 'Date: ' + AppData.formatDate(app['scheduledstart']) + "( " + AppData.formatTime(app['scheduledstart']) + " - " + AppData.formatTime(app['scheduledend']) + ")";
            if (app["regardingobjectid_name"]) {
                text += "\n Patient: " + app["regardingobjectid_name"];
            }
            text += "\n Facility: " + (app['activityparty.partyid_name']).split('-')[1].toString().trim();
            return text;
        };
        CalendarUtils.ColorMapping = function (ProviderLocations) {
            var locCount = ProviderLocations().length;
            var i = 0;
            var m = locCount / (CalendarUtils.colors.length);
            var reminder = locCount % (CalendarUtils.colors.length);
            if (m >= 1) {
                while (i < locCount) {
                    for (var y = 1; y <= m; y++) {
                        for (var z = 0; z < this.colors.length; z++) {
                            if (ProviderLocations()[i]) {
                                ProviderLocations()[i]["BorderColorCode"](this.colors[z]["BorderColor"]);
                                ProviderLocations()[i]["Color"](this.colors[z]["color"]);

                                i = i + 1;
                            }
                        }
                    }
                    if (reminder >= 1) {
                        for (var k = 0; k < reminder; k++) {
                            if (ProviderLocations()[i]) {
                                ProviderLocations()[i]["BorderColorCode"](this.colors[k]["BorderColor"]);
                                ProviderLocations()[i]["Color"](this.colors[k]["color"]);
                                i = i + 1;
                            }
                        }
                    }
                }
            } else {
                for (var z = 0; z < this.colors.length; z++) {
                    if (ProviderLocations()[i]) {
                        ProviderLocations()[i]["BorderColorCode"](this.colors[z]["BorderColor"]);
                        ProviderLocations()[i]["Color"](this.colors[z]["color"]);
                        i = i + 1;
                    }
                }
            }
        };
        CalendarUtils.ColorMappingAppointment = function (appointments, ProviderLocations) {
            var location;
            ko.utils.arrayForEach(appointments(), function (app) {
                location = AppData.where(ProviderLocations, function (loc) {
                    return (loc.Id == app.equipmentid);
                });

                if (location && location.length > 0) {
                    app.bordercolorcode(location[0]["BorderColorCode"]);
                    app.color(location[0]["Color"]);
                }
            });
        };
        CalendarUtils.colors = [
            { 'color': '#F4A49B', 'BorderColor': '#E41300' }, { 'color': '#DD9DAB', 'BorderColor': '#9F0625' },
            { 'color': '#A6E4F3', 'BorderColor': '#19A0E0' }, { 'color': '#B6DCB7', 'BorderColor': '#038D02' },
            { 'color': '#FAC8EB', 'BorderColor': '#F374CF' },
            { 'color': '#C1FFC0', 'BorderColor': '#01FE03' },
            { 'color': '#FEC49E', 'BorderColor': '#FB6600' },
            { 'color': '#C6D1c1', 'BorderColor': '#69885E' },
            { 'color': '#C8C1D1', 'BorderColor': '#776188' }];
        return CalendarUtils;
    })();
    CrmData.CalendarUtils = CalendarUtils;
})(CrmData || (CrmData = {}));
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (ViewModels) {
            var AdministrationViewModel = (function () {
                function AdministrationViewModel() {
                    this.SelectedView = ko.observable('');
                    this.CalendarSubMenuVisibility = ko.observable(false);
                    this.IsManualSchedulerVisible = ko.observable(this.CalendarSubMenuVisibility());
                    this.clicks = 0;
                    CrmData.SingletonClass.setDocumentClickHandler();
                }
                AdministrationViewModel.prototype.SetCalendarSubMenuVisibility = function () {
                    this.CalendarSubMenuVisibility(true);
                    this.LoadView('Scheduling-ProviderProfileDisplay', 'LeftPanelTargetContainer', new ViewModels.ProviderProfileViewModel());
                };

                AdministrationViewModel.prototype.SetSubMenusVisibility = function () {
                    this.CalendarSubMenuVisibility(false);
                    $("#LeftPanelTargetContainer").empty();
                };

                AdministrationViewModel.prototype.LoadView = function (viewName, targetContainer, viewContext) {
                    App.View.load({
                        ViewName: viewName,
                        ViewContext: viewContext
                    }, document.getElementById(targetContainer));
                };
                return AdministrationViewModel;
            })();
            ViewModels.AdministrationViewModel = AdministrationViewModel;
        })(Scheduling.ViewModels || (Scheduling.ViewModels = {}));
        var ViewModels = Scheduling.ViewModels;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (ViewModels) {
            var CalendarAdministrationMyServicesViewModel = (function () {
                function CalendarAdministrationMyServicesViewModel() {
                    this.ColumnValue = ko.observableArray([
                        { Text: '', Value: '' },
                        { Text: 'Tribridge North', Value: 'TBN' },
                        { Text: 'Westgate', Value: 'WES' },
                        { Text: 'Riverside', Value: 'RVS' },
                        { Text: 'Cedar Hills', Value: 'CDH' },
                        { Text: 'Misty Vale', Value: 'MSV' }
                    ]);

                    this.RowValue = ko.observableArray([
                        { Text: 'Art Therapy Individual', Value: 'ATI' },
                        { Text: 'Art Therapy Group', Value: 'ATG' },
                        { Text: 'Medication Management', Value: 'MDM' },
                        { Text: 'Substance Abuse Individual', Value: 'SAI' },
                        { Text: 'Substance Abuse Group', Value: 'SAG' },
                        { Text: 'Methadone Treatment', Value: 'MDT' },
                        { Text: 'Residential Services-Adult', Value: 'RSA' },
                        { Text: 'UCR Services - Per Encounter', Value: 'USE' }
                    ]);
                }
                CalendarAdministrationMyServicesViewModel.prototype.test3 = function () {
                    AppUI.Popup.showMessage('Testing', 5);
                };
                return CalendarAdministrationMyServicesViewModel;
            })();
            ViewModels.CalendarAdministrationMyServicesViewModel = CalendarAdministrationMyServicesViewModel;
        })(Scheduling.ViewModels || (Scheduling.ViewModels = {}));
        var ViewModels = Scheduling.ViewModels;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (ViewModels) {
            var ConfirmationViewModel = (function () {
                function ConfirmationViewModel(IsConflict, conflictFacilityName, ConflictSchedule, OnSave) {
                    this.OnSave = OnSave;
                    this.IsConflict = ko.observable(IsConflict || false);
                    this.ConflictFacilityName = ko.observable(conflictFacilityName || '');
                    this.ConflictSchedule = ko.observable(ConflictSchedule || '');
                }
                ConfirmationViewModel.prototype.SaveConflict = function () {
                    this.OnSave(true);
                };
                ConfirmationViewModel.prototype.CancelConflict = function () {
                    AppUI.Popup.hideAll();
                };
                return ConfirmationViewModel;
            })();
            ViewModels.ConfirmationViewModel = ConfirmationViewModel;
        })(Scheduling.ViewModels || (Scheduling.ViewModels = {}));
        var ViewModels = Scheduling.ViewModels;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var NOLOCATIONFOUND = 'There is no location(s) found';
var NOCALENDARINFOFOUND = 'There is no calendar info found';
var NOWORKHOURFOUND = 'There are no work hours found';
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (ViewModels) {
            (function (Provider) {
                (function (WorkHours) {
                    (function (LocationColorCode) {
                        LocationColorCode[LocationColorCode["Green"] = 0] = "Green";
                        LocationColorCode[LocationColorCode["Blue"] = 1] = "Blue";
                        LocationColorCode[LocationColorCode["Orange"] = 2] = "Orange";
                        LocationColorCode[LocationColorCode["Purple"] = 3] = "Purple";
                        LocationColorCode[LocationColorCode["Red"] = 4] = "Red";
                        LocationColorCode[LocationColorCode["Yellow"] = 5] = "Yellow";
                        LocationColorCode[LocationColorCode["Pink"] = 6] = "Pink";
                    })(WorkHours.LocationColorCode || (WorkHours.LocationColorCode = {}));
                    var LocationColorCode = WorkHours.LocationColorCode;

                    (function (CalendarScheduleType) {
                        CalendarScheduleType[CalendarScheduleType["Weekly"] = 0] = "Weekly";
                        CalendarScheduleType[CalendarScheduleType["Daily"] = 1] = "Daily";
                        CalendarScheduleType[CalendarScheduleType["TimeOff"] = 2] = "TimeOff";
                        CalendarScheduleType[CalendarScheduleType["Break"] = 3] = "Break";
                        CalendarScheduleType[CalendarScheduleType["Entire"] = 4] = "Entire";
                    })(WorkHours.CalendarScheduleType || (WorkHours.CalendarScheduleType = {}));
                    var CalendarScheduleType = WorkHours.CalendarScheduleType;

                    var CalendarViewModel = (function () {
                        function CalendarViewModel(data) {
                            var _this = this;
                            this.ParameterDeclaration(data);
                            this.GetAllLocation();
                            this.CalendarRows = ko.computed(function () {
                                var selectedDate = _this.SelectedDate();
                                var thisMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                                var startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), -(thisMonth.getDay() - 1));
                                var days = [];
                                for (var d = 0; d <= 42; d++) {
                                    var date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + d);
                                    days.push({
                                        IsCurrentMonth: date.getMonth() == selectedDate.getMonth(),
                                        Month: date.getMonth() + 1,
                                        Day: date.getDate(),
                                        Date: date
                                    });
                                }
                                var rows = [];
                                for (var d = 0; d <= days.length; d++) {
                                    if (d % 7 == 0) {
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
                        CalendarViewModel.prototype.formatLocationInRows = function () {
                            var _this = this;
                            this.LocationRows = ko.computed(function () {
                                var result = [], row, colLength = 3;

                                for (var i = 0, j = _this.ProviderLocations().length; i < j; i++) {
                                    if (i % colLength === 0) {
                                        if (row) {
                                            result.push(row);
                                        }
                                        row = [];
                                    }

                                    row.push(_this.ProviderLocations()[i]);
                                }

                                if (row) {
                                    result.push(row);
                                }

                                return result;
                            });
                        };

                        CalendarViewModel.prototype.ParameterDeclaration = function (data) {
                            var _this = this;
                            this.IsWorkhouRefreshed = ko.observable(false);
                            this.TimezoneCode = data.timezonecode || '';
                            this.ProviderId = ko.observable(data.providerId);
                            this.FilteredLocation = ko.observable('');
                            this.SelectAll = ko.observable(false);
                            this.SelectedItemIds = ko.observableArray([]);
                            this.colors = [
                                { 'color': '#F4A49B', 'BorderColor': '#E41300' }, { 'color': '#DD9DAB', 'BorderColor': '#9F0625' },
                                { 'color': '#A6E4F3', 'BorderColor': '#19A0E0' }, { 'color': '#B6DCB7', 'BorderColor': '#038D02' },
                                { 'color': '#FAC8EB', 'BorderColor': '#F374CF' },
                                { 'color': '#C1FFC0', 'BorderColor': '#01FE03' },
                                { 'color': '#FEC49E', 'BorderColor': '#FB6600' },
                                { 'color': '#C6D1c1', 'BorderColor': '#69885E' },
                                { 'color': '#C8C1D1', 'BorderColor': '#776188' }];

                            REMOVE_ITEM_DELEGATE_TEMP = this.removeItem.bind(this);
                            this.SelectedDate = ko.observable(data.selectedDate || new Date());
                            this.SelectedMonth = ko.computed(function () {
                                return _this.getMonthName(_this.SelectedDate());
                            });
                            this.WorkHours = ko.observableArray([]);
                            this.FilterWorkHours = [];
                            this.ProviderLocations = ko.observableArray([]);
                            this.SelectedMonthLocations = ko.observableArray([]);
                            var providerModel = new Scheduling.Models.ProviderSchedule();
                        };

                        CalendarViewModel.prototype.GetAllLocation = function () {
                            var _this = this;
                            try  {
                                var providerModel = new Scheduling.Models.ProviderSchedule();
                                providerModel.GetProviderLocations(this.ProviderId(), function (locations) {
                                    if (locations) {
                                        locations = AppData.sort(locations, function (l) {
                                            return l.ccx_agencylocation_name;
                                        }, false);
                                        _this.ProviderLocations(AppData.select(locations, function (item) {
                                            return {
                                                LocationName: item['ccx_agencylocation_name'],
                                                Id: item['equipmentid'],
                                                PartialLocationName: (item['ccx_agencylocation_name'].length > 20) ? item['ccx_agencylocation_name'].substring(0, 19) + '...' : item['ccx_agencylocation_name'],
                                                BorderColorCode: ko.observable(''),
                                                Color: ko.observable(''),
                                                IsActive: item['ccx_schedulestatus']
                                            };
                                        }));
                                        _this.ColorMapping();
                                    }
                                });

                                this.SelectedDate.subscribe(function () {
                                    _this.IsWorkhouRefreshed = ko.observable(false);
                                    _this.getFacilityResourceIds(_this.ProviderId());
                                });
                                if (!this.IsWorkhouRefreshed()) {
                                    this.getFacilityResourceIds(this.ProviderId());
                                }
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        CalendarViewModel.prototype.ColorMapping = function () {
                            var locCount = this.ProviderLocations().length;
                            var i = 0;
                            var m = locCount / (this.colors.length);
                            var reminder = locCount % (this.colors.length);
                            if (m >= 1) {
                                while (i < locCount) {
                                    for (var y = 1; y <= m; y++) {
                                        for (var z = 0; z < this.colors.length; z++) {
                                            if (this.ProviderLocations()[i]) {
                                                this.ProviderLocations()[i]["BorderColorCode"](this.colors[z]["BorderColor"]);
                                                this.ProviderLocations()[i]["Color"](this.colors[z]["color"]);

                                                i = i + 1;
                                            }
                                        }
                                    }
                                    if (reminder >= 1) {
                                        for (var k = 0; k < reminder; k++) {
                                            if (this.ProviderLocations()[i]) {
                                                this.ProviderLocations()[i]["BorderColorCode"](this.colors[k]["BorderColor"]);
                                                this.ProviderLocations()[i]["Color"](this.colors[k]["color"]);
                                                i = i + 1;
                                            }
                                        }
                                    }
                                }
                            } else {
                                for (var z = 0; z < this.colors.length; z++) {
                                    if (this.ProviderLocations()[i]) {
                                        this.ProviderLocations()[i]["BorderColorCode"](this.colors[z]["BorderColor"]);
                                        this.ProviderLocations()[i]["Color"](this.colors[z]["color"]);
                                        i = i + 1;
                                    }
                                }
                            }
                        };

                        CalendarViewModel.prototype.prevMonth = function () {
                            try  {
                                var selectedDate = this.SelectedDate();
                                var newMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
                                this.SelectedDate(newMonth);
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        CalendarViewModel.prototype.nextMonth = function () {
                            try  {
                                var selectedDate = this.SelectedDate();
                                var newMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
                                this.SelectedDate(newMonth);
                            } catch (ex) {
                                console.log(ex);
                            }
                        };
                        CalendarViewModel.prototype.showPopup = function (element, title) {
                            if (typeof element === "undefined") { element = null; }
                            if (typeof title === "undefined") { title = ''; }
                            CrmData.Common.disableHTMLScroll();
                            if (!element) {
                                element = document.createElement('DIV');
                            }
                            var contentWidth = $(element).innerWidth();
                            var contentHeight = $(element).innerHeight();
                            var elementOwner = element.parentNode;
                            var closePopupDelegate = element['closePopup'] = function (e, data) {
                                if ($(popupElement).find('#spnDataChanged').text().toLowerCase() == "true") {
                                    var scheduleType = ($(popupElement).find('#spnScheduleType').text().toLowerCase() == "true") ? 'Recurring' : 'Single Day';
                                    AppUI.confirm('Your changes will be lost if you continue, press yes to close or no to return to Set ' + scheduleType + ' Schedule', function () {
                                        return contentElement.fadeOut('fast', function () {
                                            if (popupElement) {
                                                if (elementOwner) {
                                                    elementOwner.appendChild(element);
                                                }
                                                $(popupElement).remove();
                                                popupElement = null;
                                                if ($('.ccx-ui-popup-container').length == 0) {
                                                    document.body.style.overflow = 'auto';
                                                }
                                                if (element['onHidePopup']) {
                                                    element['onHidePopup']();
                                                }
                                            }
                                            CrmData.Common.enableHTMLScroll();
                                        });
                                    });
                                } else {
                                    if (popupElement) {
                                        if (elementOwner) {
                                            elementOwner.appendChild(element);
                                        }
                                        $(popupElement).remove();
                                        popupElement = null;
                                        if ($('.ccx-ui-popup-container').length == 0) {
                                            document.body.style.overflow = 'auto';
                                        }
                                        if (element['onHidePopup']) {
                                            element['onHidePopup']();
                                        }
                                    }
                                    CrmData.Common.enableHTMLScroll();
                                }
                            };
                            element['hidePopup'] = function () {
                                if (popupElement) {
                                    $('.ccx-ui-popup', popupElement).fadeOut('fast');
                                    $('#w2ui-global-items').remove();
                                }
                            };
                            element['showPopup'] = function () {
                                if (popupElement) {
                                    $('.ccx-ui-popup', popupElement).fadeIn('fast');
                                }
                            };
                            var popupElement = AppUI.createElementTree({
                                '@class': 'ccx-ui-popup-container',
                                '.ccx-ui-popup-shade': {},
                                '.ccx-ui-popup': {
                                    '.ccx-ui-popup-content': {
                                        'onclick': function (e) {
                                            return AppUI.cancelEvent(e);
                                        },
                                        '.ccx-ui-popup-title': {
                                            '.ccx-ui-popup-close': {
                                                'onclick': function (e) {
                                                    return closePopupDelegate(e);
                                                }
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
                            if ($('.ccx-ui-popup-shade').length > 0) {
                                $('.ccx-ui-popup-shade', popupElement).remove();
                                contentElement.addClass('ccx-ui-noshadow');
                            }
                            if (contentWidth > 0) {
                                contentElement.width(contentWidth);
                            }
                            if (contentHeight > 0) {
                                bodyElement.css("overflow", "auto");
                            }
                            contentElement.hide();
                            document.body.style.overflow = 'auto';
                            $(popupElement).appendTo(document.body);
                            contentElement.fadeIn('slow');
                            return element;
                        };

                        CalendarViewModel.prototype.showRelated = function (item) {
                            $('.schedule-item').removeClass('related');
                            if (this.HighlightedItem) {
                                this.HighlightedItem.LinkVisible = false;
                            }
                            if (!item.LinkVisible && item.LinkId) {
                                item.LinkVisible = true;
                                $('.link-' + item.LinkId).addClass('related');
                                this.HighlightedItem = item;
                            }
                        };

                        CalendarViewModel.prototype.hideRelated = function (item) {
                            if (item.LinkVisible && item.LinkId) {
                                item.LinkVisible = false;
                                $('.link-' + item.LinkId).removeClass('related');
                            }
                        };

                        CalendarViewModel.prototype.showDetail = function (item) {
                            var element = AppUI.Popup.show(null, 'Schedule Detail');
                            CrmData.Common.disableHTMLScroll();
                            $(element).addClass('read-only').addClass('ccx-page').addClass('static');
                            App.View.load({
                                ViewName: 'Scheduling-Provider-WorkHours-WorkHourFlyout',
                                ViewContext: item
                            }, element);
                        };

                        CalendarViewModel.prototype.removeItem = function (item) {
                            var _this = this;
                            try  {
                                $(document).click();

                                if (item.LinkId) {
                                    this.selectRecurrence(item.Date, function (r) {
                                        AppUI.Popup.hideAll();
                                        if (r == 'Single') {
                                            _this.WorkHours.remove(item);
                                        } else if (r == 'Remaining') {
                                            _this.WorkHours.remove(function (wh) {
                                                return wh.LinkId == item.LinkId && wh.Date >= item.Date;
                                            });
                                        } else if (r == 'All') {
                                            _this.WorkHours.remove(function (wh) {
                                                return wh.LinkId == item.LinkId;
                                            });
                                        }
                                    });
                                } else {
                                    if (AppUI.confirm('Are you sure you want to remove this item?', function () {
                                        _this.WorkHours.remove(item);
                                    }))
                                        ;
                                }
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        CalendarViewModel.prototype.addLocation = function (date) {
                            var _this = this;
                            try  {
                                var self = this;
                                if (self.ProviderLocations().length > 0) {
                                    var providerModel = new Scheduling.Models.ProviderSchedule();

                                    var providerLocations = AppData.select(self.ProviderLocations(), function (location) {
                                        return location.LocationName;
                                    });
                                    var element = AppUI.Popup.show(null, 'Select a Facility To Add:');
                                    CrmData.Common.disableHTMLScroll();
                                    App.View.load({
                                        ViewName: 'Scheduling-Provider-WorkHours-AddLocationPopup',
                                        ViewContext: new WorkHours.LocationViewModel(providerLocations, this.ProviderId(), this.TimezoneCode, function (id) {
                                            providerModel.GetProviderLocations(_this.ProviderId(), function (locations) {
                                                _this.ProviderLocations(AppData.select(locations, function (item) {
                                                    return {
                                                        LocationName: item['ccx_agencylocation_name'],
                                                        Id: item['equipmentid'],
                                                        PartialLocationName: (item['ccx_agencylocation_name'].length > 20) ? item['ccx_agencylocation_name'].substring(0, 19) + '...' : item['ccx_agencylocation_name'],
                                                        BorderColorCode: ko.observable(''),
                                                        Color: ko.observable(''),
                                                        IsActive: item['ccx_schedulestatus']
                                                    };
                                                }));
                                                _this.ColorMapping();
                                            });

                                            self.reload();

                                            self.selectType(function (type) {
                                                AppUI.Popup.hideAll();
                                                CrmData.Common.enableHTMLScroll();
                                                _this.showSchedule(type, id, null, date);
                                            });
                                        })
                                    }, element);
                                }
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        CalendarViewModel.prototype.addItem = function (date) {
                            var _this = this;
                            try  {
                                if (this.ProviderLocations().length > 0) {
                                    this.selectLocation(this.LocationRows(), function (location) {
                                        AppUI.Popup.hideAll();
                                        CrmData.Common.enableHTMLScroll();
                                        if (location == "Add New") {
                                            _this.addLocation(date);
                                        } else {
                                            _this.selectType(function (type) {
                                                _this.SelectedDateForAddItem = date;
                                                AppUI.Popup.hideAll();
                                                CrmData.Common.enableHTMLScroll();
                                                _this.showSchedule(type, location['Id'], undefined, date);
                                            });
                                        }
                                    });
                                } else {
                                    var providerModel = new Scheduling.Models.ProviderSchedule();
                                    var element = AppUI.Popup.show(null, 'Select a Facility To Add:');
                                    CrmData.Common.disableHTMLScroll();
                                    App.View.load({
                                        ViewName: 'Scheduling-Provider-WorkHours-AddLocationPopup',
                                        ViewContext: new WorkHours.LocationViewModel(null, this.ProviderId(), this.TimezoneCode, function (id) {
                                            if (id) {
                                                _this.reload();
                                                _this.selectType(function (type) {
                                                    AppUI.Popup.hideAll();
                                                    CrmData.Common.enableHTMLScroll();
                                                    _this.showSchedule(type, id, null, date);
                                                });
                                            } else {
                                                providerModel.GetAllLocations(null, function (locations) {
                                                    _this.ProviderLocations(AppData.select(locations, function (item) {
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
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        CalendarViewModel.prototype.showSchedule = function (type, equipmentID, selectedDayDetails, selectedDayDate) {
                            var self = this;
                            var element = null;
                            var viewContext = null;
                            var ViewName = "Scheduling-WeeklySchedule";
                            switch (type) {
                                case 0 /* Weekly */:
                                    element = this.showPopup(null, "Set Recurring Weekly Schedule");
                                    viewContext = new Ccx.Scheduling.ViewModels.WeeklyScheduleViewModel(0 /* RecurringSchedule */, this.TimezoneCode, equipmentID, undefined, selectedDayDate, undefined, false, null, this.ProviderId(), function (onsave) {
                                        if (onsave) {
                                            self.reload();
                                        }
                                    });

                                    break;
                                case 1 /* Daily */:
                                    if (selectedDayDetails) {
                                        element = this.showPopup(null, "Edit Schedule");
                                        viewContext = new Ccx.Scheduling.ViewModels.WeeklyScheduleViewModel(1 /* SingleDaySchedule */, this.TimezoneCode, equipmentID, selectedDayDetails, null, undefined, false, null, this.ProviderId(), function (onsave) {
                                            if (onsave) {
                                                self.reload();
                                            }
                                        });
                                    } else {
                                        element = this.showPopup(null, "Set Work Hours and Service Restrictions");
                                        viewContext = new Ccx.Scheduling.ViewModels.WeeklyScheduleViewModel(1 /* SingleDaySchedule */, this.TimezoneCode, equipmentID, undefined, selectedDayDate, undefined, false, null, this.ProviderId(), function (onsave) {
                                            if (onsave) {
                                                self.reload();
                                            }
                                        });
                                    }
                                    break;
                            }
                            $(element).addClass('ccx-page').css('position', 'static');
                            App.View.load({
                                ViewName: ViewName,
                                ViewContext: viewContext
                            }, element);
                        };

                        CalendarViewModel.prototype.showEditOption = function (data, Index, scheduleInfoArray) {
                            var self = this;

                            var equipmentid = AppData.where(this.ProviderLocations(), function (l) {
                                return l.LocationName == data.Location;
                            })[0]['Id'];
                            var element = AppUI.Popup.show(null, "Edit Schedule");
                            CrmData.Common.disableHTMLScroll();
                            var ViewName = "Scheduling-Schedule-ScheduleType";
                            App.View.load({
                                ViewName: ViewName,
                                ViewContext: new Ccx.Scheduling.ViewModels.ScheduleTypeViewModel(data, equipmentid, this.TimezoneCode, scheduleInfoArray, function (onsave) {
                                    self.reload();
                                })
                            }, element);

                            $('#w2ui-overlay').find('.close').click();
                        };

                        CalendarViewModel.prototype.selectLocation = function (arrayOfLocations, callback) {
                            try  {
                                var element = AppUI.Popup.show(null, 'Add Schedule');
                                CrmData.Common.disableHTMLScroll();
                                App.View.load({
                                    ViewName: 'Scheduling-Provider-WorkHours-ScheduleLocationPopup',
                                    ViewContext: {
                                        locations: arrayOfLocations,
                                        select: callback.bind(this),
                                        location: function (l) {
                                            callback(l);
                                        }
                                    }
                                }, element);
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        CalendarViewModel.prototype.selectType = function (callback) {
                            try  {
                                var element = AppUI.Popup.show(null, 'Add Schedule');
                                CrmData.Common.disableHTMLScroll();
                                App.View.load({
                                    ViewName: 'Scheduling-Provider-WorkHours-ScheduleTypePopup',
                                    ViewContext: {
                                        select: callback.bind(this)
                                    }
                                }, element);
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        CalendarViewModel.prototype.selectRecurrence = function (date, callback) {
                            try  {
                                var element = AppUI.Popup.show(null, 'Remove Schedule');
                                CrmData.Common.disableHTMLScroll();
                                App.View.load({
                                    ViewName: 'Scheduling-Provider-WorkHours-ScheduleRecurrencePopup',
                                    ViewContext: {
                                        date: date,
                                        select: callback.bind(this)
                                    }
                                }, element);
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        CalendarViewModel.prototype.getMonthName = function (date) {
                            try  {
                                var month = date.getMonth();
                                return MonthNames[month];
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        CalendarViewModel.prototype.daysAreEqual = function (date1, date2) {
                            if (date1 && date2) {
                                return (date1.getFullYear() == date2.getFullYear() && date1.getMonth() == date2.getMonth() && date1.getDate() == date2.getDate());
                            }
                        };

                        CalendarViewModel.prototype.reload = function () {
                            try  {
                                this.FilteredLocation('');
                                $("#ddllocations").css("display", "none");
                                this.IsWorkhouRefreshed(false);
                                this.getFacilityResourceIds(this.ProviderId());
                                this.GetAllLocation();
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        CalendarViewModel.prototype.filter = function (event) {
                            $('#ddllocations').stop().slideToggle(500);
                        };
                        CalendarViewModel.prototype.HighLightSelection = function (viewdata, event, data, Index) {
                            $('.calendar-table').find('.schedule-item.selected').removeClass('selected');
                            $('.calendar-table').find('.calendar-day.selected').removeClass('selected');

                            $(event.srcElement).parent('.schedule-item').addClass("selected");
                            $(event.srcElement).closest('.calendar-day').addClass("selected");
                        };

                        CalendarViewModel.prototype.filterLocation = function (selected) {
                            try  {
                                this.WorkHours(this.FilterWorkHours.filter(function (wh) {
                                    return wh.Location == selected.LocationName;
                                }));

                                this.FilteredLocation(selected);
                                $('#ddllocations').stop().slideUp(500);
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        CalendarViewModel.prototype.getFacilityResourceIds = function (providerId) {
                            var _this = this;
                            try  {
                                if (!this.IsWorkhouRefreshed()) {
                                    var NoworkHours = true;
                                    var count = 0;
                                    var providerModel = new Scheduling.Models.ProviderSchedule();
                                    var providerProfile = new ViewModels.ProviderProfileViewModel();
                                    this.SelectedMonthLocations.removeAll();
                                    providerModel.GetFacilityEquipmentResourceIds(providerId, function (locations) {
                                        if (locations && locations.length > 0) {
                                            NoworkHours = false;
                                            _this.updateWorkHours(_this.SelectedDate(), locations);
                                        } else {
                                            _this.WorkHours([]);
                                            CrmData.Common.showMessage(NOWORKHOURFOUND);
                                        }
                                    });
                                    this.IsWorkhouRefreshed = ko.observable(true);
                                }
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        CalendarViewModel.prototype.EditWorkHours = function (schedule, e, Index) {
                            $(document).click();
                            schedule.ScheduleTypeInfo.ProviderID = this.ProviderId();
                            if ($(e.srcElement).parent('.schedule-item').hasClass('selected')) {
                                schedule.EquipmentId = AppData.where(this.ProviderLocations(), function (l) {
                                    return l.LocationName == schedule.Location;
                                })[0]['Id'];
                                if (schedule.ScheduleTypeInfo.Frequency == 0 /* Weekly */) {
                                    this.showEditOption(schedule, Index, schedule.ScheduleTypeInfo);
                                } else {
                                    this.showSchedule(schedule.Type, schedule.EquipmentId, schedule);
                                }
                            }
                        };

                        CalendarViewModel.prototype.RemoveDefaultWorkhour = function () {
                            var _this = this;
                            var allWorkhour = AppData.where(this.WorkHours(), function (s) {
                                return (s.EndTime.getHours() - s.StartTime.getHours() == 0 && s.EndTime.getMinutes() - s.StartTime.getMinutes() == 5);
                            });
                            ko.utils.arrayForEach(allWorkhour, function (item) {
                                _this.WorkHours.remove(item);
                            });
                        };

                        CalendarViewModel.prototype.updateWorkHours = function (date, locations) {
                            var _this = this;
                            var doneLoading = AppUI.loading('Loading...', 10, $('.scheduling-provider-workhours-calendar')[0]);
                            var thisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
                            var startDate = new Date(date.getFullYear(), date.getMonth(), -(thisMonth.getDay() - 1));
                            var endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 42);
                            var providerModel = new Scheduling.Models.ProviderSchedule();

                            providerModel.GetProviderWorkHours(locations, startDate, endDate, function (wh) {
                                if (wh && wh.length > 0) {
                                    _this.WorkHours(AppData.select(wh, function (item) {
                                        var borderColor = AppData.where(_this.ProviderLocations(), function (l) {
                                            return l.LocationName == item.Location;
                                        })[0].BorderColorCode();
                                        var color = AppData.where(_this.ProviderLocations(), function (l) {
                                            return l.LocationName == item.Location;
                                        })[0].Color();

                                        var pattern;
                                        pattern = item.Pattern;
                                        var patternCol = pattern.split(';');
                                        var freq = (patternCol[0].split('=')[1].toLowerCase() == "daily") ? "Daily" : "Weekly";
                                        var days = '';

                                        var col = {};
                                        if (item.IsVaried) {
                                            var ruleCollection = AppData.where(CALENDAR_RULES_COLLECTION, function (c) {
                                                return c.CalendarId === item.ParentCalendarId;
                                            })[0];
                                            col = AppData.where(ruleCollection['CalendarRules'].scheduleInfo, function (s) {
                                                return (s['isvaried'] && AppData.formatDate(s['starttime']) === AppData.formatDate(item['ScheduleInfoStartTime']));
                                            });

                                            $.each(col, function (i, p) {
                                                days += p['pattern'].split(';')[2].split('=')[1] + ',';
                                            });
                                            if (days) {
                                                days = days.substring(0, days.lastIndexOf(','));
                                            }
                                        } else {
                                            days = ((patternCol[2]) ? patternCol[2].split('=')[1] : '');
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
                                            Type: (item.IsTimeOff ? 2 /* TimeOff */ : item.IsBreak ? 3 /* Break */ : (freq === "Weekly") ? 0 /* Weekly */ : 1 /* Daily */),
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
                                    _this.RemoveDefaultWorkhour();
                                    var currentMonthLocation = [];
                                    var distinctLocation = AppData.distinct(_this.WorkHours(), function (i) {
                                        return i.Location;
                                    });
                                    ko.utils.arrayForEach(distinctLocation, function (item) {
                                        var result = AppData.where(_this.ProviderLocations(), function (s) {
                                            if (s['LocationName'] === item['Location']) {
                                                return {
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
                                    _this.SelectedMonthLocations(currentMonthLocation);
                                    doneLoading();
                                } else {
                                    doneLoading();
                                    _this.WorkHours([]);
                                    CrmData.Common.showMessage(NOWORKHOURFOUND);
                                }
                                _this.FilterWorkHours = _this.WorkHours();
                                if (_this.FilteredLocation()) {
                                    _this.filterLocation(_this.FilteredLocation());
                                }
                            });
                        };

                        CalendarViewModel.prototype.formatTime = function (datetime, military) {
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
                            if (military) {
                                var time = $.datepicker['parseTime']('h:mm tt', normalTime);
                                var timeString = $.datepicker['formatTime']('HH:mm', time);
                                return timeString;
                            } else {
                                return normalTime;
                            }
                        };
                        return CalendarViewModel;
                    })();
                    WorkHours.CalendarViewModel = CalendarViewModel;

                    var MonthNames;
                    (function (MonthNames) {
                        MonthNames[MonthNames["January"] = 0] = "January";
                        MonthNames[MonthNames["February"] = 1] = "February";
                        MonthNames[MonthNames["March"] = 2] = "March";
                        MonthNames[MonthNames["April"] = 3] = "April";
                        MonthNames[MonthNames["May"] = 4] = "May";
                        MonthNames[MonthNames["June"] = 5] = "June";
                        MonthNames[MonthNames["July"] = 6] = "July";
                        MonthNames[MonthNames["August"] = 7] = "August";
                        MonthNames[MonthNames["September"] = 8] = "September";
                        MonthNames[MonthNames["October"] = 9] = "October";
                        MonthNames[MonthNames["November"] = 10] = "November";
                        MonthNames[MonthNames["December"] = 11] = "December";
                    })(MonthNames || (MonthNames = {}));
                })(Provider.WorkHours || (Provider.WorkHours = {}));
                var WorkHours = Provider.WorkHours;
            })(ViewModels.Provider || (ViewModels.Provider = {}));
            var Provider = ViewModels.Provider;
        })(Scheduling.ViewModels || (Scheduling.ViewModels = {}));
        var ViewModels = Scheduling.ViewModels;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var NOUSERINFOFOUND = 'There is no user info found';
var DEFAULTSTART_DATE = '2000-01-01T00:00:00Z';
var DEFAULTEND_DATE = '9999-12-30T00:00:00Z';
var DEFAULT_SCHEDULE_START_TIME = '12:00 AM';
var DEFAULT_SCHEDULE_END_TIME = '12:05 AM';
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (ViewModels) {
            (function (Provider) {
                (function (WorkHours) {
                    var LocationViewModel = (function () {
                        function LocationViewModel(providerLocations, providerId, timeZoneCode, OnLocationAdded) {
                            this.OnLocationAdded = OnLocationAdded;
                            this.TimeZoneCode = (timeZoneCode) ? timeZoneCode : '0';
                            this.providerModel = new Scheduling.Models.ProviderSchedule();
                            this.AgencyLocations = ko.observableArray([]);
                            this.GetProviderDetails(providerId);
                            this.SelectedLocation = ko.observable(null);
                            this.LoadData(providerLocations);
                            this.IsSelected = ko.observable(false);
                            this.IsEnable = ko.observable(false);
                            this.IsSaved = false;
                        }
                        LocationViewModel.prototype.LoadData = function (providerLocations) {
                            var _this = this;
                            try  {
                                var doneLoading = AppUI.loading('Loading...', 1, $('.scheduling-provider-workhours-addlocation-popup')[0]);
                                var providerModel = new Scheduling.Models.ProviderSchedule();
                                var self = this;
                                providerModel.GetAllLocations(providerLocations, function (allLocations) {
                                    _this.SelectRow(_this);
                                    _this.AgencyLocations(allLocations);
                                    if (_this.AgencyLocations().length > 0) {
                                        _this.IsEnable(true);
                                    } else {
                                        _this.IsEnable(false);
                                        CrmData.Common.showMessage("No location found");
                                    }

                                    doneLoading();
                                });
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        LocationViewModel.prototype.SelectRow = function (location) {
                            if (location) {
                                this.SelectedLocation(location);
                                if (location.FacilityName) {
                                    this.IsSelected(true);
                                } else {
                                    this.IsSelected(false);
                                }
                            }
                        };

                        LocationViewModel.prototype.GetProviderDetails = function (providerId) {
                            var _this = this;
                            try  {
                                this.providerModel.GetProviderInformation(providerId, function (user) {
                                    if (user[0]) {
                                        _this.providerInformation = {
                                            ProviderName: user[0]['fullname'], ProviderId: user[0]['systemuserid'], BusinessUnit: user[0]['businessunitid'], BusinessUnitName: user[0]['businessunitid_name'], Timezonecode: user[0]['usersettings.timezonecode']
                                        };
                                    }
                                });
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        LocationViewModel.prototype.SavefacilityRecordEquipment = function () {
                            var _this = this;
                            try  {
                                var equipment;
                                var facilityName;
                                var self = this;

                                facilityName = this.SelectedLocation().FacilityName;

                                if (this.providerInformation) {
                                    equipment = {
                                        ccx_agencylocation: this.SelectedLocation().FacilityId,
                                        name: this.providerInformation.ProviderName + '-' + facilityName,
                                        ccx_provider: this.providerInformation.ProviderId,
                                        businessunitid: this.providerInformation.BusinessUnit,
                                        timezonecode: this.providerInformation.Timezonecode,
                                        ccx_schedulestatus: false
                                    };

                                    this.providerModel.SaveFacilityEquipment(equipment, function (Equipmentid) {
                                        if (Equipmentid) {
                                            if (_this.OnLocationAdded) {
                                                CrmData.ScheduleData.AddWorkHours(DEFAULTSTART_DATE, DEFAULT_SCHEDULE_START_TIME, DEFAULTEND_DATE, DEFAULT_SCHEDULE_END_TIME, '', '', Equipmentid.toString(), '', parseInt(_this.TimeZoneCode), '', 0, false, true, false, DEFAULTEND_DATE, '', -1, function (result) {
                                                    if (result && result.issuccess) {
                                                        CrmData.ScheduleData.AddWorkHours(DEFAULTSTART_DATE, DEFAULT_SCHEDULE_START_TIME, DEFAULTEND_DATE, DEFAULT_SCHEDULE_END_TIME, '', '', Equipmentid.toString(), 'SU,MO,TU,WE,TH,FR,SA', parseInt(_this.TimeZoneCode), '', 0, false, false, false, DEFAULTSTART_DATE, '', -1, function (isAdded) {
                                                            if (isAdded && isAdded.issuccess) {
                                                                _this.providerModel.UpdateCalendarStatus(Equipmentid, function (isUpdated) {
                                                                    CrmData.Common.showMessage("Location added successfully!");
                                                                    AppUI.Popup.hideAll();
                                                                    CrmData.Common.enableHTMLScroll();
                                                                    _this.OnLocationAdded(Equipmentid);
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            }
                                        } else {
                                            CrmData.Common.showMessage("Error");
                                        }
                                    });
                                }
                            } catch (ex) {
                                console.log(ex);
                            }
                        };

                        LocationViewModel.prototype.SaveFacilityEquipementRecord = function () {
                            var self = this;
                            if (self.AgencyLocations().length > 0 && self.IsSelected()) {
                                if (!self.IsSaved) {
                                    self.IsSaved = true;
                                    AppUI.confirm('Are you sure you want to add this location?', function () {
                                        if (self.IsEnable()) {
                                            self.IsEnable(false);
                                            self.SavefacilityRecordEquipment();
                                        }
                                    }, function () {
                                        self.IsEnable(true);
                                        self.IsSaved = false;
                                    });
                                    setTimeout(function () {
                                        $('#w2ui-lock').css('z-index', 99999);
                                    }, 200);
                                }
                            } else {
                                CrmData.Common.showMessage("Please select a location to add.");
                            }
                        };
                        return LocationViewModel;
                    })();
                    WorkHours.LocationViewModel = LocationViewModel;
                })(Provider.WorkHours || (Provider.WorkHours = {}));
                var WorkHours = Provider.WorkHours;
            })(ViewModels.Provider || (ViewModels.Provider = {}));
            var Provider = ViewModels.Provider;
        })(Scheduling.ViewModels || (Scheduling.ViewModels = {}));
        var ViewModels = Scheduling.ViewModels;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var LOCATION_ORIGIN = document.location.href.substring(0, document.location.href.indexOf(document.location.pathname));
var IMAGE_URL = "https://scheduling.cocentrix.com/Image/download.aspx?Entity=systemuser&Attribute=entityimage&Id=";
var EDIT_PROFILE_URL = "/main.aspx?etc=8&pagetype=entityrecord&id=";
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (ViewModels) {
            var ProviderProfileViewModel = (function () {
                function ProviderProfileViewModel() {
                    this.ProviderSearchvalue = ko.observable('');
                    this.ProviderSearchVisibility = ko.observable(true);
                    this.ProviderDetailsVisibility = ko.observable(false);
                    this.SearchLabel = ko.observable('');
                    this.SearchExpression = ko.observable('');
                    this.TimezoneCode = ko.observable('');
                    this.InFormulary = ko.observable(true);
                    this.provider = new Scheduling.Models.ProviderSearch();
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
                ProviderProfileViewModel.prototype.ProviderSearch = function (search, callback) {
                    var _this = this;
                    this.provider.GetProviders(search, function (list) {
                        _this.validateResults(list, callback);
                    });
                    return true;
                };

                ProviderProfileViewModel.prototype.ShowCalendar = function () {
                    var viewContext = new ViewModels.Provider.WorkHours.CalendarViewModel({
                        providerId: this.ProviderId(),
                        timezonecode: this.TimezoneCode()
                    });

                    App.View.load({
                        ViewName: 'Scheduling-Provider-WorkHours-CalendarView',
                        ViewContext: viewContext
                    }, document.getElementById('divRight-tab'));
                };

                ProviderProfileViewModel.prototype.ShowServicesUI = function () {
                    var viewContext = new ViewModels.CalendarAdministrationMyServicesViewModel();

                    App.View.load({
                        ViewName: 'Scheduling-CalendarAdministrationMyServices',
                        ViewContext: viewContext
                    }, document.getElementById('divRight-tab'));
                };

                ProviderProfileViewModel.prototype.ClearAppointmentView = function () {
                    $('#divRight-tab').empty();
                };

                ProviderProfileViewModel.prototype.ShowAppointments = function () {
                    var viewContext = new Ccx.Scheduling.ViewModels.Schedule.AppointmentViewModel(this.ProviderId());

                    App.View.load({
                        ViewName: 'Scheduling-Schedule-AppointmentView',
                        ViewContext: viewContext
                    }, document.getElementById('divRight-tab'));

                    viewContext.selectedView('month');
                    $(".weekView").css("background", "#A7CDF0");
                };

                ProviderProfileViewModel.prototype.onProviderSelected = function () {
                    var findFDBId = function (fdbId, lookup) {
                        var match = $.grep(lookup, function (item) {
                            return (item["Id"] == fdbId);
                        });
                        if (match.length > 0) {
                            return match[0]["Value"];
                        } else {
                            return null;
                        }
                    };
                };

                ProviderProfileViewModel.prototype.SelectItem = function (item, callback) {
                    if (item) {
                        var meds = item.Value;
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
                };

                ProviderProfileViewModel.prototype.ViewProviderDetails = function (profileInfo) {
                    this.ProviderDetailsVisibility(true);
                    this.ProviderSearchVisibility(false);
                    this.ProviderSearchvalue('');
                    this.ProviderName(profileInfo.Text);
                    this.BindProviderDetails(profileInfo.Value);
                };

                ProviderProfileViewModel.prototype.validateResults = function (list, callback) {
                    if (list.length == 0 && this.PrevProviderName) {
                        CrmData.Common.showMessage('No Results Found. Selecting previous provider.', 5);
                        this.SearchExpression(this.PrevProviderName);
                        $('.lookup').blur();
                    } else {
                        callback(list);
                    }
                };

                ProviderProfileViewModel.prototype.BindProviderDetails = function (providerId) {
                    var _this = this;
                    var Model = new Scheduling.Models.ProviderSchedule();

                    Model.GetProviderInformation(providerId, function (Provider) {
                        _this.ProviderFullName(Provider[0]['fullname']);
                        _this.ProviderTitle(Provider[0]['title']);
                        _this.ProviderId(providerId);
                        _this.ProviderImageUrl(IMAGE_URL + providerId);
                        _this.ProviderProfileUrl(EDIT_PROFILE_URL + providerId);
                        _this.TimezoneCode(Provider[0]['usersettings.timezonecode']);
                    });
                };

                ProviderProfileViewModel.prototype.ShowWeeklyAppointments = function () {
                    var viewContext = new Scheduling.ViewModels.Schedule.AppointmentWeeklyViewModel({ providerId: this.ProviderId() });

                    App.View.load({
                        ViewName: 'Scheduling-Schedule-AppointmentWeekly',
                        ViewContext: viewContext
                    }, document.getElementById('divRight-tab'));
                };
                return ProviderProfileViewModel;
            })();
            ViewModels.ProviderProfileViewModel = ProviderProfileViewModel;
        })(Scheduling.ViewModels || (Scheduling.ViewModels = {}));
        var ViewModels = Scheduling.ViewModels;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (ViewModels) {
            (function (Schedule) {
                var AppointmentFlyoutViewModel = (function () {
                    function AppointmentFlyoutViewModel(data) {
                        $('#w2ui-overlay').attr('style', 'left:100px !important;');
                        this.SelectedData = ko.observable(data);
                    }
                    AppointmentFlyoutViewModel.prototype.formatTime = function (datetime, military) {
                        var appoitmentStartTime = datetime;
                        if (appoitmentStartTime) {
                            return appoitmentStartTime.getHours() + ":" + appoitmentStartTime.getMinutes();
                        }
                        return "";
                    };
                    return AppointmentFlyoutViewModel;
                })();
                Schedule.AppointmentFlyoutViewModel = AppointmentFlyoutViewModel;
            })(ViewModels.Schedule || (ViewModels.Schedule = {}));
            var Schedule = ViewModels.Schedule;
        })(Scheduling.ViewModels || (Scheduling.ViewModels = {}));
        var ViewModels = Scheduling.ViewModels;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (ViewModels) {
            (function (Schedule) {
                (function (IAppointmentType) {
                    IAppointmentType[IAppointmentType["Hold"] = 803080000] = "Hold";
                    IAppointmentType[IAppointmentType["ClientService"] = 803080001] = "ClientService";
                    IAppointmentType[IAppointmentType["Group"] = 803080002] = "Group";
                })(Schedule.IAppointmentType || (Schedule.IAppointmentType = {}));
                var IAppointmentType = Schedule.IAppointmentType;

                var MonthNames;
                (function (MonthNames) {
                    MonthNames[MonthNames["January"] = 0] = "January";
                    MonthNames[MonthNames["February"] = 1] = "February";
                    MonthNames[MonthNames["March"] = 2] = "March";
                    MonthNames[MonthNames["April"] = 3] = "April";
                    MonthNames[MonthNames["May"] = 4] = "May";
                    MonthNames[MonthNames["June"] = 5] = "June";
                    MonthNames[MonthNames["July"] = 6] = "July";
                    MonthNames[MonthNames["August"] = 7] = "August";
                    MonthNames[MonthNames["September"] = 8] = "September";
                    MonthNames[MonthNames["October"] = 9] = "October";
                    MonthNames[MonthNames["November"] = 10] = "November";
                    MonthNames[MonthNames["December"] = 11] = "December";
                })(MonthNames || (MonthNames = {}));

                (function (AppointmentScheduleType) {
                    AppointmentScheduleType[AppointmentScheduleType["AllDay"] = 0] = "AllDay";
                    AppointmentScheduleType[AppointmentScheduleType["Duraion"] = 1] = "Duraion";
                })(Schedule.AppointmentScheduleType || (Schedule.AppointmentScheduleType = {}));
                var AppointmentScheduleType = Schedule.AppointmentScheduleType;

                var AppointmentMonthViewModel = (function () {
                    function AppointmentMonthViewModel(providerId, selectedDate, selectedDateTime) {
                        var _this = this;
                        AppointmentMonthViewModel._self = this;
                        this.ProviderId = ko.observable(providerId.toString());
                        this.FilteredLocation = ko.observable('');
                        this.allAppointments = ko.observableArray([]);
                        this.ProviderLocations = ko.observableArray([]);
                        this.FilterAppointments = [];
                        this.WorkHours = ko.observableArray([]);
                        this.ProviderLocationsMonthFilter = ko.observableArray([]);
                        this.ProviderLocations = ko.observableArray([]);
                        this.SelectedDate = ko.observable(selectedDate || new Date());
                        this.SelectedMonth = ko.computed(function () {
                            return _this.getMonthName(_this.SelectedDate());
                        });
                        this.HeaderText = ko.computed(function () {
                            return _this.SelectedMonth() + ' ,' + _this.SelectedDate().getFullYear();
                        });
                        this.CalendarRows = ko.computed(function () {
                            var selectedDate = _this.SelectedDate();
                            var thisMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
                            var startDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), -(thisMonth.getDay() - 1));
                            var days = [];
                            for (var d = 0; d <= 42; d++) {
                                var date = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + d);
                                days.push({
                                    IsCurrentMonth: date.getMonth() == selectedDate.getMonth(),
                                    Month: date.getMonth() + 1,
                                    Day: date.getDate(),
                                    Date: date
                                });
                            }
                            var rows = [];
                            for (var d = 0; d <= days.length; d++) {
                                if (d % 7 == 0) {
                                    rows.push({
                                        Days: days.slice(d - 7, d)
                                    });
                                }
                            }
                            return rows;
                        });
                        this.SelectedMonthLocations = ko.observableArray([]);
                        this.GetProviderAppointments(this.SelectedDate());
                        var providerModel = new Scheduling.Models.Appointment();
                    }
                    AppointmentMonthViewModel.prototype.GetProviderAppointments = function (date) {
                        var _this = this;
                        try  {
                            var doneLoading = AppUI.loading('Loading...', 1, $('.scheduling-provider-workhours-calendar')[0]);
                            var thisMonth = new Date(date.getFullYear(), date.getMonth(), 1);
                            var startDate = new Date(date.getFullYear(), date.getMonth(), -(thisMonth.getDay() - 1));
                            var endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 42);
                            this.SelectedMonthLocations.removeAll();
                            CrmData.CalendarUtils.GetProviderAppointments(this.ProviderId(), startDate.toDateString(), endDate.toDateString(), function (result) {
                                _this.ProviderLocations(result.providerLocations);
                                _this.allAppointments(result.allAppointments);
                                CrmData.CalendarUtils.ColorMapping(_this.ProviderLocations);
                                CrmData.CalendarUtils.ColorMappingAppointment(_this.allAppointments, _this.ProviderLocations());
                                _this.FilterAppointments = _this.allAppointments();
                            });
                        } catch (ex) {
                            console.log(ex);
                        }
                    };
                    AppointmentMonthViewModel.prototype.EncompassBorder = function () {
                    };

                    AppointmentMonthViewModel.prototype.daysAreEqual = function (date1, date2) {
                        var date = new Date(date1);
                        return (date.getFullYear() == date2.getFullYear() && date.getMonth() == date2.getMonth() && date.getDate() == date2.getDate());
                    };
                    AppointmentMonthViewModel.prototype.getMonthName = function (date) {
                        var month = date.getMonth();
                        return MonthNames[month];
                    };
                    AppointmentMonthViewModel.prototype.showRelated = function (item) {
                        if (!item.LinkVisible && item.LinkId) {
                            item.LinkVisible = true;
                            $('.link-' + item.LinkId).addClass('related');
                        }
                    };

                    AppointmentMonthViewModel.prototype.OnNextClick = function () {
                        try  {
                            var vm = AppointmentMonthViewModel._self;
                            var selectedDate = vm.SelectedDate();
                            var newMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1);
                            vm.SelectedDate(newMonth);
                        } catch (ex) {
                            console.log(ex);
                        }
                    };
                    AppointmentMonthViewModel.prototype.OnPreviousClick = function () {
                        try  {
                            var vm = AppointmentMonthViewModel._self;
                            var tempDate;
                            var selectedDate = vm.SelectedDate();
                            var newMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1);
                            vm.SelectedDate(newMonth);
                        } catch (ex) {
                            console.log(ex);
                        }
                    };
                    AppointmentMonthViewModel.prototype.CurrentMonth = function () {
                        try  {
                            var currentMonth = new Date();
                            var newMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
                            this.SelectedDate(newMonth);
                        } catch (ex) {
                            console.log(ex);
                        }
                    };
                    AppointmentMonthViewModel.prototype.OnRefreshClick = function () {
                        try  {
                            var vm = AppointmentMonthViewModel._self;
                            vm.allAppointments([]);
                            vm.ProviderLocations([]);
                            $("#ddllocations").css("display", "none");
                            vm.GetProviderAppointments(vm.SelectedDate());
                        } catch (ex) {
                            console.log(ex);
                        }
                    };
                    AppointmentMonthViewModel.prototype.hideRelated = function (item) {
                        if (item.LinkVisible && item.LinkId) {
                            item.LinkVisible = false;
                            $('.link-' + item.LinkId).removeClass('related');
                        }
                    };
                    AppointmentMonthViewModel.prototype.formatTime = function (datetime, military) {
                        var appoitmentStartTime = datetime;
                        if (appoitmentStartTime) {
                            return appoitmentStartTime.getHours() + ":" + appoitmentStartTime.getMinutes();
                        }
                        return "";
                    };

                    AppointmentMonthViewModel.prototype.filter = function (event) {
                        $('#ddllocations').stop().slideToggle(500);
                    };

                    AppointmentMonthViewModel.prototype.viewBy = function () {
                    };

                    AppointmentMonthViewModel.prototype.OnLocationSelected = function (selected) {
                        try  {
                            var vm = AppointmentMonthViewModel._self;
                            vm.allAppointments(vm.FilterAppointments.filter(function (wh) {
                                return wh.equipmentid == selected.Id;
                            }));

                            vm.FilteredLocation(selected);
                            $('#ddllocations').stop().slideUp(500);
                        } catch (ex) {
                            console.log(ex);
                        }
                    };

                    AppointmentMonthViewModel.prototype.hoverValues = function (scheduledstart, subject, name) {
                        return ("Start Time: " + scheduledstart + "\nClient Name: " + subject + "\nLocation :" + name);
                    };
                    return AppointmentMonthViewModel;
                })();
                Schedule.AppointmentMonthViewModel = AppointmentMonthViewModel;
            })(ViewModels.Schedule || (ViewModels.Schedule = {}));
            var Schedule = ViewModels.Schedule;
        })(Scheduling.ViewModels || (Scheduling.ViewModels = {}));
        var ViewModels = Scheduling.ViewModels;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (ViewModels) {
            (function (Schedule) {
                var AppointmentViewModel = (function () {
                    function AppointmentViewModel(ProviderId) {
                        var self = this;
                        self.ProviderId = ko.observable('');
                        self.CurrentView = ko.observable({});
                        self.ProviderId(ProviderId);
                        self.CurrentViewName = 'Week';
                    }
                    AppointmentViewModel.prototype.selectedView = function (viewName) {
                        var self = this;
                        $(".weekView").addClass(".defaultViewColor");

                        if (viewName != '' && viewName.toLowerCase() != self.CurrentViewName) {
                            switch (viewName.toLowerCase()) {
                                case 'day':
                                    var viewContext = new Scheduling.ViewModels.Schedule.AppointmentWeeklyViewModel({ providerId: self.ProviderId() });
                                    self.CurrentView(viewContext);
                                    App.View.load({
                                        ViewName: 'Scheduling-Schedule-AppointmentWeekly',
                                        ViewContext: viewContext
                                    }, document.getElementById('selectedViewContent'));
                                    self.CurrentViewName = viewName;
                                    break;

                                case 'week':
                                    var viewContext = new Scheduling.ViewModels.Schedule.AppointmentWeeklyViewModel({ providerId: self.ProviderId() });
                                    self.CurrentView(viewContext);
                                    App.View.load({
                                        ViewName: 'Scheduling-Schedule-AppointmentWeekly',
                                        ViewContext: viewContext
                                    }, document.getElementById('selectedViewContent'));
                                    self.CurrentViewName = viewName;
                                    break;

                                case 'month':
                                    var viewContext = new Scheduling.ViewModels.Schedule.AppointmentWeeklyViewModel({ providerId: self.ProviderId() });
                                    self.CurrentView(viewContext);
                                    App.View.load({
                                        ViewName: 'Scheduling-Schedule-AppointmentWeekly',
                                        ViewContext: viewContext
                                    }, document.getElementById('selectedViewContent'));
                                    self.CurrentViewName = viewName;
                                    break;

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
                    };

                    AppointmentViewModel.prototype.filter = function (event) {
                        $('#ddllocations').stop().slideToggle(500);
                    };

                    AppointmentViewModel.prototype.filterAppointmentByLocation = function (location) {
                    };
                    return AppointmentViewModel;
                })();
                Schedule.AppointmentViewModel = AppointmentViewModel;
            })(ViewModels.Schedule || (ViewModels.Schedule = {}));
            var Schedule = ViewModels.Schedule;
        })(Scheduling.ViewModels || (Scheduling.ViewModels = {}));
        var ViewModels = Scheduling.ViewModels;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (ViewModels) {
            (function (Schedule) {
                var Day = (function () {
                    function Day(monthDay, weekDay) {
                        this.dayOfMonth = monthDay;
                        this.dayOfWeek = weekDay;
                    }
                    return Day;
                })();
                Schedule.Day = Day;

                var dayHour = (function () {
                    function dayHour(hr, sfx) {
                        this.hour = hr;
                        this.suffix = sfx ? sfx : '';
                    }
                    dayHour.prototype.PastHalfHour = function () {
                        var srcHour = this;
                        var hr = new dayHour(srcHour.hour + ":30", srcHour.suffix);
                        return hr;
                    };

                    dayHour.prototype.IsHalfPastHour = function () {
                        if (this.hour.indexOf(":30") > 0) {
                            return true;
                        } else {
                            return false;
                        }
                    };
                    return dayHour;
                })();
                Schedule.dayHour = dayHour;

                var Appointment = (function () {
                    function Appointment() {
                    }
                    return Appointment;
                })();
                Schedule.Appointment = Appointment;
                var AppointmentWeeklyViewModel = (function () {
                    function AppointmentWeeklyViewModel(data) {
                        var _this = this;
                        this.hourFormat = '24';
                        AppointmentWeeklyViewModel._self = this;
                        this.providerID = data.providerId;
                        this.weekdays = ko.observableArray(CrmData.CalendarUtils.GetWeekDays());
                        this.HeaderText = ko.computed(function () {
                            var monthDesc = '';
                            monthDesc += CrmData.MonthNames[(_this.weekdays()[0 /* Sunday */]).getMonth()] + " " + (_this.weekdays()[0 /* Sunday */]).getDate() + "- ";
                            if ((_this.weekdays()[0 /* Sunday */]).getMonth() != (_this.weekdays()[6 /* Saturday */]).getMonth()) {
                                monthDesc += CrmData.MonthNames[(_this.weekdays()[6 /* Saturday */]).getMonth()] + " ";
                            }
                            monthDesc += (_this.weekdays()[6 /* Saturday */]).getDate() + ", " + (_this.weekdays()[0 /* Sunday */]).getFullYear();

                            return monthDesc;
                        });
                        this.timings = ko.observableArray(this.getDayHours(this.hourFormat));
                        this.weekAppointments = ko.observableArray([]);
                        this.ProviderLocations = ko.observableArray([]);
                        this.getAppointments();
                        setTimeout(function () {
                            $('.calendar-body').animate({ scrollTop: ($("#tr_16").offset().top - $(".calendar-body").offset().top) }, 'slow');
                        });
                    }
                    AppointmentWeeklyViewModel.prototype.getWeekAppointments = function () {
                        var vm = AppointmentWeeklyViewModel._self;

                        var x = AppData.where(this.allAppointments, function (app) {
                            var tempDate = new Date();

                            var day1 = new Date(tempDate.toString());
                            day1.setDate((vm.weekdays()[0]).getDate());
                            day1.setMonth((vm.weekdays()[0]).getMonth());
                            day1.setFullYear((vm.weekdays()[0]).getFullYear());

                            var day7 = new Date(tempDate.toString());
                            day7.setDate((vm.weekdays()[6]).getDate());
                            day7.setMonth((vm.weekdays()[6]).getMonth());
                            day7.setFullYear((vm.weekdays()[6]).getFullYear());

                            var appDate = new Date(app.scheduledstart);

                            var compareDate = new Date(tempDate.toString());
                            compareDate.setDate(appDate.getDate());
                            compareDate.setMonth(appDate.getMonth());
                            compareDate.setFullYear(appDate.getFullYear());

                            if (compareDate >= day1 && compareDate <= day7) {
                                return true;
                            } else {
                                return false;
                            }
                        });

                        this.weekAppointments(x);
                        this.appointmentsCopy = this.weekAppointments();
                    };

                    AppointmentWeeklyViewModel.prototype.getAppointments = function () {
                        CrmData.CalendarUtils.GetProviderAppointments(this.providerID, this.weekdays()[0].toDateString(), this.weekdays()[6].toDateString(), function (result) {
                            AppointmentWeeklyViewModel._self.allAppointments = result.allAppointments;
                            AppointmentWeeklyViewModel._self.getWeekAppointments();

                            AppointmentWeeklyViewModel._self.ProviderLocations(result.providerLocations);
                            CrmData.CalendarUtils.ColorMapping(AppointmentWeeklyViewModel._self.ProviderLocations);
                            CrmData.CalendarUtils.ColorMappingAppointment(AppointmentWeeklyViewModel._self.weekAppointments, AppointmentWeeklyViewModel._self.ProviderLocations());
                        });
                    };

                    AppointmentWeeklyViewModel.prototype.filterAppointmentByLocation = function (location) {
                        console.log(" || location: " + JSON.stringify(location));
                    };
                    AppointmentWeeklyViewModel.prototype.filter = function (event) {
                        $('#ddllocations').stop().slideToggle(500);
                    };
                    AppointmentWeeklyViewModel.prototype.getDayHours = function (format) {
                        var timeArr = [];
                        var hr;
                        var halfHr;
                        if (format == '24') {
                            hr = new dayHour('00', 'am');
                        } else {
                            hr = new dayHour('12', 'am');
                        }
                        timeArr.push(hr);
                        timeArr.push(hr.PastHalfHour());

                        for (var i = 1; i < 24; i++) {
                            if (i >= 12) {
                                if (i == 12) {
                                    hr = new dayHour(i.toString(), 'pm');
                                } else {
                                    if (format == '24') {
                                        hr = new dayHour(i.toString(), '00');
                                    } else {
                                        hr = new dayHour((i - 12).toString(), '00');
                                    }
                                }
                            } else {
                                if (i == 8) {
                                    hr = new dayHour(i.toString(), 'am');
                                } else {
                                    hr = new dayHour(i.toString(), '00');
                                }
                            }
                            timeArr.push(hr);
                            timeArr.push(hr.PastHalfHour());
                        }
                        return timeArr;
                    };

                    AppointmentWeeklyViewModel.prototype.onCellClick = function () {
                        console.log(JSON.stringify(this));
                    };

                    AppointmentWeeklyViewModel.prototype.OnRefreshClick = function () {
                        try  {
                            $("#ddllocations").css("display", "none");
                            AppointmentWeeklyViewModel._self.getAppointments();
                        } catch (ex) {
                            console.log(ex);
                        }
                    };

                    AppointmentWeeklyViewModel.prototype.isCurrentTimeSlotAppointment = function (timeslot, weekDay, currentApt) {
                        var aptDate;
                        aptDate = new Date(currentApt.scheduledstart);
                        if (aptDate.getDate() == weekDay.getDate()) {
                            if (aptDate.getHours() == Number(timeslot.hour)) {
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    };

                    AppointmentWeeklyViewModel.prototype.OnPreviousClick = function () {
                        var vm = AppointmentWeeklyViewModel._self;
                        var currWeekDay1 = vm.weekdays()[0 /* Sunday */];
                        var prevWeekDay7 = new Date(currWeekDay1.toString());
                        prevWeekDay7.setDate(currWeekDay1.getDate() - 1);
                        vm.weekdays(CrmData.CalendarUtils.GetWeekDays(prevWeekDay7.toString()));
                        vm.getAppointments();
                    };

                    AppointmentWeeklyViewModel.prototype.OnNextClick = function () {
                        var vm = AppointmentWeeklyViewModel._self;
                        var currWeekDay7 = vm.weekdays()[6 /* Saturday */];
                        var nextWeekDay1 = new Date(currWeekDay7.toString());
                        nextWeekDay1.setDate(currWeekDay7.getDate() + 1);
                        vm.weekdays(CrmData.CalendarUtils.GetWeekDays(nextWeekDay1.toString()));
                        vm.getAppointments();
                    };

                    AppointmentWeeklyViewModel.prototype.OnLocationSelected = function (selected) {
                        try  {
                            var vm = AppointmentWeeklyViewModel._self;
                            vm.weekAppointments(vm.appointmentsCopy.filter(function (wh) {
                                return wh.equipmentid == selected.Id;
                            }));
                            $('#ddllocations').stop().slideUp(500);
                        } catch (ex) {
                            console.log(ex);
                        }
                    };
                    return AppointmentWeeklyViewModel;
                })();
                Schedule.AppointmentWeeklyViewModel = AppointmentWeeklyViewModel;
            })(ViewModels.Schedule || (ViewModels.Schedule = {}));
            var Schedule = ViewModels.Schedule;
        })(Scheduling.ViewModels || (Scheduling.ViewModels = {}));
        var ViewModels = Scheduling.ViewModels;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (ViewModels) {
            var ScheduleTypeViewModel = (function () {
                function ScheduleTypeViewModel(data, equipmentID, timezonecode, scheduleTypeInforArray, OnSave) {
                    this.OnSave = OnSave;
                    this.TimeZoneCode = timezonecode;
                    this.EquipmentId = equipmentID;
                    this.ScheduleStartedDate = ko.observable(AppData.formatDate(scheduleTypeInforArray.StartTime));
                    this.SelectedDate = ko.observable(AppData.formatDate(data.Date));
                    this.ScheduleType = ko.observable('0');
                    this.ProviderInfo = new Scheduling.Models.ProviderSchedule();
                    this.ScheduleDetails = data;
                    this.ScheduleInfoArray = (scheduleTypeInforArray) ? scheduleTypeInforArray : undefined;
                    $('#w2ui-overlay').find('.close').click();
                    this.IsNotStartDateofRecurrence = ko.observable(true);

                    if (this.ScheduleStartedDate()) {
                        if (AppData.formatDate(this.SelectedDate()) === AppData.formatDate(this.ScheduleStartedDate())) {
                            this.IsNotStartDateofRecurrence = ko.observable(false);
                        }
                    }
                }
                ScheduleTypeViewModel.prototype.Close = function () {
                    AppUI.Popup.hideAll();
                    CrmData.Common.enableHTMLScroll();
                };

                ScheduleTypeViewModel.prototype.showPopup = function (element, title) {
                    if (typeof element === "undefined") { element = null; }
                    if (typeof title === "undefined") { title = ''; }
                    CrmData.Common.disableHTMLScroll();
                    if (!element) {
                        element = document.createElement('DIV');
                    }
                    var contentWidth = $(element).innerWidth();
                    var contentHeight = $(element).innerHeight();
                    var elementOwner = element.parentNode;
                    var closePopupDelegate = element['closePopup'] = function (e, data) {
                        if ($(popupElement).find('#spnDataChanged').text().toLowerCase() == "true") {
                            var scheduleType = ($(popupElement).find('#spnScheduleType').text().toLowerCase() == "true") ? 'Recurring' : 'Single Day';
                            AppUI.confirm('Your changes will be lost if you continue, press yes to close or no to return to Set ' + scheduleType + ' Schedule', function () {
                                return contentElement.fadeOut('fast', function () {
                                    if (popupElement) {
                                        if (elementOwner) {
                                            elementOwner.appendChild(element);
                                        }
                                        $(popupElement).remove();
                                        popupElement = null;
                                        if ($('.ccx-ui-popup-container').length == 0) {
                                            document.body.style.overflow = 'auto';
                                        }
                                        if (element['onHidePopup']) {
                                            element['onHidePopup']();
                                        }
                                    }
                                    CrmData.Common.enableHTMLScroll();
                                });
                            });
                        } else {
                            if (popupElement) {
                                if (elementOwner) {
                                    elementOwner.appendChild(element);
                                }
                                $(popupElement).remove();
                                popupElement = null;
                                if ($('.ccx-ui-popup-container').length == 0) {
                                    document.body.style.overflow = 'auto';
                                }
                                if (element['onHidePopup']) {
                                    element['onHidePopup']();
                                }
                            }
                            CrmData.Common.enableHTMLScroll();
                        }
                    };
                    element['hidePopup'] = function () {
                        if (popupElement) {
                            $('.ccx-ui-popup', popupElement).fadeOut('fast');
                            $('#w2ui-global-items').remove();
                            CrmData.Common.enableHTMLScroll();
                        }
                    };
                    element['showPopup'] = function () {
                        if (popupElement) {
                            $('.ccx-ui-popup', popupElement).fadeIn('fast');
                            CrmData.Common.disableHTMLScroll();
                        }
                    };
                    var popupElement = AppUI.createElementTree({
                        '@class': 'ccx-ui-popup-container',
                        '.ccx-ui-popup-shade': {},
                        '.ccx-ui-popup': {
                            '.ccx-ui-popup-content': {
                                'onclick': function (e) {
                                    return AppUI.cancelEvent(e);
                                },
                                '.ccx-ui-popup-title': {
                                    '.ccx-ui-popup-close': {
                                        'onclick': function (e) {
                                            return closePopupDelegate(e);
                                        }
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
                    if ($('.ccx-ui-popup-shade').length > 0) {
                        $('.ccx-ui-popup-shade', popupElement).remove();
                        contentElement.addClass('ccx-ui-noshadow');
                    }
                    if (contentWidth > 0) {
                        contentElement.width(contentWidth);
                    }
                    if (contentHeight > 0) {
                        bodyElement.css("overflow", "auto");
                    }
                    contentElement.hide();
                    document.body.style.overflow = 'auto';
                    $(popupElement).appendTo(document.body);
                    contentElement.fadeIn('slow');
                    return element;
                };

                ScheduleTypeViewModel.prototype.ShowSchedule = function () {
                    var _this = this;
                    AppUI.Popup.hideAll();
                    var element = null;
                    var viewContext = null;
                    var ViewName = "Scheduling-WeeklySchedule";
                    var self = this;
                    var ScheduleType;
                    ScheduleType = (this.ScheduleType() == 2 /* Entire */.toString()) ? 2 /* Entire */ : 1 /* SelectedDayForward */;
                    switch (this.ScheduleType()) {
                        case 2 /* Entire */.toString():
                        case 1 /* SelectedDayForward */.toString():
                            element = this.showPopup(null, "Edit Schedule");
                            viewContext = new Ccx.Scheduling.ViewModels.WeeklyScheduleViewModel(0 /* RecurringSchedule */, this.TimeZoneCode, this.EquipmentId, this.ScheduleDetails, null, null, false, ScheduleType, this.ScheduleInfoArray.ProviderID, function (onsave) {
                                if (onsave) {
                                    _this.OnSave(true);
                                }
                            });
                            break;

                        case 0 /* SingleDay */.toString():
                            element = this.showPopup(null, "Set Work Hours and Service Restrictions");
                            viewContext = new Ccx.Scheduling.ViewModels.WeeklyScheduleViewModel(1 /* SingleDaySchedule */, this.TimeZoneCode, this.EquipmentId, this.ScheduleDetails, null, null, true, 0 /* SingleDay */, this.ScheduleInfoArray.ProviderID, function (onsave) {
                                if (onsave) {
                                    _this.OnSave(true);
                                }
                            });
                            break;
                    }
                    $(element).addClass('ccx-page').css('position', 'static');
                    $('.ccx-ui-popup-content').css('max-width', '870px');
                    App.View.load({
                        ViewName: ViewName,
                        ViewContext: viewContext
                    }, element);
                };
                return ScheduleTypeViewModel;
            })();
            ViewModels.ScheduleTypeViewModel = ScheduleTypeViewModel;
        })(Scheduling.ViewModels || (Scheduling.ViewModels = {}));
        var ViewModels = Scheduling.ViewModels;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
var DEFAULTSTARTTIME = "08:00 AM";
var DEFAULTENDTIME = "05:00 PM";

var UNTILDATE_CONFLICT_MESSAGE = "Until Date cannot be less than Start Date";
var DELETE_CALENDAR_CONFIRM = "Do you want to delete this calendar? You can't undo this action.";
var DELETE_SUCCESS = "Work hours deleted successfully!";
var DELETE_FAIL = "Data delete not successfull";
var ADD_SUCCESS = "Work hours added successfully!";
var UPDATE_SUCCESS = "Work hours updated successfully!";
var ADD_UPDATE_FAIL = "Data save/Update not successfull";
var WORK_RANGE_CONFLICT = "Your entry conflicts with the Work Range.Please correct the entries";
var NOENDDATE = 'No End Date';
var MAXDATE = '12/30/9999';
var MINIMUM_DURATION_ALERT = 'Minimum schedule duration must be 10 minutes or more';
var Ccx;
(function (Ccx) {
    (function (Scheduling) {
        (function (ViewModels) {
            (function (IScheduleType) {
                IScheduleType[IScheduleType["RecurringSchedule"] = 0] = "RecurringSchedule";
                IScheduleType[IScheduleType["SingleDaySchedule"] = 1] = "SingleDaySchedule";
                IScheduleType[IScheduleType["TimerOff"] = 2] = "TimerOff";
                IScheduleType[IScheduleType["EntireSchedule"] = 3] = "EntireSchedule";
            })(ViewModels.IScheduleType || (ViewModels.IScheduleType = {}));
            var IScheduleType = ViewModels.IScheduleType;

            (function (RecurrenceEditType) {
                RecurrenceEditType[RecurrenceEditType["SingleDay"] = 0] = "SingleDay";
                RecurrenceEditType[RecurrenceEditType["SelectedDayForward"] = 1] = "SelectedDayForward";
                RecurrenceEditType[RecurrenceEditType["Entire"] = 2] = "Entire";
            })(ViewModels.RecurrenceEditType || (ViewModels.RecurrenceEditType = {}));
            var RecurrenceEditType = ViewModels.RecurrenceEditType;

            (function (DayIndex) {
                DayIndex[DayIndex["SU"] = 0] = "SU";
                DayIndex[DayIndex["MO"] = 1] = "MO";
                DayIndex[DayIndex["TU"] = 2] = "TU";
                DayIndex[DayIndex["WE"] = 3] = "WE";
                DayIndex[DayIndex["TH"] = 4] = "TH";
                DayIndex[DayIndex["FR"] = 5] = "FR";
                DayIndex[DayIndex["SA"] = 6] = "SA";
            })(ViewModels.DayIndex || (ViewModels.DayIndex = {}));
            var DayIndex = ViewModels.DayIndex;

            var WeeklyScheduleViewModel = (function () {
                function WeeklyScheduleViewModel(type, timezonecode, equipmentID, selectedDayWorkHour, selectedDateForAddItem, scheduleTypeInfoArray, IsSingleDayEditOnRecurring, recurrenceEditSubType, providerId, OnSave) {
                    var _this = this;
                    this.OnSave = OnSave;
                    $(document).click();
                    this.ParameterDeclaration(type, timezonecode, equipmentID, selectedDayWorkHour, selectedDateForAddItem, scheduleTypeInfoArray, IsSingleDayEditOnRecurring, recurrenceEditSubType, providerId);
                    this.ScheduleTypeAction(type, selectedDayWorkHour, recurrenceEditSubType);
                    this.Workdays = ko.observableArray([
                        { Text: 'Sun', Value: 'SU' },
                        { Text: 'Mon', Value: 'MO' },
                        { Text: 'Tue', Value: 'TU' },
                        { Text: 'Wed', Value: 'WE' },
                        { Text: 'Thu', Value: 'TH' },
                        { Text: 'Fri', Value: 'FR' },
                        { Text: 'Sat', Value: 'SA' }
                    ]);

                    this.WorkdaysVBD = ko.observableArray(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
                    this.SetVBDDays();
                    this.selectedDate.subscribe(function () {
                        if (selectedDayWorkHour) {
                            selectedDayWorkHour.Date = new Date(_this.selectedDate());
                            _this.LoadWorkHoursForSingleDayEdit(selectedDayWorkHour);
                        }
                    });
                    this.Business = ko.observableArray([
                        { Text: 'Observe', Value: 'OBS' },
                        { Text: 'Do not observe', Value: 'DNO' }
                    ]);
                    this.BindChoices();
                    this.BusinessClosure = ko.observable('DNO');
                    this.Closures = ko.observable("checked");
                    this.schedule.GetTimeZone(function (list) {
                        _this.TimeZone(list);
                    });

                    this.Total = ko.observable('9');
                    this.Working = ko.observable('9');
                    this.Breaks = ko.observable('0');
                    this.TimeTypeBreaks = ko.observable('minutes');
                    this.TimeTypeTotal = ko.observable('hours');
                    this.TimeTypeWorking = ko.observable('hours');
                    if (!this.IsEditMode() && selectedDateForAddItem) {
                        this.UntilDate(new Date(this.DateRange()));
                        this.UntilDate().setDate(selectedDateForAddItem.getDate() + 1);
                        this.UntilDateString = ko.observable(AppData.formatDate(this.UntilDate()));
                    }

                    if (recurrenceEditSubType) {
                        this.RecSubType = recurrenceEditSubType;
                    }
                    this.SubscribeObs();

                    this.EnableSaveBtn = ko.computed(function () {
                        _this.ScheduleRows(), _this.vbd_ScheduleRowsContainer();
                        if (_this.WeeklySchedule()) {
                            if (!_this.VaryByDay()) {
                                if (_this.ScheduleRows().length > 0 && _this.SelectedWorkDays().length > 0)
                                    return true;
                                else
                                    return false;
                            } else {
                                if (_this.vbd_ScheduleRowsContainer().length > 0)
                                    return true;
                                else
                                    return false;
                            }
                        } else {
                            return true;
                        }
                    });
                    this.IsDataChanged = ko.computed(function () {
                        return false;
                    });
                    this.IsDataChanged = ko.computed(function () {
                        _this.WorkHour(), _this.VaryByDay(), _this.DaysCollection(), _this.ScheduleRows(), _this.SetWorkHour(), _this.IsDeleteSchedule(), _this.SelectedWorkDays(), _this.BusinessClosure(), _this.DateRange(), _this.UntilDateString(), _this.TimezoneValue(), _this.selectedDate(), _this.IsFirstTime(), _this.Total();

                        if (!_this.IsFirstTime()) {
                            return true;
                        } else {
                            _this.IsFirstTime = ko.observable(false);
                            return false;
                        }
                    });

                    if (this.IsMSIE()) {
                        setTimeout(function () {
                            $('.ccx-ui-popup-content').css('max-width', '950px');
                            $('.ccx-ui-popup-content').css('width', '950px');
                        }, 200);
                    }
                    this.AdjustButtonsForIE();
                }
                WeeklyScheduleViewModel.prototype.SubscribeObs = function () {
                    var _this = this;
                    this.DateRange.subscribe(function () {
                        if (_this.DateRange().toString() != '') {
                            if (_this.UntilDateString().trim() !== MAXDATE) {
                                _this.UntilDate().setDate(new Date(_this.DateRange().toString()).getDate() + 1);
                                _this.UntilDateString(AppData.formatDate(_this.UntilDate()));
                            }
                        }
                    });

                    this.UntilDateString.subscribe(function () {
                        if (_this.UntilDateString().length > 0 && _this.UntilDateString().trim() !== MAXDATE) {
                            var startDate = new Date(_this.DateRange().toString());
                            var untilDate = new Date(_this.UntilDateString().toString());
                            if (untilDate < startDate) {
                                CrmData.Common.showMessage(UNTILDATE_CONFLICT_MESSAGE);
                                _this.UntilDateString('');
                            }
                        }
                    });

                    this.VaryByDay.subscribe(function () {
                        if (_this.VaryByDay()) {
                            _this.WorkHour(false);
                            _this.SetWorkHour(false);
                            if (_this.vbd_ScheduleRowsContainer().length > 0 && !_this.IsEditMode())
                                _this.vbd_ScheduleRowsContainer.removeAll();
                        }
                    });

                    this.WorkHour.subscribe(function () {
                        if (_this.WorkHour()) {
                            if (!_this.IsMSIE()) {
                                $('.ccx-ui-popup-content').css('max-width', '800px');
                            }
                            _this.VaryByDay(false);
                            _this.SelectedWorkDays(['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']);
                            _this.SetWorkHour(false);
                        }
                    });
                    this.WorkhourType.subscribe(function () {
                        if (_this.WorkhourType().toString() == "1") {
                            _this.VaryByDay(false);
                            _this.WorkHour(true);
                        } else {
                            _this.VaryByDay(true);
                            _this.WorkHour(false);
                        }
                    });
                };

                WeeklyScheduleViewModel.prototype.SetVBDDays = function () {
                    for (var i = 0; i < 7; i++) {
                        if (!this.IsEditMode()) {
                            this.DaysCollection.push({
                                WorkDay: ko.observable(this.WorkdaysVBD()[i]),
                                IsChecked: ko.observable(true),
                                Color: ko.observable('black'),
                                vbd_LinkText: ko.observable('Set Work Hours')
                            });
                        } else {
                            this.DaysCollection.push({
                                WorkDay: ko.observable(this.WorkdaysVBD()[i]),
                                IsChecked: ko.observable(false),
                                Color: ko.observable('black'),
                                vbd_LinkText: ko.observable('Set Work Hours')
                            });
                        }
                    }
                };

                WeeklyScheduleViewModel.prototype.ScheduleTypeAction = function (type, selectedDayWorkHour, subType) {
                    if (type == 1 /* SingleDaySchedule */) {
                        if (selectedDayWorkHour) {
                            if (selectedDayWorkHour.ScheduleTypeInfo.IsVaried) {
                                this.WorkhourType("2");
                                this.VaryByDay(true);
                                this.SED_enable(false);
                            }
                            this.EditScheduleDetails = selectedDayWorkHour;
                            this.LoadWorkHoursForSingleDayEdit(selectedDayWorkHour);
                        } else {
                            this.ScheduleRows.push({
                                WorkStartTime: ko.observable(DEFAULTSTARTTIME),
                                WorkEndTime: ko.observable(DEFAULTENDTIME),
                                IsBreak: ko.observable(false),
                                Index: ko.observable(1),
                                ButtonStatus: ko.observable(true)
                            });
                        }
                        this.AdjustButtonsForIE();
                    } else if (type == 0 /* RecurringSchedule */) {
                        if (subType) {
                            switch (subType) {
                                case 0 /* SingleDay */:
                                    this.EditScheduleDetails = selectedDayWorkHour;
                                    this.LoadWorkHoursForSingleDayEdit(selectedDayWorkHour);
                                    this.IsDeleteAvailable = ko.observable(false);
                                    break;
                                case 1 /* SelectedDayForward */:
                                    this.IsDeleteAvailable = ko.observable(false);
                                    if (selectedDayWorkHour && selectedDayWorkHour.ScheduleTypeInfo.IsVaried) {
                                        this.WorkhourType("2");
                                        this.VaryByDay(true);

                                        this.EditScheduleDetails = selectedDayWorkHour;
                                        this.WorkHour(false);
                                        this.SED_enable(false);
                                        this.DateRange(AppData.formatDate(new Date(this.selectedDate())));
                                        if (selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd)
                                            this.UntilDateString(AppData.formatDate(selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd));
                                        else
                                            this.UntilDateString('12/30/9999');
                                        this.LoadWorkHoursForVaryByDay(selectedDayWorkHour);
                                    } else if (selectedDayWorkHour && !selectedDayWorkHour.ScheduleTypeInfo.IsVaried) {
                                        this.VBD_enable(false);
                                        if (type == 0 /* RecurringSchedule */) {
                                            this.DateRange(AppData.formatDate(new Date(this.selectedDate())));
                                        } else {
                                            this.DateRange(AppData.formatDate(selectedDayWorkHour.ScheduleTypeInfo.StartTime));
                                        }
                                        if (selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd)
                                            this.UntilDateString(AppData.formatDate(selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd));
                                        else
                                            this.UntilDateString('12/30/9999');
                                        this.EditScheduleDetails = selectedDayWorkHour;
                                        this.LoadWorkHoursForSingleDayEdit(selectedDayWorkHour);
                                        var Days = selectedDayWorkHour.ScheduleTypeInfo.Days.split(',');
                                        for (var i = 0; i < Days.length; i++)
                                            this.SelectedWorkDays.push(Days[i].toUpperCase());
                                    }
                                    break;
                                case 2 /* Entire */:
                                    this.IsDeleteAvailable = ko.observable(true);
                                    this.DateRange(AppData.formatDate(selectedDayWorkHour.ScheduleTypeInfo.StartTime));
                                    if (selectedDayWorkHour && selectedDayWorkHour.ScheduleTypeInfo.IsVaried) {
                                        if (selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd)
                                            this.UntilDateString(AppData.formatDate(selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd));
                                        else
                                            this.UntilDateString('12/30/9999');

                                        this.VaryByDay(true);

                                        this.WorkhourType("2");
                                        this.EditScheduleDetails = selectedDayWorkHour;
                                        this.WorkHour(false);
                                        this.SED_enable(false);
                                        this.LoadWorkHoursForVaryByDay(selectedDayWorkHour);
                                    } else if (selectedDayWorkHour && !selectedDayWorkHour.ScheduleTypeInfo.IsVaried) {
                                        this.VBD_enable(false);
                                        if (selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd)
                                            this.UntilDateString(AppData.formatDate(selectedDayWorkHour.ScheduleTypeInfo.EffectiveIntervalEnd));
                                        else
                                            this.UntilDateString('12/30/9999');
                                        this.EditScheduleDetails = selectedDayWorkHour;
                                        this.LoadWorkHoursForSingleDayEdit(selectedDayWorkHour);
                                        var Days = selectedDayWorkHour.ScheduleTypeInfo.Days.split(',');
                                        for (var i = 0; i < Days.length; i++)
                                            this.SelectedWorkDays.push(Days[i].toUpperCase());
                                    }
                                    break;
                            }
                        }
                    }
                };

                WeeklyScheduleViewModel.prototype.ParameterDeclaration = function (type, timezonecode, equipmentID, selectedDayWorkHour, selectedDateForAddItem, scheduleTypeInfoArray, IsSingleDayEditOnRecurring, recurrenceEditSubType, providerId) {
                    this.User_TimezoneCode = timezonecode || '';
                    this.ProviderId = ko.observable(providerId || '');
                    this.WorkhourType = ko.observable('1');
                    this.RecSubType = recurrenceEditSubType;
                    this.IsFirstTime = ko.observable(true);
                    this.isClose = false;
                    this.StartConflictVal = ko.observable('');
                    this.EndConflictVal = ko.observable('');
                    this.TimeZone = ko.observableArray([]);
                    this.TimezoneValue = ko.observable('');
                    this.EquipmentId = ko.observable('');
                    this.schedule = new Scheduling.Models.ProviderSchedule();
                    this.TimeChoices = ko.observableArray([]);
                    this.SetWorkHour = ko.observable(false);
                    this.WeeklySchedule = ko.observable((type == 0 /* RecurringSchedule */ || type == 3 /* EntireSchedule */) ? true : false);
                    this.EntireSchedule = ko.observable((type == 3 /* EntireSchedule */) ? true : false);
                    this.DailySchedule = ko.observable((type == 1 /* SingleDaySchedule */) ? true : false);
                    this.selectedDate = (selectedDayWorkHour) ? ko.observable(AppData.formatDate(selectedDayWorkHour.Date)) : ((selectedDateForAddItem) ? ko.observable(AppData.formatDate(selectedDateForAddItem)) : ko.observable(AppData.formatDate(new Date)));
                    this.WorkHour = ko.observable(true);
                    this.VaryByDay = ko.observable(false);
                    this.BreakCount = 1;
                    this.IsVaryDaysChangeOnEdit = ko.observable(false);
                    this.IsRemoveItem = false;
                    this.vbd_CurIndex = 0;
                    this.SED_enable = ko.observable(true);
                    this.VBD_enable = ko.observable(true);
                    this.ItemsAdded = false;
                    this.Conflicts = ko.observableArray([]);
                    this.ScheduleRows = ko.observableArray([]);
                    this.vbd_ScheduleRowsContainer = ko.observableArray([]);
                    this.ConflictBackupValue = '';
                    this.EquipmentId = ko.observable(equipmentID || '');
                    this.IsEdit = ko.observable(false);
                    this.IsDeleteSchedule = ko.observable(false);
                    this.UntilDateString = ko.observable('');
                    this.UntilDate = ko.observable(new Date);
                    this.IsEditMode = ko.observable(false);
                    this.DateRange = ko.observable(AppData.formatDate(new Date));
                    this.vbd_SelectedDays = ko.observableArray([]);
                    this.ScheduleInfoArray = (scheduleTypeInfoArray || undefined);
                    this.LinkText = ko.observable('Set Work Hours');
                    this.vbd_PrevDayColl = [];
                    this.vbd_NewDayColl = [];

                    if (timezonecode)
                        this.TimezoneValue = ko.observable(timezonecode);
                    else
                        this.TimezoneValue = ko.observable('');

                    this.DaysCollection = ko.observableArray([]);
                    this.IsEditMode = ko.observable((selectedDayWorkHour) ? true : false);
                    this.IsEdit = ko.observable((selectedDayWorkHour && (!IsSingleDayEditOnRecurring)) ? true : false);
                    this.IsEdit = ko.observable((recurrenceEditSubType && recurrenceEditSubType == 1 /* SelectedDayForward */) ? false : this.IsEdit());
                    if (!this.IsEditMode()) {
                        this.SelectedWorkDays = ko.observableArray(['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA']);
                        this.DateRange = ko.observable(AppData.formatDate(selectedDateForAddItem));
                    } else {
                        this.SelectedWorkDays = ko.observableArray([]);
                        this.DateRange = ko.observable(AppData.formatDate(new Date));
                    }

                    this.FacilityName = ko.observable('');
                    this.BindFacilityName(this.EquipmentId());
                    this.IsDeleteAvailable = ko.observable((this.IsEditMode() && !IsSingleDayEditOnRecurring) ? true : false);
                };

                WeeklyScheduleViewModel.prototype.BindFacilityName = function (equipmentId) {
                    var _this = this;
                    var Model = new Scheduling.Models.ProviderSchedule();
                    Model.GetFaciliytName(equipmentId, function (item) {
                        _this.FacilityName(item['ccx_agencylocation_name']);
                    });
                };

                WeeklyScheduleViewModel.prototype.SetSpinnerOnTop = function () {
                    setTimeout(function () {
                        $('.w2ui-lock').css('z-index', 1000000);
                        $('.w2ui-lock-msg').css('z-index', 1000001);
                    }, 200);
                };

                WeeklyScheduleViewModel.prototype.LoadWorkHoursForVaryByDay = function (selectedDayWorkHour) {
                    var _this = this;
                    var doneLoading = AppUI.loading('Loading...', 10, $('.ccx-ui-popup')[0]);
                    this.SetSpinnerOnTop();
                    this.vbd_ScheduleRowsContainer([]);

                    $('.ccx-ui-popup-content').css('display', 'block');
                    var startDate = selectedDayWorkHour.ScheduleTypeInfo.StartTime;
                    var endDate = startDate.toString();
                    endDate = new Date(endDate);
                    endDate.setDate(endDate.getDate() + 6);

                    var DayCollection;
                    DayCollection = [];
                    $.each(selectedDayWorkHour.ScheduleTypeInfo['Days'].split(','), function (i, day) {
                        DayCollection.push(parseInt(DayIndex[day]));
                        _this.vbd_PrevDayColl.push(parseInt(DayIndex[day]));
                    });

                    var Model = new Scheduling.Models.ProviderSchedule();

                    Model.GetProviderWorkHourForEdit(selectedDayWorkHour.EquipmentId, selectedDayWorkHour.Location, startDate, endDate, function (workHours) {
                        var workHoursCol;
                        workHoursCol = [];
                        $.each(DayCollection, function (i, d) {
                            $.each(workHours, function (k, w) {
                                if (w.IsBreak === false && w.Date.getDay() === d) {
                                    workHoursCol.push(w);
                                }
                            });
                        });

                        $.each(workHoursCol, function (i, w) {
                            var day = w.StartTime.getDay();
                            var WorKHourDetails = _this.LoadWorkHours(AppData.where(workHours, function (whr) {
                                return AppData.formatDate(whr.Date) === AppData.formatDate(w.Date);
                            }));
                            var timediff = _this.CalculateTimeDifference(WorKHourDetails[0].WorkStartTime().split(':'), WorKHourDetails[0].WorkEndTime().split(':'));
                            if (timediff > 5) {
                                _this.DaysCollection()[day].IsChecked(true);
                                var l_text = WorKHourDetails[0].WorkStartTime() + ' - ' + WorKHourDetails[WorKHourDetails.length - 1].WorkEndTime();
                                _this.DaysCollection()[day].vbd_LinkText(l_text);
                                _this.vbd_ScheduleRowsContainer.push({
                                    Data: ko.observable(WorKHourDetails),
                                    Day: ko.observable(day)
                                });
                            }
                        });

                        doneLoading();
                    });
                };

                WeeklyScheduleViewModel.prototype.LoadWorkHours = function (results) {
                    var breakCount = 0;
                    var workHoursRowCount = 0;
                    var workHourDetails;
                    workHourDetails = [];
                    breakCount = AppData.where(results, function (s) {
                        return s.IsBreak == true;
                    }).length;
                    if (breakCount > 0) {
                        workHoursRowCount = (2 * breakCount) + 1;
                        var workHourStartTime = this.formatTime(AppData.where(results, function (s) {
                            return s.IsBreak == false;
                        })[0]['StartTime'], false);
                        var workHoursEndTime = this.formatTime(AppData.where(results, function (s) {
                            return s.IsBreak == false;
                        })[0]['EndTime'], false);
                        var l_text = workHourStartTime + ' - ' + workHoursEndTime;
                        this.LinkText(l_text);
                        var breaks = AppData.where(results, function (s) {
                            return s.IsBreak == true;
                        });
                        breaks = AppData.sort(breaks, function (b) {
                            return b['StartTime'];
                        }, false);

                        var j = 0;
                        for (var i = 0; i < workHoursRowCount; i++) {
                            if (i % 2 == 0) {
                                if (i == 0) {
                                    workHourDetails.push({
                                        WorkStartTime: ko.observable(workHourStartTime),
                                        WorkEndTime: ko.observable(this.formatTime(breaks[0]['StartTime'], false)),
                                        IsBreak: ko.observable(false),
                                        Index: ko.observable(i),
                                        ButtonStatus: ko.observable(true)
                                    });
                                } else if (i == (workHoursRowCount - 1)) {
                                    workHourDetails.push({
                                        WorkStartTime: ko.observable(this.formatTime(breaks[breakCount - 1]['EndTime'], false)),
                                        WorkEndTime: ko.observable(workHoursEndTime),
                                        IsBreak: ko.observable(false),
                                        Index: ko.observable(i),
                                        ButtonStatus: ko.observable(true)
                                    });
                                } else {
                                    workHourDetails.push({
                                        WorkStartTime: ko.observable(this.formatTime(breaks[j - 1]['EndTime'], false)),
                                        WorkEndTime: ko.observable(this.formatTime(breaks[j]['StartTime'], false)),
                                        IsBreak: ko.observable(false),
                                        Index: ko.observable(i),
                                        ButtonStatus: ko.observable(true)
                                    });
                                }
                            } else {
                                if (j < breakCount) {
                                    workHourDetails.push({
                                        WorkStartTime: ko.observable(this.formatTime(breaks[j]['StartTime'], false)),
                                        WorkEndTime: ko.observable(this.formatTime(breaks[j]['EndTime'], false)),
                                        IsBreak: ko.observable(true),
                                        Index: ko.observable(i),
                                        ButtonStatus: ko.observable(true)
                                    });

                                    j++;
                                }
                            }
                            this.EnableDisableButton(i);
                        }
                    } else {
                        workHourDetails.push({
                            WorkStartTime: ko.observable(this.formatTime(results[0]['StartTime'], false)),
                            WorkEndTime: ko.observable(this.formatTime(results[0]['EndTime'], false)),
                            IsBreak: ko.observable(false),
                            Index: ko.observable(i),
                            ButtonStatus: ko.observable(true)
                        });

                        var l_text = this.formatTime(results[0]['StartTime'], false) + ' - ' + this.formatTime(results[0]['EndTime'], false);
                        this.LinkText(l_text);
                    }
                    return workHourDetails;
                };

                WeeklyScheduleViewModel.prototype.LoadWorkHoursForSingleDayEdit = function (selectedDayWorkHour) {
                    var _this = this;
                    var doneLoading = AppUI.loading('Loading...', 10, $('.ccx-ui-popup')[0]);
                    this.SetSpinnerOnTop();
                    this.ItemsLoaded = true;
                    this.ScheduleRows.removeAll();
                    var Model = new Scheduling.Models.ProviderSchedule();

                    var stDate;
                    stDate = null;
                    stDate = selectedDayWorkHour.Date;
                    try  {
                        Model.GetProviderWorkHourForEdit(selectedDayWorkHour.EquipmentId, selectedDayWorkHour.Location, stDate, stDate, function (results) {
                            if (results.length > 0) {
                                _this.ScheduleRows(_this.LoadWorkHours(results));
                                _this.ComputeWorkAndBreakHours();
                                _this.SetDefaultValuesforConflict();
                            } else {
                                _this.ScheduleRows([]);
                                _this.ScheduleRows.push({
                                    WorkStartTime: ko.observable(DEFAULTSTARTTIME),
                                    WorkEndTime: ko.observable(DEFAULTENDTIME),
                                    IsBreak: ko.observable(false),
                                    Index: ko.observable(1),
                                    ButtonStatus: ko.observable(true)
                                });
                                _this.ComputeWorkAndBreakHours();
                            }
                            _this.AdjustButtonsForIE();
                            _this.IsFirstTime = ko.observable(true);
                            doneLoading();
                        });
                    } catch (ex) {
                    }
                };

                WeeklyScheduleViewModel.prototype.formatTime = function (datetime, military) {
                    var jsDate = AppData.parseDate(datetime);
                    if (!jsDate)
                        return '';
                    var h = jsDate.getHours();
                    var m = jsDate.getMinutes();
                    var s = jsDate.getSeconds();
                    var normalTime = '';
                    var a = (h >= 12 ? ' PM' : ' AM');
                    if (h == 0)
                        h = 12;
                    if (h > 12)
                        h -= 12;
                    if (h < 10) {
                        normalTime = ('0' + h + ':' + (m < 10 ? '0' : '') + m + a);
                    } else {
                        normalTime = (h + ':' + (m < 10 ? '0' : '') + m + a);
                    }
                    if (military) {
                        var time = $.datepicker['parseTime']('h:mm tt', normalTime);
                        var timeString = $.datepicker['formatTime']('HH:mm', time);
                        return timeString;
                    } else {
                        return normalTime;
                    }
                };

                WeeklyScheduleViewModel.prototype.showSetWorkHour = function (index) {
                    if (this.VaryByDay()) {
                        if (!this.IsEditMode()) {
                            if (this.SetWorkHour() && index == this.vbd_CurIndex) {
                                this.SetWorkHour(false);
                                this.DaysCollection()[index].Color('black');
                            } else {
                                var varybydata = AppData.where(this.vbd_ScheduleRowsContainer(), function (r) {
                                    return (r.Day() === index);
                                });
                                if (varybydata.length > 0) {
                                    this.ScheduleRows(varybydata[0].Data());
                                } else {
                                    this.ScheduleRows([]);
                                    this.ScheduleRows.push({
                                        WorkStartTime: ko.observable(DEFAULTSTARTTIME),
                                        WorkEndTime: ko.observable(DEFAULTENDTIME),
                                        IsBreak: ko.observable(false),
                                        Index: ko.observable(1),
                                        ButtonStatus: ko.observable(true)
                                    });
                                    this.SetDefaultValuesforConflict();
                                }
                                this.DaysCollection()[this.vbd_CurIndex].Color('black');
                                this.vbd_CurIndex = index;
                                this.SetWorkHour(true);
                                this.DaysCollection()[index].Color('blue');
                                this.ComputeWorkAndBreakHours();
                            }
                            this.SelectedWorkDays.removeAll();
                        } else {
                            if (this.SetWorkHour() && index == this.vbd_CurIndex) {
                                this.SetWorkHour(false);
                                this.DaysCollection()[index].Color('black');
                            } else {
                                this.SetWorkHour(true);
                                this.DaysCollection()[this.vbd_CurIndex].Color('black');
                                this.vbd_CurIndex = index;
                                this.DaysCollection()[index].Color('blue');
                                var varybydata = AppData.where(this.vbd_ScheduleRowsContainer(), function (r) {
                                    return (r.Day() === index);
                                });
                                if (varybydata.length > 0) {
                                    this.ScheduleRows(varybydata[0].Data());
                                    window.setTimeout(this.ComputeWorkAndBreakHours(), 200);
                                } else {
                                    this.ScheduleRows([]);
                                    this.ScheduleRows.push({
                                        WorkStartTime: ko.observable(DEFAULTSTARTTIME),
                                        WorkEndTime: ko.observable(DEFAULTENDTIME),
                                        IsBreak: ko.observable(false),
                                        Index: ko.observable(1),
                                        ButtonStatus: ko.observable(true)
                                    });

                                    this.SetDefaultValuesforConflict();
                                }
                            }
                        }
                    } else {
                        if (this.IsEditMode()) {
                            this.SetWorkHour(true);
                        } else {
                            if (this.SetWorkHour()) {
                                this.SetWorkHour(false);
                            } else {
                                this.ScheduleRows.removeAll();
                                this.ScheduleRows.push({
                                    WorkStartTime: ko.observable(DEFAULTSTARTTIME),
                                    WorkEndTime: ko.observable(DEFAULTENDTIME),
                                    IsBreak: ko.observable(false),
                                    Index: ko.observable(1),
                                    ButtonStatus: ko.observable(true)
                                });

                                this.SetDefaultValuesforConflict();
                                this.SetWorkHour(true);
                            }
                        }
                    }
                    this.AdjustButtonsForIE();
                };

                WeeklyScheduleViewModel.prototype.BindChoices = function () {
                    for (var i = 0; i < 24; i++) {
                        var hr = i > 12 ? i - 12 : i;
                        if (i == 0)
                            hr = 12;
                        var disphr = hr.toString().length == 1 ? '0' + hr.toString() : hr.toString();
                        for (var j = 0; j < 60; j = j + 5) {
                            var min = j;
                            var dispmin = j.toString().length == 1 ? '0' + j.toString() : j.toString();
                            var period = i < 12 ? ' AM' : ' PM';
                            var result = disphr + ':' + dispmin + period;
                            this.TimeChoices.push({ Text: result, Value: result });
                        }
                    }
                };

                WeeklyScheduleViewModel.prototype.CalculateTimeDifference = function (time1, time2) {
                    var stHr = time1[1].indexOf('PM') > 0 && parseInt(time1[0]) != 12 ? parseInt(time1[0]) + 12 : parseInt(time1[0]);
                    var etHr = time2[1].indexOf('PM') > 0 && parseInt(time2[0]) != 12 ? parseInt(time2[0]) + 12 : parseInt(time2[0]);
                    if (stHr == 12 && time1[1].indexOf('AM') > 0)
                        stHr = 0;
                    if (etHr == 12 && time2[1].indexOf('AM') > 0)
                        etHr = 0;
                    var date = 0;

                    var startDate = new Date(0, 0, date, stHr, time1[1].substring(0, 2), 0);
                    if (time1[1].indexOf('PM') > 0 && time2[1].indexOf('AM') > 0)
                        date = 1;
                    var endDate = new Date(0, 0, date, etHr, time2[1].substring(0, 2), 0);
                    var diff = Math.abs(endDate.getTime() - startDate.getTime());
                    var hours = Math.floor(diff / 1000 / 60 / 60);
                    diff = diff - hours * 1000 * 60 * 60;
                    var minutes = Math.floor(diff / 1000 / 60);
                    return minutes + hours * 60;
                };

                WeeklyScheduleViewModel.prototype.ComputeDefaultBreak = function (index) {
                    if (!this.ScheduleRows()[index])
                        return;
                    var strtTime = this.ScheduleRows()[index].WorkStartTime().split(':');
                    var endTime = this.ScheduleRows()[index].WorkEndTime().split(':');

                    var diff = this.CalculateTimeDifference(strtTime, endTime);
                    var brkMin = diff > 175 ? 30 : 5;

                    var stHr = strtTime[1].indexOf('PM') > 0 && parseInt(strtTime[0]) != 12 ? parseInt(strtTime[0]) + 12 : parseInt(strtTime[0]);
                    var etHr = endTime[1].indexOf('PM') > 0 && parseInt(endTime[0]) != 12 ? parseInt(endTime[0]) + 12 : parseInt(endTime[0]);
                    if (stHr == 12 && strtTime[1].indexOf('AM') > 0)
                        stHr = 0;
                    if (etHr == 12 && endTime[1].indexOf('AM') > 0)
                        etHr = 0;
                    var stMin = parseInt(strtTime[1].substr(0, 2).toString());
                    var diff2 = Math.floor(diff / 2);
                    var newstHr1 = stHr + Math.floor(diff2 / 60);
                    if (newstHr1 >= 24 && strtTime[1].indexOf('PM') > 0)
                        newstHr1 = newstHr1 - 24;
                    var newstMin1 = stMin + (diff2 % 60);
                    if (newstMin1 >= 60) {
                        newstHr1 = newstHr1 + 1;
                        newstMin1 = newstMin1 - 60;
                    }
                    var newstHr = newstHr1;

                    var stAMPM = newstHr < 12 ? ' AM' : ' PM';
                    var newstMin = newstMin1.toString();
                    var newdispstHr = newstHr <= 12 ? (newstHr == 0 ? '12' : newstHr.toString()) : (newstHr - 12).toString();
                    newstMin = parseInt(newstMin) % 5 == 0 ? newstMin : (parseInt(newstMin) - (parseInt(newstMin) % 5)).toString();

                    var newetHr = (newstMin1 + brkMin) >= 60 ? newstHr1 + 1 : newstHr1;
                    var etAMPM = newetHr < 12 ? ' AM' : ' PM';
                    var newdispetHr = newetHr <= 12 ? (newetHr == 0 ? '12' : newetHr.toString()) : (newetHr - 12).toString();
                    var newetMin = (newstMin1 + brkMin) >= 60 ? (brkMin + newstMin1 - 60).toString() : (newstMin1 + brkMin).toString();
                    newetMin = parseInt(newetMin) % 5 == 0 ? newetMin : (parseInt(newetMin) - (parseInt(newetMin) % 5)).toString();

                    newdispstHr = newdispstHr.length == 1 ? '0' + newdispstHr : newdispstHr;
                    newdispetHr = newdispetHr.length == 1 ? '0' + newdispetHr : newdispetHr;
                    newstMin = newstMin.length == 1 ? '0' + newstMin : newstMin;
                    newetMin = newetMin.length == 1 ? '0' + newetMin : newetMin;

                    var newdispStTime = newdispstHr.toString() + ':' + newstMin.toString() + stAMPM;
                    var newdispEtTime = newdispetHr.toString() + ':' + newetMin.toString() + etAMPM;
                    this.AddDefaultBreak(index, newdispStTime, newdispEtTime);
                };

                WeeklyScheduleViewModel.prototype.AddDefaultBreak = function (index, Start, End) {
                    this.ScheduleRows()[index + 1].WorkStartTime(Start);
                    this.ScheduleRows()[index + 1].WorkEndTime(End);

                    this.ScheduleRows()[index + 2].WorkEndTime(this.ScheduleRows()[index].WorkEndTime());
                    this.ScheduleRows()[index].WorkEndTime(this.ScheduleRows()[index + 1].WorkStartTime());
                    this.ScheduleRows()[index + 2].WorkStartTime(this.ScheduleRows()[index + 1].WorkEndTime());

                    this.EnableDisableButton(index + 2);
                    this.EnableDisableButton(index);
                };

                WeeklyScheduleViewModel.prototype.EnableDisableButton = function (index) {
                    var _this = this;
                    setTimeout(function () {
                        if (_this.ScheduleRows()[index] && _this.ScheduleRows()[index].WorkStartTime() && _this.ScheduleRows()[index].WorkEndTime()) {
                            var diff = _this.CalculateTimeDifference(_this.ScheduleRows()[index].WorkStartTime().split(':'), _this.ScheduleRows()[index].WorkEndTime().split(':'));
                            if (diff < 15 && !_this.ScheduleRows()[index].IsBreak())
                                _this.ScheduleRows()[index].ButtonStatus(false);
                            else
                                _this.ScheduleRows()[index].ButtonStatus(true);
                        }
                    }, 300);
                };

                WeeklyScheduleViewModel.prototype.CalcuateDayPeriod = function (value) {
                    if (value.indexOf('AM') > 0)
                        return 'AM';
                    else
                        return 'PM';
                };

                WeeklyScheduleViewModel.prototype.CompareTimeNew = function (time1, time2) {
                    var stHr = time1[1].indexOf('PM') > 0 && parseInt(time1[0]) != 12 ? parseInt(time1[0]) + 12 : parseInt(time1[0]);
                    var etHr = time2[1].indexOf('PM') > 0 && parseInt(time2[0]) != 12 ? parseInt(time2[0]) + 12 : parseInt(time2[0]);
                    if (stHr == 12 && time1[1].indexOf('AM') > 0)
                        stHr = 0;
                    if (etHr == 12 && time2[1].indexOf('AM') > 0)
                        etHr = 0;
                    var startDate = new Date(0, 0, 0, stHr, time1[1].substring(0, 2), 0);
                    var endDate = new Date(0, 0, 0, etHr, time2[1].substring(0, 2), 0);
                    var diff = endDate.getTime() - startDate.getTime();
                    return diff;
                };

                WeeklyScheduleViewModel.prototype.ConvertToHour = function (minute, category) {
                    if (minute >= 60) {
                        this.SetTimeTypes('hours', category);
                        return minute / 60;
                    } else {
                        this.SetTimeTypes('minutes', category);
                        return minute;
                    }
                };

                WeeklyScheduleViewModel.prototype.SetTimeTypes = function (type, category) {
                    if (category == 'Working')
                        this.TimeTypeWorking(type);
                    else if (category == 'Total')
                        this.TimeTypeTotal(type);
                    else if (category == 'Breaks')
                        this.TimeTypeBreaks(type);
                };

                WeeklyScheduleViewModel.prototype.vbd_Save = function () {
                    var _this = this;
                    var temp;
                    temp = [];
                    temp = AppData.select(this.ScheduleRows(), function (s) {
                        return s;
                    });
                    var varybydata = AppData.where(this.vbd_ScheduleRowsContainer(), function (r) {
                        return (r.Day() === _this.vbd_CurIndex);
                    });
                    if (varybydata.length > 0)
                        this.vbd_ScheduleRowsContainer.remove(varybydata[0]);
                    this.vbd_ScheduleRowsContainer.push({
                        Day: ko.observable(this.vbd_CurIndex),
                        Data: ko.observableArray(temp)
                    });
                    this.vbd_SelectedDays.push(this.WorkdaysVBD()[this.vbd_CurIndex].substring(0, 1));
                    var l_text = temp[0].WorkStartTime() + ' - ' + temp[temp.length - 1].WorkEndTime();
                    this.DaysCollection()[this.vbd_CurIndex].vbd_LinkText(l_text);

                    this.SetWorkHour(false);
                    this.ScheduleRows([]);
                    this.DaysCollection()[this.vbd_CurIndex].Color('black');
                };
                WeeklyScheduleViewModel.prototype.ClosePopup = function (msg) {
                    this.IsFirstTime = ko.observable(true);
                    if (this.isClose) {
                        this.ClosePopuponSave(event);
                        this.ScheduleRows.removeAll();
                    }
                    var self = this;
                    CrmData.Common.showMessage(msg);
                    CrmData.Common.disableHTMLScroll();
                    window.setTimeout(self.OnSave(true), 1000);
                };

                WeeklyScheduleViewModel.prototype.GetVBDDataforSave = function () {
                    var _this = this;
                    this.vbd_NewDayColl = [];
                    if (this.IsEditMode()) {
                        var CalId = this.GetInnerCalendarIdsForVaryByEdit();
                    }
                    var pattern = '';
                    var CalendarIdString = '';
                    for (var i = 0; i < this.DaysCollection().length; i++) {
                        if (this.DaysCollection()[i].IsChecked()) {
                            this.vbd_NewDayColl.push(DayIndex[this.DaysCollection()[i].WorkDay().substring(0, 2).toUpperCase()]);
                        }
                    }
                    var length = this.vbd_ScheduleRowsContainer().length;
                    for (var i = 0; i < length; i++) {
                        if (this.IsEditMode()) {
                            var CalData = AppData.where(CalId, function (s) {
                                return s.Day === _this.Workdays()[_this.vbd_ScheduleRowsContainer()[i].Day()].Value;
                            })[0];
                            if (CalData) {
                                CalendarIdString += CalData.InnerCalendarId;
                                CalendarIdString += ',';
                            }
                        }
                    }
                    if (CalendarIdString.length > 0)
                        CalendarIdString = CalendarIdString.substring(0, CalendarIdString.length - 1);
                    var IsDaysChanged = this.CheckVBDRows();
                    if (IsDaysChanged && this.IsEditMode() && this.RecSubType === 2 /* Entire */) {
                        var startDate = (this.RecSubType && this.RecSubType === 2 /* Entire */) ? $.datepicker.formatDate('yy-mm-dd', this.EditScheduleDetails.ScheduleTypeInfo.StartTime) : ((this.RecSubType && this.RecSubType === 1 /* SelectedDayForward */) ? $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate())) : $.datepicker.formatDate('yy-mm-dd', new Date(this.DateRange())));
                        var endDate = "9999-12-30T23:59:59Z";
                        CrmData.ScheduleData.AddWorkHours(startDate, "12:00 AM", endDate, "12:00 AM", "12:00 AM", "12:00 AM", this.EquipmentId(), '', parseInt(this.User_TimezoneCode), CalendarIdString, 3, false, true, false, $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate())) + "T00:00:00Z", '', -1, function (result) {
                            if (result && result.issuccess) {
                                pattern = _this.GetPattern();
                                _this.IsVaryDaysChangeOnEdit(true);
                                _this.SaveVaryByDay(pattern);
                            } else {
                            }
                        });
                    } else {
                        pattern = this.GetPattern();
                        if (this.RecSubType === 1 /* SelectedDayForward */)
                            CalendarIdString = '';
                        if (this.IsEditMode() && CalendarIdString.length > 0) {
                            this.SaveVaryByDay(pattern + '%%%' + CalendarIdString);
                        } else
                            this.SaveVaryByDay(pattern);
                    }
                };

                WeeklyScheduleViewModel.prototype.GetPattern = function () {
                    var data = '';
                    var length = this.vbd_ScheduleRowsContainer().length;
                    for (var i = 0; i < length; i++) {
                        var rowLength = this.vbd_ScheduleRowsContainer()[i].Data().length;
                        data += this.Workdays()[this.vbd_ScheduleRowsContainer()[i].Day()].Value;
                        var brkStart = '';
                        var brkEnd = '';
                        for (var j = 0; j < rowLength; j++) {
                            var row = this.vbd_ScheduleRowsContainer()[i].Data()[j];
                            if (j == 0)
                                data += '#' + row.WorkStartTime();
                            if (j == rowLength - 1)
                                data += '#' + row.WorkEndTime();
                            else {
                                if (row.IsBreak()) {
                                    brkStart += row.WorkStartTime();
                                    brkEnd += row.WorkEndTime();
                                    if (j != rowLength - 2) {
                                        brkStart += ',';
                                        brkEnd += ',';
                                    }
                                }
                            }
                        }
                        data += '#' + brkStart;
                        data += '#' + brkEnd;
                        if (i != length - 1) {
                            data += '$';
                        }
                    }
                    return data;
                };

                WeeklyScheduleViewModel.prototype.SaveWeeklySchedule = function () {
                    if (this.VaryByDay()) {
                        this.GetVBDDataforSave();
                    } else if (!this.VaryByDay()) {
                        if (this.SetWorkHour() || this.RecSubType >= 0) {
                            this.onSaveClick(this.ScheduleRows(), this.SelectedWorkDays().toString(), this.isClose, (this.EditScheduleDetails) ? this.EditScheduleDetails.CalendarId : '');
                        }
                    }
                };

                WeeklyScheduleViewModel.prototype.CheckVBDRows = function () {
                    var _this = this;
                    this.vbd_NewDayColl.sort();
                    this.vbd_PrevDayColl.sort();

                    if (this.vbd_NewDayColl.toString() == this.vbd_PrevDayColl.toString()) {
                        return false;
                    } else {
                        var days = '';
                        for (var i = 0; i < 7; i++) {
                            days += !this.DaysCollection()[i].IsChecked() ? this.DaysCollection()[i].WorkDay() : '';
                            days += ',';
                        }
                        days = days.substring(0, days.length - 1);

                        var DaysColl = days.split(',');
                        for (var i = 0; i < DaysColl.length; i++) {
                            var varybydata = AppData.where(this.vbd_ScheduleRowsContainer(), function (r) {
                                return (r.Day() === _this.WorkdaysVBD.indexOf(DaysColl[i]));
                            });
                            if (varybydata)
                                this.vbd_ScheduleRowsContainer.remove(varybydata[0]);
                        }

                        return true;
                    }
                };

                WeeklyScheduleViewModel.prototype.SaveVaryByDay = function (pattern) {
                    var _this = this;
                    var CalIdString = '';
                    if (this.IsEditMode()) {
                        CalIdString = pattern.split('%%%')[1];
                        pattern = pattern.split('%%%')[0];
                    }
                    var utcStart = "T00:00:00Z";
                    var utcEnd = "T23:59:59Z";
                    var startDate = (this.RecSubType && this.RecSubType === 2 /* Entire */) ? $.datepicker.formatDate('yy-mm-dd', this.EditScheduleDetails.ScheduleTypeInfo.StartTime) : ((this.RecSubType && this.RecSubType === 1 /* SelectedDayForward */) ? $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate())) : $.datepicker.formatDate('yy-mm-dd', new Date(this.DateRange())));
                    var businessClosure = (this.BusinessClosure() !== null && this.BusinessClosure().length > 0) ? (this.BusinessClosure() === "OBS" ? true : false) : false;
                    var ConflictStartDate = startDate + "T12:00:00Z";
                    startDate = startDate + utcStart;
                    var endDate = '';
                    var eDate = '';
                    var typeCode = (this.RecSubType === 0 /* SingleDay */ && !this.IsDeleteSchedule()) ? 1 : 3;
                    if (this.UntilDateString().length > 0) {
                        eDate = this.UntilDateString();
                    } else {
                        CrmData.Common.showMessage('End date cannot be empty.Please enter an End date');
                        return;
                    }
                    var subCode = this.RecSubType !== null && this.RecSubType !== undefined ? this.RecSubType : -1;
                    eDate = $.datepicker.formatDate('yy-mm-dd', new Date(eDate));
                    endDate = eDate + utcEnd;

                    this.IsEdit((this.RecSubType == 2 /* Entire */ && !this.IsDeleteSchedule()) ? true : false);
                    this.IsEdit(this.IsVaryDaysChangeOnEdit() ? false : this.IsEdit());
                    if (this.IsDeleteSchedule()) {
                        if (this.RecSubType == 0 /* SingleDay */) {
                            startDate = $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate()));
                            startDate = startDate + utcStart;
                            subCode = 0;
                        } else {
                            subCode = this.RecSubType == 1 /* SelectedDayForward */ ? 1 : -1;
                        }

                        AppUI.confirm(DELETE_CALENDAR_CONFIRM, function () {
                            var doneLoading = AppUI.loading('Deleting schedule...', 10, $('.ccx-ui-popup')[0]);
                            CrmData.ScheduleData.AddWorkHours(startDate, "12:00 AM", endDate, "12:00 AM", "12:00 AM", "12:00 AM", _this.EquipmentId(), '', parseInt(_this.User_TimezoneCode), CalIdString, typeCode, false, _this.IsDeleteSchedule(), false, $.datepicker.formatDate('yy-mm-dd', new Date(_this.selectedDate())) + "T00:00:00Z", '', subCode, function (result) {
                                if (result && result.issuccess) {
                                    doneLoading();
                                    _this.ClosePopup(DELETE_SUCCESS);
                                } else {
                                    doneLoading();
                                    CrmData.Common.showMessage(DELETE_FAIL);
                                }
                            });
                        });
                    } else {
                        var doneLoading = AppUI.loading('Please wait...', 10, $('.ccx-ui-popup')[0]);
                        this.WorkHoursConflictCheck(startDate, '12:00 AM', '12:00 AM', endDate, 33, pattern, typeCode, subCode, '', function (SaveDate) {
                            if (SaveDate) {
                                CrmData.ScheduleData.AddWorkHours(startDate, '12:00 AM', endDate, '12:00 AM', '12:00 AM', '12:00 AM', _this.EquipmentId(), '', parseInt(_this.User_TimezoneCode), CalIdString, typeCode, _this.IsEdit(), false, businessClosure, startDate, pattern, subCode, function (result) {
                                    if (result && result.issuccess) {
                                        doneLoading();
                                        (!_this.IsEdit()) ? _this.ClosePopup(ADD_SUCCESS) : _this.ClosePopup(UPDATE_SUCCESS);
                                    } else {
                                        doneLoading();
                                        CrmData.Common.showMessage(ADD_UPDATE_FAIL);
                                        CrmData.Common.disableHTMLScroll();
                                    }
                                });
                            }
                        });
                    }
                };
                WeeklyScheduleViewModel.prototype.IsMSIE = function () {
                    if (window.navigator.userAgent.toLowerCase().indexOf("msie") > 0 || window.navigator.userAgent.toLowerCase().indexOf("trident") > 0)
                        return true;
                    else
                        return false;
                };

                WeeklyScheduleViewModel.prototype.GetInnerCalendarIdsForVaryByEdit = function () {
                    var _this = this;
                    var result;
                    result = [];
                    var col;
                    var ruleCollection = AppData.where(CALENDAR_RULES_COLLECTION, function (c) {
                        return c.CalendarId === _this.EditScheduleDetails.ScheduleTypeInfo.ParentCalendarId;
                    })[0];
                    if (this.EditScheduleDetails.ScheduleTypeInfo['EffectiveIntervalEnd']) {
                        col = AppData.where(ruleCollection['CalendarRules'].scheduleInfo, function (s) {
                            return (s['isvaried'] && AppData.formatDate(s['starttime']) === AppData.formatDate(_this.EditScheduleDetails.ScheduleTypeInfo['StartTime']) && AppData.formatDate(s['effectiveintervalend']) === AppData.formatDate(_this.EditScheduleDetails.ScheduleTypeInfo['EffectiveIntervalEnd']));
                        });
                    } else {
                        col = AppData.where(ruleCollection['CalendarRules'].scheduleInfo, function (s) {
                            return (s['isvaried'] && AppData.formatDate(s['starttime']) === AppData.formatDate(_this.EditScheduleDetails.ScheduleTypeInfo['StartTime']));
                        });
                    }
                    $.each(col, function (i, r) {
                        var patternCol = r.pattern.split(';');
                        var day = patternCol[2].split('=')[1];
                        if (day.length > 2) {
                            var days = day.split(',');
                            $.each(days, function (j, item) {
                                result.push({
                                    Day: item,
                                    InnerCalendarId: r.innercalendarid
                                });
                            });
                        } else {
                            result.push({
                                Day: day,
                                InnerCalendarId: r.innercalendarid
                            });
                        }
                    });

                    return result;
                };
                WeeklyScheduleViewModel.prototype.SaveSingleDay = function () {
                    var _this = this;
                    this.IsEdit = ko.observable((this.EntireSchedule()) ? true : this.IsEdit());
                    var innerCalendarID = (this.EditScheduleDetails && this.IsEditMode()) ? this.EditScheduleDetails.CalendarId : '';
                    var typecode = 1 /* SingleDaySchedule */;
                    var startTime = '';
                    var endTime = '';
                    var breakStartTime = '';
                    var breakEndTime = '';
                    var days = '';
                    var timezonecode = this.TimezoneValue();
                    var enddate = '';
                    var startDate = (this.RecSubType && this.RecSubType === 0 /* SingleDay */) ? $.datepicker.formatDate('yy-mm-dd', this.EditScheduleDetails.ScheduleTypeInfo.StartTime) : $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate()));
                    if (this.ScheduleRows().length > 0) {
                        startTime = this.ScheduleRows()[0].WorkStartTime();
                        endTime = this.ScheduleRows()[this.ScheduleRows().length - 1].WorkEndTime();
                    }
                    var ConflictStartDate = startDate + "T12:00:00Z";
                    enddate = startDate + "T23:59:59Z";
                    startDate = startDate + "T00:00:00Z";
                    ko.utils.arrayForEach(this.ScheduleRows(), function (elem) {
                        if (elem.IsBreak()) {
                            breakEndTime = breakEndTime + elem.WorkEndTime() + ',';
                            breakStartTime = breakStartTime + elem.WorkStartTime() + ',';
                        }
                    });
                    breakEndTime = breakEndTime.substring(0, breakEndTime.length - 1);
                    breakStartTime = breakStartTime.substring(0, breakStartTime.length - 1);
                    if (this.IsDeleteSchedule()) {
                        if (this.ScheduleRows().length > 0) {
                            AppUI.confirm(DELETE_CALENDAR_CONFIRM, function () {
                                var doneLoading = AppUI.loading('Deleting schedule...', 10, $('.ccx-ui-popup')[0]);
                                CrmData.ScheduleData.DeleteSingleDaySchedule(_this.EquipmentId(), startDate, innerCalendarID, 1, $.datepicker.formatDate('yy-mm-dd', new Date(_this.selectedDate())), 0, function (result) {
                                    if (result && result.issuccess) {
                                        doneLoading();
                                        _this.ScheduleRows([]);
                                        _this.ResetWorkHoursTotal();
                                        _this.ClosePopup(DELETE_SUCCESS);
                                    } else {
                                        doneLoading();
                                        CrmData.Common.showMessage(DELETE_FAIL);
                                    }
                                });
                            });
                        }
                    } else {
                        var doneLoading = AppUI.loading('Please wait...', 10, $('.ccx-ui-popup')[0]);
                        this.WorkHoursConflictCheck(startDate, startTime, endTime, enddate, 22, '', typecode, 0, '', function (SaveDate) {
                            if (SaveDate) {
                                CrmData.ScheduleData.AddWorkHours(startDate, startTime, enddate, endTime, breakStartTime, breakEndTime, _this.EquipmentId(), '', parseInt(_this.User_TimezoneCode), innerCalendarID, 1 /* SingleDaySchedule */, _this.IsEdit(), _this.IsDeleteSchedule(), false, $.datepicker.formatDate('yy-mm-dd', new Date(_this.selectedDate())), '', 0, function (result) {
                                    if (result && result.issuccess) {
                                        doneLoading();
                                        (!_this.IsEdit()) ? _this.ClosePopup(ADD_SUCCESS) : _this.ClosePopup(UPDATE_SUCCESS);
                                    } else {
                                        doneLoading();
                                        CrmData.Common.showMessage(ADD_UPDATE_FAIL);
                                        CrmData.Common.disableHTMLScroll();
                                    }
                                });
                            }
                        });
                    }
                };

                WeeklyScheduleViewModel.prototype.ResetWorkHoursTotal = function () {
                    this.Total(this.ConvertToHour(0, 'Total').toString());
                    this.Working(this.ConvertToHour(0, 'Working').toString());
                    this.Breaks(this.ConvertToHour(0, 'Breaks').toString());
                };
                WeeklyScheduleViewModel.prototype.SaveWorkHour = function (isClose, event) {
                    this.IsFirstTime = ko.observable(true);
                    this.isClose = isClose;
                    if (this.WeeklySchedule()) {
                        this.SaveWeeklySchedule();
                    } else if (this.DailySchedule()) {
                        if (this.RecSubType === 0 /* SingleDay */) {
                            if (this.IsDeleteSchedule()) {
                                this.SaveWeeklySchedule();
                            } else {
                                this.SaveSingleDay();
                            }
                        } else {
                            this.SaveSingleDay();
                        }
                    }
                };

                WeeklyScheduleViewModel.prototype.ClosePopuponSave = function (targetElement) {
                    $('.ccx-ui-popup-container .ccx-ui-popup-close').click(targetElement);
                    $('.ccx-ui-popup-container').fadeOut('fast', function () {
                        $('.ccx-ui-popup-container').remove();
                        CrmData.Common.enableHTMLScroll();
                    });
                };

                WeeklyScheduleViewModel.prototype.CalculateObservableChanges = function (type, indx) {
                    this.ConflictBackupValue = '';
                    if (this.IsRemoveItem || this.ItemsAdded || this.ItemsLoaded) {
                        this.IsRemoveItem = false;
                        this.ItemsAdded = false;
                        this.ItemsLoaded = false;
                        return;
                    }

                    switch (type) {
                        case 'Start':
                            if (indx != 0)
                                this.ConflictBackupValue = this.ScheduleRows()[indx - 1].WorkEndTime();
                            else
                                this.ConflictBackupValue = this.StartConflictVal();
                            if (!this.ValidateRangeNew('Start', indx)) {
                                if (this.ScheduleRows()[indx].IsBreak()) {
                                    this.ScheduleRows()[indx - 1].WorkEndTime(this.ScheduleRows()[indx].WorkStartTime());
                                    this.ScheduleRows()[indx + 1].WorkStartTime(this.ScheduleRows()[indx].WorkEndTime());
                                } else {
                                    if (this.ScheduleRows()[indx - 1])
                                        this.ScheduleRows()[indx - 1].WorkEndTime(this.ScheduleRows()[indx].WorkStartTime());
                                }
                            }
                            break;
                        case 'End':
                            if (indx != this.ScheduleRows().length - 1)
                                this.ConflictBackupValue = this.ScheduleRows()[indx + 1].WorkStartTime();
                            else
                                this.ConflictBackupValue = this.EndConflictVal();

                            if (!this.ValidateRangeNew('End', indx)) {
                                if (this.ScheduleRows()[indx].IsBreak()) {
                                    this.ScheduleRows()[indx + 1].WorkStartTime(this.ScheduleRows()[indx].WorkEndTime());
                                } else {
                                    if (this.ScheduleRows()[indx + 1])
                                        this.ScheduleRows()[indx + 1].WorkStartTime(this.ScheduleRows()[indx].WorkEndTime());
                                }
                            }
                            break;
                    }

                    this.ComputeWorkAndBreakHours();
                    this.EnableDisableButton(indx);
                    this.SetDefaultValuesforConflict();
                    if (this.VaryByDay() && this.IsEditMode()) {
                        var l_text = this.ScheduleRows()[0].WorkStartTime() + ' - ' + this.ScheduleRows()[this.ScheduleRows().length - 1].WorkEndTime();
                        this.DaysCollection()[this.vbd_CurIndex].vbd_LinkText(l_text);
                    }
                };

                WeeklyScheduleViewModel.prototype.ValidateRangeNew = function (type, index) {
                    if (this.ItemsAdded) {
                        this.ItemsAdded = false;
                        return 1;
                    }
                    var result = false;

                    var TimeSelected = type == 'Start' ? this.ScheduleRows()[index].WorkStartTime() : this.ScheduleRows()[index].WorkEndTime();
                    if (!TimeSelected)
                        return 1;
                    var diff = 0;

                    if (type == 'Start') {
                        var diffUp = 0;
                        if (index != 0)
                            diffUp = this.CompareTimeNew(TimeSelected.split(':'), this.ScheduleRows()[index - 1].WorkStartTime().split(':'));
                        var diffRight = this.CompareTimeNew(TimeSelected.split(':'), this.ScheduleRows()[index].WorkEndTime().split(':'));
                        if (index != 0)
                            result = diffUp <= -300000 && diffRight >= 300000;
                        else
                            result = diffRight >= 300000;
                    } else {
                        var diffDown = 0;
                        if (index != this.ScheduleRows().length - 1)
                            diffDown = this.CompareTimeNew(TimeSelected.split(':'), this.ScheduleRows()[index + 1].WorkEndTime().split(':'));
                        var diffLeft = this.CompareTimeNew(TimeSelected.split(':'), this.ScheduleRows()[index].WorkStartTime().split(':'));
                        if (index != this.ScheduleRows().length - 1)
                            result = diffDown >= 300000 && diffLeft <= -300000;
                        else
                            result = diffLeft <= -300000;
                    }

                    var diffResult = false;
                    if (!this.ScheduleRows()[index].IsBreak() && this.ScheduleRows()[index].WorkStartTime() && this.ScheduleRows()[index].WorkEndTime()) {
                        var start = this.ScheduleRows()[index].WorkStartTime();
                        var end = this.ScheduleRows()[index].WorkEndTime();
                        var diff = this.CalculateTimeDifference(start.split(':'), end.split(':'));
                        diffResult = diff > 5 ? true : false;
                    }

                    if (result && diffResult) {
                        return;
                    } else {
                        if (type == 'Start')
                            this.ScheduleRows()[index].WorkStartTime(this.ConflictBackupValue);
                        else
                            this.ScheduleRows()[index].WorkEndTime(this.ConflictBackupValue);
                        if (!result) {
                            CrmData.Common.showMessage(WORK_RANGE_CONFLICT);
                        } else if (!diffResult && result) {
                            CrmData.Common.showMessage(MINIMUM_DURATION_ALERT);
                        }

                        $('#w2ui-popup').css('z-index', '1000000');
                    }
                };

                WeeklyScheduleViewModel.prototype.ComputeWorkAndBreakHours = function () {
                    var _this = this;
                    setTimeout(function () {
                        var startTime = _this.ScheduleRows()[0].WorkStartTime();
                        var endTime = _this.ScheduleRows()[_this.ScheduleRows().length - 1].WorkEndTime();
                        if (!startTime || !endTime)
                            return;
                        var TotalTime = _this.CalculateTimeDifference(startTime.split(':'), endTime.split(':'));
                        var TotalBreakMinutes = 0;
                        for (var i = 0; i < _this.ScheduleRows().length; i++) {
                            if (_this.ScheduleRows()[i].IsBreak()) {
                                TotalBreakMinutes += _this.CalculateTimeDifference(_this.ScheduleRows()[i].WorkStartTime().split(':'), _this.ScheduleRows()[i].WorkEndTime().split(':'));
                            }
                        }

                        var TotalWorkHr = TotalTime - TotalBreakMinutes;
                        _this.Total((_this.ConvertToHour(TotalTime, 'Total')).toPrecision(3));
                        _this.Working((_this.ConvertToHour(TotalWorkHr, 'Working')).toPrecision(3));
                        if (_this.TimeTypeBreaks('minutes'))
                            _this.Breaks((_this.ConvertToHour(TotalBreakMinutes, 'Breaks')).toPrecision(2));
                        else
                            _this.Breaks((_this.ConvertToHour(TotalBreakMinutes, 'Breaks')).toPrecision(3));
                    }, 300);
                };

                WeeklyScheduleViewModel.prototype.CanAddMoreRows = function (index) {
                    if (this.ScheduleRows()[index].WorkStartTime() && this.ScheduleRows()[index].WorkEndTime()) {
                        var start = this.ScheduleRows()[index].WorkStartTime();
                        var end = this.ScheduleRows()[index].WorkEndTime();
                        var diff = this.CalculateTimeDifference(start.split(':'), end.split(':'));
                        return diff < 15 ? false : true;
                    }
                };

                WeeklyScheduleViewModel.prototype.AddItems = function (index) {
                    if (!this.CanAddMoreRows(index))
                        return;
                    this.ItemsAdded = true;
                    this.ScheduleRows.splice(index + 1, 0, {
                        WorkStartTime: ko.observable(''),
                        WorkEndTime: ko.observable(''),
                        IsBreak: ko.observable(true),
                        Index: ko.observable(index + 1),
                        ButtonStatus: ko.observable(true)
                    });
                    this.ScheduleRows.splice(index + 2, 0, {
                        WorkStartTime: ko.observable(''),
                        WorkEndTime: ko.observable(''),
                        IsBreak: ko.observable(false),
                        Index: ko.observable(index + 2),
                        ButtonStatus: ko.observable(true)
                    });
                    this.BreakCount = this.BreakCount + 1;

                    this.AdjustButtonsForIE();

                    this.ComputeDefaultBreak(index);

                    this.ComputeWorkAndBreakHours();
                    this.SetDefaultValuesforConflict();
                };

                WeeklyScheduleViewModel.prototype.AdjustButtonsForIE = function () {
                    var _this = this;
                    setTimeout(function () {
                        if (_this.IsMSIE()) {
                            $(".dummyClsAddSchedule").css({ 'padding': '3px', 'margin': '1px', 'line-height': 'normal' });
                        }
                    }, 0);
                };

                WeeklyScheduleViewModel.prototype.SetDefaultValuesforConflict = function () {
                    if (this.ScheduleRows()[0].WorkStartTime())
                        this.StartConflictVal(this.ScheduleRows()[0].WorkStartTime());
                    if (this.ScheduleRows()[this.ScheduleRows().length - 1].WorkEndTime())
                        this.EndConflictVal(this.ScheduleRows()[this.ScheduleRows().length - 1].WorkEndTime());
                };

                WeeklyScheduleViewModel.prototype.DeleteItems = function (index) {
                    this.IsRemoveItem = true;
                    this.BreakCount = this.BreakCount - 1;
                    this.onRemoveItem(index);

                    this.ScheduleRows.remove(this.ScheduleRows()[index]);
                    this.ScheduleRows.remove(this.ScheduleRows()[index]);

                    this.ComputeWorkAndBreakHours();
                    this.EnableDisableButton(index - 1);
                    this.SetDefaultValuesforConflict();
                };

                WeeklyScheduleViewModel.prototype.onRemoveItem = function (RowIndex) {
                    this.ScheduleRows()[RowIndex - 1].WorkEndTime(this.ScheduleRows()[RowIndex + 1].WorkEndTime());
                };

                WeeklyScheduleViewModel.prototype.onSaveClick = function (arrayValue, day, isClose, innerCalendarID) {
                    var endDate = '';
                    if (this.UntilDateString().length > 0) {
                        endDate = this.UntilDateString();
                    } else {
                        CrmData.Common.showMessage('End date cannot be empty.Please enter an End date');
                        return;
                    }
                    this.SaveDataToCRM(arrayValue, day, isClose, innerCalendarID, endDate);
                };

                WeeklyScheduleViewModel.prototype.SaveDataToCRM = function (arrayValue, day, isClose, innerCalendarID, endDate) {
                    var _this = this;
                    var utcStart = "T00:00:00Z";
                    var utcEnd = "T23:59:59Z";
                    var startTime = arrayValue[0].WorkStartTime();
                    var endTime = arrayValue[arrayValue.length - 1].WorkEndTime();
                    var typeCode = 0;
                    var workDays = day;
                    var startDate = this.DateRange();
                    var breakStartTime = "";
                    var breakEndTime = "";
                    var subTypeCode = (this.RecSubType !== null && this.RecSubType !== undefined && this.RecSubType !== 2 /* Entire */) ? this.RecSubType : -1;
                    var startDate = (this.RecSubType && this.RecSubType === 2 /* Entire */) ? $.datepicker.formatDate('yy-mm-dd', this.EditScheduleDetails.ScheduleTypeInfo.StartTime) : ((this.RecSubType && this.RecSubType === 1 /* SelectedDayForward */) ? $.datepicker.formatDate('yy-mm-dd', new Date(this.selectedDate())) : $.datepicker.formatDate('yy-mm-dd', new Date(this.DateRange())));
                    var ConflictStartDate = startDate + "T12:00:00Z";
                    startDate = startDate + utcStart;
                    var edate = $.datepicker.formatDate('yy-mm-dd', new Date(endDate));
                    endDate = edate + utcEnd;
                    for (var index = 1; index < arrayValue.length; index = index + 2) {
                        breakStartTime = breakStartTime + "," + arrayValue[index].WorkStartTime();
                        breakEndTime = breakEndTime + "," + arrayValue[index].WorkEndTime();
                    }
                    breakStartTime = breakStartTime.substr(1, breakStartTime.length);
                    breakEndTime = breakEndTime.substr(1, breakEndTime.length);
                    var isEdit = this.IsEdit();
                    var businessClosure = (this.BusinessClosure() !== null && this.BusinessClosure().length > 0) ? (this.BusinessClosure() === "OBS" ? true : false) : false;
                    if (this.IsDeleteSchedule()) {
                        AppUI.confirm(DELETE_CALENDAR_CONFIRM, function () {
                            var doneLoading = AppUI.loading('Deleting Schedule...', 10, $('.ccx-ui-popup')[0]);
                            CrmData.ScheduleData.AddWorkHours(startDate, startTime, endDate, endTime, breakStartTime, breakEndTime, _this.EquipmentId(), workDays, parseInt(_this.User_TimezoneCode), innerCalendarID, 0, false, _this.IsDeleteSchedule(), false, $.datepicker.formatDate('yy-mm-dd', new Date(_this.selectedDate())) + "T00:00:00Z", '', subTypeCode, function (result) {
                                if (result && result.issuccess) {
                                    doneLoading();
                                    _this.ClosePopup(DELETE_SUCCESS);
                                    if (_this.VaryByDay()) {
                                        _this.vbd_ScheduleRowsContainer([]);
                                    } else {
                                        _this.ScheduleRows([]);
                                        _this.ResetWorkHoursTotal();
                                    }
                                } else {
                                    doneLoading();
                                    CrmData.Common.showMessage(ADD_UPDATE_FAIL);
                                    CrmData.Common.disableHTMLScroll();
                                }
                            });
                        });
                    } else {
                        var doneLoading = AppUI.loading('Please wait...', 10, $('.ccx-ui-popup')[0]);
                        if (this.RecSubType === null) {
                            isEdit = false;
                        } else {
                            isEdit = (this.RecSubType === 2 /* Entire */) ? true : false;
                        }

                        this.WorkHoursConflictCheck(startDate, startTime, endTime, endDate, 11, '', typeCode, subTypeCode, workDays, function (SaveDate) {
                            if (SaveDate) {
                                CrmData.ScheduleData.AddWorkHours(startDate, startTime, endDate, endTime, breakStartTime, breakEndTime, _this.EquipmentId(), workDays, parseInt(_this.User_TimezoneCode), innerCalendarID, 0, isEdit, _this.IsDeleteSchedule(), businessClosure, $.datepicker.formatDate('yy-mm-dd', new Date(_this.selectedDate())), '', subTypeCode, function (result) {
                                    if (result && result.issuccess) {
                                        if (!_this.IsEdit()) {
                                            doneLoading();
                                            _this.ClosePopup(ADD_SUCCESS);
                                        } else {
                                            doneLoading();
                                            _this.ClosePopup(UPDATE_SUCCESS);
                                        }
                                    } else {
                                        doneLoading();
                                        CrmData.Common.showMessage(ADD_UPDATE_FAIL);
                                        CrmData.Common.disableHTMLScroll();
                                    }
                                });
                            }
                        });
                    }
                };

                WeeklyScheduleViewModel.prototype.WorkHoursConflictCheck = function (startDate, startTime, endTime, enddate, ConflictTypeCode, pattern, typeCode, subTypeCode, days, callback) {
                    var _this = this;
                    var Day = '';
                    var SaveDate = true;
                    var CalenderId = '';
                    var providerModel = new Scheduling.Models.ProviderSchedule();
                    this.ConflictCheckWorkHour(startDate, startTime, endTime, enddate, ConflictTypeCode, pattern, days, function (result) {
                        if (result && result.issuccess) {
                            _this.ShowConflict(result, function (Isave) {
                                if (Isave) {
                                    var d = result.scheduleStartDate;
                                    d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
                                    var scheduleStartDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
                                    CrmData.ScheduleData.AddWorkHours($.datepicker.formatDate('yy-mm-dd', scheduleStartDate) + "T00:00:00Z", startTime, enddate, endTime, '', '', result.ConflictEquipmentId, '', parseInt(_this.User_TimezoneCode), result.ConflictCalendarid, result.conflictTypeCode, false, true, false, $.datepicker.formatDate('yy-mm-dd', new Date(startDate)) + "T00:00:00Z", '', subTypeCode, function (result) {
                                        if (result && result.issuccess) {
                                            callback(true);
                                        } else {
                                            CrmData.Common.showMessage('Data delete not successfull');
                                        }
                                    });
                                } else {
                                    callback(false);
                                }
                            });
                        } else {
                            callback(true);
                        }
                    });
                };

                WeeklyScheduleViewModel.prototype.ConflictCheckWorkHour = function (startDate, startTime, endTime, enddate, typeCode, pattern, days, callback) {
                    CrmData.ScheduleData.AddWorkHours(startDate, startTime, enddate, endTime, '', '', this.EquipmentId(), days, parseInt(this.User_TimezoneCode), this.ProviderId(), typeCode, false, false, false, $.datepicker.formatDate('yy-mm-dd', new Date(startDate)), pattern, 4, function (result) {
                        if (result && result.isconflict) {
                            callback(result);
                        } else {
                            callback(null);
                        }
                    });
                };

                WeeklyScheduleViewModel.prototype.ShowConflict = function (result, IsSave) {
                    var d = result.ConflictDate;
                    d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
                    var conflictDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());

                    var year = (conflictDate).toString().split(' ')[3];
                    if (year == "00:00:00") {
                        year = (conflictDate).toString().split(' ')[5];
                    }
                    var Day = (conflictDate).toString().split(' ')[0] + ' ' + (conflictDate).toString().split(' ')[1] + ' ' + (conflictDate).toString().split(' ')[2] + ' ' + year;

                    this.ConflictFacilityName = result.locationname;
                    var cStartTime = ":00";
                    var cEndTime = ":00";
                    var conflictStartTime = result.ConflictStartTime;
                    var conflictEndTime = result.ConflictEndTime;
                    var ScheduleStart = '';

                    if (result.conflictTypeCode == 0) {
                        ScheduleStart = "Starts from ";
                    }

                    var cStartFirst = ' ';
                    var cEndTimeFirst = '';
                    if ((conflictStartTime).toString().split(':')[0].length == 1) {
                        cStartFirst = "0";
                    }
                    if ((conflictEndTime).toString().split(':')[0].length == 1) {
                        cEndTimeFirst = "0";
                    }

                    if ((conflictStartTime).toString().split(':')[1] == 0) {
                        conflictStartTime = conflictStartTime.toString().split(':')[0] + cStartTime;
                    }
                    if ((conflictEndTime).toString().split(':')[1] == 0) {
                        conflictEndTime = conflictEndTime.toString().split(':')[0] + cEndTime;
                    }
                    if ((conflictStartTime).toString().split(':')[1] != 0 && (conflictStartTime).toString().split(':')[1].length == 1) {
                        conflictStartTime = conflictStartTime.toString().split(':')[0] + ":" + "0" + (conflictStartTime).toString().split(':')[1];
                    }
                    if ((conflictEndTime).toString().split(':')[1] != 0 && (conflictEndTime).toString().split(':')[1].length == 1) {
                        conflictEndTime = conflictEndTime.toString().split(':')[0] + ":" + "0" + (conflictEndTime).toString().split(':')[1];
                    }

                    this.ConflictSchedule = ScheduleStart + Day + ": " + cStartFirst + conflictStartTime + " - " + cEndTimeFirst + conflictEndTime;
                    var element = AppUI.Popup.show(null, 'Schedule Conflict!');
                    CrmData.Common.disableHTMLScroll();
                    var viewContext = new Ccx.Scheduling.ViewModels.ConfirmationViewModel(true, this.ConflictFacilityName, this.ConflictSchedule, function (onsave) {
                        if (onsave) {
                            IsSave(true);
                        }
                    });
                    App.View.load({
                        ViewName: 'Scheduling-ConfirmationView',
                        ViewContext: viewContext
                    }, element);
                };
                return WeeklyScheduleViewModel;
            })();
            ViewModels.WeeklyScheduleViewModel = WeeklyScheduleViewModel;
        })(Scheduling.ViewModels || (Scheduling.ViewModels = {}));
        var ViewModels = Scheduling.ViewModels;
    })(Ccx.Scheduling || (Ccx.Scheduling = {}));
    var Scheduling = Ccx.Scheduling;
})(Ccx || (Ccx = {}));
