import {
    ColorTheme, SpacingTheme, Theme
} from './Theme.interface';

const DARK_COLOR_THEME: ColorTheme = {
    primary: '#FFFFFF',
    secondary: '#D8E0FA',
    tertiary: '#F6F6A4',
    background: '#002B99'
}

const DARK_SPACING_THEME: SpacingTheme = {
    small: 5,
    smallMedium: 15,
    medium: 20,
    large: 40,
    extraLarge: 60
}

const DARK_FONT_SIZE_THEME = {
    small: 15,
    medium: 20,
    mediumLarge: 30,
    large: 45
}

const DARK_IMAGE_THEME = {
    logout: require("./../assets/images/ExitDark.png"),
    toggleTheme: require("./../assets/images/ToggleThemeDark.png")
}

export const DARK_THEME_ID = 'dark';

export const DARK_THEME: Theme = {
    id: DARK_THEME_ID,
    colors: DARK_COLOR_THEME,
    spacing: DARK_SPACING_THEME,
    fontSizes: DARK_FONT_SIZE_THEME,
    images: DARK_IMAGE_THEME
}