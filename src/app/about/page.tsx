"use client";

import { motion } from "framer-motion";
import Link from "next/link";

// ブルータルスプリング設定
const brutalSpring = {
    type: "spring",
    stiffness: 400,
    damping: 15,
};

export default function AboutPage() {
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
                    maxWidth: 800,
                    margin: "0 auto 3rem",
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
                    パターン・ランゲージとは
                </motion.h1>
                <motion.p
                    style={{
                        fontSize: "1.125rem",
                        color: "#666",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.25 }}
                >
                    知恵を言葉にする技法
                </motion.p>
            </motion.div>

            {/* コンテンツ */}
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                {/* 概要セクション */}
                <Section delay={0.3}>
                    <SectionTitle>概要</SectionTitle>
                    <p style={paragraphStyle}>
                        パターン・ランゲージとは、ある領域における「よい実践」や「成功事例」の背後にある
                        <strong>本質的なコツ</strong>を抽出し、再利用可能な形式で記述した
                        <strong>知の体系</strong>です。
                    </p>
                    <p style={paragraphStyle}>
                        元々は建築家クリストファー・アレグザンダーが、よい建築・まちづくりのパターンを言語化したことに始まります。
                        現在では、ビジネス、教育、コミュニティづくりなど、様々な領域で活用されています。
                    </p>
                </Section>

                {/* パターンの構造セクション */}
                <Section delay={0.4}>
                    <SectionTitle>パターンの基本構造</SectionTitle>
                    <p style={paragraphStyle}>
                        すべてのパターンは、以下の要素で構成されます。
                    </p>

                    <div
                        style={{
                            display: "grid",
                            gap: "1rem",
                            marginTop: "1.5rem",
                        }}
                    >
                        <PatternElement
                            name="パターン名"
                            description="その知恵を呼び表すタイトル"
                            icon="📛"
                        />
                        <PatternElement
                            name="イラスト"
                            description="概念を視覚的に表現した一枚絵"
                            icon="🎨"
                        />
                        <PatternElement
                            name="状況"
                            description="このパターンが適用される場面・背景"
                            icon="📍"
                        />
                        <PatternElement
                            name="問題"
                            description="その状況で起こりがちな困難・障壁"
                            icon="⚠️"
                        />
                        <PatternElement
                            name="解決"
                            description="問題を解決するための行動・コツ（核心）"
                            icon="💡"
                        />
                        <PatternElement
                            name="結果"
                            description="実践した後に期待される未来像"
                            icon="✨"
                        />
                    </div>
                </Section>

                {/* 読み方セクション */}
                <Section delay={0.5}>
                    <SectionTitle>記述フォーマット</SectionTitle>
                    <p style={paragraphStyle}>
                        パターン内のテキストは、問題解決の流れを表す構造で書かれています。
                    </p>

                    <div
                        style={{
                            background: "#f5f5f5",
                            border: "3px solid #000",
                            padding: "1.5rem",
                            marginTop: "1.5rem",
                            fontFamily: "monospace",
                        }}
                    >
                        <FormatLine label="▼ その状況において" description="（状況の説明）" />
                        <FormatLine label="しかし〜" description="（問題の説明）" highlight />
                        <FormatLine label="▼ そこで" description="（解決策の説明）" highlight />
                        <FormatLine label="▼ その結果" description="（期待される結果）" />
                    </div>
                </Section>

                {/* 2つのビューセクション */}
                <Section delay={0.6}>
                    <SectionTitle>2つの読み方</SectionTitle>
                    <p style={paragraphStyle}>
                        このアプリでは、2つの異なる読み方を提供しています。
                    </p>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                            gap: "1.5rem",
                            marginTop: "1.5rem",
                        }}
                    >
                        <ViewCard
                            title="Language View"
                            subtitle="本として読む"
                            description="特定のプロジェクトを選び、その世界観に没入しながらパターンを順番に読む"
                            icon="📖"
                        />
                        <ViewCard
                            title="Pattern View"
                            subtitle="知恵として引く"
                            description="すべてのパターンを横断的に探索し、偶発的な発見を促す"
                            icon="🔍"
                        />
                    </div>
                </Section>

                {/* パターン例セクション */}
                <Section delay={0.7}>
                    <SectionTitle>パターン例</SectionTitle>

                    <ExamplePattern
                        number="01"
                        name="はじまりの物語"
                        intro="背景と目的を知り、物語の一員になる。"
                        context="新しくチームに参加した。"
                        problem="担当範囲の仕事に集中しているだけでは、「チームとして仕事をする」ことにはならない。"
                        solution="背景と目的を聞くことで、現在に至ったのかを理解し、その流れの一部になる。"
                        result="チームで目指していることが共有されていると、同じ方向を向いて仕事を進めやすくなる。"
                        source="楽天主義"
                    />
                </Section>

                {/* 戻るボタン */}
                <motion.div
                    style={{
                        marginTop: "3rem",
                        textAlign: "center",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <Link
                        href="/"
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
                        ホームに戻る
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}

// 共通スタイル
const paragraphStyle: React.CSSProperties = {
    fontSize: "1rem",
    lineHeight: 1.8,
    color: "#333",
    marginBottom: "1rem",
};

// セクションコンポーネント
function Section({
    children,
    delay,
}: {
    children: React.ReactNode;
    delay: number;
}) {
    return (
        <motion.section
            style={{
                marginBottom: "3rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
        >
            {children}
        </motion.section>
    );
}

// セクションタイトル
function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2
            style={{
                fontSize: "1.5rem",
                fontWeight: 900,
                marginBottom: "1rem",
                paddingBottom: "0.5rem",
                borderBottom: "3px solid #000",
            }}
        >
            {children}
        </h2>
    );
}

// パターン要素カード
function PatternElement({
    name,
    description,
    icon,
}: {
    name: string;
    description: string;
    icon: string;
}) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                padding: "1rem",
                border: "2px solid #000",
                background: "#fff",
            }}
        >
            <span style={{ fontSize: "1.5rem" }}>{icon}</span>
            <div>
                <strong style={{ fontSize: "0.875rem", textTransform: "uppercase" }}>
                    {name}
                </strong>
                <p style={{ fontSize: "0.875rem", color: "#666", margin: 0 }}>
                    {description}
                </p>
            </div>
        </div>
    );
}

