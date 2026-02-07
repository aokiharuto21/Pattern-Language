import { PatternLanguage } from "@/types/pattern";

/**
 * パターン・ランゲージのメタデータ
 */
export const languages: PatternLanguage[] = [
    {
        id: "rakuten",
        name: "楽天主義実践パターン",
        description: "仕事の心構えと実践知。組織で働く人が、より良い成果を生み出すための30のコツ。",
        themeColor: "#ff6b35",
        format: "book",
        patternCount: 30,
    },
    {
        id: "tsubame",
        name: "燕市まちづくりパターン",
        description: "コミュニティづくりの知恵。地域の人々と共に活動するための21のコツ。",
        themeColor: "#0066ff",
        format: "card",
        patternCount: 21,
    },
];

/**
 * ID からランゲージを取得
 */
export function getLanguageById(id: string): PatternLanguage | undefined {
    return languages.find((lang) => lang.id === id);
}
