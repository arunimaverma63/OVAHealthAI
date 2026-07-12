import { Link } from 'react-router-dom';

export default function Features() {
  const featureList = [
    {
      id: "usg-analysis",
      icon: "biotech",
      title: "Dual-Model AI Diagnostics",
      description: "Combines a custom Convolutional Neural Network (CNN) for high-precision follicle detection on ultrasound scans with an XGBoost classifier for patient clinical and metabolic indicators.",
      color: "from-primary/20 to-primary/5",
      iconColor: "text-primary",
      borderColor: "group-hover:border-primary/30"
    },
    {
      id: "explainable-ai",
      icon: "visibility",
      title: "Explainable AI (XAI) Visuals",
      description: "Generates GradCAM attention maps showing exactly where the neural network is looking. Integrates DeepSeek-R1 to translate visual model inferences into natural language explanations.",
      color: "from-secondary/20 to-secondary/5",
      iconColor: "text-secondary",
      borderColor: "group-hover:border-secondary/30"
    },
    {
      id: "chatbot-assistant",
      icon: "psychology",
      title: "AI Medical Assistant",
      description: "An interactive, context-aware chatbot trained on the latest clinical endocrinology papers. Helps patients understand symptoms, risks, and provides tailored lifestyle paths.",
      color: "from-tertiary/20 to-tertiary/5",
      iconColor: "text-tertiary",
      borderColor: "group-hover:border-tertiary/30"
    },
    {
      id: "analytics-dashboard",
      icon: "dashboard",
      title: "Analytics & History",
      description: "Track patient scans, detection trends, positive vs negative metrics, and historical logs. Visualize follicle size distribution and ovarian volume changes over time.",
      color: "from-primary/20 to-primary/5",
      iconColor: "text-primary",
      borderColor: "group-hover:border-primary/30"
    },
    {
      id: "hipaa-security",
      icon: "verified_user",
      title: "HIPAA Compliant Security",
      description: "Data encryption in transit and at rest. Multi-layer access controls ensure patient health records are kept secure, private, and fully compliant with medical regulations.",
      color: "from-secondary/20 to-secondary/5",
      iconColor: "text-secondary",
      borderColor: "group-hover:border-secondary/30"
    },
    {
      id: "automated-reporting",
      icon: "description",
      title: "Automated Reports",
      description: "Generate and export comprehensive reports containing detected follicles, volume measurements, patient details, and AI findings in PDF format with a single click.",
      color: "from-tertiary/20 to-tertiary/5",
      iconColor: "text-tertiary",
      borderColor: "group-hover:border-tertiary/30"
    }
  ];

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 mesh-gradient min-h-screen">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
          Diagnostic Excellence
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight text-on-surface">
          Advanced AI Tools Built for <span className="text-primary">Ovarian Health</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          Explore the integrated technologies powering OVAHealth AI to deliver clinical-grade accuracy, explanation transparency, and personalized patient care pathways.
        </p>
      </section>

      {/* Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {featureList.map((feature) => (
          <div 
            key={feature.id} 
            className="group bg-surface-container-lowest p-8 rounded-3xl border border-outline-variant/20 shadow-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02] flex flex-col justify-between"
          >
            <div>
              <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                <span className={`material-symbols-outlined ${feature.iconColor} text-3xl`}>
                  {feature.icon}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {feature.description}
              </p>
            </div>
            <div className="mt-8 flex items-center text-primary font-label-md text-label-md hover:gap-2 transition-all cursor-pointer">
              <span>Learn more</span>
              <span className="material-symbols-outlined text-sm ml-1">arrow_forward</span>
            </div>
          </div>
        ))}
      </section>

      {/* Deep Dive Highlight */}
      <section className="glass-card rounded-[32px] overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-white/40 mb-20 shadow-xl">
        <div className="p-8 md:p-12 flex flex-col justify-center space-y-6">
          <span className="text-secondary font-label-sm text-label-sm uppercase tracking-wider">Explainability Focus</span>
          <h2 className="font-headline-md text-headline-md md:text-3xl text-on-surface">
            How DeepSeek-R1 Explains Diagnostics
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Our diagnostic pipeline uses a state-of-the-art Generative AI model to analyze classification scores and follicle attributes from ultrasound scans, synthesizing a structured clinical report. This process provides doctors and patients with detailed insights into the exact morphological features contributing to the result.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/upload" className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-label-md text-label-md shadow-lg shadow-primary/20 hover:scale-95 transition-all text-center">
              Try Scanner
            </Link>
            <Link to="/how-it-works" className="border border-outline-variant text-on-surface px-8 py-3.5 rounded-full font-label-md text-label-md hover:bg-surface-variant/30 transition-all text-center">
              See How It Works
            </Link>
          </div>
        </div>
        <div className="bg-gradient-to-tr from-primary/10 via-secondary/5 to-tertiary/10 p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-outline-variant/20">
          <div className="glass-panel p-6 rounded-2xl w-full max-w-md shadow-lg border border-white/50 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
              <span className="font-label-md text-label-md font-bold">GradCAM Verification</span>
              <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded text-[10px]">VERIFIED</span>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-primary/10 rounded w-3/4"></div>
              <div className="h-4 bg-surface-container-highest rounded w-full"></div>
              <div className="h-4 bg-surface-container-highest rounded w-5/6"></div>
              <div className="h-4 bg-surface-container-highest rounded w-2/3"></div>
            </div>
            <div className="p-3 bg-secondary/5 border border-secondary/15 rounded-xl text-xs text-secondary italic font-body-sm">
              "Follicular chain identified in peripheral layout. Attention map shows high correlation on stroma thickness."
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
