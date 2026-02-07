"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { languages } from "@/data/languages";

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

export default function LanguagesPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#fff",
                padding: "3rem 2rem",
                fontFamily: "system-ui, sans-serif",
            }}
        >
            {/* ヘッダー */}
            <motion.div
                style={{
                    maxWidth: 800,
                    margin: "0 auto 3rem",
                    textAlign: "center",
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Link
                    href="/"
                    style={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: "#999",
                        textDecoration: "none",
                    }}
                >
                    ← HOME
                </Link>

                <h1
                    style={{
                        fontSize: "2rem",
                        fontWeight: 900,
                        marginTop: "1rem",
                        marginBottom: "0.5rem",
                    }}
                >
                    LANGUAGE VIEW
                </h1>
                <p
                    style={{
                        fontSize: "1rem",
                        color: "#666",
                    }}
                >
                    本のように体系的に読む
                </p>
            </motion.div>

            {/* ランゲージカード */}
            <div
                style={{
                    maxWidth: 800,
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "2rem",
                }}
            >
                {languages.map((lang, index) => (
                    <motion.div
                        key={lang.id}
                        style={{ position: "relative" }}
                        initial="rest"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Link href={`/languages/${lang.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            {/* シャドウレイヤー */}
                            <motion.div
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: lang.themeColor,
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
                                    padding: "2rem",
                                    zIndex: 1,
                                }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + index * 0.1, ...brutalSpring }}
                            >
                                {/* フォーマットラベル */}
                                <div
                                    style={{
                                        display: "inline-block",
                                        background: lang.themeColor,
                                        color: lang.themeColor === "#000" ? "#fff" : "#000",
                                        fontSize: "0.625rem",
                                        fontWeight: 800,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.1em",
                                        padding: "0.25rem 0.5rem",
                                        marginBottom: "1rem",
                                        border: "2px solid #000",
                                    }}
                                >
                                    {lang.format === "book" ? "📖 BOOK" : "🃏 CARD"}
                                </div>

                                {/* タイトル */}
                                <h2
                                    style={{
                                        fontSize: "1.5rem",
                                        fontWeight: 900,
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    {lang.name}
                                </h2>

                                {/* 説明 */}
                                <p
                                    style={{
                                        fontSize: "0.875rem",
                                        color: "#666",
                                        lineHeight: 1.6,
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {lang.description}
                                </p>

                                {/* パターン数 */}
                                <div
                                    style={{
                                        fontSize: "0.75rem",
                                        fontWeight: 800,
                                        color: "#999",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    {lang.patternCount} PATTERNS
                                </div>

                                {/* 矢印 */}
                                <motion.div
                                    style={{
                                        position: "absolute",
                                        right: "1.5rem",
                                        bottom: "1.5rem",
                                        fontSize: "1.5rem",
                                    }}
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.div>
                            </motion.div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
