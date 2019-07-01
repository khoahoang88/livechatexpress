"use strict";
const messenger = require('./messenger')
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

exports.liveAgentMessage = (sender, values) => {
	console.log('LA session: %j', globalSession);
	console.log('LA values: %j', values);
};

let match = text => {
	console.log('globalSession.id',globalSession.id)
	if(globalSession && globalSession.id){
		console.log('Processor session %j', globalSession);
		console.log('Processor sequence: ' + globalSequence);
		console.log('Processor text: ' + text);
		var handler = 'liveAgentMessage';
		var match = [];
		match.push(text);
		return {handler, match};
	}else{
		console.log('No session ');
		messenger.getLiveAgentSession().then(session => {
			console.log("Session %j", session);
			// console.log("Values " + values[1]);
			var key = session.key;
			console.log("key: " + key);
			messenger.chasitorInit(session.key, session.affinityToken, session.id).then(chasitor => {
				console.log("Chasitor %j", chasitor);
				console.log("Chasitor Session %j", session);
				globalSession = session;
				globalSequence = -1;
				
				var handler = 'liveAgentMessage';
				var match = [];
				match.push(text);
				return {handler, match};
			});
		});
	}
}