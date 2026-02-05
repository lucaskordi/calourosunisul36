"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { FileBarChart2, Percent, Calculator, ListChecks } from "lucide-react";

export function Results() {
    return (
        <Section bg="green" className="justify-start">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-green-deep p-2 rounded-lg">
                    <FileBarChart2 className="w-6 h-6 text-primary-light" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Provas e Resultados</h2>
            </div>

            <div className="space-y-6">
                <div className="bg-green-dark/40 border border-primary-light/10 p-5 rounded-2xl">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <ListChecks className="w-5 h-5 text-primary" />
                        Estrutura Geral
                    </h3>
                    <p className="text-sm opacity-90 leading-relaxed">
                        Todas as UCs fazem no mínimo <span className="font-bold">1 prova teórica</span> por semestre (NCS, PMSUS, HM e Metodologia).
                    </p>
                </div>

                <div className="bg-green-dark/40 border border-accent/30 p-5 rounded-2xl backdrop-blur-sm">
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-primary">
                        <Calculator className="w-5 h-5" />
                        Especial: NCS
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="bg-accent/40 px-2 py-0.5 rounded text-[10px] font-bold mt-1">D1/D2/D3</div>
                            <p className="text-xs opacity-90">
                                A NCS é dividida em 3 grandes provas (D1, D2, D3), cada uma cobrindo aprox. 4 SPs.
                            </p>
                        </div>

                        <motion.div
                            initial={{ scale: 0.98, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="bg-primary/10 border border-primary/30 p-4 rounded-xl"
                        >
                            <div className="text-xs font-bold uppercase tracking-wider mb-2 flex justify-between">
                                <span>Composição por SP</span>
                                <Percent className="w-3 h-3" />
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <div>7 Objetivas + 1 Discursiva</div>
                                <div className="text-primary-light font-bold">Mín. 70% acerto</div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-3 bg-neutral-dark/30 rounded-full border border-primary/20">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-widest opacity-80">
                        PM (Precisa Melhorar) = <span className="text-primary">Recuperação</span>
                    </span>
                </div>
            </div>
        </Section>
    );
}
