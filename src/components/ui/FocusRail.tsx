"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Folder, X, Maximize2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type FocusRailItem = {
    id: string | number;
    imageSrc: string;
    title?: string;
    description?: string;
    meta?: string;
    href?: string;
};

interface FocusRailProps {
    items: FocusRailItem[];
    initialIndex?: number;
    loop?: boolean;
    autoPlay?: boolean;
    interval?: number;
    className?: string;
    folders?: string[];
    activeFolder?: string;
    onFolderChange?: (folder: string) => void;
    formatFolderName?: (name: string) => string;
}

function wrap(min: number, max: number, v: number) {
    const rangeSize = max - min;
    if (rangeSize === 0) return 0;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
}

const BASE_SPRING = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 1,
};

const TAP_SPRING = {
    type: "spring" as const,
    stiffness: 450,
    damping: 18,
    mass: 1,
};

export function FocusRail({
    items,
    initialIndex = 0,
    loop = true,
    autoPlay = false,
    interval = 4000,
    className,
    folders,
    activeFolder,
    onFolderChange,
    formatFolderName,
}: FocusRailProps) {
    const [active, setActive] = React.useState(initialIndex);
    const [isHovering, setIsHovering] = React.useState(false);
    const [isMobile, setIsMobile] = React.useState(false);
    const [showLightbox, setShowLightbox] = React.useState(false);
    const lastWheelTime = React.useRef<number>(0);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    React.useEffect(() => {
        setActive(0);
    }, [items]);

    const count = items.length;
    const activeIndex = count > 0 ? wrap(0, count, active) : 0;
    const activeItem = items[activeIndex];

    const handlePrev = React.useCallback(() => {
        if (count === 0) return;
        if (!loop && active === 0) return;
        setActive((p) => p - 1);
    }, [loop, active, count]);

    const handleNext = React.useCallback(() => {
        if (count === 0) return;
        if (!loop && active === count - 1) return;
        setActive((p) => p + 1);
    }, [loop, active, count]);

    const onWheel = React.useCallback(
        (e: React.WheelEvent) => {
            if (showLightbox) return;
            const now = Date.now();
            if (now - lastWheelTime.current < 400) return;
            const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);
            const delta = isHorizontal ? e.deltaX : e.deltaY;
            if (Math.abs(delta) > 20) {
                if (delta > 0) handleNext();
                else handlePrev();
                lastWheelTime.current = now;
            }
        },
        [handleNext, handlePrev, showLightbox]
    );

    React.useEffect(() => {
        if (!autoPlay || isHovering || count === 0 || showLightbox) return;
        const timer = setInterval(() => handleNext(), interval);
        return () => clearInterval(timer);
    }, [autoPlay, isHovering, handleNext, interval, count, showLightbox]);

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "ArrowLeft") handlePrev();
        if (e.key === "ArrowRight") handleNext();
        if (e.key === "Escape") setShowLightbox(false);
    };

    const onDragEnd = (e: any, { offset, velocity }: PanInfo) => {
        const swipeConfidenceThreshold = 10000;
        const swipePower = (offset: number, velocity: number) => Math.abs(offset) * velocity;
        const swipe = swipePower(offset.x, velocity.x);
        if (swipe < -swipeConfidenceThreshold) handleNext();
        else if (swipe > swipeConfidenceThreshold) handlePrev();
    };

    const visibleIndices = [-2, -1, 0, 1, 2];

    if (count === 0) {
        return (
            <div className={cn("group relative flex h-[500px] w-full items-center justify-center bg-neutral-950 text-white outline-none select-none rounded-3xl border border-white/5", className)}>
                <p className="text-white/40 italic">Nenhuma foto encontrada...</p>
            </div>
        );
    }

    return (
        <>
            <div
                className={cn(
                    "group relative flex h-[550px] md:h-[680px] flex-col overflow-hidden bg-transparent text-white outline-none select-none overflow-x-hidden",
                    // Mobile: Full screen width breakout
                    "w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]",
                    // Desktop: Constrained width, no breakout
                    "md:w-full md:max-w-lg md:left-auto md:right-auto md:ml-auto md:mr-auto",
                    className
                )}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                tabIndex={0}
                onKeyDown={onKeyDown}
                onWheel={onWheel}
            >

                {/* Folders Bar */}
                {folders && folders.length > 0 && (
                    <div className="relative z-20 px-4 md:px-8 pt-2 pb-4 flex overflow-x-auto no-scrollbar scroll-smooth">
                        <div className="flex gap-2 pb-2 mx-auto w-max px-4">
                            {folders.map((folder) => (
                                <button
                                    key={folder}
                                    onClick={() => onFolderChange?.(folder)}
                                    className={cn(
                                        "px-6 py-3 rounded-full text-[12px] font-bold uppercase tracking-widest transition-all whitespace-nowrap flex items-center gap-2 border",
                                        activeFolder === folder
                                            ? "bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                            : "bg-white/5 text-white/60 border-white/10 hover:bg-white/10 hover:text-white"
                                    )}
                                >
                                    <Folder className="w-3 h-3" />
                                    {formatFolderName ? formatFolderName(folder) : folder}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* Main Stage */}
                <div className="relative z-10 flex flex-1 flex-col justify-center px-4 md:px-8">
                    <motion.div
                        className="relative mx-auto flex h-[400px] w-full items-center justify-center perspective-[1200px] cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={onDragEnd}
                    >
                        {visibleIndices.map((offset) => {
                            const absIndex = active + offset;
                            const index = wrap(0, count, absIndex);
                            const item = items[index];

                            if (!loop && (absIndex < 0 || absIndex >= count)) return null;

                            const isCenter = offset === 0;
                            const dist = Math.abs(offset);

                            const spacing = isMobile ? 140 : 340;
                            const xOffset = offset * spacing;
                            const zOffset = -dist * 200;
                            const scale = isCenter ? 1 : (isMobile ? 0.7 : 0.82);
                            const rotateY = offset * (isMobile ? -35 : -22);

                            const opacity = isCenter ? 1 : Math.max(0.1, 0.8 - dist * 0.3);
                            const blur = isCenter ? 0 : dist * 8;
                            const brightness = isCenter ? 1 : 0.4;

                            return (
                                <motion.div
                                    key={absIndex}
                                    className={cn(
                                        "absolute aspect-[3/4] w-[70vw] max-w-[280px] md:w-[320px] md:max-w-none rounded-2xl border-t border-white/20 shadow-2xl transition-shadow duration-300 cursor-pointer overflow-hidden",
                                        isCenter ? "z-20 shadow-white/5" : "z-10"
                                    )}
                                    initial={false}
                                    animate={{
                                        x: xOffset,
                                        z: zOffset,
                                        scale: scale,
                                        rotateY: rotateY,
                                        opacity: opacity,
                                        filter: `blur(${blur}px) brightness(${brightness})`,
                                    }}
                                    transition={{
                                        x: BASE_SPRING,
                                        z: BASE_SPRING,
                                        rotateY: BASE_SPRING,
                                        opacity: BASE_SPRING,
                                        filter: BASE_SPRING,
                                        scale: TAP_SPRING,
                                    }}
                                    style={{ transformStyle: "preserve-3d" }}
                                    onClick={() => {
                                        if (isCenter) setShowLightbox(true);
                                        else setActive((p) => p + offset);
                                    }}
                                >
                                    <img
                                        src={item.imageSrc}
                                        alt=""
                                        className="h-full w-full rounded-2xl object-cover pointer-events-none"
                                    />
                                    {/* Removed filename titles as requested */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                                </motion.div>
                            );
                        })}
                    </motion.div>

                    {/* Info & Controls */}
                    <div className="mx-auto mt-12 flex w-full max-w-6xl flex-col items-center justify-center gap-6 md:flex-row pointer-events-auto px-8">
                        {/* Labels removed to avoid filename display */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1 rounded-full bg-neutral-900/80 p-1 ring-1 ring-white/10 backdrop-blur-md">
                                <button
                                    onClick={handlePrev}
                                    className="rounded-full p-3 text-neutral-400 transition hover:bg-white/10 hover:text-white active:scale-95"
                                    aria-label="Previous"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                                <span className="min-w-[40px] text-center text-xs font-mono text-neutral-500">
                                    {activeIndex + 1} / {count}
                                </span>
                                <button
                                    onClick={handleNext}
                                    className="rounded-full p-3 text-neutral-400 transition hover:bg-white/10 hover:text-white active:scale-95"
                                    aria-label="Next"
                                >
                                    <ChevronRight className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            {/* Lightbox Modal */}
            <AnimatePresence>
                {
                    showLightbox && activeItem && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-12"
                            onKeyDown={onKeyDown}
                            tabIndex={0}
                        >
                            <button
                                onClick={() => setShowLightbox(false)}
                                className="absolute top-6 right-6 z-[110] p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                            >
                                <X className="w-8 h-8" />
                            </button>

                            <motion.div
                                className="relative w-full h-full flex flex-col items-center justify-center p-4 md:p-12 pb-32 md:pb-40"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                            >
                                <img
                                    src={activeItem.imageSrc}
                                    alt={activeItem.title || ""}
                                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-2xl pointer-events-none"
                                />

                                {/* Bottom Navigation Bar */}
                                <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 w-full px-4">
                                    <div className="text-center text-white space-y-1">
                                        <p className="text-xs font-mono opacity-50">
                                            {activeIndex + 1} de {count}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <button
                                            onClickCapture={(e) => { e.stopPropagation(); handlePrev(); }}
                                            className="p-4 rounded-full bg-white/10 text-white hover:bg-white/25 transition-all active:scale-90 border border-white/10 backdrop-blur-md"
                                        >
                                            <ChevronLeft className="w-8 h-8" />
                                        </button>
                                        <button
                                            onClickCapture={(e) => { e.stopPropagation(); handleNext(); }}
                                            className="p-4 rounded-full bg-white/10 text-white hover:bg-white/25 transition-all active:scale-90 border border-white/10 backdrop-blur-md"
                                        >
                                            <ChevronRight className="w-8 h-8" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )
                }
            </AnimatePresence >
        </>
    );
}
