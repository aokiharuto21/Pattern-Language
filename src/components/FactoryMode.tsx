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

// レーン設定（モンスターズ・インク風 - より活発に）
const LANES = [
    { speed: 22, direction: 1, y: "5%" },
    { speed: 30, direction: -1, y: "28%" },
    { speed: 18, direction: 1, y: "51%" },
    { speed: 26, direction: -1, y: "74%" },
];

// カラフルなドアの色パレット（モンスターズ・インク風）
const DOOR_COLORS = [
    "#FF6B6B", // コーラルレッド
    "#4ECDC4", // ティール
    "#FFE66D", // イエロー
    "#95E1D3", // ミントグリーン
    "#F38181", // サーモンピンク
    "#AA96DA", // ラベンダー
    "#FCBAD3", // ピンク
    "#A8D8EA", // スカイブルー
    "#FF9F43", // オレンジ
    "#26de81", // グリーン
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
                background: "linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                overflow: "hidden",
                border: "3px solid #000",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* モンスターズ・インク風の背景装飾 */}
            <DoorWarehouseBackground />

            {/* コンベアレーン */}
            {lanes.map((lane, laneIndex) => (
                <ConveyorLane
                    key={laneIndex}
                    patterns={lane.patterns}
                    speed={lane.speed}
                    direction={lane.direction}
                    yPosition={lane.y}
                    isPaused={isPaused}
                    laneIndex={laneIndex}
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
                            initial={{ scale: 0.5, y: 100, rotateY: -90 }}
                            animate={{ scale: 1, y: 0, rotateY: 0 }}
                            exit={{ scale: 0.5, y: 100, rotateY: 90 }}
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
                    color: "#fff",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    background: "rgba(0,0,0,0.7)",
                    padding: "0.5rem 1rem",
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderRadius: "4px",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                transition={{ delay: 1 }}
            >
                {isPaused ? "🚪 停止中 • ドアをクリック" : "✨ ホバーで停止 • クリックで開く"}
            </motion.div>
        </div>
    );
}

// モンスターズ・インク風の背景装飾（ドア保管庫）
function DoorWarehouseBackground() {
    return (
        <>
            {/* 背景のグリッドライン（パイプ風） */}
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: "60px 60px",
                }}
            />

            {/* カラフルな光の効果 */}
            {[
                { left: "10%", top: "20%", color: "#FF6B6B", size: 150 },
                { right: "15%", top: "30%", color: "#4ECDC4", size: 120 },
                { left: "20%", bottom: "25%", color: "#FFE66D", size: 100 },
                { right: "10%", bottom: "20%", color: "#AA96DA", size: 130 },
            ].map((light, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: "absolute",
                        ...light,
                        width: light.size,
                        height: light.size,
                        background: `radial-gradient(circle, ${light.color}20 0%, transparent 70%)`,
                        borderRadius: "50%",
                    }}
                    animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                />
            ))}

            {/* 走るライト効果（レール風） */}
            {[0, 1, 2, 3].map((i) => (
                <motion.div
                    key={`rail-${i}`}
                    style={{
                        position: "absolute",
                        top: `${i * 23 + 12}%`,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                    }}
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
    laneIndex,
    onSelect,
}: {
    patterns: PatternWithMeta[];
    speed: number;
    direction: number;
    yPosition: string;
    isPaused: boolean;
    laneIndex: number;
    onSelect: (pattern: PatternWithMeta) => void;
}) {
    const cardWidth = 160;
    const gap = 40;
    const totalWidth = patterns.length * (cardWidth + gap);



    // シンプルなアニメーション - ホバーで停止
    // CSSアニメーションを使用してanimation-play-stateで停止制御
    const animationDuration = `${speed}s`;
    const animationDirection = direction > 0 ? "normal" : "reverse";

    return (
        <div
            style={{
                position: "absolute",
                top: yPosition,
                left: 0,
                right: 0,
                height: 140,
                overflow: "visible",
            }}
        >
            {/* CSSアニメーション定義 */}
            <style>
                {`
                    @keyframes conveyor-${laneIndex} {
                        from { transform: translateX(0); }
                        to { transform: translateX(-${totalWidth}px); }
                    }
                `}
            </style>

            {/* コンベアベルト（レール風）*/}
            <div
                style={{
                    position: "absolute",
                    left: "-10%",
                    right: "-10%",
                    top: "60%",
                    height: 8,
                    background: "linear-gradient(90deg, #333 0%, #555 50%, #333 100%)",
                    transform: "translateY(-50%)",
                    borderTop: "2px solid #666",
                    borderBottom: "2px solid #222",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}
            />

            {/* アニメーションするドア群 - CSSアニメーション使用 */}
            <div
                style={{
                    display: "flex",
                    gap: gap,
                    position: "absolute",
                    top: 0,
                    animation: `conveyor-${laneIndex} ${animationDuration} linear infinite ${animationDirection}`,
                    animationPlayState: isPaused ? "paused" : "running",
                }}
            >
                {/* 無限ループのためにパターンを2回繰り返す */}
                {[...patterns, ...patterns].map((pattern, index) => {
                    const language = languages.find((l) => l.id === pattern.languageId);
                    const colorIndex = (pattern.id + laneIndex) % DOOR_COLORS.length;
                    return (
                        <DoorPanel
                            key={`${pattern.languageId}-${pattern.id}-${index}`}
                            pattern={pattern}
                            themeColor={language?.themeColor || DOOR_COLORS[colorIndex]}
                            doorColor={DOOR_COLORS[colorIndex]}
                            onSelect={() => onSelect(pattern)}
                        />
                    );
                })}
            </div>
        </div>
    );
}

// モンスターズ・インク風ドアパネル
function DoorPanel({
    pattern,
    themeColor,
    doorColor,
    onSelect,
}: {
    pattern: PatternWithMeta;
    themeColor: string;
    doorColor: string;
    onSelect: () => void;
}) {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    const panelWidth = 140;
    const panelHeight = 120;

    return (
        <motion.div
            style={{
                width: panelWidth,
                height: panelHeight,
                flexShrink: 0,
                cursor: "pointer",
                perspective: "1000px",
            }}
            whileHover={{ scale: 1.08, y: -8, zIndex: 50 }}
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
                    rotateY: isHovered ? 0 : -5,
                }}
                transition={{ duration: 0.3 }}
            >
                {/* ドアフレーム */}
                <div
                    style={{
                        position: "absolute",
                        width: panelWidth,
                        height: panelHeight,
                        background: doorColor,
                        border: "3px solid #000",
                        borderRadius: "8px 8px 0 0",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        boxShadow: isHovered
                            ? `0 0 20px ${doorColor}80, 4px 4px 0 #000`
                            : "3px 3px 0 rgba(0,0,0,0.4)",
                        transition: "box-shadow 0.3s",
                        transform: "translateZ(5px)",
                    }}
                >
                    {/* ドアの上部装飾（窓風） */}
                    <div
                        style={{
                            height: 8,
                            background: "rgba(0,0,0,0.2)",
                            borderBottom: "2px solid rgba(0,0,0,0.3)",
                        }}
                    />

                    {/* イラスト部分 */}
                    <div
                        style={{
                            flex: 1,
                            position: "relative",
                            background: "#fff",
                            margin: "6px",
                            borderRadius: "4px",
                            overflow: "hidden",
                            border: "2px solid rgba(0,0,0,0.2)",
                        }}
                    >
                        {!imageError ? (
                            <Image
                                src={pattern.illustrationPath}
                                alt={pattern.pattern_name}
                                fill
                                sizes="140px"
                                style={{ objectFit: "cover" }}
                                onError={() => setImageError(true)}
                            />
                        ) : (
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: `${themeColor}20`,
                                    fontSize: "1.5rem",
                                }}
                            >
                                🚪
                            </div>
                        )}
                    </div>

                    {/* パターン名バー */}
                    <div
                        style={{
                            background: "rgba(0,0,0,0.85)",
                            padding: "6px 8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                        }}
                    >
                        <p
                            style={{
                                fontSize: "0.65rem",
                                fontWeight: 800,
                                color: "#fff",
                                lineHeight: 1.2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                flex: 1,
                            }}
                        >
                            {pattern.pattern_name}
                        </p>
                        {/* 番号バッジ */}
                        <span
                            style={{
                                background: themeColor,
                                color: "#000",
                                fontSize: "0.5rem",
                                fontWeight: 900,
                                padding: "2px 4px",
                                borderRadius: "2px",
                            }}
                        >
                            {String(pattern.id).padStart(2, "0")}
                        </span>
                    </div>

                    {/* ドアノブ風装飾 */}
                    <motion.div
                        style={{
                            position: "absolute",
                            right: 8,
                            top: "50%",
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: isHovered ? "#FFD700" : "#888",
                            border: "2px solid #000",
                            transform: "translateY(-50%)",
                        }}
                        animate={isHovered ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 0.3 }}
                    />
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
                    color: "#000",
                    padding: "0.25rem 0.75rem",
                    fontWeight: 900,
                    fontSize: "0.75rem",
                    border: "2px solid #000",
                    marginBottom: "1rem",
                }}
            >
                🚪 #{paddedNumber}
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
                    borderRadius: "8px",
                    overflow: "hidden",
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
                    <span style={{ fontSize: "3rem", opacity: 0.3 }}>🚪</span>
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
                    🚪 ドアを開ける →
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
