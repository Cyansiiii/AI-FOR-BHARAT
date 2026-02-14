// TextRoll component
import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

const STAGGER = 0.035;

const TextRoll = ({ children, className, center = false }) => {
    // Ensure children is treated as a string
    const text = typeof children === 'string' ? children : String(children);
    const chars = text.split("");

    return (
        <motion.div
            initial="initial"
            whileHover="hovered"
            className={cn("relative inline-block overflow-hidden leading-none", className)}
            style={{
                lineHeight: 0.95,
            }}
        >
            {/* 1. The Visible Text */}
            <div>
                {chars.map((l, i) => {
                    const delay = center
                        ? STAGGER * Math.abs(i - (chars.length - 1) / 2)
                        : STAGGER * i;
                    return (
                        <motion.span
                            variants={{
                                initial: { y: 0 },
                                hovered: { y: "-100%" },
                            }}
                            transition={{
                                ease: "easeInOut",
                                delay,
                            }}
                            className="inline-block"
                            key={i}
                        >
                            {l === " " ? "\u00A0" : l}
                        </motion.span>
                    );
                })}
            </div>

            {/* 2. The Incoming Text (Absolute Layer) */}
            <div className="absolute inset-0">
                {chars.map((l, i) => {
                    const delay = center
                        ? STAGGER * Math.abs(i - (chars.length - 1) / 2)
                        : STAGGER * i;
                    return (
                        <motion.span
                            variants={{
                                initial: { y: "100%" },
                                hovered: { y: 0 },
                            }}
                            transition={{
                                ease: "easeInOut",
                                delay,
                            }}
                            className="inline-block"
                            key={i}
                        >
                            {l === " " ? "\u00A0" : l}
                        </motion.span>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default TextRoll;
