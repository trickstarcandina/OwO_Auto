@echo off
color 04
cls

:ask
set /p choice=Enter 1 to run mode Schedule or 2 to run mode Continuous: 

if "%choice%"=="1" (
    node index.js runClientSchedule
) else if "%choice%"=="2" (
    node index.js runClientContinuous
) else (
    echo Invalid choice. Please enter 1 or 2.
    goto ask
)

pause