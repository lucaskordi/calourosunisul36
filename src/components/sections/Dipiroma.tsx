"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Trophy } from "lucide-react";
import Image from "next/image";

export function Dipiroma() {
    return (
        <Section bg="dark" className="justify-start items-center text-center bg-[#b30838]">
            <div className="flex flex-col items-center mt-8">
                <motion.div
                    initial={{ rotateY: 180, opacity: 0 }}
                    whileInView={{ rotateY: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-48 h-48 mb-10 flex items-center justify-center relative group"
                >
                    <Image
                        src="/logodipiroma.svg"
                        alt="Dipiroma Logo"
                        width={192}
                        height={192}
                        className="object-contain"
                    />
                </motion.div>

                <h2 className="text-4xl font-black tracking-tighter text-white mb-2">DIPIROMA</h2>
                <div className="h-1 w-20 bg-[#f89728] rounded-full mb-8 mx-auto" />

                <div className="space-y-6 max-w-sm">
                    <p className="text-lg leading-relaxed opacity-95 text-white/90">
                        O <span className="text-white font-bold italic">Dipiroma</span> é o time que representa a turma <span className="font-bold underline decoration-[#f89728]">XXXVI</span>, fazendo referência ao <span className="italic">Roma</span>.
                    </p>

                    <div className="bg-black/20 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                        <h3 className="text-sm uppercase tracking-[0.2em] font-bold text-[#f89728] mb-4 flex items-center justify-center gap-2">
                            <Trophy className="w-4 h-4" />
                            Nossa Garra
                        </h3>
                        <p className="text-sm opacity-90 leading-relaxed text-white">
                            Representamos o sangue e o suor da nossa turma nas quadras e campos. Juntos somos mais fortes!
                        </p>
                    </div>

                    <div className="p-4 bg-white/10 rounded-xl border border-dashed border-white/20">
                        <p className="text-xs text-white/80">
                            Membros do time participam ativamente da integração esportiva da nossa universidade.
                        </p>
                    </div>
                </div>
            </div>
        </Section>
    );
}
