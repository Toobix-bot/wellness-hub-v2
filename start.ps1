# Wellness Hub - PowerShell Starter
# Encoding: UTF-8

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "   🌟 Wellness Hub - Ganzheitliches Wohlbefinden   " -ForegroundColor Yellow
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""

function Test-NodeJS {
    try {
        $nodeVersion = node --version 2>$null
        if ($nodeVersion) {
            Write-Host "✅ Node.js ist installiert: $nodeVersion" -ForegroundColor Green
            return $true
        }
    } catch {
        Write-Host "❌ Node.js ist nicht installiert!" -ForegroundColor Red
        Write-Host "Bitte installiere Node.js von: https://nodejs.org/" -ForegroundColor Yellow
        return $false
    }
}

function Test-Dependencies {
    if (Test-Path "node_modules") {
        Write-Host "✅ Dependencies sind installiert" -ForegroundColor Green
        return $true
    } else {
        Write-Host "⚠️ Dependencies nicht gefunden" -ForegroundColor Yellow
        Write-Host "📦 Installiere Dependencies..." -ForegroundColor Blue
        npm install
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Dependencies erfolgreich installiert!" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ Installation fehlgeschlagen!" -ForegroundColor Red
            return $false
        }
    }
}

function Start-WellnessHub {
    Write-Host ""
    Write-Host "[1/3] Prüfe Node.js..." -ForegroundColor Blue
    if (-not (Test-NodeJS)) {
        Read-Host "Drücke Enter zum Beenden"
        return
    }

    Write-Host ""
    Write-Host "[2/3] Prüfe Dependencies..." -ForegroundColor Blue
    if (-not (Test-Dependencies)) {
        Read-Host "Drücke Enter zum Beenden"
        return
    }

    Write-Host ""
    Write-Host "[3/3] Starte Entwicklungsserver..." -ForegroundColor Blue
    Write-Host ""
    Write-Host "🚀 Wellness Hub wird gestartet..." -ForegroundColor Green
    Write-Host "🌐 Öffne http://localhost:3000 in deinem Browser" -ForegroundColor Cyan
    Write-Host "📱 Für mobile Ansicht: http://localhost:3000" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Drücke Ctrl+C zum Beenden des Servers" -ForegroundColor Yellow
    Write-Host ""

    # Öffne automatisch den Browser nach 3 Sekunden
    Start-Job -ScriptBlock {
        Start-Sleep 3
        Start-Process "http://localhost:3000"
    } | Out-Null

    # Starte den Entwicklungsserver
    npm run dev
}

function Show-ProjectStatus {
    Write-Host ""
    Write-Host "📊 Projekt-Status:" -ForegroundColor Cyan
    Write-Host "==================" -ForegroundColor Cyan
    Write-Host ""

    # Node.js Version
    try {
        $nodeVersion = node --version
        Write-Host "🟢 Node.js: $nodeVersion" -ForegroundColor Green
    } catch {
        Write-Host "❌ Node.js: Nicht installiert" -ForegroundColor Red
    }

    # npm Version
    try {
        $npmVersion = npm --version
        Write-Host "🟢 npm: $npmVersion" -ForegroundColor Green
    } catch {
        Write-Host "❌ npm: Nicht verfügbar" -ForegroundColor Red
    }

    # Dependencies
    if (Test-Path "node_modules") {
        Write-Host "🟢 Dependencies: ✅ Installiert" -ForegroundColor Green
    } else {
        Write-Host "🟢 Dependencies: ❌ Nicht installiert" -ForegroundColor Yellow
    }

    # Projekt-Dateien
    Write-Host ""
    Write-Host "📁 Projekt-Dateien:" -ForegroundColor Cyan
    $files = @(
        "package.json",
        "tsconfig.json", 
        "tailwind.config.js",
        "next.config.js",
        "src/app/page.tsx",
        "src/components/MainMenu.tsx",
        "README.md"
    )

    foreach ($file in $files) {
        if (Test-Path $file) {
            Write-Host "  ✅ $file" -ForegroundColor Green
        } else {
            Write-Host "  ❌ $file" -ForegroundColor Red
        }
    }

    # Wellness Module
    Write-Host ""
    Write-Host "🧘 Wellness Module:" -ForegroundColor Cyan
    $modules = @(
        @("Dankbarkeit", "src/app/dankbarkeit/page.tsx"),
        @("Stille & Meditation", "src/app/stille/page.tsx"),
        @("Fortschritt", "src/app/fortschritt/page.tsx"),
        @("Therapie & Heilung", "src/app/therapie/page.tsx")
    )

    foreach ($module in $modules) {
        if (Test-Path $module[1]) {
            Write-Host "  ✅ $($module[0])" -ForegroundColor Green
        } else {
            Write-Host "  ❌ $($module[0])" -ForegroundColor Red
        }
    }
    Write-Host ""
}

# Hauptmenü
do {
    Write-Host ""
    Write-Host "Bitte wähle eine Option:" -ForegroundColor White
    Write-Host ""
    Write-Host "[1] 🚀 Entwicklungsserver starten" -ForegroundColor Green
    Write-Host "[2] 📊 Projekt-Status anzeigen" -ForegroundColor Blue
    Write-Host "[3] 🌐 Browser öffnen (localhost:3000)" -ForegroundColor Cyan
    Write-Host "[4] 📦 Dependencies installieren" -ForegroundColor Yellow
    Write-Host "[5] 🔨 Projekt bauen" -ForegroundColor Magenta
    Write-Host "[6] ❌ Beenden" -ForegroundColor Red
    Write-Host ""

    $choice = Read-Host "Deine Wahl (1-6)"

    switch ($choice) {
        "1" { 
            Start-WellnessHub 
        }
        "2" { 
            Show-ProjectStatus
            Read-Host "Drücke Enter zum Fortfahren"
        }
        "3" { 
            Write-Host "🌐 Öffne Browser..." -ForegroundColor Cyan
            Start-Process "http://localhost:3000"
            Write-Host "✅ Browser geöffnet (falls Server läuft)" -ForegroundColor Green
        }
        "4" {
            if (Test-NodeJS) {
                Write-Host "📦 Installiere Dependencies..." -ForegroundColor Blue
                npm install
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "✅ Installation erfolgreich!" -ForegroundColor Green
                } else {
                    Write-Host "❌ Installation fehlgeschlagen!" -ForegroundColor Red
                }
            }
            Read-Host "Drücke Enter zum Fortfahren"
        }
        "5" {
            if (Test-NodeJS -and (Test-Dependencies)) {
                Write-Host "🔨 Baue Projekt..." -ForegroundColor Blue
                npm run build
                if ($LASTEXITCODE -eq 0) {
                    Write-Host "✅ Build erfolgreich!" -ForegroundColor Green
                } else {
                    Write-Host "❌ Build fehlgeschlagen!" -ForegroundColor Red
                }
            }
            Read-Host "Drücke Enter zum Fortfahren"
        }
        "6" { 
            Write-Host ""
            Write-Host "👋 Auf Wiedersehen!" -ForegroundColor Yellow
            Write-Host "Vielen Dank für die Nutzung des Wellness Hub Frameworks!" -ForegroundColor Green
            exit 
        }
        default { 
            Write-Host "❌ Ungültige Eingabe! Bitte wähle 1-6." -ForegroundColor Red 
        }
    }
} while ($true)
