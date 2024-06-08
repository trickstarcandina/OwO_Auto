require("dotenv").config({ path: "./.env" });
const { Client } = require("discord.js-selfbot-v13");
const { runClientSchedule } = require("./clientSchedule");
const { runClientContinuous } = require("./clientContinuous");

const action = process.argv[2];

try {
    if (action === "runClientSchedule") {
        runClientSchedule(
            process.env.CHANNEL,
            process.env.OWNER,
            process.env.TOKEN,
            new Client({
                checkUpdate: false,
            })
        );
    } else if (action === "runClientContinuous") {
        runClientContinuous(
            process.env.CHANNEL,
            process.env.OWNER,
            process.env.TOKEN,
            new Client({
                checkUpdate: false,
            })
        );
    } else {
        console.log("Invalid action.");
    }
} catch (error) {
    console.log(error);
}