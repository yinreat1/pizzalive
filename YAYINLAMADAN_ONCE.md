# PizzaLive yayın kontrolü

## Zorunlu Firebase ayarları

1. Firebase Console'da **Authentication → Sign-in method** bölümünden **Email/Password** girişini etkinleştirin.
2. **Authentication → Users** bölümünde `pizzalive@gmail.com` için güçlü ve benzersiz bir hesap oluşturun.
3. **Firestore Database → Rules** bölümüne bu projenin `firestore.rules` içeriğini yapıştırıp **Publish** seçeneğiyle yayınlayın.

Bu ayarlar tamamlanmadan `/#admin` yönetici paneline giriş yapılamaz veya değişiklikler kaydedilemez. Ziyaretçiler yine menüyü görüntüleyebilir.

## Vercel yayını

1. Projeyi GitHub'a yükleyin veya Vercel'de **Add New → Project** ile bu klasörü içe aktarın.
2. Framework olarak **Vite** seçin; build komutu `npm run build`, çıktı klasörü `dist` olmalıdır.
3. Yayın sonrası ana sayfayı, mobil görünümü, telefon aramasını ve WhatsApp teklif mesajını test edin.

## Son içerik kontrolü

- İşletme telefonu, adresi, çalışma saatleri ve Instagram bağlantısını doğrulayın.
- Kendi pizza ve mekân fotoğraflarınızı yönetici panelindeki görsel URL alanlarından ekleyin. Mevcut görseller temsili stok görsellerdir.
- Özel alan adı kullanırsanız `index.html` içindeki `canonical` ve Open Graph URL alanlarını, ayrıca `public/robots.txt` ve `public/sitemap.xml` içindeki adresleri yeni alan adınızla değiştirin.

## Fiyat akışı

Sitede fiyat gösterilmez. Müşteri ürünleri **Teklif Listesi**ne ekler; listesi ve teslimat bilgileri WhatsApp üzerinden işletmeye iletilir. İşletme güncel toplam tutarı ve teslimat süresini WhatsApp'tan onaylar.
