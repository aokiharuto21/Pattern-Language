/**
 * Pattern Language Home - 型定義
 */

/**
 * 個別のパターン（知恵の1つ）
 */
export interface Pattern {
  id: number;
  pattern_name: string;
  intro?: string;         // 導入文（任意）
  context: string;        // ▼その状況において
  problem: string;        // しかし〜
  solution: string;       // ▼そこで
  consequence?: string;   // ▼その結果（任意）
  tags?: string[];        // タグ（任意）
}

/**
 * イラスト付きの拡張パターン（表示用）
 */
export interface PatternWithMeta extends Pattern {
  languageId: string;
  illustrationPath: string;
}

/**
 * パターン・ランゲージ（1つの冊子・カードセット）
 */
export interface PatternLanguage {
  id: string;             // "rakuten" | "tsubame"
  name: string;           // "楽天主義実践パターン"
  description: string;
  themeColor: string;     // "#ff6b35"
  format: "book" | "card";
  patternCount: number;
}

/**
 * テーマカラー定義
 */
export type ThemeColor = "mono" | "fire" | "ice";

export const themeColors: Record<ThemeColor, string> = {
  mono: "#000000",
  fire: "#ff6b35",
  ice: "#0066ff",
};
