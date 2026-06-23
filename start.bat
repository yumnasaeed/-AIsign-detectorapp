@echo off

echo ========================================
echo   AI Sign Detector - Starting...
echo ========================================
echo.

cd /d "%~dp0"

start "Backend" cmd /k "cd /d backend-app && npm run dev"

timeout /t 2 /nobreak > nul

start "Frontend" cmd /k "cd /d frontend && set PORT=3002 && npm start"

timeout /t 2 /nobreak > nul

start "AI Detector" cmd /k "cd /d backend-app && python ai_detector.py"

echo.
echo All 3 servers starting...
echo Backend:     http://localhost:5001
echo Frontend:    http://localhost:3002
echo AI Detector: http://localhost:5002
echo.
pause