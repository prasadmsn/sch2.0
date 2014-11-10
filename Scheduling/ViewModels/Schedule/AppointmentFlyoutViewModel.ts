
module Ccx.Scheduling.ViewModels.Schedule
{

    export class AppointmentFlyoutViewModel
    {
        public SelectedData:KnockoutObservable<Ccx.Scheduling.Models.IAppointments>;
        constructor(data: Ccx.Scheduling.Models.IAppointments) 
        {
            $('#w2ui-overlay').attr('style', 'left:100px !important;');
            this.SelectedData = ko.observable(data);
        }
        public formatTime(datetime, military)
        {
             
            var appoitmentStartTime = datetime;
            if (appoitmentStartTime)
            {
                return appoitmentStartTime.getHours() + ":" + appoitmentStartTime.getMinutes();
            }
            return "";
        }
    }
}