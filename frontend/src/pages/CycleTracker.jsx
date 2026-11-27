import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function CycleTracker() {
  const [logDate, setLogDate] = useState(new Date().toISOString().split('T')[0]);
  const [flowIntensity, setFlowIntensity] = useState('NONE');
  const [crampsSeverity, setCrampsSeverity] = useState('NONE');
  const [mood, setMood] = useState('CALM');
  const [acne, setAcne] = useState('NONE');
  const [bloating, setBloating] = useState(false);
  const [headache, setHeadache] = useState(false);
  const [notes, setNotes] = useState('');

  const [history, setHistory] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const getUsername = () => {
    return localStorage.getItem('username') || 'arunima';
  };

  // Fetch past history and cycle insights on load
  const fetchData = async () => {
    try {
      setLoading(true);
      const username = getUsername();

      const [historyRes, insightsRes] = await Promise.allSettled([
        axios.get(`${API_URL}/api/cycle/history?username=${username}`, {
          headers: getAuthHeaders()
        }),
        axios.get(`${API_URL}/api/cycle/insights?username=${username}`, {
          headers: getAuthHeaders()
        })
      ]);

      if (historyRes.status === 'fulfilled' && historyRes.data) {
        setHistory(historyRes.data);
      }
      if (insightsRes.status === 'fulfilled' && insightsRes.data) {
        setInsights(insightsRes.data);
      }
    } catch (err) {
      console.error('Error fetching cycle data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Submit today's symptom entry
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ text: '', type: '' });

    const payload = {
      logDate,
      flowIntensity,
      crampsSeverity,
      mood,
      acne,
      bloating,
      headache,
      notes
    };

    try {
      const username = getUsername();
      await axios.post(
        `${API_URL}/api/cycle/log?username=${username}`,
        payload,
        { headers: getAuthHeaders() }
      );

      setMessage({ text: "Today's symptoms logged successfully!", type: 'success' });
      // Refresh history and insights
      fetchData();
    } catch (err) {
      console.error('Error saving symptoms:', err);
      setMessage({
        text: err.response?.data?.message || 'Failed to save log. Please ensure backend is running.',
        type: 'error'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const flowOptions = [
    { value: 'NONE', label: 'No Flow', icon: 'check_circle' },
    { value: 'SPOTTING', label: 'Spotting', icon: 'water_drop' },
    { value: 'LIGHT', label: 'Light', icon: 'opacity' },
    { value: 'MEDIUM', label: 'Medium', icon: 'water' },
    { value: 'HEAVY', label: 'Heavy', icon: 'waves' }
  ];

  const crampsOptions = ['NONE', 'MILD', 'MODERATE', 'SEVERE'];
  const moodOptions = [
    { value: 'CALM', label: 'Calm', icon: 'sentiment_satisfied' },
    { value: 'HAPPY', label: 'Happy', icon: 'mood' },
    { value: 'IRRITABLE', label: 'Irritable', icon: 'sentiment_dissatisfied' },
    { value: 'ANXIOUS', label: 'Anxious', icon: 'sentiment_very_dissatisfied' },
    { value: 'FATIGUED', label: 'Tired', icon: 'bedtime' }
  ];

  return (
    <div className="flex flex-1 max-w-container-max mx-auto w-full min-h-screen bg-mesh overflow-x-hidden">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full z-40 py-6 bg-surface-container-low/90 dark:bg-surface-container-highest/90 backdrop-blur-md w-64 rounded-r-xl border-r border-white/20 shadow-xl shadow-primary/5 transition-all duration-300 ease-in-out hidden md:flex flex-col">
        <div className="px-6 mb-10">
          <h1 className="font-headline-sm text-headline-sm font-bold text-primary">OVAHealth AI</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant opacity-70">Cycle & Symptoms</p>
        </div>
        <nav className="flex-1 space-y-1">
          <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 transition-all">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-label-md text-label-md">Dashboard</span>
          </Link>
          <div className="flex items-center gap-3 px-4 py-3 bg-primary-container text-on-primary-container rounded-xl mx-2 my-1 font-semibold">
            <span className="material-symbols-outlined">calendar_month</span>
            <span className="font-label-md text-label-md">Cycle Tracker</span>
          </div>
          <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 transition-all">
            <span className="material-symbols-outlined">person</span>
            <span className="font-label-md text-label-md">Patient Profile</span>
          </Link>
          <Link to="/medical-assistant" className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 transition-all">
            <span className="material-symbols-outlined">psychology</span>
            <span className="font-label-md text-label-md">AI Insights</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="md:ml-64 min-h-screen flex flex-col w-full">
        {/* Header */}
        <header className="sticky top-0 w-full z-30 flex items-center justify-between px-6 md:px-10 py-4 bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-xl border-b border-white/40 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-3xl">calendar_month</span>
            <div>
              <h2 className="font-headline-md text-xl font-bold text-primary">Daily Cycle & Symptom Tracker</h2>
              <p className="text-xs text-on-surface-variant">Log daily symptoms and view AI cycle projections</p>
            </div>
          </div>
          <Link to="/dashboard" className="px-4 py-2 border border-outline-variant rounded-full text-xs hover:bg-surface-variant">
            Back to Dashboard
          </Link>
        </header>

        <div className="p-6 md:p-10 space-y-8 max-w-5xl">
          {/* Status Message */}
          {message.text && (
            <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
              message.type === 'success' 
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                : 'bg-rose-50 text-rose-800 border border-rose-200'
            }`}>
              <span className="material-symbols-outlined">
                {message.type === 'success' ? 'check_circle' : 'error'}
              </span>
              <span>{message.text}</span>
            </div>
          )}

          {/* AI Cycle Projections & Phase Banner */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl border border-primary/20 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-primary">Predicted Next Period</span>
                <span className="material-symbols-outlined text-primary">event_upcoming</span>
              </div>
              <div className="my-4">
                <div className="text-2xl font-black text-on-surface">
                  {insights?.nextPredictedPeriod || 'Need more logs'}
                </div>
                <p className="text-xs text-on-surface-variant mt-1">
                  Estimated Cycle Length: <span className="font-semibold">{insights?.estimatedCycleLength || 28} days</span>
                </p>
              </div>
              <span className="inline-block text-[11px] px-2.5 py-1 bg-primary/20 text-primary font-bold rounded-full w-fit">
                {insights?.regularityStatus || 'Analyzing Patterns'}
              </span>
            </div>

            <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/30 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-on-surface-variant">Current Cycle Phase</span>
                <span className="material-symbols-outlined text-secondary">donut_large</span>
              </div>
              <div className="my-4">
                <div className="text-2xl font-black text-secondary">
                  {insights?.currentPhase || 'Follicular Phase'}
                </div>
                <p className="text-xs text-on-surface-variant mt-1">
                  Est. Ovulation: <span className="font-semibold">{insights?.ovulationDate || 'Mid-cycle'}</span>
                </p>
              </div>
              <span className="text-[11px] text-on-surface-variant">
                Based on your logged period markers
              </span>
            </div>

            <div className="p-6 bg-surface-container rounded-3xl border border-outline-variant/30 flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold tracking-wider text-on-surface-variant">Clinical PCOS Tip</span>
                <span className="material-symbols-outlined text-amber-500">lightbulb</span>
              </div>
              <div className="my-2">
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {insights?.clinicalRecommendation || 
                    "Log menstrual flow and acne consistently. In PCOS, identifying anovulatory cycles helps tailor lifestyle and inositol interventions."}
                </p>
              </div>
              <span className="text-[10px] text-primary font-semibold">Updated with each entry</span>
            </div>
          </div>

          {/* Daily Logging Form */}
          <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/20 shadow-sm">
            <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">edit_calendar</span>
              Log Symptoms for {logDate}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Date Selector */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                  Select Date
                </label>
                <input
                  type="date"
                  value={logDate}
                  onChange={(e) => setLogDate(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface focus:outline-primary text-sm"
                  max={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>

              {/* Menstrual Flow Chips */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                  Menstrual Flow
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {flowOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setFlowIntensity(opt.value)}
                      className={`flex flex-col items-center p-3 rounded-2xl border transition-all text-xs font-semibold ${
                        flowIntensity === opt.value
                          ? 'border-primary bg-primary text-on-primary shadow-md'
                          : 'border-outline-variant/40 bg-surface hover:bg-surface-variant/40 text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined mb-1">{opt.icon}</span>
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cramp Severity */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                  Cramps / Pelvic Pain
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {crampsOptions.map((severity) => (
                    <button
                      key={severity}
                      type="button"
                      onClick={() => setCrampsSeverity(severity)}
                      className={`py-2.5 px-4 rounded-xl border text-xs font-semibold capitalize transition-all ${
                        crampsSeverity === severity
                          ? 'border-primary bg-primary/10 text-primary font-bold'
                          : 'border-outline-variant/40 bg-surface hover:bg-surface-variant/40 text-on-surface'
                      }`}
                    >
                      {severity.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mood Selection */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                  Mood
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {moodOptions.map((m) => (
                    <button
                      key={m.value}
                      type="button"
                      onClick={() => setMood(m.value)}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
                        mood === m.value
                          ? 'border-secondary bg-secondary/10 text-secondary font-bold'
                          : 'border-outline-variant/40 bg-surface hover:bg-surface-variant/40 text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">{m.icon}</span>
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Secondary Symptoms Checkboxes */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-3">
                  Associated Symptoms
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium bg-surface px-4 py-2.5 rounded-xl border border-outline-variant/40">
                    <input
                      type="checkbox"
                      checked={bloating}
                      onChange={(e) => setBloating(e.target.checked)}
                      className="rounded accent-primary"
                    />
                    <span>Bloating</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-medium bg-surface px-4 py-2.5 rounded-xl border border-outline-variant/40">
                    <input
                      type="checkbox"
                      checked={headache}
                      onChange={(e) => setHeadache(e.target.checked)}
                      className="rounded accent-primary"
                    />
                    <span>Headache / Migraine</span>
                  </label>
                </div>
              </div>

              {/* Daily Notes */}
              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                  Personal Health Notes
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record appetite changes, sleep quality, medication, or workout notes..."
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-outline-variant bg-surface text-on-surface text-sm focus:outline-primary"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto px-8 py-3 bg-primary text-on-primary rounded-xl font-bold text-sm shadow-md hover:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-lg">save</span>
                {submitting ? 'Saving...' : 'Save Today’s Symptoms'}
              </button>
            </form>
          </div>

          {/* Past History Table */}
          <div className="bg-surface-container-low p-6 md:p-8 rounded-3xl border border-outline-variant/20 shadow-sm">
            <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">history</span>
              Recent Symptom History
            </h3>

            {loading ? (
              <p className="text-xs text-on-surface-variant">Loading symptom logs...</p>
            ) : history.length === 0 ? (
              <div className="text-center py-8 text-on-surface-variant text-sm">
                <span className="material-symbols-outlined text-4xl mb-2 opacity-50">note_alt</span>
                <p>No symptoms logged yet. Use the form above to record your first entry!</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-outline-variant/30 text-on-surface-variant uppercase">
                    <tr>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Flow</th>
                      <th className="py-3 px-4">Cramps</th>
                      <th className="py-3 px-4">Mood</th>
                      <th className="py-3 px-4">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant/10">
                    {history.map((item, index) => (
                      <tr key={item.id || index} className="hover:bg-surface-variant/20">
                        <td className="py-3 px-4 font-semibold text-on-surface">{item.logDate}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            item.flowIntensity === 'HEAVY' ? 'bg-red-100 text-red-700' :
                            item.flowIntensity === 'MEDIUM' ? 'bg-orange-100 text-orange-700' :
                            item.flowIntensity === 'LIGHT' ? 'bg-amber-100 text-amber-700' :
                            item.flowIntensity === 'SPOTTING' ? 'bg-pink-100 text-pink-700' :
                            'bg-gray-100 text-gray-700'
                          }`}>
                            {item.flowIntensity}
                          </span>
                        </td>
                        <td className="py-3 px-4 capitalize">{item.crampsSeverity?.toLowerCase() || 'None'}</td>
                        <td className="py-3 px-4 capitalize">{item.mood?.toLowerCase() || 'Normal'}</td>
                        <td className="py-3 px-4 text-on-surface-variant truncate max-w-xs">{item.notes || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}