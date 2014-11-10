set RootDir=%~dp0
set RootDir=%RootDir:~0,-1%
%RootDir%\AppBuilder.exe -appName:Scheduling -appVersion:1 -pageTitle:Scheduling -defaultViewName:Scheduling-View -path:"%RootDir%"