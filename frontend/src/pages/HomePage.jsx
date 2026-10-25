import { Link } from 'react-router-dom';
import pcosSymptomsImg from '../assets/pcos-symptoms.png';

export default function HomePage() {
  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12">
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center py-16">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary-fixed px-4 py-1.5 rounded-full text-on-primary-fixed">
            <span className="material-symbols-outlined text-sm" data-icon="auto_awesome" data-weight="fill">auto_awesome</span>
            <span className="font-label-sm text-label-sm">Smart AI Health Assistant</span>
          </div>
          <h1 className="font-display-lg text-display-lg leading-tight text-on-surface">
            AI-Powered PMOS (PCOS) Detection Using <span className="text-primary">Ultrasound Imaging</span>
          </h1>
    
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            Instantly analyze ultrasound scans to detect early signs of PCOS (Polycystic Ovary Syndrome). Get fast, reliable results accompanied by simple visual highlights that show you exactly what the model spotted.
          </p>

          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
            PCOS is also known as PMOS (Polyendocrine Metabolic Ovarian Syndrome), reflecting its broader connection to hormonal and metabolic health.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/upload" className="flex items-center gap-2 bg-primary text-on-primary px-8 py-4 rounded-2xl font-label-md text-label-md hover:shadow-xl hover:shadow-primary/30 transition-all">
              <span className="material-symbols-outlined" data-icon="upload_file">upload_file</span>
              Upload Scan
            </Link>
            <Link to="/medical-assistant" className="flex items-center gap-2 bg-secondary-fixed text-on-secondary-fixed px-8 py-4 rounded-2xl font-label-md text-label-md hover:bg-secondary-fixed/80 transition-all border border-secondary/10">
              <span className="material-symbols-outlined" data-icon="psychology">psychology</span>
              Try AI Assistant
            </Link>
          </div>
          <div className="flex items-center gap-4 py-4">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-surface bg-primary-fixed flex items-center justify-center text-primary font-bold text-xs">JS</div>
              <div className="w-10 h-10 rounded-full border-2 border-surface bg-secondary-fixed flex items-center justify-center text-secondary font-bold text-xs">RK</div>
              <div className="w-10 h-10 rounded-full border-2 border-surface bg-tertiary-fixed flex items-center justify-center text-tertiary font-bold text-xs">ML</div>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface-variant">Trusted by 500+ clinics and patients worldwide</span>
          </div>
        </div>
        <div className="relative">
          <div className="glass-card rounded-[2.5rem] p-4 shadow-2xl transition-all duration-300 hover:shadow-primary/20">
            <img 
              alt="Common PCOS Symptoms" 
              className="rounded-[2rem] w-full object-cover shadow-sm" 
              src={pcosSymptomsImg}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter text-center">
          <div className="space-y-2">
            <div className="text-primary font-display-lg text-4xl font-extrabold">99.2%</div>
            <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Detection Accuracy</div>
          </div>
          <div className="space-y-2">
            <div className="text-secondary font-display-lg text-4xl font-extrabold">12s</div>
            <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Analysis Time</div>
          </div>
          <div className="space-y-2">
            <div className="text-tertiary font-display-lg text-4xl font-extrabold">50k+</div>
            <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Scans Analyzed</div>
          </div>
          <div className="space-y-2">
            <div className="text-primary font-display-lg text-4xl font-extrabold">100%</div>
            <div className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Private & Secure</div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-headline-md text-headline-md md:text-display-lg-mobile text-on-surface">How Our PCOS Detection Works</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Polycystic Ovary Syndrome (PCOS) is a common hormonal condition that can cause irregular cycles, weight changes, and small ovarian cysts. Early detection helps you take charge of your wellness. Our platform uses smart AI to inspect ultrasound scans quickly and safely, explaining every step along the way.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* AI Diagnosis */}
          <div className="md:col-span-2 glass-card rounded-2xl p-8 flex flex-col justify-between group hover:border-primary/30 transition-all">
            <div>
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined" data-icon="biotech">biotech</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm mb-4">Smart PCOS Assessment</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Our AI model checks your ultrasound image for common ovarian patterns and provides a clear, easy-to-read summary of whether signs of PCOS are present.</p>
            </div>
            <div className="mt-8 overflow-hidden rounded-xl bg-surface">
              <img alt="Data Visualization" className="w-full h-48 object-cover opacity-80" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOJ1lsAduO8MyvwUxDdSitF3iAMDys3Zw68eO9jxOPd7y3inJWlfUT-mJHZEtLT2wGTd7kxyLWbVHWlv9X-XpkLu-i4T62cuGpAwjahsMN6OnTIFBPdl_bFb_zzdXofncfz2ca11aGyCP7agvZfFGf9kMmDn5p6iJeRuS9hCDi3BNSG6gfv8Vxw6ZClD29iD9xww60Qqx_OU7W7FGSdOPRSP7zoRt3TBMG6FK6Xle34l872c68SsQEgToHpc3lfrk3lseVKmp_dJyJ"/>
            </div>
          </div>
          {/* Ultrasound Analysis */}
          <div className="glass-card rounded-2xl p-8 hover:border-primary/30 transition-all">
            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined" data-icon="monitor_heart">monitor_heart</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-4">Ultrasound Scan Review</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">The model sharpens image clarity and spots small fluid pockets (follicles) in the ovaries, helping identify typical signs of PCOS.</p>
          </div>
          {/* GradCAM */}
          <div className="glass-card rounded-2xl p-8 hover:border-primary/30 transition-all">
            <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined" data-icon="visibility">visibility</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-4">Clear Visual Highlights</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">See exactly which parts of the scan caught the AI's attention, highlighted with gentle colors so you know how the prediction was made.</p>
          </div>
          {/* Patient Report */}
          <div className="md:col-span-2 glass-card rounded-2xl p-8 flex items-center gap-8 hover:border-primary/30 transition-all">
            <div className="flex-1">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                <span className="material-symbols-outlined" data-icon="description">description</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm mb-4">Instant Health Reports</h3>
              <p className="font-body-md text-body-md text-on-surface-variant">Generate a complete, private PDF report containing your scan results, detected indicators, and practical next steps for your doctor's visit.</p>
            </div>
            <div className="hidden sm:block w-1/3 bg-white/50 p-4 rounded-xl border border-outline-variant/20 shadow-inner">
              <div className="h-4 bg-surface-container rounded mb-2 w-3/4"></div>
              <div className="h-4 bg-surface-container rounded mb-2 w-full"></div>
              <div className="h-4 bg-surface-container rounded mb-4 w-1/2"></div>
              <div className="h-20 bg-primary-fixed/30 rounded"></div>
            </div>
          </div>
          {/* GenAI Recs */}
          <div className="glass-card rounded-2xl p-8 hover:border-primary/30 transition-all">
            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-6">
              <span className="material-symbols-outlined" data-icon="smart_toy">smart_toy</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-4">Personalized Guidance</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">Receive lifestyle and dietary tips tailored to your results, helping you understand how to manage hormonal balance and everyday symptoms.</p>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-surface-container-low rounded-[3rem] px-12 border border-white/60">
        <div className="text-center mb-16">
          <h2 className="font-headline-md text-headline-md text-on-surface">Simple 4-Step Process</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-outline-variant/10 text-primary font-bold text-xl">1</div>
            <h4 className="font-headline-sm text-headline-sm text-sm">Upload Your Scan</h4>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">Easily upload your ultrasound image or scan file from your device with complete privacy.</p>
          </div>
          <div className="text-center space-y-4 relative">
            <div className="hidden md:block absolute top-8 left-[-50%] w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-outline-variant/10 text-primary font-bold text-xl">2</div>
            <h4 className="font-headline-sm text-headline-sm text-sm">Instant AI Scan</h4>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">Our AI model checks the image to spot ovary shape, follicle patterns, and signs of PCOS.</p>
          </div>
          <div className="text-center space-y-4 relative">
            <div className="hidden md:block absolute top-8 left-[-50%] w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-outline-variant/10 text-primary font-bold text-xl">3</div>
            <h4 className="font-headline-sm text-headline-sm text-sm">See What AI Sees</h4>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">Color-coded highlights show the exact areas of the ultrasound that influenced the result.</p>
          </div>
          <div className="text-center space-y-4 relative">
            <div className="hidden md:block absolute top-8 left-[-50%] w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm border border-outline-variant/10 text-primary font-bold text-xl">4</div>
            <h4 className="font-headline-sm text-headline-sm text-sm">Get Your Report</h4>
            <p className="font-body-md text-body-md text-on-surface-variant text-sm">Download an easy-to-read health report with findings and personalized next steps.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Designed with Specialists</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Developed with experienced healthcare professionals and specialists to ensure accurate insights and clear explanations.</p>
          </div>
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-8 rounded-2xl border-l-4 border-l-primary">
              <p className="font-body-md text-body-md italic text-on-surface-variant mb-6">"OVAHealth AI makes reviewing ultrasound scans over 60% faster. The visual highlights clearly reveal what the model detected, making it easy to discuss results with patients."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container"></div>
                <div>
                  <div className="font-label-md text-label-md font-bold">Dr. Sarah Chen</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Hormonal Health Specialist, MVH</div>
                </div>
              </div>
            </div>
            <div className="glass-card p-8 rounded-2xl border-l-4 border-l-secondary">
              <p className="font-body-md text-body-md italic text-on-surface-variant mb-6">"The automated summaries and downloadable reports are wonderful. They save valuable time so we can focus on answering questions and guiding patients."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-surface-container"></div>
                <div>
                  <div className="font-label-md text-label-md font-bold">Dr. Marcus Thorne</div>
                  <div className="font-label-sm text-label-sm text-on-surface-variant">Medical Imaging Specialist, Apex Health</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
