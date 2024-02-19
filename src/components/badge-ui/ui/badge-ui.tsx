import React from 'react';
import '../css/badge.css';

const Badge = ({ mode, children }: { mode: string, children: React.ReactNode }) => {
    const badgeAllClass = `select-none pointer-events-none text-xs font-medium me-2 px-2.5 py-0.5 rounded-full`;
    const bageDefault = `bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`;
    const bageDark = `bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300`;
    const bageRed = `bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300`;
    const bageGreen = `bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
    const bageYellow = `bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300`;
    const bageIndigo = `bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300`;
    const bagePurple = `bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300`;
    const bagePink = `bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300`;

    var badgeClass = `${badgeAllClass} ${bageDefault}`;

    if (mode) {
        if (mode === `Dark` || mode === `dark`) {
            badgeClass = `${badgeAllClass} ${bageDark}`;
        }
        if (mode === `Blue` || mode === `blue`) {
            badgeClass = `${badgeAllClass} ${bageDefault}`;
        }
        if (mode === `Red` || mode === `red`) {
            badgeClass = `${badgeAllClass} ${bageRed}`;
        }
        if (mode === `Green` || mode === `green`) {
            badgeClass = `${badgeAllClass} ${bageGreen}`;
        }
        if (mode === `Yellow` || mode === `yellow`) {
            badgeClass = `${badgeAllClass} ${bageYellow}`;
        }
        if (mode === `Indigo` || mode === `indigo`) {
            badgeClass = `${badgeAllClass} ${bageIndigo}`;
        }
        if (mode === `Purple` || mode === `purple`) {
            badgeClass = `${badgeAllClass} ${bagePurple}`;
        }
        if (mode === `Pink` || mode === `pink`) {
            badgeClass = `${badgeAllClass} ${bagePink}`;
        }
    }
    return (
        <span className={badgeClass}>
            {children}
        </span>
    );
};

export default Badge;
