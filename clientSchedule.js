const { scheduleJob, Job, RecurrenceRule } = require("node-schedule");
const data = require("./info.json");

exports.runClientSchedule = (channel, owner, token, client) => {
  try {
    const huntBattleRule = new RecurrenceRule();
    huntBattleRule.second = [0, 32];
    const owoRule = new RecurrenceRule();
    owoRule.second = [42];

    const wakeUpRule = new RecurrenceRule();
    wakeUpRule.hour = [1, 4, 7, 10, 12, 15];
    wakeUpRule.minute = [12];
    wakeUpRule.second = [0];
    /**
     * @type { Job }
     */
    let huntJob;
    let owoJob;
    let wakeUpJob;

    client.on("ready", async () => {
      console.log(`Quẩy lên! ${client.user.username}`);
      huntJob = scheduleJob(huntBattleRule, () => {
        setTimeout(() => {
          client.channels.cache.get(channel).send("owoh");
        }, getRandomInt(1200));
        setTimeout(() => {
          client.channels.cache.get(channel).send("owob");
        }, getRandomInt(1200));
      });
      owoJob = scheduleJob(owoRule, () => {
        client.channels.cache.get(channel).send("owo");
      });

      wakeUpJob = scheduleJob(wakeUpRule, () => {
        const d = new Date();
        if (d.getHours() === 1) {
          client.channels.cache.get(channel).send("owoq");
          client.channels.cache.get(channel).send("owopray");
        } else if (d.getHours() === 12) {
          client.channels.cache.get(channel).send("owodaily");
        } else if (d.getHours() === 10) {
          client.channels.cache.get(channel).send("owopray");
        } else {
          client.channels.cache.get(channel).send("owopray");
        }
      });
    });

    //spent 5 <:cowoncy:416043450337853441> and caught an
    client.on("messageCreate", async (message) => {
      if (message.author.id !== "408785106942164992") return;
      if (message.channel.id !== channel && message.channel.guild) return;
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
      if (checkTimeSpam()) {
        if (message.author.id !== "408785106942164992") return;
        if (message.channel.id !== channel && message.channel.guild) return;
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
          // cancel job
          huntJob.cancel();
          owoJob.cancel();
          if (client.user.id === owner) return;
          // send message content
          client.users.cache.get(owner).send(message.content);
          // send image captcha
          if (!!message.attachments.size && message.attachments.values().next()?.value?.url) {
            client.users.cache.get(owner).send(message.attachments.values().next().value.url);
          }
        } 
        // else if (
        //   message.embeds[0] !== undefined ||
        //   message.content.includes("gained")
        // ) {
        //   return;
        // } else {
        //   huntJob.reschedule(huntBattleRule);
        //   owoJob.reschedule(owoRule);
        // }
        if (message.content.includes("Thank you")) {
          huntJob.reschedule(huntBattleRule);
          owoJob.reschedule(owoRule);
          if (client.user.id === owner) return;
          client.users.cache.get(owner).send(message.content);
        }
      } else {
        huntJob.cancel();
        owoJob.cancel();
      }
    });

    client.on("messageCreate", async (message) => {
      // send message captcha after resolve from owner to bot
      if (message.author.id === owner && !message.channel.guild && message.content) {
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

    // console.log(token);

    client.login(token);

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    function checkTimeSpam() {
      const d = new Date();
      let hour = d.getHours();
      // [1, 4, 7, 10, 12, 15];
      if (
        hour === 1 ||
        hour === 4 ||
        hour === 7 ||
        hour === 10 ||
        hour === 12 ||
        hour === 15
      ) {
        return 1;
      }
      return 0;
    }
  } catch (e) {
    console.log(e);
  }
};
