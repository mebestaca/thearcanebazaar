"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";

type Profile = {
id: string;
username: string;
full_name: string;
avatar_url: string | null;
created_at: string;
updated_at: string;
};

export default function ProfilePage() {
const router = useRouter();

const [profile, setProfile] = useState<Profile | null>(null);
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(true);
const [message, setMessage] = useState("");

useEffect(() => { async function loadProfile() {
setLoading(true);
setMessage("");

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    router.replace("/adventurer");
    return;
  }

  setEmail(user.email ?? "");

  const { data: profileData, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) {
    console.error("Profile error:", profileError);

    setMessage("Unable to load your adventurer profile.");
    setLoading(false);
    return;
  }

  setProfile(profileData);
  setLoading(false);
}

  loadProfile();
}, [router]);

async function logOut() { 
  await supabase.auth.signOut();
  router.replace("/adventurer");
}

  if (loading) {
  return ( 
  <main className="min-h-screen bg-[#1B1625] px-6 py-16 text-amber-100"> 
    <div className="mx-auto max-w-4xl text-center"> 
      <div className="text-5xl">🏰</div>
        <p className="mt-6 text-amber-200/60">
          Opening your adventurer profile...
        </p>
      </div>
    </main>
  );
}

  if (!profile) {
  return ( 
  <main className="min-h-screen bg-[#1B1625] px-6 py-16 text-amber-100"> 
    <div className="mx-auto max-w-md text-center"> 
      <div className="text-5xl">⚠️</div>
        <h1 className="mt-5 font-serif text-3xl font-bold text-amber-300">
          Profile Not Found
        </h1>

        <p className="mt-4 text-amber-100/60">
          {message || "We could not find your adventurer profile."}
        </p>

        <button
          onClick={() => router.replace("/adventurer")}
          className="mt-8 rounded-lg bg-gradient-to-r from-amber-700 to-amber-500 px-6 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Return to the Bazaar
        </button>
      </div>
    </main>
  );
}

return ( 
  <main className="min-h-screen bg-[#1B1625] px-6 py-16 text-amber-100"> 
    <div className="mx-auto max-w-4xl">
      <div className="mb-10 text-center">
        <div className="text-6xl">🏰</div>

        <h1 className="mt-5 font-serif text-4xl font-bold text-amber-300">
          Welcome, {profile.full_name}
        </h1>

        <p className="mt-3 text-amber-100/60">
          Your Adventurer profile
        </p>
      </div>

      <div className="rounded-2xl border border-amber-700/40 bg-[#2A2338] p-8 shadow-2xl">

        <div className="flex flex-col items-center gap-6 sm:flex-row">

          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-2 border-amber-500/40 bg-[#362F4A] text-5xl">
            🧙
          </div>

          <div className="text-center sm:text-left">
            <h2 className="font-serif text-3xl font-bold text-amber-300">
              {profile.full_name}
            </h2>

            <p className="mt-2 text-lg text-amber-100/60">
              @{profile.username}
            </p>

            <p className="mt-2 text-sm text-amber-100/40">
              {email}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">

          <div className="rounded-xl border border-amber-900/30 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-widest text-amber-100/40">
              Full Name
            </p>

            <p className="mt-2 text-lg text-amber-100">
              {profile.full_name}
            </p>
          </div>

          <div className="rounded-xl border border-amber-900/30 bg-black/20 p-5">
            <p className="text-xs uppercase tracking-widest text-amber-100/40">
              Username
            </p>

            <p className="mt-2 text-lg text-amber-100">
              @{profile.username}
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">

          <button
            onClick={logOut}
            className="rounded-lg border border-red-900/40 bg-red-950/20 px-6 py-3 font-semibold text-red-300 transition hover:bg-red-950/40"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  </main>
  );
}
