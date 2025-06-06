import { Helmet } from "react-helmet";
import { personalInfo, seoData } from "./data/SEO/data";

export default function SEO({ title, AppLogo }) {
  const currentYear = new Date().getFullYear();

  const metaTags = [
    // Basic Meta
    { name: "description", content: seoData.description },
    { name: "keywords", content: seoData.keywords },
    { name: "author", content: personalInfo.devName },
    { name: "news_keywords", content: seoData.keywords },

    // Cache & Security
    { httpEquiv: "Pragma", content: "no-cache" },
    { httpEquiv: "Cache-Control", content: "no-cache" },
    { httpEquiv: "imagetoolbar", content: "no" },
    { httpEquiv: "x-dns-prefetch-control", content: "off" },

    // Viewport & Charset
    { charSet: "UTF-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { name: "language", content: "en" },
    { name: "revisit-after", content: "7 days" },
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { name: "bingbot", content: "index, follow" },

    // Ownership
    { name: "copyright", content: `© ${currentYear} ${personalInfo.devName}` },
    { name: "owner", content: personalInfo.devName },
    { name: "reply-to", content: personalInfo.email },
    { name: "subject", content: `${personalInfo.role} Portfolio` },
    { name: "category", content: "Business" },
    { name: "topic", content: "Portfolio" },
    { name: "rating", content: "General" },
    { name: "coverage", content: "Worldwide" },
    { name: "distribution", content: "Global" },

    // Security & Performance
    { httpEquiv: "X-XSS-Protection", content: "1; mode=block" },
    { httpEquiv: "X-Content-Type-Options", content: "nosniff" },
    { httpEquiv: "Content-Type", content: "text/html; charset=UTF-8" },
    { name: "referrer", content: "no-referrer-when-downgrade" },

    // App & Theme
    { name: "theme-color", content: "#7002EE" },
    { name: "msapplication-TileColor", content: "#7002EE" },
    { name: "mobile-web-app-capable", content: "yes" },
    { name: "mobile-web-app-status-bar-style", content: "black-translucent" },

    // Open Graph
    { property: "og:title", content: title },
    { property: "og:description", content: seoData.description },
    { property: "og:type", content: "website" },
    { property: "og:site_name", content: title },
    { property: "og:url", content: seoData.url },
    { property: "og:image", content: AppLogo },
    { property: "og:image:type", content: "image/png" },
    { property: "og:image:width", content: "512" },
    { property: "og:image:height", content: "512" },
    { property: "og:locale", content: "en_US" },
    { name: "application-name", content: title },
    { name: "og:email", content: personalInfo.email },
    { name: "og:phone_number", content: personalInfo.phone },
  ];

  const iconSizes = ["16x16", "32x32", "48x48", "192x192"];

  return (
    <Helmet>
      <title>{title}</title>

      {metaTags.map((meta, idx) => (
        <meta key={idx} {...meta} />
      ))}

      <link rel="canonical" href={seoData.url} />

      {iconSizes.map((size) => (
        <link key={size} rel="icon" sizes={size} href={AppLogo} />
      ))}

      <link rel="apple-touch-icon" href={AppLogo} />
      <meta name="msapplication-TileImage" content={AppLogo} />
      <link rel="mask-icon" href={AppLogo} color="white" />
      <link rel="icon" href={AppLogo} />
    </Helmet>
  );
}
