# Məhsul Axtarış Tətbiqi (React + DummyJSON API)

Açıq REST API-yə (DummyJSON) qoşulan, debounce ilə axtarış, ayrı-ayrı loading/error/empty state-ləri və infinite scroll pagination olan React tətbiqi.

## Xüsusiyyətlər

- 🔍 **Axtarış** — Navbar-dan debounce (400ms) ilə real-time məhsul axtarışı, dropdown nəticələri
- ♾️ **Infinite scroll** — `IntersectionObserver` ilə aşağı sürüşdükcə avtomatik yeni məhsulların yüklənməsi
- ⏳ **Loading state** — ayrıca `Spinner` komponenti (fullPage və inline variantları)
- ⚠️ **Qlobal error handling** — bütün API xətaları avtomatik toast bildirişi ilə göstərilir (hər komponentdə təkrar try/catch yoxdur)
- 📭 **Empty state** — nəticə tapılmadıqda aydın mesaj
- 🧩 **Custom hook-lar** — `useFetch` və `useInfiniteFetch` ilə təmiz, təkrarsız kod strukturu
- 🖼️ **Məhsul detalları** — dinamik route (`/product-details/:id`), şəkil qalereyası

## İstifadə olunan texnologiyalar

- **React** (Vite)
- **React Router DOM** — routing
- **Axios** — API sorğuları
- **Tailwind CSS** — stilizasiya
- **DummyJSON API** — https://dummyjson.com

## Layihə strukturu

```
src/
├── components/
│   ├── Navbar.jsx           # Axtarış inputu + debounce + dropdown nəticələr
│   ├── Card.jsx              # Məhsul kartı
│   ├── Spinner.jsx           # Loading göstəricisi (size variantları ilə)
│   ├── GlobalErrorToast.jsx  # Qlobal xəta bildirişi
│   └── Navigator.jsx         # Route-ların idarəsi
├── pages/
│   ├── Products.jsx          # Əsas siyahı + infinite scroll
│   └── ProductDetails.jsx    # Məhsul detalı
├── hooks/
│   ├── useFetch.js           # Tək obyekt üçün fetch hook
│   └── useInfiniteFetch.js   # Pagination/infinite scroll hook
├── utils/
│   ├── axios.js               # Axios instance + error interceptor
│   └── errorBus.js            # Qlobal error event sistemi
└── App.jsx
```

## Quraşdırma və işə salma

```bash
# Repozitoriyanı klonla
git clone https://github.com/username/repository.git
cd repository

# Asılılıqları quraşdır
npm install

# Dev server-i işə sal
npm run dev
```

Tətbiq default olaraq `http://localhost:5173` ünvanında açılacaq.

### Environment dəyişənləri (istəyə bağlı)

```
VITE_API_URL=https://dummyjson.com
```

## Əsas texniki qərarlar

- **Debounce**: `setTimeout` + `useEffect` cleanup ilə hər hərfdə API çağırışının qarşısı alınıb.
- **Race condition**: `useFetch`/`useInfiniteFetch` daxilində `ignore` flag-i istifadə olunub — köhnə sorğu cavabı gecikəndə yeni nəticəni əvəz etmir.
- **Infinite scroll**: `AbortController` əvəzinə `IntersectionObserver` ilə sentinel div yanaşması seçilib; `hasMore=false` olduqda sentinel DOM-dan silinir və müşahidə dayanır.
- **Qlobal error handling**: Axios response interceptor bütün xətaları `errorBus`-a ötürür, `GlobalErrorToast` isə istənilən komponentdən müstəqil şəkildə bildirişi göstərir.
