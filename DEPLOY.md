# دليل النشر المجاني

## أولاً: قبل الرفع
1. في `index.html` ابحث عن `emergencyWhatsApp: ''` وضع رقم واتساب الطوارئ الحقيقي بصيغة `964XXXXXXXXXX` (بدون + وبدون صفر).
2. لا تضع أي كلمات مرور أو مفاتيح داخل الملفات.

## ثانياً: رفع المستودع على GitHub (خاص)
1. من github.com اختر **New** لإنشاء مستودع، واكتب اسماً مثل `autosphere-global`.
2. اختر **Private**، ولا تضف README أو .gitignore أو License من الخيارات.
3. اختر **uploading an existing file** واسحب محتويات المجلد كاملة (وليس ملف zip).
4. اكتب رسالة `Initial commit v14` واضغط **Commit changes**.

## ثالثاً: النشر على Cloudflare Pages (مجاني)
1. أنشئ حساباً على cloudflare.com.
2. من **Workers & Pages** اختر **Create** ثم **Pages** ثم **Connect to Git**.
3. اربط GitHub واختر **Only select repositories** ثم المستودع فقط.
4. الإعدادات:
   - Framework preset: **None**
   - Build command: فارغ
   - Build output directory: `/` أو فارغ
5. اضغط **Save and Deploy**، ثم افتح الرابط الذي يظهر (مثل `autosphere-global.pages.dev`).

## رابعاً: بعد النشر
1. استبدل `USERNAME` في `sitemap.xml` و`robots.txt` بالنطاق الحقيقي، ثم احذف التعليقات، وارفع التعديل.
2. اختبر من جوالك: الصفحة، والخريطة، وإرسال طلب النجدة، وتثبيت الصفحة على الشاشة الرئيسية.

## خامساً: التحديث
أي تعديل على الملفات في GitHub يُنشر تلقائياً خلال دقائق.
