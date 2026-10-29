import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Pelvic Ultrasound Upload",
      subtitle: "Capturing Ovarian Imaging",
      description: "You or your healthcare provider upload a standard pelvic or transvaginal ultrasound image. The system optimizes scan contrast and clarity so delicate anatomical boundaries, reproductive tissues, and ovarian structures are clearly visible for analysis.",
      icon: "cloud_upload",
      badge: "Step 1"
    },
    {
      number: "02",
      title: "Follicle & Tissue Analysis",
      subtitle: "Examining Ovarian Morphology",
      description: "The system inspects key anatomical indicators of the ovary. In Polycystic Ovary Syndrome (PCOS), ovaries frequently develop an increased number of small, immature egg sacs (follicles). The system calculates the total follicle count, measures individual follicle diameters, and assesses overall ovarian volume.",
      icon: "biotech",
      badge: "Step 2"
    },
    {
      number: "03",
      title: "Anatomical Landmark Mapping",
      subtitle: "Clear Visual Verification",
      description: "Rather than providing an unexplained score, the system highlights the exact biological areas of concern directly on your scan. It pinpoints peripheral follicle arrangements (the classic 'string-of-pearls' pattern) and central tissue density so you and your doctor can see the physical evidence.",
      icon: "visibility",
      badge: "Step 3"
    },
    {
      number: "04",
      title: "Personalized Clinical Interpretation",
      subtitle: "Understandable Medical Summary",
      description: "Complex ultrasound measurements are translated into plain, compassionate medical language. The report clearly outlines what the follicle counts, ovarian dimensions, and symmetry suggest regarding hormonal balance and ovulatory health.",
      icon: "psychology",
      badge: "Step 4"
    },
    {
      number: "05",
      title: "Comprehensive Report & Doctor Review",
      subtitle: "Ready for Your Care Team",
      description: "A complete diagnostic summary is generated, combining your highlighted scan, anatomical measurements, and clinical observations. You can easily download or print this report to review directly with your gynecologist or specialist to discuss personalized care.",
      icon: "assignment_turned_in",
      badge: "Step 5"
    }
  ];

  const clinicalMarkers = [
    {
      title: "Peripheral Follicle Distribution",
      tagline: "\"String of Pearls\" Sign",
      icon: "bubble_chart",
      description: "In PCOS, multiple small follicles (typically 2 to 9 mm in diameter) frequently arrange along the outer rim of the ovary like a pearl necklace, indicating paused follicle maturation."
    },
    {
      title: "Ovarian Volume & Dimensions",
      tagline: "Enlarged Ovarian Profile",
      icon: "straighten",
      description: "Healthy ovaries typically measure under 10 cm³ (or 10 mL). Ovaries influenced by elevated hormones often show increased overall volume and noticeable fullness."
    },
    {
      title: "Central Stromal Density",
      tagline: "Dense Core Tissue",
      icon: "grain",
      description: "The central connective tissue (ovarian stroma) often appears brighter and denser on an ultrasound scan due to sustained androgenic and endocrine stimulation."
    }
  ];

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 mesh-gradient min-h-screen">
      {/* Title */}
      <section className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <span className="bg-secondary/15 text-secondary px-4 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
          Clinical Screening Process
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight text-on-surface">
          How <span className="text-primary">OVAHealth AI</span> Evaluates Your Ultrasound Scan
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Learn how our clinical screening assistant examines ovarian anatomy, measures key biological markers, and translates complex medical ultrasound imaging into clear, understandable health insights.
        </p>
      </section>

      {/* Interactive Vertical Timeline */}
      <section className="relative max-w-4xl mx-auto mb-24">
        {/* Central Connecting Line */}
        <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary via-secondary to-tertiary"></div>

        <div className="space-y-16">
          {steps.map((step, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={step.number} 
                className={`relative flex flex-col md:flex-row items-start ${isEven ? 'md:flex-row-reverse' : ''} gap-8 md:gap-0`}
              >
                {/* Content Card (Left or Right depending on alternating) */}
                <div className="w-full md:w-[45%] pl-12 md:pl-0">
                  <div className="glass-card p-8 rounded-3xl border border-white/30 hover:border-primary/20 shadow-md hover:shadow-lg transition-all duration-300 group">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold font-label-sm">
                      {step.badge}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mt-4 mb-1">
                      {step.title}
                    </h3>
                    <p className="font-label-sm text-label-sm text-primary font-bold mb-3 uppercase tracking-wider">
                      {step.subtitle}
                    </p>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Center Node (Always in center) */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-1.5 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white dark:bg-surface-container rounded-full border-4 border-primary flex items-center justify-center shadow-md shrink-0 z-10">
                    <span className="material-symbols-outlined text-primary text-xl">
                      {step.icon}
                    </span>
                  </div>
                </div>

                {/* Empty block on the opposite side to maintain layout structure */}
                <div className="hidden md:block w-[45%]"></div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Scientific Foundations: Key Biological Markers We Screen For */}
      <section className="bg-surface-container-low rounded-[32px] p-8 md:p-12 border border-white/60 shadow-xl max-w-4xl mx-auto mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-primary font-label-sm text-label-sm uppercase tracking-wider font-bold">
            Medical Foundations
          </span>
          <h3 className="font-headline-md text-headline-md text-on-surface">
            Key Biological Markers We Screen For
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Our assessment aligns with established clinical guidelines (such as the international Rotterdam Criteria), focusing on three primary ultrasound characteristics of polycystic ovaries:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clinicalMarkers.map((marker, idx) => (
            <div 
              key={idx} 
              className="bg-surface/80 p-6 rounded-2xl border border-outline-variant/30 hover:border-primary/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 text-primary">
                  <span className="material-symbols-outlined text-2xl">{marker.icon}</span>
                </div>
                <h4 className="font-bold text-on-surface text-base mb-1">{marker.title}</h4>
                <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-3">{marker.tagline}</p>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {marker.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Empowering Doctor & Patient Collaboration */}
      <section className="max-w-4xl mx-auto glass-card rounded-3xl p-8 md:p-10 border border-primary/20 text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-sm">health_and_safety</span>
          Empowering Your Health Journey
        </div>
        <h3 className="font-headline-md text-headline-md text-on-surface max-w-xl mx-auto">
          Clear Insights to Discuss With Your Doctor
        </h3>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          OVAHealth AI is an educational screening aid created to make ultrasound imaging transparent and understandable. Our reports are designed to help you have informed, confident conversations with your gynecologist or endocrinologist.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link 
            to="/upload" 
            className="flex items-center gap-2 bg-primary text-on-primary px-7 py-3.5 rounded-full font-label-md text-label-md shadow-lg shadow-primary/20 hover:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-sm">upload_file</span>
            Upload Scan for Evaluation
          </Link>
          <Link 
            to="/medical-assistant" 
            className="flex items-center gap-2 border border-outline-variant text-on-surface px-7 py-3.5 rounded-full font-label-md text-label-md hover:bg-surface-variant/30 transition-all"
          >
            <span className="material-symbols-outlined text-sm">psychology</span>
            Ask AI Health Assistant
          </Link>
        </div>
      </section>
    </main>
  );
}
