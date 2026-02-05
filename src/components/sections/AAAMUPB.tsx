"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Trophy, Users, Calendar, Shirt, Music, Target, Heart, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FocusRail } from "@/components/ui/FocusRail";

export function AAAMUPB() {
    const [activeFolder, setActiveFolder] = useState<string>("");
    const [folders, setFolders] = useState<string[]>([]);
    const [items, setItems] = useState<{ id: string; imageSrc: string; title?: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFolders() {
            try {
                const res = await fetch("/api/b2?type=folders&path=atletica/");
                const subFolders = await res.json();
                const allFolders = subFolders.map((s: string) => `atletica/${s}`);
                setFolders(allFolders);
                if (allFolders.length > 0) setActiveFolder(allFolders[0]);
            } catch (err) {
                console.error("Failed to load Atlética folders:", err);
            }
        }
        loadFolders();
    }, []);

    useEffect(() => {
        if (!activeFolder) return;
        async function loadImages() {
            setLoading(true);
            try {
                const res = await fetch(`/api/b2?path=${activeFolder}`);
                const files = await res.json();
                setItems(files.map((f: { id: string; url: string }) => ({
                    id: f.id,
                    imageSrc: f.url
                })));
            } catch (err) {
                console.error("Failed to load Atlética images:", err);
            } finally {
                setLoading(false);
            }
        }
        loadImages();
    }, [activeFolder]);

    const formatFolderName = (name: string) => {
        const base = name.split('/').pop()!;
        if (base === 'vii-jumed') return 'VII JuMed';
        if (base === 'happy-hour') return 'Happy Hour';
        return base.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    return (
        <Section bg="green" className="justify-start bg-[#1a2e71]" id="aaamupb">
            <div className="flex flex-col items-center mt-8 mb-8 text-center">
                <motion.div
                    initial={{ rotateY: 180, opacity: 0 }}
                    whileInView={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-48 h-48 mb-10 flex items-center justify-center relative group"
                >
                    <Image
                        src="/logoatletica.png"
                        alt="Logo Atlética"
                        fill
                        className="object-contain drop-shadow-xl"
                    />
                </motion.div>
                <h2 className="text-3xl font-bold tracking-tight text-white">Atlética (AAAMUPB)</h2>
            </div>

            <div className="space-y-8">
                <p className="text-lg leading-relaxed opacity-90 text-white">
                    <span className="font-bold text-[#7ec3ed]">A.A.A.M.U.P.B.</span> (Associação Atlética Acadêmica de Medicina Unisul Pedra Branca). Responsável pela integração, festas e esportes.
                </p>

                {/* Sectors */}
                <div className="bg-[#7ec3ed]/10 border border-[#7ec3ed]/20 p-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4 text-[#7ec3ed]">
                        <Users className="w-5 h-5" />
                        <h3 className="text-xl font-bold">7 Setores</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs font-medium opacity-80">
                        {["Executivo", "Esportes", "Eventos", "Marketing", "Produtos", "RH", "Bateria"].map(sector => (
                            <span key={sector} className="bg-[#1a2e71] px-3 py-1 rounded-full border border-[#7ec3ed]/30 text-[#7ec3ed]">
                                {sector}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Activities */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary-light">
                        <Calendar className="w-5 h-5" />
                        <h3 className="text-xl font-bold">1ª Semana de Aula</h3>
                    </div>

                    <div className="grid gap-3 text-white">
                        <motion.div initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} className="bg-white/5 p-4 rounded-xl border border-white/5 flex gap-3 items-center">
                            <Target className="w-5 h-5 text-[#7ec3ed] shrink-0" />
                            <div className="text-sm">
                                <strong>Trote dos Calouros:</strong> Primeiro dia de aula (23/02). Recepção com veteranos.
                            </div>
                        </motion.div>
                        <motion.div initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="bg-white/5 p-4 rounded-xl border border-white/5 flex gap-3 items-center">
                            <Music className="w-5 h-5 text-[#7ec3ed] shrink-0" />
                            <div className="text-sm">
                                <strong>HH Calourada:</strong> Sexta-feira (27/02). Integração total!
                            </div>
                        </motion.div>
                        <motion.div initial={{ x: -10, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-white/5 p-4 rounded-xl border border-white/5 flex gap-3 items-center">
                            <Shirt className="w-5 h-5 text-[#7ec3ed] shrink-0" />
                            <div className="text-sm">
                                <strong>Plantão de Vendas:</strong> Durante a semana no Bloco C. Garanta seu kit!
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Sports */}
                <div className="bg-neutral-dark/40 border border-white/10 p-5 rounded-2xl">
                    <h3 className="text-lg font-bold text-primary mb-3 flex items-center gap-2">
                        <Heart className="w-5 h-5" />
                        Calouros Atletas
                    </h3>
                    <p className="text-sm mb-4 opacity-80">Modalidades disponíveis para treinos:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-center">
                        {["Handebol", "Futebol", "Vôlei", "Basquete", "Natação", "Bateria"].map(sport => (
                            <div key={sport} className="bg-white/5 py-2 rounded-lg border border-white/5">{sport}</div>
                        ))}
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 text-center">
                        <a href="https://instagram.com/atleticamedpb" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                            @atleticamedpb
                        </a>
                    </div>
                </div>

                {/* Gallery */}
                <div className="pt-20 border-t border-white/5">
                    <div className="mb-12 text-center">
                        <h3 className="text-4xl font-bold text-white mb-2">Momento Atlética</h3>
                        <p className="text-[#7ec3ed]/60">Explore os registros da nossa integração.</p>
                    </div>
                    {loading ? (
                        <div className="h-[400px] flex flex-col items-center justify-center bg-white/5 rounded-2xl border border-white/5">
                            <Loader2 className="w-8 h-8 text-[#7ec3ed] animate-spin mb-4" />
                            <p className="text-sm text-white/60">Carregando memórias...</p>
                        </div>
                    ) : (
                        <FocusRail
                            items={items}
                            folders={folders}
                            activeFolder={activeFolder}
                            onFolderChange={setActiveFolder}
                            formatFolderName={formatFolderName}
                            className="bg-transparent border-0"
                        />
                    )}
                </div>
            </div>
        </Section>
    );
}
