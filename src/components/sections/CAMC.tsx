"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { DoorOpen, Coffee, Wind, Lightbulb, XCircle, Utensils, Info } from "lucide-react";

export function CAMC() {
    const rules = [
        { icon: <Utensils className="w-4 h-4" />, text: "Podem levar comida! Mas evitem marmita congelada ao meio dia para otimizar o tempo de todos." },
        { icon: <DoorOpen className="w-4 h-4" />, text: "Ambiente livre para descanso e estudo. Na hora do almoço, priorize deixar mesas para quem vai comer!" },
        { icon: <XCircle className="w-4 h-4" />, text: "Não leve xícaras, copos e talheres para fora da salinha." },
        { icon: <Utensils className="w-4 h-4" />, text: "Utilizou? Lavou! Vamos manter a pia limpa." },
        { icon: <Coffee className="w-4 h-4" />, text: "Contribua com R$ 1,00 para o café (caixinha ou Pix) para mantermos o vício de todos!" },
        { icon: <Info className="w-4 h-4" />, text: "Cuidado com os eletrodomésticos, especial as cafeteiras!" },
        { icon: <Wind className="w-4 h-4" />, text: "Último a sair? Desligue o ar, apague a luz e feche as janelas." },
        { icon: <DoorOpen className="w-4 h-4" />, text: "Respeito acima de tudo para mantermos a boa convivência!" },
    ];

    return (
        <Section bg="dark" className="justify-start">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary p-2 rounded-lg text-neutral-dark">
                    <DoorOpen className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">CAMC</h2>
            </div>

            <div className="space-y-6">
                <div className="bg-neutral-dark/40 border border-primary/20 p-5 rounded-2xl">
                    <h3 className="text-lg font-bold text-primary mb-2">Sala 115 - Bloco H</h3>
                    <p className="text-sm opacity-80 leading-relaxed mb-4">
                        Nossa salinha conta com microondas, cafeteiras, geladeiras, mesas e espaço para descanso.
                    </p>

                    <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-start gap-2 bg-primary/10 p-3 rounded-xl border border-primary/20">
                            <Lightbulb className="w-4 h-4 text-primary mt-1" />
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider block mb-1">SAMED</span>
                                <p className="text-xs opacity-80">3 dias de palestras e debates organizado pelas ligas. Inclui workshops práticos.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-2 bg-accent/10 p-3 rounded-xl border border-accent/20">
                            <Info className="w-4 h-4 text-primary mt-1" />
                            <div>
                                <span className="text-xs font-bold uppercase tracking-wider block mb-1">Cerimônia do Jaleco</span>
                                <p className="text-xs opacity-80">Evento simbólico com familiares. Ocorre nos primeiros meses de aula.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-primary/60 px-2">Regras da Salinha</h4>
                    <div className="grid gap-3">
                        {rules.map((rule, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-start gap-4 p-3 bg-neutral-dark/40 border border-primary/5 rounded-xl"
                            >
                                <div className="mt-1 text-primary">{rule.icon}</div>
                                <p className="text-sm opacity-90 leading-snug">{rule.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
