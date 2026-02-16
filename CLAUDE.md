# CLAUDE.md - Pattern Language Home

## 1. Project Overview
パターン・ランゲージ（実践知）を体系的に読む・探すWebアプリ。
- **URL:** [https://pattern-language-tawny.vercel.app](https://pattern-language-tawny.vercel.app)
- **Repo:** [https://github.com/aokiharuto21/Pattern-Language](https://github.com/aokiharuto21/Pattern-Language)
- **Data:** 楽天主義(30) + 燕市(21) = 計51パターン

## 2. Current Status & Task
**Status:** Phase 7 Completed ✅ / 今すぐできる修正 → Phase 8 → 9 へ
> 詳細なロードマップ: `docs/ROADMAP.md`

### 🔥 今すぐできる修正（最優先）
- [ ] `src/app/layout.tsx` のタイトル・説明文を本番用に修正（現在「デザイン検討」のまま）
- [ ] `src/app/page.tsx` ModeCard の subtitle「本として読む」改行位置修正（「に読む」が孤立）
- [ ] ホーム画面のサイト副題「知恵のライブラリ」の文言見直し

### 📌 Phase 8: History ページ（次のメインタスク）
- [ ] `src/app/history/page.tsx` 新規作成（タイムライン形式）
- [ ] コンテンツ: クリストファー・アレグザンダー、GoF、現代への応用
- [ ] `src/app/page.tsx` の History Coming Soon ボタンを実リンクに更新

### 🌐 Phase 9: 公開品質の仕上げ（Phase 8 完了後）
- [ ] OGP 画像・favicon の設定
- [ ] `robots.txt`・`sitemap.xml` の追加
- [ ] 各ページ固有のメタデータ設定

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
