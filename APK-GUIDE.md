# 📘 راهنمای ساخت APK — تجربه «همراه معنوی»

## ✅ نسخه‌های پایدار (حتماً اینا باشه)
- Vite 5.4.11
- React 18.3.1
- Capacitor 6.2.0
- vite-plugin-pwa 0.20.5

## 📁 فایل‌های مهم

### ۱. capacitor.config.json (نه TypeScript!)
```json
{
  "appId": "com.yourcompany.appname",
  "appName": "نام اپ",
  "webDir": "docs",
  "android": { "allowMixedContent": true },
  "server": { "androidScheme": "https" }
}
