"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PatternWithMeta } from "@/types/pattern";
import { languages } from "@/data/languages";

interface FactoryModeProps {
    patterns: PatternWithMeta[];
}

// レーン設定
const LANES = [
    { speed: 25, direction: 1, y: "5%" },
    { speed: 35, direction: -1, y: "28%" },
    { speed: 20, direction: 1, y: "51%" },
    { speed: 30, direction: -1, y: "74%" },
];

export default function FactoryMode({ patterns }: FactoryModeProps) {
    const [selectedPattern, setSelectedPattern] = useState<PatternWithMeta | null>(null);
    const [isPaused, setIsPaused] = useState(false);

    // パターンをレーンに分配
    const lanes = LANES.map((lane, laneIndex) => {
        const lanePatterns = patterns.filter((_, i) => i % LANES.length === laneIndex);
        return { ...lane, patterns: lanePatterns };
    });

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "calc(100vh - 200px)",
                minHeight: 600,
                background: "#1a1a1a",
                overflow: "hidden",
                border: "3px solid #000",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* 工場の背景装飾 */}
            <FactoryBackground />

            {/* コンベアレーン */}
            {lanes.map((lane, laneIndex) => (
                <ConveyorLane
                    key={laneIndex}
                    patterns={lane.patterns}
                    speed={lane.speed}
                    direction={lane.direction}
                    yPosition={lane.y}
                    isPaused={isPaused}
                    onSelect={setSelectedPattern}
                />
            ))}

            {/* 選択されたカードのオーバーレイ */}
            <AnimatePresence>
                {selectedPattern && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0, 0, 0, 0.9)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 100,
                        }}
                        onClick={() => setSelectedPattern(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 100 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.5, y: 100 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: "#fff",
                                border: "3px solid #000",
                                padding: "2rem",
                                maxWidth: 400,
                                width: "90%",
                            }}
                        >
                            <SelectedPatternCard
                                pattern={selectedPattern}
                                themeColor={languages.find((l) => l.id === selectedPattern.languageId)?.themeColor || "#000"}
                                onClose={() => setSelectedPattern(null)}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 操作ヒント */}
            <motion.div
                style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: "#666",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    background: "rgba(0,0,0,0.5)",
                    padding: "0.5rem 1rem",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 1 }}
            >
                {isPaused ? "停止中 • 箱をクリック" : "ホバーで停止 • クリックで選択"}
            </motion.div>
        </div>
    );
}

// 工場の背景装飾
function FactoryBackground() {
    return (
        <>
            {/* グリッドライン */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px",
                }}
            />

            {/* 歯車装飾 */}
            {[
                { left: "5%", top: "10%", size: 100 },
                { right: "8%", bottom: "15%", size: 80 },
                { left: "15%", bottom: "20%", size: 60 },
            ].map((gear, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: "absolute",
                        ...gear,
                        width: gear.size,
                        height: gear.size,
                        border: "3px solid rgba(255,255,255,0.1)",
                        borderRadius: "50%",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
                />
            ))}
        </>
    );
}

// コンベアレーン
function ConveyorLane({
    patterns,
    speed,
    direction,
    yPosition,
    isPaused,
    onSelect,
}: {
    patterns: PatternWithMeta[];
    speed: number;
    direction: number;
    yPosition: string;
    isPaused: boolean;
    onSelect: (pattern: PatternWithMeta) => void;
}) {
    const cardWidth = 180;
    const gap = 50;
    const totalWidth = patterns.length * (cardWidth + gap);

    return (
        <div
            style={{
                position: "absolute",
                top: yPosition,
                left: 0,
                right: 0,
                height: 130,
                overflow: "visible",
            }}
        >
            {/* コンベアベルト */}
            <div
                style={{
                    position: "absolute",
                    left: "-10%",
                    right: "-10%",
                    top: "55%",
                    height: 10,
                    background: "linear-gradient(90deg, #333 0%, #444 50%, #333 100%)",
                    transform: "translateY(-50%)",
                    borderTop: "2px solid #555",
                    borderBottom: "2px solid #222",
                }}
            />

            {/* アニメーションする箱群 */}
            <motion.div
                style={{
                    display: "flex",
                    gap: gap,
                    position: "absolute",
                    top: 0,
                }}
                animate={{
                    x: direction > 0
                        ? [0, -totalWidth]
                        : [-totalWidth, 0],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                    ...(isPaused && {
                        duration: 0,
                    }),
                }}
            >
                {/* 無限ループのためにパターンを2回繰り返す */}
                {[...patterns, ...patterns].map((pattern, index) => {
                    const language = languages.find((l) => l.id === pattern.languageId);
                    return (
                        <CardboardBox
                            key={`${pattern.languageId}-${pattern.id}-${index}`}
                            pattern={pattern}
                            themeColor={language?.themeColor || "#000"}
                            onSelect={() => onSelect(pattern)}
                        />
                    );
                })}
            </motion.div>
        </div>
    );
}

