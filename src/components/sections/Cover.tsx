"use client";

import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import Image from "next/image";

export function Cover() {
    return (
        <Section bg="default" className="justify-center items-center text-center min-h-[90vh]">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="w-56 h-56 mb-8 relative flex items-center justify-center"
            >
                <Image
                    src="/logunisul36.svg"
                    alt="Logo Turma 36"
                    width={224}
                    height={224}
                    className="object-contain"
                    priority
                />
                <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10"
                />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-5xl font-bold tracking-tighter mb-2 text-primary-light"
            >
                GUIA DOS<br />CALOUROS
            </motion.h1>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex flex-col items-center"
            >
                <span className="text-2xl font-medium text-primary mb-4">TURMA 36</span>
                <div className="h-1 w-12 bg-accent rounded-full mb-6" />
                <p className="text-lg opacity-80 max-w-[280px]">
                    Bem-vindos à Medicina Unisul Pedra Branca. Preparamos esse guia com muito carinho para vocês!
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce"
            >
                <span className="text-xs uppercase tracking-widest opacity-40 mb-2">Role para baixo</span>
                <div className="w-px h-8 bg-primary/20" />
            </motion.div>
        </Section>
    );
}
