"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const brutalSpring = {
    type: "spring",
    stiffness: 400,
    damping: 15,
};

const timeline = [
    {
        year: "1977",
        category: "建築・都市設計",
        title: "クリストファー・アレグザンダー",
        subtitle: "「A Pattern Language」出版",
        description:
            "建築家アレグザンダーは、世界中の優れた建築・まちから共通するパターンを抽出し、253のパターンからなる言語体系を構築した。「問題の構造を文脈・問題・解決で記述する」という形式が、パターン・ランゲージの原型となった。",
        points: [
            "253のパターンで建築・都市の知恵を体系化",
            "「問題→解決」構造の記述形式を確立",
            "人間スケールの設計思想を提唱",
        ],
        accent: "#ff6b35",
    },
    {
        year: "1987",
        category: "ソフトウェア工学",
        title: "ソフトウェアへの応用",
        subtitle: "Kent Beck & Ward Cunningham",
        description:
            "プログラマーのKent BeckとWard Cunninghamが、アレグザンダーの思想をオブジェクト指向設計に応用した先駆的な論文を発表。コードの再利用可能な構造を「パターン」として捉える視点が生まれた。",
        points: [
            "建築パターンをソフトウェア設計に転用",
            "Smalltalkでの実践的な適用を発表",
            "後のGoFパターン研究の礎となった",
        ],
        accent: "#2563eb",
    },
    {
        year: "1994",
        category: "ソフトウェア工学",
        title: "GoF「Design Patterns」",
        subtitle: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
        description:
            "「Gang of Four（四人組）」と呼ばれる4人の著者が23のデザインパターンを体系化。ソフトウェアエンジニアリングのバイブルとなり、パターン・ランゲージが世界規模で知られるようになった。",
        points: [
            "Creational / Structural / Behavioral の3分類・23パターン",
            "ソフトウェア業界のデファクトスタンダードに",
            "「パターン」という語が開発者間の共通語彙に",
        ],
        accent: "#2563eb",
    },
    {
        year: "2000年代",
        category: "社会・組織・教育",
        title: "まちづくり・組織・教育への拡張",
        subtitle: "多様な領域での実践",
        description:
            "パターン・ランゲージの方法論が建築・ソフトウェアの枠を超え、まちづくり、組織運営、コミュニティ形成、教育設計など幅広い領域に応用されるようになった。特に日本では慶應義塾大学の井庭崇らが中心となり様々なパターン・ランゲージが研究・実践された。",
        points: [
            "燕市まちづくりパターンなど地域文脈での実践",
            "組織・チームビルディングへの応用",
            "「楽天主義」など企業文化のパターン化",
        ],
        accent: "#10b981",
    },
    {
        year: "現在",
        category: "多領域への応用",
        title: "実践知のアーカイブとして",
        subtitle: "OKパターン、Scrum、学習パターンなど",
        description:
            "現代では、アジャイル開発（Scrumパターン）、学習設計、コミュニティ運営など多岐にわたる領域でパターン・ランゲージが活用されている。デジタル技術との融合により、パターンの発見・共有・応用がより広く、速く行われるようになっている。",
        points: [
            "Scrum / アジャイル開発パターンの普及",
            "学習パターン・対話パターンなど教育への応用",
            "デジタルアーカイブによる知の共有促進",
        ],
        accent: "#10b981",
    },
];

