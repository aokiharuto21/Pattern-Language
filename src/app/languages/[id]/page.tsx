"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getLanguageById } from "@/data/languages";
import { getPatternsByLanguage } from "@/lib/loader";
import PatternCard from "@/components/PatternCard";

export default function LanguageViewPage() {
    const params = useParams();
    const languageId = params.id as string;
    const language = getLanguageById(languageId);
    const patterns = getPatternsByLanguage(languageId);

    if (!language) {
        return (
            <div style={{ padding: "3rem", textAlign: "center" }}>
                <h1>Language not found</h1>
                <Link href="/languages">← 戻る</Link>
            </div>
        );
    }

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
                    margin: "0 auto 3rem",
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <Link
                    href="/languages"
                    style={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: "#999",
                        textDecoration: "none",
                    }}
                >
                    ← LANGUAGES
                </Link>

                <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
                    {/* テーマカラーインジケーター */}
                    <div
                        style={{
                            width: 16,
                            height: 16,
                            background: language.themeColor,
                            border: "2px solid #000",
                        }}
                    />
                    <h1
                        style={{
                            fontSize: "2rem",
                            fontWeight: 900,
                        }}
                    >
                        {language.name}
                    </h1>
                </div>

                <p
                    style={{
                        fontSize: "1rem",
                        color: "#666",
                        marginTop: "0.5rem",
                    }}
                >
                    {language.description}
                </p>

                <div
                    style={{
                        marginTop: "1rem",
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        color: "#999",
                        textTransform: "uppercase",
                    }}
                >
                    {patterns.length} PATTERNS
                </div>
            </motion.div>

            {/* パターングリッド */}
            <div
                style={{
                    maxWidth: 1200,
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "2.5rem",
                }}
            >
                {patterns.map((pattern, index) => (
                    <Link
                        key={pattern.id}
                        href={`/languages/${languageId}/${pattern.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                    >
                        <PatternCard
                            pattern={pattern}
                            themeColor={language.themeColor}
                            delay={0.1 + index * 0.05}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}
