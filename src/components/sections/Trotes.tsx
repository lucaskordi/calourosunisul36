"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { FiActivity, FiHeart, FiCopy, FiCheck } from "react-icons/fi";
import { useState } from "react";

import { FocusRail } from "@/components/ui/FocusRail";

export function Trotes() {
    const [copied, setCopied] = useState(false);
    const pixKey = "39411637-e69e-42c5-afc3-e39ca9d043fd";

    const images = [
        { id: 1, imageSrc: "/trote/trote01.jpeg" },
        { id: 2, imageSrc: "/trote/trote02.jpeg" },
        { id: 3, imageSrc: "/trote/trote03.jpeg" },
        { id: 4, imageSrc: "/trote/trote04.jpeg" },
        { id: 5, imageSrc: "/trote/trote05.jpeg" },
        { id: 6, imageSrc: "/trote/trote06.jpeg" },
        { id: 7, imageSrc: "/trote/trote07.jpeg" },
        { id: 8, imageSrc: "/trote/trote08.jpeg" },
        { id: 9, imageSrc: "/trote/trote09.jpeg" },
        { id: 10, imageSrc: "/trote/trote10.jpeg" },
        { id: 11, imageSrc: "/trote/trote11.jpeg" },
        { id: 12, imageSrc: "/trote/trote12.jpeg" },
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(pixKey);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <Section bg="green" className="justify-start pb-20" id="trotes">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-green-deep p-2 rounded-lg">
                    <FiActivity className="w-6 h-6 text-primary-light" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Trotes</h2>
            </div>

            <div className="space-y-6 mb-12">
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

            <div className="pt-10 border-t border-white/5 mx-[-2rem] px-8">
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-black tracking-tight text-white uppercase italic">Registros do Trote</h3>
                    <p className="text-xs opacity-50 uppercase tracking-[0.2em] mt-1 italic">Tradição e Boas-Vindas</p>
                </div>
                <FocusRail items={images} className="bg-transparent border-0" />
            </div>
        </Section>
    );
}
