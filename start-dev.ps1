# FIELDPORTER Development Server Startup Script
# This script loads environment variables from .env.local and starts the dev server

Write-Host "Loading FIELDPORTER environment variables..." -ForegroundColor Cyan

# Load .env.local file if it exists
if (Test-Path ".env.local") {
    Get-Content ".env.local" | ForEach-Object {
        # Skip comments and empty lines
        if ($_ -match '^\s*#' -or $_ -match '^\s*$') {
            return
        }
        
        # Parse KEY=VALUE format
        if ($_ -match '^([^=]+)=(.*)$') {
            $key = $matches[1].Trim()
            $value = $matches[2].Trim()
            
            # Set environment variable
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
            $env:$key = $value
            
            # Show loaded (but hide sensitive values)
            if ($key -like "*KEY*" -or $key -like "*SECRET*" -or $key -like "*PASSWORD*") {
                Write-Host "  ✓ $key = ***HIDDEN***" -ForegroundColor Green
            } else {
                Write-Host "  ✓ $key = $value" -ForegroundColor Green
            }
        }
    }
    Write-Host "`n✅ Environment variables loaded from .env.local" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env.local file not found" -ForegroundColor Yellow
}

Write-Host "`nStarting development server...`n" -ForegroundColor Cyan

# Start the dev server
npm run dev

