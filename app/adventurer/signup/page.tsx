"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";
import { signupSchema } from "@/lib/supabase/schema";

export default function SignUpPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function signUp() {
    setMessage("");

    const result = signupSchema.safeParse({
      fullName,
      username,
      email,
      password,
      confirmPassword,
    });

    if (!result.success) {
      setMessage(result.error.issues[0].message);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    if (!user) {
      setMessage("Unable to create account.");
      setLoading(false);
      return;
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: user.id,
        full_name: fullName,
        username: username,
      });

    if (profileError) {
      setMessage(profileError.message);
      setLoading(false);
      return;
    }

    setLoading(false);

    router.push("/adventurer");
  }

  return (
    <main className="min-h-screen bg-[#1b1625] px-6 py-16 text-white">

      <div className="mx-auto max-w-md">

        <div className="mb-10 text-center">

          <div className="text-6xl">
            🏰
          </div>

          <h1 className="mt-5 font-serif text-4xl font-bold text-amber-300">
            Join the Bazaar
          </h1>

          <p className="mt-3 text-amber-100/60">
            Create your Adventurer account and begin your journey.
          </p>

        </div>

        <div className="rounded-2xl bg-[#2A2338] p-8 shadow-2xl">

          <div className="space-y-5">

            <div>

              <label className="mb-2 block text-sm">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg bg-[#362F4A] px-4 py-3 outline-none ring-1 ring-[#4B3D65] focus:ring-amber-400"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg bg-[#362F4A] px-4 py-3 outline-none ring-1 ring-[#4B3D65] focus:ring-amber-400"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-[#362F4A] px-4 py-3 outline-none ring-1 ring-[#4B3D65] focus:ring-amber-400"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm">
                Password
              </label>

              <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-[#362F4A] px-4 py-3 outline-none ring-1 ring-[#4B3D65] focus:ring-amber-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-amber-300 hover:text-amber-200"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm">
                Confirm Password
              </label>

              <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg bg-[#362F4A] px-4 py-3 outline-none ring-1 ring-[#4B3D65] focus:ring-amber-400"
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-amber-300 hover:text-amber-200"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
              </div>
            </div>

            {message && (
              <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-300">
                {message}
              </div>
            )}

            <button
              onClick={signUp}
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-amber-600 to-yellow-500 py-3 font-semibold text-[#1b1625] transition hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Creating Account..." : "⚔️ Create Adventurer"}
            </button>

          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-center">

            <p className="text-sm text-white/60">
              Already have an account?
            </p>

            <Link
              href="/adventurer"
              className="mt-2 inline-block font-medium text-amber-300 hover:text-amber-200"
            >
              Enter the Bazaar →
            </Link>

          </div>

        </div>

      </div>

    </main>
  );
}