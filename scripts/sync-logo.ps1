<#
Copies vendor images (logo.png) into site/vendor/images so the site pages can use the same file.
Usage: .\scripts\sync-logo.ps1 [-Source .\vendor\images\logo.png] [-DestSite .\site\vendor\images\logo.png]
#>
param(
    [string]$Source = "vendor/images/logo.png",
    [string]$DestSite = "site/vendor/images/logo.png",
    [switch]$GenerateIco
)

if (-not (Test-Path $Source)) {
    Write-Host "Source file not found: $Source" -ForegroundColor Yellow
    exit 1
}

# Ensure destination folder exists
$destFolder = Split-Path $DestSite -Parent
if (-not (Test-Path $destFolder)) {
    New-Item -ItemType Directory -Path $destFolder -Force | Out-Null
}

Copy-Item -Path $Source -Destination $DestSite -Force
Write-Host "Copied $Source -> $DestSite" -ForegroundColor Green

if ($GenerateIco) {
    # Try ImageMagick 'magick' (Windows) or 'convert' (older) to create favicon.ico
    $icoPath = Join-Path (Split-Path $Source -Parent) "favicon.ico"
    if (Get-Command magick -ErrorAction SilentlyContinue) {
        magick "$Source" -resize 64x64 "$icoPath"
        Write-Host "Generated $icoPath using magick" -ForegroundColor Green
    } elseif (Get-Command convert -ErrorAction SilentlyContinue) {
        convert "$Source" -resize 64x64 "$icoPath"
        Write-Host "Generated $icoPath using convert" -ForegroundColor Green
    } else {
        Write-Host "ImageMagick is not installed. Install it or generate favicon.ico manually." -ForegroundColor Yellow
    }
}

exit 0
