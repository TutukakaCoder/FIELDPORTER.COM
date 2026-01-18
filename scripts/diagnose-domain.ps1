# Domain Diagnosis Script for fieldporter.com
# Checks Firebase hosting configuration and domain status

Write-Host "=== FIELDPORTER Domain Diagnosis ===" -ForegroundColor Cyan
Write-Host ""

# Check if Firebase CLI is available
Write-Host "1. Checking Firebase CLI..." -ForegroundColor Yellow
try {
    $firebaseVersion = npx firebase --version 2>&1
    Write-Host "   Firebase CLI: Available" -ForegroundColor Green
} catch {
    Write-Host "   Firebase CLI: Not found" -ForegroundColor Red
    exit 1
}

# Check Firebase project
Write-Host ""
Write-Host "2. Checking Firebase project configuration..." -ForegroundColor Yellow
if (Test-Path ".firebaserc") {
    $firebaserc = Get-Content ".firebaserc" | ConvertFrom-Json
    Write-Host "   Project: $($firebaserc.projects.default)" -ForegroundColor Green
} else {
    Write-Host "   .firebaserc not found" -ForegroundColor Red
}

# List Firebase hosting sites
Write-Host ""
Write-Host "3. Listing Firebase hosting sites..." -ForegroundColor Yellow
npx firebase hosting:sites:list

# Check DNS records
Write-Host ""
Write-Host "4. Checking DNS records for fieldporter.com..." -ForegroundColor Yellow
try {
    $dnsA = Resolve-DnsName -Name "fieldporter.com" -Type A -ErrorAction SilentlyContinue
    $dnsCNAME = Resolve-DnsName -Name "fieldporter.com" -Type CNAME -ErrorAction SilentlyContinue
    
    if ($dnsA) {
        Write-Host "   A Records:" -ForegroundColor Green
        $dnsA | ForEach-Object { Write-Host "     $($_.IPAddress)" }
    }
    
    if ($dnsCNAME) {
        Write-Host "   CNAME Record:" -ForegroundColor Green
        Write-Host "     $($dnsCNAME.NameHost)" -ForegroundColor Green
    }
    
    if (-not $dnsA -and -not $dnsCNAME) {
        Write-Host "   No DNS records found" -ForegroundColor Red
    }
} catch {
    Write-Host "   DNS check failed: $_" -ForegroundColor Red
}

# Test URLs
Write-Host ""
Write-Host "5. Testing URLs..." -ForegroundColor Yellow

$urls = @(
    "https://fieldporter-website.web.app",
    "https://fieldporter.com"
)

foreach ($url in $urls) {
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 10 -UseBasicParsing -ErrorAction Stop
        Write-Host "   $url : OK (Status: $($response.StatusCode))" -ForegroundColor Green
        
        # Check for Firebase headers
        if ($response.Headers["x-firebase-hosting"]) {
            Write-Host "     Firebase Hosting: Yes" -ForegroundColor Green
        } else {
            Write-Host "     Firebase Hosting: No (may be pointing elsewhere)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "   $url : FAILED ($($_.Exception.Message))" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "=== Diagnosis Complete ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Check Firebase Console > Hosting > Custom domains"
Write-Host "2. Verify DNS records point to Firebase"
Write-Host "3. Test in Incognito mode to bypass browser cache"
Write-Host "4. Wait 5-10 minutes for CDN cache propagation"
