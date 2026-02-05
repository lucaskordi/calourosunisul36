"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Home, Users, BookOpen, AlertCircle, MapPin, ClipboardList } from "lucide-react";

export function PMSUS() {
    const professors = ["Léia", "Ilse", "Flávio", "Fran", "Fabi"];

    return (
        <Section bg="green" className="justify-start">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-green-deep p-2 rounded-lg text-primary-light">
                    <MapPin className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">PMSUS*</h2>
            </div>

            <div className="space-y-8">
                {/* UBS */}
                <div className="bg-green-dark/40 border border-primary/20 p-6 rounded-2xl backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                        <Home className="w-6 h-6" />
                        Atuação na UBS
                    </h3>
                    <div className="space-y-4 mb-6">
                        <p className="text-sm opacity-90 leading-relaxed">
                            Grupos de 6 a 7 pessoas (sorteados). O objetivo é conhecer a rotina da <span className="font-bold text-primary">triagem, sala de curativos, farmácia, consultas</span> e a dinâmica dos territórios.
                        </p>

                        <div className="bg-neutral-dark/30 p-4 rounded-xl border border-white/5">
                            <div className="text-xs font-bold uppercase tracking-widest text-primary-light mb-3">Regras Obrigatórias:</div>
                            <ul className="grid grid-cols-1 gap-2">
                                {[
                                    "Jaleco bordado (Nome + Curso + Facul)",
                                    "Crachá da universidade",
                                    "Calça sem rasgos",
                                    "Sapato fechado",
                                    "Cabelo preso"
                                ].map((rule, i) => (
                                    <li key={i} className="text-[11px] flex items-center gap-2">
                                        <AlertCircle className="w-3 h-3 text-primary shrink-0" />
                                        {rule}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Reflexão da Prática */}
                <div className="bg-green-dark/40 border border-primary/20 p-6 rounded-2xl backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                        <ClipboardList className="w-6 h-6" />
                        Reflexão da Prática
                    </h3>
                    <div className="space-y-4 mb-6">
                        <p className="text-sm opacity-90 leading-relaxed">
                            Estudo teórico sobre o <span className="text-primary font-bold">SUS</span> e discussão das vivências na UBS.
                        </p>

                        <div className="bg-primary/5 border border-primary/20 p-4 rounded-xl">
                            <div className="text-xs font-bold mb-2">Pautas Acadêmicas:</div>
                            <p className="text-xs opacity-80 leading-relaxed">
                                SUS, RAS, Imunização, Sigilo Médico e Aspectos Organizacionais.
                            </p>
                        </div>

                        <div className="text-[11px] space-y-2 opacity-90 italic border-l-2 border-accent pl-3">
                            <p>• Oficinas de Trabalho (OT)</p>
                            <p>• Síntese Provisória periodicamente</p>
                            <p>• Questões de Aprendizagem (QA)</p>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-white/10">
                        <div className="text-[10px] uppercase tracking-wider opacity-50 mb-3 text-primary">Professores:</div>
                        <div className="flex flex-wrap gap-2">
                            {professors.map((p) => (
                                <span key={p} className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-[10px] font-medium text-primary">
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
