"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { supabase } from "@/lib/supabase/supabase";
import { signupSchema, type SignupFormData } from "@/lib/supabase/schema";

export default function SignUpPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function signUp(formData: SignupFormData) {
    setMessage("");
    setLoading(true);
  
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName.trim(),
            username: formData.username.trim(),
          },
        },
      });
  
      if (error) {
        console.error("SUPABASE SIGNUP ERROR:", error);
        setMessage(error.message);
        return;
      }
  
      if (!data.user) {
        setMessage("Unable to create your adventurer account.");
        return;
      }
  
      if (!data.session) {
        setMessage(
          "Account created! Please check your email to verify your account."
        );
        return;
      }
  
      router.push("/adventurer");
    } catch (error) {
      console.error("SIGNUP ERROR:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#1b1625] px-6 py-16 text-amber-100">
      <div className="mx-auto max-w-md">
       
        <div className="mb-10 text-center">
          <div className="text-6xl">🏰</div>

          <h1 className="mt-5 font-serif text-4xl font-bold text-amber-300">
            Join the Bazaar
          </h1>

          <p className="mt-3 text-amber-100/60">
            Create your Adventurer account and begin your journey.
          </p>
        </div>

        <div className="rounded-2xl border border-amber-700/40 bg-[#2A2338] p-8 shadow-2xl">
          <div className="space-y-5">

            <div>
              <label
                htmlFor="fullName"
                className="mb-2 block text-sm text-amber-200"
              >
                Full Name
              </label>

              <input
                id="fullName"
                type="text"
                autoComplete="name"
                placeholder="Please enter your full name"
                {...register("fullName")}
                className={`w-full rounded-lg bg-[#362F4A] px-4 py-3 text-amber-100 outline-none ring-1 transition ${
                  errors.fullName
                    ? "ring-red-500 focus:ring-red-400"
                    : "ring-[#4B3D65] focus:ring-amber-400"
                }`}
              />

              {errors.fullName && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="username"
                className="mb-2 block text-sm text-amber-200"
              >
                Username
              </label>

              <input
                id="username"
                type="text"
                placeholder="Please enter your username"
                {...register("username")}
                className={`w-full rounded-lg bg-[#362F4A] px-4 py-3 text-amber-100 outline-none ring-1 transition ${
                  errors.username
                    ? "ring-red-500 focus:ring-red-400"
                    : "ring-[#4B3D65] focus:ring-amber-400"
                }`}
              />

              {errors.username && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm text-amber-200"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                {...register("email")}
                className={`w-full rounded-lg bg-[#362F4A] px-4 py-3 text-amber-100 outline-none ring-1 transition ${
                  errors.email
                    ? "ring-red-500 focus:ring-red-400"
                    : "ring-[#4B3D65] focus:ring-amber-400"
                }`}
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm text-amber-200"
              >
                Password
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  {...register("password")}
                  className={`w-full rounded-lg bg-[#362F4A] px-4 py-3 pr-20 text-amber-100 outline-none ring-1 transition ${
                    errors.password
                      ? "ring-red-500 focus:ring-red-400"
                      : "ring-[#4B3D65] focus:ring-amber-400"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((previous) => !previous)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-amber-300 transition hover:text-amber-200"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm text-amber-200"
              >
                Confirm Password
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Please repeat your password"
                  {...register("confirmPassword")}
                  className={`w-full rounded-lg bg-[#362F4A] px-4 py-3 pr-20 text-amber-100 outline-none ring-1 transition ${
                    errors.confirmPassword
                      ? "ring-red-500 focus:ring-red-400"
                      : "ring-[#4B3D65] focus:ring-amber-400"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((previous) => !previous)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-amber-300 transition hover:text-amber-200"
                >
                  {showConfirmPassword ? "Hide" : "Show"}
                </button>
              </div>

              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {message && (
              <div className="rounded-lg border border-amber-700/30 bg-amber-950/20 p-3 text-sm text-amber-200">
                {message}
              </div>
            )}

            <button
              type="button"
              onClick={handleSubmit(signUp)}
              disabled={loading || !isValid}
              className="w-full rounded-lg bg-linear-to-r from-amber-600 to-yellow-500 py-3 font-semibold text-[#1b1625] transition hover:from-amber-500 hover:to-yellow-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading
                ? "Creating Account..."
                : "⚔️ Create Adventurer"}
            </button>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6 text-center">
            <p className="text-sm text-white/60">
              Already have an account?
            </p>

            <Link
              href="/adventurer"
              className="mt-2 inline-block font-medium text-amber-300 transition hover:text-amber-200"
            >
              Enter the Bazaar →
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