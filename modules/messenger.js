let request = require('request'),
	FB_PAGE_TOKEN = 'EAAGvNc8c3s0BAPfBB97b0tPwDdl3rPZByx2yznT9OV4MACTcZBjCG9NollDCqgVvTtInnRERGRFE01487i9p7HjWZC7bs91wuOtUwdgVfksGNjrCj3XZA24LFQoG2ReAmmWjwEJSV6Lhcs3VtXYRSZAa5gZCUc8H8xL28cbljtNgZDZD',
	ORG_ID = '00D7F000003CgoK',
	LIVE_AGENT_DEPLOYMENT = '5727F000000cYX9',
	LIVE_AGENT_BUTTON = '5737F000000cR68',
	LIVE_AGENT_LANGUAGE = 'en-US',
	SCREEN_RES = '1900x1080',
	VISITOR_NAME = 'FB ppl',
	CASE_RECORD_TYPE = '',
	LIVECHAT_URL = 'https://d.la1-c2cs-ukb.salesforceliveagent.com';

exports.chasitorInit = (key, token, id, visitor) => {
	console.log('Session Key:' + key);
	console.log('Session Token: ' + token);
	console.log('Session Id: ' + id);
	
	return new Promise((resolve, reject) => {
		request({
			url : LIVECHAT_URL + '/chat/rest/Chasitor/ChasitorInit',
			method : 'POST',
			headers : {
				"X-LIVEAGENT-API-VERSION" : 46,
				"X-LIVEAGENT-AFFINITY" : token,
				"X-LIVEAGENT-SESSION-KEY" : key,
				"X-LIVEAGENT-SEQUENCE" : 1
			},
			json : {
				"organizationId" : ORG_ID,
				"deploymentId" : LIVE_AGENT_DEPLOYMENT,
				"buttonId" : LIVE_AGENT_BUTTON,
				"sessionId" : id,
				"userAgent" : "",
				"language" : LIVE_AGENT_LANGUAGE,
				"screenResolution" : SCREEN_RES,
				"visitorName" : visitor,
				"prechatEntities":[  
				      {  
				         "showOnCreate":null,
				         "saveToTranscript":"ContactId",
				         "linkToEntityName":"Case",
				         "linkToEntityField":"ContactId",
				         "entityName":"Contact"
				      }
				],
   				"prechatDetails":[  
				      {  
				         "value":"jon@example.com",
				         "label":"E-mail Address",
				         "entityMaps":[  
				            {  
				               "isFastFillable":false,
				               "isExactMatchable":true,
				               "isAutoQueryable":true,
				               "fieldName":"Email",
				               "entityName":"Contact"
				            }
				         ],
				         "transcriptFields":[
			            	"Customer_Display_Name__c"
			         	 ],
				         "doKnowledgeSearch":false,
				         "displayToAgent":true
				      }
   				],
				"buttonOverrides" : ["5737F000000cR68"],
				"receiveQueueUpdates" : true,
				"isPost" : true
			}
			//0K99D000000002l
		}, (error, response, body) => {
			if(error){
				console.log('Error initializing chat: ', error);
			}
			else if(response.body.error){
				console.log('Error: ', response.body.error);
			}
			else{
				resolve(response.body);
			}
		});
	});
};

exports.getSession = (postData) => {
			console.log(postData)
            var clientServerOptions = {
                uri: LIVECHAT_URL + '/chat/rest/System/SessionId',
                //body: JSON.stringify(postData),
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "X-LIVEAGENT-API-VERSION" : 45,
                    "X-LIVEAGENT-AFFINITY" : null
                }
            }
            return new Promise((resolve, reject) => {
            	request(clientServerOptions, function (error, response) {
                	console.log('SESSION=====: ' + error,response.body)
                	resolve(JSON.parse(response.body))
           		});
            });
};


exports.send = (message, recipient) => {
	request({
		url : 'https://graph.facebook.com/v2.6/me/messages',
		qs : {access_token: FB_PAGE_TOKEN},
		method : 'POST',
		json : {
			recipient : {id : recipient},
			message : message
		}
	}, (error, response) => {
		if(error){
			console.log('Error sending message: ', error);
		}
		else if(response.body.error){
			console.log('Error: ', response.body.error);
		}
	});
};
