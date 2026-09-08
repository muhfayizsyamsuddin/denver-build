"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (!result || result.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="hidden border-r border-white/10 bg-neutral-900 lg:flex lg:flex-col lg:justify-between lg:p-12">
          <div>
            <div className="text-xl font-semibold tracking-tight">
              Denver Build
            </div>
          </div>

          <div className="max-w-lg">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.24em] text-amber-500">
              Admin CMS
            </p>

            <h1 className="text-5xl font-semibold leading-tight tracking-tight">
              Manage your company website from one place.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-neutral-400">
              Manage projects, services, testimonials, company information,
              and customer inquiries through the Denver Build CMS.
            </p>
          </div>

          <p className="text-sm text-neutral-500">
            Denver Build Content Management System
          </p>
        </section>

        <section className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            <div className="mb-10 lg:hidden">
              <div className="text-xl font-semibold tracking-tight">
                Denver Build
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
                Admin Access
              </p>

              <h2 className="text-3xl font-semibold tracking-tight">
                Welcome back
              </h2>

              <p className="mt-3 text-sm leading-6 text-neutral-400">
                Sign in with your administrator account to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-200"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-amber-500"
                  placeholder="admin@denverbuild.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-neutral-200"
                >
                  Password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  required
                  className="w-full rounded-lg border border-white/10 bg-neutral-900 px-4 py-3 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-amber-500"
                  placeholder="Enter your password"
                />
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-amber-500 px-4 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}