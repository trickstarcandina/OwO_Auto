require("dotenv").config({ path: "./.env" });
const { Client } = require("discord.js-selfbot-v13");
// const { runClient } = require("./clientSchedule");
const { runClient } = require("./clientContinuous");

try {
    runClient(
        process.env.CHANNEL,
        process.env.OWNER,
        process.env.TOKEN,
        new Client({
            checkUpdate: false,
        })
    );
} catch (error) {
    console.log(error);
}