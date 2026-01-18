'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'

function YangoContent() {
  const searchParams = useSearchParams()
  const [oneLinkUrl, setOneLinkUrl] = useState('https://play.yango.com')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [expanded, setExpanded] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

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
      if (!expanded) {
        setCurrentSlide((prev) => (prev + 1) % series.length)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [expanded])

  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % series.length)
    setExpanded(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + series.length) % series.length)
    setExpanded(false)
  }

  const series = [
    {
      title: 'Roses and Chocolate',
      titleAr: 'ورود وشوكولاته',
      shortDesc: 'A TV host falls for a powerful lawyer, sparking a dangerous romance between love and power.',
      shortDescAr: 'إعلامية شهيرة تقع في حب محامٍ نافذ، في قصة حب خطيرة بين المشاعر والسلطة.',
      fullDesc: 'Inspired by true events, Marwa, a high-profile TV host, crosses paths with a powerful lawyer live on air. A single spark pulls her into a world where personal feelings collide with public pressure. As the spotlight intensifies and power games escalate, she must decide how far she will go - and whom she can trust - without losing her voice.',
      fullDescAr: 'مستوحى من أحداث حقيقية - "مروة"، إعلامية شهيرة وجريئة تُقدّم برنامجاً على إحدى القنوات الفضائية المعروفة، وتُعرف بأسلوبها الصادم وصوتها العالي في كشف القضايا الجريئة. تلتقي خلال إحدى حلقاتها بمحامٍ نافذ يُدعى "صلاح"، ويتسبب لقاؤهما في تغيير حياتها جذرياً، إذ تقع في حبه رغم ماضيه الغامض، ما يضعها في صراع بين قلبها ومهنتها.',
      image: '/posters/roses-chocolate.jpg',
    },
    {
      title: '2 Coffee',
      titleAr: '2 قهوة',
      shortDesc: 'A modern writer falls for an aristocratic café owner, but their worlds clash in unexpected ways.',
      shortDescAr: 'كاتب عصري يقع في حب صاحبة مقهى أرستقراطية، لكن عوالمهما تصطدم بطرق غير متوقعة.',
      fullDesc: 'Yahya El-Wakeel, a well-known writer and media figure in his mid-thirties, comes from a wealthy Upper Egyptian family with a blend of modern thought and deep-rooted Egyptian values and traditions. He falls in love with Nelly Naseem, an aristocratic woman who owns a classy café in Zamalek. Over time, fundamental differences in their worldviews begin to surface. In addition, his ex-wife unexpectedly returns, determined to win back both her husband and their daughter.',
      fullDescAr: 'يحيى الوكيل كاتب و إعلامي مشهور في منتصف الثلاثينات من جذور صعيدية وأسرة تعد من الأثرياء بالمدينة.. امتزجت أفكاره ما بين التحضر و التمسك بالقيم والتقاليد المصرية. يقع في حب فتاة أرستقراطية تدعى نيللي نسيم تمتلك كافيه راقي بمنطقة الزمالك و وتبادله نفس المشاعر، ولكن يكتشفان أختلاف في أفكارهم مع مرور الوقت، ويزداد الأمر صعوبة بعد أن تعود طليقة يحيي وهي راغبة في العودة إلى زوجها و ابنتها.',
      image: '/posters/2-coffee.jpg',
    },
    {
      title: 'Ex-Merati',
      titleAr: 'طليقتي',
      shortDesc: 'A dangerous ex-convict seeks revenge on his ex-wife, only to discover her new husband is his psychiatrist.',
      shortDescAr: 'سجين خطير يسعى للانتقام من طليقته، ليكتشف أن زوجها الجديد هو طبيبه النفسي.',
      fullDesc: 'Taha, a dangerous ex-convict, is set free from prison halfway through his sentence, under the watchful eye of his psychiatrist, Dr. Youssef. Upon his release, Taha discovers that his wife had left him upon his conviction and married another man. Enraged, Taha seeks revenge on his ex-wife Sahar, whom he still loves, as well as her husband. Little does he know that her husband is none other than… Dr. Youssef himself!',
      fullDescAr: '«طه» مسجون شديد الخطورة، على وشك الخروج من السجن بعد نصف المدة، ولكن تحت إشراف طبيبه النفسي «يوسف» للتأكد من حسن سيره وسلوكه. فور خروجه يتوعد بالانتقام من طليقته «سحر» وزوجها الحالي. طه ما زال يحبها، ولكنه لا يعلم أن زوجها ما هو إلا… الدكتور يوسف.',
      image: '/posters/ex-merati.jpg',
    },
    {
      title: 'Al Sada Al Afadel',
      titleAr: 'السادة الأفاضل',
      shortDesc: 'After their father dies, a family faces mysterious debts and a stranger demanding a fortune.',
      shortDescAr: 'بعد وفاة الأب، تواجه العائلة ديوناً غامضة وغريب يطالب بثروة ضخمة.',
      fullDesc: 'After their father Galal dies, the Abu El Fadl family faces collapse. Eldest son Tarek struggles with debts and strange artifacts, while Hegazy returns from Cairo, only to find his troubled family harder to handle than his patients — especially after the mysterious Samir Italia appears, demanding a large sum of money.',
      fullDescAr: 'بعد وفاة الأب جلال، تنهار حياة عائلة أبو الفضل، فيتحمل طارق المسؤولية وحده ويعود حجازي من القاهرة ليجد عائلته أكبر أزماته. يزيد الغموض مع ظهور سمير إيطاليا المطالب بمال ضخم، لتتحول ديون الأب والتحف المشبوهة إلى سلسلة متاعب لا تنتهي.',
      image: '/posters/al-sada.jpg',
    },
  ]

  const handleDownload = () => {
    window.location.href = oneLinkUrl
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-fuchsia-950 to-indigo-950 text-white relative overflow-hidden">
      
      <header className="relative z-10 py-3 px-4 md:py-5">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-black tracking-tight" style={{ fontFamily: 'Arial Black, Impact, sans-serif' }}>
              YANGO PLAY
            </h1>
            
            <div className="flex items-center gap-2 bg-white/10 rounded-full p-0.5">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all ${
                  lang === 'en' ? 'bg-white text-black' : 'text-white/70'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ar')}
                className={`px-2.5 py-1 text-xs font-medium rounded-full transition-all ${
                  lang === 'ar' ? 'bg-white text-black' : 'text-white/70'
                }`}
              >
                AR
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-4">
        <div className="max-w-md mx-auto">
          
          {/* Series Title */}
          <div className={`mb-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <h2 className="text-2xl md:text-3xl font-black leading-tight" style={{ fontFamily: 'Arial Black, Impact, sans-serif' }}>
              {lang === 'en' ? series[currentSlide].title : series[currentSlide].titleAr}
            </h2>
          </div>

          {/* Phone Mockup with Series */}
          <div className="relative max-w-[300px] mx-auto mb-3">
            
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group"
              aria-label="Previous"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-20 w-10 h-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group"
              aria-label="Next"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div 
              className="relative aspect-[9/19.5] rounded-[2.5rem] overflow-hidden bg-black shadow-2xl shadow-purple-500/30"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Series Card - Vertical Poster Style */}
              <div className="relative h-full w-full">
                <Image 
                  src={series[currentSlide].image}
                  alt={lang === 'en' ? series[currentSlide].title : series[currentSlide].titleAr}
                  fill
                  priority
                  quality={75}
                  sizes="300px"
                  className="object-cover"
                />
                
                {/* Progress Bar */}
                <div className="absolute top-2 left-2 right-2 z-10 flex gap-1">
                  {series.map((_, index) => (
                    <div key={index} className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-white transition-all duration-300 ${index === currentSlide ? 'w-full' : 'w-0'}`}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Bottom Overlay with Description */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4 pb-5">
                  <h4 className={`text-lg font-bold mb-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {lang === 'en' ? series[currentSlide].title : series[currentSlide].titleAr}
                  </h4>
                  
                  <p className={`text-xs opacity-90 mb-2 leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'} ${expanded ? '' : 'line-clamp-2'}`}>
                    {lang === 'en' 
                      ? (expanded ? series[currentSlide].fullDesc : series[currentSlide].shortDesc)
                      : (expanded ? series[currentSlide].fullDescAr : series[currentSlide].shortDescAr)
                    }
                  </p>
                  
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className={`text-xs font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity ${lang === 'ar' ? 'float-right' : 'float-left'}`}
                  >
                    {expanded 
                      ? (lang === 'en' ? '← Show less' : 'أقل ←')
                      : (lang === 'en' ? 'Read more →' : 'اقرأ المزيد ←')
                    }
                  </button>
                  
                  {/* Dots Navigation */}
                  <div className="flex items-center justify-center gap-1.5 mt-8 clear-both">
                    {series.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentSlide(index)
                          setExpanded(false)
                        }}
                        className={`h-1.5 rounded-full transition-all ${
                          index === currentSlide 
                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-8' 
                            : 'bg-white/40 w-1.5 hover:bg-white/60'
                        }`}
                        aria-label={`Series ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Series Counter */}
            <div className="text-center mt-2 text-xs text-white/50">
              {currentSlide + 1} / {series.length}
            </div>
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="w-full max-w-[300px] mx-auto block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-base font-bold py-3.5 rounded-full transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-95"
          >
            {lang === 'en' ? 'Download App' : 'تحميل التطبيق'}
          </button>

          {/* Hint */}
          <p className="text-center text-xs text-white/40 mt-3">
            {lang === 'en' ? 'Swipe or use arrows to explore more series' : 'اسحب أو استخدم الأسهم لاستكشاف المزيد'}
          </p>

        </div>
      </main>
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
