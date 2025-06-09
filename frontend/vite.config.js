/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from '@vitejs/plugin-react-swc'
import viteCompression from "vite-plugin-compression";
import viteImagemin from "vite-plugin-imagemin";
import svgr from "vite-plugin-svgr";
import path from "path";
import pkg from "./package.json";

const resolvePath = (dir) => path.resolve(__dirname, dir);
const deps = Object.keys(pkg.dependencies);
const pkgName = pkg.name;
const pkgVersion = pkg.version;

export default defineConfig(({ mode }) => {

  const isProd = mode === 'production';
  
  return {
    define: {
      global: "window",
      __APP_VERSION__: JSON.stringify(pkgVersion),
      __APP_NAME__: JSON.stringify(pkgName),
      'process.env.NODE_ENV': JSON.stringify(mode),
    },
    cacheDir: "node_modules/.vite_cache",
    build: {
      target: "esnext",
      modulePreload :{
        polyfill: false,  
      },
      outDir: "dist",
      cssCodeSplit: true,
      manifest: true,
      reportCompressedSize: true,
      emptyOutDir: true,
      chunkSizeWarningLimit: 10000, // 10MB
      rollupOptions: {
        external: ['fsevents'],
        output: {
          // Simplify the chunking strategy to avoid React runtime errors
          manualChunks: {
            // Group all React-related packages together to prevent scheduler issues
            framework: [
              'react', 
              'react-dom', 
              'react-router-dom',
              'scheduler',
              'react-is',
              'prop-types'
            ],

          },
          // Optimize chunk filenames for better caching
          chunkFileNames: isProd ? 'assets/[name].[hash].js' : 'assets/[name].js',
          entryFileNames: isProd ? 'assets/[name].[hash].js' : 'assets/[name].js',
          assetFileNames: isProd ? 'assets/[name].[hash].[ext]' : 'assets/[name].[ext]',
        },
      },
      // Enable minification in production with esbuild (built into Vite)
      minify: isProd ? 'esbuild' : false,
      esbuildOptions: isProd ? {
        drop: ['console', 'debugger'],
      } : undefined,
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
            ],
          },
        },
      }),
      // Only use compression in production
      isProd && viteCompression({
        algorithm: "brotliCompress",
        ext: ".br",
        threshold: 1024,
        deleteOriginFile: false,
      }),
      // Only use imagemin in production
      isProd && viteImagemin({
        gifsicle: { optimizationLevel: 3 },
        optipng: { optimizationLevel: 7 },
        mozjpeg: { quality: 75 }, // Reduced quality for better compression
        pngquant: { quality: [0.7, 0.8], speed: 4 }, // Added pngquant for better PNG compression
        svgo: {
          plugins: [
            { name: "removeViewBox", active: false }, // Don't remove viewBox for better SVG scaling
            { name: "removeEmptyAttrs", active: true },
            { name: "cleanupAttrs", active: true },
            { name: "removeDoctype", active: true },
            { name: "removeXMLProcInst", active: true },
            { name: "removeComments", active: true },
            { name: "removeMetadata", active: true },
            { name: "removeTitle", active: true },
            { name: "removeDesc", active: true },
            { name: "removeUselessDefs", active: true },
            { name: "removeEditorsNSData", active: true },
            { name: "removeEmptyContainers", active: true },
            { name: "minifyStyles", active: true },
            { name: "convertStyleToAttrs", active: true },
            { name: "convertColors", active: true },
            { name: "convertPathData", active: true },
            { name: "convertTransform", active: true },
            { name: "removeUnknownsAndDefaults", active: true },
            { name: "removeNonInheritableGroupAttrs", active: true },
            { name: "removeUselessStrokeAndFill", active: true },
            { name: "removeUnusedNS", active: true },
            { name: "cleanupIDs", active: true },
            { name: "cleanupNumericValues", active: true },
            { name: "moveElemsAttrsToGroup", active: true },
            { name: "moveGroupAttrsToElems", active: true },
            { name: "collapseGroups", active: true },
            { name: "mergePaths", active: true },
            { name: "convertShapeToPath", active: true },
            { name: "sortAttrs", active: true },
            { name: "removeDimensions", active: true },
          ],
        },
      }),
    ].filter(Boolean), // Filter out falsy plugin values
    resolve: {
      alias: {
        "@": resolvePath("src"),
        "@Src": resolvePath("src"),
        "@Assets": resolvePath("src/assets"),
        "@Components": resolvePath("src/components"),
        "@Layout": resolvePath("src/layout"),
        "@Locales": resolvePath("src/locales"),
        "@Pages": resolvePath("src/pages"),
        "@Public": resolvePath("/"),
        "@Router": resolvePath("src/router"),
        "@Lib": resolvePath("src/lib"),
        "@Context": resolvePath("src/context"),
      },
      extensions: [
        ".js", ".jsx", ".json", ".ts", ".tsx", ".css",
        ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".avif", // Added more image formats
        ".md", ".env", ".html"
      ],
    },
    optimizeDeps: {
      include: deps,
    },
    // Add server configuration for better development experience
    server: {
      port: 3000,
      open: true,
      cors: true,
      hmr: {
        overlay: true,
      },
    },
    // Add preview configuration for testing production builds locally
    preview: {
      port: 4173,
      open: true,
      cors: true,
    },
    // Add specific Vercel optimizations
    ssr: {
      noExternal: ['@emotion/*'],
    },
  };
});
