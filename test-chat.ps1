# Test FIELDPORTER AI Chat
Write-Host "Testing AI Chat API..." -ForegroundColor Cyan

# Test 1: Simple greeting
Write-Host ""
Write-Host "=== TEST 1: Simple Greeting ===" -ForegroundColor Yellow
$body1 = @{
    message = "Hello"
    sessionId = "test-123"
    conversationHistory = @()
} | ConvertTo-Json

try {
    $response1 = Invoke-RestMethod -Uri "http://localhost:3000/api/chat" -Method Post -Body $body1 -ContentType "application/json"
    Write-Host "Response received" -ForegroundColor Green
    Write-Host "Response: $($response1.response)" -ForegroundColor White
    Write-Host "Lead Score: $($response1.leadScore)" -ForegroundColor White
    Write-Host "Response Time: $($response1.metadata.responseTime)ms" -ForegroundColor White
} catch {
    Write-Host "Test 1 Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Business question
Write-Host ""
Write-Host "=== TEST 2: Business Question ===" -ForegroundColor Yellow
$body2 = @{
    message = "What services does FIELDPORTER offer?"
    sessionId = "test-456"
    conversationHistory = @()
} | ConvertTo-Json

try {
    $response2 = Invoke-RestMethod -Uri "http://localhost:3000/api/chat" -Method Post -Body $body2 -ContentType "application/json"
    Write-Host "Response received" -ForegroundColor Green
    Write-Host "Response: $($response2.response)" -ForegroundColor White
    Write-Host "Lead Score: $($response2.leadScore)" -ForegroundColor White
    Write-Host "Response Time: $($response2.metadata.responseTime)ms" -ForegroundColor White
} catch {
    Write-Host "Test 2 Failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Multi-turn conversation
Write-Host ""
Write-Host "=== TEST 3: Multi-Turn Conversation ===" -ForegroundColor Yellow
$history = @(
    @{
        role = "user"
        content = "I need help with automation"
        timestamp = (Get-Date).ToString("o")
    },
    @{
        role = "assistant"
        content = "I can help with that! What processes are you looking to automate?"
        timestamp = (Get-Date).ToString("o")
    }
)

$body3 = @{
    message = "How much would it cost?"
    sessionId = "test-789"
    conversationHistory = $history
} | ConvertTo-Json -Depth 10

try {
    $response3 = Invoke-RestMethod -Uri "http://localhost:3000/api/chat" -Method Post -Body $body3 -ContentType "application/json"
    Write-Host "Response received" -ForegroundColor Green
    Write-Host "Response: $($response3.response)" -ForegroundColor White
    Write-Host "Lead Score: $($response3.leadScore)" -ForegroundColor White
    Write-Host "Response Time: $($response3.metadata.responseTime)ms" -ForegroundColor White
} catch {
    Write-Host "Test 3 Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=== ALL TESTS COMPLETE ===" -ForegroundColor Cyan
