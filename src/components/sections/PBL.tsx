"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Info, BookOpen, History, Brain, Lightbulb, Users } from "lucide-react";

export function PBL() {
    return (
        <Section bg="dark" className="justify-start">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-accent p-2 rounded-lg">
                    <BookOpen className="w-6 h-6 text-primary-light" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight">O que é PBL?</h2>
            </div>

            <div className="space-y-8">
                {/* Definition */}
                <p className="text-lg leading-relaxed opacity-90">
                    <span className="text-primary font-bold">Problem Based Learning</span> (Aprendizado Baseado em Problemas). É uma prática pedagógica que utiliza problemas para iniciar a construção do conhecimento.
                </p>

                {/* History */}
                <div className="bg-neutral-dark/40 border border-primary/20 p-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-4 text-primary">
                        <History className="w-5 h-5" />
                        <h3 className="text-xl font-bold">Origem</h3>
                    </div>
                    <p className="text-sm opacity-90 leading-relaxed mb-3">
                        Criado na Escola de Direito de <span className="text-accent font-bold">Harvard (1870)</span>. Começou a ser aplicado em escolas médicas dos EUA em 1969.
                    </p>
                    <p className="text-xs opacity-70 italic">
                        Trabalha a estrutura do pensamento lógico: análise, justificativa, argumentação e estruturação.
                    </p>
                </div>

                {/* Methodology */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-primary">
                        <Brain className="w-5 h-5" />
                        <h3 className="text-xl font-bold">Na Prática</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        {[
                            { title: "Sala de Aula Invertida", desc: "Professor atua como facilitador ou tutor." },
                            { title: "Metodologia Ativa", desc: "Você é o protagonista do seu aprendizado." },
                            { title: "União de Disciplinas", desc: "Ex: Bioquímica integrada com a prática médica." },
                            { title: "Autonomia", desc: "Aprender a estudar sozinho é fundamental." },
                            { title: "Vivência Prática", desc: "Posto de saúde (UBS) desde o primeiro mês." }
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ x: -10, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white/5 border border-white/10 p-4 rounded-xl"
                            >
                                <h4 className="text-primary font-bold text-sm mb-1">{item.title}</h4>
                                <p className="text-xs opacity-80">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Curriculum Structure */}
                <div className="mt-8 pt-8 border-t border-white/10">
                    <div className="flex items-center gap-2 text-primary mb-6">
                        <Lightbulb className="w-5 h-5" />
                        <h3 className="text-xl font-bold">Disciplinas (UCs)</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-primary/10 p-4 rounded-xl border border-primary/20">
                            <h4 className="font-bold text-primary mb-2">NCS (Necessidades e Cuidados)*</h4>
                            <div className="flex flex-wrap gap-2">
                                {["Tutoria", "TBL", "Med Lab", "Lab Morfo"].map(tag => (
                                    <span key={tag} className="text-[10px] bg-primary/20 px-2 py-1 rounded text-primary-light font-bold">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-accent/10 p-4 rounded-xl border border-accent/20">
                            <h4 className="font-bold text-primary mb-2">HM (Habilidades Médicas)*</h4>
                            <div className="flex flex-wrap gap-2">
                                {["SBE", "Estações Clínicas"].map(tag => (
                                    <span key={tag} className="text-[10px] bg-accent/20 px-2 py-1 rounded text-accent-light font-bold">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-green-deep/40 p-4 rounded-xl border border-green-500/20">
                            <h4 className="font-bold text-green-400 mb-2">PMSUS*</h4>
                            <div className="flex flex-wrap gap-2">
                                {["UBS", "Reflexão da Prática"].map(tag => (
                                    <span key={tag} className="text-[10px] bg-green-500/20 px-2 py-1 rounded text-green-200 font-bold">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            <h4 className="font-bold text-white mb-2">Metodologia Científica</h4>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-white font-bold">Projeto de Pesquisa</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Conferences */}
                <div className="mt-8 pt-8 border-t border-white/10" id="conferencias">
                    <div className="flex items-center gap-2 text-primary mb-6">
                        <Users className="w-5 h-5" />
                        <h3 className="text-xl font-bold">Conferências</h3>
                    </div>

                    <p className="text-sm opacity-90 leading-relaxed mb-6">
                        Aulas em auditório com todas as turmas. Método tradicional ministrado pelos tutores.
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                            <h4 className="font-bold text-primary text-sm mb-2">Conferência de NCS</h4>
                            <p className="text-xs opacity-80 leading-relaxed">
                                Introdutórias ou "apanhado geral". Substituem a primeira ou última tutoria do complexo temático.
                            </p>
                        </div>
                        <div className="bg-green-500/5 p-4 rounded-xl border border-green-500/10">
                            <h4 className="font-bold text-green-400 text-sm mb-2">Conferência de PMSUS</h4>
                            <p className="text-xs opacity-80 leading-relaxed">
                                Revisão dos principais pontos para a prova. Foco nas temáticas mais importantes da Oficina de Trabalho.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
