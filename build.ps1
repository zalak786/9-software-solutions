$source = "c:\Users\nrupa\Downloads\9_software_solutions_website\project"
$dest = "c:\Users\nrupa\Downloads\9_software_solutions_website\dist"

# Create dist directory
if (Test-Path $dest) {
    Remove-Item $dest -Recurse -Force
}
New-Item -ItemType Directory -Force -Path $dest | Out-Null

# Files to copy
$files = @(
    "index.html",
    "ai-ml.html",
    "blockchain.html",
    "cloud.html",
    "data-analytics.html",
    "mobile-app.html",
    "quantum-computing.html",
    "web-dev.html",
    "style.css",
    "main.js",
    "counter.js",
    "swiper-bundle.min.css",
    "swiper-bundle.min.js",
    "javascript.svg",
    "robots.txt",
    "sitemap.xml"
)

# Copy individual files
foreach ($file in $files) {
    $srcPath = Join-Path $source $file
    if (Test-Path $srcPath) {
        Copy-Item $srcPath $dest
    } else {
        Write-Host "Warning: File $file not found."
    }
}

# Copy public directory
$publicSrc = Join-Path $source "public"
$publicDest = Join-Path $dest "public"
if (Test-Path $publicSrc) {
    Copy-Item $publicSrc $publicDest -Recurse
}

Write-Host "Build complete! Files are in $dest"
