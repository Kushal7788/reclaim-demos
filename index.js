const bot = require('./client/bot');
// const globalScheduler = require('./reclaim');
const adminCommands = require('./commands/admin/admin-commands');
const userCommands = require('./commands/user/user-commands');
const express = require("express");
const cors = require("cors");
require('dotenv').config();
var cookieParser = require("cookie-parser");
var mongoose = require("mongoose");
const bodyParser = require("body-parser");
const handleCallback = require('./reclaim/utils/handle-callback');
const sendMessage = require('./reclaim/utils/send-msg');
const { newJoiner } = require('./reclaim/utils/new-joiner');
const { removeMember } = require('./reclaim/utils/remove-member');
const globalScheduler = require('./reclaim');
const { getInviteLink } = require('./reclaim/utils/get-invite-link');

const app = express();
app.use(cors());
app.set("trust proxy", true);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


// Listen for polling errors
bot.on('polling_error', (error) => {
  console.error('Polling error:', error);
});


// Express Set-up
var mongoDB = process.env.MONGO_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// Set a variable in the req object
app.use((req, res, next) => {
  req.bot = bot;
  next();
});

// app.use("/", indexRouter);

app.get("/", async (request, response) => {
  // sendMessage(bot, '6025450902', "Server is up and running");
  // await bot.unbanChatMember(-1001921440103, 6025450902);
  response.status(200).json({
    success: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.post("/update/proof", bodyParser.text("*/*"), async (req, res) => {
  const isSuccess = handleCallback(bot, req);
  if (isSuccess) {
    res.status(201).send("<h1>Proofs has been shared with the Requestor. \n You can exit the screen</h1>");
  }
  else {
    res.status(401).send("<h1>Unable to verify the member</h1>");
  }
});

app.post("/invite", async (request, response) => {
  try {
    const chatId = request.body.chatId;
    const inviteLink = await getInviteLink(bot, chatId);
    response.status(200).json({
      success: true,
      inviteLink: inviteLink,
    });
  } catch (error) {
    console.error('An error occurred:', error);
    response.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.use("*", function (req, res, next) {
  res.status(405).json({
    success: false,
    message: "Method Not Allowed!",
  });
});

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on Port: ${process.env.PORT}.`
  );
});

// Receiving command interactions
bot.on('new_chat_members', async (message) => {
  await newJoiner(bot, message);
});

bot.on('left_chat_member', async (message) => {
  const userId = message.left_chat_member.id;
  const chatId = message.chat.id;
  await removeMember(userId, chatId);
});



function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

adminCommands(bot);
userCommands(bot);

// const runSchedulers = async () => {
//   await delay(3000);
//   console.log('Bot is running');
//   const schedulerTimer = 1000 * 60 * 60 * 3; // 6 hours
//   // Schedule the role check and message sending
//   // await checkAllVerificationStatus();
//   try {
//     // await globalScheduler(bot);
//     setInterval(async () => {
//       await globalScheduler(bot);
//     }, schedulerTimer);
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
// }

// runSchedulers();

module.exports = app;