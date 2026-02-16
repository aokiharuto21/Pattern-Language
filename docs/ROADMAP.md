# ROADMAP

---

## 現在の状態

> **最終更新:** 2026-02-16
> **Phase:** 8 完了 ✅ / Phase 9 進行中 📝
> **公開URL:** [pattern-language-tawny.vercel.app](https://pattern-language-tawny.vercel.app)

| 画面 | URL | 状態 |
|------|-----|------|
| ホーム | `/` | ✅ |
| Language View一覧 | `/languages` | ✅ |
| Language View詳細 | `/languages/{id}` | ✅ |
| Pattern Detail | `/languages/{id}/{num}` | ✅ |
| Pattern View | `/patterns` | ✅ 3モード |
| About | `/about` | ✅ |
| History | `/history` | ✅ |

---

## 🔥 今すぐできる修正（1〜2時間以内）

> バグ・見た目の崩れ・本番に不適切な設定。コードは小さく、効果は大きい。

- [x] **`layout.tsx` メタデータ修正**
  - タイトル: `"Pattern Language Home"` に変更
  - 説明文: 実際のサービス説明に変更
  - ファイル: `src/app/layout.tsx`

- [x] **「本として読む」改行位置修正**
  - subtitle `<p>` に `whiteSpace: "nowrap"` を追加
  - ファイル: `src/app/page.tsx` の ModeCard subtitle

- [x] **サイト副題「知恵のライブラリ」の見直し**
  - 「実践知のアーカイブ」に変更

---

## 🌐 Phase 9: 公開品質の仕上げ

> すでに Vercel にデプロイ済み。ただし SNS シェアや検索エンジン対応が未整備。

- [ ] **OGP 画像の設定**
  - SNS でシェアされたときに表示される画像
  - `public/og-image.png` を作成し `layout.tsx` に `<meta>` タグを追加

- [ ] **favicon の設定**
  - `public/favicon.ico` または SVG favicon を配置

- [ ] **`robots.txt` と `sitemap.xml`**
  - `public/robots.txt` を作成（クロール許可）
  - `src/app/sitemap.ts` で動的 sitemap 生成（Next.js 15 の組み込み機能）

- [ ] **各ページのメタデータ**
  - Language View、Pattern View、About など各ページに固有の `title` と `description` を設定

---

## 🏷 Phase 10: データを活かした機能強化

> 既存のデータ構造（`tags` フィールド等）を UI に繋げる。大きな設計変更不要。

- [ ] **タグ表示**
  - パターンデータに `tags?: string[]` が定義済みだが UI 未実装
  - PatternCard と PatternDetail にタグバッジを追加

- [ ] **グリッドモードのタグフィルタ**
  - Pattern View グリッドモードに「コミュニケーション」「創造性」等のフィルタボタン追加
  - Language フィルタと共存させる

- [ ] **関連パターンへのリンク**
  - PatternDetail 画面の末尾に「関連パターン」セクション追加
  - 同じタグを持つパターンを横断表示

---

## 🔍 Phase 11: 検索

> 全パターンに対してキーワード検索ができるようにする。

- [ ] 検索ボックスの UI（Header or Pattern View に配置）
- [ ] パターン名・intro・context を対象にした前方一致 or 部分一致検索
- [ ] 検索結果のハイライト表示

---

## 📝 コンテンツ拡充（随時）

> アプリの価値はコンテンツの量と質に比例する。

- [ ] **既存パターンの強化**
  - `consequence`（▼その結果）が未入力のパターンを埋める
  - 実例・ユースケースの追記

- [ ] **新しい Language の追加**
  - 候補を探す（OKパターン、スクラムパターン等）
  - 手順: `assets/{id}_patterns.json` + `assets/illustrations/{id}/` を追加するだけ

---

## 💡 将来の展望（優先度：低）

> やりたいが今すぐではない。アイデアのストック。

#### デザイン・演出
- 詳細画面のパララックス効果
- 星空モードの星座ライン表示
- 季節に応じたホーム画面の演出

#### 機能拡張
- キーワード検索（Phase 11 に昇格済み）
- お気に入り（クリップ）機能
- 「読書モード」：一つの Language を本のように連続で読む（前後のパターンへページ送り）

#### 技術・品質
- Storybook 導入（コンポーネントカタログ）
- Jest + Testing Library でテスト追加
- `brutalSpring` アニメーション設定の一元管理（現在 各ファイルで重複定義）
- PWA 対応（オフライン閲覧）

#### 大規模機能
- 多言語対応（英語版）
- ユーザー投稿機能（新しいパターンを提案）
- パターン間のつながりをグラフで可視化

---

## 🏆 完了済み Phase（アーカイブ）

<details>
<summary><strong>Phase 0–4: 基盤完成</strong></summary>

#### Phase 0: デザイン検討 ✅
- Neo Brutalism（Mono）スタイルを採用

#### Phase 1: 基盤構築 ✅
- 型定義（`types/pattern.ts`）、JSONローダー（`lib/loader.ts`）

#### Phase 2: コンポーネント ✅
- `PatternCard`、`PatternDetail`

#### Phase 3: 画面実装 ✅
- Home、Language View（一覧・詳細）、Pattern View（グリッド）

#### Phase 4: コンテンツ投入 ✅
- 楽天主義 30パターン、燕市まちづくり 21パターン

</details>

<details>
<summary><strong>Phase 5: デザイン改善 ✅</strong></summary>

- 絵文字バグ修正（PatternCard, PatternDetail）
- 浮遊する幾何学図形・カウントアップアニメーション
- `<img>` → Next.js `<Image>` 移行・スマホレイアウト調整

</details>

<details>
<summary><strong>Phase 6: 体験の拡張 ✅</strong></summary>

- Pattern View 3モード（🌌星空 / 🏭工場 / 📋グリッド）+ localStorage 保存
- 今日のパターン占い（日付ベース・3Dフリップアニメーション）
- `/about` ページ・「歴史を知る」Coming Soon 配置

</details>

<details>
<summary><strong>Phase 7: Home画面リデザイン + Pattern View強化 ✅</strong></summary>

- Home: モードカード優先・PC余白改善・Pattern View 青アクセント追加
- 星空モード: カード → 光る星に変更・多色バリエーション・parallax
- 工場モード: 平面カード → 3Dダンボール箱・4レーンコンベア・ハイライト効果
- 工場モード大改修（モンスターズ・インク風）・燕市配色変更（2026-02-07）

</details>

<details>
<summary><strong>今すぐできる修正 + Phase 8: History ページ ✅</strong></summary>

- `layout.tsx` メタデータを本番用に修正（タイトル・説明文）
- ModeCard subtitle 改行問題修正（`whiteSpace: "nowrap"`）
- フッター副題「知恵のライブラリ」→「実践知のアーカイブ」
- `src/app/history/page.tsx` 新規作成（縦型タイムライン、5エポック）
- ホームの「歴史を知る」Coming Soon → 実リンク化

</details>

---

### 📝 作業ログ

| 日付 | 作業内容 | 状態 |
|------|----------|------|
| 2026-02-05 | Phase 5: デザイン改善全般 | ✅ |
| 2026-02-05 | Phase 6: 3モード、占い、/about | ✅ |
| 2026-02-05 | Phase 7前半: Home画面リデザイン | ✅ |
| 2026-02-06 | Phase 7後半: Pattern View強化（星空・工場モード改善） | ✅ |
| 2026-02-06 | Vercel + GitHub でデプロイ完了 🎉 | ✅ |
| 2026-02-07 | 工場モード大改修（モンスターズ・インク風）・燕市配色変更 | ✅ |
| 2026-02-16 | 今すぐできる修正3件（metadata, subtitle改行, 副題）| ✅ |
| 2026-02-16 | Phase 8: History ページ（タイムライン5エポック）| ✅ |
