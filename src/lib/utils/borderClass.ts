/**
 * アイテムのボーダーカラークラスを計算するユーティリティ
 *
 * 常に border-b を描画しつつ、最後のアイテムは
 * 通常時は透明・ホバー時のみ表示させることで
 * レイアウトシフトなしにホバーボーダーを実現する。
 *
 * @param showAlways true = 常時表示 / false = ホバー時のみ表示
 */
export function getBorderClass(showAlways: boolean): string {
  return showAlways
    ? 'border-borderDim' /* true */
    : 'border-transparent'; /* false */
}
