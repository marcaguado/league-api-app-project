import { Application, Router, send } from "https://deno.land/x/oak@v9.0.1/mod.ts";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import renderMiddleware from "./middlewares/renderMiddleware.js";

const app = new Application();
const router = new Router();

app.use(errorMiddleware);
app.use(renderMiddleware);

const showContent = ({render}) => {
    render("main.eta");
};

const postContent = async ({render, request, response}) => {
    const body = request.body({ type: "form" });
    const params = await body.value;
    const riotAPIKey = "";
    const user = params.get("user");
    const server = params.get("server");
    const link = `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${user}?api_key=${riotAPIKey}`;
    const APIRequest = await fetch(link);
    let data = await APIRequest.json();
    render("main.eta", { username: data.name, level: data.summonerLevel, iconId: data.profileIconId});
};

router.get("/", showContent);
router.post("/", postContent);

app.use(router.routes());
app.listen({ port: 7777 });