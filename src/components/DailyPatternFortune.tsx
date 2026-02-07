"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PatternWithMeta } from "@/types/pattern";
import { languages } from "@/data/languages";

interface DailyPatternFortuneProps {
    patterns: PatternWithMeta[];
    compact?: boolean;
}

// 日付ベースのシード生成
function getTodaysPattern(patterns: PatternWithMeta[]): PatternWithMeta {
    const today = new Date().toISOString().split("T")[0];
    const seed = today.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    return patterns[seed % patterns.length];
}

// ブルータルスプリング設定
const brutalSpring = {
    type: "spring",
    stiffness: 400,
    damping: 15,
};

export default function DailyPatternFortune({ patterns, compact = false }: DailyPatternFortuneProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [todaysPattern, setTodaysPattern] = useState<PatternWithMeta | null>(null);
    const [hasFlippedToday, setHasFlippedToday] = useState(false);
    const [imageError, setImageError] = useState(false);

    // 今日のパターンを決定
    useEffect(() => {
        if (patterns.length > 0) {
            setTodaysPattern(getTodaysPattern(patterns));
        }

        // 今日既にめくったかチェック
        const lastFlipped = localStorage.getItem("dailyFortuneLastFlipped");
        const today = new Date().toISOString().split("T")[0];
        if (lastFlipped === today) {
            setHasFlippedToday(true);
            setIsFlipped(true);
        }
    }, [patterns]);

    const handleFlip = () => {
        if (!isFlipped) {
            setIsFlipped(true);
            const today = new Date().toISOString().split("T")[0];
            localStorage.setItem("dailyFortuneLastFlipped", today);
            setHasFlippedToday(true);
        }
    };

    if (!todaysPattern) return null;

    const language = languages.find((l) => l.id === todaysPattern.languageId);
    const themeColor = language?.themeColor || "#000";
    const paddedNumber = String(todaysPattern.id).padStart(2, "0");

    // コンパクトモードの場合
    if (compact) {
        return (
            <motion.div
                style={{
                    position: "relative",
                    maxWidth: 280,
                    margin: "0 auto",
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, ...brutalSpring }}
            >
                {/* タイトル */}
                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "0.5rem",
                    }}
                >
                    <span style={{ fontSize: "1.25rem", marginRight: "0.375rem" }}>🎲</span>
                    <span
                        style={{
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            textTransform: "uppercase",
                        }}
                    >
                        今日のパターン占い
                    </span>
                </div>

                {/* カードコンテナ */}
                <motion.div
                    style={{
                        perspective: 800,
                        cursor: isFlipped ? "default" : "pointer",
                    }}
                    onClick={handleFlip}
                    whileHover={!isFlipped ? { scale: 1.02 } : {}}
                    animate={!isFlipped ? { rotate: [-1, 1, -1] } : {}}
                    transition={!isFlipped ? { duration: 2, repeat: Infinity, ease: "easeInOut" } : {}}
                >
                    <motion.div
                        style={{
                            position: "relative",
                            width: "100%",
                            height: 200,
                            transformStyle: "preserve-3d",
                        }}
                        animate={{
                            rotateY: isFlipped ? 180 : 0,
                        }}
                        transition={{
                            duration: 0.6,
                            type: "spring",
                            stiffness: 200,
                            damping: 20,
                        }}
                    >
                        {/* 裏面 */}
                        <div
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden",
                                background: "#000",
                                border: "3px solid #000",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "5px 5px 0 #333",
                            }}
                        >
                            <motion.span
                                style={{
                                    fontSize: "3.5rem",
                                    color: "#fff",
                                    fontWeight: 900,
                                }}
                                animate={{
                                    scale: [1, 1.15, 1],
                                    rotate: [0, 8, -8, 0],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                ?
                            </motion.span>
                            {!hasFlippedToday && (
                                <motion.p
                                    style={{
                                        color: "#666",
                                        fontSize: "0.625rem",
                                        fontWeight: 700,
                                        marginTop: "0.5rem",
                                        textTransform: "uppercase",
                                    }}
                                    animate={{ opacity: [0.5, 1, 0.5] }}
                                    transition={{ duration: 1.2, repeat: Infinity }}
                                >
                                    タップしてめくる
                                </motion.p>
                            )}
                        </div>

                        {/* 表面 */}
                        <div
                            style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                backfaceVisibility: "hidden",
                                transform: "rotateY(180deg)",
                                background: "#fff",
                                border: "3px solid #000",
                                padding: "0.75rem",
                                boxShadow: `5px 5px 0 ${themeColor}`,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            {/* 上部: 番号 + イラスト */}
                            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.5rem" }}>
                                <div
                                    style={{
                                        width: 70,
                                        height: 70,
                                        background: themeColor,
                                        border: "2px solid #000",
                                        position: "relative",
                                        overflow: "hidden",
                                        flexShrink: 0,
                                    }}
                                >
                                    {!imageError && (
                                        <Image
                                            src={todaysPattern.illustrationPath}
                                            alt={todaysPattern.pattern_name}
                                            fill
                                            sizes="70px"
                                            style={{ objectFit: "contain" }}
                                            onError={() => setImageError(true)}
                                        />
                                    )}
                                    {imageError && (
                                        <span style={{ fontSize: "1.5rem", opacity: 0.3, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>📝</span>
                                    )}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            display: "inline-block",
                                            background: themeColor,
                                            color: themeColor === "#000" ? "#fff" : "#000",
                                            padding: "0.125rem 0.5rem",
                                            fontWeight: 900,
                                            fontSize: "0.625rem",
                                            border: "2px solid #000",
                                            marginBottom: "0.25rem",
                                        }}
                                    >
                                        #{paddedNumber}
                                    </div>
                                    <h3
                                        style={{
                                            fontSize: "0.875rem",
                                            fontWeight: 900,
                                            lineHeight: 1.2,
                                        }}
                                    >
                                        {todaysPattern.pattern_name}
                                    </h3>
                                </div>
                            </div>

                            {/* 詳細へのリンク */}
                            <Link
                                href={`/languages/${todaysPattern.languageId}/${todaysPattern.id}`}
                                style={{
                                    display: "block",
                                    background: "#000",
                                    color: "#fff",
                                    padding: "0.5rem",
                                    textAlign: "center",
                                    fontWeight: 800,
                                    fontSize: "0.625rem",
                                    textTransform: "uppercase",
                                    textDecoration: "none",
                                    border: "2px solid #000",
                                    marginTop: "auto",
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                詳細を見る →
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>

                {/* 日付表示 */}
                <p
                    style={{
                        textAlign: "center",
                        marginTop: "0.5rem",
                        fontSize: "0.5rem",
                        color: "#aaa",
                        fontWeight: 700,
                    }}
                >
                    {new Date().toLocaleDateString("ja-JP", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </p>
            </motion.div>
        );
    }

    // 通常モード（既存のコード）
    return (
        <motion.div
            style={{
                position: "relative",
                maxWidth: 320,
                margin: "0 auto",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, ...brutalSpring }}
        >
            {/* タイトル */}
            <motion.div
                style={{
                    textAlign: "center",
                    marginBottom: "1rem",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
            >
                <span
                    style={{
                        fontSize: "1.5rem",
                        marginRight: "0.5rem",
                    }}
                >
                    🎲
                </span>
                <span
                    style={{
                        fontSize: "0.875rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                    }}
                >
                    今日のパターン占い
                </span>
            </motion.div>

            {/* カードコンテナ（3D回転用） */}
            <div
                style={{
                    perspective: 1000,
                    cursor: isFlipped ? "default" : "pointer",
                }}
                onClick={handleFlip}
            >
                <motion.div
                    style={{
                        position: "relative",
                        width: "100%",
                        height: 380,
                        transformStyle: "preserve-3d",
                    }}
                    animate={{
                        rotateY: isFlipped ? 180 : 0,
                    }}
                    transition={{
                        duration: 0.8,
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                    }}
                >
                    {/* 裏面（?マーク） */}
                    <div
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            background: "#000",
                            border: "3px solid #000",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            boxShadow: "8px 8px 0 #333",
                        }}
                    >
                        <motion.span
                            style={{
                                fontSize: "6rem",
                                color: "#fff",
                                fontWeight: 900,
                            }}
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            ?
                        </motion.span>
                        {!hasFlippedToday && (
                            <motion.p
                                style={{
                                    color: "#666",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    marginTop: "1rem",
                                    textTransform: "uppercase",
                                }}
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                タップしてめくる
                            </motion.p>
                        )}
                    </div>

                    {/* 表面（パターンカード） */}
                    <div
                        style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            backfaceVisibility: "hidden",
                            transform: "rotateY(180deg)",
                            background: "#fff",
                            border: "3px solid #000",
                            padding: "1.5rem",
                            boxShadow: `8px 8px 0 ${themeColor}`,
                        }}
                    >
                        {/* 番号バッジ */}
                        <div
                            style={{
                                display: "inline-block",
                                background: themeColor,
                                color: themeColor === "#000" ? "#fff" : "#000",
                                padding: "0.25rem 0.75rem",
                                fontWeight: 900,
                                fontSize: "0.75rem",
                                border: "2px solid #000",
                                marginBottom: "0.75rem",
                            }}
                        >
                            #{paddedNumber}
                        </div>

                        {/* イラスト */}
                        <div
                            style={{
                                width: "100%",
                                height: 140,
                                background: themeColor,
                                border: "2px solid #000",
                                marginBottom: "1rem",
                                position: "relative",
                                overflow: "hidden",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {!imageError && (
                                <Image
                                    src={todaysPattern.illustrationPath}
                                    alt={todaysPattern.pattern_name}
                                    fill
                                    sizes="320px"
                                    style={{ objectFit: "contain" }}
                                    onError={() => setImageError(true)}
                                />
                            )}
                            {imageError && (
                                <span style={{ fontSize: "3rem", opacity: 0.3 }}>📝</span>
                            )}
                        </div>

                        {/* パターン名 */}
                        <h3
                            style={{
                                fontSize: "1.25rem",
                                fontWeight: 900,
                                marginBottom: "0.5rem",
                                lineHeight: 1.3,
                            }}
                        >
                            {todaysPattern.pattern_name}
                        </h3>

                        {/* 導入文 */}
                        <p
                            style={{
                                fontSize: "0.8rem",
                                color: "#666",
                                lineHeight: 1.5,
                                marginBottom: "1rem",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                            }}
                        >
                            {todaysPattern.intro || todaysPattern.context}
                        </p>

                        {/* 詳細へのリンク */}
                        <Link
                            href={`/languages/${todaysPattern.languageId}/${todaysPattern.id}`}
                            style={{
                                display: "block",
                                background: "#000",
                                color: "#fff",
                                padding: "0.75rem",
                                textAlign: "center",
                                fontWeight: 800,
                                fontSize: "0.75rem",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                border: "2px solid #000",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            詳細を見る →
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* 日付表示 */}
            <motion.p
                style={{
                    textAlign: "center",
                    marginTop: "1rem",
                    fontSize: "0.625rem",
                    color: "#999",
                    fontWeight: 700,
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.8 }}
            >
                {new Date().toLocaleDateString("ja-JP", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </motion.p>
        </motion.div>
    );
}
