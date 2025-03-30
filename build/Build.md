# Step

The instructions below are the fastest and most reliable method. Run the following sets of commands with PowerShell (running as Administrator).

```
Set-ExecutionPolicy Unrestricted -Force
iex ((New-Object System.Net.WebClient).DownloadString('https://boxstarter.org/bootstrapper.ps1'))
get-boxstarter -Force
Install-BoxstarterPackage https://raw.githubusercontent.com/nodejs/node/master/tools/bootstrap/windows_boxstarter -DisableReboots
```

1. 

Cài đặt Visual Studio Build Tools: Tải về và cài đặt Visual Studio Build Tools

https://visualstudio.microsoft.com/visual-cpp-build-tools/

```
npm install -g npm
```

```
Trong quá trình cài đặt, bạn cần chọn C++ build tools và các tùy chọn liên quan như:
- MSVC v142 - VS 2019 C++ x64/x86 build tools (hoặc các phiên bản mới hơn).
- Windows 10 SDK (hoặc SDK cho phiên bản Windows bạn đang sử dụng).
```

```
npm install -g node-gyp
```
