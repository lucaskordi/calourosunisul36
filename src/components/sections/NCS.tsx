"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Microscope, Users2, Stethoscope, AlertCircle, BookOpen, Brain } from "lucide-react";

export function NCS() {
    const professors = {
        tutoria: ["Ingrid", "Emilly", "Thaise", "Ana Paula", "Marcos", "Celino"],
        laboratorio: ["Erasmo", "Thiago", "Daiane", "Eduardo"],
    };

    return (
        <Section bg="dark" className="justify-start">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary p-2 rounded-lg">
                    <Microscope className="w-6 h-6 text-neutral-dark" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">NCS*</h2>
            </div>

            <div className="space-y-8">
                {/* Tutoria */}
                <div className="bg-neutral-dark/40 border border-primary/20 p-6 rounded-2xl backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                        <Users2 className="w-6 h-6" />
                        Tutoria
                    </h3>
                    <ul className="space-y-3 mb-6">
                        {[
                            "Principal unidade curricular (é o guia da semana)",
                            "Geralmente dividido em grupos de 15 pessoas",
                            "Funciona como um compilado de várias matérias",
                            "SP (Situação Problema): A cada semana abrimos uma Síntese Provisória e na seguinte apresentamos a Nova Síntese",
                            "Coordenador e relator mudam a cada semana",
                            "Passos: palavras desconhecidas, problemas, hipóteses e questões de aprendizagem"
                        ].map((item, i) => (
                            <li key={i} className="text-sm opacity-90 flex items-start gap-2">
                                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                        {professors.tutoria.map((p) => (
                            <span key={p} className="bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-xs font-medium">
                                {p}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Medicina Laboratorial */}
                <div className="bg-neutral-dark/40 border border-primary/20 p-6 rounded-2xl backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                        <Stethoscope className="w-6 h-6" />
                        Medicina Laboratorial
                    </h3>
                    <div className="space-y-4 mb-4">
                        <p className="text-sm opacity-90 leading-relaxed">
                            No Ulife é disponibilizado uma <span className="text-primary font-bold">pré-aula</span> semanal que conta pontuação e guia os estudos. Conteúdos: histologia, parasitologia e microscopia.
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {["Jaleco obrigatório", "Calça sem rasgos", "Cabelo preso", "Sapato fechado"].map(rule => (
                                <div key={rule} className="bg-accent/5 p-2 rounded-lg text-[10px] text-center uppercase tracking-wider border border-accent/10 italic">
                                    {rule}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-sm font-semibold text-primary">Professora: Letticia</div>
                </div>

                {/* Morfofuncional */}
                <div className="bg-neutral-dark/40 border border-primary/20 p-6 rounded-2xl backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                        <Brain className="w-6 h-6" />
                        Laboratório Morfofuncional
                    </h3>
                    <div className="space-y-4 mb-6">
                        <p className="text-sm opacity-90 leading-relaxed">
                            Teoria e prática no laboratório anatômico (<span className="text-primary font-bold">anatomia, fisiologia e histologia</span>). Sempre confira a pré-aula no Ulife!
                        </p>
                        <div className="grid grid-cols-2 gap-2">
                            {["Cabelo preso", "Calça sem rasgos", "Sapato fechado", "Jaleco"].map(rule => (
                                <div key={rule} className="bg-white/5 p-2 rounded-lg text-[10px] text-center uppercase tracking-wider border border-white/10 italic">
                                    {rule}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {professors.laboratorio.map((p) => (
                            <span key={p} className="bg-accent/10 border border-accent/20 px-3 py-1 rounded-full text-xs font-medium">
                                {p}
                            </span>
                        ))}
                    </div>
                </div>

                {/* TBL */}
                <div className="bg-neutral-dark/40 border border-accent/20 p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden">
                    <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                        <BookOpen className="w-6 h-6" />
                        TBL (Team Based Learning)
                    </h3>
                    <p className="text-sm opacity-90 leading-relaxed mb-4">
                        Pré-aula introduz o conteúdo. Questões em grupo (6-7 pessoas) seguido de discussão geral e <span className="text-primary font-bold">resumo expositivo</span>.
                    </p>
                    <div className="text-sm font-semibold text-primary">Professora: Léia</div>
                </div>
            </div>
        </Section>
    );
}
