import http from 'k6/http'

export const options = {
    vus : 1000,
    duration : "10s"
}

export default function(){
    const url = 'http://localhost:5000/shorten';

    const payload = JSON.stringify({
        originalUrl: 'https://www.google.com'
    });

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    http.post(url, payload, params);
}