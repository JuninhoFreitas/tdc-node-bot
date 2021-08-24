require("dotenv").config();
const messenger = require("./messenger");
const fetcher = require("./fetcher");

const { Telegraf } = require("telegraf");
const bot = new Telegraf(process.env.TOKEN);

const ID_CHAT = "-580971624";
const LIST_SENT = [];

let interval = 10000;
let pesquisa = "teclado";

bot.command("startBot", (ctx) => {
  const msg_params = ctx.update.message.text.split(" ");
  pesquisa = msg_params[1];
  send_message();
});

async function send_message() {
  const listaProdutos = await realizar_fetch();
  let i = 0;
  listaProdutos.every((produto) => {
    if (!LIST_SENT.includes(produto.id)) {
      bot.telegram.sendMessage(ID_CHAT, produto.texto);
      i++;
      LIST_SENT.push(produto.id);
    }
    if (i === 5) {
      i = 0;
      return false;
    }
    return true;
  });

  setTimeout(send_message, interval);
}

async function realizar_fetch() {
  const fetched_list = await fetcher(pesquisa).then((data) => data);
  return await messenger(fetched_list).then((data) => data);
}

bot.launch().then(() => {
  console.log("Bot Iniciado!");
});
