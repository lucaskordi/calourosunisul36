"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Search, Instagram, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export function Ligas() {
    const [searchTerm, setSearchTerm] = useState("");

    const ligas = [
        { handle: "@lagou.unisul", name: "Ginecologia e obstetrícia (GO)" },
        { handle: "@lanenunisul", name: "Neurologia e neurocirurgia" },
        { handle: "@laacivunisulpb", name: "Angiologia e cirurgia vascular" },
        { handle: "@lameex.unisul", name: "Medicina do esporte" },
        { handle: "@liaphunisul", name: "Atendimento pré-hospitalar" },
        { handle: "@laccunisul", name: "Cirurgia cardíaca" },
        { handle: "@lamelp.unisul", name: "Medicina legal e perícia médica" },
        { handle: "@lacige.upb", name: "Cirurgia geral" },
        { handle: "@unisul.lao", name: "Oftalmologia" },
        { handle: "@laoncunisul", name: "Oncologia" },
        { handle: "@licardiounisulpb", name: "Cardiologia e emergências" },
        { handle: "@lipec.unisul", name: "Pneumologia e cirurgia torácica" },
        { handle: "@lipracunisul", name: "Prática clínica" },
        { handle: "@ligamiunisulpb", name: "Medicina intensiva" },
        { handle: "@laoto.unisulpb", name: "Otorrinolaringologia" },
        { handle: "@laa.unisul", name: "Anestesiologia" },
        { handle: "@lacipedunisulpb", name: "Cirurgia pediátrica" },
        { handle: "@licmuunisul", name: "Clínica médica e medicina de urgência" },
        { handle: "@lapsiqunisulpb", name: "Psiquiatria" },
        { handle: "@lot.celso", name: "Ortopedia e traumatologia HGCR" },
        { handle: "@laorthrsj", name: "Ortopedia e traumatologia HRSJ" },
        { handle: "@liaccunisul", name: "Anatomia clínica e cirúrgica" },
        { handle: "@laqf_unisulpb", name: "Queimaduras e feridas" },
        { handle: "@laendounisulpb", name: "Endocrinologia e metabologia" },
        { handle: "@lafam.unisul", name: "Farmacologia médica" },
        { handle: "@lec.hrsj", name: "Emergências clínicas HRSJ" },
        { handle: "@licem.hgcr", name: "Cirurgia em emergência HGCR" },
        { handle: "@litec.hrsj", name: "Trauma e emergência cirúrgica HRSJ" },
        { handle: "@laps.unisul", name: "Atenção primária à saúde" },
        { handle: "@laneounisul", name: "Neonatologia" },
        { handle: "@lipedunisul", name: "Pediatria" },
        { handle: "@lacip.unisul", name: "Cirurgia plástica" },
        { handle: "@lanutro.unisul", name: "Nutrologia" },
        { handle: "@lagec.unisul", name: "Gastroenterologia e CAD" },
        { handle: "@licon.unisul", name: "Cirurgia oncológica" },
        { handle: "@liageunisulpb", name: "Geriatria e gerontologia" },
        { handle: "@lass.unisul", name: "Saúde sexual" },
        { handle: "@lialiunisulpb", name: "Alergologia e imunologia" },
        { handle: "@ladermunisulpb", name: "Dermatologia" },
        { handle: "@lipali.unisul", name: "Cuidados paliativos" },
        { handle: "@lisemio.unisul", name: "Semiologia médica" },
        { handle: "@lanefro.unisulpb", name: "Nefrologia" },
        { handle: "@liradunisulpb", name: "Radiologia" },
        { handle: "@lamasto.unisulpb", name: "Mastologia" },
        { handle: "@lainter.unisul", name: "Internacionalização médica" },
        { handle: "@lahem.unisulpb", name: "Hematologia" },
        { handle: "@lau.unisul", name: "Urologia" },
        { handle: "@lagem_unisulpb", name: "Genética médica" },
        { handle: "@lamefunisulpb", name: "Medicina funcional" },
        { handle: "@lit_unisul.ufsc", name: "Transplante" },
        { handle: "@lapat.unisulpb", name: "Patologia" },
        { handle: "@lahum.unisul", name: "Humanidades médicas" },
        { handle: "@laccape.unisulpb", name: "Cirurgia de cabeça e pescoço" },
        { handle: "@lainf.unisul", name: "Infectologia" },
        { handle: "@lanenunisulpb", name: "Medicina nuclear" },
        { handle: "@lareunisulpb", name: "Reumatologia" },
        { handle: "@coliga_unisulpb", name: "Comissão de ligas acadêmicas" },
    ];

    const filtered = ligas.filter(l =>
        l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.handle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const ITEMS_PER_PAGE = 7;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const nextPage = () => setCurrentPage(p => Math.min(totalPages, p + 1));
    const prevPage = () => setCurrentPage(p => Math.max(1, p - 1));

    return (
        <Section bg="default" className="justify-start">
            <div className="flex items-center gap-3 mb-6">
                <div className="bg-accent p-2 rounded-lg">
                    <Instagram className="w-6 h-6 text-primary-light" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">Ligas Acadêmicas</h2>
            </div>

            <p className="text-sm opacity-80 mb-6 font-medium">
                Siga para ficar por dentro de tudo o que acontece em cada especialidade!
            </p>

            <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 opacity-40" />
                <input
                    type="text"
                    placeholder="Buscar liga ou especialidade..."
                    className="w-full bg-green-dark/20 border border-primary/20 rounded-2xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-accent transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-hide min-h-[400px]">
                {currentItems.map((liga, index) => (
                    <motion.a
                        key={liga.handle}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        href={`https://instagram.com/${liga.handle.substring(1)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-green-dark/20 border border-primary/10 rounded-2xl hover:bg-accent/20 transition-colors group"
                    >
                        <div>
                            <div className="text-sm font-bold text-primary-light mb-0.5">{liga.name}</div>
                            <div className="text-xs text-primary font-medium">{liga.handle}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.a>
                ))}
                {filtered.length === 0 && (
                    <p className="text-center opacity-40 text-sm mt-10 italic">Nenhuma liga encontrada...</p>
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-primary/10">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronLeft className="w-5 h-5 text-primary" />
                    </button>
                    <span className="text-xs font-medium opacity-60">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                        <ChevronRight className="w-5 h-5 text-primary" />
                    </button>
                </div>
            )}
        </Section>
    );
}
