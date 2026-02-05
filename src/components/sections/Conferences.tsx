"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Mic2, MessageCircle } from "lucide-react";

export function Conferences() {
    return (
        <Section bg="green" className="justify-start">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-green-deep p-2 rounded-lg">
                    <Mic2 className="w-6 h-6 text-primary-light" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Conferências</h2>
            </div>

            <div className="space-y-6">
                <p className="text-lg leading-relaxed opacity-95">
                    Normalmente acontecem nos auditórios com todas as turmas juntas e com todos os professores da UC.
                </p>

                <div className="grid gap-6">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="bg-green-dark/40 border border-primary-light/10 p-5 rounded-2xl"
                    >
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            NCS
                        </h3>
                        <p className="text-sm opacity-90 leading-relaxed">
                            Podem ser introdutórias ou um "apanhado geral". Substituem a primeira ou a última tutoria. Professores organizam slides no método tradicional.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="bg-green-dark/40 border border-primary-light/10 p-5 rounded-2xl"
                    >
                        <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent" />
                            PMSUS
                        </h3>
                        <p className="text-sm opacity-90 leading-relaxed">
                            Funciona como uma revisão dos principais pontos a serem cobrados na prova. Abordam temáticas mais importantes de cada oficina.
                        </p>
                    </motion.div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary-light/60 mt-4">
                    <MessageCircle className="w-4 h-4" />
                    <span>Aulas de método tradicional</span>
                </div>
            </div>
        </Section>
    );
}
