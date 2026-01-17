'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function YangoContent() {
  const searchParams = useSearchParams()
  const [oneLinkUrl, setOneLinkUrl] = useState('https://play.yango.com')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lang, setLang] = useState<'en' | 'ar'>('en')

  useEffect(() => {
    const utmSource = searchParams.get('utm_source') || ''
    const utmMedium = searchParams.get('utm_medium') || ''
    const utmCampaign = searchParams.get('utm_campaign') || ''
    const utmTerm = searchParams.get('utm_term') || ''
    const utmContent = searchParams.get('utm_content') || ''
    const gclid = searchParams.get('gclid') || ''

    if (utmSource || utmCampaign || gclid) {
      const oneLinkBase = 'https://yango.onelink.me/XXXXX'
      const params = new URLSearchParams()
      
      if (utmSource) params.append('pid', utmSource)
      if (utmCampaign) params.append('c', utmCampaign)
      if (utmTerm) params.append('af_keywords', utmTerm)
      if (utmContent) params.append('af_adset', utmContent)
      if (gclid) params.append('af_ad', gclid)
      if (utmMedium) params.append('af_channel', utmMedium)
      
      const finalUrl = `${oneLinkBase}?${params.toString()}`
      setOneLinkUrl(finalUrl)
      
      console.log('📊 UTM captured:', { utmSource, utmCampaign, gclid })
      console.log('🔗 AppsFlyer:', finalUrl)
    }
  }, [searchParams])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % series.length)
    }, 3500)
    return () => clearInterval(interval)
  }, [])

  const series = [
    {
      title: 'Roses and Chocolate',
      titleAr: 'ورود وشوكولاته',
      subtitle: 'Inspired by true events, Marwa, a high-profile TV host, crosses paths with a powerful lawyer live on air. A single spark pulls her into a world where personal feelings collide with public pressure.',
      subtitleAr: 'مستوحى من أحداث حقيقية - "مروة"، إعلامية شهيرة وجريئة تُقدّم برنامجاً على إحدى القنوات الفضائية المعروفة، وتُعرف بأسلوبها الصادم وصوتها العالي في كشف القضايا الجريئة.',
      image: 'http://avatars.mds.yandex.net/get-ott/1534341/2a0000019aa6eabc78a058b306150187c102/orig',
      bgGradient: 'from-[#0a1633] via-[#2d1845] to-[#1a0a2e]', // Purple-pink theme
      glowColor: 'bg-pink-600/25',
    },
    {
      title: '2 Coffee',
      titleAr: '2 قهوة',
      subtitle: 'Yahya El-Wakeel, a well-known writer and media figure in his mid-thirties, comes from a wealthy Upper Egyptian family with a blend of modern thought and deep-rooted Egyptian values.',
      subtitleAr: 'يحيى الوكيل كاتب و إعلامي مشهور في منتصف الثلاثينات من جذور صعيدية وأسرة تعد من الأثرياء بالمدينة.. امتزجت أفكاره ما بين التحضر و التمسك بالقيم والتقاليد المصرية.',
      image: 'http://avatars.mds.yandex.net/get-ott/1672343/2a0000019acae6671dc5dd251570b450214f/orig',
      bgGradient: 'from-[#0a1020] via-[#1a2845] to-[#0f1a2e]', // Blue theme
      glowColor: 'bg-blue-600/25',
    },
    {
      title: 'Ex-Merati',
      titleAr: 'طليقتي',
      subtitle: 'Taha, a dangerous ex-convict, is set free from prison halfway through his sentence. Upon his release, Taha discovers that his wife had left him and married another man.',
      subtitleAr: '«طه» مسجون شديد الخطورة، على وشك الخروج من السجن بعد نصف المدة، ولكن تحت إشراف طبيبه النفسي «يوسف» للتأكد من حسن سيره وسلوكه.',
      image: 'http://avatars.mds.yandex.net/get-ott/223007/2a0000019aee96578f0b14aeff1c98db1104/orig',
      bgGradient: 'from-[#1a0a0a] via-[#2d1a1a] to-[#1a0f0f]', // Dark red theme
      glowColor: 'bg-red-600/25',
    },
    {
      title: 'Al Sada Al Afadel',
      titleAr: 'السادة الأفاضل',
      subtitle: 'After their father Galal dies, the Abu El Fadl family\'s quiet life collapses. Eldest son Tarek struggles with debts and strange artifacts.',
      subtitleAr: 'بعد وفاة الأب جلال، تنهار حياة عائلة أبو الفضل، فيتحمل طارق المسؤولية وحده ويعود حجازي من القاهرة ليجد عائلته أكبر أزماته.',
      image: 'http://avatars.mds.yandex.net/get-ott/13051577/2a0000019b4b0ec3ea57b2cc625f55435a0b/orig',
      bgGradient: 'from-[#0f1a0a] via-[#1a2d1a] to-[#0a1a0f]', // Green theme
      glowColor: 'bg-green-600/25',
    },
  ]

  const handleDownload = () => {
    window.location.href = oneLinkUrl
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${series[currentSlide].bgGradient} text-white relative overflow-hidden transition-colors duration-700`}>
      <div className={`absolute top-0 left-1/4 w-96 h-96 ${series[currentSlide].glowColor} rounded-full blur-3xl transition-colors duration-700`}></div>
      <div className={`absolute bottom-0 right-1/4 w-96 h-96 ${series[currentSlide].glowColor} rounded-full blur-3xl transition-colors duration-700`}></div>
      
      <header className="relative z-10 py-4 px-4 md:py-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h1 className="text-xl md:text-3xl font-black tracking-tight" style={{ fontFamily: 'Arial Black, Impact, sans-serif' }}>
              YANGO PLAY
            </h1>
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full p-1">
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${
                    lang === 'en' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLang('ar')}
                  className={`px-3 py-1 text-sm font-medium rounded-full transition-all ${
                    lang === 'ar' ? 'bg-white text-black' : 'text-white/70 hover:text-white'
                  }`}
                >
                  AR
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-4 md:px-12 py-4 md:py-8">
        <div className="max-w-6xl mx-auto">
          
          <div className={`mb-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <h2 className="text-xl md:text-3xl font-black mb-2" style={{ fontFamily: 'Arial Black, Impact, sans-serif' }}>
              {lang === 'en' ? 'FREE 60 DAYS' : '60 يومًا مجانًا'}
            </h2>
            <p className="text-white/70 text-xs md:text-sm">
              {lang === 'en' 
                ? 'Get unlimited access to the best series'
                : 'احصل على وصول غير محدود لأفضل المسلسلات'}
            </p>
          </div>

          {/* Phone Mockup with Series */}
          <div className="relative max-w-xs mx-auto mb-4">
            <div className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-black shadow-2xl shadow-purple-500/30">
              {/* Series Card - Vertical Poster Style */}
              <div className="relative h-full w-full">
                <img 
                  src={series[currentSlide].image}
                  alt={lang === 'en' ? series[currentSlide].title : series[currentSlide].titleAr}
                  className="w-full h-full object-cover"
                  loading="eager"
                  crossOrigin="anonymous"
                />
                
                {/* Top Overlay with YANGO PLAY text */}
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent pt-6 pb-12 px-4">
                  <div className="text-center">
                    <h3 className="text-xl font-black mb-1" style={{ fontFamily: 'Arial Black, Impact, sans-serif' }}>
                      YANGO PLAY
                    </h3>
                    <p className="text-sm opacity-90">
                      {lang === 'en' ? '60 days for Free' : '60 يومًا مجانًا'}
                    </p>
                  </div>
                </div>
                
                {/* Bottom Overlay with Title & Description */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 pb-6">
                  <h4 className={`text-xl font-bold mb-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {lang === 'en' ? series[currentSlide].title : series[currentSlide].titleAr}
                  </h4>
                  <p className={`text-xs opacity-80 line-clamp-3 mb-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {lang === 'en' ? series[currentSlide].subtitle : series[currentSlide].subtitleAr}
                  </p>
                  
                  {/* Dots */}
                  <div className="flex items-center justify-center gap-1.5">
                    {series.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-1.5 rounded-full transition-all ${
                          index === currentSlide 
                            ? 'bg-purple-500 w-6' 
                            : 'bg-white/40 w-1.5'
                        }`}
                        aria-label={`Slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Glow Effect */}
            <div className="absolute -inset-2 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-600/20 rounded-[3rem] blur-xl -z-10"></div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full max-w-xs mx-auto block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-base md:text-lg font-bold py-3.5 rounded-full transition-all duration-300 shadow-xl shadow-purple-500/40 hover:shadow-purple-500/60 hover:scale-[1.02] active:scale-95 mb-6"
          >
            {lang === 'en' ? 'Download App' : 'تحميل التطبيق'}
          </button>

          {/* Horizontal Gallery */}
          <div className="mt-6">
            <h3 className={`text-lg md:text-xl font-bold mb-3 px-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {lang === 'en' ? 'More Series' : 'المزيد من المسلسلات'}
            </h3>
            
            <div className="flex gap-3 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
              {series.map((show, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`flex-shrink-0 w-28 md:w-36 snap-start rounded-xl overflow-hidden transition-all duration-300 ${
                    currentSlide === index 
                      ? 'ring-3 ring-purple-500 scale-105' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <div className="relative aspect-[2/3]">
                    <img 
                      src={show.image}
                      alt={lang === 'en' ? show.title : show.titleAr}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className={`absolute bottom-0 left-0 right-0 p-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                      <p className="font-bold text-xs leading-tight line-clamp-2">
                        {lang === 'en' ? show.title : show.titleAr}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>
      </main>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}

export default function YangoLanding() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#0a1633] via-[#1a2855] to-[#0a1633] flex items-center justify-center">
        <div className="text-white text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    }>
      <YangoContent />
    </Suspense>
  )
}
