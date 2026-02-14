"use client";
import { motion } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

const STAGGER = 0.035;

/**
 * TextRoll component - Animated rolling text effect for navigation or headers.
 * 
 * @param {object} props
 * @param {string|React.ReactNode} props.children - Text content (will be uppercased)
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.center=false] - Whether to stagger animation from center
 */
const TextRoll = ({ children, className, center = false }) => {
    // Ensure children is treated as a string and uppercased for the effect
    const textContent = typeof children === 'string' ? children : String(children);
    const text = textContent.toUpperCase();

    // Split into characters for animation
    const chars = text.split("");

    return (
        <motion.span
            initial="initial"
            whileHover="hovered"
            className={cn("relative block overflow-hidden font-display", className)}
            style={{
                lineHeight: 0.75, // Tighter line height for the "block" look
            }}
        >
            {/* First layer - moves up out of view */}
            <div>
                {chars.map((l, i) => {
                    const delay = center
                        ? STAGGER * Math.abs(i - (chars.length - 1) / 2)
                        : STAGGER * i;

                    return (
                        <motion.span
                            variants={{
                                initial: {
                                    y: 0,
                                },
                                hovered: {
                                    y: "-100%",
                                },
                            }}
                            transition={{
                                ease: "easeInOut",
                                delay,
                            }}
                            className="inline-block"
                            key={i}
                        >
                            {/* Use non-breaking space for spaces to preserve layout */}
                            {l === " " ? "\u00A0" : l}
                        </motion.span>
                    );
                })}
            </div>

            {/* Second layer - moves up into view from bottom */}
            <div className="absolute inset-0">
                {chars.map((l, i) => {
                    const delay = center
                        ? STAGGER * Math.abs(i - (chars.length - 1) / 2)
                        : STAGGER * i;

                    return (
                        <motion.span
                            variants={{
                                initial: {
                                    y: "100%",
                                },
                                hovered: {
                                    y: 0,
                                },
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
        </motion.span>
    );
};

export default TextRoll;
