import { defineConfig, type Plugin, type HtmlTagDescriptor } from 'vite'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    tailwindcss(),
    injectCssAsStyleTag(),
  ],
})

function escapeRegex(string: string) {
  return string.replace(/[/\-\\^$*+?.()|[\]{}]/g, '\\$&');
}

function injectCssAsStyleTag(): Plugin {
  return {
    name: 'inject-css-as-style-tags',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler: (html, ctx) => {
        const tags: HtmlTagDescriptor[] = [];
        const bundle = ctx.bundle;
        if (bundle == null) {
          return [];
        }

        Object.values(bundle)
          .filter((output) => output.fileName.endsWith('.css'))
          .forEach((output) => {
            if (output.type === 'asset' && typeof output.source === 'string') {
              tags.push({
                tag: 'style',
                children: output.source,
                injectTo: 'head',
              });
              const fileNameRegExp = RegExp(
                `<link.*href=".*${escapeRegex(output.fileName)}".*\\/?>`,
                'gmi',
              );
              html = html.replaceAll(fileNameRegExp, '');
            }
          });

        return { html, tags };
      },
    },
  };
}
