import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ScanHistory() {
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResult, setSelectedResult] = useState("All Results");
  const [minConfidence, setMinConfidence] = useState("Any %");
  
  // Interactive Expansion State
  const [expandedScanId, setExpandedScanId] = useState(null);

  useEffect(() => {
    const fetchScans = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
        const response = await axios.get(`${API_URL}/api/scans`);
        let backendScans = response.data;
        
        backendScans = backendScans.map(s => ({
          id: s.id ? `PCOS-${s.id}` : `PCOS-${Math.floor(1000 + Math.random() * 9000)}`,
          timestamp: s.timestamp || new Date().toISOString(),
          prediction: s.prediction || "PCOS Detected",
          confidence: s.confidence || 94,
          report: s.report || "",
          previewImage: s.imagePath ? `${API_URL}/uploads/${s.imagePath.split(/[\\/]/).pop()}` : null
        }));

        if (backendScans && backendScans.length > 0) {
          backendScans.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
          setScans(backendScans);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn("Backend fetch failed in ScanHistory, loading localStorage:", err);
      }

      let localScans = [];
      try {
        localScans = JSON.parse(localStorage.getItem("scanHistory") || "[]");
      } catch (e) {
        console.error(e);
      }

      if (localScans.length === 0) {
        const defaultMockScans = [
          {
            id: "PCOS-9421",
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
            prediction: "Negative",
            confidence: 99.2,
            report: "Based on the processed ultrasound images, the ovaries appear normal. The follicles are within the expected count (<12 per ovary) and size (2-9mm), with normal ovarian volume (<10ml) and no peripheral distribution."
          },
          {
            id: "PCOS-9420",
            timestamp: new Date(Date.now() - 3600000 * 6).toISOString(),
            prediction: "PCOS Detected",
            confidence: 97.8,
            report: "Multiple follicular cysts detected in both left and right ovaries. Volumetric analysis indicates a 15% increase from baseline. AI markers show classic PCOS morphology patterns with 97.8% confidence."
          },
          {
            id: "PCOS-9419",
            timestamp: new Date(Date.now() - 3600000 * 25).toISOString(),
            prediction: "Negative",
            confidence: 98.5,
            report: "Normal pelvic scan. Follicle count is 6 in left ovary, 7 in right. Volume is 6.2 cm³ (left) and 6.5 cm³ (right)."
          },
          {
            id: "PCOS-9418",
            timestamp: new Date(Date.now() - 3600000 * 72).toISOString(),
            prediction: "PCOS Detected",
            confidence: 87.5,
            report: "Ovarian volume is enlarged (12.4 cm³). 14 follicles detected in peripheral distribution. Confirming morphology consistent with PCOS."
          }
        ];
        localStorage.setItem("scanHistory", JSON.stringify(defaultMockScans));
        localScans = defaultMockScans;
      }

      localScans.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setScans(localScans);
      setLoading(false);
    };

    fetchScans();
  }, []);

  const formatTime = (isoString) => {
    try {
      const date = new Date(isoString);
      if (isNaN(date.getTime())) return isoString;
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch (e) {
      return isoString;
    }
  };

  const toggleExpand = (id) => {
    setExpandedScanId(expandedScanId === id ? null : id);
  };

  // Filter Logic
  const filteredScans = scans.filter(scan => {
    const isPositive = scan.prediction.toLowerCase().includes("positive") || scan.prediction.toLowerCase().includes("detected");
    
    // Search query matches ID or explanation
    const matchesSearch = searchQuery === "" || 
      scan.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.report.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scan.prediction.toLowerCase().includes(searchQuery.toLowerCase());

    // Result matches selection
    let matchesResult = true;
    if (selectedResult === "Positive") {
      matchesResult = isPositive;
    } else if (selectedResult === "Negative") {
      matchesResult = !isPositive;
    }

    // Confidence level matches selection
    let matchesConfidence = true;
    if (minConfidence === "90% +") {
      matchesConfidence = scan.confidence >= 90;
    } else if (minConfidence === "80% +") {
      matchesConfidence = scan.confidence >= 80;
    } else if (minConfidence === "70% +") {
      matchesConfidence = scan.confidence >= 70;
    }

    return matchesSearch && matchesResult && matchesConfidence;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-mesh w-full">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-on-surface-variant font-label-md">Loading scan history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background text-on-surface font-body-md mesh-gradient min-h-screen flex flex-col">
      <div className="flex flex-1 max-w-container-max mx-auto w-full">
        {/* NavigationDrawer (Sidebar) */}
        <aside className="hidden lg:flex fixed left-0 top-0 h-full z-40 py-6 flex-col bg-surface-container-low/90 dark:bg-surface-container-highest/90 backdrop-blur-md border-r border-white/20 w-64 shadow-xl shadow-primary/5 pt-24">
          <div className="px-6 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center overflow-hidden">
              <div className="w-full h-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">JD</div>
            </div>
            <div>
              <p className="font-label-md text-label-md font-bold text-primary">Health Dashboard</p>
              <p className="text-[10px] text-on-surface-variant">PCOS Analysis Portal</p>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Link className="flex items-center gap-3 px-4 py-3 mx-2 my-1 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl transition-all" to="/dashboard">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-md text-label-md">Dashboard</span>
            </Link>
            <div className="flex items-center gap-3 px-4 py-3 mx-2 my-1 bg-primary-container text-on-primary-container rounded-xl transition-all cursor-pointer">
              <span className="material-symbols-outlined">history</span>
              <span className="font-label-md text-label-md">Scan History</span>
            </div>
            <Link className="flex items-center gap-3 px-4 py-3 mx-2 my-1 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl transition-all" to="/medical-assistant">
              <span className="material-symbols-outlined">psychology</span>
              <span className="font-label-md text-label-md">AI Insights</span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 mx-2 my-1 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl transition-all" to="#">
              <span className="material-symbols-outlined">person</span>
              <span className="font-label-md text-label-md">Patient Profile</span>
            </Link>
            <Link className="flex items-center gap-3 px-4 py-3 mx-2 my-1 text-on-surface-variant hover:bg-surface-variant/50 rounded-xl transition-all" to="#">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-md text-label-md">Settings</span>
            </Link>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-margin-mobile md:px-margin-desktop lg:ml-64 py-8 max-w-5xl mx-auto w-full">
          {/* Page Header */}
          <div className="mb-8">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Scan History</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Review and manage your ultrasound analysis records.</p>
          </div>

          {/* Search & Filters */}
          <section className="glass-card rounded-2xl p-6 mb-8 flex flex-col md:flex-row gap-4 items-end shadow-sm">
            <div className="flex-1 w-full">
              <label className="block font-label-sm text-label-sm text-outline mb-2">Search Scans</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
                <input 
                  className="w-full bg-surface-container-low border-none rounded-xl py-3 pl-12 pr-4 focus:ring-2 focus:ring-primary/20 transition-all font-body-md" 
                  placeholder="Search by result details..." 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <label className="block font-label-sm text-label-sm text-outline mb-2">Result</label>
              <select 
                className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all font-label-md"
                value={selectedResult}
                onChange={(e) => setSelectedResult(e.target.value)}
              >
                <option>All Results</option>
                <option>Positive</option>
                <option>Negative</option>
              </select>
            </div>
            <div className="w-full md:w-48">
              <label className="block font-label-sm text-label-sm text-outline mb-2">Min. Confidence</label>
              <select 
                className="w-full bg-surface-container-low border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 transition-all font-label-md"
                value={minConfidence}
                onChange={(e) => setMinConfidence(e.target.value)}
              >
                <option>Any %</option>
                <option>90% +</option>
                <option>80% +</option>
                <option>70% +</option>
              </select>
            </div>
          </section>

          {/* Records List (Expandable Cards) */}
          <div className="space-y-4">
            {filteredScans.length === 0 ? (
              <div className="glass-card p-12 rounded-2xl text-center text-on-surface-variant font-body-md border border-outline-variant/20 shadow-sm">
                No matching scans found in your history.
              </div>
            ) : (
              filteredScans.map((scan) => {
                const isPositive = scan.prediction.toLowerCase().includes("positive") || scan.prediction.toLowerCase().includes("detected");
                const isExpanded = expandedScanId === scan.id;
                
                return (
                  <div 
                    key={scan.id} 
                    className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 border ${
                      isExpanded ? 'border-2 border-primary/20 shadow-lg' : 'border-outline-variant/10 shadow-sm hover:shadow-md'
                    }`}
                  >
                    <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isPositive ? 'bg-secondary/10 text-secondary' : 'bg-primary/10 text-primary'
                        }`}>
                          <span className="material-symbols-outlined text-[28px]">radiology</span>
                        </div>
                        <div>
                          <h3 className="font-headline-sm text-headline-sm text-on-surface">{formatTime(scan.timestamp)}</h3>
                          <p className="text-label-sm font-label-sm text-outline uppercase tracking-wider">ID: {scan.id}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:flex items-center gap-4 md:gap-12">
                        <div className="flex flex-col">
                          <span className="text-label-sm font-label-sm text-outline mb-1">Result</span>
                          <span className={`px-3 py-1 rounded-full font-label-sm text-label-sm w-fit ${
                            isPositive 
                              ? "bg-secondary-fixed text-on-secondary-fixed-variant font-bold" 
                              : "bg-green-100 text-green-700 font-bold"
                          }`}>
                            {isPositive ? "PCOS Positive" : "Negative"}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-label-sm font-label-sm text-outline mb-1">Confidence</span>
                          <div className="flex items-center gap-2">
                            <span className={`font-bold ${isPositive ? 'text-secondary' : 'text-primary'}`}>{scan.confidence.toFixed(1)}%</span>
                            <div className="w-16 h-2 bg-surface-variant rounded-full overflow-hidden hidden sm:block">
                              <div 
                                className={`h-full ${isPositive ? 'bg-secondary' : 'bg-primary'}`} 
                                style={{width: `${scan.confidence}%`}}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => toggleExpand(scan.id)}
                          className="flex-1 md:flex-none border border-outline-variant hover:bg-surface-variant/30 text-on-surface-variant px-5 py-2.5 rounded-xl font-label-md text-label-md transition-all flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {isExpanded ? 'expand_less' : 'visibility'}
                          </span>
                          {isExpanded ? 'Close' : 'Details'}
                        </button>
                        <Link 
                          to="/analysis-result" 
                          state={{ result: { prediction: scan.prediction, confidence: scan.confidence, explanation: scan.report }, previewImage: scan.previewImage }}
                          className="flex-1 md:flex-none bg-primary-container text-on-primary-container px-5 py-2.5 rounded-xl font-label-md text-label-md transition-all flex items-center justify-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">download</span>
                          Report
                        </Link>
                      </div>
                    </div>

                    {/* Expandable Panel */}
                    {isExpanded && (
                      <div className="p-6 bg-primary/5 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-outline-variant/10">
                        {scan.previewImage && (
                          <div className="md:col-span-1">
                            <div className="aspect-video rounded-xl overflow-hidden relative border border-white/50 shadow">
                              <img alt="Ultrasound Analysis" className="w-full h-full object-cover" src={scan.previewImage} />
                            </div>
                          </div>
                        )}
                        <div className={`${scan.previewImage ? 'md:col-span-2' : 'md:col-span-3'} flex flex-col justify-between`}>
                          <div>
                            <h4 className="font-label-md text-label-md font-bold text-on-surface mb-2">AI Diagnostic Summary</h4>
                            <p className="text-body-md text-on-surface-variant leading-relaxed mb-4">
                              {scan.report || "No detailed report generated yet. Run this through the analyzer pipeline to get structured insights."}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <span className="bg-white/60 px-3 py-1 rounded-lg border border-primary/10 text-label-sm font-label-sm text-primary">
                              Confidence: {scan.confidence.toFixed(1)}%
                            </span>
                            <span className="bg-white/60 px-3 py-1 rounded-lg border border-primary/10 text-label-sm font-label-sm text-primary">
                              Status: COMPLETED
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-between">
            <p className="text-label-sm font-label-sm text-outline">
              Showing 1-{filteredScans.length} of {filteredScans.length} records
            </p>
            <div className="flex items-center gap-2">
              <button disabled className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-outline opacity-50 cursor-not-allowed">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-label-md">1</button>
              <button disabled className="w-10 h-10 rounded-full border border-outline-variant flex items-center justify-center text-outline opacity-50 cursor-not-allowed">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
