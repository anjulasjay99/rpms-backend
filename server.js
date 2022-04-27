import Koa from "Koa";
import bodyParser from "koa-bodyparser";

const app = new Koa();

app.use(bodyParser());

app.use((ctx) => {
  ctx.body = "Kaputu Kak Kak Kak Basil Basil Basil ///";
});

app.listen(3000);
