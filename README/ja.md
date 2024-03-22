# ビル経営ゲーム ウェブサイト

ビル経営ゲームはScratchプラットフォーム上で開発されたゲームであり、このリポジトリはその公式ウェブサイトとして機能しています。アカウント認証、コメント、通知、コミュニティ参加など、さまざまな機能を提供しています。

## language

[English](https://github.com/selcold/scratch-building/blob/main/README.md) / [日本語](https://github.com/selcold/scratch-building/blob/main/README/ja.md)

# 目次
- [ビル経営ゲーム](#ビル経営ゲーム-ウェブサイト)
- [MODの登録](#新しいmodの追加)
    - [ファイル](#ファイル)
    - [追加する情報](#追加するmodの情報)
    - [追加例](#追加例)

# 新しいMODの追加

このリポジトリに新しいMODを追加するための手順です。

## ファイル

新しいMODを追加するファイルは以下の場所に配置してください。

- **ファイルパス:** `/contents/contentObj_mods.ts`

## 追加するMODの情報

`contentObj_mods.ts` ファイル内の `contentObj_modsAll` オブジェクトに新しいMODの情報を追加してください。

### プロパティ

1. **version:** MODのバージョン番号を指定します。
2. **project_type:** プロジェクトのタイプを指定します。例: "SBMOD", "SBAPI", "SBAddons", "SBaddonAPI"。
3. **project_id:** プロジェクトのIDを指定します。
4. **creator:** MODの作者を指定します。
5. **title:** MODのタイトルを指定します。
6. **title_en:** MODの英語タイトルを指定します（オプション）。
7. **description:** MODの説明を指定します。
8. **description_en:** MODの英語説明を指定します（オプション）。
9. **tags:** MODに関連するタグを指定します。各タグはラベルとカラーを持ちます。

### 追加例

```typescript
{
    "version": 7,
    "project_type": "SBMOD",
    "project_id": YOUR_PROJECT_ID,
    "creator": "YOUR_NAME",
    "title": "YOUR_MOD_TITLE",
    "title_en": "YOUR_MOD_EN_TITLE", // オプション
    "description": "YOUR_MOD_DESCRIPTION",
    "description_en": "YOUR_MOD_EN_DESCRIPTION", // オプション
    "tags": [
        {
            "label": "YOUR_TAG_LABEL",
            "color": "YOUR_TAG_COLOR"
        },
        // 追加のタグがあればここに追加してください
    ]
}
```

> [!NOTE]
> - タグのカラーは以下の値から選択してください: "dark", "blue", "red", "green", "yellow", "indigo", "purple", "pink", ""（空文字）。
> - ファイルを変更した後はプルリクエストをお忘れなく。
