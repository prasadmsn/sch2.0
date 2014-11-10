
module Ccx.Scheduling.Models
{
    export interface IDataServicesProviders
    {
        Name: string;
        Location: string;
        Id: AppData.IUniqueidentifier;

    }
    export class ProviderSearch extends AppData.Model
    {


        public GetProviders(name: string, callback: AppData.callback<AppUI.IListItem[]>)
        {
            /* 
            * Get providers
            *  @name name to search
            * @param callbackfn A function that accepts one arguments of any type and returns the result in array.
            */
            try
            {
                var providers = <AppUI.IListItem[]>[];
                this.DataAccess.query('systemuser')
                    .or((orExp) => {

                        orExp.where('lastname', AppData.ExpressionOperator.Contains, '%%' + name + '%%')
                             orExp.where('fullname', AppData.ExpressionOperator.Contains, '%%' + name + '%%')
                             orExp.where('firstname', AppData.ExpressionOperator.Contains, '%%' + name + '%%')

                      })
                    .select('fullname', 'firstname', 'lastname', 'internalemailaddress', 'systemuserid').
                    orderBy('fullname', false).execute(<IDataServicesProviders>(provider) => {

                        ko.utils.arrayForEach(provider,(elem)=>{

                            providers.push(<AppUI.IListItem>{
                                Text: elem['fullname'] + " | " + ((elem['internalemailaddress']) ? elem['internalemailaddress'] : "No email found"),
                                Value: <any>elem['systemuserid']
                            });
                        });
                        callback(providers);


                    });

            }
            catch (ex) {
                AppUI.Popup.showMessage('An Unexpected error has occured.Please try refreshing the application');
            }
        }

    }
} 