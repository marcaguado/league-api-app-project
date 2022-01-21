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
    const summonerInfoLink = `https://${server}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${user}?api_key=${riotAPIKey}`;
    const summonerInfoAPIRequest = await fetch(summonerInfoLink);
    let summonerInfoData = await summonerInfoAPIRequest.json();
    //console.log(summonerInfoData.id);
    const summonerStatsLink = `https://${server}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerInfoData.id}?api_key=${riotAPIKey}`;
    const summonerStatsAPIRequest = await fetch(summonerStatsLink);
    //console.log(summonerStatsAPIRequest);
    let summonerStatsData = await summonerStatsAPIRequest.json();
    //console.log(summonerStatsData);

    if(summonerStatsData != 0) {
        summonerStatsData = summonerStatsData[0];
    }
    
    render("main.eta", { username: summonerInfoData.name, 
        level: summonerInfoData.summonerLevel, 
        iconId: summonerInfoData.profileIconId,
        tier: summonerStatsData.tier,
        rank: summonerStatsData.rank,
        points: summonerStatsData.leaguePoints,
        wins: summonerStatsData.wins,
        losses: summonerStatsData.losses,
        ratio: Math.round((summonerStatsData.wins / (summonerStatsData.losses + summonerStatsData.wins)) * 100) ,
    });
};

router.get("/", showContent);
router.post("/", postContent);

app.use(router.routes());
app.listen({ port: 7777 });