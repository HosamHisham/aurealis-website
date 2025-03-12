$envContent = @"
NEXT_PUBLIC_SUPABASE_URL=https://hakkmrebvpjwktquflfj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhha2ttcmVidnBqd2t0cXVmbGZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3OTQxNDIsImV4cCI6MjA1NzM3MDE0Mn0.iTXsY6uBCDptCQjcnI0w7u3FxFDMifO8hcxF5fcGh4w
NEXT_PUBLIC_SITE_URL=http://localhost:3000
"@

$envPath = Join-Path $PSScriptRoot "../.env.local"
Set-Content -Path $envPath -Value $envContent -Force

Write-Host "Environment variables have been set up successfully!"
Write-Host "Created .env.local with Supabase configuration"
