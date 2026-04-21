import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import agentsData from "@/data/agents.json";
import AgentContactButton from "./AgentContactButton";

export const metadata: Metadata = {
  title: "Meet Our Team",
  description: "Meet the experienced agents and brokers at Max Realty Solutions serving buyers, sellers and investors across the Greater Toronto Area.",
};

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

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(/\s+/);
  const initials = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : parts[0].slice(0, 2);
  return (
    <div className="w-full h-full flex items-center justify-center bg-burgundy/10">
      <span className="text-3xl font-serif font-bold text-burgundy">{initials.toUpperCase()}</span>
    </div>
  );
}

export default function AgentsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-charcoal py-20 lg:py-28">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-widest text-[#E8E4DE]/60 mb-3">Our Agents</p>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Meet the Max Realty Team
            </h1>
            <p className="text-lg text-[#E8E4DE]/80 leading-relaxed">
              Experienced agents serving buyers, sellers and investors across the Greater Toronto Area.
            </p>
          </div>
        </div>
      </section>

      {/* Agent Grid */}
      <section className="py-20 lg:py-28">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {agents.map((agent) => (
              <div key={agent.id} className="bg-white border border-stone-border rounded-lg overflow-hidden hover:border-burgundy/20 hover:shadow-lg transition-all">
                {/* Photo */}
                <Link href={`/agents/${agent.id}`} className="block">
                  <div className="aspect-[4/3] relative overflow-hidden bg-stone-light">
                    {agent.photo ? (
                      <Image
                        src={agent.photo}
                        alt={agent.name}
                        fill
                        className="object-cover object-top hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <Initials name={agent.name} />
                    )}
                  </div>
                </Link>

                {/* Info */}
                <div className="p-6">
                  <Link href={`/agents/${agent.id}`} className="group">
                    <h2 className="font-serif text-lg font-semibold text-charcoal group-hover:text-burgundy transition-colors mb-0.5">
                      {agent.name}
                    </h2>
                  </Link>
                  <p className="text-xs text-burgundy font-medium uppercase tracking-wide mb-4">{agent.title}</p>

                  <div className="space-y-2 mb-4">
                    {agent.phone && (
                      <a href={`tel:${agent.phone.replace(/\D/g, "")}`} className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-burgundy transition-colors">
                        <Phone size={13} className="shrink-0" />
                        {agent.phone}
                      </a>
                    )}
                    {agent.email && (
                      <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-sm text-charcoal/60 hover:text-burgundy transition-colors truncate">
                        <Mail size={13} className="shrink-0" />
                        {agent.email}
                      </a>
                    )}
                  </div>

                  {agent.languages.length > 0 && (
                    <p className="text-xs text-charcoal/40 mb-4">
                      Languages: {agent.languages.join(", ")}
                    </p>
                  )}

                  <AgentContactButton name={agent.name} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
