import {
    ColorTheme, SpacingTheme, Theme
} from './Theme.interface';

import { Image } from 'react-native';

const LIGHT_COLOR_THEME: ColorTheme = {
    primary: '#002B99',
    secondary: '#D8E0FA',
    tertiary: '#F6F6A4',
    background: '#FFFFFF'
}

const LIGHT_SPACING_THEME: SpacingTheme = {
    small: 5,
    smallMedium: 15,
    medium: 20,
    large: 40,
    extraLarge: 60
}

const LIGHT_FONT_SIZE_THEME = {
    small: 15,
    medium: 20,
    mediumLarge: 30,
    large: 60
}

const LIGHT_IMAGE_THEME = {
    logout: require("./../assets/images/ExitLight.png"),
    toggleTheme: require("./../assets/images/ToggleThemeLight.png")
}

export const LIGHT_THEME_ID = 'light';

export const LIGHT_THEME: Theme = {
    id: LIGHT_THEME_ID,
    colors: LIGHT_COLOR_THEME,
    spacing: LIGHT_SPACING_THEME,
    fontSizes: LIGHT_FONT_SIZE_THEME,
    images: LIGHT_IMAGE_THEME
}