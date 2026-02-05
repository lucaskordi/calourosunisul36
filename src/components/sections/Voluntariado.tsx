"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { HandHelping, Award, FileCheck, Search, Info, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { FocusRail } from "@/components/ui/FocusRail";

export function Voluntariado() {
    const [activeFolder, setActiveFolder] = useState<string>("");
    const [folders, setFolders] = useState<string[]>([]);
    const [items, setItems] = useState<{ id: string; imageSrc: string }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadFolders() {
            try {
                const res = await fetch("/api/b2?type=folders&path=voluntariado/");
                const subFolders = await res.json();
                const allFolders = subFolders.map((s: string) => `voluntariado/${s}`);
                setFolders(allFolders);
                if (allFolders.length > 0) setActiveFolder(allFolders[0]);
            } catch (err) {
                console.error("Failed to load voluntariado folders:", err);
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
                console.error("Failed to load images:", err);
            } finally {
                setLoading(false);
            }
        }
        loadImages();
    }, [activeFolder]);

    const formatFolderName = (name: string) => {
        return name
            .split('/')
            .pop()!
            .replace(/_/g, ' ')
            .replace(/\b\w/g, l => l.toUpperCase());
    };

    const info = [
        { title: "Processo Seletivo", desc: "Inscrições via Instagram. Avaliação por escore de presença e texto de motivação. Selecionados anunciados em post e grupo.", icon: <Search className="w-5 h-5 text-primary-light" /> },
        { title: "Certificados", desc: "Todos os eventos geram certificado (disponíveis por 1 ano no link da bio). Valem como horas complementares!", icon: <Award className="w-5 h-5 text-primary-light" /> },
        { title: "Histórico e Escore", desc: "Presença contabilizada desde a 1ª participação. Escore semestral usado na seleção (faltas injustificadas negativam).", icon: <FileCheck className="w-5 h-5 text-primary-light" /> },
    ];

    return (
        <Section bg="green" className="justify-start">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-green-deep p-2 rounded-lg">
                    <HandHelping className="w-6 h-6 text-primary-light" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-primary-light">Comitê Voluntariado</h2>
            </div>

            <div className="space-y-6">
                <div className="bg-green-dark/40 border border-primary-light/10 p-5 rounded-2xl">
                    <p className="text-sm leading-relaxed opacity-95">
                        Um grupo de estudantes que impacta positivamente a comunidade por meio de ações de saúde e projetos sociais. Contribui muito para a formação humana e profissional!
                    </p>
                </div>

                <div className="grid gap-4">
                    {info.map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ y: 10, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-green-dark/40 border border-primary-light/10 p-4 rounded-xl flex gap-4 items-start shadow-lg"
                        >
                            <div className="mt-1">{item.icon}</div>
                            <div>
                                <h3 className="font-bold text-primary-light text-sm underline decoration-primary/30 decoration-2 underline-offset-4">{item.title}</h3>
                                <p className="text-xs opacity-80 leading-snug mt-1">{item.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="bg-primary/10 border border-dashed border-primary/30 p-4 rounded-xl flex items-start gap-3">
                    <Info className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <p className="text-[10px] opacity-70 uppercase tracking-widest font-bold">
                        Acompanhe o edital pelo Instagram do comitê!
                    </p>
                </div>

                {/* Gallery */}
                <div className="pt-20 border-t border-primary-light/5">
                    <div className="mb-12 text-center">
                        <h3 className="text-4xl font-bold text-primary-light mb-2">Impacto Real</h3>
                        <p className="text-primary-light/40">Registros das nossas ações na comunidade.</p>
                    </div>
                    {loading ? (
                        <div className="h-[400px] flex flex-col items-center justify-center bg-green-dark/20 rounded-2xl border border-primary-light/5">
                            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
                            <p className="text-sm text-primary-light/60">Carregando ações...</p>
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
