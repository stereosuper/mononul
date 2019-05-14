const axios = require('axios');

exports.handler = function(event, context, callback) {
    const { uri } = JSON.parse(event.body);
    axios.get(`http://api.giphy.com/v1/gifs/${uri}`)
        .then(response => {
            callback(null, {
                statusCode: 200,
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(response.data)
            });
        })
        .catch(error => {
            console.error(error);
            callback(null, {
                statusCode: 404,
                headers: {
                    'Content-type': 'application/json'
                },
                body: ''
            });
        });
};