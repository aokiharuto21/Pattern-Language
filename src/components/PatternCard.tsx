"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { PatternWithMeta } from "@/types/pattern";

interface PatternCardProps {
    pattern: PatternWithMeta;
    themeColor?: string;
    onClick?: () => void;
    delay?: number;
}

// ブルータルスプリング設定
const brutalSpring = {
    type: "spring",
    stiffness: 400,
    damping: 15,
};

// シャドウバリアント
const shadowVariants = {
    rest: { x: 8, y: 8 },
    hover: { x: 12, y: 12 },
    tap: { x: 4, y: 4 },
};

export default function PatternCard({
    pattern,
    themeColor = "#000",
    onClick,
    delay = 0,
}: PatternCardProps) {
    const [imageError, setImageError] = useState(false);
    const paddedNumber = String(pattern.id).padStart(2, "0");

    return (
        <motion.div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={onClick}
            initial="rest"
            whileHover="hover"
            whileTap="tap"
        >
            {/* シャドウレイヤー */}
            <motion.div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: themeColor,
                    zIndex: 0,
                }}
                variants={shadowVariants}
                transition={brutalSpring}
            />

            {/* カード本体 */}
            <motion.div
                style={{
                    position: "relative",
                    background: "#fff",
                    border: "3px solid #000",
                    padding: "1.5rem",
                    zIndex: 1,
                }}
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ delay, ...brutalSpring }}
            >
                {/* 番号バッジ */}
                <motion.div
                    style={{
                        position: "absolute",
                        top: "-0.75rem",
                        right: "1rem",
                        background: themeColor,
                        color: themeColor === "#000" ? "#fff" : "#000",
                        padding: "0.25rem 0.75rem",
                        fontWeight: 900,
                        fontSize: "0.75rem",
                        border: "2px solid #000",
                    }}
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: delay + 0.15, ...brutalSpring }}
                >
                    #{paddedNumber}
                </motion.div>

                {/* イラストエリア */}
                <motion.div
                    style={{
                        width: "100%",
                        height: 140,
                        background: themeColor,
                        border: "2px solid #000",
                        marginBottom: "1rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                        position: "relative",
                    }}
                    whileHover={{ scale: 1.02 }}
                >
                    {/* イラスト画像（存在すれば表示） */}
                    {!imageError && (
                        <Image
                            src={pattern.illustrationPath}
                            alt={pattern.pattern_name}
                            fill
                            sizes="(max-width: 768px) 100vw, 280px"
                            style={{
                                objectFit: "contain",
                                background: "#fff",
                            }}
                            onError={() => setImageError(true)}
                        />
                    )}
                    {/* フォールバック表示（画像エラー時のみ） */}
                    {imageError && (
                        <span
                            style={{
                                fontSize: "3rem",
                                position: "absolute",
                                opacity: 0.3,
                            }}
                        >
                            📝
                        </span>
                    )}
                </motion.div>

                {/* パターン名 */}
                <motion.h3
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 900,
                        marginBottom: "0.5rem",
                        lineHeight: 1.3,
                    }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: delay + 0.2 }}
                >
                    {pattern.pattern_name}
                </motion.h3>

                {/* 導入文またはコンテキスト */}
                <motion.p
                    style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.6,
                        color: "#333",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: delay + 0.25 }}
                >
                    {pattern.intro || pattern.context}
                </motion.p>

                {/* ランゲージラベル（控えめに表示） */}
                <motion.div
                    style={{
                        marginTop: "1rem",
                        fontSize: "0.625rem",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        color: "#999",
                        letterSpacing: "0.05em",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: delay + 0.3 }}
                >
                    {pattern.languageId === "rakuten" ? "楽天主義" : "燕市"}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}
