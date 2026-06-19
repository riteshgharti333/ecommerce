import React, { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Phone,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("phone");

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  let interval: NodeJS.Timeout;

  useEffect(() => {
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    setError("");
    setIsSubmitting(true);
    setTimeout(() => {
      setStep("otp");
      setTimer(30);
      setIsSubmitting(false);
      setTimeout(() => otpRefs.current[0]?.focus(), 100);
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextIndex = Math.min(pasted.length, 5);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length < 6) {
      setError("Please enter complete OTP");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (otpString === "123456" || otpString.length === 6) {
        setIsVerified(true);
        setError("");
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);
      } else {
        setError("Invalid OTP. Please try again.");
        setIsSubmitting(false);
      }
    }, 1000);
  };

  const handleResendOtp = () => {
    setTimer(30);
    setOtp(["", "", "", "", "", ""]);
    setError("");
    otpRefs.current[0]?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--background)] via-[var(--surface)] to-[var(--background)] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-48 -right-48 w-96 h-96 rounded-full bg-[var(--primary)] opacity-[0.04] blur-3xl" />
        <div className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full bg-[var(--accent)] opacity-[0.04] blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[var(--border)] opacity-[0.3] blur-3xl" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-[440px]">
          {/* Brand Header */}
          <div className="text-center mb-10">
            <Link to="/" className="inline-flex items-center gap-3 group mb-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center shadow-lg shadow-[var(--primary)]/20 group-hover:shadow-xl transition-shadow">
                <Sparkles size={22} className="text-white" />
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold tracking-tight text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                  NURA
                </h1>
                <p className="text-[10px] tracking-[0.25em] text-[var(--accent)] uppercase font-medium">
                  Skin Care
                </p>
              </div>
            </Link>

            <h2 className="text-2xl font-bold text-[var(--text)] mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Sign in to continue your skincare journey
            </p>
          </div>

         

          {/* Main Card */}
          <div className="bg-[var(--surface)] rounded-2xl border border-[var(--border)] shadow-xl overflow-hidden">
            {activeTab === "phone" && (
              <>
                {/* Phone Step */}
                {step === "phone" && (
                  <div className="p-6 sm:p-8">
                    <form onSubmit={handlePhoneSubmit}>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                            Phone Number
                          </label>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                              <Phone size={16} className="text-[var(--text-muted)]" />
                              <span className="text-sm font-semibold text-[var(--text)] pr-2 border-r border-[var(--border)]">
                                +91
                              </span>
                            </div>
                            <input
                              type="tel"
                              value={phoneNumber}
                              onChange={(e) => {
                                const cleaned = e.target.value.replace(/\D/g, "").slice(0, 10);
                                setPhoneNumber(cleaned);
                                setError("");
                              }}
                              placeholder="Enter mobile number"
                              className="w-full pl-28 pr-4 py-3.5 rounded-xl border-2 border-[var(--border)] bg-[var(--background)] text-sm font-medium text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-all focus:shadow-[0_0_0_4px_rgba(var(--primary),0.1)]"
                              autoFocus
                            />
                          </div>
                          {error && (
                            <p className="text-xs text-red-500 mt-1.5">{error}</p>
                          )}
                        </div>

                        <div className="flex items-center gap-2 p-3 bg-[var(--primary-light)]/10 rounded-xl border border-[var(--primary)]/10">
                          <ShieldCheck size={16} className="text-[var(--primary)] flex-shrink-0" />
                          <p className="text-xs text-[var(--text-secondary)]">
                            Your data is safe & encrypted
                          </p>
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting || phoneNumber.length < 10}
                          className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white py-3.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-[var(--primary)]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                        >
                          {isSubmitting ? (
                            <RefreshCw size={16} className="animate-spin" />
                          ) : (
                            <>
                              Send OTP
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>

                        <p className="text-xs text-[var(--text-muted)] text-center">
                          By continuing, you agree to our{" "}
                          <Link to="/terms" className="text-[var(--primary)] font-medium hover:underline">
                            Terms {" "}
                          </Link> {"  &  "}
                          <Link to="/privacy" className="text-[var(--primary)] font-medium hover:underline">
                            {" "}Privacy Policy
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                )}

                {/* OTP Step */}
                {step === "otp" && (
                  <div className="p-6 sm:p-8 relative">
                    {isVerified && (
                      <div className="absolute inset-0 bg-[var(--surface)] rounded-2xl flex items-center justify-center z-10 backdrop-blur-sm" style={{ opacity: 0.98 }}>
                        <div className="text-center">
                          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                            <CheckCircle2 size={36} className="text-green-500" />
                          </div>
                          <p className="text-lg font-bold text-[var(--text)]">Verified!</p>
                          <p className="text-sm text-[var(--text-muted)]">Redirecting...</p>
                        </div>
                      </div>
                    )}

                    <form onSubmit={handleOtpSubmit} onPaste={handleOtpPaste}>
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-xs font-semibold text-[var(--text)]">
                              Enter 6-Digit Code
                            </label>
                            <button
                              type="button"
                              onClick={() => {
                                setStep("phone");
                                setOtp(["", "", "", "", "", ""]);
                                setError("");
                              }}
                              className="text-xs text-[var(--text-muted)] hover:text-[var(--primary)] transition-colors flex items-center gap-1"
                            >
                              <ArrowLeft size={12} />
                              Change
                            </button>
                          </div>

                          <div className="flex gap-2 sm:gap-3 justify-center">
                            {otp.map((digit, index) => (
                              <input
                                key={index}
                                ref={(el) => { otpRefs.current[index] = el; }}
                                type="text"
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleOtpChange(index, e.target.value)}
                                onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold rounded-xl border-2 transition-all ${
                                  digit
                                    ? "border-[var(--primary)] bg-[var(--primary-light)]/10 text-[var(--primary)]"
                                    : "border-[var(--border)] bg-[var(--background)] text-[var(--text)] hover:border-gray-300"
                                } focus:outline-none focus:border-[var(--primary)] focus:shadow-[0_0_0_4px_rgba(var(--primary),0.1)]`}
                                autoFocus={index === 0}
                              />
                            ))}
                          </div>
                          {error && (
                            <p className="text-xs text-red-500 text-center mt-2">{error}</p>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={isSubmitting || otp.join("").length < 6}
                          className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white py-3.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-[var(--primary)]/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                        >
                          {isSubmitting ? (
                            <RefreshCw size={16} className="animate-spin" />
                          ) : (
                            <>
                              Verify & Login
                              <ArrowRight size={16} />
                            </>
                          )}
                        </button>

                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={timer > 0}
                            className="flex items-center gap-1.5 text-sm font-medium disabled:opacity-50 transition-colors"
                            style={{ color: timer > 0 ? 'var(--text-muted)' : 'var(--primary)' }}
                          >
                            {timer > 0 ? (
                              <>
                                <RefreshCw size={14} className="animate-spin" />
                                Resend in {timer}s
                              </>
                            ) : (
                              <>
                                <RefreshCw size={14} />
                                Resend OTP
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </>
            )}

            {activeTab === "email" && (
              <div className="p-6 sm:p-8">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full pl-11 pr-4 py-3.5 rounded-xl border-2 border-[var(--border)] bg-[var(--background)] text-sm font-medium text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-all focus:shadow-[0_0_0_4px_rgba(var(--primary),0.1)]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--text)] mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full pl-11 pr-11 py-3.5 rounded-xl border-2 border-[var(--border)] bg-[var(--background)] text-sm font-medium text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-all focus:shadow-[0_0_0_4px_rgba(var(--primary),0.1)]"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded border-[var(--border)] text-[var(--primary)] focus:ring-[var(--primary)]/20" />
                        <span className="text-xs text-[var(--text-secondary)]">Remember me</span>
                      </label>
                      <Link to="/forgot-password" className="text-xs text-[var(--primary)] font-medium hover:underline">
                        Forgot Password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white py-3.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-[var(--primary)]/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                    >
                      Sign In
                      <ArrowRight size={16} />
                    </button>

                    <p className="text-xs text-[var(--text-muted)] text-center">
                      Don't have an account?{" "}
                      <Link to="/signup" className="text-[var(--primary)] font-medium hover:underline">
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-[var(--text-muted)]">
              Need help?{" "}
              <Link to="/support" className="text-[var(--primary)] font-medium hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;