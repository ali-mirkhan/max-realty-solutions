import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, Mail, Globe } from "lucide-react";
import agentsData from "@/data/agents.json";
import AgentContactButton from "../AgentContactButton";

interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  photo: string;
  languages: string[];
  specialization: string;
  bio: string;
}

const agents = agentsData as Agent[];

export function generateStaticParams() {
  return agents.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const agent = agents.find((a) => a.id === params.id);
  if (!agent) return { title: "Agent Not Found" };
  return {
    title: `${agent.name} — ${agent.title}`,
    description: agent.bio.slice(0, 160),
  };
}

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  const agent = agents.find((a) => a.id === params.id);
  if (!agent) notFound();

  const initials = (() => {
    const parts = agent.name.trim().split(/\s+/);
    return parts.length >= 2
      ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
      : parts[0].slice(0, 2).toUpperCase();
  })();

  return (
    <>
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-border">
        <div className="container py-4">
          <Link href="/agents" className="inline-flex items-center gap-2 text-sm text-charcoal/50 hover:text-burgundy transition-colors">
            <ArrowLeft size={14} /> Back to Team
          </Link>
        </div>
      </div>

      <section className="py-12 lg:py-20">
        <div className="container">
          <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">

            {/* Left — Photo + Contact */}
            <div className="space-y-6">
              <div className="rounded-xl overflow-hidden aspect-[3/4] relative bg-stone-light shadow-md">
                {agent.photo ? (
                  <Image
                    src={agent.photo}
                    alt={agent.name}
                    fill
                    className="object-cover object-top"
                    priority
                    sizes="(max-width: 1024px) 100vw, 320px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-burgundy/10">
                    <span className="text-5xl font-serif font-bold text-burgundy">{initials}</span>
                  </div>
                )}
              </div>

              {/* Contact card */}
              <div className="bg-stone-light rounded-lg p-6 space-y-3">
                {agent.phone && (
                  <a href={`tel:${agent.phone.replace(/\D/g, "")}`} className="flex items-center gap-3 text-sm text-charcoal/70 hover:text-burgundy transition-colors">
                    <Phone size={15} className="text-burgundy shrink-0" />
                    {agent.phone}
                  </a>
                )}
                {agent.email && (
                  <a href={`mailto:${agent.email}`} className="flex items-center gap-3 text-sm text-charcoal/70 hover:text-burgundy transition-colors">
                    <Mail size={15} className="text-burgundy shrink-0" />
                    {agent.email}
                  </a>
                )}
                {agent.languages.length > 0 && (
                  <div className="flex items-start gap-3 text-sm text-charcoal/70">
                    <Globe size={15} className="text-burgundy shrink-0 mt-0.5" />
                    <span>{agent.languages.join(", ")}</span>
                  </div>
                )}
                <div className="pt-2">
                  <AgentContactButton name={agent.name} />
                </div>
              </div>
            </div>

            {/* Right — Bio */}
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-burgundy mb-2">
                Max Realty Solutions
              </p>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold text-charcoal mb-1">
                {agent.name}
              </h1>
              <p className="text-base text-charcoal/50 font-medium mb-8">{agent.title}</p>

              {agent.specialization && (
                <div className="mb-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium text-burgundy bg-burgundy/10 rounded-full">
                    {agent.specialization}
                  </span>
                </div>
              )}

              <h2 className="font-serif text-xl font-semibold text-charcoal mb-4">About</h2>
              <div className="prose prose-sm max-w-none text-charcoal/70 leading-relaxed space-y-4">
                {agent.bio.split("\n").filter(Boolean).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-stone-border">
                <p className="text-sm text-charcoal/50 mb-4">
                  Interested in working with {agent.name.split(" ")[0]}?
                </p>
                <div className="flex flex-wrap gap-3">
                  <AgentContactButton name={agent.name} />
                  <Link href="/properties" className="px-5 py-2.5 text-sm font-semibold text-burgundy border border-burgundy/30 rounded-md hover:bg-burgundy/5 transition-colors">
                    Browse Listings
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
