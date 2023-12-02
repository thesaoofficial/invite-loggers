const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
  ],
});

const girişÇıkışKanalId = '1176565634876846211'; // Giriş çıkış mesajlarının gönderileceği kanal ID'si
const kayıtSorumlusuRolId = '1176565497542746132'; // Kayıt sorumlusu rolünün ID'si
const kayıtsızÜyeRolId = '1176945734713618432'; // Kayıtsız üye rolünün ID'si

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on('guildMemberAdd', (member) => {
  const channel = member.guild.channels.cache.get(girişÇıkışKanalId);
  if (channel) {
    const kayıtSorumlusuRol = member.guild.roles.cache.get(kayıtSorumlusuRolId);
    const kayıtsızÜyeRol = member.guild.roles.cache.get(kayıtsızÜyeRolId);

    // Kullanıcıyı etiketle ve sunucu ismini al
    const userTag = member.user.tag;
    const memberCount = member.guild.memberCount;

    let greetingMessage = `🌟 **MERHABA ${userTag.toUpperCase()}!** SUNUCUMUZA HOŞGELDİN. KAYIT SORUMLULARI, LÜTFEN İLGİLENİN! Şu anda **${memberCount}** KİŞİYİZ.`;

    // Eğer kayıt sorumlusu rolü varsa, sorumluları etiketleme ekle
    if (kayıtSorumlusuRol) {
      const kayıtSorumluları = kayıtSorumlusuRol.members.map(member => `${member}`).join('\n');
      greetingMessage += `\n\nKAYIT SORUMLULARI:\n${kayıtSorumluları}`;
    }

    // Kayıtsız üye rolü varsa, üyeye rolü ver
    if (kayıtsızÜyeRol) {
      member.roles.add(kayıtsızÜyeRol).catch(console.error);
    }

    channel.send(`**${greetingMessage}**`);
  } else {
    console.error(`Hedef kanal bulunamadı. Kanal ID'sini kontrol edin.`);
  }
});

client.on('guildMemberRemove', (member) => {
  const channel = member.guild.channels.cache.get(girişÇıkışKanalId);
  if (channel) {
    const userTag = member.user.tag;
    const memberCount = member.guild.memberCount;

    const farewellMessage = `👋 **NE YAZIK Kİ, ${userTag.toUpperCase()} SUNUCUMUZDAN AYRILDI.** İNŞALLAH GERİ GELİR. Şu anda **${memberCount}** KİŞİYİZ.`;
    channel.send(`**${farewellMessage}**`);
  } else {
    console.error(`Hedef kanal bulunamadı. Kanal ID'sini kontrol edin.`);
  }
});

client.login('MTE3OTY3Mzk2NzU5OTA0MjY3MA.G3gw7g.YNV4hjCZOzS_-HzWCwmu_7Lt6_J9G0LQ5qXuAY');
