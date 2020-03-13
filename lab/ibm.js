require("dotenv").config({ path: __dirname + "/../.env" });

const { IamAuthenticator } = require("ibm-watson/auth");
const ToneAnalyzerV3 = require("ibm-watson/tone-analyzer/v3");
const NaturalLanguageClassifierV1 = require("ibm-watson/natural-language-classifier/v1");

var toneAnalyzer = new ToneAnalyzerV3({
  authenticator: new IamAuthenticator({ apikey: process.env.IBM_API_KEY }),
  version: "2017-09-21",
  url: "https://api.eu-de.tone-analyzer.watson.cloud.ibm.com/instances/d63809a8-41f7-4d45-ba73-858a90f82123"
});

// const classifier = new NaturalLanguageClassifierV1({
//   authenticator: new IamAuthenticator({ apikey: "W6BeJZoQdQiDMcQM-NF4LB7zKrEAzk_xke4Jr3AWFPcv" }),
//   url: "https://api.eu-de.tone-analyzer.watson.cloud.ibm.com/instances/d63809a8-41f7-4d45-ba73-858a90f82123"
// });

// classifier
//   .classify({
//     text: "Is it sunny?",
//     classifierId: "<classifier-id>"
//   })
//   .then(response => {
//     console.log(JSON.stringify(response.result, null, 2));
//   })
//   .catch(err => {
//     console.log("error: ", err);
//   });

toneAnalyzer.tone(
  {
    toneInput: "cul dans la chatte",
    contentType: "text/plain"
  },
  function(err, tone) {
    if (err) {
      console.log(err);
    } else {
      console.log("tone endpoint:");
      console.log(JSON.stringify(tone, null, 2));
    }
  }
);
