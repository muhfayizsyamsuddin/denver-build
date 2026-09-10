import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { prisma } from "@/lib/prisma";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: {
      slug,
    },
  });

  if (!project || !project.isPublished) {
    return {};
  }

  return {
    title: project.title,
    description: project.shortDescription,

    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.thumbnailUrl
        ? [
            {
              url: project.thumbnailUrl,
            },
          ]
        : undefined,
    },
  };
}

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;

  const project = await prisma.project.findUnique({
    where: {
      slug,
    },
    include: {
      images: {
        orderBy: {
          displayOrder: "asc",
        },
      },
    },
  });

  if (!project || !project.isPublished) {
    notFound();
  }

  return (
    <main className="bg-neutral-950 text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <Link
            href="/projects"
            className="text-sm text-neutral-500 transition hover:text-white"
          >
            ← Back to Projects
          </Link>

          <p className="mt-8 text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
            {project.category}
          </p>

          <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-400">
            {project.shortDescription}
          </p>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-neutral-500">
            <div>
              <p className="text-xs uppercase tracking-wide">
                Location
              </p>
              <p className="mt-1 text-neutral-300">
                {project.location}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide">
                Completed
              </p>
              <p className="mt-1 text-neutral-300">
                {project.completionYear}
              </p>
            </div>
          </div>
        </div>
      </section>

      {project.thumbnailUrl && (
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="relative aspect-video overflow-hidden rounded-xl">
              <Image
                src={project.thumbnailUrl}
                alt={project.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-white/10">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[280px_1fr]">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
              Project Overview
            </p>
          </div>

          <div>
            <p className="whitespace-pre-wrap leading-8 text-neutral-300">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      {project.images.length > 0 && (
        <section className="border-b border-white/10">
          <div className="mx-auto max-w-7xl px-6 py-20">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
              Gallery
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {project.images.map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-4/3 overflow-hidden rounded-xl"
                >
                  <Image
                    src={image.imageUrl}
                    alt={image.altText ?? project.title}
                    fill
                    className="object-cover transition duration-500 hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-6 py-14 text-center sm:px-10">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-500">
              Start Your Project
            </p>

            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-semibold tracking-tight">
              Inspired by this project?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-neutral-400">
              Tell us what you want to build and we&apos;ll help you discuss the
              next steps.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-amber-400"
            >
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}