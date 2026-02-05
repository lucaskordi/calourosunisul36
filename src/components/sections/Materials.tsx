"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { ShoppingBag, Stethoscope, Ruler, Shirt, AlertCircle } from "lucide-react";

export function Materials() {
    const materials = [
        {
            name: "Estetoscópio & Esfigmo",
            icon: <Stethoscope className="w-5 h-5 text-primary" />,
            note: "Em cenários práticos como UBS, voluntariados ou ações comunitárias é bom que cada um tenha o seu para facilitar a dinâmica."
        },
        {
            name: "Jalecos",
            icon: <Shirt className="w-5 h-5 text-primary" />,
            note: "Essencial para laboratórios e UBS. Tenha pelo menos dois para revezamento."
        },
        {
            name: "Termômetro & Fita Métrica",
            icon: <Ruler className="w-5 h-5 text-primary" />,
            note: "Utensílios básicos para aferição de sinais vitais e medidas antropométricas."
        }
    ];

    return (
        <Section bg="dark" className="justify-start">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-accent p-2 rounded-lg">
                    <ShoppingBag className="w-6 h-6 text-primary-light" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Materiais Necessários</h2>
            </div>

            <div className="space-y-6">
                {materials.map((item, index) => (
                    <motion.div
                        key={item.name}
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-neutral-dark/40 border border-primary/20 p-5 rounded-2xl backdrop-blur-sm"
                    >
                        <div className="flex items-center gap-3 mb-3 text-primary">
                            {item.icon}
                            <h3 className="text-xl font-bold">{item.name}</h3>
                        </div>
                        <p className="text-sm opacity-90 leading-relaxed italic border-l-2 border-accent pl-4">
                            "{item.note}"
                        </p>
                    </motion.div>
                ))}

                <div className="bg-primary/5 border border-dashed border-primary/20 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <p className="text-xs opacity-70">
                        Dica: No primeiro ano, foque em materiais de qualidade que durem por todo o curso. Marcas como Littmann são referência para estetos.
                    </p>
                </div>
            </div>
        </Section>
    );
}
