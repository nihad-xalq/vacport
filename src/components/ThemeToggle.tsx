"use client";

import { FC } from 'react';

const ThemeToggle: FC = () => {
    return (
        <div className="flex items-center">
            <button className="flex items-center gap-1 bg-gray-100 border rounded-lg px-3 py-2">
                <span className="text-lg">🌞</span>
                <span className="text-lg">🌙</span>
            </button>
        </div>
    );
};

export default ThemeToggle; 