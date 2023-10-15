export interface ColorTheme {
    primary: string;
    secondary: string;
    tertiary: string;
    background: string;
}

export interface SpacingTheme {
    small: number;
    smallMedium: number;
    medium: number;
    large: number;
    extraLarge: number;
}

export interface FontSizeTheme {
    small: number;
    smallMedium: number;
    medium: number;
    mediumLarge: number;
    large: number;
}

export interface ImageTheme {
    logout: any;
    toggleTheme: any;
}

export interface Theme {
    id: string;
    colors: ColorTheme;
    spacing: SpacingTheme;
    fontSizes: FontSizeTheme;
    images: ImageTheme;
}