'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function YangoContent() {
  const searchParams = useSearchParams()
  const [oneLinkUrl, setOneLinkUrl] = useState('https://yangoplay.onelink.me/ZSw2/eslls7kl?pid=googleads_int&c=YangoPlay_W2A_RET&af_siteid=google_w2a&af_channel=google_w2a&is_retargeting=true&af_inactivity_window=7d&af_reengagement_window=7d&af_click_lookback=7d')
  const [currentSlide, setCurrentSlide] = useState(0)
  const [lang, setLang] = useState<'en' | 'ar'>('en')
  const [expanded, setExpanded] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)

  useEffect(() => {
    const utmSource = searchParams.get('utm_source') || ''
    const utmMedium = searchParams.get('utm_medium') || ''
    const utmCampaign = searchParams.get('utm_campaign') || ''
    const utmTerm = searchParams.get('utm_term') || ''
    const utmContent = searchParams.get('utm_content') || ''
    const gclid = searchParams.get('gclid') || ''
    const gbraid = searchParams.get('gbraid') || ''
    const wbraid = searchParams.get('wbraid') || ''

    // Smart Script: Parse utm_term for dynamic parameters
    let cid = '', gid = '', adid = '', tid = '', kw = '', mtype = '', device = ''
    
    if (utmTerm) {
      // Parse utm_term like: cid_{campaignid}|gid_{adgroupid}|adid_{creative}|tid_{targetid}|kw_{keyword}|mtype_{matchtype}|d_{device}|{random}
      const termParts = utmTerm.split('|')
      termParts.forEach(part => {
        if (part.startsWith('cid_')) cid = part.replace('cid_', '')
        else if (part.startsWith('gid_')) gid = part.replace('gid_', '')
        else if (part.startsWith('adid_')) adid = part.replace('adid_', '')
        else if (part.startsWith('tid_')) tid = part.replace('tid_', '')
        else if (part.startsWith('kw_')) kw = part.replace('kw_', '')
        else if (part.startsWith('mtype_')) mtype = part.replace('mtype_', '')
        else if (part.startsWith('d_')) device = part.replace('d_', '')
      })
    }

    // Build dynamic OneLink URL
    const oneLinkBase = 'https://yangoplay.onelink.me/ZSw2/eslls7kl'
    const params = new URLSearchParams()
    
    // Main parameters
    if (utmSource) params.append('pid', utmSource)
    if (utmCampaign) params.append('c', utmCampaign)
    
    // Google Ads dynamic parameters
    if (gid) params.append('af_adset', gid) // adgroup ID
    if (adid) params.append('af_ad', adid) // creative ID
    if (kw) params.append('af_keyword', kw) // keyword
    
    // Additional sub parameters for debugging
    if (tid) params.append('af_sub1', tid) // target ID
    if (mtype) params.append('af_sub2', mtype) // match type
    if (device) params.append('af_sub3', device) // device
    if (utmMedium) params.append('af_sub4', utmMedium) // medium
    if (utmContent) params.append('af_sub5', utmContent) // content/creative
    
    // Google Click IDs
    if (gclid) params.append('gclid', gclid)
    if (gbraid) params.append('gbraid', gbraid)
    if (wbraid) params.append('wbraid', wbraid)
    
    // Static retargeting parameters
    params.append('af_siteid', 'google_w2a')
    params.append('af_channel', 'google_w2a')
    params.append('is_retargeting', 'true')
    params.append('af_inactivity_window', '7d')
    params.append('af_reengagement_window', '7d')
    params.append('af_click_lookback', '7d')
    
    const finalUrl = `${oneLinkBase}?${params.toString()}`
    setOneLinkUrl(finalUrl)
  }, [searchParams])

  // Auto-slide disabled to prevent epilepsy issues
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (!expanded) {
  //       setCurrentSlide((prev) => (prev + 1) % series.length)
  //     }
  //   }, 6000)
  //   return () => clearInterval(interval)
  // }, [expanded])

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % series.length)
    setExpanded(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + series.length) % series.length)
    setExpanded(false)
  }

  const minSwipeDistance = 40

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setSwipeDirection(null)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    const currentTouch = e.targetTouches[0].clientX
    setTouchEnd(currentTouch)
    
    if (touchStart) {
      const distance = touchStart - currentTouch
      if (Math.abs(distance) > 15) {
        setSwipeDirection(distance > 0 ? 'left' : 'right')
      }
    }
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      setSwipeDirection(null)
      return
    }
    const distance = touchStart - touchEnd
    const velocity = Math.abs(distance)
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe || (distance > 20 && velocity > 30)) {
      nextSlide()
    } else if (isRightSwipe || (distance < -20 && velocity > 30)) {
      prevSlide()
    }
    
    setTimeout(() => setSwipeDirection(null), 200)
  }

  // Preload all images for instant switching
  useEffect(() => {
    series.forEach((show) => {
      const img = new Image()
      img.src = show.image
    })
  }, [])

  const handleDownload = () => {
    // Google Ads Conversion tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        send_to: 'AW-XXXXXXXXXX/YYYYYYYYY',
        value: 1.0,
        currency: 'USD'
      });
    }
    window.location.href = oneLinkUrl;
  }

  return (
    <div className="min-h-screen bg-[#0a0a14] text-white relative overflow-hidden">
      {/* Gradient Orbs - hidden on mobile for performance */}
      <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-purple-600/30 via-fuchsia-600/20 to-transparent rounded-full blur-3xl"></div>
      <div className="hidden md:block absolute bottom-0 right-0 w-[400px] h-[400px] bg-gradient-to-tl from-pink-600/20 via-purple-600/20 to-transparent rounded-full blur-3xl"></div>
      
      <header className="relative z-10 py-4 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600 flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 5L16 12L8 19V5Z" fill="white"/>
                </svg>
              </div>
              <img 
                src="/posters/yango play – one line – black.png" 
                alt="Yango Play" 
                className="h-10 w-auto brightness-0 invert"
              />
            </div>
            
            <div className="flex items-center gap-1.5 bg-white/5 rounded-full p-0.5 border border-white/10">
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                  lang === 'en' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' : 'text-white/60 hover:text-white/80'
                }`}
              >
                Eng
              </button>
              <button
                onClick={() => setLang('ar')}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all ${
                  lang === 'ar' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30' : 'text-white/60 hover:text-white/80'
                }`}
              >
                العربية
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative z-10 px-4 pb-6">
        <div className="max-w-md mx-auto">
          
          {/* Series Title */}
          <div className={`mb-3 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <h2 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
              {lang === 'en' ? series[currentSlide].title : series[currentSlide].titleAr}
            </h2>
          </div>

          {/* Phone Mockup with Series */}
          <div className="relative max-w-[320px] mx-auto mb-4">
            
            {/* Phone Frame with beautiful design */}
            <div className="relative p-2 rounded-[2.5rem] bg-gradient-to-br from-purple-500/20 via-fuchsia-500/20 to-pink-500/20 shadow-2xl shadow-purple-500/30">
              <div 
                className="relative aspect-[9/19.5] rounded-[2rem] overflow-hidden bg-gradient-to-br from-gray-900 to-black shadow-xl border-2 border-white/10"
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
              >
                {/* Navigation Arrows INSIDE phone */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group border border-white/20 shadow-lg"
                  aria-label="Previous"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center transition-all group border border-white/20 shadow-lg"
                  aria-label="Next"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Swipe indicator */}
                {swipeDirection && (
                  <div className={`absolute top-1/2 -translate-y-1/2 z-40 pointer-events-none transition-all duration-200 ${swipeDirection === 'left' ? 'right-16' : 'left-16'}`}>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500/60 to-pink-500/60 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg animate-pulse">
                      <svg className="w-6 h-6" fill="none" stroke="white" viewBox="0 0 24 24" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={swipeDirection === 'left' ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                      </svg>
                    </div>
                  </div>
                )}
              {/* Series Card - Vertical Poster Style - Smooth crossfade without black screen */}
              <div className="relative h-full w-full bg-black">
                {series.map((show, index) => (
                  <img 
                    key={index}
                    src={show.image}
                    alt={lang === 'en' ? show.title : show.titleAr}
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                      index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                    loading="eager"
                    decoding="async"
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                  />
                ))}
              </div>
                
                {/* Progress Bar */}
                <div className="absolute top-3 left-3 right-3 z-10 flex gap-1.5">
                  {series.map((_, index) => (
                    <div key={index} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r from-purple-400 to-pink-400 shadow-sm shadow-purple-500/50 transition-all duration-500 ease-out ${index === currentSlide ? 'w-full' : index < currentSlide ? 'w-full opacity-50' : 'w-0'}`}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Bottom Overlay with Description */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/85 to-transparent p-4 pb-5">
                  <h4 className={`text-lg font-bold mb-2 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                    {lang === 'en' ? series[currentSlide].title : series[currentSlide].titleAr}
                  </h4>
                  
                  <p className={`text-xs text-white/80 mb-2.5 leading-relaxed ${lang === 'ar' ? 'text-right' : 'text-left'} ${expanded ? '' : 'line-clamp-2'}`}>
                    {lang === 'en' 
                      ? (expanded ? series[currentSlide].fullDesc : series[currentSlide].shortDesc)
                      : (expanded ? series[currentSlide].fullDescAr : series[currentSlide].shortDescAr)
                    }
                  </p>
                  
                  <button
                    onClick={() => setExpanded(!expanded)}
                    className={`text-xs font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 hover:from-purple-300 hover:to-pink-300 active:scale-95 transition-all ${lang === 'ar' ? 'float-right' : 'float-left'}`}
                  >
                    {expanded 
                      ? (lang === 'en' ? '← Show less' : 'أقل ←')
                      : (lang === 'en' ? 'Read more →' : 'اقرأ المزيد →')
                    }
                  </button>
                  
                  {/* Dots Navigation */}
                  <div className="flex items-center justify-center gap-2 mt-9 clear-both">
                    {series.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentSlide(index)
                          setExpanded(false)
                        }}
                        className={`h-1.5 rounded-full transition-all active:scale-90 ${
                          index === currentSlide 
                            ? 'bg-gradient-to-r from-purple-400 to-pink-400 w-8 shadow-lg shadow-purple-500/50' 
                            : 'bg-white/30 w-1.5 hover:bg-white/60 hover:w-3'
                        }`}
                        aria-label={`Series ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            </div>
            
            {/* Series Counter */}
            <div className="text-center mt-4 text-xs text-white/40 font-medium">
              {currentSlide + 1} / {series.length}
            </div>
          </div>

          {/* Watch Now Button with Series Name */}
          <button
            onClick={handleDownload}
            className="relative w-full max-w-[320px] mx-auto block bg-gradient-to-r from-purple-500 via-fuchsia-500 to-pink-500 hover:from-purple-600 hover:via-fuchsia-600 hover:to-pink-600 text-white text-base font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/70 hover:scale-[1.03] active:scale-95 border border-purple-400/30 overflow-hidden group"
          >
            <span className="relative z-10 flex flex-col items-center gap-1">
              <span className="text-sm opacity-90">
                {lang === 'en' ? 'Watch Now' : 'شاهد الآن'}
              </span>
              <span className="text-xs font-normal opacity-80">
                {lang === 'en' ? series[currentSlide].title : series[currentSlide].titleAr}
              </span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>

          {/* Hint */}
          <p className="text-center text-xs text-white/30 mt-4 font-light">
            {lang === 'en' ? 'Swipe or use arrows to explore more' : 'اسحب أو استخدم الأسهم للمزيد'}
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
