module Ccx.Scheduling.ViewModels {
    export class CalendarAdministrationMyServicesViewModel
    {
        public ColumnValue: KnockoutObservableArray<AppUI.IListItem>;
        public RowValue: KnockoutObservableArray<AppUI.IListItem>;      


        public constructor() {

            this.ColumnValue = ko.observableArray([
                <AppUI.IListItem>{ Text: '', Value: '' },   
                <AppUI.IListItem>{ Text: 'Tribridge North', Value: 'TBN' },               
                < AppUI.IListItem > { Text: 'Westgate', Value: 'WES' },
                < AppUI.IListItem > { Text: 'Riverside', Value: 'RVS' },
                < AppUI.IListItem > { Text: 'Cedar Hills', Value: 'CDH' },
                < AppUI.IListItem > { Text: 'Misty Vale', Value: 'MSV' },
            ]);

            this.RowValue = ko.observableArray([
                <AppUI.IListItem>{ Text: 'Art Therapy Individual', Value: 'ATI' },              
                < AppUI.IListItem > { Text: 'Art Therapy Group', Value: 'ATG' },
                < AppUI.IListItem > { Text: 'Medication Management', Value: 'MDM' },
                < AppUI.IListItem > { Text: 'Substance Abuse Individual', Value: 'SAI' },
                < AppUI.IListItem > { Text: 'Substance Abuse Group', Value: 'SAG' },
                < AppUI.IListItem > { Text: 'Methadone Treatment', Value: 'MDT' },
                < AppUI.IListItem > { Text: 'Residential Services-Adult', Value: 'RSA' },
                < AppUI.IListItem > { Text: 'UCR Services - Per Encounter', Value: 'USE' },
            ]);
        }
        public test3()
        {
            AppUI.Popup.showMessage('Testing', 5);
        }
    }
}
 