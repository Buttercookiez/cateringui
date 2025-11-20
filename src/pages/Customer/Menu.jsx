// src/pages/Customer/Menu.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Download, Leaf, Wheat, Star 
} from 'lucide-react';
import Navbar from '../../components/customer/Navbar';
import Footer from '../../components/customer/Footer';

// --- Reusing Minimalist Animation Wrapper ---
const FadeIn = ({ children, delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const translateClass = direction === 'up' ? 'translate-y-10' : 'translate-x-0';

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : `opacity-0 ${translateClass}`
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Menu = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  // --- Theme Logic ---
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.backgroundColor = '#0c0c0c';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '#FAFAFA';
    }
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const theme = {
    bg: darkMode ? 'bg-[#0c0c0c]' : 'bg-[#FAFAFA]',
    cardBg: darkMode ? 'bg-[#111]' : 'bg-white',
    text: darkMode ? 'text-stone-200' : 'text-stone-900',
    subText: darkMode ? 'text-stone-400' : 'text-stone-500',
    border: darkMode ? 'border-stone-800' : 'border-stone-200',
    accent: 'text-[#C9A25D]',
    accentBg: 'bg-[#C9A25D]',
  };

  // --- Mock Data ---
  const categories = ["All", "Appetizers", "Entrées", "Sides", "Desserts", "Cocktails"];
  
  const menuItems = [
    {
      id: 1,
      category: "Appetizers",
      name: "Truffle Arancini",
      description: "Wild mushroom risotto, white truffle oil, parmesan crisp.",
      tags: ["v"],
      price: "Start"
    },
    {
      id: 2,
      category: "Appetizers",
      name: "Hokkaido Scallop Crudo",
      description: "Yuzu vinaigrette, shaved radish, micro cilantro, chili oil.",
      tags: ["gf"],
      price: "Cold"
    },
    {
      id: 3,
      category: "Entrées",
      name: "24-Hour Short Rib",
      description: "Braised angus beef, pomme purée, glazed heirloom carrots, red wine reduction.",
      tags: ["gf"],
      price: "Sig"
    },
    {
      id: 4,
      category: "Entrées",
      name: "Miso Glazed Black Cod",
      description: "Sustainably sourced cod, bok choy, ginger dashi broth.",
      tags: ["pesc"],
      price: "Sea"
    },
    {
      id: 5,
      category: "Entrées",
      name: "Wild Mushroom Wellington",
      description: "Portobello, spinach, chestnut farce, puff pastry, thyme jus.",
      tags: ["v", "vg"],
      price: "Earth"
    },
    {
      id: 6,
      category: "Desserts",
      name: "Dark Chocolate Ganache",
      description: "70% Valrhona chocolate, sea salt, raspberry coulis, gold leaf.",
      tags: ["v"],
      price: "Sweet"
    },
    {
      id: 7,
      category: "Cocktails",
      name: "The Gilded Old Fashioned",
      description: "Japanese whisky, smoked maple syrup, angostura, orange peel.",
      tags: [],
      price: "Bar"
    },
     {
      id: 8,
      category: "Sides",
      name: "Charred Broccolini",
      description: "Garlic confit, lemon zest, toasted almonds.",
      tags: ["vg", "gf"],
      price: "Side"
    }
  ];

  const filteredItems = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <div className={`font-sans antialiased min-h-screen transition-colors duration-500 ${theme.bg} ${theme.text} selection:bg-[#C9A25D] selection:text-white`}>
      
      {/* Add CSS to hide scrollbar for cleaner look */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} isScrolled={isScrolled} />

      {/* --- Hero Section --- */}
      <header className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden flex flex-col justify-center items-center bg-stone-900">
        <div className="absolute inset-0">
            <img 
                src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="Plating Art"
                className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-6">
            <FadeIn>
                <span className={`${theme.accent} text-xs tracking-[0.3em] uppercase font-medium mb-4 block`}>
                    Season 2025
                </span>
                <h1 className="font-serif text-5xl md:text-7xl text-white font-thin tracking-tight">
                    Culinary Collections
                </h1>
            </FadeIn>
        </div>
      </header>

      {/* --- Category Navigation (Responsive) --- */}
      <section className={`sticky top-[70px] z-40 py-4 md:py-6 border-b ${theme.border} ${theme.bg}/95 backdrop-blur-md transition-colors duration-500`}>
        <div className="max-w-screen-xl mx-auto px-0 md:px-6">
            {/* 
              Responsive Container:
              - 'overflow-x-auto': Allows scrolling on mobile
              - 'no-scrollbar': Hides ugly scrollbars (via custom CSS above)
              - 'px-6': Adds padding so first/last items aren't cut off
            */}
            <div className="overflow-x-auto no-scrollbar px-6">
                <div className="flex justify-start md:justify-center items-center gap-6 md:gap-12 min-w-max">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-xs md:text-sm tracking-[0.2em] uppercase transition-all duration-300 pb-1 border-b-2 whitespace-nowrap ${
                                activeCategory === cat 
                                ? `text-[#C9A25D] border-[#C9A25D]` 
                                : `${theme.subText} border-transparent hover:${theme.text}`
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* --- Menu Grid --- */}
      <section className={`py-20 md:py-32 ${theme.bg} transition-colors duration-500 min-h-screen`}>
        <div className="max-w-screen-lg mx-auto px-6">
            
            {filteredItems.length === 0 && (
                <div className="text-center py-20">
                    <p className={theme.subText}>No items found in this category.</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                {filteredItems.map((item, idx) => (
                    <FadeIn key={item.id} delay={idx * 50}>
                        <div className="group">
                            <div className="flex justify-between items-baseline mb-2">
                                <h3 className={`font-serif text-2xl md:text-3xl ${theme.text} group-hover:text-[#C9A25D] transition-colors duration-300`}>
                                    {item.name}
                                </h3>
                                {/* Dots Leader */}
                                <div className={`flex-grow mx-4 border-b border-dotted ${darkMode ? 'border-stone-700' : 'border-stone-300'} opacity-50 relative -top-1`}></div>
                                <span className={`font-sans text-xs font-medium tracking-wider uppercase ${theme.subText}`}>
                                    {item.price}
                                </span>
                            </div>
                            
                            <p className={`${theme.subText} font-light text-sm leading-relaxed mb-3`}>
                                {item.description}
                            </p>

                            <div className="flex gap-3">
                                {item.tags.includes('v') && (
                                    <span title="Vegetarian" className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-green-600/70">
                                        <Leaf className="w-3 h-3" /> Veg
                                    </span>
                                )}
                                {item.tags.includes('gf') && (
                                    <span title="Gluten Free" className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-amber-600/70">
                                        <Wheat className="w-3 h-3" /> GF
                                    </span>
                                )}
                            </div>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </div>
      </section>

      {/* --- Seasonal Highlight --- */}
      <section className="relative py-32 bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('https://images.pexels.com/photos/5638268/pexels-photo-5638268.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 max-w-screen-md mx-auto px-6 text-center text-white">
            <FadeIn>
                <Star className="w-8 h-8 text-[#C9A25D] mx-auto mb-6" />
                <h2 className="font-serif text-4xl md:text-6xl mb-6">Chef's Table Experience</h2>
                <p className="font-light text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
                    An intimate 7-course tasting menu featuring rare ingredients and wine pairings, 
                    hosted exclusively in our private dining room or your home.
                </p>
                <button className="bg-[#C9A25D] text-white px-10 py-4 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-stone-900 transition-all duration-300">
                    Inquire Availability
                </button>
            </FadeIn>
        </div>
      </section>

      {/* --- Download CTA --- */}
      <section className={`py-20 ${theme.cardBg} border-t ${theme.border} transition-colors duration-500`}>
        <div className="max-w-screen-md mx-auto px-6 text-center">
            <FadeIn>
                <h3 className={`font-serif text-3xl ${theme.text} mb-4`}>Planning an Event?</h3>
                <p className={`${theme.subText} mb-8 font-light`}>
                    Download our full pricing guide and seasonal packages catalog.
                </p>
                
                <div className="flex flex-col md:flex-row justify-center gap-4">
                    <button className={`flex items-center justify-center gap-3 px-8 py-4 border ${theme.border} ${theme.text} hover:border-[#C9A25D] hover:text-[#C9A25D] transition-all duration-300 uppercase text-xs tracking-widest`}>
                        <Download className="w-4 h-4" />
                        Wedding Packages
                    </button>
                    <button className={`flex items-center justify-center gap-3 px-8 py-4 border ${theme.border} ${theme.text} hover:border-[#C9A25D] hover:text-[#C9A25D] transition-all duration-300 uppercase text-xs tracking-widest`}>
                        <Download className="w-4 h-4" />
                        Corporate Menu
                    </button>
                </div>
            </FadeIn>
        </div>
      </section>

      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Menu;