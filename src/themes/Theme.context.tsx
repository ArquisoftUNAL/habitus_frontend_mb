import React from 'react';

import {
    DARK_THEME_ID,
    DARK_THEME
} from './Dark.theme';

import {
    LIGHT_THEME_ID,
    LIGHT_THEME
} from './Light.theme';

import {
    Theme
} from './Theme.interface';

interface ProvidedTheme {
    theme: Theme,
    toggleTheme: () => void
};

const Context = React.createContext<ProvidedTheme>({
    theme: LIGHT_THEME,
    toggleTheme: () => {
        console.log('toggleTheme() not implemented');
    }
});

interface PropsWithChildren {
    initial: Theme,
    children?: React.ReactNode
};

export const ThemeProvider = React.memo<PropsWithChildren>((props) => {
    const [theme, setTheme] = React.useState<Theme>(props.initial);

    const ToggleThemeCallback = React.useCallback(() => {
        setTheme((currentTheme) => {
            if (currentTheme.id === DARK_THEME_ID) {
                return LIGHT_THEME;
            }
            if (currentTheme.id === LIGHT_THEME_ID) {
                return DARK_THEME;
            }
            return currentTheme;
        });
    }, []);

    const MemoizedValue = React.useMemo(() => {
        const value: ProvidedTheme = {
            theme,
            toggleTheme: ToggleThemeCallback
        };

        return value;
    }, [theme, ToggleThemeCallback]);

    return (
        <Context.Provider value={MemoizedValue}>
            {props.children}
        </Context.Provider>
    )
});

export const useTheme = () => React.useContext(Context);