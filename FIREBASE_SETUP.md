# PizzaLive güvenli yönetici kurulumu

Bu sürümde yönetici paneli `/#admin` adresinden açılır ve Firebase Authentication ile korunur. Kod içinde şifre bulunmaz.

## Yayına almadan önce

1. Firebase Console'da `turing-bebop-bzp2g` projesini açın.
2. **Authentication → Sign-in method** ekranından **Email/Password** giriş yöntemini etkinleştirin.
3. **Authentication → Users** ekranında `pizzalive@gmail.com` için güçlü ve benzersiz bir kullanıcı oluşturun.
4. **Firestore Database → Rules** ekranında bu projenin `firestore.rules` dosyasındaki kuralları yayınlayın.
5. Siteyi yeniden yayınlayın ve `https://alanadiniz.com/#admin` adresinden giriş yapmayı deneyin.

## Farklı bir yönetici e-postası kullanmak isterseniz

`firestore.rules` içindeki `pizzalive@gmail.com` değerini yeni e-postayla değiştirin; ardından Firebase Console'dan bu e-posta için bir kullanıcı oluşturup kuralları yeniden yayınlayın.

## Neden gerekli?

Eski kural, herkese veritabanında değişiklik yapma izni veriyordu. Yeni kuralda ziyaretçiler menüyü görüntüleyebilir; yalnızca doğrulanmış yönetici hesabı içerik ve görselleri değiştirebilir.
