"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { GraduationCap, CheckCircle2, AlertTriangle, Users, FileText, Book, Lightbulb } from "lucide-react";

export function Evaluations() {
    return (
        <Section bg="dark" className="justify-start">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary p-2 rounded-lg text-neutral-dark">
                    <GraduationCap className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Avaliações</h2>
            </div>

            <div className="space-y-12">
                {/* Grading System */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-primary border-b border-white/10 pb-2">Sistema de Notas</h3>
                    <div className="grid grid-cols-1 gap-2">
                        {[
                            { grade: "SE", desc: "Satisfatório com Excelência (100%)", color: "text-green-400" },
                            { grade: "S", desc: "Satisfatório (> 70%) - Aprovado", color: "text-primary" },
                            { grade: "PM", desc: "Precisa Melhorar (< 70%) - Reteste", color: "text-yellow-400" },
                            { grade: "I", desc: "Insatisfatório - Reprovado", color: "text-red-400" }
                        ].map(item => (
                            <div key={item.grade} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                                <span className={`font-bold w-8 ${item.color}`}>{item.grade}</span>
                                <span className="text-xs opacity-80">{item.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Provas e Avaliações */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                        <FileText className="w-5 h-5" />
                        <h3 className="text-xl font-bold">Provas e Avaliações</h3>
                    </div>

                    <div className="space-y-3">
                        <div className="bg-neutral-dark/40 border border-primary/20 p-5 rounded-2xl">
                            <h4 className="text-primary font-bold mb-2 text-sm uppercase tracking-wider">Provas Teóricas</h4>
                            <ul className="text-xs space-y-2 opacity-90 list-disc list-inside">
                                <li>Todas as UCs têm no mínimo 1 prova teórica.</li>
                                <li><strong>NCS:</strong> Dividida em D1, D2 e D3 (cada uma abrange ~4 SPs).</li>
                                <li><strong>Estrutura:</strong> 7 objetivas + 1 discursiva por SP.</li>
                                <li><strong>Aprovação:</strong> Mínimo de 70% de acertos (soma objetivas + discursivas).</li>
                            </ul>
                        </div>

                        <div className="bg-neutral-dark/40 border border-accent/20 p-5 rounded-2xl">
                            <h4 className="text-primary font-bold mb-2 text-sm uppercase tracking-wider">Avaliação Formativa (AF)</h4>
                            <p className="text-xs opacity-90 mb-2">
                                Avaliam o aluno duas vezes no semestre (AF1 e AF2).
                            </p>
                            <ul className="text-xs space-y-2 opacity-90">
                                <li className="flex gap-2"><CheckCircle2 className="w-3 h-3 text-primary" /> Critérios: presença, participação, proatividade.</li>
                                <li className="flex gap-2 text-red-300"><AlertTriangle className="w-3 h-3" /> Se não obtiver SATISFATÓRIO em uma das duas, precisa refazer a prova teórica final.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
