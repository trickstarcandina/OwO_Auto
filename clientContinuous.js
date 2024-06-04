const data = require("./info.json");
const { scheduleJob, Job, RecurrenceRule } = require("node-schedule");
const { Client } = require("discord.js-selfbot-v13");
require("dotenv").config({ path: "./.env" });

// create Client
const client = new Client({
  checkUpdate: false,
});
// env
const channel = process.env.CHANNEL;
const owner = process.env.OWNER;
const token = process.env.TOKEN;

// Recurrence
const huntBattleRule = new RecurrenceRule();
huntBattleRule.second = [12, 43];
const owoRule = new RecurrenceRule();
owoRule.second = [0, 29];
/**
 * @type { Job }
 */
let huntJob;
let owoJob;

client.on("ready", async () => {
  console.log(`Quẩy lên! ${client.user.username}`);

  if (!data.disable.hunt || !data.disable.battle)
    huntJob = scheduleJob(huntBattleRule, () => {
      setTimeout(() => {
        if (!data.disable.hunt) client.channels.cache.get(channel).send("owoh");
      }, getRandomInt(5000));
      setTimeout(() => {
        if (!data.disable.battle)
          client.channels.cache.get(channel).send("owob");
      }, getRandomInt(5000));
    });

  owoJob = scheduleJob(owoRule, () => {
    if (!data.disable.owo) client.channels.cache.get(channel).send("owo");
  });
});

client.on("messageCreate", async (message) => {
  // check captcha
  if (message.channel.id !== channel && message.channel.type !== "dm") return;
  if (message.author.id !== "408785106942164992") return;
  if (
    [
      "Beep Boop. A",
      "real human?",
      "can check!",
      "Please DM me",
      "Wrong verification",
      " Please complete your captcha",
      "solving the captcha",
      "http://verify.owobot.com/",
      " Please use the link ",
    ].some((phrase) =>
      message.content.toLowerCase().includes(phrase.toLowerCase())
    )
  ) {
    huntJob.cancel();
    owoJob.cancel();
    if (client.user.id === owner) return;
    client.users.cache.get(owner).send(message.content);
    if (!!message.attachments.size)
      client.users.cache.get(owner).send(message.attachments.first());
  }
  if (message.content.includes("Thank you! :3")) {
    huntJob.reschedule(huntBattleRule);
    owoJob.reschedule(owoRule);
    if (client.user.id === owner) return;
    client.users.cache.get(owner).send(message.content);
  }
});

//spent 5 <:cowoncy:416043450337853441> and caught an
client.on("messageCreate", async (message) => {
  if (message.channel.id !== channel && message.channel.type !== "dm") return;
  if (message.author.id !== "408785106942164992") return;
  if (
    ["spent 5", "and caught an"].some((phrase) =>
      message.content.toLowerCase().includes(phrase.toLowerCase())
    )
  ) {
    //stop
    huntJob.cancel();
    owoJob.cancel();

    let randomGem = getRandomInt(data.inv.length);
    setTimeout(() => {
      client.channels.cache
        .get(channel)
        .send(
          "owouse " +
          data.inv[randomGem].toString() +
          " " +
          (data.inv[randomGem] + 14).toString() +
          " " +
          (data.inv[randomGem] + 21).toString()
        );
    }, 1686);

    //cont
    huntJob.reschedule(huntBattleRule);
    owoJob.reschedule(owoRule);
  }
});

client.on("messageCreate", async (message) => {
  if (
    message.author.id === owner &&
    message.channel.type === "dm" &&
    message.content.length === 5
  ) {
    client.users.cache.get("408785106942164992").send(message.content);
  }
  if (message.channel.id === channel && message.author.id === owner) {
    if (message.content.toLowerCase() === "spy!stop") {
      huntJob.cancel();
      owoJob.cancel();
    }
    if (message.content.toLowerCase() === "spy!cont") {
      huntJob.reschedule(huntBattleRule);
      owoJob.reschedule(owoRule);
    }
  }
});

client.login(token);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
