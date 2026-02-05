"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Hospital, Monitor, Search, UserCheck, Stethoscope, HeartPulse } from "lucide-react";

export function HM() {
    return (
        <Section bg="light" className="justify-start">
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-accent p-2 rounded-lg">
                    <Stethoscope className="w-6 h-6 text-primary-light" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight text-neutral-dark">HM*</h2>
            </div>

            <div className="space-y-8 text-neutral-dark">
                {/* SBE */}
                <div className="bg-white/40 border border-accent/20 p-6 rounded-2xl backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                        <Monitor className="w-6 h-6" />
                        SBE (Saúde Baseada em Evidência)
                    </h3>
                    <p className="text-sm opacity-90 leading-relaxed mb-4">
                        Focada em <span className="text-accent font-bold">pesquisa científica estratégica</span> (PubMed, Scielo) e redação de artigos.
                    </p>
                    <div className="bg-accent/5 p-3 rounded-xl border border-accent/10 mb-4">
                        <div className="text-xs font-bold uppercase tracking-wider mb-1">O que aprendemos:</div>
                        <ul className="text-xs space-y-1 opacity-80 list-disc list-inside">
                            <li>Como pesquisar em bases confiáveis</li>
                            <li>Tipos de estudos científicos</li>
                            <li>Estrutura de artigos acadêmicos</li>
                        </ul>
                    </div>
                    <div className="text-sm font-semibold opacity-70">Professoras: Eliane ou Fran</div>
                </div>

                {/* Estações Clínicas */}
                <div className="bg-white/40 border border-accent/20 p-6 rounded-2xl backdrop-blur-sm">
                    <h3 className="text-xl font-bold text-accent mb-4 flex items-center gap-2">
                        <Hospital className="w-6 h-6" />
                        HM Estações Clínicas
                    </h3>
                    <div className="space-y-4">
                        <p className="text-sm opacity-90 leading-relaxed">
                            Dividida em consultas com <span className="font-bold underline decoration-accent/30">pacientes-atores</span> no hospital e clínicas simuladas em sala de aula.
                        </p>

                        <div className="grid grid-cols-1 gap-3">
                            <div className="bg-accent/10 p-4 rounded-xl">
                                <div className="text-sm font-bold mb-2 flex items-center gap-2">
                                    <UserCheck className="w-4 h-4" />
                                    No 1º Ano
                                </div>
                                <p className="text-xs leading-relaxed opacity-80">
                                    Foco em <strong>Anamnese</strong>. Aprendemos também: manobras de RCP, aferir sinais vitais, e praticar consultas clínicas a partir de simulações.
                                </p>
                            </div>

                            <div className="bg-white/60 p-4 rounded-xl border border-black/5">
                                <div className="text-sm font-bold mb-2 flex items-center gap-2">
                                    <HeartPulse className="w-4 h-4" />
                                    Habilidades Práticas
                                </div>
                                <p className="text-xs leading-relaxed opacity-80">
                                    Aulas com a Prof. Luana: aferição de pressão, oximetria, exames físicos, RCP e entubação.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 p-3 bg-white/60 rounded-xl border border-accent/10 italic text-[10px] opacity-70">
                            <p>• Grupos de ~15 pessoas</p>
                            <p>• Simulações seguem roteiros e são avaliadas</p>
                            <p>• Todos os professores são médicos</p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
