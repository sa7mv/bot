const Discord = require("discord.js");
const db = require("quick.db");
const meh = new db.table("ilh");
const moment = require("moment");
require("moment-duration-format");
const ayarlar = require("../ayarlar.json");

exports.run = async (client, message, args) => {
  
  if(message.channel.id == meh.get(`Komutkanal_${message.guild.id}`) || message.channel.id == "1015955561004683374")
  {
  var i = args.slice(0).join('').length;
  
  if(i > 200){
  message.channel.send(`> 200 DEN FAZLA MESAJ YAZILAMAZ`);
  }
  else{
  if(args[0] == null || args[0] == ` `)
  {
    message.channel.send(`> ATILICAK MESAJI GİRMEDİNİZ`);
  }
  else
  {
    if(meh.get(`global_sayfa_${client.id}`) == null){
      meh.add(`global_sayfa_${client.id}`, 1);
  }
    meh.add(`global_sayii_${client.id}`, 1);
    if(meh.get(`global_sayii_${client.id}`) == 6){
    meh.add(`global_sayfa_${client.id}`, 1);
    meh.set(`global_sayii_${client.id}`, 1);
    }
    var sayfa = meh.get(`global_sayfa_de_${client.id}`);
      let embd = new Discord.MessageEmbed();
  let date = new Date();
  var saat = date.getHours() + 3;
      var gün = date.getDate();
      if(date.getHours() == 21)
  {
    saat = 0;
    gün = date.getDate() + 1;
  }
  if(date.getHours() == 22)
  {
    saat = 1;
    gün = date.getDate() + 1;
  }
  if(date.getHours() == 23)
  {
    saat = 2;
    gün = date.getDate() + 1;
  }
  if(date.getHours() == 24)
  {
    saat = 3;
    gün = date.getDate() + 1;
  }
    var tarih = [moment().format(`${gün}-MM-YYYY`)];
  meh.push(`global_1_${client.id}_${sayfa}`, message.author.username + ` |${tarih}: ` + `TEST`);
  meh.push(`global_${client.id}_${sayfa}`, meh.get(`global_1_${client.id}_${sayfa}`).join(' '));
  meh.delete(`global_1_${client.id}_${sayfa}`);
  meh.push(`global_1_${client.id}_${sayfa}`, message.author.username + ` |${tarih}: ` + args.slice(0).join(" ") + `\n\n`);
  meh.push(`global_1_${client.id}_${sayfa}`, meh.get(`global_${client.id}_${sayfa}`).join(' '));
  meh.delete(`global_${client.id}_${sayfa}`);
  embd.setColor(`GREEN`);
  embd.setDescription(`✅ MESAJ GLOBALE ATILDI`);
  message.channel.send(embd).then(msg => msg.delete({timeout : 2000}));
  }
       } 
  }
else
{
message.channel.send(`> BU KOMUTLAR SADECE BOTUN KOMUT KANALINDA KULLANMAK İÇİN AYARLANDI`);
}
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["global-at"],
  permLevel: 0,
};

exports.help = {
  name: "global-gönder",
  description: "",
  usage: "",
};
