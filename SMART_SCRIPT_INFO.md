# Smart Script для Web-to-App (Google Ads → Сайт → OneLink)

## Как это работает

### 1. Google Ads → Сайт
Пользователь кликает по объявлению в Google Ads и переходит на сайт с UTM параметрами:

```
https://yango-play-promo.vercel.app/?utm_source=google_ads&utm_medium=cpc&utm_campaign={campaignid}_Gmobile_MSCAMP-780_[PL-P]_{WS:S}_EG-1056_goal-PL_Acquisition//GGL_music_general_eng-arb_26.12&utm_content={creative}&utm_term=cid_{campaignid}|gid_{adgroupid}|adid_{creative}|tid_{targetid}|kw_{keyword}|mtype_{matchtype}|d_{device}|{random}
```

### 2. Smart Script парсит параметры
JavaScript код на сайте:
- ✅ Читает UTM параметры из URL
- ✅ Парсит `utm_term` по разделителю `|`
- ✅ Извлекает:
  - `cid` - Campaign ID
  - `gid` - AdGroup ID
  - `adid` - Creative ID
  - `tid` - Target ID
  - `kw` - Keyword
  - `mtype` - Match Type
  - `d` - Device

### 3. Формирует динамический OneLink
Маппинг параметров в OneLink:

| Параметр UTM/Term | OneLink параметр | Описание |
|-------------------|------------------|----------|
| utm_source | pid | Source (google_ads) |
| utm_campaign | c | Campaign name |
| gid | af_adset | AdGroup ID |
| adid | af_ad | Creative ID |
| kw | af_keyword | Keyword |
| tid | af_sub1 | Target ID |
| mtype | af_sub2 | Match Type |
| d | af_sub3 | Device |
| utm_medium | af_sub4 | Medium (cpc) |
| utm_content | af_sub5 | Content |
| gclid | gclid | Google Click ID |
| gbraid | gbraid | Google Brand Click ID |
| wbraid | wbraid | Wbraid |

### 4. Статические параметры
Всегда добавляются:
```
af_siteid=google_w2a
af_channel=google_w2a
is_retargeting=true
af_inactivity_window=7d
af_reengagement_window=7d
af_click_lookback=7d
```

## Пример работы

### Входной URL:
```
https://yango-play-promo.vercel.app/?utm_source=google_ads&utm_medium=cpc&utm_campaign=12345_Gmobile_MSCAMP-780&utm_content=67890&utm_term=cid_12345|gid_54321|adid_67890|tid_98765|kw_yango+play|mtype_exact|d_mobile
```

### Итоговый OneLink (генерируется динамически):
```
https://yangoplay.onelink.me/ZSw2/eslls7kl?pid=google_ads&c=12345_Gmobile_MSCAMP-780&af_adset=54321&af_ad=67890&af_keyword=yango+play&af_sub1=98765&af_sub2=exact&af_sub3=mobile&af_sub4=cpc&af_sub5=67890&af_siteid=google_w2a&af_channel=google_w2a&is_retargeting=true&af_inactivity_window=7d&af_reengagement_window=7d&af_click_lookback=7d
```

## Результат в AppsFlyer

В дашборде AppsFlyer вы увидите:
- ✅ **Campaign**: 12345_Gmobile_MSCAMP-780
- ✅ **AdSet**: 54321
- ✅ **Ad**: 67890
- ✅ **Keyword**: yango+play
- ✅ **Match Type**: exact (в af_sub2)
- ✅ **Device**: mobile (в af_sub3)

Это позволяет анализировать эффективность:
- По кампаниям
- По группам объявлений
- По креативам
- По ключевым словам
- По типу соответствия
- По устройствам

## Тестирование

### Откройте в браузере:
```
https://yango-play-promo.vercel.app/?utm_source=google_ads&utm_medium=cpc&utm_campaign=TEST_CAMPAIGN&utm_term=cid_123|gid_456|adid_789|kw_test
```

### Откройте консоль (F12) и увидите:
```
🎯 Smart Script - Parsed UTM: {
  source: "google_ads",
  campaign: "TEST_CAMPAIGN",
  campaignId: "123",
  adgroupId: "456",
  creativeId: "789",
  keyword: "test"
}
🔗 OneLink Generated: https://yangoplay.onelink.me/ZSw2/eslls7kl?pid=google_ads&c=TEST_CAMPAIGN&af_adset=456&af_ad=789&af_keyword=test&...
```

## Поддержка
Если OneLink не формируется или параметры не передаются:
1. Проверьте консоль браузера (F12)
2. Убедитесь, что UTM параметры в URL
3. Проверьте формат `utm_term` (должен быть с разделителем `|`)
