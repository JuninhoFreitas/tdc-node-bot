require("dotenv").config();
const messenger = require("./messenger");
const fetcher = require("./fetcher");
const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.TOKEN);

const ID_GROUP = "-580971624";
const LIST_SENT = [];
let interval = 60000;
let pesquisa = "teclado";
let percentage = 10;

bot.command("setPromo", async (ctx) => {
  const msg_params = ctx.update.message.text.split(" ");
  pesquisa = msg_params[1];
  enviarPromo();
});

async function enviarPromo() {
  const lista_produtos = await recebePromo();
  let i = 0;
  lista_produtos.every((produto) => {
    if (!LIST_SENT.includes(produto.id)) {
      bot.telegram.sendMessage(ID_GROUP, produto.texto);
      i++;
      LIST_SENT.push(produto.id);
    }
    if (i === 5) {
      i = 0;
      return false;
    }
    return true;
  });
  setTimeout(enviarPromo, interval);
}

async function recebePromo() {
  const fetched_list = await fetcher(pesquisa).then((data) => data);
  return await messenger(fetched_list, percentage).then((data) => data);
}

bot.launch().then(() => {
  console.log("Bot Iniciado!");
});
