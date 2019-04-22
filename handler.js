'use strict';

module.exports.logger = async(event) => {
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
