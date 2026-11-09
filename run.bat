@echo off
setlocal
cd /d "%~dp0"

set "EDGE=%ProgramFiles(x86)%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%ProgramFiles%\Microsoft\Edge\Application\msedge.exe"
if not exist "%EDGE%" set "EDGE=%LocalAppData%\Microsoft\Edge\Application\msedge.exe"

if not exist "%EDGE%" (
    echo.
    echo   Microsoft Edge was not found on this machine.
    echo   Install Edge or edit run.bat to point at your browser.
    echo.
    pause
    exit /b 1
)

start "" "%EDGE%" --kiosk "%~dp0index.html" ^
  --edge-kiosk-type=fullscreen ^
  --no-first-run ^
  --no-default-browser-check ^
  --disable-features=Translate,msEdgeSidebarV2 ^
  --allow-file-access-from-files

exit /b 0