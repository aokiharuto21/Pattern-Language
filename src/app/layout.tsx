import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pattern Language Home - デザイン検討",
    description: "3つのデザインテーマを比較するプロトタイプ",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="ja">
            <body>{children}</body>
        </html>
    );
}
