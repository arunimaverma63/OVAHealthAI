import { Link } from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from 'axios';

export default function UploadScan() {
  const [previewImage, setPreviewImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [stage, setStage] = useState("idle");
  const fileInputRef = useRef(null);


  //handle file changes
  const handleFileChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;
    const maxSize = 25 * 1024 * 1024;

    if (file.size > maxSize) {

      alert("File size must be less than 25MB");

      return;
    }

    // validation
    if (!file.type.startsWith("image/")) {
      alert("Only image files allowed");
      return;
    }

    setSelectedFile(file);

    setFileName(file.name);

    setUploadProgress(0);

    setResult(null);
    setStage("idle");

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };

    reader.readAsDataURL(file);
  };


  // handle area click
  const handleAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  // fetching backend springboot (handles upload)
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
  const handleUpload = async () => {

    if (!selectedFile) {

      alert("Please select an image");

      return;
    }

    try {

      setIsUploading(true);
      setStage("uploading");

      // create multipart form data
      const formData = new FormData();

      // key name MUST match backend
      formData.append("image", selectedFile);

      // DEBUG
      console.log(formData.get("image"));

      setStage("processing");

      console.log("Sending request to:", `${API_URL}/api/upload`);
      const response = await axios.post(
        `${API_URL}/api/upload`,

        formData,

        {

          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: (progressEvent) => {

            const percent = Math.round(
              (progressEvent.loaded * 100) /
              progressEvent.total
            );

            setUploadProgress(percent);
          },
        }
      );

      console.log(response.data);

      setResult(response.data);

      // SAVE RESULT
      localStorage.setItem(
        "analysisResult",
        JSON.stringify(response.data)
      );
      if (previewImage) {
        localStorage.setItem("previewImage", previewImage);
      }
      setStage("completed");

    } catch (error) {

      console.error(error);
      setStage("error");

      alert(
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Upload failed"
      );

    } finally {

      setIsUploading(false);
    }
  };

  return (
    <div className="bg-mesh min-h-screen text-on-surface font-body-md overflow-x-hidden flex flex-col">
      <div className="flex max-w-container-max mx-auto w-full flex-1">
        {/* NavigationDrawer */}
        <aside className="hidden lg:flex flex-col w-64 bg-surface-container-low/90 backdrop-blur-md border-r border-white/20 py-6 sticky top-20 h-[calc(100vh-80px)]">
          <div className="px-6 mb-8 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">person</span>
            </div>
            <div>
              <p className="font-headline-sm text-headline-sm font-bold text-primary">Health Portal</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant">PCOS Analysis</p>
            </div>
          </div>
          <nav className="flex flex-col gap-1">
            <Link className="bg-primary-container text-on-primary-container rounded-xl mx-2 my-1 px-4 py-3 flex items-center gap-3 transition-all duration-300" to="/dashboard">
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-md text-label-md">Dashboard</span>
            </Link>
            <Link className="text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 px-4 py-3 flex items-center gap-3 transition-all duration-300" to="/history">
              <span className="material-symbols-outlined">history</span>
              <span className="font-label-md text-label-md">Scan History</span>
            </Link>
            <Link className="text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 px-4 py-3 flex items-center gap-3 transition-all duration-300" to="/medical-assistant">
              <span className="material-symbols-outlined">psychology</span>
              <span className="font-label-md text-label-md">AI Insights</span>
            </Link>
            <Link className="text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 px-4 py-3 flex items-center gap-3 transition-all duration-300" to="#">
              <span className="material-symbols-outlined">person</span>
              <span className="font-label-md text-label-md">Patient Profile</span>
            </Link>
            <Link className="text-on-surface-variant hover:bg-surface-variant/50 rounded-xl mx-2 my-1 px-4 py-3 flex items-center gap-3 transition-all duration-300" to="#">
              <span className="material-symbols-outlined">settings</span>
              <span className="font-label-md text-label-md">Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-margin-mobile md:p-margin-desktop w-full">
          <div className="max-w-5xl mx-auto">
            <header className="mb-10">
              <h2 className="font-display-lg text-display-lg text-on-surface mb-2">Upload Diagnostic Scan</h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant">Upload high-resolution pelvic ultrasound images for rapid follicle analysis and hormonal health assessment.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter">
              {/* Left: Upload Card */}
              <div className="lg:col-span-2 space-y-gutter">
                <div className="glass-panel rounded-2xl p-8 border border-primary/20 shadow-xl shadow-primary/5 relative overflow-hidden">
                  {/* Animated Glow Border */}
                  <div className="absolute inset-0 border-2 border-primary/10 rounded-2xl pointer-events-none"></div>
                  <div className="relative z-10">
                    <div
                      className="border-2 border-dashed border-outline-variant rounded-2xl p-12 flex flex-col items-center justify-center bg-surface-container-lowest/50 hover:border-primary transition-colors cursor-pointer group"
                      onClick={handleAreaClick}
                    >
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*,.dicom"
                        onChange={handleFileChange}
                      />
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-primary text-3xl">upload_file</span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm mb-2">Drag &amp; Drop Ultrasound Scan</h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-center max-w-sm">Support for DICOM, PNG, and JPEG formats. Maximum file size 25MB.</p>
                      <button className="bg-primary text-on-primary px-8 py-3 rounded-full font-label-md text-label-md shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all" onClick={(e) => { e.stopPropagation(); handleAreaClick(); }}>Browse File</button>

                      <button
                        disabled={isUploading}

                        onClick={(e) => {

                          e.stopPropagation();

                          handleUpload();
                        }}

                        className={`mt-4 px-8 py-3 rounded-full font-label-md text-label-md shadow-lg transition-all

  ${isUploading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 text-white hover:shadow-xl"
                          }`}
                      >
                        {
                          isUploading
                            ? "Uploading..."
                            : "Upload Scan"
                        }
                      </button>


                    </div>

                    {/* Progress Bar (Simulation) */}
                    {(isUploading || fileName) && (
                      <div className="mt-8">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-label-md text-label-md text-primary font-bold">

                            {
                              isUploading
                                ? `Uploading ${fileName}`
                                : result
                                  ? `Uploaded ${fileName} ✓`
                                  : fileName
                            }

                          </span>
                          <span className="font-label-md text-label-md text-on-surface-variant">{uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-surface-container-high h-2.5 rounded-full overflow-hidden">
                          <div className="liquid-progress h-full rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }}></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {result && (

                  <div className="mt-6 bg-surface-container-low p-6 rounded-2xl border border-primary/20">

                    <h3 className="text-xl font-bold mb-4">
                      AI Prediction Result
                    </h3>

                    <p className="mb-2">
                      Prediction:
                      <span className="font-bold text-primary ml-2">
                        {result?.prediction || "N/A"}
                      </span>
                    </p>

                    <p>
                      Confidence:
                      <span className="font-bold ml-2">
                        {result?.confidence || 0}%
                      </span>
                    </p>

                  </div>
                )}

                {/* Processing Timeline */}

                <div className="glass-panel rounded-2xl p-8 border border-outline-variant/30">

                  <h3 className="font-headline-sm text-headline-sm mb-6 flex items-center gap-2">

                    <span className="material-symbols-outlined text-primary">
                      biotech
                    </span>

                    Analysis Pipeline

                  </h3>

                  <div className="space-y-6">

                    {/* STEP 1 */}

                    <div className="flex items-center gap-4">

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center
        ${stage === "idle"
                          ? "bg-surface-container-high"
                          : "bg-primary"}
      `}>

                        <span className="material-symbols-outlined text-white text-sm">

                          {
                            stage === "idle"
                              ? "upload"
                              : "check"
                          }

                        </span>

                      </div>

                      <div>

                        <p className="font-label-md font-bold">

                          Upload Scan

                        </p>

                        <p className="text-sm text-on-surface-variant">

                          Select ultrasound image

                        </p>

                      </div>

                    </div>

                    {/* STEP 2 */}

                    <div className="flex items-center gap-4">

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center
        ${stage === "uploading"
                          ? "bg-yellow-500 animate-pulse"
                          : stage === "preprocessing" || stage === "completed"
                            ? "bg-primary"
                            : "bg-surface-container-high"}
      `}>

                        <span className="material-symbols-outlined text-white text-sm">

                          {
                            stage === "uploading"
                              ? "sync"
                              : stage === "processing" || stage === "completed"
                                ? "check"
                                : "cloud_upload"
                          }

                        </span>

                      </div>

                      <div>

                        <p className="font-label-md font-bold">

                          Uploading Image

                        </p>

                        <p className="text-sm text-on-surface-variant">

                          Sending image to backend

                        </p>

                      </div>

                    </div>

                    {/* STEP 3 */}

                    <div className="flex items-center gap-4">

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center
        ${stage === "preprocessing"
                          ? "bg-blue-500 animate-pulse"
                          : stage === "completed"
                            ? "bg-primary"
                            : "bg-surface-container-high"}
      `}>

                        <span className="material-symbols-outlined text-white text-sm">

                          {
                            stage === "preprocessing"
                              ? "psychology"
                              : stage === "completed"
                                ? "check"
                                : "neurology"
                          }

                        </span>

                      </div>

                      <div>

                        <p className="font-label-md font-bold">

                          AI Prediction

                        </p>

                        <p className="text-sm text-on-surface-variant">

                          CNN model analyzing ultrasound

                        </p>

                      </div>

                    </div>

                    {/* STEP 4 */}

                    <div className="flex items-center gap-4">

                      <div className={`w-8 h-8 rounded-full flex items-center justify-center
        ${stage === "completed"
                          ? "bg-green-600"
                          : "bg-surface-container-high"}
      `}>

                        <span className="material-symbols-outlined text-white text-sm">

                          {
                            stage === "completed"
                              ? "check"
                              : "description"
                          }

                        </span>

                      </div>

                      <div>

                        <p className="font-label-md font-bold">

                          Result Generated

                        </p>

                        <p className="text-sm text-on-surface-variant">

                          Prediction report ready

                        </p>

                      </div>

                    </div>

                    {/* ERROR STATE */}

                    {stage === "error" && (

                      <div className="bg-red-100 text-red-700 p-4 rounded-xl">

                        Prediction failed

                      </div>

                    )}

                  </div>

                </div>
              </div>

              {/* Right: Info/Preview */}
              <div className="space-y-gutter">
                {/* Medical Illustration Card */}
                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden border border-outline-variant/30 shadow-md">
                  <img alt="Medical visualization" className="w-full h-48 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2LBHH0BegWipQfWiTn6hpP_Dam7WFz7H0UaMH9bbuFA41Dqu3Q7XBaQ7K4dHqD6P8KEayf1PnyoiiA-G6O7mtyLdDmyKPktqBTnSBuDgQhHzY6oTjc9L-62cfCBDQ49o7rgtSAucsncAZhcy3BU5pdSf__qwHWtPq25MMCFBMlSJFyz8Faxw1aROrupQemleMBmNjLUz__1p6f_DkVzrCjdzURi0pAn-8E2lOLha0iuIjWk6rSUGapt5uMfQbdyy526S5lsVxrSQv" />
                  <div className="p-6">
                    <h4 className="font-headline-sm text-headline-sm mb-2">Automated Detection</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">Our proprietary AI model identifies and measures follicle size with 98.4% precision compared to manual sonogram readings.</p>
                  </div>
                </div>

                {/* Scan Preview Card (Empty/Loading State) */}
                <div className="glass-panel rounded-2xl p-6 border border-primary/10 relative overflow-hidden aspect-[4/5] flex flex-col items-center justify-center">
                  {previewImage ? (
                    <img src={previewImage} alt="Scan preview" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                  ) : null}

                  {isUploading && (
                    <div className="scan-line top-1/4 animate-[scan_2s_ease-in-out_infinite]"></div>
                  )}

                  {!previewImage && (
                    <div className="absolute inset-0 bg-black/5 flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary/20 text-6xl">monitor_heart</span>
                    </div>
                  )}

                  <div className="relative z-20 text-center bg-surface/80 p-4 rounded-xl backdrop-blur-md mt-auto shadow-lg">
                    {isUploading ? (
                      <>
                        <div className="bg-primary/10 px-4 py-2 rounded-full mb-2 inline-block">
                          <p className="font-label-sm text-label-sm text-primary">SCANNING IN PROGRESS</p>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant">Analyzing image data...</p>
                      </>
                    ) : previewImage ? (
                      <>
                        <div className="bg-green-100 px-4 py-2 rounded-full mb-2 inline-block">
                          <p className="font-label-sm text-label-sm text-green-700 font-bold">UPLOAD COMPLETE</p>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant">Ready for diagnostic review.</p>
                        {result && (
                          <Link
                            to="/analysis-result"
                            state={{ result, previewImage }}
                            className="mt-4 block bg-primary text-on-primary px-6 py-2 rounded-full"
                          >
                            View Results
                          </Link>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="bg-surface-variant/50 px-4 py-2 rounded-full mb-2 inline-block">
                          <p className="font-label-sm text-label-sm text-on-surface-variant">AWAITING UPLOAD</p>
                        </div>
                        <p className="font-body-md text-body-md text-on-surface-variant px-4">Preview will populate once preprocessing is complete.</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Help/Contact */}
                <div className="p-6 border-2 border-primary/10 rounded-2xl bg-primary/5">
                  <h4 className="font-label-md text-label-md text-primary font-bold mb-2">Need Clinical Support?</h4>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mb-4">Our radiology team is available 24/7 for manual verification if required.</p>
                  <Link className="text-primary font-bold font-label-sm text-label-sm flex items-center gap-1 hover:underline" to="/contact">
                    Contact Support <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
