const { SlashCommandBuilder } = require('@discordjs/builders');
const { clientId, guildId } = require('../config.json');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('export')
		.setDescription('Exports all members from your discord Server.'),
	async execute(interaction, client) {
		const guild = client.guilds.cache.get(guildId)
		const members = await guild.members.fetch()
		const memberArray = [];
		members.each(member => {
			memberArray.push(`${member.user.username}#${member.user.discriminator}`);
		});
		console.log(memberArray)
		fs.writeFile('members.txt', memberArray.toString(), (err) => {
			if (err) throw err;
			console.log('The file has been saved!');
		  });
	},
};