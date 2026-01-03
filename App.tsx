
import React, { useState, useRef } from 'react';
import { Section, PortfolioItem } from './types';
import { PORTFOLIO_DATA } from './constants';
import Modal from './components/Modal';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<Section>(Section.Home);
  const [selectedMedia, setSelectedMedia] = useState<PortfolioItem | null>(null);
  
  const navigateTo = (section: Section) => {
    setActiveSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderHome = () => (
    <div className="min-h-screen flex flex-col items-center justify-center relative bg-white">
      <nav className="flex flex-col items-center space-y-6 md:space-y-8 z-10">
        {[
          { label: 'About Me', section: Section.About },
          { label: 'Ils aiment mes démons', section: Section.Demons },
          { label: 'Fashion Design', section: Section.Fashion },
          { label: 'Graphic Design', section: Section.Graphic },
          { label: 'Music Industry', section: Section.Music }
        ].map((item) => (
          <button 
            key={item.section}
            onClick={() => navigateTo(item.section)} 
            className="text-xl md:text-4xl font-light tracking-tight uppercase hover:italic transition-all duration-700 playfair text-black/80 hover:text-black"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-12 left-12 text-[9px] tracking-[0.4em] uppercase opacity-30 font-light">
        Portfolio / 22—25
      </div>

      <button 
        onClick={() => navigateTo(Section.Contact)}
        className="absolute bottom-12 right-12 text-[10px] tracking-widest uppercase hover:opacity-50 transition-opacity"
      >
        Contact →
      </button>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen px-6 py-32 md:px-32 flex flex-col items-center animate-fadeIn bg-white">
      <header className="w-full max-w-4xl mb-32">
        <button onClick={() => navigateTo(Section.Home)} className="text-[10px] tracking-widest uppercase mb-16 opacity-40 hover:opacity-100 transition-opacity">Back</button>
        <h1 className="text-5xl md:text-8xl playfair font-light mb-16 italic tracking-tight">The Profile</h1>
      </header>
      <div className="max-w-xl w-full text-base md:text-lg font-light leading-relaxed space-y-12 text-black/70">
        <p>
          Exploring the silent space between aesthetics and utility. My practice is a pursuit of essentialism within the realms of fashion and visual identity.
        </p>
        <p>
          Focusing on structural purity and digital nuance, I create for the discerning eye. Currently operating between creative hubs, developing narratives that prioritize silence over noise.
        </p>
      </div>
    </div>
  );

  const renderDemons = () => {
    const images = PORTFOLIO_DATA.filter(item => item.category === 'demons');
    return (
      <div className="min-h-screen px-6 py-32 md:px-32 flex flex-col items-center animate-fadeIn bg-white">
        <header className="w-full max-w-6xl mb-32 text-center">
          <button onClick={() => navigateTo(Section.Home)} className="text-[10px] tracking-widest uppercase mb-16 opacity-40 hover:opacity-100 transition-opacity">Back</button>
          <h1 className="text-4xl md:text-6xl playfair font-light uppercase tracking-tighter mb-4">Ils aiment mes démons</h1>
          <p className="text-[10px] tracking-[0.6em] uppercase opacity-30">Brand Ethos</p>
        </header>

        <section className="max-w-2xl w-full mb-48">
          <p className="text-lg font-light leading-relaxed text-center text-black/60 italic">
            "An exploration of the inherent duality in human nature. Refined, dark, and essential."
          </p>
        </section>

        <section className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-24">
          {images.map(item => (
            <div 
              key={item.id} 
              className="group cursor-crosshair"
              onClick={() => setSelectedMedia(item)}
            >
              <div className="aspect-[2/3] overflow-hidden bg-neutral-50 border border-neutral-100">
                <img src={item.url} alt={item.description} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </div>
              <p className="mt-6 text-[9px] tracking-widest uppercase opacity-0 group-hover:opacity-40 transition-opacity text-center">{item.description}</p>
            </div>
          ))}
        </section>
      </div>
    );
  };

  const renderFashion = () => {
    const corrupted = PORTFOLIO_DATA.filter(item => item.subcategory === 'Corrupted Era');
    const yuna = PORTFOLIO_DATA.filter(item => item.subcategory === 'Yüna');
    
    return (
      <div className="min-h-screen px-6 py-32 md:px-32 flex flex-col items-center animate-fadeIn bg-white">
        <header className="w-full max-w-6xl mb-48">
          <button onClick={() => navigateTo(Section.Home)} className="text-[10px] tracking-widest uppercase mb-16 opacity-40 hover:opacity-100 transition-opacity">Back</button>
          <h1 className="text-5xl md:text-9xl playfair font-light uppercase tracking-tighter text-right leading-none">Fashion</h1>
        </header>

        <div className="w-full max-w-6xl space-y-64">
          <section>
            <h2 className="text-2xl md:text-4xl font-light mb-16 border-b border-neutral-100 pb-8 uppercase tracking-widest">Corrupted Era</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {corrupted.map(item => (
                <div key={item.id} className="cursor-pointer group" onClick={() => setSelectedMedia(item)}>
                  <div className="aspect-[3/4] overflow-hidden bg-neutral-50 mb-6">
                    <img src={item.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  </div>
                  <p className="text-[9px] tracking-widest uppercase opacity-30 group-hover:opacity-100 transition-opacity">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-4xl font-light mb-16 border-b border-neutral-100 pb-8 uppercase tracking-widest text-right">Yüna</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl ml-auto">
              {yuna.map(item => (
                <div key={item.id} className="cursor-pointer group" onClick={() => setSelectedMedia(item)}>
                  <div className="aspect-square overflow-hidden bg-neutral-50 mb-6">
                    <img src={item.url} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                  </div>
                  <p className="text-[9px] tracking-widest uppercase opacity-30 group-hover:opacity-100 transition-opacity">{item.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  };

  const renderGraphic = () => {
    const items = PORTFOLIO_DATA.filter(item => item.category === 'graphic');
    return (
      <div className="min-h-screen px-6 py-32 md:px-32 flex flex-col items-center animate-fadeIn bg-white">
        <header className="w-full max-w-7xl mb-48 text-center">
          <button onClick={() => navigateTo(Section.Home)} className="text-[10px] tracking-widest uppercase mb-16 opacity-40 hover:opacity-100 transition-opacity">Back</button>
          <h1 className="text-5xl md:text-8xl playfair font-light uppercase tracking-tighter italic">Graphic Design</h1>
        </header>

        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-24">
          {items.map((item, idx) => (
            <div 
              key={item.id} 
              className={`cursor-pointer group ${idx % 2 === 1 ? 'md:mt-32' : ''}`}
              onClick={() => setSelectedMedia(item)}
            >
              <div className="overflow-hidden bg-neutral-50 mb-8 p-12 border border-neutral-50 group-hover:border-neutral-200 transition-colors duration-700">
                <img src={item.url} className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 shadow-sm" />
              </div>
              <p className="text-[10px] tracking-widest uppercase opacity-40 text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMusic = () => {
    const zola = PORTFOLIO_DATA.filter(item => item.subcategory === 'Zola');
    const jayb = PORTFOLIO_DATA.filter(item => item.subcategory === 'JayB');
    
    return (
      <div className="min-h-screen px-6 py-32 md:px-32 flex flex-col animate-fadeIn bg-white">
        <header className="mb-48">
          <button onClick={() => navigateTo(Section.Home)} className="text-[10px] tracking-widest uppercase mb-16 opacity-40 hover:opacity-100 transition-opacity">Back</button>
          <h1 className="text-4xl md:text-6xl font-light tracking-[0.3em] uppercase opacity-80">Industry</h1>
        </header>

        <div className="space-y-80">
          <section className="flex flex-col md:flex-row gap-24 items-start">
             <div className="w-full md:w-1/2">
                <h2 className="text-5xl md:text-7xl font-light italic mb-12 playfair">Zola</h2>
                {zola.map(item => (
                  <div key={item.id} className="cursor-pointer group" onClick={() => setSelectedMedia(item)}>
                    <img src={item.url} className="w-full max-w-md grayscale transition-all duration-1000 group-hover:grayscale-0" />
                    <p className="mt-8 text-[9px] tracking-widest uppercase opacity-40">{item.description}</p>
                  </div>
                ))}
             </div>
             <div className="w-full md:w-1/2 md:pt-32">
                <p className="max-w-sm text-sm font-light leading-relaxed text-black/50">
                  Visual consulting and photographic documentation for premium industry movements.
                </p>
             </div>
          </section>

          <section className="flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-light uppercase tracking-widest mb-16">MojixSboy</h2>
            <div className="w-full max-w-5xl aspect-video bg-neutral-50 border border-neutral-100 flex items-center justify-center cursor-pointer group overflow-hidden">
               <div className="w-px h-12 bg-black/10 group-hover:h-24 transition-all duration-700" />
               <span className="text-[9px] tracking-[1.5em] uppercase opacity-20 group-hover:opacity-100 transition-opacity ml-4">Motion Fragment</span>
            </div>
          </section>

          <section className="flex flex-col md:flex-row-reverse gap-24">
            <div className="w-full md:w-1/3">
              <h2 className="text-4xl playfair mb-12 italic">JayB</h2>
              <p className="text-xs tracking-widest leading-loose opacity-40 uppercase">Zenith Campaign / 2024</p>
            </div>
            <div className="w-full md:w-2/3 grid grid-cols-2 gap-8">
              {jayb.map(item => (
                <div key={item.id} className="cursor-pointer group" onClick={() => setSelectedMedia(item)}>
                  <img src={item.url} className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    );
  };

  const renderContact = () => (
    <div className="min-h-screen px-6 py-32 md:px-32 flex flex-col items-center justify-center animate-fadeIn bg-white">
      <header className="w-full max-w-4xl text-center mb-48">
        <button onClick={() => navigateTo(Section.Home)} className="text-[10px] tracking-widest uppercase mb-16 opacity-40 hover:opacity-100 transition-opacity inline-block">Home</button>
        <h1 className="text-6xl md:text-9xl playfair italic font-light mb-8 tracking-tighter">Inquiry</h1>
        <p className="text-[10px] tracking-[0.4em] uppercase opacity-30">Current Availability: Open</p>
      </header>

      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-32">
        <div className="space-y-16">
           <div>
             <h3 className="text-[9px] tracking-widest uppercase opacity-30 mb-6">Direction</h3>
             <a href="mailto:studio@minimal.com" className="text-xl font-light hover:italic transition-all border-b border-black/5 pb-2">studio@minimal.com</a>
           </div>
           <div>
             <h3 className="text-[9px] tracking-widest uppercase opacity-30 mb-6">Presence</h3>
             <div className="flex flex-col space-y-4">
               {['Instagram', 'LinkedIn', 'Behance'].map(link => (
                 <a key={link} href="#" className="text-base font-light hover:tracking-widest transition-all opacity-60 hover:opacity-100">{link}</a>
               ))}
             </div>
           </div>
        </div>

        <form className="flex flex-col space-y-12" onSubmit={(e) => { e.preventDefault(); alert('Message sent.'); }}>
          <div className="relative">
            <input 
              type="email" 
              placeholder="Email Address" 
              className="w-full bg-transparent border-b border-neutral-100 py-4 focus:outline-none focus:border-black transition-colors placeholder:uppercase placeholder:text-[9px] placeholder:tracking-widest font-light"
              required
            />
          </div>
          <div className="relative">
            <textarea 
              placeholder="Message" 
              rows={3}
              className="w-full bg-transparent border-b border-neutral-100 py-4 focus:outline-none focus:border-black transition-colors placeholder:uppercase placeholder:text-[9px] placeholder:tracking-widest resize-none font-light"
              required
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="text-left text-[10px] tracking-widest uppercase py-6 opacity-40 hover:opacity-100 transition-opacity"
          >
            Send Message →
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="bg-white text-black min-h-screen selection:bg-black selection:text-white">
      <main>
        {activeSection === Section.Home && renderHome()}
        {activeSection === Section.About && renderAbout()}
        {activeSection === Section.Demons && renderDemons()}
        {activeSection === Section.Fashion && renderFashion()}
        {activeSection === Section.Graphic && renderGraphic()}
        {activeSection === Section.Music && renderMusic()}
        {activeSection === Section.Contact && renderContact()}
      </main>

      <Modal 
        item={selectedMedia} 
        onClose={() => setSelectedMedia(null)} 
      />
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
