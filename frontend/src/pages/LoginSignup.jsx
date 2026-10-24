import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginSignup() {

  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8080";


  // =========================
  // LOGIN
  // =========================

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {

      setLoading(true);

      const response = await axios.post(
        `${API_URL}/auth/login`,
        {
          username,
          password
        }
      );

      // Backend returns JWT directly
      const token = response.data;

      // Store JWT in browser
      localStorage.setItem("token", token);

      alert("Login successful");

      // clear fields
      setUsername("");
      setPassword("");

      // go to dashboard
      navigate("/dashboard");

    } catch (error) {

      console.error("Login error:", error);

      if (error.response) {

        alert(
          error.response.data ||
          "Invalid username or password"
        );

      } else {

        alert(
          "Unable to connect to server"
        );
      }

    } finally {

      setLoading(false);
    }
  };


  // =========================
  // REGISTER
  // =========================

  const handleRegister = async (e) => {

    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    if (password.length < 8) {
      alert("Password must contain at least 8 characters");
      return;
    }

    try {

      setLoading(true);

      await axios.post(
        `${API_URL}/auth/register`,
        {
          username,
          password
        }
      );

      alert("Registration successful. Please login.");

      // clear fields
      setUsername("");
      setPassword("");

      // switch to login tab
      setIsLogin(true);

    } catch (error) {

      console.error("Registration error:", error);

      if (error.response) {

        alert(
          error.response.data ||
          "Registration failed"
        );

      } else {

        alert(
          "Unable to connect to server"
        );
      }

    } finally {

      setLoading(false);
    }
  };


  return (

    <main className="min-h-screen flex flex-col md:flex-row gradient-bg">

      {/* ================= LEFT SIDE ================= */}

      <section className="hidden md:flex md:w-1/2 p-margin-desktop flex-col justify-between items-start relative overflow-hidden">

        <div className="z-10">

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <span className="material-symbols-outlined text-primary text-[32px]">
              clinical_notes
            </span>

            <h1 className="font-headline-md text-headline-md font-bold text-primary">
              PCOS Detect AI
            </h1>

          </Link>

        </div>


        <div className="relative w-full aspect-square max-w-lg mx-auto z-10 flex items-center justify-center">

          <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl">
          </div>

          <img
            alt="Medical AI Illustration"
            className="w-full h-full object-cover rounded-3xl shadow-2xl border border-white/20"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuArE4FgXJmLt_J2XMdlsdCPnWavWBFIvby4AYsp0zp2qwOiiZXBcDHLo-yd1l8eVEk5iEYR9ovYRVeRSvOQiz1UDURRCjVPeO77GCtdiDs3Bvid4qn1-DSVuQBMUee3cPUgpTwQj6VHyGp9yJIJt5MfR_ZdOiSFYyAvaQa-CNHDp6FCM-CdwJOlX9LcBKKPKAWbO8r87NVpISxOCrz2DjbM1cvfa6hpoOqkQYS2i30r559MdfsEd86BrBasJT8waTo_PT_fQetDhAyl"
          />

        </div>


        <div className="z-10 max-w-md">

          <h2 className="font-display-lg text-display-lg text-on-surface mb-4">

            Precision diagnostics for women's health.

          </h2>

          <p className="font-body-lg text-body-lg text-on-surface-variant">

            Empowering you with AI-driven insights
            for comprehensive PCOS management.

          </p>

        </div>


        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl">
        </div>

        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary/10 rounded-full blur-3xl">
        </div>

      </section>



      {/* ================= RIGHT SIDE ================= */}

      <section className="flex-1 flex items-center justify-center p-6 md:p-margin-desktop">

        <div className="w-full max-w-md glass-panel p-8 md:p-12 rounded-[32px] shadow-sm">


          {/* ================= LOGIN / SIGNUP TABS ================= */}

          <div className="flex bg-surface-container-low p-1 rounded-full mb-8">

            <button
              type="button"
              onClick={() => {

                setIsLogin(true);
                setUsername("");
                setPassword("");

              }}
              className={
                `flex-1 py-2 px-4 rounded-full font-label-md text-label-md transition-all duration-200
                ${
                  isLogin
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'text-on-surface-variant hover:bg-surface-variant/50'
                }`
              }
            >

              Login

            </button>


            <button
              type="button"
              onClick={() => {

                setIsLogin(false);
                setUsername("");
                setPassword("");

              }}
              className={
                `flex-1 py-2 px-4 rounded-full font-label-md text-label-md transition-all duration-200
                ${
                  !isLogin
                    ? 'bg-primary text-on-primary shadow-md'
                    : 'text-on-surface-variant hover:bg-surface-variant/50'
                }`
              }
            >

              Sign Up

            </button>

          </div>



          {/* ================================================= */}
          {/* ================= LOGIN FORM ===================== */}
          {/* ================================================= */}

          {isLogin ? (

            <div className="space-y-6">

              <div className="text-center md:text-left">

                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">

                  Welcome Back

                </h3>

                <p className="font-body-md text-body-md text-on-surface-variant">

                  Access your health insights securely.

                </p>

              </div>


              <form
                className="space-y-4"
                onSubmit={handleLogin}
              >


                {/* Username */}

                <div className="space-y-1">

                  <label className="font-label-sm text-label-sm text-on-surface-variant ml-1">

                    Username

                  </label>


                  <div className="relative">

                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">

                      person

                    </span>


                    <input
                      className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"

                      placeholder="Enter username"

                      type="text"

                      value={username}

                      onChange={(e) =>
                        setUsername(e.target.value)
                      }

                      required
                    />

                  </div>

                </div>



                {/* Password */}

                <div className="space-y-1">

                  <div className="flex justify-between items-center px-1">

                    <label className="font-label-sm text-label-sm text-on-surface-variant">

                      Password

                    </label>


                    <Link
                      className="font-label-sm text-label-sm text-primary hover:underline underline-offset-4"
                      to="#"
                    >

                      Forgot Password?

                    </Link>

                  </div>


                  <div className="relative">

                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">

                      lock

                    </span>


                    <input
                      className="w-full pl-12 pr-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"

                      placeholder="••••••••"

                      type="password"

                      value={password}

                      onChange={(e) =>
                        setPassword(e.target.value)
                      }

                      required
                    />

                  </div>

                </div>



                {/* Sign In Button */}

                <button
                  type="submit"

                  disabled={loading}

                  className="w-full py-4 bg-primary text-on-primary font-label-md text-label-md rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                >

                  {
                    loading
                      ? "Signing In..."
                      : "Sign In"
                  }

                </button>

              </form>


              {/* Optional Google UI */}

              <div className="relative flex items-center py-4">

                <div className="flex-grow border-t border-outline-variant/30">
                </div>

                <span className="flex-shrink mx-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">

                  Or continue with

                </span>

                <div className="flex-grow border-t border-outline-variant/30">
                </div>

              </div>


              <button
                type="button"
                className="w-full py-3 px-4 bg-white border border-outline-variant rounded-full flex items-center justify-center gap-3 font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors"
              >

                Google

              </button>

            </div>


          ) : (


            /* ================================================= */
            /* ================= REGISTER FORM ================== */
            /* ================================================= */

            <div className="space-y-6">

              <div className="text-center md:text-left">

                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">

                  Create Account

                </h3>

                <p className="font-body-md text-body-md text-on-surface-variant">

                  Start your clinical analysis today.

                </p>

              </div>


              <form
                className="space-y-4"
                onSubmit={handleRegister}
              >


                {/* Username */}

                <div className="space-y-1">

                  <label className="font-label-sm text-label-sm text-on-surface-variant ml-1">

                    Username

                  </label>


                  <input
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"

                    placeholder="Choose a username"

                    type="text"

                    value={username}

                    onChange={(e) =>
                      setUsername(e.target.value)
                    }

                    required
                  />

                </div>



                {/* Password */}

                <div className="space-y-1">

                  <label className="font-label-sm text-label-sm text-on-surface-variant ml-1">

                    Password

                  </label>


                  <input
                    className="w-full px-4 py-3 bg-surface-container-lowest border border-outline-variant rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"

                    placeholder="Minimum 8 characters"

                    type="password"

                    value={password}

                    onChange={(e) =>
                      setPassword(e.target.value)
                    }

                    minLength={8}

                    required
                  />

                </div>



                {/* Terms */}

                <div className="flex items-start gap-3 px-1">

                  <input
                    className="mt-1 rounded border-outline-variant text-primary focus:ring-primary"
                    type="checkbox"
                    required
                  />


                  <p className="font-label-sm text-label-sm text-on-surface-variant">

                    I agree to the{" "}

                    <Link
                      className="text-primary hover:underline"
                      to="#"
                    >

                      Terms of Service

                    </Link>

                    {" "}and{" "}

                    <Link
                      className="text-primary hover:underline"
                      to="#"
                    >

                      Privacy Policy

                    </Link>.

                  </p>

                </div>



                {/* Register Button */}

                <button
                  type="submit"

                  disabled={loading}

                  className="w-full py-4 bg-primary text-on-primary font-label-md text-label-md rounded-full shadow-lg shadow-primary/20 hover:scale-[1.02] transition-all disabled:opacity-50"
                >

                  {
                    loading
                      ? "Creating Account..."
                      : "Create Account"
                  }

                </button>

              </form>


              <div className="relative flex items-center py-4">

                <div className="flex-grow border-t border-outline-variant/30">
                </div>

                <span className="flex-shrink mx-4 font-label-sm text-label-sm text-outline uppercase tracking-wider">

                  Or register with

                </span>

                <div className="flex-grow border-t border-outline-variant/30">
                </div>

              </div>


              <button
                type="button"
                className="w-full py-3 px-4 bg-white border border-outline-variant rounded-full flex items-center justify-center gap-3 font-label-md text-label-md text-on-surface hover:bg-surface-container-low transition-colors"
              >

                Google

              </button>

            </div>

          )}



          {/* ================= FOOTER ================= */}

          <footer className="mt-8 text-center">

            <p className="font-label-sm text-label-sm text-outline">

              © 2026 PCOS Detect AI. Secure health analysis.

            </p>

          </footer>


        </div>

      </section>

    </main>
  );
}

export default LoginSignup;