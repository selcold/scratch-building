import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme"; // Tailwindのデフォルトテーマをインポート

const config = {
  // ダークモードはクラスベースで切り替えます
  darkMode: ["class"],
  // コンテンツのパス設定（一般的なReact/Next.jsプロジェクトの構造）
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      // カスタム画面サイズ (breakpoints) を拡張
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': "1400px",
        '3xl': "1600px", // ワイドデスクトップ用
        '4xl': "1920px", // ウルトラワイド用
      },
    },
    extend: {
      // 1. フォントファミリーの拡張
      fontFamily: {
        // メインフォントとして 'Inter' を設定
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        // 見出しやアクセント用に 'Poppins' を追加 (例: className="font-heading")
        heading: ["Poppins", ...defaultTheme.fontFamily.sans],
      },

      // 2. カラーパレット (shadcn/uiのCSS変数ベースのカラーを保持)
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      
      // 3. ボーダーラディウスの拡張
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 2px)", // より大きな丸みを追加
      },

      // 4. カスタムシャドウの追加
      boxShadow: {
        // より目立つ、深みのあるシャドウ (例: className="shadow-3xl")
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.4)',
      },

      // 5. アコーディオン用キーフレームとアニメーション (元の設定を保持)
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  // プラグイン (アニメーション系を保持)
  plugins: [require("tailwindcss-animate"), require("tailwindcss-animated")],
} satisfies Config;

export default config;
