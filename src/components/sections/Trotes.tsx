"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { FiActivity, FiHeart, FiCopy, FiCheck } from "react-icons/fi";
import { useState } from "react";

export function Trotes() {
    const [copied, setCopied] = useState(false);
    const pixKey = "39411637-e69e-42c5-afc3-e39ca9d043fd";

    const handleCopy = () => {
        navigator.clipboard.writeText(pixKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Section bg="green" className="justify-start">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-green-deep p-2 rounded-lg">
                    <FiActivity className="w-6 h-6 text-primary-light" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Trotes</h2>
            </div>

            <div className="space-y-6">
                <p className="text-lg leading-relaxed opacity-95">
                    O trote é o nosso momento de boas-vindas e integração com a maior e melhor turma de medicina!
                </p>

                <div className="bg-green-dark/40 border border-accent/30 p-6 rounded-2xl backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                        <FiHeart className="w-20 h-20 fill-current" />
                    </div>

                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        Contribuição
                    </h3>

                    <div className="text-4xl font-bold text-primary-light mb-2">R$ 30,00</div>
                    <p className="text-xs opacity-70 mb-6 uppercase tracking-widest font-bold text-primary-light">Valor único para participação</p>

                    <div className="bg-neutral-dark/40 border border-primary/20 p-4 rounded-xl">
                        <div className="text-xs uppercase tracking-widest opacity-60 mb-2">Pix (Davi Scheffel)</div>
                        <div className="flex items-center justify-between gap-4">
                            <code className="text-[10px] break-all opacity-90">{pixKey}</code>
                            <button
                                onClick={handleCopy}
                                className="bg-primary p-2 rounded-lg text-neutral-dark hover:bg-primary-light transition-colors"
                                title="Copiar Chave Pix"
                            >
                                {copied ? <FiCheck className="w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="flex items-center gap-3 p-4 bg-primary-light/10 rounded-xl"
                >
                    <FiHeart className="w-5 h-5 text-primary-light shrink-0" />
                    <p className="text-sm italic opacity-90">
                        "A participação não é obrigatória, mas adoraríamos ter vocês com a gente!"
                    </p>
                </motion.div>
            </div>
        </Section>
    );
}
