// import algorithmia from 'algorithmia';
import NaturalLanguageUnderstandingV1 from 'watson-developer-cloud/natural-language-understanding/v1.js';

const watsonApiKey = require('../../../config/watson-nlu.json');

// const algorithmiaApiKey = require('../../../config/algorithmia').apiKey;

const nlu = new NaturalLanguageUnderstandingV1({
  iam_apikey: watsonApiKey.apiKey,
  version: '2018-04-05',
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/',
});

async function robotText(message) {
  let resultContent = '';

  console.log('> [text-robot] Starting...');

  function setMessage(message) {
    resultContent = message;
  }

  function sanitizeContent() {
    function removeDatesInParentheses(text) {
      return text
        .replace(/\((?:\([^()]*\)|[^()])*\)/gm, '')
        .replace(/ {2}/g, ' ');
    }
    const withoutDatesInParentheses = removeDatesInParentheses(resultContent);

    resultContent = withoutDatesInParentheses;
  }

  async function fetchWatsonAndReturnKeywords() {
    return new Promise((resolve, reject) => {
      nlu.analyze(
        {
          text: resultContent,
          features: {
            keywords: {},
          },
        },
        (error, response) => {
          if (error) {
            reject(error);
            return;
          }

          const keywords = response.keywords.map(keyword => {
            return keyword.text;
          });

          resolve(keywords);
        }
      );
    });
  }

  setMessage(message);
  sanitizeContent();
  fetchWatsonAndReturnKeywords();

  return resultContent;
  // limitMaximumSentences(message);
  // await fetchKeywordsOfAllSentences(message);
}

export default robotText;
