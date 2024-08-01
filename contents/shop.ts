import { _shop_items } from "@/components/client/shop/previewItem";

const shop_items: _shop_items = {
    deco: {
        'deco-1': {
            label: 'ビル',
            release_date: '',
            price: 0,
        },
        'deco-2': {
            label: 'クリスマス2023',
            release_date: '2023-12-25',
            price: 0,
        },
        'deco-3': {
            label: '2024!!',
            release_date: '2023-01-01',
            price: 0,
        },
        'deco-4': {
            label: 'チョコレート！',
            release_date: '2023-02-09',
            price: 12200000,
            svg: `
                <defs>
                    <linearGradient x1="239.7" y1="53.3" x2="239.7" y2="161.4" gradientUnits="userSpaceOnUse" id="color-1"><stop offset="0" stop-color="#804219" stop-opacity="0.75"/><stop offset="1" stop-color="#49250e" stop-opacity="0.75"/></linearGradient>
                    <linearGradient x1="371.4" y1="242.5" x2="371.4" y2="268.3" gradientUnits="userSpaceOnUse" id="color-2"><stop offset="0" stop-color="#c2c2c2"/><stop offset="1" stop-color="#808080"/></linearGradient>
                </defs>
                <g transform="translate(-48.3,-54)" data-paper-data="{&quot;isPaintingLayer&quot;:true}" fill-rule="nonzero" stroke="none" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" style="mix-blend-mode: normal">
                    <path d="M48.5,91.2c1.7,-9.8 14.6,-33.1 49.7,-33.5c35.1,-0.4 108,-3.4 115.8,-3.4c9,0 57.6,2.8 91.8,3c22.2,0.1 56.2,-3.5 74.1,-3.3c21,0.2 33.7,8 38.9,12.2c2.3,1.8 3,4.6 4.8,6.8c9.9,12.2 1.9,88.2 -1.4,88.4c-5.6,0.4 -8.9,-21.5 -9,-22.3c-0.5,1.2 0.1,2.4 -1.6,2.5c-7,0 -7.6,-13.8 -8.2,-18.2c-1.1,-7.8 -0.8,-15.7 -2,-23.4c-0.8,1.7 -8.2,0.5 -9.2,-4.5c-1,-5 -1.2,-9.8 -8.2,-13.6c-6.3,-3.5 -12.9,-0.2 -20.4,-3.2c-7.6,-3 -4.9,-8.5 -10.2,-8.9c-5.3,-0.5 -43.3,4.1 -46.3,4.1c-42.5,-0.4 -49.4,-6.5 -53,-6.5c-15.2,0 -121.9,2.8 -136.4,2.3c-24.2,-0.9 -32.9,5.9 -35.5,10.3c-3.8,6.3 -10.3,25.1 -15.3,21.5c-2.8,-2 -0.8,-6.5 -3.1,-9.8c-2,-2.9 -4.3,8.2 -4.7,11.5c-0.7,5.9 0.9,24.9 -3,25c-9.7,0.3 -7.6,-36.8 -7.6,-36.8z" fill="url(#color-1)" stroke-width="0.5"/>
                    <path d="M406.2,280.2l23.4,-67.1l-0.5,5.7l-15.5,46.2z" fill="#542c11" stroke-width="0"/>
                    <path d="M327,261.3l23.4,-67.1l79.2,18.9l-23.4,67.1z" fill="#804219" stroke-width="0"/>
                    <path d="M314.7,286.5l14.2,-39.1l87.6,13l-9.1,25.9z" fill="#ed2f2f" stroke-width="0"/>
                    <path d="M328.2,262.4c-0,-0 -0.1,-0 -0.1,-0.1c-0.6,0.2 -1.2,0.4 -1.9,0.4c-2.8,0 -5.2,-2.3 -5.2,-5.2c0,-0.4 0,-0.8 0.1,-1.2c-0,-0.2 -0,-0.5 0,-0.7c-0,-0 -0,-0.1 -0,-0.1c0,-1.2 0.4,-2.2 1,-3.1c2.9,-6.6 8.9,-7.7 17,-7.5c6.5,-3.8 18.4,-2.8 24.3,1.2c6.2,-1.5 13.2,-1.3 17.4,1.2c3.6,-0.2 7.3,0.1 10.3,0.5c3.1,-2.2 8.4,-1.1 12.3,0.4c3.5,-0.3 6.7,-0.3 8.5,0.2c0.4,0.1 0.8,0.3 1.2,0.5c5.3,1.3 11.7,7 7.2,12.2c-1.3,1.5 -4.2,2.7 -7.5,3.4c-3.3,4.5 -11.2,4.8 -17.1,2.4c-2.5,0.2 -5.6,0.1 -8.6,-0.5c-3.9,1.3 -10.8,0.6 -16.5,-1.4c-0.2,0 -0.3,0 -0.5,0c-1,0 -1.9,-0.3 -2.7,-0.8c-5.4,0.8 -12.2,-0.3 -16.7,-2.7c-1.8,0.2 -3.8,0.2 -5.7,-0.1c-4.9,2.7 -12,2.8 -16.8,0.9z" fill="url(#color-2)" stroke-width="0.5"/>
                </g>
                `
        },
        'deco-5': {
            label: 'サクラ',
            release_date: '2023-05-05',
            price: 12200000,
        },
        'deco-6': {
            label: '鯉のぼり',
            release_date: '2023-05-05',
            price: 12200000,
        },
        'deco-7': {
            label: 'クリアウェーブ',
            release_date: '2023-07-01',
            price: 12200000,
        },
        'deco-8': {
            label: 'ひまわり',
            release_date: '2023-07-01',
            price: 12200000,
        },
        'deco-9': {
            label: '提灯',
            release_date: '2023-07-01',
            price: 12200000,
        },
        'deco-10': {
            label: '花火',
            release_date: '2023-07-01',
            price: 12200000,
        },
    },
    color: {
        'color-0': {
            label: '',
            code: '#9494a6',
            release_date: '',
            price: 0,
        },
        'color-1': {
            label: 'スノーブルー',
            code: '#bbccde',
            release_date: '2023-02-09',
            price: 2800000,
        },
        'color-2': {
            label: 'サクラピンク',
            code: '#ffd0f6',
            release_date: '2023-02-09',
            price: 5400000,
        },
        'color-3': {
            label: 'ダークモード',
            code: '#2a2a39',
            release_date: '2023-02-09',
            price: 5400000,
        },
        'color-4': {
            label: 'ダークレインボー',
            code: '',
            release_date: '2023-02-09',
            price: 5400000,
        },
        'color-5': {
            label: 'ダークグリーン',
            code: '#275a29',
            release_date: '2023-02-12',
            price: 5400000,
        },
        'color-6': {
            label: 'グレープパープル',
            code: '#520e77',
            release_date: '2023-02-12',
            price: 5400000,
        },
        'color-7': {
            label: 'チョコレート',
            code: '#573316',
            release_date: '2023-02-12',
            price: 5400000,
        },
        'color-8': {
            label: 'アンバーイエロー',
            code: '#c29500',
            release_date: '2023-05-05',
            price: 5400000,
        },
        'color-9': {
            label: 'バンブーグリーン',
            code: '#56ab60',
            release_date: '2023-05-05',
            price: 5400000,
        },
        'color-10': {
            label: 'アイリススレート',
            code: '#94678e',
            release_date: '2023-05-05',
            price: 5400000,
        },
        'color-11': {
            label: 'ミッドナイトブルー',
            code: '#0f2746',
            release_date: '2023-05-05',
            price: 5400000,
        },
        'color-12': {
            label: 'ミントグリーン',
            code: '#93cc9f',
            release_date: '2023-07-01',
            price: 5400000,
        },
        'color-13': {
            label: 'ウォーターメロン',
            code: '#d63b5a',
            release_date: '2023-07-01',
            price: 5400000,
        },
        'color-14': {
            label: 'サンドブラウン',
            code: '#da9a6c',
            release_date: '2023-07-01',
            price: 5400000,
        },
        'color-15': {
            label: 'ナイトパープル',
            code: '#190922',
            release_date: '2023-07-01',
            price: 5400000,
        },
        'color-16': {
            label: 'アクアブルー',
            code: '#51c1c6',
            release_date: '2023-07-01',
            price: 5400000,
        },
        'color-17': {
            label: 'サマーイエロー',
            code: '#e5d36c',
            release_date: '2023-07-01',
            price: 5400000,
        },
        'color-18': {
            label: 'スペースブルー',
            code: '#002f38',
            release_date: '2023-07-01',
            price: 5400000,
        },
    },
};

export { shop_items };
