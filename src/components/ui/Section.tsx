"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    bg?: "default" | "light" | "green" | "dark" | "deep" | "neutral-dark";
}

export function Section({ children, className, id, bg = "default" }: SectionProps) {
    const bgColors = {
        default: "bg-neutral-dark text-primary-light",
        light: "bg-primary-light text-neutral-dark",
        green: "bg-accent text-primary-light",
        dark: "bg-green-dark text-primary-light",
        deep: "bg-green-deep text-primary-light",
        "neutral-dark": "bg-neutral-dark text-primary-light",
    };

    return (
        <section
            id={id}
            className={cn(
                "w-full flex flex-col p-8 py-20 relative overflow-visible",
                bgColors[bg],
                className
            )}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex-1 flex flex-col"
            >
                {children}
            </motion.div>
        </section>
    );
}
