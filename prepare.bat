@echo off
setlocal
cd /d "%~dp0"

set "APPNAME=Directorate of Procurement"
set "ROOT=%~dp0"
set "TARGET=%ROOT%run.bat"
set "ICON=%ROOT%assets\icons\app.ico"

if not exist "%TARGET%" (
    echo   run.bat is missing from this folder.
    pause
    exit /b 1
)

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ws = New-Object -ComObject WScript.Shell;" ^
  "$lnk = $ws.CreateShortcut([Environment]::GetFolderPath('Desktop') + '\' + $env:APPNAME + '.lnk');" ^
  "$lnk.TargetPath = $env:TARGET;" ^
  "$lnk.WorkingDirectory = $env:ROOT;" ^
  "$lnk.IconLocation = $env:ICON;" ^
  "$lnk.Description = 'Directorate of Procurement - kiosk screen';" ^
  "$lnk.Save()"

if errorlevel 1 (
    echo   Could not create the desktop shortcut.
    pause
    exit /b 1
)

echo.
echo   Desktop shortcut created: "%APPNAME%"
echo   Pin it to the taskbar, then run it to launch the kiosk.
echo.
pause
exit /b 0