"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { PatternWithMeta } from "@/types/pattern";
import { getLanguageById } from "@/data/languages";

interface PatternDetailProps {
    pattern: PatternWithMeta;
    onClose?: () => void;
    onPrev?: () => void;
    onNext?: () => void;
}

// ブルータルスプリング設定
const brutalSpring = {
    type: "spring",
    stiffness: 400,
    damping: 15,
};

export default function PatternDetail({
    pattern,
    onClose,
    onPrev,
    onNext,
}: PatternDetailProps) {
    const [imageError, setImageError] = useState(false);
    const language = getLanguageById(pattern.languageId);
    const themeColor = language?.themeColor || "#000";
    const paddedNumber = String(pattern.id).padStart(2, "0");

    return (
        <motion.div
            style={{
                maxWidth: 640,
                margin: "0 auto",
                padding: "2rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={brutalSpring}
        >
            {/* ヘッダー：番号 + パターン名 */}
            <motion.div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    marginBottom: "1.5rem",
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
            >
                {/* 番号バッジ */}
                <div
                    style={{
                        background: themeColor,
                        color: themeColor === "#000" ? "#fff" : "#000",
                        padding: "0.5rem 1rem",
                        fontWeight: 900,
                        fontSize: "1rem",
                        border: "2px solid #000",
                    }}
                >
                    #{paddedNumber}
                </div>

                {/* パターン名 */}
                <h1
                    style={{
                        fontSize: "1.75rem",
                        fontWeight: 900,
                        lineHeight: 1.2,
                    }}
                >
                    {pattern.pattern_name}
                </h1>
            </motion.div>

            {/* 導入文 */}
            {pattern.intro && (
                <motion.p
                    style={{
                        fontSize: "1.125rem",
                        fontWeight: 600,
                        color: "#333",
                        marginBottom: "1.5rem",
                        paddingLeft: "1rem",
                        borderLeft: `4px solid ${themeColor}`,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    {pattern.intro}
                </motion.p>
            )}

            {/* イラスト */}
            <motion.div
                style={{
                    width: "100%",
                    height: 280,
                    background: "#fff",
                    border: "3px solid #000",
                    marginBottom: "2rem",
                    position: "relative",
                    boxShadow: `8px 8px 0 ${themeColor}`,
                }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, ...brutalSpring }}
            >
                {!imageError && (
                    <Image
                        src={pattern.illustrationPath}
                        alt={pattern.pattern_name}
                        fill
                        sizes="(max-width: 768px) 100vw, 640px"
                        style={{
                            objectFit: "contain",
                        }}
                        onError={() => setImageError(true)}
                    />
                )}
                {imageError && (
                    <span
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            fontSize: "4rem",
                            opacity: 0.2,
                        }}
                    >
                        📝
                    </span>
                )}
            </motion.div>

            {/* 状況 */}
            <Section
                marker="▼ その状況において"
                content={pattern.context}
                delay={0.3}
                themeColor={themeColor}
            />

            {/* 問題 */}
            <Section
                marker="しかし"
                content={pattern.problem}
                delay={0.4}
                themeColor={themeColor}
                isHighlight
            />

            {/* 解決 */}
            <Section
                marker="▼ そこで"
                content={pattern.solution}
                delay={0.5}
                themeColor={themeColor}
                isMain
            />

            {/* 結果 */}
            {pattern.consequence && (
                <Section
                    marker="▼ その結果"
                    content={pattern.consequence}
                    delay={0.6}
                    themeColor={themeColor}
                />
            )}

            {/* ナビゲーション */}
            <motion.div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "3rem",
                    paddingTop: "1.5rem",
                    borderTop: "2px solid #000",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                {onPrev ? (
                    <NavButton label="← 前のパターン" onClick={onPrev} />
                ) : (
                    <div />
                )}
                {onNext && <NavButton label="次のパターン →" onClick={onNext} />}
            </motion.div>
        </motion.div>
    );
}

// セクションコンポーネント
function Section({
    marker,
    content,
    delay,
    themeColor,
    isHighlight,
    isMain,
}: {
    marker: string;
    content: string;
    delay: number;
    themeColor: string;
    isHighlight?: boolean;
    isMain?: boolean;
}) {
    return (
        <motion.div
            style={{
                marginBottom: "1.5rem",
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
        >
            <div
                style={{
                    display: "inline-block",
                    background: isMain ? themeColor : "#000",
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: 800,
                    padding: "0.25rem 0.75rem",
                    marginBottom: "0.5rem",
                }}
            >
                {marker}
            </div>
            <p
                style={{
                    fontSize: isMain ? "1.125rem" : "1rem",
                    fontWeight: isMain ? 600 : 400,
                    lineHeight: 1.8,
                    color: isHighlight ? "#666" : "#000",
                }}
            >
                {content}
            </p>
        </motion.div>
    );
}

// ナビゲーションボタン
function NavButton({
    label,
    onClick,
}: {
    label: string;
    onClick: () => void;
}) {
    return (
        <motion.button
            onClick={onClick}
            style={{
                background: "#fff",
                border: "2px solid #000",
                padding: "0.75rem 1.5rem",
                fontWeight: 800,
                fontSize: "0.875rem",
                cursor: "pointer",
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
        >
            {label}
        </motion.button>
    );
}
