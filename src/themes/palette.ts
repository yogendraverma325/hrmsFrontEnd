/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme:any) {
    return {
      mode: theme?.customization?.navType,
      common: {
        black: theme.colors?.darkPaper
      },
      background: {
        paper: theme.paper,
        default: theme.backgroundDefault
      }
    };
  }
  