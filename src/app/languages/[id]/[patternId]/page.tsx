"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getLanguageById } from "@/data/languages";
import { getPatternsByLanguage, getPatternById } from "@/lib/loader";
import PatternDetail from "@/components/PatternDetail";

export default function PatternDetailPage() {
    const params = useParams();
    const router = useRouter();
    const languageId = params.id as string;
    const patternId = parseInt(params.patternId as string, 10);

    const language = getLanguageById(languageId);
    const pattern = getPatternById(languageId, patternId);
    const patterns = getPatternsByLanguage(languageId);

    if (!language || !pattern) {
        return (
            <div style={{ padding: "3rem", textAlign: "center" }}>
                <h1>Pattern not found</h1>
                <Link href={`/languages/${languageId}`}>← 戻る</Link>
            </div>
        );
    }

    // 前後のパターンを取得
    const currentIndex = patterns.findIndex((p) => p.id === patternId);
    const prevPattern = currentIndex > 0 ? patterns[currentIndex - 1] : null;
    const nextPattern = currentIndex < patterns.length - 1 ? patterns[currentIndex + 1] : null;

    const handlePrev = () => {
        if (prevPattern) {
            router.push(`/languages/${languageId}/${prevPattern.id}`);
        }
    };

    const handleNext = () => {
        if (nextPattern) {
            router.push(`/languages/${languageId}/${nextPattern.id}`);
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#fff",
                fontFamily: "system-ui, sans-serif",
            }}
        >
            {/* ナビゲーションバー */}
            <motion.div
                style={{
                    maxWidth: 640,
                    margin: "0 auto",
                    padding: "1.5rem 2rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.05 }}
            >
                <Link
                    href={`/languages/${languageId}`}
                    style={{
                        fontSize: "0.75rem",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: "#999",
                        textDecoration: "none",
                    }}
                >
                    ← {language.name}
                </Link>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                    }}
                >
                    <div
                        style={{
                            width: 10,
                            height: 10,
                            background: language.themeColor,
                            border: "1px solid #000",
                        }}
                    />
                    <span
                        style={{
                            fontSize: "0.625rem",
                            fontWeight: 800,
                            color: "#999",
                            textTransform: "uppercase",
                        }}
                    >
                        {patternId} / {patterns.length}
                    </span>
                </div>
            </motion.div>

            {/* パターン詳細 */}
            <PatternDetail
                pattern={pattern}
                onPrev={prevPattern ? handlePrev : undefined}
                onNext={nextPattern ? handleNext : undefined}
            />
        </div>
    );
}
