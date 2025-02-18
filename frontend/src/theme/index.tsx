import { createTheme } from '@mui/material/styles';
import '../style.css';

declare module '@mui/material/styles' {
    interface PaletteColor {
        50: string;
        100: string;
        300: string;
        400: string;
        500: string;
        700: string;
    }

    interface CustomPalette {
        accentColors: {
            blue: string;
            lightBlue: string;
            green: string;
            lightGreen: string;
            yellowEmphasis: string;
            lightYellowEmphasis: string;
            lightRed: string;
            red: string;
            orange: string;
            lightOrange: string;
            brown: string;
            lightBrown: string;
            orangeYellow: string;
        };
        structuralColors: {
            white: string;
            stroke1: string;
            stroke2: string;
            lightGray: string;
            gray: string;
            blackgray: string;
            boxShadow: string;
            shadow: string;
            black: string;
        };
    }

    interface Palette extends CustomPalette {
        accentColors: {
            blue: string;
            lightBlue: string;
            green: string;
            lightGreen: string;
            yellowEmphasis: string;
            lightYellowEmphasis: string;
            lightRed: string;
            red: string;
            orange: string;
            lightOrange: string;
            brown: string;
            lightBrown: string;
            orangeYellow: string;
        };
        structuralColors: {
            white: string;
            stroke1: string;
            stroke2: string;
            lightGray: string;
            gray: string;
            blackgray: string;
            boxShadow: string;
            shadow: string;
            black: string;
        };
    }

    interface PaletteOptions extends CustomPalette {
        accentColors: {
            blue: string;
            lightBlue: string;
            green: string;
            lightGreen: string;
            yellowEmphasis: string;
            lightYellowEmphasis: string;
            lightRed: string;
            red: string;
            orange: string;
            lightOrange: string;
            brown: string;
            lightBrown: string;
            orangeYellow: string;
        };
        structuralColors: {
            white: string;
            stroke1: string;
            stroke2: string;
            lightGray: string;
            gray: string;
            blackgray: string;
            boxShadow: string;
            shadow: string;
            black: string;
        };
    }

    interface TypeText {
        lowEmphasis: string;
        mediumEmphasis: string;
        highEmphasis: string;
    }
    interface TypographyVariants {
        h1: TypographyStyle;
        h2: TypographyStyle;
        h3: TypographyStyle;
        subtitle1: TypographyStyle;
        body1: TypographyStyle;
        body2: TypographyStyle;
        caption1: TypographyStyle;
        caption2: TypographyStyle;
    }

    interface TypographyVariantsOptions {
        h1?: TypographyStyle;
        h2?: TypographyStyle;
        h3?: TypographyStyle;
        subtitle1?: TypographyStyle;
        body1?: TypographyStyle;
        body2?: TypographyStyle;
        caption1?: TypographyStyle;
        caption2?: TypographyStyle;
    }
}
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        h1: true;
        h2: true;
        h3: true;
        subtitle1: true;
        body1: true;
        body2: true;
        caption1: true;
        caption2: true;
    }
}
interface TypographyStyle {
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
}
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 601,
            md: 1081,
            lg: 1441,
            xl: 1920,
        },
    },
    spacing: [0, 2, 4, 6, 8, 10, 12],
    palette: {
        primary: {
            50: '#FAFAFC',
            100: '#F7F8FA',
            300: '#F8F8FF',
            400: '#D9A6D0',
            500: '#9F2089',
            700: '#570D48',
        },
        text: {
            lowEmphasis: '#8B8BA3',
            mediumEmphasis: '#616173',
            highEmphasis: '#353543',
        },
        accentColors: {
            blue: '#3E5FE2',
            lightBlue: '#F2F4FC',
            green: '#17A076',
            lightGreen: '#F2FCFB',
            yellowEmphasis: '#A08817',
            lightYellowEmphasis: '#FAF8EB',
            red: '#E53935',
            lightRed: '#FFEBEE',
            orange: '#FFA500',
            lightOrange: '#F5E8DF',
            brown: '#8B4513',
            lightBrown: '#D2B48C',
            orangeYellow: '#ff9a03',
        },
        structuralColors: {
            white: '#FFFFFF',
            stroke1: '#EAEAF3',
            stroke2: '#F0F0F0',
            lightGray: '#CECEDE',
            gray: '#666666',
            blackgray: '#353543',
            boxShadow: '#0000001A',
            shadow: '#2d2d2f1a',
            black: '#0A0B0D',
        },
    },
    typography: {
        fontFamily: 'Mier-Book',
        h1: {
            fontFamily: 'Mier-Book',
            fontSize: '2rem',
            fontWeight: '500',
            lineHeight: '2.295rem',
        },
        h2: {
            fontFamily: 'Mier-Book',
            fontSize: '1.5rem',
            fontWeight: '500',
            lineHeight: '2.275rem',
        },
        h3: {
            fontFamily: 'Mier-Book',
            fontSize: '1.36rem',
            fontWeight: '500',
            lineHeight: '2.12rem',
        },
        subtitle1: {
            fontFamily: 'Mier-Book',
            fontSize: '1.2rem',
            fontWeight: '500',
            lineHeight: '1.82rem',
        },
        body1: {
            fontFamily: 'Mier-Book',
            fontSize: '1.06rem',
            fontWeight: '500',
            lineHeight: '1.51rem',
        },
        body2: {
            fontFamily: 'Mier-Book',
            fontSize: '1rem',
            fontWeight: '300',
            lineHeight: '1.51rem',
        },
        caption1: {
            fontFamily: 'Mier-Book',
            fontSize: '0.91rem',
            fontWeight: '500',
            lineHeight: '1.36rem',
        },
        caption2: {
            fontFamily: 'Mier-Book',
            fontSize: '0.91rem',
            fontWeight: '400',
            lineHeight: '1.36rem',
        },
    },
});

export default theme;
