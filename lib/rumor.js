const chalk = require('chalk');
const path = require('path');
const moment = require('moment');

const levels = ['trace', 'debug', 'info', 'warn', 'error'];
const colors = ['gray', 'white', 'blue', 'yellow', 'red'];

function getPackageName() {
	try {
		const pckLocation = path.join(path.resolve(process.cwd()), 'package.json');
		const pck = require(pckLocation);
		const pckName = pck.name;
		return pckName;	
	} catch (e) {
		return null;
	}
}

function formatLevel(messageLevel) {
	let str = levels[messageLevel];
	str = str + ' '.repeat(6 - str.length);

	return chalk[colors[messageLevel]](str);
}

function formatMessage(messageLevel, message) {
	return messageLevel >= 3 ? chalk[colors[messageLevel]](message) : message;
}

function timestamp() {
	return moment().format('YYYY-MM-DD HH:mm:ss');
}

function formatOutput(namespace, messageLevel, message) {
	return `${formatLevel(messageLevel)} ${chalk.underline(namespace)} ${chalk.gray(timestamp())}  ${formatMessage(messageLevel, message)}`;
}

function log(currentLevel, namespace, messageLevel, message) {
	if (messageLevel >= currentLevel) {
		console.log(formatOutput(namespace, messageLevel, message));
	}
}

function resolveNamespace(userGivenNamespace) {
	return userGivenNamespace ? userGivenNamespace : getPackageName();
}

function resolveCurrentLevel() {
	if (!process.env.rumor || levels.indexOf(process.env.rumor) === -1) {
		return 2;
	} else {
		return levels.indexOf(process.env.rumor);
	}
}

function createRumor() {
	const instance = {};

	levels.forEach((lvlDescription, index) => {
		instance[lvlDescription] = 
			(message, namespace = null) => 
				log(resolveCurrentLevel(), resolveNamespace(namespace), levels.indexOf(lvlDescription), message);
	});

	return instance;
}

module.exports = createRumor;
