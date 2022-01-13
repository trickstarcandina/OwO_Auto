const Discord = require("discord.js-selfbot");
const data = require("./info.json");
const { scheduleJob, Job, RecurrenceRule } = require("node-schedule");
const client = new Discord.Client();
let channel = data.channel;
let owner = data.owner;
const huntBattleRule = new RecurrenceRule();
huntBattleRule.second = [0, 36];
const buyRule = new RecurrenceRule();
buyRule.second = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
const owoRule = new RecurrenceRule();
owoRule.second = [0, 29, 52];
/**
 * @type { Job }
 */
let huntJob;
let buyJob;
let owoJob;

client.on("ready", () => {
  console.log("Quẩy lên!");

  if (!data.disable.hunt || !data.disable.battle)
    huntJob = scheduleJob(huntBattleRule, () => {
      setTimeout(() => {
        if (!data.disable.hunt) client.channels.cache.get(channel).send("owoh");
      }, getRandomInt(1200));
      setTimeout(() => {
        if (!data.disable.battle)
          client.channels.cache.get(channel).send("owob");
      }, getRandomInt(1200));
    });

  buyJob = scheduleJob(buyRule, () => {
    if (!data.disable.buy) client.channels.cache.get(channel).send("owobuy 1");
  });
  owoJob = scheduleJob(owoRule, () => {
    if (!data.disable.owo) client.channels.cache.get(channel).send("owo");
  });
});

client.on("message", (message) => {
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
    buyJob.cancel();
    huntJob.cancel();
    owoJob.cancel();
    if (client.user.id === owner) return;
    client.users.cache.get(owner).send(message.content);
    if (!!message.attachments.size)
      client.users.cache.get(owner).send(message.attachments.first());
  }
  if (message.content.includes("Thank you! :3")) {
    buyJob.reschedule(buyRule);
    huntJob.reschedule(huntBattleRule);
    owoJob.reschedule(owoRule);
    if (client.user.id === owner) return;
    client.users.cache.get(owner).send(message.content);
  }
});

//spent 5 <:cowoncy:416043450337853441> and caught an
client.on("message", (message) => {
  if (message.channel.id !== channel && message.channel.type !== "dm") return;
  if (message.author.id !== "408785106942164992") return;
  if (
    ["spent 5", "and caught an"].some((phrase) =>
      message.content.toLowerCase().includes(phrase.toLowerCase())
    )
  ) {
    //stop
    huntJob.cancel();
    buyJob.cancel();
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
    // setTimeout(() => {
    //     client.channels.cache.get(channel).send("owouse " + (data.inv[randomGem] + 14).toString())
    // }, 16666)
    // setTimeout(() => {
    //     client.channels.cache.get(channel).send("owouse " + (data.inv[randomGem] + 21).toString())
    // }, 28666)

    //cont
    buyJob.reschedule(buyRule);
    huntJob.reschedule(huntBattleRule);
    owoJob.reschedule(owoRule);
  }
});

client.on("message", (message) => {
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
      buyJob.cancel();
      owoJob.cancel();
    }
    if (message.content.toLowerCase() === "spy!cont") {
      buyJob.reschedule(buyRule);
      huntJob.reschedule(huntBattleRule);
      owoJob.reschedule(owoRule);
    }
  }
});

client.login(data.token);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
