"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { languages } from "@/data/languages";
import { getTotalPatternCount, getAllPatterns } from "@/lib/loader";
import DailyPatternFortune from "@/components/DailyPatternFortune";

// ブルータルスプリング設定
const brutalSpring = {
    type: "spring",
    stiffness: 400,
    damping: 15,
};

// シャドウバリアント
const shadowVariants = {
    rest: { x: 6, y: 6 },
    hover: { x: 10, y: 10 },
    tap: { x: 3, y: 3 },
};

export default function Home() {
    const [countedPatterns, setCountedPatterns] = useState(0);
    const totalPatterns = getTotalPatternCount();
    const allPatterns = getAllPatterns();

    // カウントアップアニメーション
    useEffect(() => {
        const duration = 1500;
        const steps = 30;
        const increment = totalPatterns / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= totalPatterns) {
                setCountedPatterns(totalPatterns);
                clearInterval(timer);
            } else {
                setCountedPatterns(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [totalPatterns]);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#fff",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1.5rem",
                fontFamily: "system-ui, sans-serif",
                overflow: "hidden",
            }}
        >
            {/* 装飾用の浮遊する幾何学図形 */}
            <FloatingShapes />

            {/* メインコンテンツ */}
            <motion.div
                style={{
                    textAlign: "center",
                    maxWidth: 900,
                    width: "100%",
                    marginTop: "1.5rem",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {/* タイトル - よりコンパクトに */}
                <motion.h1
                    style={{
                        fontSize: "clamp(1.75rem, 5vw, 2.5rem)",
                        fontWeight: 900,
                        marginBottom: "0.25rem",
                        lineHeight: 1.1,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, ...brutalSpring }}
                >
                    PATTERN LANGUAGE HOME
                </motion.h1>

                {/* サブタイトル */}
                <motion.p
                    style={{
                        fontSize: "1rem",
                        color: "#666",
                        marginBottom: "0.25rem",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    知恵のライブラリ
                </motion.p>

                {/* 統計 - カウントアップアニメーション付き */}
                <motion.div
                    style={{
                        fontSize: "0.875rem",
                        fontWeight: 800,
                        color: "#000",
                        textTransform: "uppercase",
                        marginBottom: "1.5rem",
                        letterSpacing: "0.1em",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.25, ...brutalSpring }}
                >
                    <span style={{ fontSize: "1.5rem", fontWeight: 900 }}>
                        {countedPatterns}
                    </span>{" "}
                    PATTERNS • {languages.length} LANGUAGES
                </motion.div>

                {/* 2つのモードカード - メインCTA */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                        gap: "1.5rem",
                        width: "100%",
                        marginBottom: "2rem",
                    }}
                >
                    {/* Language View */}
                    <ModeCard
                        href="/languages"
                        title="LANGUAGE VIEW"
                        subtitle="本として読む"
                        description="特定のプロジェクトを選び、その世界観に没入しながらパターンを順番に読む"
                        icon="📖"
                        delay={0.3}
                    />

                    {/* Pattern View - 強調 */}
                    <ModeCard
                        href="/patterns"
                        title="PATTERN VIEW"
                        subtitle="知恵として引く"
                        description="すべてのパターンを横断的に探索し、必要な知恵を見つける"
                        icon="🔍"
                        delay={0.35}
                        accent
                    />
                </div>

                {/* 今日のパターン占い - コンパクト版 */}
                <motion.div
                    style={{
                        width: "100%",
                        maxWidth: 500,
                        margin: "0 auto 2rem",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                >
                    <DailyPatternFortune patterns={allPatterns} compact />
                </motion.div>

                {/* About & History リンク */}
                <motion.div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "1rem",
                        justifyContent: "center",
                        marginBottom: "2rem",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 }}
                >
                    <Link
                        href="/about"
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.625rem 1.25rem",
                            background: "#fff",
                            border: "2px solid #000",
                            color: "#000",
                            fontWeight: 800,
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                            textDecoration: "none",
                            boxShadow: "3px 3px 0 #000",
                            transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translate(-2px, -2px)";
                            e.currentTarget.style.boxShadow = "5px 5px 0 #000";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translate(0, 0)";
                            e.currentTarget.style.boxShadow = "3px 3px 0 #000";
                        }}
                    >
                        <span>❓</span>
                        <span>パターン・ランゲージとは？</span>
                    </Link>

                    {/* History - Coming Soon */}
                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            padding: "0.625rem 1.25rem",
                            background: "#f5f5f5",
                            border: "2px solid #ccc",
                            color: "#999",
                            fontWeight: 800,
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                            cursor: "not-allowed",
                            position: "relative",
                        }}
                    >
                        <span>📜</span>
                        <span>歴史を知る</span>
                        <span
                            style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-8px",
                                background: "#000",
                                color: "#fff",
                                fontSize: "0.5rem",
                                padding: "2px 6px",
                                fontWeight: 900,
                            }}
                        >
                            SOON
                        </span>
                    </div>
                </motion.div>
            </motion.div>

            {/* フッター */}
            <motion.p
                style={{
                    marginTop: "auto",
                    paddingTop: "1rem",
                    fontSize: "0.625rem",
                    color: "#999",
                    textTransform: "uppercase",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                transition={{ delay: 0.7 }}
            >
                Pattern Language Home — 知恵のライブラリ
            </motion.p>
        </div>
    );
}

