"use client";

import { motion, useScroll, useAnimationControls } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);
    const { scrollY } = useScroll();

    useEffect(() => {
        return scrollY.onChange((latest) => {
            if (latest > 400) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });
    }, [scrollY]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
                pointerEvents: isVisible ? "auto" : "none"
            }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-accent p-3 rounded-full shadow-2xl border border-primary/20 text-primary-light hover:bg-primary hover:text-neutral-dark transition-colors"
        >
            <ArrowUp className="w-6 h-6" />
        </motion.button>
    );
}
