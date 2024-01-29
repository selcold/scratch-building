'use client'

import React, { useEffect } from 'react';

export const FadeUpTrigger = () => {
    useEffect(() => {
        if(typeof window !== 'undefined'){
            const fadeAnime = () => {
            // ふわっ
            document.querySelectorAll('.fadeUpTrigger').forEach(function (element) {
                var elemPos = (element as HTMLElement).offsetTop + 200;
                var scroll = window.scrollY || window.pageYOffset;
                var windowHeight = window.innerHeight;
            
                if (scroll >= elemPos - windowHeight) {
                (element as HTMLElement).classList.add('fadeUpAni');
                }
            });
            };
            // 画面をスクロールをしたら動かしたい場合の記述
            window.addEventListener('scroll', function () {
                fadeAnime(); /* アニメーション用の関数を呼ぶ*/
            });
            // 画面が読み込まれたらすぐに動かしたい場合の記述
            window.addEventListener('load', function () {
                fadeAnime(); /* アニメーション用の関数を呼ぶ*/
            });
        };
    }, []);
};