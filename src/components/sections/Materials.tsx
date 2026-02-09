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
            note: "Essencial para laboratórios e UBS. Tenha pelo menos dois para revezamento.",
            images: [
                "/images/jalecos/jaleco01.jpeg",
                "/images/jalecos/jaleco02.jpeg",
                "/images/jalecos/jaleco03.jpeg"
            ]
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
                        <p className="text-sm opacity-90 leading-relaxed italic border-l-2 border-accent pl-4 mb-4">
                            "{item.note}"
                        </p>

                        {(item as any).images && (item as any).images.length > 0 && (
                            <div className="mt-4">
                                <div className="text-[10px] uppercase font-bold text-primary/60 mb-2 px-2">
                                    Exemplos de Bordado:
                                </div>
                                <div className="flex gap-3 overflow-x-auto pb-4 snap-x no-scrollbar">
                                    {(item as any).images.map((img: string, i: number) => (
                                        <div
                                            key={i}
                                            className="min-w-[85%] snap-center rounded-xl overflow-hidden border border-primary/20 bg-neutral-dark/50 p-1 shadow-xl relative"
                                        >
                                            <img
                                                src={img}
                                                alt={`Exemplo de ${item.name} ${i + 1}`}
                                                className="w-full h-auto rounded-lg"
                                            />
                                        </div>
                                    ))}
                                    {(item as any).images.length === 0 && (
                                        <div className="min-w-[85%] snap-center rounded-xl border border-dashed border-primary/20 bg-primary/5 p-4 flex flex-col items-center justify-center text-center">
                                            <Shirt className="w-8 h-8 text-primary/20 mb-2" />
                                            <p className="text-[10px] opacity-40 uppercase tracking-wider font-bold">
                                                Aguardando fotos...
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-center gap-1.5 mt-[-8px]">
                                    {(item as any).images.map((_: any, dotIndex: number) => (
                                        <div
                                            key={dotIndex}
                                            className="h-1 rounded-full w-4 bg-primary"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
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
