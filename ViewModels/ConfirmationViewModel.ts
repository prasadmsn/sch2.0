module Ccx.Scheduling.ViewModels {
    export class ConfirmationViewModel {
       
        public IsConflict: KnockoutObservable<boolean>
        public ConflictFacilityName: KnockoutObservable<string>
         public ConflictSchedule: KnockoutObservable<string>

        constructor(IsConflict: boolean, conflictFacilityName: string, ConflictSchedule: string, private OnSave?: AppData.callback<any>) {
            this.IsConflict = ko.observable(IsConflict || false);
            this.ConflictFacilityName = ko.observable(conflictFacilityName || '');
            this.ConflictSchedule = ko.observable(ConflictSchedule || '');
        }


        public SaveConflict() {
            this.OnSave(true);
        }
        public CancelConflict() {
            AppUI.Popup.hideAll();
            
        }

    }
}