// 浮遊する幾何学図形コンポーネント
function FloatingShapes() {
    return (
        <>
            {/* 正方形 - 左上 */}
            <motion.div
                style={{
                    position: "fixed",
                    top: "10%",
                    left: "5%",
                    width: 80,
                    height: 80,
                    border: "3px solid #000",
                    opacity: 0.06,
                }}
                animate={{
                    rotate: [0, 90, 180, 270, 360],
                    scale: [1, 1.1, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            {/* 塗りつぶし正方形 - 右下 */}
            <motion.div
                style={{
                    position: "fixed",
                    bottom: "15%",
                    right: "10%",
                    width: 50,
                    height: 50,
                    background: "#000",
                    opacity: 0.04,
                }}
                animate={{
                    rotate: [0, -90, -180, -270, -360],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
            {/* 円 - 右上 */}
            <motion.div
                style={{
                    position: "fixed",
                    top: "15%",
                    right: "12%",
                    width: 70,
                    height: 70,
                    borderRadius: "50%",
                    border: "3px solid #000",
                    opacity: 0.05,
                }}
                animate={{
                    y: [0, -15, 0],
                    x: [0, 8, 0],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* ダイヤモンド - 左下 */}
            <motion.div
                style={{
                    position: "fixed",
                    bottom: "20%",
                    left: "10%",
                    width: 40,
                    height: 40,
                    background: "#000",
                    opacity: 0.03,
                    transform: "rotate(45deg)",
                }}
                animate={{
                    y: [0, 12, 0],
                    rotate: [45, 135, 45],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
        </>
    );
}

// モードカードコンポーネント
function ModeCard({
    href,
    title,
    subtitle,
    description,
    icon,
    delay,
    accent = false,
}: {
    href: string;
    title: string;
    subtitle: string;
    description: string;
    icon: string;
    delay: number;
    accent?: boolean;
}) {
    const accentColor = "#2563eb"; // 青系アクセント

    return (
        <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
            <motion.div
                style={{ position: "relative", cursor: "pointer" }}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
            >
                {/* シャドウレイヤー */}
                <motion.div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: accent ? accentColor : "#000",
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
                        border: `3px solid ${accent ? accentColor : "#000"}`,
                        padding: "1.5rem",
                        zIndex: 1,
                        minHeight: 180,
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay, ...brutalSpring }}
                >
                    {/* アイコン + タイトル横並び */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                        <motion.div
                            style={{ fontSize: "2rem" }}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: delay + 0.1, type: "spring", stiffness: 200 }}
                        >
                            {icon}
                        </motion.div>

                        <div>
                            <h2
                                style={{
                                    fontSize: "1.125rem",
                                    fontWeight: 900,
                                    marginBottom: "0.125rem",
                                    textTransform: "uppercase",
                                    color: accent ? accentColor : "#000",
                                }}
                            >
                                {title}
                            </h2>
                            <p
                                style={{
                                    fontSize: "0.8rem",
                                    fontWeight: 600,
                                    color: "#555",
                                }}
                            >
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    {/* 説明 */}
                    <p
                        style={{
                            fontSize: "0.75rem",
                            color: "#666",
                            lineHeight: 1.6,
                            marginBottom: "0.75rem",
                        }}
                    >
                        {description}
                    </p>

                    {/* 矢印ヒント */}
                    <motion.div
                        style={{
                            fontSize: "0.625rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            color: accent ? accentColor : "#999",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                        }}
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        EXPLORE →
                    </motion.div>

                    {/* アクセントの場合、★マーク */}
                    {accent && (
                        <div
                            style={{
                                position: "absolute",
                                top: "-10px",
                                right: "-10px",
                                background: accentColor,
                                color: "#fff",
                                fontSize: "0.6rem",
                                padding: "4px 8px",
                                fontWeight: 900,
                                border: "2px solid #000",
                            }}
                        >
                            ★ EXPLORE
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </Link>
    );
}
