import { useState } from 'react';
import { Link } from 'react-router-dom';
import pcosSymptomsImg from '../assets/pcos-symptoms.png';

export default function WhatIsPcos() {
  const [activeTab, setActiveTab] = useState('insulin');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFaq, setOpenFaq] = useState(null);
  
  // Interactive Symptom Checker State
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const toggleSymptom = (id) => {
    if (selectedSymptoms.includes(id)) {
      setSelectedSymptoms(selectedSymptoms.filter(item => item !== id));
    } else {
      setSelectedSymptoms([...selectedSymptoms, id]);
    }
  };

  const symptomChecklist = [
    { id: 'irregular_cycles', text: 'Irregular, delayed (>35 days), or absent menstrual periods', category: 'cycle' },
    { id: 'heavy_painful', text: 'Heavy, unpredictable menstrual bleeding or severe cramping', category: 'cycle' },
    { id: 'facial_hair', text: 'Unwanted coarse hair growth on face, chin, chest, or abdomen (hirsutism)', category: 'androgen' },
    { id: 'acne', text: 'Persistent cystic acne along the chin, jawline, or upper back', category: 'androgen' },
    { id: 'hair_loss', text: 'Hair thinning at the scalp crown or widening part line (androgenic alopecia)', category: 'androgen' },
    { id: 'weight_struggle', text: 'Stubborn weight gain, particularly around the lower abdomen, despite dieting', category: 'metabolic' },
    { id: 'sugar_cravings', text: 'Intense sugar or carbohydrate cravings and post-meal energy crashes', category: 'metabolic' },
    { id: 'dark_patches', text: 'Darkened, velvety skin folds on neck, armpits, or groin (acanthosis nigricans)', category: 'metabolic' },
    { id: 'mood_swings', text: 'Brain fog, chronic fatigue, anxiety, or unexplained mood swings', category: 'wellbeing' },
    { id: 'fertility_difficulty', text: 'Difficulty conceiving or suspected anovulatory cycles', category: 'cycle' }
  ];

  const typesOfPcos = [
    {
      id: 'insulin',
      title: 'Insulin-Resistant PCOS',
      badge: '~70% of Cases (Most Prevalent)',
      color: 'primary',
      description: 'The most widespread driver of PCOS. Chronic high levels of circulating insulin stimulate the ovaries to produce excess testosterone and prevent normal ovulation.',
      keySigns: ['Intense sugar/carb cravings', 'Weight gain focused on midsection', 'Afternoon energy slumps & fatigue', 'Acanthosis nigricans (dark skin patches)'],
      treatmentPillars: ['Low-glycemic Mediterranean nutrition', 'Myo-Inositol & D-Chiro Inositol (40:1 ratio)', 'Post-meal walking & resistance training', 'Metformin or Berberine (under medical guidance)']
    },
    {
      id: 'postpill',
      title: 'Post-Pill PCOS',
      badge: 'Temporary Rebound',
      color: 'secondary',
      description: 'Occurs after discontinuing hormonal oral contraceptives (especially androgen-suppressing birth control). The sudden withdrawal can cause a temporary rebound in LH and androgen levels.',
      keySigns: ['Normal periods before taking birth control', 'Sudden acne flare-ups 3–6 months post-pill', 'Missing or delayed periods (amenorrhea)', 'Temporary hormonal transition surge'],
      treatmentPillars: ['Nutrient repletion (Zinc, Magnesium, B-vitamins)', 'Liver detoxification and hormone clearance support', 'Patience & cycle tracking (typically self-resolves)', 'Anti-inflammatory whole food diet']
    },
    {
      id: 'inflammatory',
      title: 'Inflammatory PCOS',
      badge: 'Systemic Immune Driver',
      color: 'tertiary',
      description: 'Driven by chronic low-grade systemic inflammation. Inflammatory cytokines signal the ovaries and adrenal glands to overproduce androgens while disrupting ovulatory communication.',
      keySigns: ['Unexplained joint pain, fatigue, and headaches', 'Frequent skin reactions, eczema, or gut issues (IBS)', 'Elevated high-sensitivity CRP on blood panels', 'Thyroid or autoimmune comorbidities'],
      treatmentPillars: ['Anti-inflammatory diet (eliminating personal food triggers)', 'Gut microbiome optimization & fiber', 'Omega-3 Fatty Acids (EPA/DHA) & Curcumin', 'Limiting environmental endocrine disruptors (BPA, phthalates)']
    },
    {
      id: 'adrenal',
      title: 'Adrenal PCOS',
      badge: '~10% of Cases (Stress Driven)',
      color: 'primary',
      description: 'Driven primarily by psychological or physiological distress rather than insulin resistance. The adrenal glands produce excess DHEA-S (an adrenal androgen) without elevated ovarian testosterone.',
      keySigns: ['Elevated DHEA-S with normal fasting insulin & testosterone', 'Feeling "wired but tired" at bedtime', 'High susceptibility to burnout and emotional stress', 'Lean body phenotype without insulin resistance markers'],
      treatmentPillars: ['Cortisol regulation & restorative nervous system care', 'Adaptogenic herbs (Ashwagandha, Rhodiola)', 'Replacing intense HIIT with gentle walking & yoga', 'Prioritizing 8+ hours of consistent sleep hygiene']
    }
  ];

  const symptomCards = [
    {
      title: 'Menstrual Irregularities',
      icon: 'calendar_today',
      category: 'cycle',
      color: 'bg-primary/10 text-primary',
      desc: 'Infrequent periods (oligomenorrhea), cycles longer than 35 days, or completely missing periods (amenorrhea) due to lack of regular ovulation.'
    },
    {
      title: 'Hyperandrogenism (Excess Androgens)',
      icon: 'face_6',
      category: 'androgen',
      color: 'bg-secondary/10 text-secondary',
      desc: 'Elevated testosterone and male hormones causing cystic acne along the jawline, hirsutism (coarse facial and body hair), and scalp hair thinning.'
    },
    {
      title: 'Polycystic Ovarian Morphology',
      icon: 'biotech',
      category: 'ultrasound',
      color: 'bg-tertiary/10 text-tertiary',
      desc: 'Ultrasound scans revealing 12+ immature follicles (2–9mm) surrounding the ovarian cortex in a characteristic "string of pearls" formation.'
    },
    {
      title: 'Insulin Resistance & Metabolic Shift',
      icon: 'blood_pressure',
      category: 'metabolic',
      color: 'bg-primary/10 text-primary',
      desc: 'Reduced insulin sensitivity causing sugar cravings, reactive hypoglycemia, midsection weight accumulation, and darkened skin creases.'
    },
    {
      title: 'Fertility & Ovulation Challenges',
      icon: 'favorite',
      category: 'cycle',
      color: 'bg-secondary/10 text-secondary',
      desc: 'Anovulatory cycles make predicting ovulation difficult, making PCOS the leading cause of treatable female infertility globally.'
    },
    {
      title: 'Mood, Sleep & Energy Fluctuations',
      icon: 'psychology',
      category: 'wellbeing',
      color: 'bg-tertiary/10 text-tertiary',
      desc: 'Higher incidence of anxiety, depressive episodes, daytime fatigue, sleep apnea, and brain fog resulting from hormonal imbalances and low progesterone.'
    }
  ];

  const filteredCards = activeCategory === 'all' 
    ? symptomCards 
    : symptomCards.filter(card => card.category === activeCategory);

  const mythsFacts = [
    {
      myth: "You must have cysts on your ovaries to have PCOS.",
      fact: "The 'cysts' seen on ultrasound are actually small, immature egg follicles that halted development, not dangerous cysts. Up to 25% of women diagnosed with PCOS have normal-looking ovaries on ultrasound."
    },
    {
      myth: "Women with PCOS cannot get pregnant.",
      fact: "PCOS is the leading cause of ovulatory subfertility, but it is highly treatable. With targeted nutrition, cycle tracking, inositol, or ovulation medications (like Letrozole), pregnancy rates are very high."
    },
    {
      myth: "PCOS only affects people who are overweight.",
      fact: "Between 20% to 30% of individuals with PCOS have 'Lean PCOS' with a normal BMI. Lean individuals often suffer delayed diagnoses because their symptoms are dismissed."
    },
    {
      myth: "The birth control pill is the only treatment for PCOS.",
      fact: "Birth control can mask symptoms by inducing artificial withdrawal bleeding and lowering androgens, but it does not address underlying insulin resistance or chronic inflammation. Lifestyle and targeted metabolic therapies are fundamental."
    },
    {
      myth: "PCOS is solely an ovarian or reproductive condition.",
      fact: "This is why modern medicine terms it PMOS (Polyendocrine Metabolic Ovarian Syndrome). It affects the pancreas, adrenal glands, brain, liver, and cardiovascular health throughout a person's lifespan."
    }
  ];

  const faqs = [
    {
      q: "What does PMOS stand for, and why is it replacing the term PCOS?",
      a: "PMOS stands for Polyendocrine Metabolic Ovarian Syndrome. Medical researchers and endocrinologists increasingly advocate for this name because 'PCOS' is misleading: it is not merely an ovarian cyst disease, but a systemic condition involving multiple endocrine glands (pituitary, adrenals, pancreas, ovaries) and metabolic drivers like insulin resistance."
    },
    {
      q: "How does a doctor formally diagnose PCOS / PMOS?",
      a: "Most medical professionals use the Rotterdam 2003 criteria, which requires a patient to meet at least 2 of 3 features: (1) Irregular or absent ovulation, (2) Clinical or laboratory signs of excess androgens (testosterone, DHEA-S), and (3) Polycystic ovarian morphology on pelvic ultrasound. Secondary conditions like thyroid disease and high prolactin must first be ruled out."
    },
    {
      q: "What blood tests should I request from my healthcare provider?",
      a: "A comprehensive PCOS workup typically includes: Fasting Glucose & Fasting Insulin (to calculate HOMA-IR), Total & Free Testosterone, DHEA-S, LH & FSH ratio (often 2:1 or 3:1 in PCOS), Anti-Müllerian Hormone (AMH), Thyroid Panel (TSH, Free T3/T4), Prolactin, Lipid Panel, and Vitamin D."
    },
    {
      q: "How does OVAHealth AI help in PCOS detection?",
      a: "OVAHealth AI employs state-of-the-art deep learning models trained specifically on pelvic ultrasound imagery. It identifies characteristic structural patterns—such as the distribution and count of antral follicles and enlarged ovarian stroma—providing an objective, rapid, and transparent analysis that helps clinicians and patients identify signs early."
    },
    {
      q: "Is PCOS curable or is it a lifelong condition?",
      a: "PCOS has a strong genetic foundation and is considered a lifelong tendency, but its symptoms can be completely managed and put into clinical remission. Many women restore regular natural ovulatory cycles, eliminate acne, reverse hair loss, and maintain balanced metabolic markers through sustainable nutrition, exercise, and targeted therapies."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-10 mesh-gradient min-h-screen">
      
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 pt-4">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-sm">menu_book</span>
            <span>Comprehensive Patient Guide &amp; Clinical Knowledge</span>
          </div>
          
          <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg leading-tight text-on-surface">
            What is PCOS / PMOS? <br />
            <span className="text-primary font-bold">Everything You Must Know</span>
          </h1>

          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            <strong>Polycystic Ovary Syndrome (PCOS)</strong>, also increasingly recognized as <strong>PMOS (Polyendocrine Metabolic Ovarian Syndrome)</strong>, is one of the world's most prevalent hormonal and metabolic disorders. It touches far more than just ovaries—it shapes metabolism, energy, fertility, skin, and emotional well-being.
          </p>

          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Understanding the root cause is the first step toward reclaiming balance. Explore the scientific breakdown, diagnostic criteria, symptoms checklist, and how modern AI ultrasound analysis provides fast clarity.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <a 
              href="#symptom-checker" 
              className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md shadow-lg shadow-primary/20 hover:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-sm">checklist</span>
              Check Your Symptoms
            </a>
            <Link 
              to="/upload" 
              className="flex items-center gap-2 bg-surface-container-high border border-outline-variant/30 text-on-surface px-6 py-3 rounded-full font-label-md text-label-md hover:bg-surface-container-highest transition-colors"
            >
              <span className="material-symbols-outlined text-sm">upload_file</span>
              Analyze Ultrasound
            </Link>
            <Link 
              to="/medical-assistant" 
              className="flex items-center gap-2 bg-secondary-fixed text-on-secondary-fixed px-6 py-3 rounded-full font-label-md text-label-md hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-sm">psychology</span>
              Ask AI Assistant
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-outline-variant/30">
            <div>
              <div className="text-2xl font-bold text-primary">1 in 10</div>
              <div className="text-xs text-on-surface-variant">Women Affected Worldwide</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">70%</div>
              <div className="text-xs text-on-surface-variant">Remain Undiagnosed Early</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-tertiary">#1 Cause</div>
              <div className="text-xs text-on-surface-variant">Of Ovulatory Infertility</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">80%</div>
              <div className="text-xs text-on-surface-variant">Have Insulin Resistance</div>
            </div>
          </div>
        </div>

        {/* Hero Visual Card */}
        <div className="lg:col-span-5 relative">
          <div className="glass-card rounded-[2.5rem] p-6 shadow-2xl border border-white/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-primary/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
            <img 
              src={pcosSymptomsImg} 
              alt="Common PCOS and PMOS Symptoms Diagram" 
              className="w-full rounded-2xl object-cover shadow-sm mb-4"
            />
            <div className="p-4 bg-surface-container/60 rounded-xl border border-outline-variant/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-primary text-xl mt-0.5">verified</span>
              <div>
                <h4 className="font-bold text-sm text-on-surface">Medically Reviewed Information</h4>
                <p className="text-xs text-on-surface-variant">Aligned with Rotterdam Consensus 2023 Guidelines and the American Society for Reproductive Medicine (ASRM).</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: PCOS vs PMOS Paradigm Shift */}
      <section className="mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
            Modern Medical Evolution
          </span>
          <h2 className="font-headline-md text-headline-md md:text-3xl font-bold mt-4 mb-3 text-on-surface">
            PCOS vs. PMOS: Why the Terminology is Changing
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            For decades, patients were told they had "cysts on their ovaries." Modern clinical endocrinology has proven that this description is both inaccurate and incomplete.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card: PCOS (Traditional) */}
          <div className="glass-card p-8 rounded-3xl border border-outline-variant/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
                  Traditional Name
                </span>
                <span className="material-symbols-outlined text-secondary text-2xl">medical_information</span>
              </div>
              <h3 className="text-xl font-bold text-on-surface mb-2">PCOS: Polycystic Ovary Syndrome</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Coined in 1935 by Stein &amp; Leventhal. While widely recognized, this label carries significant clinical limitations:
              </p>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-error text-base mt-0.5">close</span>
                  <span><strong>Misleading Word "Cyst":</strong> The small rings seen on ultrasound are immature egg follicles that never completed ovulation, not true tumors or fluid sacs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-error text-base mt-0.5">close</span>
                  <span><strong>Ovaries May Look Clear:</strong> Up to 25% of individuals diagnosed with PCOS do not have polycystic morphology on ultrasound.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-error text-base mt-0.5">close</span>
                  <span><strong>Ignores Systemic Health:</strong> Suggests the problem is confined to the pelvis, leading to missed metabolic and cardiovascular care.</span>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-4 border-t border-outline-variant/20 text-xs text-on-surface-variant italic">
              "PCOS is not an ovarian disease; it is an endocrine disorder with ovarian expression."
            </div>
          </div>

          {/* Card: PMOS (Modern) */}
          <div className="glass-card p-8 rounded-3xl border-2 border-primary/40 bg-gradient-to-br from-primary/5 via-surface to-secondary/5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Modern Medical Consensus
                </span>
                <span className="material-symbols-outlined text-primary text-2xl">hub</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">PMOS: Polyendocrine Metabolic Ovarian Syndrome</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed mb-6">
                Reflects the actual multi-system pathophysiology documented in contemporary scientific literature:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="bg-surface/80 p-3.5 rounded-2xl border border-outline-variant/30">
                  <span className="font-bold text-primary block text-sm">P • Polyendocrine</span>
                  <span className="text-xs text-on-surface-variant">Involves pituitary (LH/FSH), adrenal glands (DHEA-S), pancreas (insulin), and ovaries.</span>
                </div>
                <div className="bg-surface/80 p-3.5 rounded-2xl border border-outline-variant/30">
                  <span className="font-bold text-secondary block text-sm">M • Metabolic</span>
                  <span className="text-xs text-on-surface-variant">Driven by impaired insulin sensitivity, chronic inflammation, and altered lipid metabolism.</span>
                </div>
                <div className="bg-surface/80 p-3.5 rounded-2xl border border-outline-variant/30">
                  <span className="font-bold text-tertiary block text-sm">O • Ovarian</span>
                  <span className="text-xs text-on-surface-variant">Manifests as delayed egg release (anovulation) or arrested follicular clusters.</span>
                </div>
                <div className="bg-surface/80 p-3.5 rounded-2xl border border-outline-variant/30">
                  <span className="font-bold text-on-surface block text-sm">S • Syndrome</span>
                  <span className="text-xs text-on-surface-variant">A collection of interconnected traits that vary widely from person to person.</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-4 border-t border-outline-variant/20 text-xs text-primary font-medium">
              ✓ Recognized by international reproductive endocrinologists for holistic whole-body management.
            </div>
          </div>
        </div>
      </section>

      {/* Section: Diagnostic Criteria (Rotterdam 2003) */}
      <section className="mb-24">
        <div className="bg-surface-container-high/60 border border-outline-variant/30 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
              Clinical Diagnosis
            </span>
            <h2 className="font-headline-md text-headline-md md:text-3xl font-bold mt-4 mb-2 text-on-surface">
              The Rotterdam Diagnostic Criteria
            </h2>
            <p className="text-on-surface-variant text-sm md:text-base leading-relaxed">
              To be officially diagnosed with PCOS / PMOS, a healthcare provider verifies that you meet <strong>at least 2 out of the following 3 criteria</strong>, after ruling out thyroid conditions or elevated prolactin:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Criteria 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm mb-4">
                1
              </div>
              <h4 className="font-bold text-base text-on-surface mb-2">Ovulatory Dysfunction</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Infrequent, irregular, or absent menstrual cycles (fewer than 9 periods per year, or cycle lengths exceeding 35 days). Anovulation means an egg is not regularly released.
              </p>
              <div className="text-xs font-semibold text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">check</span>
                Oligo- or Anovulation
              </div>
            </div>

            {/* Criteria 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-bold text-sm mb-4">
                2
              </div>
              <h4 className="font-bold text-base text-on-surface mb-2">Hyperandrogenism</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Clinical signs (cystic acne on jaw, hirsutism/excess facial &amp; body hair, androgenic hair thinning) OR laboratory confirmation of elevated serum testosterone or DHEA-S.
              </p>
              <div className="text-xs font-semibold text-secondary flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">check</span>
                Clinical or Biochemical
              </div>
            </div>

            {/* Criteria 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-sm relative">
              <div className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center font-bold text-sm mb-4">
                3
              </div>
              <h4 className="font-bold text-base text-on-surface mb-2">Polycystic Ovarian Morphology</h4>
              <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
                Ultrasound imaging showing 12 or more follicles (2–9 mm diameter) in one or both ovaries, or enlarged ovarian volume (&gt;10 mL) with peripheral follicular ring pattern.
              </p>
              <div className="text-xs font-semibold text-tertiary flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">check</span>
                Detected via Ultrasound
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/20 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-2xl">info</span>
              <span className="text-xs md:text-sm text-on-surface">
                <strong>Remember:</strong> You do NOT need all three to have PCOS/PMOS. Meeting any 2 of 3 fulfills the international diagnostic threshold.
              </span>
            </div>
            <Link to="/upload" className="text-primary font-bold text-xs hover:underline flex items-center gap-1">
              Upload scan for automated checking <span className="material-symbols-outlined text-xs">arrow_forward</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section: The 4 Distinct Phenotypes / Types */}
      <section className="mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-tertiary/10 text-tertiary px-4 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
            Root Cause Medicine
          </span>
          <h2 className="font-headline-md text-headline-md md:text-3xl font-bold mt-4 mb-3 text-on-surface">
            The 4 Types / Phenotypes of PCOS
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            PCOS is not one single disease. Understanding your specific root driver tells you why your body behaves this way and which targeted lifestyle remedies work.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {typesOfPcos.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`px-5 py-2.5 rounded-full font-label-md text-label-md transition-all ${
                activeTab === type.id
                  ? 'bg-primary text-on-primary shadow-md shadow-primary/25 scale-105'
                  : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
              }`}
            >
              {type.title}
            </button>
          ))}
        </div>

        {/* Active Type Card */}
        {typesOfPcos.map((type) => {
          if (type.id !== activeTab) return null;
          return (
            <div 
              key={type.id} 
              className="glass-card rounded-[2rem] p-8 md:p-12 border border-outline-variant/30 shadow-lg animate-fadeIn"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {type.badge}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-on-surface mt-2">{type.title}</h3>
                </div>
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <span className="material-symbols-outlined text-3xl">vital_signs</span>
                </div>
              </div>

              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-3xl leading-relaxed">
                {type.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-outline-variant/20">
                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-lg">flag</span>
                    Common Signs &amp; Clues
                  </h4>
                  <ul className="space-y-2.5">
                    {type.keySigns.map((sign, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-sm text-on-surface-variant">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0"></span>
                        <span>{sign}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-sm uppercase tracking-wider text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-lg">spa</span>
                    Evidence-Based Strategy
                  </h4>
                  <ul className="space-y-2.5">
                    {type.treatmentPillars.map((pillar, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-sm text-on-surface-variant">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                        <span>{pillar}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Section: Symptoms Grid with Filter */}
      <section className="mb-24">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
            Clinical Picture
          </span>
          <h2 className="font-headline-md text-headline-md md:text-3xl font-bold mt-4 mb-3 text-on-surface">
            Symptoms &amp; Manifestations: What to Watch For
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            PCOS symptoms can develop shortly after puberty or emerge later in adulthood following weight changes or stopping oral contraception.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'all', label: 'All Symptoms' },
            { id: 'cycle', label: 'Cycle & Fertility' },
            { id: 'androgen', label: 'Androgens & Skin' },
            { id: 'metabolic', label: 'Metabolism & Energy' },
            { id: 'ultrasound', label: 'Ultrasound Signs' },
            { id: 'wellbeing', label: 'Mental & Emotional' }
          ].map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveCategory(filter.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                activeCategory === filter.id 
                  ? 'bg-on-surface text-surface' 
                  : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCards.map((card, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-outline-variant/30 flex flex-col justify-between hover:shadow-lg transition-all hover:border-primary/40">
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${card.color}`}>
                  <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                </div>
                <h4 className="font-bold text-base text-on-surface mb-2">{card.title}</h4>
                <p className="text-xs text-on-surface-variant leading-relaxed">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Interactive Self-Assessment Symptom Checklist */}
      <section id="symptom-checker" className="mb-24">
        <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-2 border-primary/20 shadow-xl bg-gradient-to-b from-surface via-surface to-primary-fixed/20">
          <div className="max-w-2xl mb-8">
            <span className="bg-primary/15 text-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
              Self-Screening Tool
            </span>
            <h2 className="font-headline-md text-headline-md md:text-3xl font-bold mt-4 mb-2 text-on-surface">
              Interactive PCOS / PMOS Symptom Checklist
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Check all the signs below that you have regularly experienced over the past 6+ months to gauge your indicator score.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {symptomChecklist.map((item) => {
              const isChecked = selectedSymptoms.includes(item.id);
              return (
                <div 
                  key={item.id}
                  onClick={() => toggleSymptom(item.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 select-none ${
                    isChecked 
                      ? 'bg-primary/10 border-primary shadow-sm' 
                      : 'bg-surface-container-lowest/80 border-outline-variant/30 hover:border-primary/40'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isChecked ? 'bg-primary text-white' : 'border border-outline-variant bg-surface'
                  }`}>
                    {isChecked && <span className="material-symbols-outlined text-xs">check</span>}
                  </div>
                  <span className={`text-xs md:text-sm leading-snug ${isChecked ? 'text-primary font-semibold' : 'text-on-surface'}`}>
                    {item.text}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Assessment Score Output */}
          <div className="p-6 bg-surface rounded-2xl border border-outline-variant/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="text-xs uppercase font-bold text-on-surface-variant mb-1">
                Your Indicator Score
              </div>
              <div className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-primary">
                  {selectedSymptoms.length} / {symptomChecklist.length}
                </span>
                <span className="text-xs px-3 py-1 rounded-full font-semibold bg-surface-container-high text-on-surface">
                  {selectedSymptoms.length === 0 && 'No symptoms selected'}
                  {selectedSymptoms.length > 0 && selectedSymptoms.length <= 2 && 'Mild / Low Indicators'}
                  {selectedSymptoms.length >= 3 && selectedSymptoms.length <= 5 && 'Moderate Indicators'}
                  {selectedSymptoms.length >= 6 && 'Strong PCOS / PMOS Indicators'}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant mt-2 max-w-xl">
                {selectedSymptoms.length >= 3
                  ? 'You report several hallmarks of PCOS/PMOS. We recommend discussing these symptoms with an OB-GYN or reproductive endocrinologist and having an ovarian ultrasound scan analyzed.'
                  : 'While a low score is reassuring, hormonal balance can fluctuate. If you experience distressing cycle irregularities, consult a clinical specialist.'}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link 
                to="/upload" 
                className="bg-primary text-on-primary text-center px-6 py-3 rounded-full text-xs font-bold shadow-md hover:scale-95 transition-transform"
              >
                Upload Ultrasound Scan
              </Link>
              <Link 
                to="/medical-assistant" 
                className="bg-surface-container text-on-surface text-center px-6 py-3 rounded-full text-xs font-bold border border-outline-variant/40 hover:bg-surface-container-high transition-colors"
              >
                Discuss with AI Assistant
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section: The Crucial Role of Ultrasound Imaging */}
      <section className="mb-24">
        <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border border-outline-variant/30 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <span className="bg-tertiary/10 text-tertiary px-4 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
              Diagnostic Imaging
            </span>
            <h2 className="font-headline-md text-headline-md md:text-3xl font-bold text-on-surface">
              Why Ultrasound Imaging is Essential for PCOS Detection
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Pelvic ultrasound (transvaginal or transabdominal) provides the visual window into ovarian architecture. In healthy ovaries, follicles grow and mature until one dominant egg is released each month.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              In PCOS / PMOS, hormonal signals (elevated LH and androgens) cause follicular arrest. The immature follicles align along the periphery beneath an expanded ovarian stroma, creating the hallmark <strong>"string of pearls"</strong> appearance.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary text-xl mt-0.5">radiology</span>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Follicle Count per Ovary (FNPO)</h4>
                  <p className="text-xs text-on-surface-variant">Modern criteria look for 12 or more 2–9mm follicles per ovary.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-secondary text-xl mt-0.5">straighten</span>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">Ovarian Volume Expansion</h4>
                  <p className="text-xs text-on-surface-variant">Enlarged volume (&gt;10 cm³) resulting from increased dense central stromal tissue.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-tertiary text-xl mt-0.5">auto_awesome</span>
                <div>
                  <h4 className="font-bold text-sm text-on-surface">OVAHealth AI Transparency</h4>
                  <p className="text-xs text-on-surface-variant">Our deep neural network inspects ultrasound images and produces a visual confidence heatmap explaining what patterns were recognized.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                to="/upload" 
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md hover:scale-95 transition-transform"
              >
                <span className="material-symbols-outlined text-sm">upload_file</span>
                Try Scan Analysis Now
              </Link>
            </div>
          </div>

          {/* Visual Showcase */}
          <div className="bg-surface-container-high/60 p-6 rounded-3xl border border-outline-variant/30 text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-3xl">biotech</span>
            </div>
            <h3 className="font-bold text-lg text-on-surface mb-2">Automated Ultrasound AI Classifier</h3>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto mb-6">
              Trained on clinically annotated ultrasound imaging to classify polycystic versus normal ovarian morphology in under 15 seconds.
            </p>
            <div className="grid grid-cols-2 gap-3 text-left">
              <div className="bg-surface p-4 rounded-xl border border-outline-variant/20">
                <span className="text-xs text-secondary font-bold block mb-1">Standard Pelvic USG</span>
                <span className="text-xs text-on-surface-variant">Subjective manual follicle counting prone to inter-observer variability.</span>
              </div>
              <div className="bg-surface p-4 rounded-xl border border-primary/30">
                <span className="text-xs text-primary font-bold block mb-1">With OVAHealth AI</span>
                <span className="text-xs text-on-surface-variant">Objective morphological feature extraction with visual attention maps.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Comprehensive Management & Lifestyle Guide */}
      <section className="mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
            Holistic Management
          </span>
          <h2 className="font-headline-md text-headline-md md:text-3xl font-bold mt-4 mb-3 text-on-surface">
            How PCOS / PMOS is Managed &amp; Put into Remission
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            While PCOS cannot be completely erased from your DNA, its symptoms, hormonal surges, and ovulatory cycles can be successfully regulated.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="glass-card p-6 rounded-3xl border border-outline-variant/20 hover:border-primary/40 transition-all">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">nutrition</span>
            </div>
            <h3 className="font-bold text-base text-on-surface mb-2">1. Blood Sugar Nutrition</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Balance meals with 30g+ of fiber, clean protein, and healthy monounsaturated fats. Pairing carbs with protein prevents glucose and insulin spikes that provoke testosterone surges.
            </p>
            <div className="text-xs font-semibold text-primary">Spearmint Tea &amp; Anti-Inflammatory Foods</div>
          </div>

          {/* Pillar 2 */}
          <div className="glass-card p-6 rounded-3xl border border-outline-variant/20 hover:border-secondary/40 transition-all">
            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">fitness_center</span>
            </div>
            <h3 className="font-bold text-base text-on-surface mb-2">2. Muscle &amp; Movement</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Resistance training builds glucose-absorbing muscle mass (GLUT4 transporters) without raising cortisol. 15-minute walks after meals dramatically reduce postprandial glucose.
            </p>
            <div className="text-xs font-semibold text-secondary">Strength Training + Zone-2 Walks</div>
          </div>

          {/* Pillar 3 */}
          <div className="glass-card p-6 rounded-3xl border border-outline-variant/20 hover:border-tertiary/40 transition-all">
            <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-2xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">prescriptions</span>
            </div>
            <h3 className="font-bold text-base text-on-surface mb-2">3. Targeted Nutrients</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Myo-Inositol &amp; D-Chiro Inositol (physiological 40:1 ratio) has clinical trial backing for restoring ovulatory frequency. Vitamin D3, Omega-3s, and Zinc combat hirsutism.
            </p>
            <div className="text-xs font-semibold text-tertiary">40:1 Inositol, Vit D3, Omega-3</div>
          </div>

          {/* Pillar 4 */}
          <div className="glass-card p-6 rounded-3xl border border-outline-variant/20 hover:border-primary/40 transition-all">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-2xl">stethoscope</span>
            </div>
            <h3 className="font-bold text-base text-on-surface mb-2">4. Medical Therapies</h3>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              In consultation with doctors: Metformin for insulin resistance, Spironolactone for anti-androgen facial hair control, and Letrozole/Clomiphene for safe ovulation induction.
            </p>
            <div className="text-xs font-semibold text-primary">Physician Guided Care</div>
          </div>
        </div>
      </section>

      {/* Section: Myths vs. Facts */}
      <section className="mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-secondary/10 text-secondary px-4 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
            Dispelling Misinformation
          </span>
          <h2 className="font-headline-md text-headline-md md:text-3xl font-bold mt-4 mb-3 text-on-surface">
            Common Myths vs. Scientific Facts
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Misinformation surrounding PCOS causes unnecessary panic and guilt. Here is what research actually demonstrates.
          </p>
        </div>

        <div className="space-y-4 max-w-4xl mx-auto">
          {mythsFacts.map((item, idx) => (
            <div key={idx} className="glass-card p-6 rounded-2xl border border-outline-variant/30 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-5 bg-error/5 p-4 rounded-xl border border-error/20">
                <span className="text-error font-bold text-xs uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">cancel</span> Myth
                </span>
                <p className="text-xs font-semibold text-on-surface">{item.myth}</p>
              </div>
              <div className="md:col-span-7 bg-primary/5 p-4 rounded-xl border border-primary/20">
                <span className="text-primary font-bold text-xs uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">check_circle</span> Medical Fact
                </span>
                <p className="text-xs text-on-surface-variant leading-relaxed">{item.fact}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section: Frequently Asked Questions (Accordion) */}
      <section className="mb-24">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="bg-primary/10 text-primary px-4 py-1.5 rounded-full font-label-sm text-label-sm uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="font-headline-md text-headline-md md:text-3xl font-bold mt-4 mb-3 text-on-surface">
            Frequently Asked Questions
          </h2>
          <p className="text-on-surface-variant font-body-md text-body-md">
            Clear, honest answers to the most common questions patients and clinicians ask about PCOS and PMOS.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index} 
                className="glass-card rounded-2xl border border-outline-variant/30 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-surface-container/40 transition-colors"
                >
                  <span className="font-bold text-sm md:text-base text-on-surface">
                    {faq.q}
                  </span>
                  <span className={`material-symbols-outlined text-primary transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`}>
                    keyboard_arrow_down
                  </span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs md:text-sm text-on-surface-variant leading-relaxed border-t border-outline-variant/20 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action Banner */}
      <section className="bg-gradient-to-r from-primary via-primary-container to-secondary text-white rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative overflow-hidden">
        <div className="max-w-2xl relative z-10 space-y-4">
          <span className="bg-white/20 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block">
            Take Action Today
          </span>
          <h2 className="font-display-lg text-display-lg-mobile md:text-3xl font-bold leading-tight">
            Gain Instant Clarity on Your Ovarian Health
          </h2>
          <p className="opacity-90 text-sm md:text-base leading-relaxed">
            Upload your pelvic ultrasound scan for immediate deep-learning PCOS indicators, or converse with our AI medical assistant for symptom guidance.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link 
              to="/upload" 
              className="bg-white text-primary px-8 py-3.5 rounded-full font-bold text-sm hover:scale-95 transition-transform shadow-lg"
            >
              Upload Ultrasound Scan
            </Link>
            <Link 
              to="/medical-assistant" 
              className="bg-white/20 hover:bg-white/30 text-white px-8 py-3.5 rounded-full font-bold text-sm border border-white/40 transition-colors"
            >
              Try AI Assistant
            </Link>
            <Link 
              to="/dashboard" 
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-full font-bold text-sm border border-white/20 transition-colors"
            >
              View Insights
            </Link>
          </div>
        </div>
        <div className="absolute right-[-40px] bottom-[-40px] opacity-10 pointer-events-none">
          <span className="material-symbols-outlined text-[260px]">health_and_safety</span>
        </div>
      </section>

    </main>
  );
}
