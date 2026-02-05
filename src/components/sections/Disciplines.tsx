"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { LayoutGrid } from "lucide-react";

export function Disciplines() {
    const ucs = [
        { name: "NCS*", full: "Necessidades e Cuidados em Saúde" },
        { name: "PMSUS*", full: "Práticas Médicas no SUS" },
        { name: "HM*", full: "Habilidades Médicas" },
        { name: "Metodologia*", full: "Metodologia Científica" },
    ];

    return (
        <Section bg="light" className="justify-center">
            <div className="flex items-center gap-3 mb-10 text-neutral-dark">
                <div className="bg-primary p-2 rounded-lg">
                    <LayoutGrid className="w-6 h-6 text-neutral-dark" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Disciplinas</h2>
            </div>

            <div className="grid gap-4">
                {ucs.map((uc, index) => (
                    <motion.div
                        key={uc.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-neutral-dark/5 border border-neutral-dark/10 p-5 rounded-2xl hover:bg-primary/20 transition-colors"
                    >
                        <div className="text-2xl font-bold text-accent mb-1">{uc.name}</div>
                        <div className="text-neutral-dark opacity-70 font-medium">{uc.full}</div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 p-4 border border-dashed border-neutral-dark/30 rounded-xl"
            >
                <p className="text-xs text-neutral-dark/60 leading-relaxed italic">
                    * As matérias com asterisco são as chamadas <span className="font-bold">Unidades Curriculares (UCs)</span>. É dessa forma que elas aparecerão nos aplicativos e portais da universidade.
                </p>
            </motion.div>
        </Section>
    );
}
