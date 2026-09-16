# RT LAB - معامل رامي مختار

تطبيق حجز التحاليل وإدارة المعمل (PWA)

## الملفات

- `index.html` → التطبيق الكامل
- `sw.js` → Service Worker (أوفلاين + تحديث)
- `manifest.webmanifest` → إعدادات التثبيت
- `icon-192.png` / `icon-512.png` → الأيقونات

## الرفع على GitHub Pages

1. Repository جديد (مثلاً `rt-lab`)
2. ارفع **كل** الملفات في جذر الريبو
3. Settings → Pages → Deploy from branch → `main` / root
4. اللينك: `https://YOUR_USERNAME.github.io/rt-lab/`

## التثبيت كتطبيق

### أندرويد (Chrome)
1. افتح اللينك
2. القائمة ⋮ → **تثبيت التطبيق** أو **Add to Home screen**
3. أو من بانر «تثبيت» داخل البرنامج

### آيفون (Safari فقط)
1. افتح من **Safari**
2. زر المشاركة → **إضافة إلى الشاشة الرئيسية**

### لابتوب (Windows/Mac) — Chrome أو Edge
1. افتح الموقع على **https**
2. أيقونة التثبيت في شريط العنوان أو القائمة → **Install RT LAB**
3. يظهر كتطبيق مستقل في قائمة البرامج

> لو خيار التثبيت مش ظاهر: تأكد أن الملفات على GitHub Pages (HTTPS) وأن `sw.js` و `manifest.webmanifest` موجودين. اعمل Ctrl+F5.

## بعد التحديث
ارفع الملفات الجديدة + Hard Refresh أو امسح Cache للموقع مرة واحدة.
