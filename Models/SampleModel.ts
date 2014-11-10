
module Ccx.Scheduling.Models
{
    export class SampleModel extends AppData.Model
    {
        public ListEntities(field1: any, callback: (results: any[]) => void)
        {
            this.DataAccess.query('ccx_entityname')
                .select('ccx_field1', 'ccx_field2')
                .where('ccx_field1', AppData.ExpressionOperator.Equals, field1)
                .where('ccx_field2', AppData.ExpressionOperator.GreaterThan, 3)
                .orderBy('ccx_field2', true)
                .execute(callback);
        }
    }
} 