"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PatternWithMeta } from "@/types/pattern";
import { languages } from "@/data/languages";

interface ConstellationModeProps {
    patterns: PatternWithMeta[];
}

// 星の色バリエーション
const STAR_COLORS = [
    "#ffffff", // 白
    "#ffe4c4", // 淡いオレンジ（恒星っぽい）
    "#b8d4ff", // 淡い青（冷たい星）
    "#fffacd", // レモン（金色系）
    "#e6e6fa", // ラベンダー（紫っぽい）
];

// 各星の位置を生成
function generatePositions(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        x: Math.random() * 85 + 7.5, // 7.5-92.5%
        y: Math.random() * 75 + 12.5, // 12.5-87.5%
        size: 4 + Math.random() * 8, // 4-12px
        delay: i * 0.02,
        twinkleSpeed: 1.5 + Math.random() * 2, // 1.5-3.5秒
        twinkleDelay: Math.random() * 2,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
    }));
}

// 背景星の位置を生成
function generateBackgroundStars(count: number) {
    return Array.from({ length: count }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 1 + Math.random() * 2,
        opacity: 0.2 + Math.random() * 0.3,
        duration: 2 + Math.random() * 3,
        delay: Math.random() * 2,
    }));
}

export default function ConstellationMode({ patterns }: ConstellationModeProps) {
    const [positions, setPositions] = useState<ReturnType<typeof generatePositions>>([]);
    const [backgroundStars, setBackgroundStars] = useState<ReturnType<typeof generateBackgroundStars>>([]);
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [hoveredPattern, setHoveredPattern] = useState<PatternWithMeta | null>(null);
    const [selectedPattern, setSelectedPattern] = useState<PatternWithMeta | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // 初回レンダリング時に位置を生成（クライアントサイドのみ）
    useEffect(() => {
        setPositions(generatePositions(patterns.length));
        setBackgroundStars(generateBackgroundStars(100));
    }, [patterns.length]);

    // マウス追跡
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                setMousePosition({
                    x: (e.clientX - rect.left) / rect.width,
                    y: (e.clientY - rect.top) / rect.height,
                });
            }
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    if (positions.length === 0) return null;

    return (
        <div
            ref={containerRef}
            style={{
                position: "relative",
                width: "100%",
                height: "calc(100vh - 200px)",
                minHeight: 600,
                background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)",
                overflow: "hidden",
                borderRadius: 0,
                border: "3px solid #000",
            }}
        >
            {/* 背景の微細な星 */}
            {backgroundStars.map((star, i) => (
                <motion.div
                    key={`bg-star-${i}`}
                    style={{
                        position: "absolute",
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: star.size,
                        height: star.size,
                        background: "#fff",
                        opacity: star.opacity,
                    }}
                    animate={{
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: star.duration,
                        repeat: Infinity,
                        delay: star.delay,
                    }}
                />
            ))}

            {/* パターン星 */}
            {patterns.map((pattern, index) => {
                const pos = positions[index];
                if (!pos) return null;

                const language = languages.find((l) => l.id === pattern.languageId);
                const themeColor = language?.themeColor || "#fff";
                const parallaxX = (mousePosition.x - 0.5) * 5;
                const parallaxY = (mousePosition.y - 0.5) * 5;
                const isHovered = hoveredPattern?.id === pattern.id && hoveredPattern?.languageId === pattern.languageId;

                return (
                    <Star
                        key={`${pattern.languageId}-${pattern.id}`}
                        pattern={pattern}
                        position={pos}
                        parallax={{ x: parallaxX, y: parallaxY }}
                        themeColor={themeColor}
                        isHovered={isHovered}
                        onHover={(hovered) => setHoveredPattern(hovered ? pattern : null)}
                        onSelect={() => setSelectedPattern(pattern)}
                    />
                );
            })}

            {/* 選択されたパターンのオーバーレイ */}
            <AnimatePresence>
                {selectedPattern && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0, 0, 0, 0.85)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            zIndex: 100,
                        }}
                        onClick={() => setSelectedPattern(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1 }}
            >
                星をホバーでパターン名表示 • クリックで詳細
            </motion.div>
        </div>
    );
}

// 星コンポーネント
function Star({
    pattern,
    position,
    parallax,
    themeColor,
    isHovered,
    onHover,
    onSelect,
}: {
    pattern: PatternWithMeta;
    position: ReturnType<typeof generatePositions>[0];
    parallax: { x: number; y: number };
    themeColor: string;
    isHovered: boolean;
    onHover: (hovered: boolean) => void;
    onSelect: () => void;
}) {
    return (
        <motion.div
            style={{
                position: "absolute",
                left: `${position.x}%`,
                top: `${position.y}%`,
                cursor: "pointer",
                zIndex: isHovered ? 50 : 10,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: 1,
                scale: 1,
                x: parallax.x,
                y: parallax.y,
            }}
            transition={{ delay: position.delay, type: "spring", stiffness: 100 }}
            onMouseEnter={() => onHover(true)}
            onMouseLeave={() => onHover(false)}
            onClick={onSelect}
        >
            {/* 星本体 */}
            <motion.div
                style={{
                    width: isHovered ? position.size * 2 : position.size,
                    height: isHovered ? position.size * 2 : position.size,
                    background: isHovered ? themeColor : position.color,
                    boxShadow: isHovered
                        ? `0 0 20px ${themeColor}, 0 0 40px ${themeColor}, 0 0 60px ${themeColor}`
                        : `0 0 ${position.size}px ${position.color}80`,
                    borderRadius: "50%",
                    transition: "all 0.3s ease",
                }}
                animate={{
                    opacity: isHovered ? 1 : [0.6, 1, 0.6],
                    scale: isHovered ? 1.5 : [1, 1.2, 1],
                }}
                transition={{
                    duration: position.twinkleSpeed,
                    repeat: isHovered ? 0 : Infinity,
                    delay: position.twinkleDelay,
                    ease: "easeInOut",
                }}
            />

            {/* ホバー時のツールチップ */}
            <AnimatePresence>
                {isHovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            position: "absolute",
                            top: position.size * 2 + 10,
                            left: "50%",
                            transform: "translateX(-50%)",
                            background: "#fff",
                            color: "#000",
                            padding: "0.5rem 0.75rem",
                            border: "2px solid #000",
                            boxShadow: `4px 4px 0 ${themeColor}`,
                            whiteSpace: "nowrap",
                            zIndex: 100,
                        }}
                    >
                        <p
                            style={{
                                fontSize: "0.75rem",
                                fontWeight: 800,
                                margin: 0,
                            }}
                        >
                            {pattern.pattern_name}
                        </p>
                        <p
                            style={{
                                fontSize: "0.625rem",
                                color: "#666",
                                margin: "0.25rem 0 0 0",
                                textTransform: "uppercase",
                            }}
                        >
                            {pattern.languageId === "rakuten" ? "楽天主義" : "燕市"}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
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
