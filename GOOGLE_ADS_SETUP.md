# Google Ads Setup Instructions

## Как настроить Google Ads отслеживание:

### 1. Получите ваш Google Ads ID:
- Зайдите в Google Ads аккаунт
- Найдите ваш Conversion ID (формат: AW-XXXXXXXXXX)
- Найдите ваш Conversion Label (формат: YYYYYYYYY)

### 2. Замените в файлах:

**В файле `app/layout.tsx` (строки 11 и 17):**
```typescript
// Замените AW-XXXXXXXXXX на ваш реальный ID
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"></script>
gtag('config', 'AW-XXXXXXXXXX');
```

**В файле `app/page.tsx` (строка 105):**
```typescript
// Замените AW-XXXXXXXXXX/YYYYYYYYY на ваш Conversion ID/Label
'send_to': 'AW-XXXXXXXXXX/YYYYYYYYY',
```

### 3. Что отслеживается:
- ✅ Посещения страницы
- ✅ Клики по кнопке "Watch Now"
- ✅ Конверсии с каждого сериала

### 4. Как проверить:
1. Откройте сайт в браузере
2. Нажмите F12 (DevTools)
3. Во вкладке Network найдите запросы к google-analytics.com
4. При клике на "Watch Now" должен отправиться event 'conversion'

### 5. Дополнительные события (опционально):
Можете добавить отслеживание:
- Свайпов между сериалами
- Переключения языка
- Раскрытия описания "Read more"
