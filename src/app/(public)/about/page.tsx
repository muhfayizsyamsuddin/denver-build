import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";
import {
  BadgeCheck,
  ShieldCheck,
  BriefcaseBusiness,
  Handshake,
} from "lucide-react";

const values = [
  {
    title: "Quality",
    description:
      "We prioritize durable workmanship and appropriate construction standards.",
    icon: BadgeCheck,
  },
  {
    title: "Reliability",
    description:
      "We value clear communication and dependable execution.",
    icon: ShieldCheck,
  },
  {
    title: "Professionalism",
    description:
      "Projects are handled through a structured and responsible process.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Client Focus",
    description:
      "Every solution is adapted to the goals and needs of the client.",
    icon: Handshake,
  },
];

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Denver Build, our vision, mission, values, and approach to construction projects.",
};

export default async function AboutPage() {
  const company = await prisma.companyProfile.findFirst();

  return (
    <main className="bg-neutral-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
            About
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            About {company?.companyName ?? "Denver Build"}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-400">
            {company?.description ??
              "Professional construction, renovation, interior, and building services."}
          </p>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
                Company Overview
              </p>

              <h2 className="mt-4 max-w-lg text-3xl font-semibold tracking-tight">
                Building with purpose and practical execution.
              </h2>
            </div>

            <div className="space-y-5 text-sm leading-7 text-neutral-400 lg:border-l lg:border-white/10 lg:pl-10">
              <p>
                {company?.description ??
                  "Denver Build focuses on delivering dependable construction solutions for residential and commercial needs."}
              </p>

              {company?.history && <p>{company.history}</p>}
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                title: "Residential & Commercial",
                description:
                  "Solutions for homes, commercial spaces, and property improvements.",
              },
              {
                title: "Construction & Renovation",
                description:
                  "From new construction to renovation, upgrades, and finishing work.",
              },
              {
                title: "Planning to Completion",
                description:
                  "Projects are coordinated through every stage from planning to final delivery.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-white/10 bg-neutral-900 p-6"
              >
                <h3 className="font-semibold text-white">{item.title}</h3>

                <p className="mt-3 text-sm leading-6 text-neutral-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-neutral-900 p-6 transition hover:border-amber-500/30">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
              Vision
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              {company?.vision ?? "Vision information will be available soon."}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-neutral-900 p-6 transition hover:border-amber-500/30">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
              Mission
            </p>

            <p className="mt-4 leading-7 text-neutral-300">
              {company?.mission ?? "Mission information will be available soon."}
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
              Our Values
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              Principles behind every project.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group rounded-xl border border-white/10 bg-neutral-900 p-6 transition hover:border-amber-500/30"
                >
                  <div className="flex items-center justify-between">
                    <Icon className="h-5 w-5 text-neutral-500 transition group-hover:text-amber-400" />

                    <span className="text-xs font-medium text-neutral-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 font-semibold transition group-hover:text-amber-400">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-neutral-400">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}