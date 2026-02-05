"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { PenTool, Users, Lightbulb, GraduationCap, Info } from "lucide-react";

export function Metodologia() {
    return (
        <Section bg="neutral-dark" className="justify-start border-t border-primary/10">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary p-2 rounded-lg">
                    <PenTool className="w-6 h-6 text-neutral-dark" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Metodologia Científica</h2>
            </div>

            <div className="space-y-8">
                <div className="bg-neutral-dark/40 border border-primary/20 p-6 rounded-2xl backdrop-blur-sm">
                    <p className="text-sm opacity-90 leading-relaxed mb-6">
                        Matéria exclusiva do primeiro semestre (substituída por Antropologia no segundo). Foco prático na <span className="text-primary font-bold">elaboração de artigos e estudos científicos</span>.
                    </p>

                    <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="flex items-start gap-3">
                            <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                                <Users className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">Duplas ou Trios</h4>
                                <p className="text-xs opacity-70">A turma se divide para realizar um projeto de pesquisa semestral.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                                <Lightbulb className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">Tema Livre</h4>
                                <p className="text-xs opacity-70">Cada grupo escolhe o tema que deseja abordar em seu estudo.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="bg-primary/20 p-2 rounded-lg shrink-0">
                                <GraduationCap className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-sm font-bold">Aprovação</h4>
                                <p className="text-xs opacity-70">Definida pela entrega e apresentação final do projeto.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Vet Tip */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="bg-accent/10 border-2 border-accent/30 p-6 rounded-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 bg-accent text-primary-light px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-xl">
                        Dica de Vet!!
                    </div>
                    <div className="flex gap-4">
                        <Info className="w-5 h-5 text-accent shrink-0 mt-1" />
                        <p className="text-sm italic leading-relaxed opacity-90 pr-4">
                            "Peçam para seus veteranos o projeto que eles fizeram para terem uma noção de estrutura. No começo é difícil saber por onde começar, mas esses materiais ajudam muito e facilitam o processo!"
                        </p>
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
