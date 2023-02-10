const Discord = require("discord.js");
const db = require("quick.db");
const meh = new db.table("ilh");
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  if (
    message.channel.id == meh.get(`Oyunkanal_${message.guild.id}`) ||
    message.channel.id == meh.get(`Oyunkanal2_${message.guild.id}`) ||
    message.channel.id == "1015955561004683374"
  ) {
    var şifre = meh.get(`Şifre_${message.author.id}`);
    if (meh.get(`Banka_Hesap_${şifre}`) == null)
      return message.channel.send(
        `> ** ${
          ayarlar[message.guild.id].prefix
        }hesapaç <ad> <soyad> <şifre> | ${
          ayarlar[message.guild.id].prefix
        }girişyap <ad> <soyad> <şifre>**`
      );
    {
      var o = "";
      var hesap = meh.get(`Banka_Hesap_${şifre}`);
      var sayfa2 = meh.get(`Kart_Harcama_Sayfaa_${hesap}_${şifre}`);
      var sayfa = 1;
      let embd = new Discord.MessageEmbed();

      if (meh.get(`Bankam_${hesap}_${şifre}`) == null) {
        meh.set(`Bankam_${hesap}_${şifre}`, 0);
      }
      if (meh.get(`Kart_toplam_harcama_${hesap}_${şifre}`) == null) {
        meh.set(`Kart_toplam_harcama_${hesap}_${şifre}`, 0);
      }
      embd.setColor(`GRAY`);
      embd.setTitle(
        `**__BANKA HESABINIZ|${meh.get(
          `Banka_Hesap_${şifre}`
        )}__** **\nIBAN:${meh.get(`IBAN_${hesap}_${şifre}`)}**\n`
      );
      embd.setDescription(
        `KART İÇİ PARA MİKTARI:${meh.get(
          `Bankam_${hesap}_${şifre}`
        )} \n \n__**HARCAMALARIN**__ \n__EN SON GELİR GİDER:${o}${meh.get(
          `Kart_toplam_harcama_${hesap}_${şifre}`
        )}__ \n${meh.get(`Kart_Harcama_${hesap}_${şifre}_1`).join(` `)}`
      );
      embd.setTimestamp();
      embd.setFooter(`sayfa:(1/${sayfa2}) | sunucu ${message.guild.memberCount} kişi`);
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
                let embd2 = new Discord.MessageEmbed();
                
                embd2.setColor(`GRAY`);
                embd2.setTitle(
                  `**__BANKA HESABINIZ|${meh.get(
                    `Banka_Hesap_${şifre}`
                  )}__** **\nIBAN:${meh.get(`IBAN_${hesap}_${şifre}`)}**\n`
                );
                embd2.setDescription(
                  `KART İÇİ PARA MİKTARI:${meh.get(
                    `Bankam_${hesap}_${şifre}`
                  )} \n \n__**HARCAMALARIN**__ \n__EN SON GELİR GİDER:${o}${meh.get(
                    `Kart_toplam_harcama_${hesap}_${şifre}`
                  )}__ \n${meh
                    .get(`Kart_Harcama_${hesap}_${şifre}_${sayfa}`)
                    .join(` `)}`
                );
                embd2.setTimestamp();
                embd2.setFooter(`sayfa:(${sayfa}/${sayfa2}) | sunucu ${message.guild.memberCount} kişi`);
                msg.edit(embd2);
              }
              else{
                sayfa = 1;
                let embd2 = new Discord.MessageEmbed();
                
                embd2.setColor(`GRAY`);
                embd2.setTitle(
                  `**__BANKA HESABINIZ|${meh.get(
                    `Banka_Hesap_${şifre}`
                  )}__** **\nIBAN:${meh.get(`IBAN_${hesap}_${şifre}`)}**\n`
                );
                embd2.setDescription(
                  `KART İÇİ PARA MİKTARI:${meh.get(
                    `Bankam_${hesap}_${şifre}`
                  )} \n \n__**HARCAMALARIN**__ \n__EN SON GELİR GİDER:${o}${meh.get(
                    `Kart_toplam_harcama_${hesap}_${şifre}`
                  )}__ \n${meh
                    .get(`Kart_Harcama_${hesap}_${şifre}_${sayfa}`)
                    .join(` `)}`
                );
                embd2.setTimestamp();
                embd2.setFooter(`sayfa:(${sayfa}/${sayfa2}) | sunucu ${message.guild.memberCount} kişi`);
                msg.edit(embd2);
                }
              break;
            case "◀️":
              reaction.users.remove(user).catch(console.error);
              
              if (sayfa > 1) {
                sayfa--;
                let embd3 = new Discord.MessageEmbed();
                embd3.setColor(`GRAY`);
                embd3.setTitle(
                  `**__BANKA HESABINIZ|${meh.get(
                    `Banka_Hesap_${şifre}`
                  )}__** **\nIBAN:${meh.get(`IBAN_${hesap}_${şifre}`)}**\n`
                );
                embd3.setDescription(
                  `KART İÇİ PARA MİKTARI:${meh.get(
                    `Bankam_${hesap}_${şifre}`
                  )} \n \n__**HARCAMALARIN**__ \n__EN SON GELİR GİDER:${o}${meh.get(
                    `Kart_toplam_harcama_${hesap}_${şifre}`
                  )}__ \n${meh
                    .get(`Kart_Harcama_${hesap}_${şifre}_${sayfa}`)
                    .join(` `)}`
                );
                embd3.setTimestamp();
                embd3.setFooter(`sayfa:(${sayfa}/${sayfa2}) | sunucu ${message.guild.memberCount} kişi`);
                msg.edit(embd3);
              }
              else{
                sayfa = meh.get(`Kart_Harcama_Sayfaa_${hesap}_${şifre}`);
                let embd3 = new Discord.MessageEmbed();
                embd3.setColor(`GRAY`);
                embd3.setTitle(
                  `**__BANKA HESABINIZ|${meh.get(
                    `Banka_Hesap_${şifre}`
                  )}__** **\nIBAN:${meh.get(`IBAN_${hesap}_${şifre}`)}**\n`
                );
                embd3.setDescription(
                  `KART İÇİ PARA MİKTARI:${meh.get(
                    `Bankam_${hesap}_${şifre}`
                  )} \n \n__**HARCAMALARIN**__ \n__EN SON GELİR GİDER:${o}${meh.get(
                    `Kart_toplam_harcama_${hesap}_${şifre}`
                  )}__ \n${meh
                    .get(`Kart_Harcama_${hesap}_${şifre}_${sayfa}`)
                    .join(` `)}`
                );
                embd3.setTimestamp();
                embd3.setFooter(`sayfa:(${sayfa}/${sayfa2}) | sunucu ${message.guild.memberCount} kişi`);
                msg.edit(embd3);
                
              }
              break;
          }
        });
      });

      if (meh.get(`Kart_toplam_harcama_${hesap}_${message.author.id}`) == 0) {
        meh.delete(`Kart_harcama_${hesap}_${şifre}`);
      }
    }
  } else {
    message.channel.send(
      `> BU OYUNLAR SADECE BOTUN OYUN KANALINDA KULLANMAK İÇİN AYARLANDI`
    );
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["banka"],
  permLevel: 0,
};

exports.help = {
  name: "banka",
  description: "",
  usage: "",
};
