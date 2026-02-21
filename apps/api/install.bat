@echo off
echo Starting install... > C:\Users\igor\Desktop\api-install.log
call "C:\Program Files (x86)\Microsoft Visual Studio\2019\BuildTools\VC\Auxiliary\Build\vcvars64.bat" >> C:\Users\igor\Desktop\api-install.log 2>&1
echo vcvars done >> C:\Users\igor\Desktop\api-install.log
cd /d C:\projects\astropedija-copy\apps\api
C:\projects\astropedija-copy\apps\api\venv\Scripts\python.exe -m pip install -e . >> C:\Users\igor\Desktop\api-install.log 2>&1
echo EXIT_CODE=%ERRORLEVEL% >> C:\Users\igor\Desktop\api-install.log
