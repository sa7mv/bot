const Discord = require("discord.js");
const db = require("quick.db");
const meh = new db.table("ilh");
const ayarlar = require("../ayarlar.json");
const fs = require("fs");
const translate = require("node-google-translate-skidz");

exports.run = async (client, message, args) => {
    
if (
      message.channel.id == meh.get(`Oyunkanal_${message.guild.id}`) ||
      message.channel.id == meh.get(`Oyunkanal2_${message.guild.id}`) ||
      message.channel.id == "1015955561004683374"
    ) {
      var şifre2 = meh.get(`Şifre_${message.author.id}`);
      var hesap2 = meh.get(`Banka_Hesap_${şifre2}`);
      var bot = client.user.id;
      var d = args[0] + " " + args[1] + " " + args[2];
      var a = meh.get(`Banka_Hesap_${bot}_${args[0]}_${args[1]}_${args[2]}`);
                    message.channel.bulkDelete(1).then(() => {});
                    if (şifre2)
                      return message.channel.send(
                        `> **ÖNCE VAR OLAN HESABINDAN ÇIKIŞYAP \`${
                          ayarlar[message.guild.id].prefix
                        }çıkışyap\`**`
                      );
                    {
                      if (args[0] == null)
                        return message.channel.send(
                          `> **${ayarlar[message.guild.id].prefix}girişyap <ad> <soyad> < şifre> hata**`
                        );
                      {
                        if (!isNaN(args[0]))
                          return message.channel.send(
                            `> **${ayarlar[message.guild.id].prefix}girişyap <ad> <soyad> < şifre> hata**`
                          );
                        {
                          if (args[1] == null)
                            return message.channel.send(
                              `> **${
                                ayarlar[message.guild.id].prefix
                              }girişyap <ad> <soyad> < şifre> hata**`
                            );
                          {
                            if (!isNaN(args[1]))
                              return message.channel.send(
                                `> **${
                                  ayarlar[message.guild.id].prefix
                                }girişyap <ad> <soyad> < şifre> hata**`
                              );
                            {
                              if (args[2] == null)
                                return message.channel.send(
                                  `> **${
                                    ayarlar[message.guild.id].prefix
                                  }girişyap <ad> <soyad> < şifre> hata**`
                                );
                              {
                                if (
                                  meh.get(
                                    `Banka_Hesap_${bot}_${args[0]}_${args[1]}_${args[2]}`
                                  ) == null
                                ) {
                                  message.channel.send(
                                    `> **BÖYLE HESAP VERİ TABANINDA BULUNMAMAKTA -hesapaç <ad> <soyad> <şifre>**`
                                  );
                                } else {
                                  if (
                                    !message.member.roles.cache.has(
                                      "1018519453769682966"
                                    ) &&
                                    d == "TESTER EKİP 35(-ekip0192-)35"
                                  )
                                    return message.channel.send(
                                      `> **BU HESAP TESTER EKİP İÇİN ÖZEL**`
                                    );
                                  {
                                    if (
                                      message.author.id !=
                                        "520213732752621568" &&
                                      d == "MEHMET İLHAN 35[-ifsem0192-]35"
                                    )
                                      return message.channel.send(
                                        `> **BU HESAP SAHİBİM ARES ÖZEL YAPIM**`
                                      );
                                    {
                                      var şifre = args[2];
                                      if (
                                        meh.get(
                                          `Banka_ban_${
                                            args[0] + " " + args[1]
                                          }_${şifre}_${message.author.id}`
                                        ) == "BANNED"
                                      ) {
                                        message.channel.send(
                                          `> BU BANKA HESABINDAN YASAKLANDIN!`
                                        );
                                      } else {
                                        meh.set(
                                          `Banka_Hesap_${şifre}`,
                                          args[0] + " " + args[1]
                                        );
                                        let hesap2 = meh.get(
                                          `Banka_Hesap_${şifre}`
                                        );
                                        let hesap = meh.get(
                                          `Banka_Hesap_${şifre}`
                                        );
                                        meh.add(`Giren_${hesap}_${şifre}`, 1);
                                        meh.push(
                                          `Kişiler_${hesap}_${şifre}`,
                                          `${message.author.username}:${message.author.id}`
                                        );
                                        var dm = meh.get(
                                          `SAHİBİ_${hesap}_${şifre}`
                                        );
                                        if (message.author.id != dm) {
                                          client.users.cache
                                            .get(`${dm}`)
                                            .send(
                                              `> ${message.author.username} ADLI KİŞİ SİZE AİT ${hesap} ADLI BANKA HESABINA GİRİŞ YAPTI!`
                                            );
                                        }
                                        meh.set(
                                          `Banka_Hesap_${bot}_${args[0]}_${args[1]}_${şifre}`,
                                          args[0] +
                                            " " +
                                            args[1] +
                                            " " +
                                            args[2]
                                        );
                                        meh.set(
                                          `Şifre_${message.author.id}`,
                                          şifre
                                        );
                                        if (
                                          meh.get(
                                            `Kart_Harcama_${hesap2}_${şifre}`
                                          ) == null
                                        )
                                          return meh.push(
                                            `Kart_Harcama_${hesap2}_${şifre}`,
                                            "boş"
                                          );
                                        let embd = new Discord.MessageEmbed()
                                          .setColor(`GREEN`)
                                          .setDescription(
                                            `**HESAP GİRİŞİ YAPILDI<:tik:991946063458086992>**`
                                          )
                                          .setTimestamp()
                                          .setFooter(
                                            `sunucu ${message.guild.memberCount} kişi`
                                          );
                                        message.channel.send(embd);
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
    } else {
      message.channel.send(
        `> BU OYUNLAR SADECE BOTUN OYUN KANALINDA KULLANMAK İÇİN AYARLANDI <#${meh.get(
          `Oyunkanal_${message.guild.id}`
        )}> <#${meh.get(`Oyunkanal2_${message.guild.id}`)}>`
      );
    }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["girişyap"],
  permLevel: 0,
};

exports.help = {
  name: "girişyap",
  description: "",
  usage: "",
};
