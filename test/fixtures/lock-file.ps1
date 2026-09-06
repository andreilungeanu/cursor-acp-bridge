param([string]$Path)

$ErrorActionPreference = 'Stop'
$fileLock = [IO.File]::Open($Path, [IO.FileMode]::Open, [IO.FileAccess]::ReadWrite, [IO.FileShare]::None)
try {
    [Console]::WriteLine('locked')
    [Console]::ReadLine() | Out-Null
} finally {
    $fileLock.Dispose()
}
