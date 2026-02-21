@echo off
REM ──────────────────────────────────────────────
REM AstroPut API — Test Runner (Windows)
REM ──────────────────────────────────────────────
REM Usage:
REM   cd apps\api
REM   run_tests.bat              -- run all tests
REM   run_tests.bat -v           -- verbose
REM   run_tests.bat -k natal     -- run only tests matching "natal"
REM
REM Prerequisites:
REM   pip install -e ".[dev]"
REM ──────────────────────────────────────────────

cd /d "%~dp0"

REM Activate venv if exists and not already active
if "%VIRTUAL_ENV%"=="" (
    if exist "venv\Scripts\activate.bat" (
        echo Activating venv...
        call venv\Scripts\activate.bat
    )
)

REM Check pytest
where pytest >nul 2>&1
if errorlevel 1 (
    echo pytest not found. Install dev dependencies:
    echo   pip install -e ".[dev]"
    exit /b 1
)

echo ═══════════════════════════════════════════
echo   AstroPut API — Running Tests
echo ═══════════════════════════════════════════
echo.

pytest tests/ -v --tb=short %*

echo.
echo ═══════════════════════════════════════════
echo   Done!
echo ═══════════════════════════════════════════
