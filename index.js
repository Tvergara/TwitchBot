const tmi = require('tmi.js');
const now = new Date();
const spam = ['u̻', 'ǒ', 'B͒'];

const options = {
    options: {
        debug: true,
    },
    connection: {
        cluster: 'aws',
        reconnect: true,
    },
    identity: {
        username: 'twitchbot_test',
        password: 'oauth:ieezow93nwkb6ptjq12mx5eopyp51s',
    },
    channels: ['MaginiGhost'],
};


const client = new tmi.client(options);

client.connect();


client.on('connected', (address, port) => {
    client.action('MaginiGhost', 'Hola chat, el bot está conectado :)');
});


client.on('chat', (channel, user, message, self) => {
    if (message === '!hora') {
        client.action('MaginiGhost', now);
    }

    if (message.split(' ')[0] === '!random') {
        if (message.split(' ').length === 2) {
            var number = parseInt(message.split(' ')[1]);
            var result = Math.floor(Math.random() * number) + 1;
            client.action('MaginiGhost', result.toString());

        }
    }
    for (i = 0; i < spam.length; i++){
        if (message.includes(spam[i])) {
            client.action('MaginiGhost', `Mods porfa baneen a ${user['display-name']}`);
            i = spam.length;
        }
    }
})