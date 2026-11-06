import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-bold border-b-2 border-primary pb-1 font-label-md text-label-md"
      : "text-on-surface-variant hover:text-primary transition-colors duration-200 font-label-md text-label-md";

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-bold py-2 border-l-4 border-primary pl-3 font-label-md text-label-md bg-primary/5 rounded-r-lg"
      : "text-on-surface-variant hover:text-primary py-2 pl-4 transition-colors font-label-md text-label-md";

  return (
    <nav className="sticky top-0 w-full z-50 px-margin-desktop py-4 max-w-container-max mx-auto bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-xl border-b border-white/40 dark:border-outline-variant/20 shadow-sm shadow-primary/5">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-3xl">clinical_notes</span>
          <span className="font-headline-md text-headline-md font-bold text-primary">OVAHealth AI</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <NavLink className={linkClass} to="/" end>Home</NavLink>
          <NavLink className={linkClass} to="/features">Features</NavLink>
          <NavLink className={linkClass} to="/how-it-works">How it Works</NavLink>
          <NavLink className={linkClass} to="/dashboard">Insights</NavLink>
          <NavLink className={linkClass} to="/what-is-pcos">What is PCOS</NavLink>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Link to="/login" className="bg-primary text-on-primary px-6 py-2 rounded-full font-label-md text-label-md hover:scale-95 transition-transform active:scale-90 shadow-lg shadow-primary/20">
            Login
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-xl text-on-surface-variant hover:text-primary hover:bg-surface-container"
          aria-label="Toggle menu"
        >
          <span className="material-symbols-outlined text-2xl">
            {mobileMenuOpen ? 'close' : 'menu'}
          </span>
        </button>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-outline-variant/20 mt-3 flex flex-col gap-2">
          <NavLink className={mobileLinkClass} to="/" end onClick={() => setMobileMenuOpen(false)}>Home</NavLink>
          <NavLink className={mobileLinkClass} to="/features" onClick={() => setMobileMenuOpen(false)}>Features</NavLink>
          <NavLink className={mobileLinkClass} to="/how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</NavLink>
          <NavLink className={mobileLinkClass} to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Insights</NavLink>
          <NavLink className={mobileLinkClass} to="/what-is-pcos" onClick={() => setMobileMenuOpen(false)}>What is PCOS</NavLink>
          <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="bg-primary text-on-primary text-center mt-2 px-6 py-2.5 rounded-full font-label-md text-label-md">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
