'use strict';
var multipart = require('parse-multipart');

module.exports.jsonLogger = async(event) => {
  console.log('Here is the whole event', JSON.stringify(event, null, 2));
  let body = {status: 'json body not yet parsed'};
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    console.log('error parsing body', e.message);
  }
  console.log('Here is just the body', JSON.stringify(body, null, 2));
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Event logged',
      input: body,
    }, null, 2),
  };
};


module.exports.plexLogger = async(event) => {
  console.log('Here is the whole event', JSON.stringify(event, null, 2));
  const body = (new Buffer(event.body, 'base64')).toString('ascii');
  console.log('Decoded Body:', body);
	const boundary = `--${event.headers['Content-Type'].split('boundary=')[1]}`;
  console.log('boundary:', boundary);
  let jsonBody = body
    .replace(`${boundary}--`, '')
    .replace(boundary, '')
    .replace(`Content-Disposition: form-data; name="payload"`, '')
    .replace(`Content-Type: application/json`, '')
    .trim();
  try {
    jsonBody = JSON.parse(jsonBody);
  } catch (e) {
    console.log('error parsing body', e.message);
  }
  console.log('Parsed body', JSON.stringify(jsonBody, null, 2));
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Event logged',
    }, null, 2),
  };
};
