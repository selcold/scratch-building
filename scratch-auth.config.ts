import { ScratchAuth_config } from "scratch-auth-react/src/dist/config"

// セットアップファイル内で必要な設定を行います
const config: ScratchAuth_config = {
    redirect_url: `http://localhost:3000/api/auth/`,
    title: `Scratch Building`,
}

export default config

// https://scratch-building.vercel.app/api/auth/