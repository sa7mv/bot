const Discord = require("discord.js");
const db = require("quick.db");
const meh = new db.table("ilh");
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require("../ayarlar.json");
const Canvas = require("canvas");

exports.run = async (client, message, args) => {
  if (
    message.channel.id == meh.get(`Komutkanal_${message.guild.id}`) ||
    message.channel.id == "1015955561004683374"
  ) {
    var sayfa2 = meh.get(`global_sayfa_${client.id}`);
    var sayfa = 1;
    var embd = new Discord.MessageEmbed()
      .setColor(`GRAY`)
      .setThumbnail(`https://cdn.glitch.global/ea843944-d80d-43ae-98ee-6d193e216430/loris2.jpg?v=1675642390146`)
      .setTitle(`__SPEAR GLOBAL__`)
      .setDescription(meh.get(`global_1_${client.id}_1`))
      .setFooter(`sayfa:(${sayfa}/${sayfa2}) | sunucu ${message.guild.memberCount} kişi`)
      .setTimestamp();
    message.channel.send(embd).then(async (msg) => {
      await msg.react("◀️");
      await msg.react("▶️");

      let filter = (reaction, user) =>
        user.id !== message.client.user.id && user.id === message.author.id;

      var collector = msg.createReactionCollector(filter, {
        time: 120000,
      });
      setTimeout(function () {
        msg.delete();
      }, 125000);

      collector.on("collect", async (reaction, user) => {
        switch (reaction.emoji.name) {
          case "▶️":
            reaction.users.remove(user).catch(console.error);
            if (sayfa2 > sayfa) {
              sayfa++;
              let embd2 = new Discord.MessageEmbed()
                .setColor(`GRAY`)
                .setTitle(`__SPEAR GLOBAL__`)
                .setDescription(meh.get(`global_1_${client.id}_${sayfa}`))
                .setFooter(`sayfa:(${sayfa}/${sayfa2}) | sunucu ${message.guild.memberCount} kişi`)
                .setTimestamp();
              msg.edit(embd2);
            } else {
              sayfa = 1;
              let embd2 = new Discord.MessageEmbed()
                .setColor(`GRAY`)
                .setTitle(`__SPEAR GLOBAL__`)
                .setDescription(meh.get(`global_1_${client.id}_${sayfa}`))
                .setFooter(`sayfa:(${sayfa}/${sayfa2}) | sunucu ${message.guild.memberCount} kişi`)
                .setTimestamp();
              msg.edit(embd2);
            }
            break;
          case "◀️":
            reaction.users.remove(user).catch(console.error);

            if (sayfa > 1) {
              sayfa--;
              let embd3 = new Discord.MessageEmbed()
                .setColor(`GRAY`)
                .setTitle(`__SPEAR GLOBAL__`)
                .setDescription(meh.get(`global_1_${client.id}_${sayfa}`))
                .setFooter(`sayfa:(${sayfa}/${sayfa2}) | sunucu ${message.guild.memberCount} kişi`)
                .setTimestamp();
              msg.edit(embd3);
            } else {
              sayfa = meh.get(`global_sayfa_${client.id}`);
              let embd3 = new Discord.MessageEmbed()
                .setColor(`GRAY`)
                .setTitle(`__SPEAR GLOBAL__`)
                .setDescription(meh.get(`global_1_${client.id}_${sayfa}`))
                .setFooter(`sayfa:(${sayfa}/${sayfa2}) | sunucu ${message.guild.memberCount} kişi`)
                .setTimestamp();
              msg.edit(embd3);
            }
            break;
        }
      });
    });
  } else {
    message.channel.send(
      `> BU KOMUTLAR SADECE BOTUN KOMUT KANALINDA KULLANMAK İÇİN AYARLANDI`
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["global"],
  permLevel: 0,
};

exports.help = {
  name: "global",
  description: "",
  usage: "",
};
