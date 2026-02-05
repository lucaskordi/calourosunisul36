"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Calendar, Clock, Users } from "lucide-react";

export function Schedule() {
    return (
        <Section bg="neutral-dark" className="justify-start border-t border-primary/10">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-primary/20 p-2 rounded-lg">
                    <Calendar className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Horários e Turmas</h2>
            </div>

            <div className="space-y-6">
                <div className="bg-green-dark/20 border border-primary/20 p-5 rounded-2xl">
                    <div className="flex items-center gap-2 mb-4 text-primary">
                        <Users className="w-5 h-5" />
                        <h3 className="text-xl font-bold italic">Subturmas</h3>
                    </div>

                    <div className="grid grid-cols-4 gap-2 mb-6">
                        {["A", "B", "C", "D"].map((letter) => (
                            <div key={letter} className="bg-primary/10 border border-primary/20 aspect-square flex items-center justify-center rounded-xl text-2xl font-bold text-primary-light">
                                {letter}
                            </div>
                        ))}
                    </div>

                    <p className="text-sm opacity-80 leading-relaxed">
                        As turmas são divididas em quatro subgrupos (A, B, C e D) para as atividades práticas, laboratoriais e tutorias.
                    </p>
                </div>

                <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-primary rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative bg-neutral-dark border border-primary/10 p-5 rounded-2xl">
                        <div className="flex items-center gap-2 mb-3 text-primary">
                            <Clock className="w-4 h-4" />
                            <h4 className="font-bold uppercase text-xs tracking-widest">Atenção aos Horários</h4>
                        </div>
                        <p className="text-sm opacity-90">
                            Consulte sempre o cronograma semanal no <span className="text-primary font-bold italic underline">Minha Unisul</span>. Os horários podem variar dependendo da semana do complexo temático (SP).
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
