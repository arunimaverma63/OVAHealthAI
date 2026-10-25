import { Link } from 'react-router-dom';

export default function Features() {
  const featureList = [
    {
      id: "usg-analysis",
      icon: "biotech",
      title: "Smart Ultrasound Screening",
      description: "Upload your ovarian ultrasound scan and our system instantly analyzes it to detect signs of PCOS — such as multiple small follicles or enlarged ovaries — with high accuracy.",
      color: "from-primary/20 to-primary/5",
      iconColor: "text-primary",
      borderColor: "group-hover:border-primary/30"
    },
    {
      id: "explainable-ai",
      icon: "visibility",
      title: "See What We Found & Why",
      description: "Our system highlights the exact areas on your ultrasound that show PCOS indicators, and explains the findings in simple, easy-to-read language so both doctors and patients can understand the results.",
      color: "from-secondary/20 to-secondary/5",
      iconColor: "text-secondary",
      borderColor: "group-hover:border-secondary/30"
    },
    {
      id: "chatbot-assistant",
      icon: "psychology",
      title: "AI Health Assistant",
      description: "Chat with our friendly AI assistant to learn about PCOS symptoms, understand your risks, get answers to common questions, and receive personalized lifestyle tips for managing the condition.",
      color: "from-tertiary/20 to-tertiary/5",
      iconColor: "text-tertiary",
      borderColor: "group-hover:border-tertiary/30"
    },
    {
      id: "analytics-dashboard",
      icon: "dashboard",
      title: "Your Health History at a Glance",
      description: "Keep track of all your past scans and results in one place. Monitor changes over time with easy-to-read charts showing how your ovarian health is progressing.",
      color: "from-primary/20 to-primary/5",
      iconColor: "text-primary",
      borderColor: "group-hover:border-primary/30"
    },
    {
      id: "hipaa-security",
      icon: "verified_user",
      title: "Your Data Stays Private & Safe",
      description: "Your health information is fully encrypted and protected. We follow strict medical privacy standards to ensure your personal data is never shared or exposed.",
      color: "from-secondary/20 to-secondary/5",
      iconColor: "text-secondary",
      borderColor: "group-hover:border-secondary/30"
    },
    {
      id: "automated-reporting",
      icon: "description",
      title: "Instant PDF Reports",
      description: "Get a complete, easy-to-understand report of your scan results — including detected PCOS signs, measurements, and recommended next steps — as a downloadable PDF in one click.",
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
          Understanding PCOS
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight text-on-surface">
          Everything You Need to Know About <span className="text-primary">PCOS Detection</span>
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          PCOS (Polycystic Ovary Syndrome) affects 1 in 10 women and can lead to irregular periods, weight gain, acne, and difficulty conceiving. Early detection through ultrasound screening and proper lifestyle changes can help manage symptoms effectively. Here's how our platform helps.
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
          <span className="text-secondary font-label-sm text-label-sm uppercase tracking-wider">How Detection Works</span>
          <h2 className="font-headline-md text-headline-md md:text-3xl text-on-surface">
            How We Detect PCOS From Your Scan
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            When you upload an ultrasound image, our system carefully examines it for common PCOS signs — like the number and arrangement of follicles, ovary size, and tissue patterns. It then creates a clear, visual summary showing exactly which areas were flagged and why, along with a plain-language explanation that both you and your doctor can easily understand.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/upload" className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-label-md text-label-md shadow-lg shadow-primary/20 hover:scale-95 transition-all text-center">
              Upload Your Scan
            </Link>
            <Link to="/how-it-works" className="border border-outline-variant text-on-surface px-8 py-3.5 rounded-full font-label-md text-label-md hover:bg-surface-variant/30 transition-all text-center">
              Learn More
            </Link>
          </div>
        </div>
        <div className="bg-gradient-to-tr from-primary/10 via-secondary/5 to-tertiary/10 p-8 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-outline-variant/20">
          <div className="glass-panel p-6 rounded-2xl w-full max-w-md shadow-lg border border-white/50 space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant/30">
              <span className="font-label-md text-label-md font-bold">Scan Verification</span>
              <span className="bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded text-[10px]">VERIFIED</span>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-primary/10 rounded w-3/4"></div>
              <div className="h-4 bg-surface-container-highest rounded w-full"></div>
              <div className="h-4 bg-surface-container-highest rounded w-5/6"></div>
              <div className="h-4 bg-surface-container-highest rounded w-2/3"></div>
            </div>
            <div className="p-3 bg-secondary/5 border border-secondary/15 rounded-xl text-xs text-secondary italic font-body-sm">
              "Multiple small follicles detected around the ovary edges. Ovarian size slightly above normal range. Recommend follow-up consultation."
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
