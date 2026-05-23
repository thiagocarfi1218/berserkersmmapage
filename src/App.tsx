/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, 
  Target, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Phone, 
  Clock, 
  Instagram, 
  Facebook,
  Trophy,
  Activity,
  Heart,
  Menu,
  X
} from "lucide-react";
import PhotoGallery from "./components/PhotoGallery";

const NAVBAR_LINKS = [
  { name: "Coaches", href: "#instructor" },
  { name: "Benefits", href: "#benefits" },
  { name: "Schedule", href: "#schedule" },
  { name: "Programs", href: "#programs" },
  { name: "Pricing", href: "#pricing" },
  { name: "Accomplishments", href: "#accomplishments" },
  { name: "Gallery", href: "#gallery" },
  { name: "FAQ", href: "#faq" },
  { name: "Visit", href: "#visit" },
];

export default function App() {
  const [activeSection, setActiveSection] = useState("Coaches");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeSection]);

  const pricingData: Record<string, any[]> = {
    Adults: [
      { 
        tier: "Standard Membership", 
        price: "175", 
        period: "/MO",
        features: ["Month-to-Month Contract", "Unlimited MMA Access", "BJJ, Boxing", "Access to Open Mat"], 
        cta: "Join The Adults",
        recommended: true 
      },
      { 
        tier: "Day Pass", 
        price: "20", 
        period: "/DAY",
        features: ["Full Gym Access", "One Class Included", "Expert Coaching", "No Commitment"], 
        cta: "Get Day Pass",
        recommended: false 
      }
    ],
    Youth: [
      { 
        tier: "Youth Program", 
        price: "150", 
        period: "/MO",
        features: ["Month-to-Month Contract", "Youth Specialized Training", "Disciplines: BJJ & Striking", "Confidence & Discipline Building", "Safe Training Environment"], 
        cta: "Enroll Youth",
        recommended: true 
      }
    ],
    Women: [
      { 
        tier: "Women's Kickboxing", 
        price: "100", 
        period: "/MO",
        features: ["Month-to-Month Contract", "Women-Only Environment", "Weight Loss & Self-Defense", "Full Body Conditioning", "Supportive Community"], 
        cta: "Join The Horde",
        recommended: true 
      }
    ],
    "Personal Training": [
      { 
        tier: "1-on-1 Session", 
        price: "50", 
        period: "/SESS",
        features: ["Personalized Game Plan", "Deep Technical Dive", "Flexible Scheduling", "Rapid Skill Gain", "Private Environment"], 
        cta: "Book Session",
        recommended: false 
      },
      { 
        tier: "3 Days A Week", 
        price: "300", 
        period: "/MO",
        features: ["12 Sessions Per Month", "Personalized Coaching", "Custom Workout Plan", "Priority Scheduling", "Nutrition Consultation"], 
        cta: "Start Elite Training",
        recommended: true 
      }
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-rose-600 selection:text-white overflow-x-hidden md:border-8 border-4 border-rose-600 watermark-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-md border-b border-zinc-800 md:mx-2 md:mt-2">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 md:h-24 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-xl md:text-3xl font-display tracking-tighter flex items-center gap-2">
              <span className="text-rose-600 uppercase italic">Berserkers</span>
              <span className="uppercase italic text-white">MMA Gym</span>
            </div>
            <span className="text-[10px] uppercase font-bold tracking-[0.4em] text-zinc-500 mt-1">Mastery • Discipline • Resilience</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-6 xl:gap-10">
              {NAVBAR_LINKS.map((link) => (
                <button 
                  key={link.name} 
                  onClick={() => {
                    setActiveSection(link.name);
                    setIsMenuOpen(false);
                  }}
                  className={`text-[10px] xl:text-xs font-black tracking-widest uppercase transition-all font-sans italic whitespace-nowrap ${activeSection === link.name ? 'text-rose-600' : 'text-zinc-400 hover:text-rose-600'}`}
                >
                  {link.name}
                </button>
              ))}
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 text-zinc-400 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "calc(100vh - 5rem)", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden absolute top-20 md:top-24 left-0 right-0 z-[60] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center px-6 overflow-hidden border-t border-zinc-900"
            >
              <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                <div className="text-xl font-display tracking-tighter flex items-center gap-2 mb-8 border-b-2 border-rose-600 pb-2">
                  BERSERKERS <span className="text-rose-600 italic">MMA</span>
                </div>
                {NAVBAR_LINKS.map((link, i) => (
                  <motion.button 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={link.name} 
                    onClick={() => {
                      setActiveSection(link.name);
                      setIsMenuOpen(false);
                    }}
                    className={`text-2xl font-black uppercase italic tracking-tighter py-3 transition-all ${activeSection === link.name ? 'text-rose-600' : 'text-zinc-200 hover:text-rose-600'}`}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="pt-20">
        {activeSection === "Coaches" && (
          <>
            {/* Hero Section */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden border-b border-zinc-800">
              <div 
                className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.2]" 
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?q=80&w=2000")' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent z-[1]" />
              
              <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 className="text-5xl sm:text-8xl md:text-[10rem] font-display uppercase leading-[0.85] md:leading-[0.75] tracking-tighter mb-6 md:mb-8 italic drop-shadow-[0_20px_20px_rgba(0,0,0,0.5)]">
                    Berserkers<br />
                    <span className="text-rose-600">MMA</span>
                  </h1>
                  <p className="max-w-2xl mx-auto text-xs md:text-xl text-zinc-400 mb-10 md:mb-16 font-bold uppercase tracking-widest italic px-4">
                    No Excuses. No Limits. Just Combat.
                  </p>
                </motion.div>
              </div>
            </section>

            {/* Instructor Section */}
            <section id="instructor" className="py-20 md:py-40 bg-zinc-950 relative border-b border-zinc-800">
              <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 md:grid-32 items-start">
                  <motion.div 
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -50 }}
                    transition={{ duration: 1 }}
                    className="relative"
                  >
                    <div className="flex items-center gap-3 mb-10">
                      <div className="w-2 h-10 md:w-3 md:h-12 bg-rose-600"></div>
                      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight italic">Head Instructor</h2>
                    </div>
                    <div className="aspect-[4/5] bg-zinc-950 overflow-hidden border-4 border-rose-600/20 group relative">
                      <img 
                        src="/Thiago.jpg" 
                        alt="Head Instructor Thiago Carfi"
                        className="w-full h-full object-contain grayscale transition-all duration-1000 group-hover:grayscale-0"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 to-transparent opacity-60" />
                    </div>
                    <div className="absolute -bottom-10 right-10 bg-zinc-950 border-4 border-rose-600 p-12 skew-x-[-12deg] hidden md:block">
                      <span className="text-4xl font-display uppercase italic leading-none block skew-x-[12deg]">Thiago<br /><span className="text-rose-600">Carfi</span></span>
                    </div>
                  </motion.div>
                  
                  <motion.div
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: 50 }}
                    transition={{ duration: 1 }}
                    className="pt-20"
                  >
                    <h3 className="text-3xl md:text-4xl font-black text-rose-600 uppercase italic mb-8">2nd Degree Black Belt</h3>
                    <div className="space-y-10 text-zinc-400 text-lg md:text-xl leading-relaxed font-bold italic uppercase tracking-tight">
                      <p>
                        "Martial arts is a 24-year journey of discipline and evolution. At Berserkers, we pass down the knowledge of legends to forge the next generation of warriors."
                      </p>
                      <p className="text-zinc-500">
                        With over 10 years of coaching and 24 years of dedicated training, Head Instructor Thiago Carfi brings extensive knowledge in Kickboxing, Wrestling, Jujitsu, and MMA.
                      </p>
                      <p className="text-zinc-600 text-sm">
                        Trained under world-class masters including Alex Pereira, Glover Teixeira, Marcelo Garcia, and Jorge "Macaco" Patino.
                      </p>
                    </div>
                    <div className="mt-20 grid grid-cols-2 gap-12 border-t border-zinc-800 pt-16">
                      {[
                        { label: "Training", value: "24Y+" },
                        { label: "Rank", value: "2nd DEG" },
                        { label: "Coaching", value: "10Y+" },
                        { label: "Expertise", value: "MMA" },
                      ].map((stat, i) => (
                        <div key={i} className="flex gap-4 items-center">
                          <div className="text-rose-600 font-black text-3xl md:text-5xl italic tracking-tighter">{stat.value}</div>
                          <div className="text-[10px] md:text-xs uppercase font-black text-zinc-600 tracking-[0.2em]">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Benefits Section */}
        {activeSection === "Benefits" && (
          <section id="benefits" className="py-20 md:py-40 bg-zinc-900/20 border-b border-zinc-800 min-h-[70vh]">
          <div className="max-w-7xl mx-auto px-6 md:px-8 text-center sm:text-left">
            <h2 className="text-lg md:text-xl font-black uppercase italic mb-12 md:mb-16 flex items-center justify-center sm:justify-start gap-4">
              <span className="text-rose-600 text-3xl md:text-5xl font-display tracking-tighter italic">//</span> Why Train With Us?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-x-12 md:gap-x-24 gap-y-12 md:gap-y-20">
              {[
                { 
                  title: "Elite Coaching", 
                  desc: "Train with professional athletes who have competed at the highest levels of combat sports worldwide." 
                },
                { 
                  title: "Brotherhood", 
                  desc: "A community of warriors dedicated to mutual growth. We leave our egos at the door and help each other rise." 
                },
                { 
                  title: "Elite Tech", 
                  desc: "Full-size cage, premium Fuji mats, and professional-grade strength and conditioning equipment." 
                },
                { 
                  title: "Focus", 
                  desc: "Escape the noise. Find incredible clarity through intense discipline and the pursuit of mastery." 
                },
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-8 group">
                  <div className="w-1 md:w-3 h-12 md:h-16 bg-rose-600/20 group-hover:bg-rose-600 transition-colors"></div>
                  <div>
                    <h4 className="text-3xl font-black uppercase italic mb-4 tracking-tight group-hover:text-rose-600 transition-colors">
                      {benefit.title}
                    </h4>
                    <p className="text-zinc-500 text-lg leading-relaxed italic font-bold">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === "Programs" && (
          <section id="programs" className="py-24 md:py-40 bg-zinc-950 border-b border-zinc-800 min-h-[70vh]">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <h2 className="text-4xl md:text-8xl font-black uppercase italic mb-16 md:mb-24 tracking-tighter italic border-l-8 border-rose-600 pl-8">The Arsenal</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800">
              {[
                { 
                  title: "Mixed Martial Arts", 
                  desc: "The ultimate synthesis of striking and grappling. Learn to transition fluidly between disciplines and dominate in all ranges of combat.",
                  icon: <Activity className="w-10 h-10" />
                },
                { 
                  title: "Brazilian Jiu-Jitsu", 
                  desc: "Master the art of leverage and technique. Focus on ground control, submissions, and defensive intelligence in both Gi and No-Gi formats.",
                  icon: <ShieldCheck className="w-10 h-10" />
                },
                { 
                  title: "Kickboxing", 
                  desc: "Develop devastating power with punches and kicks in a high-intensity striking environment.",
                  icon: <Target className="w-10 h-10" />
                },
                { 
                  title: "Wrestling", 
                  desc: "Build an unstoppable foundation of takedowns and top control. Develop the grit and athleticism required to dictate where the fight happens.",
                  icon: <Trophy className="w-10 h-10" />
                },
                { 
                  title: "Boxing", 
                  desc: "Sharpen your hands, footwork, and defensive head movement. Master the sweet science for clinical efficiency in stand-up combat.",
                  icon: <Activity className="w-10 h-10" />
                },
                { 
                  title: "Youth Programs", 
                  desc: "Building the next generation. We focus on discipline, anti-bullying, and fundamental athletic coordination in a safe, fun environment.",
                  icon: <Users className="w-10 h-10" />
                },
              ].map((p, i) => (
                <div key={i} className="bg-zinc-950 p-12 hover:bg-zinc-900 transition-all group">
                  <div className="text-rose-600 mb-8 transform group-hover:scale-110 transition-transform origin-left">{p.icon}</div>
                  <h4 className="text-3xl font-black uppercase italic tracking-tighter mb-6 leading-tight">{p.title}</h4>
                  <p className="text-zinc-500 text-lg font-bold italic uppercase tracking-tight leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === "Schedule" && (
          <section id="schedule" className="py-40 bg-zinc-950 border-b border-zinc-800 min-h-[70vh]">
          <div className="max-w-7xl mx-auto px-8">
            <h2 className="text-5xl font-black uppercase italic mb-20 tracking-tighter italic border-l-8 border-rose-600 pl-8">Class Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[
                { 
                  day: "Monday", 
                  classes: [
                    { name: "Youth Jujitsu", time: "6:30 PM - 7:30 PM" },
                    { name: "MMA", time: "7:00 PM - 8:30 PM" },
                    { name: "Jujitsu Gi", time: "8:30 PM - 9:30 PM" }
                  ],
                  accent: "rose" 
                },
                { 
                  day: "Tuesday", 
                  classes: [
                    { name: "Women's Kickboxing", time: "6:00 PM - 7:00 PM" },
                    { name: "Boxing", time: "7:00 PM - 8:30 PM" },
                    { name: "Wrestling", time: "8:30 PM - 9:30 PM" }
                  ],
                  accent: "zinc" 
                },
                { 
                  day: "Wednesday", 
                  classes: [
                    { name: "Youth Jujitsu", time: "6:30 PM - 7:30 PM" },
                    { name: "MMA", time: "7:00 PM - 8:30 PM" },
                    { name: "Jujitsu Gi", time: "8:30 PM - 9:30 PM" }
                  ],
                  accent: "rose" 
                },
                { 
                  day: "Thursday", 
                  classes: [
                    { name: "Women's Kickboxing", time: "6:00 PM - 7:00 PM" },
                    { name: "Kickboxing", time: "7:00 PM - 8:30 PM" },
                    { name: "Jujitsu No Gi", time: "8:30 PM - 9:30 PM" }
                  ],
                  accent: "zinc" 
                },
                { 
                  day: "Friday", 
                  classes: [
                    { name: "Youth Jiu Jitsu (NoGi)", time: "6:30 PM - 7:30 PM" },
                    { name: "Sparring / Jujitsu", time: "7:30 PM - 9:30 PM" }
                  ],
                  accent: "rose" 
                },
              ].map((item, idx) => (
                <div key={idx} className={`bg-zinc-900/50 p-8 border-t-8 ${item.accent === "rose" ? "border-rose-600" : "border-zinc-700"} hover:bg-zinc-900 transition-all group`}>
                  <span className="text-xs text-zinc-500 uppercase font-black tracking-widest">{item.day}</span>
                  <div className="mt-8 space-y-8">
                    {item.classes.map((cls, cIdx) => (
                      <div key={cIdx} className="border-l-2 border-zinc-800 pl-4 group-hover:border-rose-600/30 transition-colors">
                        <div className="text-xl font-black uppercase italic tracking-tighter mb-1 leading-tight">{cls.name}</div>
                        <div className="text-zinc-500 font-bold uppercase text-[10px] tracking-widest italic">{cls.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-zinc-600 font-black uppercase italic tracking-widest text-xs">Saturday & Sunday: Closed for Recovery</p>
            </div>
          </div>
        </section>
      )}

      {activeSection === "Accomplishments" && (
          <section id="accomplishments" className="py-40 bg-zinc-900/10 border-b border-zinc-800 relative overflow-hidden min-h-[70vh]">
          <div className="absolute right-0 top-0 text-[30rem] font-display text-white/[0.01] pointer-events-none select-none">GOLD</div>
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
              <div>
                <h2 className="text-5xl md:text-9xl font-display uppercase leading-none tracking-tighter">Gold <br /><span className="text-rose-600 italic">& Glory</span></h2>
              </div>
              <div className="max-w-md text-zinc-500 uppercase tracking-[0.2em] font-bold text-xs border-l-4 border-rose-600 pl-8 h-fit italic leading-relaxed">
                Our legacy is built on the mats. From regional opens to world-class invitationals, Berserkers MMA continues to dominate the competition.
              </div>
            </div>

            {/* Featured Victory: Ahmed Carmino */}
            <div className="mb-32">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative group max-w-lg mx-auto lg:mx-0"
                >
                  <div className="absolute inset-0 border-8 border-rose-600 translate-x-4 translate-y-4 transition-transform group-hover:translate-x-6 group-hover:translate-y-6"></div>
                  <div className="relative bg-zinc-950 border-4 border-white overflow-hidden shadow-[20px_20px_0px_0px_rgba(159,18,57,0.5)]">
                    <img 
                      src="/ahmed_victory.jpg" 
                      alt="Ahmed Carmino Flex Fight Series MMA Champion" 
                      className="w-full h-auto grayscale transition-all duration-700 group-hover:grayscale-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599420083437-010531bd281c?q=80&w=1200';
                      }}
                    />
                    <div className="absolute top-0 left-0 bg-rose-600 text-white px-6 py-2 font-black uppercase italic text-sm tracking-widest z-10">
                      CHAMPION
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-950 to-transparent p-8">
                      <div className="text-white font-display text-4xl italic tracking-tighter">NY • FEB 2026</div>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-center lg:text-left"
                >
                  <div className="inline-block border-2 border-rose-600 text-rose-600 px-6 py-2 font-black uppercase italic tracking-widest text-sm skew-x-[-12deg] mb-8">
                    <span className="inline-block skew-x-[12deg]">Hall of Glory</span>
                  </div>
                  <h3 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter mb-8 leading-none">
                    Flex Fight Series <br />
                    <span className="text-rose-600 block mt-2">MMA Champion</span>
                  </h3>
                  <div className="space-y-8 text-zinc-400 text-xl font-bold uppercase italic tracking-tight leading-relaxed">
                    <div className="relative">
                      <span className="absolute -left-8 top-0 text-6xl text-rose-600/20 font-display">"</span>
                      <p className="border-l-4 border-rose-600 pl-8 text-white text-xl md:text-3xl font-black">
                        Ahmed Carmino won the MMA belt of Flex Fight Series in NY with a 8 second KO over his opponent Jacob Becceril on February 27 2026.
                      </p>
                    </div>
                    <p className="text-zinc-500 text-base max-w-xl mx-auto lg:mx-0">
                      This historic 8-second finish remains one of the most dominant performances in New York MMA history. Ahmed's dedication to the grind at Berserkers MMA forged this victory.
                    </p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                      <div className="bg-zinc-900 border border-zinc-800 px-6 py-4 flex flex-col items-center min-w-[120px]">
                        <span className="text-rose-600 text-3xl font-black">8s</span>
                        <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">RECORD KO</span>
                      </div>
                      <div className="bg-zinc-900 border border-zinc-800 px-6 py-4 flex flex-col items-center min-w-[120px]">
                        <span className="text-white text-3xl font-black italic">BELT</span>
                        <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">MMA TITLE</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Featured Victory: Mario de Los Santos */}
            <div className="mb-32">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  className="text-center lg:text-left order-2 lg:order-1"
                >
                  <div className="inline-block border-2 border-rose-600 text-rose-600 px-6 py-2 font-black uppercase italic tracking-widest text-sm skew-x-[-12deg] mb-8">
                    <span className="inline-block skew-x-[12deg]">Kickboxing Legend</span>
                  </div>
                  <h3 className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter mb-8 leading-none">
                    Flex Fight Series <br />
                    <span className="text-rose-600 block mt-2">Kickboxing Champion</span>
                  </h3>
                  <div className="space-y-8 text-zinc-400 text-xl font-bold uppercase italic tracking-tight leading-relaxed">
                    <div className="relative">
                      <span className="absolute -left-8 top-0 text-6xl text-rose-600/20 font-display">"</span>
                      <p className="border-l-4 border-rose-600 pl-8 text-white text-xl md:text-3xl font-black text-left">
                        Mario de Los Santos won the Flex Fight Series with a victory over undefeated champion Luke Hart on November 22, 2024. Making Mario the Flex Fight Series kickboxing champion.
                      </p>
                    </div>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                      <div className="bg-zinc-900 border border-zinc-800 px-6 py-4 flex flex-col items-center min-w-[120px]">
                        <span className="text-rose-600 text-3xl font-black">2024</span>
                        <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">TITLE YEAR</span>
                      </div>
                      <div className="bg-zinc-900 border border-zinc-800 px-6 py-4 flex flex-col items-center min-w-[120px]">
                        <span className="text-white text-3xl font-black italic">WIN</span>
                        <span className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">OVER UNBEATEN</span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative group max-w-lg mx-auto lg:mx-0 order-1 lg:order-2"
                >
                  <div className="absolute inset-0 border-8 border-rose-600 -translate-x-4 translate-y-4 transition-transform group-hover:-translate-x-6 group-hover:translate-y-6"></div>
                  <div className="relative bg-zinc-950 border-4 border-white overflow-hidden shadow-[-20px_20px_0px_0px_rgba(159,18,57,0.5)]">
                    <img 
                      src="/Mario.jpg" 
                      alt="Mario de Los Santos Flex Fight Series Kickboxing Champion" 
                      className="w-full h-auto grayscale transition-all duration-700 group-hover:grayscale-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=1200';
                      }}
                    />
                    <div className="absolute top-0 right-0 bg-rose-600 text-white px-6 py-2 font-black uppercase italic text-sm tracking-widest z-10">
                      CHAMPION
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-zinc-950 to-transparent p-8">
                      <div className="text-white font-display text-4xl italic tracking-tighter">NY • NOV 2024</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </section>
      )}

      {activeSection === "Pricing" && (
        <section id="pricing" className="py-24 md:py-40 bg-zinc-950 border-b border-zinc-800 relative overflow-hidden min-h-[70vh]">
          <div className="absolute left-0 bottom-0 text-[15rem] font-display text-white/[0.01] pointer-events-none select-none -rotate-90 origin-bottom-left">COST</div>
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8">
              <div>
                <h2 className="text-5xl sm:text-7xl md:text-[8rem] font-black uppercase italic mb-4 tracking-tighter border-l-8 border-white pl-8 leading-[0.85]">
                  Choose Your <span className="text-rose-600 italic">Trial</span>
                </h2>
                <p className="text-zinc-500 font-bold uppercase tracking-widest italic ml-10">No Contracts. No Bullshit. Just Commitment.</p>
              </div>
            </div>

            <div className="space-y-24 max-w-6xl mx-auto mt-16">
              {Object.entries(pricingData).map(([category, plans]) => (
                <div 
                  key={category} 
                  id={`pricing-cat-${category.toLowerCase().replace(/\s+/g, "-")}`}
                  className="space-y-8 scroll-mt-28"
                >
                  {/* Category Header in absolute GIANT letters */}
                  <div className="relative overflow-hidden mb-8">
                    <h3 className="text-4xl sm:text-6xl md:text-[6rem] font-black uppercase italic text-rose-600 tracking-tighter leading-none select-none">
                      // {category}
                    </h3>
                    <div className="h-1 bg-zinc-800 mt-4 w-full"></div>
                  </div>

                  <div className="space-y-6">
                    {plans.map((plan, i) => (
                      <div 
                        key={i} 
                        className={`relative p-6 md:p-10 border-4 ${plan.recommended ? 'border-rose-600 bg-zinc-900 shadow-2xl' : 'border-zinc-800 bg-zinc-950 hover:border-zinc-500'} transition-all group flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-8`}
                      >
                        {plan.recommended && (
                          <div className="absolute -top-6 left-6 md:left-10 bg-rose-600 text-white px-4 py-1.5 font-black uppercase italic tracking-widest text-[10px] md:text-xs skew-x-[-12deg] z-10">
                            <span className="inline-block skew-x-[12deg]">Most Efficient</span>
                          </div>
                        )}
                        
                        {/* Tier Title of Plan in Big Letters */}
                        <div className="flex-1 min-w-[250px] space-y-2">
                          <h4 className="text-2xl sm:text-3xl md:text-5xl font-extrabold uppercase italic tracking-tighter text-white">
                            {plan.tier}
                          </h4>
                          <div className="flex items-baseline gap-2">
                            <span className="text-4xl sm:text-5xl md:text-7xl font-display text-rose-500 italic tracking-tighter">${plan.price}</span>
                            <span className="text-zinc-500 font-black uppercase text-[10px] md:text-xs tracking-widest">{plan.period}</span>
                          </div>
                        </div>

                        {/* Features List */}
                        <div className="flex-[1.5] min-w-[280px]">
                          <ul className="grid sm:grid-cols-2 gap-3">
                            {plan.features.map((f: string, fi: number) => (
                              <li key={fi} className="flex gap-2.5 items-start text-zinc-400 font-bold uppercase italic text-[10px] md:text-xs tracking-tight">
                                <span className="text-rose-600 font-black flex-shrink-0">//</span>
                                <span>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA button inside skew container */}
                        <div className="flex-shrink-0">
                          <button 
                            onClick={() => {
                              window.location.href = "https://berserkers-mma-390047829708.us-west1.run.app";
                            }}
                            className="w-full lg:w-auto bg-white text-zinc-950 hover:bg-rose-600 hover:text-white px-6 py-3 md:px-8 md:py-4 font-black uppercase italic tracking-tighter skew-x-[-12deg] transition-all text-xs md:text-sm"
                          >
                            <span className="inline-block skew-x-[12deg]">{plan.cta}</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === "Gallery" && (
          <div className="min-h-[70vh]">
            <PhotoGallery />
          </div>
        )}

        {activeSection === "FAQ" && (
          <section id="faq" className="py-24 md:py-40 bg-zinc-900/5 border-b border-zinc-800 min-h-[70vh]">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <h2 className="text-4xl md:text-8xl font-black uppercase italic mb-16 md:mb-24 tracking-tighter border-l-8 border-rose-600 pl-8">
              Intelligence <span className="text-rose-600 italic">Report</span>
            </h2>
            <div className="space-y-12">
              {[
                {
                  q: "Do I need experience to start?",
                  a: "Absolutely not. We have beginners starting every week. Our fundamentals classes are designed to build your skills from the ground up."
                },
                {
                  q: "What equipment do I need?",
                  a: "For your first class, just wear comfortable athletic gear. As you progress, you'll need gloves for striking and a Gi for BJJ."
                },
                {
                  q: "Is there an age limit?",
                  a: "We have programs starting from age 6 all the way up to adults. If you can move, you can train."
                },
                {
                  q: "Can I just watch a class first?",
                  a: "Yes. You're welcome to come in during any scheduled class time to watch the training environment."
                }
              ].map((faq, i) => (
                <div key={i} className="group border-b border-zinc-800 pb-8 last:border-0">
                  <h4 className="text-xl md:text-2xl font-black uppercase italic tracking-tight mb-4 group-hover:text-rose-600 transition-colors">
                    {faq.q}
                  </h4>
                  <p className="text-zinc-500 font-bold italic uppercase tracking-tight leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === "Visit" && (
          <section id="visit" className="py-20 md:py-40 bg-zinc-950 min-h-[70vh]">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div>
                <h2 className="text-6xl md:text-8xl font-black uppercase italic mb-16 md:mb-24 tracking-tighter text-center">Enter<br /><span className="text-rose-600">The Dojo</span></h2>
                
                <div className="grid md:grid-cols-2 gap-16 md:gap-32">
                  <div className="flex gap-8 group">
                    <div className="text-rose-600 italic font-black text-3xl opacity-30 mt-1">LOC //</div>
                    <div>
                      <h4 className="text-lg uppercase font-black tracking-widest mb-4">Location</h4>
                      <p className="text-zinc-400 font-bold italic uppercase tracking-tight text-xl">1210 East Grand Street,<br />Elizabeth, New Jersey 07201</p>
                    </div>
                  </div>

                  <div className="flex gap-8 group">
                    <div className="text-rose-600 italic font-black text-3xl opacity-30 mt-1">CONTACT //</div>
                    <div>
                      <h4 className="text-lg uppercase font-black tracking-widest mb-4">Get In Touch</h4>
                      <div className="text-zinc-400 font-bold italic uppercase tracking-tight space-y-4 text-xl">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-600 tracking-widest mb-1 italic">Phone //</span>
                          <span className="text-white">862 910 6714</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-600 tracking-widest mb-1 italic">Instagram //</span>
                          <a href="https://instagram.com/berserkersmmausa" target="_blank" rel="noreferrer" className="text-rose-600 hover:text-white transition-colors">@BERSERKERSMMAUSA</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Maps Embed */}
                <div className="mt-20 w-full h-[400px] border-4 border-rose-600/20 grayscale hover:grayscale-0 transition-all duration-700">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.671842857418!2d-74.1989063!3d40.6591781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c3ac089408092d%3A0xc48c4a161ed3e29f!2s1210%20E%20Grand%20St%2C%20Elizabeth%2C%20NJ%2007201!5e0!3m2!1sen!2sus!4v1714010000000!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>

      {/* Footer */}
      <footer className="bg-white text-zinc-950 py-16 md:py-24 md:mx-2 md:mb-2">
        <div className="max-w-7xl mx-auto px-6 md:px-8 h-full flex flex-col md:flex-row justify-between items-center gap-12 md:gap-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-24 text-center md:text-left">
             <div className="space-y-2">
                <span className="block text-[10px] uppercase font-black text-rose-600 tracking-widest mb-2 md:mb-4 italic">The Dojo Base</span>
                <p className="font-black text-lg md:text-2xl uppercase tracking-tighter italic">1210 East Grand Street</p>
                <p className="font-black text-lg md:text-2xl uppercase tracking-tighter italic">Elizabeth, New Jersey 07201</p>
              </div>
              <div className="space-y-2">
                <span className="block text-[10px] uppercase font-black text-rose-600 tracking-widest mb-2 md:mb-4 italic">Operating Flow</span>
                <p className="font-black text-lg md:text-2xl uppercase tracking-tighter italic">Mon-Fri: 5:30 PM - 10:00 PM</p>
                <p className="font-black text-lg md:text-2xl uppercase tracking-tighter italic">Sat-Sun: CLOSED</p>
              </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 w-full md:w-auto">
             <div className="text-right">
                <p className="text-sm italic font-black uppercase text-zinc-400 tracking-widest">Stop Waiting. Start Fighting.</p>
             </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-zinc-100 flex justify-center">
           <p className="text-[10px] font-black uppercase tracking-[0.6em] text-zinc-300">© 2024 Berserkers MMA. Stay Lethal.</p>
        </div>
      </footer>
    </div>
  );
}
