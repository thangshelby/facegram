import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [
    react(
      // {
      //  jsxRuntime: "classic",
      //  include: ["**/*.json", "**/*.less","**/*.ts","**/*.tsx"], // it's unnecessary and cause the page full-reload
      // }
    ),
  ],
  server: {
    host: true,
    port: 5173, // This is the port which we will use in docker
    // Thanks @sergiomoura for the window fix
    // add the next lines if you're using windows and hot reload doesn't work
    hmr: { overlay: false },
    watch: {
      usePolling: true,
    },
  },
});


// export default defineConfig(({ command, mode, ssrBuild }) => {
//   return {
//     optimizeDeps: {
//       include: ['react', 'react-dom'],
//     },
//     plugins: [
//       react({
//         babel: {
//           plugins: [
//             ['@babel/plugin-proposal-decorators', { legacy: true }],
//             ['@babel/plugin-proposal-class-properties', { loose: true }],
//             [
//               '@babel/plugin-transform-runtime',
//               {
//                 helpers: true,
//                 regenerator: true,
//               },
//             ],
//           ],
//         },
//       }),
//       wasm(),
//       topLevelAwait(),

//       // fix: requirer is not defined
//       viteRequire(),
//       pluginRewriteAll(),
//       // svgr options: https://react-svgr.com/docs/options/
//       svgr({ svgrOptions: { icon: true } }),
//     ],
//     server: {
//       open: true,
//     },
//     build: {
//       sourcemap: true,
//     },
//     css: {
//       preprocessorOptions: {
//         less: {
//           math: 'always',
//           relativeUrls: true,
//           javascriptEnabled: true,
//         },
//       },
//     },
//   };
// });