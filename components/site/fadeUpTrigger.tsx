'use client'

import React, { useEffect } from 'react';

export const FadeUpTrigger = (val_offsetTop: number = 0) => {
    useEffect(() => {
        const fadeAnime = () => {
            document.querySelectorAll('.fadeUpTrigger').forEach(function (element) {
                (element as HTMLElement).classList.remove('fadeUpTrigger');
                (element as HTMLElement).classList.add('fadeUpTriggerSet');
            });
            document.querySelectorAll('.fadeUpTriggerSet').forEach(function (element) {
                const elemPos = (element as HTMLElement).offsetTop + val_offsetTop;
                const scroll = window.scrollY
                const windowHeight = window.innerHeight;
        
                if (scroll >= elemPos - windowHeight) {
                    (element as HTMLElement).classList.add('fadeUpAni');
                    (element as HTMLElement).classList.remove('fadeOut');
                }else{
                    (element as HTMLElement).classList.remove('fadeUpAni');
                    (element as HTMLElement).classList.add('fadeOut');
                }
            });
        };
    
        // 画面をスクロールをしたら動かしたい場合の記述
        window.addEventListener('scroll', fadeAnime);
    
        // 画面が読み込まれたらすぐに動かしたい場合の記述
        window.addEventListener('load', fadeAnime);
    
        return () => {
            // Cleanup the event listeners when the component unmounts
            window.removeEventListener('scroll', fadeAnime);
            window.removeEventListener('load', fadeAnime);
        };
    }, [val_offsetTop]);
}