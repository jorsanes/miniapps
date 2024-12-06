// openai.js actualizado
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    try {
        const apiKey = process.env.OpenAI_API_KEY;

        if (!apiKey) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Falta la clave de API de OpenAI" })
            };
        }

        const requestBody = JSON.parse(event.body);
        const prompt = requestBody.prompt;

        if (!prompt) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Falta el prompt en la solicitud" })
            };
        }

        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7
            }),
        });

        const data = await response.json();

        if (!data || !data.choices || data.choices.length === 0) {
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "La API de OpenAI no devolvió resultados válidos" })
            };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ result: data.choices[0].text.trim() })
        };

    } catch (error) {
        console.error("Error en la función openai.js:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error del servidor", details: error.message })
        };
    }
};
