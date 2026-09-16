const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const token = process.env.TOKEN;
const clientId = process.env.ID;

// Commandes globales
const commands = [
  {
    name: 'rien',
    description: 'Rien',
		integration_types: [0, 1],
		contexts: [0, 1, 2],
  },
];

// Enregistrement des commandes globales
const rest = new REST({ version: '10' }).setToken(token);
(async () => {
  try {
    console.log('Enregistrement des commandes globales...');
    await rest.put(
      Routes.applicationCommands(clientId), // Commandes globales
      { body: commands },
    );
    console.log('Commandes globales enregistrées avec succès !');
  } catch (error) {
    console.error(error);
  }
})();

// Gestion des interactions
client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'rien') {
    await interaction.reply({ 
      content: '** **', 
    });
  }
});

client.on('ready', () => {
  console.log(`Connecté en tant que ${client.user.tag}`);
});

// Détection du mot "rien"
client.on('messageCreate', message => {
  if (message.author.bot) return;
  if (/r[i1]en[s]?/i.test(message.content)) {
    message.reply('** **');
  }
});

client.login(token);