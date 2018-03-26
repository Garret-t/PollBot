@echo off

set /p input="Press o to open a new window, press c to close: "

if "%input%" == "o" (
	start cmd.exe /k run.bat
	start cmd.exe /k node "voteBot.js"
	exit /b 0
	
)
if "%input%" == "c" (
	taskkill /IM  cmd.exe
) 