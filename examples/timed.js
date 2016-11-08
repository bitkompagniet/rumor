const rumor = require('../index')('timed example');

let count = 0;

rumor('This is called via the default function.');

['trace', 'debug', 'info', 'warn', 'error'].forEach((level, index) => {
	const offset = index + 1;

	setInterval(() => {
		rumor[level](`This is message no ${++count}, and this is the ${level} level.`);
	}, 1000 * offset * (offset * 0.5));
});
