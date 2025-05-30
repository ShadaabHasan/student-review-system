// This helps prevent layout shifts by providing font fallback metrics
export const fontFallbackStyles = `
  @font-face {
    font-family: 'Inter Fallback';
    src: local("Arial");
    ascent-override: 90%;
    descent-override: 22%;
    line-gap-override: 0%;
    size-adjust: 107%;
  }
`
