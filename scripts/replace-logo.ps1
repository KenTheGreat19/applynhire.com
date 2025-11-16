# Replace the site's logo with an image and optionally create a favicon
# Usage: .\replace-logo.ps1 -SourcePath C:\path\to\my-logo.png
param(
    [Parameter(Mandatory=$true)][string]$SourcePath,
    [string]$DestPngSite = "site/vendor/images/logo.png",
    [string]$DestPngRoot = "vendor/images/logo.png",
    [string]$Favicon = "vendor/images/favicon.ico"
)

if (-not (Test-Path $SourcePath)) {
    Write-Error "Source file not found: $SourcePath"
    exit 1
}

# Ensure vendor directories exist
$siteVendor = Split-Path $DestPngSite -Parent
$rootVendor = Split-Path $DestPngRoot -Parent
if (-not (Test-Path $siteVendor)) { New-Item -ItemType Directory -Path $siteVendor -Force | Out-Null }
if (-not (Test-Path $rootVendor)) { New-Item -ItemType Directory -Path $rootVendor -Force | Out-Null }

Copy-Item -Path $SourcePath -Destination $DestPngSite -Force
Copy-Item -Path $SourcePath -Destination $DestPngRoot -Force

Write-Host "Copied logo to $DestPngSite and $DestPngRoot" -ForegroundColor Green

# Optional: create favicon.ico if ImageMagick/convert is available
if (Get-Command convert -ErrorAction SilentlyContinue) {
    try {
        convert "$SourcePath" -resize 64x64 "$Favicon"
        Write-Host "Generated favicon at $Favicon" -ForegroundColor Green
    } catch {
        Write-Warning "Could not create favicon.ico; convert failed: $_"
    }
} else {
    Write-Host "ImageMagick 'convert' not found; favicon.ico not generated. You can install ImageMagick if you want automatic favicon generation." -ForegroundColor Yellow
}
