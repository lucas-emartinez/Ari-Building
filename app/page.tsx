"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Playfair, Inter } from "next/font/google"
import { ChevronDown } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const playfair = Playfair({ subsets: ["latin"] })
const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  // Refs for animation elements
  const heroRef = useRef(null)
  const logoRef = useRef(null)
  const titleRef = useRef(null)
  const dividerRef = useRef(null)
  const comingSoonSectionRef = useRef(null)
  const comingSoonTitleRef = useRef(null)
  const storyTextRef = useRef(null)
  const gallerySectionRef = useRef(null)
  const galleryImagesRef = useRef([])
  const footerRef = useRef(null)

  // Register ScrollTrigger plugin
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Initialize GSAP animations
  useEffect(() => {
    // Hero section animations - subtle and professional
    if (logoRef.current && titleRef.current && dividerRef.current) {
      const heroTl = gsap.timeline()

      heroTl
        .from(logoRef.current, {
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        })
        .from(
          titleRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.4",
        )
        .from(
          dividerRef.current,
          {
            scaleX: 0,
            opacity: 0,
            duration: 0.8,
            ease: "power1.out",
          },
          "-=0.3",
        )
    }

    // Coming soon section animations - clean and professional
    if (comingSoonSectionRef.current) {
      ScrollTrigger.create({
        trigger: comingSoonSectionRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(comingSoonTitleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          })
          gsap.to(storyTextRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2,
            ease: "power2.out",
          })
        },
        once: true,
      })
    }

    // Gallery section animations - elegant and subtle
    if (gallerySectionRef.current && galleryImagesRef.current.length) {
      ScrollTrigger.create({
        trigger: gallerySectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(galleryImagesRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out",
          })
        },
        once: true,
      })
    }

    // Footer animations - subtle fade in
    if (footerRef.current) {
      ScrollTrigger.create({
        trigger: footerRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.from(footerRef.current.children, {
            opacity: 0,
            y: 20,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
          })
        },
        once: true,
      })
    }

    // Very subtle parallax for hero image - professional touch
    if (heroRef.current) {
      gsap.to(heroRef.current.querySelector(".bg-image"), {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
        y: 50,
        ease: "none",
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Fixed header - professional and clean */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className={`relative h-32 w-44 -mt-2 -mb-2 ${scrolled ? "" : "brightness-0 invert"}`}>
            <Image src="/aria_logo.png" alt="Aria Events Logo" fill className="object-contain" priority />
          </div>
          <p
            className={`${inter.className} text-xs md:text-sm uppercase tracking-widest ${scrolled ? "text-gray-800" : "text-white"}`}
          >
            08.15.2025
          </p>
        </div>
      </header>

      {/* Hero section - elegant and sophisticated */}
      <section ref={heroRef} className="h-screen relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-image">
          <Image
            src="/mina4.jpg"
            alt="Main background"
            fill
            style={{ opacity: 0.85 }}
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 z-10 flex flex-col items-center justify-center text-center text-white">
          <div ref={logoRef} className="w-96 h-96 mb-8">
            <Image src="/aria_logo_letra.png" alt="Letter Logo" fill className="object-contain" priority />
          </div>
          <p ref={titleRef} className={`${inter.className} text-lg md:text-xl uppercase tracking-widest mb-8`}>
            We&apos;re building our wedding website
          </p>
          <div ref={dividerRef} className="w-16 h-px bg-white mx-auto"></div>
        </div>

        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-bounce"
          aria-label="Scroll down"
        >
          <ChevronDown size={32} />
        </button>
      </section>

      {/* Coming soon message - professional and clean */}
      <section ref={comingSoonSectionRef} className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-16">
            <h2
              ref={comingSoonTitleRef}
              className={`${playfair.className} text-3xl md:text-4xl mb-6 opacity-0 transform translate-y-4`}
            >
              Our Story Is Coming Soon
            </h2>
            <p
              ref={storyTextRef}
              className={`${inter.className} text-gray-600 max-w-2xl mx-auto leading-relaxed opacity-0 transform translate-y-4`}
            >
              We are in the process of creating a beautiful website to share all the details of our special day with
              you. Please check back soon for more information about our wedding celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery - professional presentation */}
      <section ref={gallerySectionRef} className="pb-24 bg-white">
        <div className="container mx-auto px-4">
          {/* First row - large featured image */}
          <div className="mb-8">
            <div
              ref={(el) => (galleryImagesRef.current[0] = el)}
              className="relative w-full aspect-[16/9] overflow-hidden rounded-sm shadow-sm opacity-0 transform translate-y-8"
            >
              <Image src="/main1.jpg" alt="Wedding moment" fill className="object-cover" />
            </div>
          </div>

          {/* Second row - two images side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div
              ref={(el) => (galleryImagesRef.current[1] = el)}
              className="relative w-full aspect-[16/9] overflow-hidden rounded-sm shadow-sm opacity-0 transform translate-y-8"
            >
              <Image src="/couple_venezia.jpg" alt="Wedding moment" fill className="object-cover object-top" />
            </div>
            <div
              ref={(el) => (galleryImagesRef.current[2] = el)}
              className="relative w-full aspect-[16/9] overflow-hidden rounded-sm shadow-sm opacity-0 transform translate-y-8"
            >
              <Image src="/main3.jpg" alt="Wedding moment" fill className="object-cover" />
            </div>
          </div>

          {/* Third row - large featured image */}
          <div className="mb-8">
            <div
              ref={(el) => (galleryImagesRef.current[3] = el)}
              className="relative w-full aspect-[16/9] overflow-hidden rounded-sm shadow-sm opacity-0 transform translate-y-8"
            >
              <Image src="/couple_kissing.jpg" alt="Wedding moment" fill className="object-cover" />
            </div>
          </div>

          {/* Fourth row - two images side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div
              ref={(el) => (galleryImagesRef.current[4] = el)}
              className="relative w-full aspect-[16/9] overflow-hidden rounded-sm shadow-sm opacity-0 transform translate-y-8"
            >
              <Image src="/happy_marriage.jpg" alt="Wedding moment" fill className="object-cover" />
            </div>
            <div
              ref={(el) => (galleryImagesRef.current[5] = el)}
              className="relative w-full aspect-[16/9] overflow-hidden rounded-sm shadow-sm opacity-0 transform translate-y-8"
            >
              <Image src="/forest.jpg" alt="Wedding moment" fill className="object-cover object-bottom" />
            </div>
          </div>
        </div>
      </section>

      {/* Footer - elegant and professional */}
      <footer ref={footerRef} className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className={`${playfair.className} text-2xl mb-6`}>Aria Events</h2>
          <p className={`${inter.className} text-sm text-gray-500 mb-6`}>August 15, 2025</p>
          <div className="w-12 h-px bg-gray-200 mx-auto mb-6"></div>
          <p className={`${inter.className} text-xs text-gray-400`}>
            © {new Date().getFullYear()} | Website coming soon
          </p>
        </div>
      </footer>
    </main>
  )
}
