const rumor = require('../index');

Promise.resolve({ x: 3, name: 'hest', deep: { obj: { with: { a: { lot: { of: 'keys' } } } } } })
	.then(rumor.info)
	.then(rumor.warn)
	.then(rumor.error);


Promise.resolve(['this', 'is', 'a', 'test'])
	.then(rumor.info)
	.then(rumor.warn)
	.then(rumor.error);
