"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import Image from "next/image";
import { Globe, Users, BookOpen, ShieldCheck, HeartPulse, MapPin, Microscope, Instagram } from "lucide-react";

export function IFMSA() {
    const eixos = [
        { name: "Representatividade estudantil", icon: <Users className="w-4 h-4" /> },
        { name: "Capacity Building", icon: <ShieldCheck className="w-4 h-4" /> },
        { name: "Educação Médica", icon: <BookOpen className="w-4 h-4" /> },
        { name: "Promoção de Saúde", icon: <HeartPulse className="w-4 h-4" /> },
        { name: "Humanização", icon: <Globe className="w-4 h-4" /> },
        { name: "Mobilidade Estudantil", icon: <MapPin className="w-4 h-4" /> },
        { name: "Pesquisa e Extensão", icon: <Microscope className="w-4 h-4" /> },
    ];

    return (
        <Section bg="default" className="justify-start bg-white text-blue-900" id="ifmsa">
            <div className="flex flex-col items-center mt-8 mb-8 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="w-48 h-20 mb-6 flex items-center justify-center relative"
                >
                    <Image
                        src="/imfsa.png"
                        alt="IFMSA Brazil Logo"
                        fill
                        className="object-contain"
                    />
                </motion.div>
                <h2 className="text-3xl font-bold tracking-tight text-blue-900">IFMSA Brazil</h2>
            </div>

            <div className="space-y-8 px-2 text-blue-800/90">
                <div className="space-y-4">
                    <p className="text-sm leading-relaxed">
                        Fundada em 1991, é a <span className="font-bold text-blue-900">primeira</span> associação da América Latina vinculada à International Federation of Medical Students' Associations (IFMSA).
                    </p>
                    <div className="h-px w-full bg-blue-900/10" />
                    <p className="text-sm leading-relaxed">
                        A IFMSA Brazil está presente em 26 estados brasileiros e no Distrito Federal, abrangendo mais de 230 escolas médicas e reunindo mais de 12 mil estudantes de medicina.
                    </p>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl shadow-sm">
                    <p className="text-sm leading-relaxed mb-4">
                        É uma organização suprapartidária e sem fins lucrativos, que promove impacto positivo na sociedade por meio do <span className="font-bold text-blue-900">protagonismo estudantil</span>.
                    </p>
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-blue-900 flex items-center gap-2">
                        Nossos eixos de atuação são:
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                        {eixos.map((eixo, i) => (
                            <motion.div
                                key={eixo.name}
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center gap-3 bg-blue-50/50 p-3 rounded-xl border border-blue-900/5"
                            >
                                <div className="text-blue-600 bg-white p-2 rounded-lg shadow-sm">
                                    {eixo.icon}
                                </div>
                                <span className="text-xs font-medium">{eixo.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="pt-10 border-t border-blue-900/5 text-center px-4">
                    <motion.a
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        href="https://www.instagram.com/ifmsabrazilunisulpb?igsh=MWZ1NGVoeHQxZXNzZA=="
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-3 w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-900/20 transition-all hover:shadow-blue-900/40"
                    >
                        <Instagram className="w-5 h-5" />
                        <span>Siga @ifmsabrazilunisulpb</span>
                    </motion.a>
                    <p className="mt-4 text-[10px] opacity-40 uppercase tracking-widest font-bold">
                        Acompanhe nossas ações no Instagram
                    </p>
                </div>
            </div>
        </Section>
    );
}
