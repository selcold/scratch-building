# MOD追加ガイド

以下の手順に従って、新しい[MODをこのリスト](https://github.com/selcold/scratch-building-beta/blob/main/contents/contentObj_mods.ts#L49)に追加してください。

## 1. インターフェースを理解する

まず、MODの情報を追加するために使用するインターフェースを理解しましょう。

### contentObj_mods インターフェース:

```tsx
{
    version: "7" | "6"; // バージョン
    mod_type: "Default" | "Official" | "Prerequisite"; // MODタイプ
    project_type: "SBMOD" | "SBAPI" | "SBAddons" | "SBaddonAPI"; // プロジェクトタイプ
    projects_id: number; // プロジェクトID
    creator: string; // 作成者
    title: string; // タイトル
    title_ja?: string; // 日本語タイトル（オプション）
    description: string; // 説明
    description_ja?: string; // 日本語説明（オプション）
    tags?: Tag[]; // タグ（オプション）
}
```

# Tag インターフェース

```tsx
{
    label: string; // ラベル
    color: "" | "dark" | "blue" | "red" | "green" | "yellow" | "indigo" | "purple" | "pink"; // 色
    display?: "block" | "none"; // 表示設定（オプション）
}
```

# 2. MOD情報を追加する

新しいMOD情報を以下の形式で追加してください。

```tsx
{
    "version": "7", // バージョン
    "mod_type": "Default", // MODタイプ
    "project_type": "SBAPI", // プロジェクトタイプ
    "projects_id": 123456789, // プロジェクトID
    "creator": "Your_Name", // 作成者
    "title": "Your_MOD_Title", // タイトル
    "description": "Your_MOD_Description", // 説明
    "description_ja": "Your_MOD_Description_in_Japanese", // 日本語説明（オプション）
    "tags": [ // タグ（オプション）
        {
            "label": "Tag_Label", // タグのラベル
            "color": "blue", // タグの色
        }
    ]
}
```

# 3. 追加されたMOD情報を確認する

MOD情報が正しく追加されたことを確認してください。すべての必須フィールドが提供され、不要なフィールドが含まれていないことを確認してください。