export default function HistoryPage() {
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
                style={{ maxWidth: 800, margin: "0 auto 3rem" }}
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

                <motion.h1
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: 900,
                        marginTop: "1rem",
                        marginBottom: "0.5rem",
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, ...brutalSpring }}
                >
                    HISTORY
                </motion.h1>
                <motion.p
                    style={{ fontSize: "1.125rem", color: "#666" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                >
                    パターン・ランゲージの歩み — 建築から現代まで
                </motion.p>
            </motion.div>

            {/* タイムライン */}
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <motion.div
                    style={{ position: "relative" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    {/* 縦線 */}
                    <div
                        style={{
                            position: "absolute",
                            left: 72,
                            top: 0,
                            bottom: 0,
                            width: 3,
                            background: "#000",
                        }}
                    />

                    {timeline.map((item, index) => (
                        <TimelineCard key={item.year} item={item} index={index} />
                    ))}
                </motion.div>

                {/* 探索ボタン */}
                <motion.div
                    style={{ marginTop: "3rem", textAlign: "center" }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: 0.2 }}
                >
                    <p
                        style={{
                            fontSize: "1rem",
                            color: "#333",
                            marginBottom: "1.5rem",
                            lineHeight: 1.8,
                        }}
                    >
                        半世紀に渡り進化してきたパターン・ランゲージ。
                        <br />
                        その実践知を、あなた自身の手で探索してみよう。
                    </p>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                        <Link
                            href="/languages"
                            style={{
                                display: "inline-block",
                                background: "#000",
                                color: "#fff",
                                padding: "1rem 2rem",
                                fontWeight: 800,
                                fontSize: "0.875rem",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                border: "3px solid #000",
                                boxShadow: "6px 6px 0 #333",
                            }}
                        >
                            📖 Language View で読む
                        </Link>
                        <Link
                            href="/patterns"
                            style={{
                                display: "inline-block",
                                background: "#fff",
                                color: "#000",
                                padding: "1rem 2rem",
                                fontWeight: 800,
                                fontSize: "0.875rem",
                                textTransform: "uppercase",
                                textDecoration: "none",
                                border: "3px solid #000",
                                boxShadow: "6px 6px 0 #000",
                            }}
                        >
                            🔍 Pattern View で探す
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function TimelineCard({
    item,
    index,
}: {
    item: (typeof timeline)[number];
    index: number;
}) {
    return (
        <motion.div
            style={{
                display: "flex",
                gap: "1.5rem",
                marginBottom: "2.5rem",
                position: "relative",
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.05, ...brutalSpring }}
        >
            {/* 年代ラベル */}
            <div
                style={{
                    flexShrink: 0,
                    width: 64,
                    textAlign: "right",
                    paddingTop: "1.25rem",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <span
                    style={{
                        fontSize: "0.7rem",
                        fontWeight: 900,
                        color: "#fff",
                        background: item.accent,
                        padding: "0.2rem 0.4rem",
                        display: "inline-block",
                        lineHeight: 1.2,
                        textAlign: "center",
                    }}
                >
                    {item.year}
                </span>
            </div>

            {/* ドット */}
            <div
                style={{
                    flexShrink: 0,
                    width: 16,
                    display: "flex",
                    alignItems: "flex-start",
                    paddingTop: "1.5rem",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                <div
                    style={{
                        width: 16,
                        height: 16,
                        background: item.accent,
                        border: "3px solid #000",
                        flexShrink: 0,
                    }}
                />
            </div>

            {/* カード本体 */}
            <div
                style={{
                    flex: 1,
                    border: "3px solid #000",
                    background: "#fff",
                    boxShadow: "6px 6px 0 #000",
                    padding: "1.5rem",
                }}
            >
                {/* カテゴリバッジ */}
                <span
                    style={{
                        display: "inline-block",
                        background: item.accent,
                        color: "#fff",
                        fontSize: "0.625rem",
                        fontWeight: 900,
                        padding: "0.2rem 0.6rem",
                        textTransform: "uppercase",
                        marginBottom: "0.75rem",
                    }}
                >
                    {item.category}
                </span>

                {/* タイトル */}
                <h3
                    style={{
                        fontSize: "1.25rem",
                        fontWeight: 900,
                        marginBottom: "0.25rem",
                    }}
                >
                    {item.title}
                </h3>
                <p
                    style={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#555",
                        marginBottom: "1rem",
                    }}
                >
                    {item.subtitle}
                </p>

                {/* 説明文 */}
                <p
                    style={{
                        fontSize: "0.875rem",
                        lineHeight: 1.7,
                        color: "#333",
                        marginBottom: "1rem",
                    }}
                >
                    {item.description}
                </p>

                {/* ポイント */}
                <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                    {item.points.map((point) => (
                        <li
                            key={point}
                            style={{
                                fontSize: "0.8rem",
                                color: "#444",
                                paddingLeft: "1rem",
                                marginBottom: "0.375rem",
                                position: "relative",
                            }}
                        >
                            <span
                                style={{
                                    position: "absolute",
                                    left: 0,
                                    color: item.accent,
                                    fontWeight: 900,
                                }}
                            >
                                ▸
                            </span>
                            {point}
                        </li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
}
