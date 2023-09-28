@echo off
echo Choose a server to run:
echo 1. MongoDB Server
echo 2. MySQL Server
set /p choice="Enter the number (1/2): "

if "%choice%"=="1" (
    cd backend-mongo
    gradlew bootRun
) else if "%choice%"=="2" (
    cd backend-sql/blog-app-sql
    gradlew bootRun
) else (
    echo Invalid choice.
)
