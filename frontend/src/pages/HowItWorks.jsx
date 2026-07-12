import { Link } from 'react-router-dom';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Image Upload",
      subtitle: "DICOM, PNG, JPEG Support",
      description: "Upload standard transvaginal or pelvic ultrasound scans directly via the secure portal. The system instantly pre-processes the image, resizing and normalizing pixels for deep learning ingestion.",
      icon: "cloud_upload",
      badge: "Step 1"
    },
    {
      number: "02",
      title: "CNN Computer Vision Analysis",
      subtitle: "Follicle Detection & Counting",
      description: "Our custom CNN models analyze the scan. They detect, count, and measure individual follicle follicles, compute ovarian volume, and highlight peripheral follicle distributions characteristic of PCOS/PMOS.",
      icon: "biotech",
      badge: "Step 2"
    },
    {
      number: "03",
      title: "GradCAM Heatmap Projection",
      subtitle: "Explainable Visual Attention",
      description: "To ensure clinical trust, a GradCAM heatmap is generated. This highlights the exact pixels and structural anomalies (e.g. stromal density) that influenced the AI prediction.",
      icon: "visibility",
      badge: "Step 3"
    },
    {
      number: "04",
      title: "DeepSeek-R1 Clinical Explanation",
      subtitle: "Generative AI Medical Summary",
      description: "The pipeline feeds prediction confidences, follicle sizes, and volume measurements into local DeepSeek-R1. The LLM then writes a natural, structured medical explanation of the diagnostic reasons.",
      icon: "psychology",
      badge: "Step 4"
    },
    {
      number: "05",
      title: "Final Review & Export",
      subtitle: "HIPAA-Compliant Output",
      description: "Healthcare professionals review the visual maps, metric counters, and text summaries on their secure dashboard. Export the complete report as a PDF for medical records.",
      icon: "picture_as_pdf",
      badge: "Step 5"
    }
  ];

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-12 mesh-gradient min-h-screen">
      {/* Title */}
      <section className="text-center max-w-3xl mx-auto mb-16 space-y-6">
        <span className="bg-secondary/15 text-secondary px-4 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
          System Workflow
        </span>
        <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight text-on-surface">
          How the <span className="text-primary">OVAHealth AI</span> Diagnostic Pipeline Works
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
          From raw ultrasound image uploads to secure database persistence and generative text explanations, understand every stage of our explainable PCOS assistant.
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

      {/* Technology Stack Footer */}
      <section className="bg-surface-container-low rounded-[32px] p-8 md:p-12 border border-white/60 shadow-xl max-w-4xl mx-auto">
        <h3 className="font-headline-md text-headline-md text-on-surface mb-8 text-center">
          The Technology Stack
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
              <span className="material-symbols-outlined">code</span>
            </div>
            <h4 className="font-bold text-on-surface">Spring Boot 3.5</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">Secure REST APIs, database transaction mappings, and OAuth2 security routing.</p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto text-secondary">
              <span className="material-symbols-outlined">settings_suggest</span>
            </div>
            <h4 className="font-bold text-on-surface">TensorFlow & FastAPI</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">Runs standard deep learning computer vision model inference on USG scan images.</p>
          </div>
          <div className="space-y-3">
            <div className="w-12 h-12 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto text-tertiary">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <h4 className="font-bold text-on-surface">DeepSeek-R1 (Local LLM)</h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">Generates context-aware, highly personalized medical explanations and risk profiles.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
