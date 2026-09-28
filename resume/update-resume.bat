@echo off
setlocal EnableExtensions
title Update resume
cd /d "%~dp0"

rem ==========================================================================
rem  HOW TO USE
rem   Option 1: drag your new resume PDF and drop it onto this file.
rem   Option 2: double-click this file and choose the PDF in the window.
rem  The PDF can have any name. It is copied here as resume.pdf, which is
rem  the file every Resume button on the site points to.
rem ==========================================================================

set "SRC=%~f1"

if not defined SRC (
  for /f "usebackq delims=" %%F in (`powershell -NoProfile -STA -Command "Add-Type -AssemblyName System.Windows.Forms; $d = New-Object System.Windows.Forms.OpenFileDialog; $d.Title = 'Choose your new resume PDF'; $d.Filter = 'PDF files (*.pdf)|*.pdf'; if ($d.ShowDialog() -eq 'OK') { $d.FileName }"`) do set "SRC=%%F"
)

if not defined SRC (
  echo No file chosen. Nothing was changed.
  goto :end
)

if not exist "%SRC%" (
  echo Could not find: "%SRC%"
  goto :end
)

for %%A in ("%SRC%") do set "EXT=%%~xA"
if /i not "%EXT%"==".pdf" (
  echo That is not a PDF: "%SRC%"
  echo Please export your resume as PDF and try again.
  goto :end
)

if /i "%SRC%"=="%~dp0resume.pdf" (
  echo That file is already the site's resume. Nothing to do.
  goto :end
)

copy /y "%SRC%" "%~dp0resume.pdf" >nul
if errorlevel 1 (
  echo Copy failed. Is resume.pdf open in another program? Close it and try again.
  goto :end
)

echo.
echo   Done! Your portfolio now uses:
echo   "%SRC%"
echo.
echo   Refresh the site in your browser to check it.
echo   If the site is online, also upload resume\resume.pdf to GitHub.

:end
echo.
pause
