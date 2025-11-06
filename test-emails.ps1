# Test Email Notifications
# This script tests both chat and contact form email notifications

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  FIELDPORTER EMAIL NOTIFICATION TEST" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$baseUrl = "http://localhost:3000"

# Test 1: Contact Form
Write-Host "[TEST 1] Testing Contact Form Submission..." -ForegroundColor Yellow
$contactBody = @{
    name = "Test User"
    email = "test@example.com"
    company = "Test Company"
    projectType = "AI Strategy Consulting"
    challengeDescription = "Testing email notifications for contact form"
    budgetRange = "`$10k-$25k"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/contact" -Method POST -Body $contactBody -ContentType "application/json"
    $result = $response.Content | ConvertFrom-Json
    Write-Host "✅ Contact form submitted" -ForegroundColor Green
    Write-Host "   - Lead Score: $($result.leadScore)/10" -ForegroundColor Gray
    Write-Host "   - Submission ID: $($result.id)" -ForegroundColor Gray
    Write-Host "   - Check terminal for email logs`n" -ForegroundColor Gray
} catch {
    Write-Host "❌ Contact form test failed: $_" -ForegroundColor Red
}

Start-Sleep -Seconds 2

# Test 2: Chat with Email
Write-Host "[TEST 2] Testing Chat Email Extraction..." -ForegroundColor Yellow
$chatBody = @{
    message = "Hi, my email is test@company.com and I need help"
    sessionId = "test_$(Get-Date -Format 'yyyyMMddHHmmss')"
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/api/chat" -Method POST -Body $chatBody -ContentType "application/json"
    $result = $response.Content | ConvertFrom-Json
    Write-Host "✅ Chat message processed" -ForegroundColor Green
    Write-Host "   - Lead Score: $($result.leadScore)" -ForegroundColor Gray
    Write-Host "   - Email Extracted: $($result.userEmail)" -ForegroundColor Gray
    Write-Host "   - Should Notify: $($result.shouldNotify)" -ForegroundColor Gray
    Write-Host "   - Check terminal for email logs`n" -ForegroundColor Gray
} catch {
    Write-Host "❌ Chat test failed: $_" -ForegroundColor Red
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  CHECK YOUR DEVELOPMENT SERVER LOGS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Look for these log messages:" -ForegroundColor Yellow
Write-Host "  📧 sendNotificationEmail called" -ForegroundColor Gray
Write-Host "  📧 Attempting to send email from..." -ForegroundColor Gray
Write-Host "  ✅ Email sent successfully" -ForegroundColor Green
Write-Host "  OR" -ForegroundColor Gray
Write-Host "  ❌ Resend email failed" -ForegroundColor Red
Write-Host ""
Write-Host "If you see '❌ Resend email failed', it means:" -ForegroundColor Yellow
Write-Host "  - API key is working" -ForegroundColor Gray
Write-Host "  - But domain verification is needed" -ForegroundColor Gray
Write-Host "  - Check EMAIL_SETUP_STATUS.md for instructions`n" -ForegroundColor Gray

