import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Pattern Language Home",
    description: "パターン・ランゲージを読む・探すWebアプリ。楽天主義・燕市まちづくりなど51のパターンを収録。",
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
