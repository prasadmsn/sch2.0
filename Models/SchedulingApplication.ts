

module SchedulingApp
{


    export function InitApplication()
    {

    }
}
     
// NOTE had to define window.onerror like this
// this link explains issue with TS 0.9.5: http://stackoverflow.com/questions/20500190/window-onerror-in-ts-0-9-5-is-impossible
//window.onerror = function (message: any, source: string, lineNumber: number, colnumber?: number): any
//{
//    alert('Script error. Please contact your system administrator.\n' + message + '.');
//    //alert('JS error: ' + message + ' on line ' + lineNumber + ' for ' + source);
//};

//$(document).ajaxError(function (event, jqxhr, settings, thrownError)
//{
//    alert('Server error. Please contact your system administrator.\n' + thrownError + '.');
//});