const fetch = require('node-fetch');

exports.handler = async function (event, context) {
    const apiKey = process.env.OpenAI_API_KEY; // Usa la variable de entorno configurada en Netlify
    const body = JSON.parse(event.body);

    try {
        const response = await fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'text-davinci-003',
                prompt: body.prompt,
                max_tokens: 150,
            }),
        });

        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify({ result: data.choices[0].text }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al procesar la solicitud de OpenAI', details: error.message }),
        };
    }
};
