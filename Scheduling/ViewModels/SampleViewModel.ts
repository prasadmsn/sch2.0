
module Ccx.Scheduling.ViewModels
{
    export class SampleViewModel
    {
        public Data: any;
        public List: KnockoutObservableArray<any>;

        constructor(data: { key: string; })
        {
            this.Data = data;
            this.List = ko.observableArray();

            var model = new Models.SampleModel();
            model.ListEntities(data.key, (items) =>
            {
                this.List(items);
            });
        }

        public doAction()
        {
            alert('Action');
        }
    }
} 