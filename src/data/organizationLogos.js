const logoContext = require.context("../assets/images", false, /^\.\/org_\d+\.(png|jpe?g|webp|svg)$/i);

export const organizationLogos = logoContext.keys().reduce((logos, logoPath) => {
  const match = logoPath.match(/org_(\d+)/i);
  if (match) {
    logos[match[1]] = logoContext(logoPath);
  }

  return logos;
}, {});
