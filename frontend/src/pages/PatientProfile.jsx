import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function PatientProfile() {
  const [profile, setProfile] = useState({
    age: '',
    bloodGroup: '',
    heightCm: '',
    weightKg: '',
    bmi: null,
    averageCycleLength: '',
    periodDuration: '',
    lastPeriodDate: '',
    diagnosedPcos: false,
    pcosType: 'Undiagnosed',
    primarySymptoms: '',
    fastingInsulin: '',
    fastingGlucose: '',
    testosterone: '',
    amh: '',
    activeMedications: '',
    dietPreference: 'Low GI'
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const symptomsList = [
    'Irregular Periods',
    'Severe Acne',
    'Facial Hair (Hirsutism)',
    'Scalp Hair Thinning',
    'Weight Gain Around Midsection',
    'Intense Sugar Cravings',
    'Chronic Fatigue',
    'Severe Period Cramps'
  ];

  // Load profile from Java backend on page load
  useEffect(() => {
    fetchProfile();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const username = localStorage.getItem('username') || '';
      const response = await axios.get(
        `http://localhost:8080/api/profile?username=${username}`,
        { headers: getAuthHeaders() }
      );
      if (response.data) {
        setProfile((prev) => ({
          ...prev,
          ...response.data
        }));
      }
    } catch (err) {
      console.warn('Profile fetch warning (new profile or offline):', err);
    } finally {
      setLoading(false);
    }
  };

  // Auto-calculate BMI locally whenever height or weight changes
  const handleInputChange = (field, value) => {
    setProfile((prev) => {
      const updated = { ...prev, [field]: value };
      if (field === 'heightCm' || field === 'weightKg') {
        const h = parseFloat(field === 'heightCm' ? value : updated.heightCm);
        const w = parseFloat(field === 'weightKg' ? value : updated.weightKg);
        if (h > 0 && w > 0) {
          const heightM = h / 100;
          updated.bmi = Math.round((w / (heightM * heightM)) * 10) / 10;
        } else {
          updated.bmi = null;
        }
      }
      return updated;
    });
  };

  const toggleSymptom = (symptom) => {
    const currentList = profile.primarySymptoms
      ? profile.primarySymptoms.split(', ').filter(Boolean)
      : [];
    let updatedList;
    if (currentList.includes(symptom)) {
      updatedList = currentList.filter((s) => s !== symptom);
    } else {
      updatedList = [...currentList, symptom];
    }
    setProfile({ ...profile, primarySymptoms: updatedList.join(', ') });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setSaveMessage('');
      const username = localStorage.getItem('username') || '';
      const response = await axios.put(
        `http://localhost:8080/api/profile?username=${username}`,
        profile,
        { headers: getAuthHeaders() }
      );
      if (response.data) {
        setProfile(response.data);
        setSaveMessage('✓ Profile successfully updated and saved in PostgreSQL');
        setTimeout(() => setSaveMessage(''), 4000);
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      setSaveMessage('⚠️ Failed to save. Please ensure Java backend is running.');
    } finally {
      setSaving(false);
    }
  };

  const getBmiCategory = (bmi) => {
    if (!bmi) return { label: 'Not calculated', color: 'text-outline' };
    if (bmi < 18.5) return { label: 'Underweight', color: 'text-tertiary' };
    if (bmi < 25) return { label: 'Healthy Weight', color: 'text-primary' };
    if (bmi < 30) return { label: 'Overweight', color: 'text-secondary' };
    return { label: 'Obese Range', color: 'text-error' };
  };

  const bmiInfo = getBmiCategory(profile.bmi);

  return (
    <div className="flex flex-1 max-w-container-max mx-auto w-full min-h-screen bg-mesh">
      {/* Sidebar Navigation */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 h-[calc(100vh-100px)] sticky top-24 bg-surface-container-low/90 backdrop-blur-md rounded-r-xl border-r border-white/20 p-4 shadow-xl shadow-primary/5">
        <div className="px-6 mb-8 flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center text-primary font-bold">
              <span className="material-symbols-outlined text-2xl">person</span>
            </div>
            <div>
              <p className="font-headline-sm text-headline-sm font-bold text-primary">Patient Portal</p>
              <p className="font-body-md text-body-md text-on-surface-variant opacity-70">Health Records</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 transition-all">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </Link>
          <Link to="/history" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 transition-all">
            <span className="material-symbols-outlined">history</span>
            <span className="font-label-md text-label-md">Scan History</span>
          </Link>
          <Link to="/medical-assistant" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 transition-all">
            <span className="material-symbols-outlined">psychology</span>
            <span className="font-label-md text-label-md">AI Insights</span>
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-xl mx-2 my-1 transition-all cursor-pointer">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            <span className="font-label-md text-label-md font-semibold">Patient Profile</span>
          </div>
          <Link to="/what-is-pcos" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 transition-all">
            <span className="material-symbols-outlined">menu_book</span>
            <span className="font-label-md text-label-md">What is PCOS</span>
          </Link>
          <Link to="/upload" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 transition-all">
            <span className="material-symbols-outlined">upload_file</span>
            <span className="font-label-md text-label-md">Upload Scan</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 px-margin-mobile md:px-margin-desktop py-8 overflow-y-auto">
        <form onSubmit={handleSave} className="space-y-8 max-w-4xl">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                Confidential Health Record
              </span>
              <h1 className="text-2xl md:text-3xl font-bold text-on-surface mt-2">
                Personal Health &amp; PCOS Profile
              </h1>
              <p className="text-sm text-on-surface-variant">
                Your medical data is encrypted and accessible only to you.
              </p>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-full font-bold text-sm shadow-lg shadow-primary/25 hover:scale-95 transition-all self-start sm:self-auto disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm">save</span>
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>

          {saveMessage && (
            <div className={`p-4 rounded-xl text-sm font-medium ${saveMessage.includes('✓') ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-error/10 text-error border border-error/20'}`}>
              {saveMessage}
            </div>
          )}

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card p-5 rounded-2xl border border-outline-variant/30 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-on-surface-variant">Calculated BMI</span>
                <div className="text-2xl font-extrabold text-on-surface mt-1">
                  {profile.bmi ? profile.bmi : '--'}
                </div>
                <span className={`text-xs font-semibold ${bmiInfo.color}`}>{bmiInfo.label}</span>
              </div>
              <div className="p-3 bg-primary/10 text-primary rounded-xl">
                <span className="material-symbols-outlined text-2xl">fitness_center</span>
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-outline-variant/30 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-on-surface-variant">Avg Cycle</span>
                <div className="text-2xl font-extrabold text-on-surface mt-1">
                  {profile.averageCycleLength ? `${profile.averageCycleLength} Days` : '--'}
                </div>
                <span className="text-xs text-on-surface-variant">
                  {profile.averageCycleLength > 35 ? '⚠️ Irregular (>35d)' : 'Typical Range (21-35d)'}
                </span>
              </div>
              <div className="p-3 bg-secondary/10 text-secondary rounded-xl">
                <span className="material-symbols-outlined text-2xl">calendar_month</span>
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-outline-variant/30 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-on-surface-variant">PCOS Phenotype</span>
                <div className="text-base font-bold text-primary mt-1">
                  {profile.pcosType || 'Undiagnosed'}
                </div>
                <span className="text-xs text-on-surface-variant">
                  {profile.diagnosedPcos ? 'Clinically Diagnosed' : 'Self-Reported'}
                </span>
              </div>
              <div className="p-3 bg-tertiary/10 text-tertiary rounded-xl">
                <span className="material-symbols-outlined text-2xl">medical_information</span>
              </div>
            </div>
          </div>

          {/* Card 1: Physical Biometrics */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-6">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">straighten</span>
              Physical Biometrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Age (Years)</label>
                <input
                  type="number"
                  value={profile.age || ''}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  placeholder="e.g. 26"
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Blood Group</label>
                <select
                  value={profile.bloodGroup || ''}
                  onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                >
                  <option value="">Select...</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={profile.heightCm || ''}
                  onChange={(e) => handleInputChange('heightCm', e.target.value)}
                  placeholder="e.g. 165"
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={profile.weightKg || ''}
                  onChange={(e) => handleInputChange('weightKg', e.target.value)}
                  placeholder="e.g. 62"
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Menstrual & Gynecological History */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-6">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">calendar_today</span>
              Menstrual Cycle &amp; History
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Avg Cycle Length (Days)</label>
                <input
                  type="number"
                  value={profile.averageCycleLength || ''}
                  onChange={(e) => handleInputChange('averageCycleLength', e.target.value)}
                  placeholder="e.g. 35"
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Period Duration (Days)</label>
                <input
                  type="number"
                  value={profile.periodDuration || ''}
                  onChange={(e) => handleInputChange('periodDuration', e.target.value)}
                  placeholder="e.g. 5"
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Date of Last Period</label>
                <input
                  type="date"
                  value={profile.lastPeriodDate || ''}
                  onChange={(e) => handleInputChange('lastPeriodDate', e.target.value)}
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                />
              </div>
            </div>
          </div>

          {/* Card 3: PCOS Clinical Status & Symptoms */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-6">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">clinical_notes</span>
              PCOS / PMOS Status &amp; Symptoms
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Formally Diagnosed with PCOS?</label>
                <select
                  value={profile.diagnosedPcos ? 'true' : 'false'}
                  onChange={(e) => handleInputChange('diagnosedPcos', e.target.value === 'true')}
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                >
                  <option value="false">No / Not Yet Confirmed</option>
                  <option value="true">Yes, Clinically Diagnosed</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Suspected / Known Phenotype</label>
                <select
                  value={profile.pcosType || 'Undiagnosed'}
                  onChange={(e) => handleInputChange('pcosType', e.target.value)}
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                >
                  <option value="Undiagnosed">Undiagnosed / Uncertain</option>
                  <option value="Insulin-Resistant">Insulin-Resistant PCOS (~70%)</option>
                  <option value="Inflammatory">Inflammatory PCOS</option>
                  <option value="Post-Pill">Post-Pill PCOS</option>
                  <option value="Adrenal">Adrenal PCOS (Stress-Driven)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-2">
                Active Symptoms (Click to toggle)
              </label>
              <div className="flex flex-wrap gap-2">
                {symptomsList.map((symptom) => {
                  const isSelected = profile.primarySymptoms?.includes(symptom);
                  return (
                    <button
                      type="button"
                      key={symptom}
                      onClick={() => toggleSymptom(symptom)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-primary text-on-primary shadow-sm shadow-primary/30'
                          : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest border border-outline-variant/30'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {symptom}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Card 4: Optional Hormonal & Metabolic Lab Markers */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-6">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">biotech</span>
              Lab Biomarkers (Optional)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Fasting Insulin (µIU/mL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={profile.fastingInsulin || ''}
                  onChange={(e) => handleInputChange('fastingInsulin', e.target.value)}
                  placeholder="e.g. 12.5"
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Fasting Glucose (mg/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={profile.fastingGlucose || ''}
                  onChange={(e) => handleInputChange('fastingGlucose', e.target.value)}
                  placeholder="e.g. 92"
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Testosterone (ng/dL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={profile.testosterone || ''}
                  onChange={(e) => handleInputChange('testosterone', e.target.value)}
                  placeholder="e.g. 48"
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">AMH (ng/mL)</label>
                <input
                  type="number"
                  step="0.1"
                  value={profile.amh || ''}
                  onChange={(e) => handleInputChange('amh', e.target.value)}
                  placeholder="e.g. 6.8"
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                />
              </div>
            </div>
          </div>

          {/* Card 5: Lifestyle & Medications */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-outline-variant/30 space-y-6">
            <h3 className="text-lg font-bold text-on-surface flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary">prescriptions</span>
              Medications &amp; Lifestyle
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Active Medications / Supplements</label>
                <input
                  type="text"
                  value={profile.activeMedications || ''}
                  onChange={(e) => handleInputChange('activeMedications', e.target.value)}
                  placeholder="e.g. Myo-Inositol (40:1), Metformin 500mg, Vitamin D"
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1">Dietary Preference</label>
                <select
                  value={profile.dietPreference || 'Low GI'}
                  onChange={(e) => handleInputChange('dietPreference', e.target.value)}
                  className="w-full p-3 rounded-xl glass-input border border-outline-variant/30 outline-none focus:border-primary text-sm"
                >
                  <option value="Low GI">Low Glycemic Index (PCOS Recommended)</option>
                  <option value="Mediterranean">Mediterranean / Anti-Inflammatory</option>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="High Protein">High Protein</option>
                  <option value="Standard">Standard / Balanced</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bottom Save Bar */}
          <div className="flex items-center justify-between pt-4">
            <span className="text-xs text-on-surface-variant">
              Last Updated: {profile.updatedAt ? new Date(profile.updatedAt).toLocaleString() : 'Never'}
            </span>
            <button
              type="submit"
              disabled={saving}
              className="bg-primary text-on-primary px-8 py-3.5 rounded-full font-bold text-sm shadow-xl shadow-primary/25 hover:scale-95 transition-all disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}