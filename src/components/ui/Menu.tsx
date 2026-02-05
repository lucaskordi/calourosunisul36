"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Menu as MenuIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const links = [
    { name: "Início", href: "#" },
    { name: "O que é PBL?", href: "#pbl" },
    { name: "Conferências", href: "#conferencias" },
    { name: "Disciplinas", href: "#disciplinas" },
    { name: "NCS", href: "#ncs" },
    { name: "HM", href: "#hm" },
    { name: "PMSUS", href: "#pmsus" },
    { name: "Metodologia", href: "#metodologia" },
    { name: "Avaliações", href: "#avaliacoes" },
    { name: "Provas", href: "#resultados" },
    { name: "Materiais", href: "#materiais" },
    { name: "Horários", href: "#horarios" },
    { name: "Trotes", href: "#trotes" },
    { name: "Dipiroma", href: "#dipiroma" },
    { name: "Comissão", href: "#comissao" },
    { name: "Ligas", href: "#ligas" },
    { name: "CAMC", href: "#camc" },
    { name: "Voluntariado", href: "#voluntariado" },
    { name: "Atlética", href: "#aaamupb" },
];

export function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <>
            <button
                onClick={toggleMenu}
                className="relative z-50 p-2 text-primary-light hover:text-primary transition-colors focus:outline-none"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <X className="w-8 h-8" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="menu"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <MenuIcon className="w-8 h-8" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 bg-neutral-dark/80 backdrop-blur-md z-40"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-green-deep border-l border-primary/20 z-45 p-8 flex flex-col pt-24"
                        >
                            <nav className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                                {links.map((link, index) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="text-xl font-bold text-primary-light hover:text-accent transition-colors py-2 border-b border-white/5 last:border-0"
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                            </nav>

                            <div className="mt-auto pt-8 border-t border-white/10 opacity-40 text-[10px] uppercase tracking-widest font-bold">
                                Medicina Unisul PB 36
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
