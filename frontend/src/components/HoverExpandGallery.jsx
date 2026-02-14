"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const HoverExpandGallery = ({
    items,
    className,
}) => {
    const [activeItem, setActiveItem] = useState(0);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
                delay: 0.2,
            }}
            className={cn("w-full max-w-7xl mx-auto px-4", className)}
        >
            <div className="flex w-full h-[500px] items-stretch justify-center gap-2">
                {items.map((item, index) => (
                    <motion.div
                        key={index}
                        className={cn(
                            "relative cursor-pointer overflow-hidden rounded-3xl border border-white/10",
                            "bg-gradient-to-br transition-colors duration-500",
                            // Use the item's color gradient logic or fallback
                            item.color ? item.color : "from-gray-800 to-gray-900"
                        )}
                        initial={{ flex: 1 }}
                        animate={{
                            flex: activeItem === index ? 3 : 1,
                        }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        onHoverStart={() => setActiveItem(index)}
                        onClick={() => setActiveItem(index)}
                    >
                        {/* Background Icon (Large, Faded) */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none scale-150">
                            {React.cloneElement(item.icon, { className: "w-48 h-48" })}
                        </div>

                        <AnimatePresence mode="wait">
                            {activeItem === index ? (
                                <motion.div
                                    key="active"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                                >
                                    <div className="mb-4 text-blue-400">
                                        {React.cloneElement(item.icon, { className: "w-12 h-12" })}
                                    </div>
                                    <h3 className="text-3xl font-bold text-white mb-2">{item.title}</h3>
                                    <p className="text-gray-200 text-lg leading-relaxed max-w-lg">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="inactive"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute inset-0 flex flex-col items-center justify-center p-4"
                                >
                                    <div className="mb-4 text-white/70">
                                        {React.cloneElement(item.icon, { className: "w-8 h-8" })}
                                    </div>
                                    <h3 className="text-xl font-bold text-white/50 vertical-writing-mode md:writing-mode-horizontal text-center hidden md:block rotate-180 md:rotate-0 whitespace-nowrap">
                                        {item.title}
                                    </h3>
                                    {/* Mobile optimization: Show simple icon when collapsed */}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default HoverExpandGallery;
