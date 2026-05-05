
Add-Type -AssemblyName System.Drawing
$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Definition
$sourcePath = "C:\Users\exorc\.gemini\antigravity\brain\9b52e2f1-ae00-4c65-a52b-d885902faf9b\shopbot_logo_base_1777608906398.png"
$destDir = Join-Path $PSScriptRoot "icons"

try {
    if (-not (Test-Path $sourcePath)) {
        throw "Source path not found: $sourcePath"
    }
    
    if (-not (Test-Path $destDir)) {
        New-Item -ItemType Directory -Path $destDir
    }

    $image = [System.Drawing.Image]::FromFile($sourcePath)
    $sizes = @(16, 48, 128)

    foreach ($size in $sizes) {
        $newImage = New-Object System.Drawing.Bitmap($size, $size)
        $graphics = [System.Drawing.Graphics]::FromImage($newImage)
        
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        
        $graphics.Clear([System.Drawing.Color]::White)
        $graphics.DrawImage($image, 0, 0, $size, $size)
        
        $destPath = Join-Path $destDir "icon$size.png"
        $newImage.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)
        
        $graphics.Dispose()
        $newImage.Dispose()
        Write-Host "Successfully created $destPath"
    }

    $image.Dispose()
} catch {
    Write-Error $_.Exception.Message
    exit 1
}
