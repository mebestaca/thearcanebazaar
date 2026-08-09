"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";
import { loginSchema } from "@/lib/supabase/schema";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const emailValidation = loginSchema.shape.email.safeParse(email);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace("/adventurer");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  async function signUp() {
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(
        error ? error.message : "Account created! Check your email, then log in."
    );
  }

  async function logIn() {
    setMessage("");

    const result = loginSchema.safeParse({
      email,
      password,
    });

    if (!result.success) {
      setMessage(result.error.issues[0].message);
      return;
    }

    setLoading(true);
   
    const { error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });

    if (error) {
      setMessage("Wrong email or password.");
    }

    setLoading(false);
  }

  async function signInWithGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/adventurer`,
      },
    });
  }

  return (
    <main className="min-h-screen bg-[#1b1625] px-6 py-16 text-amber-100">
      <div className="mx-auto max-w-md">

        <div className="mb-10 text-center">

          <div className="text-6xl">
            🏰
          </div>

          <h1 className="mt-5 font-serif text-4xl font-bold text-amber-300">
            Welcome Back
          </h1>

          <p className="mt-3 text-sm leading-6 text-amber-100/60">
            Continue your adventure through forgotten relics,
            enchanted games, and legendary treasures.
          </p>

        </div>

        <div className="rounded-2xl border border-amber-700/40 bg-[#2A2338] p-8 shadow-2xl">

          <h2 className="font-serif text-2xl font-bold text-amber-300">
            Enter the Bazaar
          </h2>

          <p className="mt-2 text-sm text-amber-100/40">
            Sign in to your adventurer account.
          </p>

          <div className="mt-8 space-y-5">

            <div>
              <label className="mb-2 block text-sm text-amber-200">
                Email
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                className={`w-full rounded-lg border bg-black/30 px-4 py-3 outline-none transition ${
                    emailTouched 
                        ? emailValidation.success
                            ? "border-green-500"
                            : "border-red-500"
                        : "border-amber-900/40"
                } focus:border-amber-500`}
              />

              {emailTouched && !emailValidation.success && (
                <p className="mt-2 text-sm text-red-400">
                    {emailValidation.error.issues[0].message}
                </p>
              )}

              {emailTouched && emailValidation.success && (
                <p className="mt-2 text-sm text-green-400">
                    ✓ Email looks good.
                </p>
              )}

            </div>

            <div>
              <label className="mb-2 block text-sm text-amber-200">
                Password
              </label>

              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-amber-900/40 bg-black/30 px-4 py-3 outline-none transition focus:border-amber-500"
              />
            </div>

            {message && (
              <div className="rounded-lg border border-red-900/50 bg-red-950/20 p-3 text-sm text-red-300">
                {message}
              </div>
            )}

            <button
              onClick={logIn}
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-amber-700 to-amber-500 py-3 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Entering..." : "⚔️ Enter the Bazaar"}
            </button>

            <div className="flex items-center gap-4">

              <div className="h-px flex-1 bg-amber-900/30" />

              <span className="text-xs uppercase tracking-widest text-amber-100/30">
                or
              </span>

              <div className="h-px flex-1 bg-amber-900/30" />

            </div>

            <button
              onClick={signInWithGoogle}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-amber-900/40 bg-white px-4 py-3 font-medium text-black transition-all duration-200 hover:bg-gray-100 hover:border-amber-700/50"
            >
                <GoogleIcon />
              Continue with Google

            </button>

          </div>

          <div className="mt-7 border-t border-amber-900/30 pt-6 text-center">

            <p className="text-sm text-amber-100/50">
              New to the Bazaar?
            </p>

            <Link
              href="/adventurer/signup"
              className="mt-2 inline-block font-medium text-amber-400 transition hover:text-amber-300"
            >
              Create an Adventurer Account →
            </Link>

          </div>

        </div>

        <p className="mt-10 text-center font-serif italic text-amber-100/30">
          "Every legend begins with a single step through the Bazaar."
        </p>

      </div>
    </main>
  );
}

function GoogleIcon() {
    return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
    <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14
    4.14 0 0 1-1.8 2.72v2.26h2.92c1.71-1.57 2.68-3.89 2.68-6.62z" />
    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-
    1.85.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
    <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0
    8.1l3.01-2.33z" />
    <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.47.9
    11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
    </svg>
    );
    }