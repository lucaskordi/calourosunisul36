"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Instagram, Heart, ArrowUp } from "lucide-react";
import Image from "next/image";

export function Final() {
    const social = [
        { name: "Veteranos", handle: "@medunisulpb36" },
        { name: "Dipiroma", handle: "@dipiromaupb" },
        { name: "AAAMUPB", handle: "@atleticamedpb" },
    ];

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <Section bg="default" className="justify-center items-center text-center">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="mb-12"
            >
                <Heart className="w-16 h-16 text-primary mx-auto mb-6 fill-primary/20" />
                <h2 className="text-4xl font-bold tracking-tighter mb-4 text-primary-light">BOM SEMESTRE!</h2>
                <p className="text-lg opacity-80 max-w-[280px] mx-auto">
                    Contem conosco para o que precisarem. A jornada está apenas começando!
                </p>
            </motion.div>

            <div className="w-full max-w-xs space-y-4">
                {social.map((item, index) => (
                    <motion.a
                        key={item.handle}
                        initial={{ y: 10, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                        href={`https://instagram.com/${item.handle.substring(1)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-green-dark/20 border border-primary/10 rounded-2xl hover:bg-accent/20 transition-colors"
                    >
                        <div className="flex items-center gap-3 text-primary">
                            <Instagram className="w-5 h-5" />
                            <span className="font-bold text-sm tracking-wide">{item.name}</span>
                        </div>
                        <span className="text-xs opacity-60 font-medium">{item.handle}</span>
                    </motion.a>
                ))}
            </div>

            <div className="mt-20 flex justify-center pb-8">
                <a
                    href="https://instagram.com/formobrasil.pr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-100 transition-all duration-300 hover:scale-105"
                >
                    <Image
                        src="/logoformo.svg"
                        alt="Formo Brasil"
                        width={60}
                        height={22}
                        className="object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                    />
                </a>
            </div>
        </Section>
    );
}
