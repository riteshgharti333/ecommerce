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
  X,
} from "lucide-react";

const Login = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(30);
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  let interval: NodeJS.Timeout;

  useEffect(() => {
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep("phone");
      setPhoneNumber("");
      setOtp(["", "", "", "", "", ""]);
      setError("");
      setTimer(30);
      setIsVerified(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handlePhoneSubmit = (e) => {
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

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    const nextIndex = Math.min(pasted.length, 5);
    otpRefs.current[nextIndex]?.focus();
  };

  const handleOtpSubmit = (e) => {
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
          onClose();
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
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide-up Panel from Bottom Center */}
      <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
        <div
          className={`w-full max-w-md bg-[var(--background)]  rounded-[var(--radius-md)] rounded-b-none shadow-2xl transform transition-transform duration-300 ease-in-out overflow-y-auto pointer-events-auto ${
            isOpen ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ maxHeight: "90vh" }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-[var(--border)] transition-colors"
          >
            <X size={20} className="text-[var(--text-muted)]" />
          </button>

          {/* Drag Handle */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-[var(--border)]" />
          </div>

          {/* Brand Header */}
          <div className="text-center pt-4 pb-4 px-6">
            <Link to="/" className="inline-flex items-center gap-3 group mb-4">
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

            <h2 className="text-xl font-bold text-[var(--text)] mb-1">
              Welcome Back
            </h2>
            <p className="text-sm text-[var(--text-muted)]">
              Sign in to continue your skincare journey
            </p>
          </div>

          {/* Content */}
          <div className="px-6 pb-8">
            {/* Phone Step */}
            {step === "phone" && (
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
                          const cleaned = e.target.value
                            .replace(/\D/g, "")
                            .slice(0, 10);
                          setPhoneNumber(cleaned);
                          setError("");
                        }}
                        placeholder="Enter mobile number"
                        className="w-full pl-28 pr-4 py-3.5 rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] text-sm font-medium text-[var(--text)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--primary)] transition-all"
                        autoFocus
                      />
                    </div>
                    {error && (
                      <p className="text-xs text-red-500 mt-1.5">{error}</p>
                    )}
                  </div>

                  <div className="flex items-center gap-2 p-3 bg-[var(--primary-light)]/10 rounded-xl border border-[var(--primary)]/10">
                    <ShieldCheck
                      size={16}
                      className="text-[var(--primary)] flex-shrink-0"
                    />
                    <p className="text-xs text-[var(--text-secondary)]">
                      Your data is safe & encrypted
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || phoneNumber.length < 10}
                    className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white py-3.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
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
                </div>
              </form>
            )}

            {/* OTP Step */}
            {step === "otp" && (
              <div className="relative">
                {isVerified && (
                  <div className="absolute inset-0 bg-[var(--background)] rounded-2xl flex items-center justify-center z-10">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                        <CheckCircle2 size={36} className="text-green-500" />
                      </div>
                      <p className="text-lg font-bold text-[var(--text)]">
                        Verified!
                      </p>
                      <p className="text-sm text-[var(--text-muted)]">
                        Redirecting...
                      </p>
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
                            ref={(el) => {
                              otpRefs.current[index] = el;
                            }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) =>
                              handleOtpChange(index, e.target.value)
                            }
                            onKeyDown={(e) => handleOtpKeyDown(index, e)}
                            className={`w-12 h-14 sm:w-14 sm:h-16 text-center text-xl font-bold rounded-xl border-2 transition-all ${
                              digit
                                ? "border-[var(--primary)] bg-[var(--primary-light)]/10 text-[var(--primary)]"
                                : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:border-gray-300"
                            } focus:outline-none focus:border-[var(--primary)]`}
                            autoFocus={index === 0}
                          />
                        ))}
                      </div>
                      {error && (
                        <p className="text-xs text-red-500 text-center mt-2">
                          {error}
                        </p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || otp.join("").length < 6}
                      className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white py-3.5 rounded-xl font-semibold text-sm hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
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
                        style={{
                          color:
                            timer > 0 ? "var(--text-muted)" : "var(--primary)",
                        }}
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

            {/* Terms */}
            <p className="text-xs text-[var(--text-muted)] text-center mt-6">
              By continuing, you agree to our{" "}
              <Link
                to="/terms"
                className="text-[var(--primary)] font-medium hover:underline"
                onClick={onClose}
              >
                Terms
              </Link>{" "}
              &{" "}
              <Link
                to="/privacy"
                className="text-[var(--primary)] font-medium hover:underline"
                onClick={onClose}
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
