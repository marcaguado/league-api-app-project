import { configure, renderFile } from "https://deno.land/x/eta@v1.12.3/mod.ts";

configure({
  views: `${Deno.cwd()}/views/`,
});

const render = async (context, next) => {
  context.render = async (file, data) => {
    if (!data) {
      data = {};
    }

    if (context.user) {
      data.user = context.user;
    }

    context.response.headers.set("Content-Type", "text/html; charset=utf-8");
    context.response.body = await renderFile(file, data);
  };

  await next();
};

export default render;