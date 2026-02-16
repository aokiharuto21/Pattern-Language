# CLAUDE.md - Pattern Language Home

## 1. Project Overview
パターン・ランゲージ（実践知）を体系的に読む・探すWebアプリ。
- **URL:** [https://pattern-language-tawny.vercel.app](https://pattern-language-tawny.vercel.app)
- **Repo:** [https://github.com/aokiharuto21/Pattern-Language](https://github.com/aokiharuto21/Pattern-Language)
- **Data:** 楽天主義(30) + 燕市(21) = 計51パターン

## 2. Current Status & Task
**Status:** Phase 8 Completed ✅ / Phase 9 進行中 📝
> 詳細なロードマップ: `docs/ROADMAP.md`

### 🌐 Phase 9: 公開品質の仕上げ（次のメインタスク）
- [ ] OGP 画像の設定（`public/og-image.png` + `layout.tsx` に `<meta>` タグ）
- [ ] favicon の設定（`public/favicon.ico` または SVG）
- [ ] `robots.txt`・`sitemap.xml` の追加（`src/app/sitemap.ts` で動的生成）
- [ ] 各ページ固有のメタデータ設定（languages, patterns, about, history）

### ✅ 完了済み（Phase 8 まで）
- [x] `layout.tsx` メタデータを本番用に修正
- [x] ModeCard subtitle 改行位置修正（`whiteSpace: "nowrap"`）
- [x] フッター副題「知恵のライブラリ」→「実践知のアーカイブ」
- [x] `src/app/history/page.tsx` 新規作成（縦型タイムライン、5エポック）
- [x] ホームの「歴史を知る」Coming Soon → 実リンク化

## 3. Architecture & Data
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind v4
- **Animation:** Framer Motion (必須)
- **Data:** `assets/*.json` -> `src/lib/loader.ts` で読み込み
- **Images:** `assets/illustrations/{lang}/{id}_{name}.png`

## 4. Design Rules (Neo Brutalism)
> 詳細: `docs/DESIGN.md`
- **Strict Rules:**
  - `border-radius: 0` (完全禁止)
  - `box-shadow`: Hard shadow only (blur: 0)
  - Colors: Bg `#FFFFFF`, Text `#000000`
  - Accent: Blue `#2563eb` (Pattern View), Orange `#ff6b35` (Rakuten), Green `#10b981` (Tsubame)
- **Animation:** 全てのインタラクティブ要素に `whileHover`, `whileTap` をつけること。

## 5. Deployment
`git push main` -> Vercel Automatic Deployment
