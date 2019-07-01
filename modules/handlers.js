const messenger = require('./messenger')
let globalSession =''
exports.startAgent = (sender, values) => {
	//messenger.send({text : `Hang on a sec.`}, sender);
	messenger.getSession().then(session => {
		console.log("Session %j", session);
		var key = session.key;
		console.log("key: " + key);
		messenger.chasitorInit(session.key, session.affinityToken, session.id, 'Khoa1111').then(chasitor => {
			console.log("ChasitorKKKK %j", chasitor);
			console.log("Chasitor Session %j", session);
			globalSession = session;
			globalSequence = -1;
			return chasitor;
		});
	});
};

exports.agentMessage = (sender, values) => {
	console.log('LA session: %j', globalSession);
	console.log('LA values: %j', values);
};