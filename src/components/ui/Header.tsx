"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { Menu } from "./Menu";
import { cn } from "@/lib/utils";

export function Header() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);
    const [prevScroll, setPrevScroll] = useState(0);
    const [isTop, setIsTop] = useState(true);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const diff = latest - prevScroll;
        setIsTop(latest < 20); // Show background after 20px scroll
        if (latest > 100) {
            if (diff > 0 && !hidden) setHidden(true);
            else if (diff < 0 && hidden) setHidden(false);
        } else {
            setHidden(false);
        }
        setPrevScroll(latest);
    });

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        >
            <div
                className={cn(
                    "absolute inset-0 transition-all duration-500",
                    isTop ? "bg-transparent border-transparent" : "bg-green-deep/80 backdrop-blur-md border-b border-white/5"
                )}
            />

            <div className="w-full max-w-md md:max-w-md px-6 py-4 flex items-center justify-between pointer-events-auto">
                <div className="relative flex items-center gap-2">
                    <Image
                        src="/logoformo.svg"
                        alt="Formo"
                        width={40}
                        height={12}
                        className="object-contain"
                    />
                    <span className="font-bold text-xs uppercase tracking-[0.2em] text-primary-light/80 hidden xs:block">
                        Medicina PB
                    </span>
                </div>

                <div className="relative">
                    <Menu />
                </div>
            </div>
        </motion.header>
    );
}
