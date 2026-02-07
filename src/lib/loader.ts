import { Pattern, PatternWithMeta } from "@/types/pattern";
import { languages, getLanguageById } from "@/data/languages";

// JSONデータのインポート
import rakutenPatterns from "../../assets/rakuten_patterns.json";
import tsubamePatterns from "../../assets/tsubame_patterns.json";

/**
 * パターンデータのマップ
 */
const patternData: Record<string, Pattern[]> = {
    rakuten: rakutenPatterns as Pattern[],
    tsubame: tsubamePatterns as Pattern[],
};

/**
 * 楽天イラストのマッピング（実際のファイル名）
 */
const rakutenIllustrations: Record<number, string> = {
    1: "1.大義1_大義とのつながり.png",
    2: "2.大義2_その先のイメージ.png",
    3: "3.大義3_身近なところから.png",
    4: "4.品性1_どう見えるか.png",
    5: "5.品性2_腹落ちできる未来.png",
    6: "6.品性3_日頃の振る舞い.png",
    7: "7.用意1_複数のシナリオ.png",
    8: "8.用意2_多方面の壁打ち.png",
    9: "9.用意3_チャンスの種まき.png",
    10: "10.信念1_徹底的な細分化.png",
    11: "11.信念2_何度も語る.png",
    12: "12.信念3_力を借りる.png",
    13: "13.一致1_はじまりの物語.png",
    14: "14.一致2_強みの掛け合わせ.png",
    15: "15.一致3_全体を感じる場.png",
    16: "16.常に1_もっといける.png",
    17: "17.常に2_もしもの思考実験.png",
    18: "18.常に3_別のやり方.png",
    19: "19.プロ1_何のためにやるのか.png",
    20: "20.プロ2_チャレンジングな目標.png",
    21: "21.プロ3_自分ごと.png",
    22: "22.仕組化1_まず動く.png",
    23: "23.仕組化2_速くぐるぐる回す.png",
    24: "24.仕組化3_他でも役立ちそうなこと.png",
    25: "25.顧客1_顧客になりきる.png",
    26: "26.顧客2_未来の笑顔.png",
    27: "27.顧客3_届くまでのリレー.png",
    28: "28.スピード1_早めの締め切り.png",
    29: "29.スピード2_時間を増やす.png",
    30: "30.スピード3_圧倒的に速い人.png",
};

/**
 * イラストパスを生成
 * @param languageId - ランゲージID
 * @param patternId - パターンID（番号）
 * @param patternName - パターン名
 */
export function getIllustrationPath(
    languageId: string,
    patternId: number,
    patternName: string
): string {
    if (languageId === "tsubame") {
        // 燕市: {番号}_{パターン名}_白背景.PNG
        return `/assets/illustrations/tsubame/${patternId}_${patternName}_白背景.PNG`;
    }

    // 楽天: マッピングから取得
    const filename = rakutenIllustrations[patternId];
    if (filename) {
        return `/assets/illustrations/rakuten/${filename}`;
    }

    // フォールバック
    return `/assets/illustrations/rakuten/${patternId}_${patternName}.png`;
}

/**
 * 指定したランゲージのパターン一覧を取得
 */
export function getPatternsByLanguage(languageId: string): PatternWithMeta[] {
    const patterns = patternData[languageId];
    if (!patterns) return [];

    return patterns.map((pattern) => ({
        ...pattern,
        languageId,
        illustrationPath: getIllustrationPath(languageId, pattern.id, pattern.pattern_name),
    }));
}

/**
 * 単一パターンを取得
 */
export function getPatternById(
    languageId: string,
    patternId: number
): PatternWithMeta | undefined {
    const patterns = getPatternsByLanguage(languageId);
    return patterns.find((p) => p.id === patternId);
}

/**
 * 全パターンを取得（Pattern View用）
 */
export function getAllPatterns(): PatternWithMeta[] {
    const allPatterns: PatternWithMeta[] = [];

    for (const lang of languages) {
        const patterns = getPatternsByLanguage(lang.id);
        allPatterns.push(...patterns);
    }

    return allPatterns;
}

/**
 * パターン総数を取得
 */
export function getTotalPatternCount(): number {
    return languages.reduce((sum, lang) => sum + lang.patternCount, 0);
}
