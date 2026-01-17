'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'

function YangoContent() {
  const searchParams = useSearchParams()
  const [oneLinkUrl, setOneLinkUrl] = useState('https://play.yango.com')
  const [currentSlide, setCurrentSlide] = useState(0)

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
      setCurrentSlide((prev) => (prev + 1) % 5)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const series = [
    {
      title: 'بضيع يا صح في يوم ولا...',
      subtitle: 'In just a few hours love ignites, secrets unravel and lives change forever',
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=700&fit=crop&q=80',
    },
    {
      title: 'أهل الكهف',
      subtitle: 'A thrilling journey through time and mystery',
      image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=700&fit=crop&q=80',
    },
    {
      title: 'السجادة الأفاضال',
      subtitle: 'Comedy series that will make you laugh',
      image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=700&fit=crop&q=80',
    },
    {
      title: 'مسلسلات حصرية',
      subtitle: 'Exclusive content only on Yango Play',
      image: 'https://images.unsplash.com/photo-1594908900066-3f47337549d8?w=400&h=700&fit=crop&q=80',
    },
    {
      title: 'دراما عربية',
      subtitle: 'The best Arabic drama series',
      image: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&h=700&fit=crop&q=80',
    },
  ]

  const handleDownload = () => {
    window.location.href = oneLinkUrl
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1633] via-[#1a2855] to-[#0a1633] text-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl"></div>
      
      <header className="relative z-10 py-6 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-black tracking-tight" style={{ fontFamily: 'Arial Black, Impact, sans-serif' }}>
              YANGO PLAY
            </h1>
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 rounded-full animate-pulse">
              <p className="text-lg font-bold">Привет Ибра! 👋</p>
            </div>
          </div>
          <p className="text-xs md:text-sm text-white/60 mt-2 max-w-2xl">
            All Yango Play subscribers can have a free 60 days subscription to watch on TV at home.
          </p>
        </div>
      </header>

      <main className="relative z-10 px-6 md:px-12 py-8 md:py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-12" style={{ fontFamily: 'Arial Black, Impact, sans-serif' }}>
            FREE 60 DAYS<br />OF THE BEST SERIES
          </h2>

          <div className="relative max-w-md mx-auto mb-12">
            <div className="relative p-1 rounded-[3rem] bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 shadow-2xl shadow-purple-500/50">
              <div className="bg-black rounded-[2.8rem] overflow-hidden">
                <div className="relative aspect-[9/19.5] bg-gradient-to-b from-gray-900 to-black">
                  <div className="absolute top-0 left-0 right-0 px-8 py-3 flex items-center justify-between text-white text-sm z-20">
                    <span className="font-semibold">05:07</span>
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>
                    </div>
                  </div>

                  <div className="relative h-full">
                    <img 
                      src={series[currentSlide].image} 
                      alt={series[currentSlide].title}
                      className="w-full h-full object-cover"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                      <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white" style={{ fontFamily: 'Arial, sans-serif' }}>
                        {series[currentSlide].title}
                      </h3>
                      <p className="text-sm text-white/80 mb-4 line-clamp-2">
                        {series[currentSlide].subtitle}
                      </p>
                      
                      <div className="flex items-center justify-center gap-2 mb-4">
                        {series.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              index === currentSlide 
                                ? 'bg-purple-500 w-6' 
                                : 'bg-white/40'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-30"></div>
                </div>
              </div>

              <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-purple-600/30 rounded-[4rem] blur-2xl -z-10"></div>
            </div>
          </div>

          <button
            onClick={handleDownload}
            className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg md:text-xl font-bold px-12 py-4 rounded-full transition-all duration-300 shadow-2xl shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105"
          >
            Download App
          </button>
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