// フォーマット行
function FormatLine({
    label,
    description,
    highlight,
}: {
    label: string;
    description: string;
    highlight?: boolean;
}) {
    return (
        <div
            style={{
                marginBottom: "0.75rem",
                padding: highlight ? "0.5rem" : 0,
                background: highlight ? "#fff" : "transparent",
                border: highlight ? "2px solid #000" : "none",
            }}
        >
            <span style={{ fontWeight: 800 }}>{label}</span>
            <br />
            <span style={{ color: "#666" }}>{description}</span>
        </div>
    );
}

// ビューカード
function ViewCard({
    title,
    subtitle,
    description,
    icon,
}: {
    title: string;
    subtitle: string;
    description: string;
    icon: string;
}) {
    return (
        <div
            style={{
                padding: "1.5rem",
                border: "3px solid #000",
                background: "#fff",
                boxShadow: "6px 6px 0 #000",
            }}
        >
            <span style={{ fontSize: "2rem", marginBottom: "0.5rem", display: "block" }}>
                {icon}
            </span>
            <h3
                style={{
                    fontSize: "1rem",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    marginBottom: "0.25rem",
                }}
            >
                {title}
            </h3>
            <p
                style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#333",
                    marginBottom: "0.5rem",
                }}
            >
                {subtitle}
            </p>
            <p style={{ fontSize: "0.8rem", color: "#666", lineHeight: 1.5 }}>
                {description}
            </p>
        </div>
    );
}

// パターン例
function ExamplePattern({
    number,
    name,
    intro,
    context,
    problem,
    solution,
    result,
    source,
}: {
    number: string;
    name: string;
    intro: string;
    context: string;
    problem: string;
    solution: string;
    result: string;
    source: string;
}) {
    return (
        <div
            style={{
                border: "3px solid #000",
                background: "#fff",
                padding: "2rem",
                boxShadow: "8px 8px 0 #000",
            }}
        >
            {/* ヘッダー */}
            <div style={{ marginBottom: "1.5rem" }}>
                <span
                    style={{
                        display: "inline-block",
                        background: "#000",
                        color: "#fff",
                        padding: "0.25rem 0.75rem",
                        fontWeight: 900,
                        fontSize: "0.75rem",
                        marginBottom: "0.5rem",
                    }}
                >
                    #{number}
                </span>
                <h3
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: 900,
                        marginBottom: "0.25rem",
                    }}
                >
                    {name}
                </h3>
                <p style={{ fontSize: "0.875rem", color: "#666", fontStyle: "italic" }}>
                    {intro}
                </p>
            </div>

            {/* 内容 */}
            <div
                style={{
                    display: "grid",
                    gap: "1rem",
                    fontSize: "0.875rem",
                    lineHeight: 1.6,
                }}
            >
                <div>
                    <strong style={{ color: "#999" }}>▼ その状況において</strong>
                    <p style={{ margin: "0.25rem 0 0" }}>{context}</p>
                </div>
                <div>
                    <strong style={{ color: "#c00" }}>しかし〜</strong>
                    <p style={{ margin: "0.25rem 0 0" }}>{problem}</p>
                </div>
                <div
                    style={{
                        background: "#f0f0f0",
                        padding: "1rem",
                        border: "2px solid #000",
                    }}
                >
                    <strong>▼ そこで</strong>
                    <p style={{ margin: "0.25rem 0 0" }}>{solution}</p>
                </div>
                <div>
                    <strong style={{ color: "#090" }}>▼ その結果</strong>
                    <p style={{ margin: "0.25rem 0 0" }}>{result}</p>
                </div>
            </div>

            {/* 出典 */}
            <p
                style={{
                    marginTop: "1.5rem",
                    fontSize: "0.625rem",
                    color: "#999",
                    textTransform: "uppercase",
                }}
            >
                出典: {source}
            </p>
        </div>
    );
}
