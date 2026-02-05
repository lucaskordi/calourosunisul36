"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Instagram, Phone, User, MessageCircle } from "lucide-react";

export function Comissao() {
    return (
        <Section bg="deep" className="justify-start">
            <div className="flex items-center gap-3 mb-10">
                <div className="bg-primary p-2 rounded-lg text-neutral-dark">
                    <User className="w-6 h-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Comissão de Formatura</h2>
            </div>

            <div className="space-y-8">
                <p className="text-lg leading-relaxed opacity-95">
                    Trabalhamos para garantir que nossa trajetória rumo ao CRM seja inesquecível!
                </p>

                <div className="bg-green-dark/60 border border-primary/20 p-6 rounded-3xl backdrop-blur-md shadow-2xl">
                    <div className="flex flex-col gap-6">
                        {/* Instagram */}
                        <a
                            href="https://instagram.com/medunisulpb36"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-4 group"
                        >
                            <div className="bg-accent p-3 rounded-2xl group-hover:scale-110 transition-transform">
                                <Instagram className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-xs uppercase tracking-widest opacity-60 font-bold">Instagram</div>
                                <div className="text-xl font-bold text-primary-light">@medunisulpb36</div>
                            </div>
                        </a>

                        {/* WhatsApp/Phone */}
                        <div className="flex flex-col gap-4">
                            <div className="h-px bg-primary/10 w-full" />
                            <div className="flex items-start gap-4">
                                <div className="bg-primary/20 p-3 rounded-2xl">
                                    <Phone className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <div className="text-xs uppercase tracking-widest opacity-60 font-bold">Contato Direto</div>
                                    <div className="text-lg font-bold text-primary-light">(48) 99970-8849</div>
                                    <div className="text-sm opacity-80 mt-1">
                                        <span className="font-bold text-primary">Fernanda Torres</span>
                                        <br />
                                        <span className="text-xs italic">Presidente da Comissão (Turma XXXVI)</span>
                                    </div>
                                </div>
                            </div>

                            <a
                                href="https://wa.me/5548999708849"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-2 bg-accent/20 hover:bg-accent/40 border border-accent/40 p-3 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm font-bold"
                            >
                                <MessageCircle className="w-4 h-4" />
                                Chamar no WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* Dicas de Vet */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="bg-white/5 border border-white/10 p-6 rounded-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 bg-primary text-neutral-dark px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-bl-xl">
                        Dicas de Vet
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-4">Para a Futura Comissão</h3>
                    <ul className="space-y-3">
                        {[
                            "Agilizem a formação: quanto antes, mais fácil fica a organização.",
                            "Mantenham representatividade igualitária entre as subturmas.",
                            "Comissões muito grandes atrapalham mais do que ajudam (3-4 por turma é ideal).",
                            "Consultem a turma antes de grandes decisões para evitar conflitos.",
                            "Cuidado com empresas: não se deixem levar pela emoção ou 'benefícios' iniciais."
                        ].map((dica, i) => (
                            <li key={i} className="text-xs flex gap-3 opacity-90 leading-relaxed">
                                <span className="text-primary font-bold">{i + 1}.</span>
                                {dica}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </Section>
    );
}
