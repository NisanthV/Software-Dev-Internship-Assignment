# Running React Native Expo App on Android Emulator or Physical Device

This guide covers the prerequisites and step-by-step instructions to run a React Native app built with Expo on an Android emulator or a physical device **without a USB connection**.

---

## Prerequisites

- **Node.js** installed (LTS version preferred)
- **npm** (comes with Node.js) or **Yarn** as package manager
- **React Native CLI** (optional if using Expo CLI)
- **Expo CLI** installed globally or via npx:
  ```bash
  npm install -g expo-cli
  ```
- **Android Studio** with Android SDK and emulator installed
- **Android Emulator** set up and running via Android Studio
- For physical Android devices: **USB Debugging enabled** under Developer Options

---

## Steps to Run

### 1. Start your local backend server on port 8000 (or your preferred port)

Make sure your backend API server is running and accessible.

### 2. Forward localhost port 8000 to device/emulator using `adb reverse`

This allows the mobile device or emulator to access your computer’s local API:

```bash
adb reverse tcp:8000 tcp:8000
```

> **Note:** Run this command whenever you start or restart your backend server.

### 3. Start Expo development server with clear cache and tunnel mode

Use this command to start Expo with cleared cache and tunnel mode enabled (helps with network connection if device and PC aren’t on the same network):

```bash
npx expo start --clear --tunnel
```

### 4. Launch your app on the Android Emulator or physical device

#### If using Android Emulator:

- Expo Developer Tools will show an option/button to run on your connected Android emulator.
- Click the **"Run on Android device/emulator"** button.

#### If using a physical Android device:

- Open the **Expo Go** app on your device.
- Scan the QR code shown in Expo Developer Tools (or in your terminal) to open your app.

---

## Notes

- **USB debugging** enabled on physical devices is necessary only for `adb` commands when using USB for port forwarding.
- If **not using USB**, device and PC should be on the same Wi-Fi network for LAN or Tunnel mode to work.
- **Tunnel mode** uses an external proxy and may be slower but works across different networks.

---

## Summary of Key Commands

```bash
# Forward port 8000 to device/emulator
adb reverse tcp:8000 tcp:8000

# Start Expo with clean cache and tunnel
npx expo start --clear --tunnel
```

---

Following this setup ensures your React Native Expo app works seamlessly on Android emulator or physical device with backend API access over your local development server.
