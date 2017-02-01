const chalk = require('chalk');
const path = require('path');
const moment = require('moment');
const _ = require('lodash');
const util = require('util');

const levels = ['trace', 'debug', 'info', 'warn', 'error', 'off'];
const colors = ['gray', 'white', 'blue', 'yellow', 'red', ''];

function getPackageName() {
	try {
		const pckLocation = path.join(path.resolve(process.cwd()), 'package.json');
		const pck = require(pckLocation); // eslint-disable-line import/no-dynamic-require, global-require
		const pckName = pck.name;
		return pckName;
	} catch (e) {
		return null;
	}
}

function formatLevel(messageLevel) {
	let str = levels[messageLevel];
	str += ' '.repeat(6 - str.length);

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

function formatByType(message) {
	if (_.isArray(message) || _.isObject(message)) return util.inspect(message, { showHidden: false, depth: null, breakLength: Infinity });
	return message;
}

function log(currentLevel, namespace, messageLevel, message) {
	if (messageLevel != 6 && messageLevel >= currentLevel) {
		console.log(formatOutput(namespace, messageLevel, formatByType(message))); // eslint-disable-line no-console
	}

	return message;
}

function resolveNamespace(userGivenNamespace, defaultNamespace) {
	return userGivenNamespace || defaultNamespace || getPackageName();
}

function resolveCurrentLevel() {
	if (!process.env.rumor || levels.indexOf(process.env.rumor) === -1) {
		return 5;
	}

	return levels.indexOf(process.env.rumor);
}

function createRumor(defaultNamespace) {
	const instance = (message, namespace) => log(resolveCurrentLevel(), resolveNamespace(namespace, defaultNamespace), 1, message);

	levels.forEach((lvlDescription) => {
		instance[lvlDescription] =
			(message, namespace) =>
				log(resolveCurrentLevel(), resolveNamespace(namespace, defaultNamespace), levels.indexOf(lvlDescription), message);
	});

	return instance;
}

module.exports = createRumor;
