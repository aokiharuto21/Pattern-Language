"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { getAllPatterns, getTotalPatternCount } from "@/lib/loader";
import { languages } from "@/data/languages";
import PatternCard from "@/components/PatternCard";

// 動的インポートでパフォーマンス最適化
const ConstellationMode = lazy(() => import("@/components/ConstellationMode"));
const FactoryMode = lazy(() => import("@/components/FactoryMode"));

type ViewMode = "grid" | "constellation" | "factory";

// ブルータルスプリング設定
const brutalSpring = {
    type: "spring",
    stiffness: 400,
    damping: 15,
};

export default function PatternsPage() {
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const allPatterns = getAllPatterns();
    const totalCount = getTotalPatternCount();

    // localStorage からモードを復元
    useEffect(() => {
        const savedMode = localStorage.getItem("patternViewMode") as ViewMode;
        if (savedMode && ["grid", "constellation", "factory"].includes(savedMode)) {
            setViewMode(savedMode);
        }
    }, []);

    // モード変更時に localStorage に保存
    const handleModeChange = (mode: ViewMode) => {
        setViewMode(mode);
        localStorage.setItem("patternViewMode", mode);
    };

    // フィルタリング
    const filteredPatterns = selectedLanguage
        ? allPatterns.filter((p) => p.languageId === selectedLanguage)
        : allPatterns;

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
                    maxWidth: 1200,
                    margin: "0 auto 2rem",
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
                    PATTERN VIEW
                </h1>
                <p
                    style={{
                        fontSize: "1rem",
                        color: "#666",
                    }}
                >
                    知恵として横断的に探す — {totalCount} パターン
                </p>
            </motion.div>

            {/* モード切り替えUI */}
            <motion.div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto 1.5rem",
                    display: "flex",
                    gap: "0.5rem",
                    flexWrap: "wrap",
                    padding: "1rem",
                    background: "#f5f5f5",
                    border: "2px solid #000",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.12 }}
            >
                <span
                    style={{
                        fontSize: "0.625rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: "#999",
                        alignSelf: "center",
                        marginRight: "0.5rem",
                    }}
                >
                    表示モード:
                </span>
                <ModeButton
                    icon="🌌"
                    label="星空"
                    isActive={viewMode === "constellation"}
                    onClick={() => handleModeChange("constellation")}
                />
                <ModeButton
                    icon="🏭"
                    label="工場"
                    isActive={viewMode === "factory"}
                    onClick={() => handleModeChange("factory")}
                />
                <ModeButton
                    icon="📋"
                    label="グリッド"
                    isActive={viewMode === "grid"}
                    onClick={() => handleModeChange("grid")}
                />
            </motion.div>

            {/* フィルター（グリッドモードのみ表示） */}
            {viewMode === "grid" && (
                <motion.div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto 2rem",
                        display: "flex",
                        gap: "0.5rem",
                        flexWrap: "wrap",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15 }}
                >
                    <FilterButton
                        label="すべて"
                        isActive={selectedLanguage === null}
                        onClick={() => setSelectedLanguage(null)}
                        color="#000"
                    />
                    {languages.map((lang) => (
                        <FilterButton
                            key={lang.id}
                            label={lang.name}
                            isActive={selectedLanguage === lang.id}
                            onClick={() => setSelectedLanguage(lang.id)}
                            color={lang.themeColor}
                        />
                    ))}
                </motion.div>
            )}

            {/* パターン数表示（グリッドモードのみ） */}
            {viewMode === "grid" && (
                <motion.div
                    style={{
                        maxWidth: 1200,
                        margin: "0 auto 2rem",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: "#999",
                        textTransform: "uppercase",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    SHOWING {filteredPatterns.length} PATTERNS
                </motion.div>
            )}

            {/* コンテンツエリア */}
            <AnimatePresence mode="wait">
                {viewMode === "grid" && (
                    <motion.div
                        key="grid"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <GridView patterns={filteredPatterns} />
                    </motion.div>
                )}

                {viewMode === "constellation" && (
                    <motion.div
                        key="constellation"
                        style={{ maxWidth: 1200, margin: "0 auto" }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Suspense fallback={<LoadingView mode="星空" />}>
                            <ConstellationMode patterns={allPatterns} />
                        </Suspense>
                    </motion.div>
                )}

                {viewMode === "factory" && (
                    <motion.div
                        key="factory"
                        style={{ maxWidth: 1200, margin: "0 auto" }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Suspense fallback={<LoadingView mode="工場" />}>
                            <FactoryMode patterns={allPatterns} />
                        </Suspense>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// グリッドビュー
function GridView({ patterns }: { patterns: ReturnType<typeof getAllPatterns> }) {
    return (
        <div
            style={{
                maxWidth: 1200,
                margin: "0 auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "2.5rem",
            }}
        >
            <AnimatePresence mode="popLayout">
                {patterns.map((pattern, index) => {
                    const language = languages.find((l) => l.id === pattern.languageId);
                    return (
                        <motion.div
                            key={`${pattern.languageId}-${pattern.id}`}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: index * 0.02 }}
                        >
                            <Link
                                href={`/languages/${pattern.languageId}/${pattern.id}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <PatternCard
                                    pattern={pattern}
                                    themeColor={language?.themeColor || "#000"}
                                    delay={0}
                                />
                            </Link>
                        </motion.div>
                    );
                })}
            </AnimatePresence>
        </div>
    );
}

// ローディング表示
function LoadingView({ mode }: { mode: string }) {
    return (
        <div
            style={{
                height: "calc(100vh - 300px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px solid #000",
                background: "#f5f5f5",
            }}
        >
            <motion.div
                style={{
                    textAlign: "center",
                }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                <p style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    {mode === "星空" ? "🌌" : "🏭"}
                </p>
                <p
                    style={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                    }}
                >
                    {mode}モードを読み込み中...
                </p>
            </motion.div>
        </div>
    );
}

// モード切り替えボタン
function ModeButton({
    icon,
    label,
    isActive,
    onClick,
}: {
    icon: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
}) {
    return (
        <motion.button
            onClick={onClick}
            style={{
                padding: "0.5rem 1rem",
                border: "2px solid #000",
                background: isActive ? "#000" : "#fff",
                color: isActive ? "#fff" : "#000",
                fontWeight: 800,
                fontSize: "0.75rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={brutalSpring}
        >
            <span>{icon}</span>
            <span style={{ textTransform: "uppercase" }}>{label}</span>
        </motion.button>
    );
}

// フィルターボタン
function FilterButton({
    label,
    isActive,
    onClick,
    color,
}: {
    label: string;
    isActive: boolean;
    onClick: () => void;
    color: string;
}) {
    return (
        <motion.button
            onClick={onClick}
            style={{
                padding: "0.5rem 1rem",
                border: "2px solid #000",
                background: isActive ? color : "#fff",
                color: isActive && color !== "#000" ? "#000" : isActive ? "#fff" : "#000",
                fontWeight: 800,
                fontSize: "0.75rem",
                cursor: "pointer",
                textTransform: "uppercase",
            }}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
        >
            {label}
        </motion.button>
    );
}
