# Scratch Building

Scratch Building is a game developed on the Scratch platform, and this repository serves as its official website. It provides various features including account authentication, commenting, notifications, and community engagement.

## language

[English](https://github.com/selcold/scratch-building/blob/main/README.md) / [日本語](https://github.com/selcold/scratch-building/blob/main/README/ja.md)


# Table of Contents
- [Scratch Building Website](#scratch-building)
- [Adding New MODs](#adding-new-mods)
    - [Files](#files)
    - [Information to Add](#information-to-add)
    - [Example Addition](#example-addition)

# Adding New MODs

Here are the steps to add a new MOD to this repository.

## Files

Please place the file for the new MOD in the following location:

- **File Path:** `/contents/mods.ts`

## Information to Add

Add information for the new MOD to the `contentObj_modsAll` object in the `mods.ts` file.

### Properties

1. **version:** Specify the version number of the MOD.
2. **project_type:** Specify the type of the project. Example: "SBMOD", "SBAPI", "SBAddons", "SBaddonAPI".
3. **project_id:** Specify the ID of the project.
4. **creator:** Specify the creator of the MOD.
5. **title:** Specify the title of the MOD.
6. **title_en:** Specify the English title of the MOD (optional).
7. **description:** Specify the description of the MOD.
8. **description_en:** Specify the English description of the MOD (optional).
9. **tags:** Specify tags related to the MOD. Each tag has a label and a color.

### Example Addition

```typescript
{
    "version": 7,
    "project_type": "SBMOD",
    "project_id": YOUR_PROJECT_ID,
    "creator": "YOUR_NAME",
    "title": "YOUR_MOD_TITLE",
    "title_en": "YOUR_MOD_EN_TITLE", // Optional
    "description": "YOUR_MOD_DESCRIPTION",
    "description_en": "YOUR_MOD_EN_DESCRIPTION", // Optional
    "tags": [
        {
            "label": "YOUR_TAG_LABEL",
            "color": "YOUR_TAG_COLOR"
        },
        // Add additional tags here if needed
    ]
}
```

> [!NOTE]
> - Choose the color for the tags from the following values: "dark", "blue", "red", "green", "yellow", "indigo", "purple", "pink", "" (empty string).
> - Don't forget to create a pull request after making changes to the file.