// 3Dダンボール箱コンポーネント（シンプル版：正面のみ）
function CardboardBox({
    pattern,
    themeColor,
    onSelect,
}: {
    pattern: PatternWithMeta;
    themeColor: string;
    onSelect: () => void;
}) {
    const [isHovered, setIsHovered] = useState(false);

    const boxWidth = 160;
    const boxHeight = 100;

    return (
        <motion.div
            style={{
                width: boxWidth,
                height: boxHeight,
                flexShrink: 0,
                cursor: "pointer",
                perspective: "800px",
            }}
            whileHover={{ scale: 1.05, y: -5, zIndex: 50 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={onSelect}
        >
            <motion.div
                style={{
                    width: "100%",
                    height: "100%",
                    position: "relative",
                    transformStyle: "preserve-3d",
                }}
                animate={{
                    rotateY: isHovered ? 0 : -8,
                }}
                transition={{ duration: 0.3 }}
            >
                {/* 正面 */}
                <div
                    style={{
                        position: "absolute",
                        width: boxWidth,
                        height: boxHeight,
                        background: "#d4a574",
                        border: "2px solid #8b6914",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0.75rem",
                        boxShadow: isHovered
                            ? `4px 4px 0 ${themeColor}`
                            : "2px 2px 0 rgba(0,0,0,0.3)",
                        transform: "translateZ(10px)",
                        transition: "box-shadow 0.3s",
                    }}
                >
                    {/* ダンボールのテープ風装飾 */}
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: "40%",
                            height: 8,
                            background: "#c4a060",
                            borderBottom: "1px solid #a08040",
                        }}
                    />

                    {/* パターン名 */}
                    <p
                        style={{
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            color: "#4a3520",
                            textAlign: "center",
                            lineHeight: 1.3,
                            marginBottom: "0.25rem",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                        }}
                    >
                        {pattern.pattern_name}
                    </p>

                    {/* Language名 */}
                    <p
                        style={{
                            fontSize: "0.5rem",
                            color: "#6a5540",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                        }}
                    >
                        {pattern.languageId === "rakuten" ? "楽天主義" : "燕市"}
                    </p>

                    {/* 番号スタンプ */}
                    <div
                        style={{
                            position: "absolute",
                            bottom: 8,
                            right: 8,
                            background: themeColor,
                            color: themeColor === "#000" ? "#fff" : "#000",
                            padding: "2px 6px",
                            fontSize: "0.5rem",
                            fontWeight: 900,
                            border: "1px solid #000",
                        }}
                    >
                        #{String(pattern.id).padStart(2, "0")}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// 選択されたパターンの詳細カード
function SelectedPatternCard({
    pattern,
    themeColor,
    onClose,
}: {
    pattern: PatternWithMeta;
    themeColor: string;
    onClose: () => void;
}) {
    const [imageError, setImageError] = useState(false);
    const paddedNumber = String(pattern.id).padStart(2, "0");

    return (
        <>
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
                    marginBottom: "1rem",
                }}
            >
                #{paddedNumber}
            </div>

            {/* イラスト */}
            <div
                style={{
                    width: "100%",
                    height: 180,
                    background: themeColor,
                    border: "2px solid #000",
                    marginBottom: "1rem",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                {!imageError && (
                    <Image
                        src={pattern.illustrationPath}
                        alt={pattern.pattern_name}
                        fill
                        sizes="400px"
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
                    fontSize: "1.5rem",
                    fontWeight: 900,
                    marginBottom: "0.5rem",
                }}
            >
                {pattern.pattern_name}
            </h3>

            {/* 導入文 */}
            <p
                style={{
                    fontSize: "0.875rem",
                    color: "#666",
                    marginBottom: "1.5rem",
                    lineHeight: 1.6,
                }}
            >
                {pattern.intro || pattern.context}
            </p>

            {/* ボタン */}
            <div style={{ display: "flex", gap: "1rem" }}>
                <Link
                    href={`/languages/${pattern.languageId}/${pattern.id}`}
                    style={{
                        flex: 1,
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
                >
                    詳細を見る →
                </Link>
                <button
                    onClick={onClose}
                    style={{
                        padding: "0.75rem 1rem",
                        background: "#fff",
                        border: "2px solid #000",
                        fontWeight: 800,
                        fontSize: "0.75rem",
                        cursor: "pointer",
                    }}
                >
                    閉じる
                </button>
            </div>
        </>
    );
}
