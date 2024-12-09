// openai.js actualizado y mejorado
const fetch = require("node-fetch");

exports.handler = async (event, context) => {
    try {
        // Verificación de la clave de API
        const apiKey = process.env.OpenAI_API_KEY;
        if (!apiKey) {
            console.error("Falta la clave de API de OpenAI");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "Falta la clave de API de OpenAI" })
            };
        }

        // Verificación del cuerpo de la solicitud
        if (!event.body) {
            console.error("Solicitud sin cuerpo");
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Solicitud sin cuerpo" })
            };
        }

        const requestBody = JSON.parse(event.body);
        const prompt = requestBody.prompt;

        if (!prompt) {
            console.error("Falta el prompt en la solicitud");
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Falta el prompt en la solicitud" })
            };
        }

        // Solicitud a OpenAI API
        const response = await fetch("https://api.openai.com/v1/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4", // Confirma que este modelo esté habilitado en tu cuenta
                prompt: prompt,
                max_tokens: 150,
                temperature: 0.7
            }),
        });

        // Manejo de errores HTTP
        if (!response.ok) {
            console.error(`Error en la API de OpenAI: ${response.status}`);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: `Error en la API de OpenAI: ${response.status}` })
            };
        }

        // Procesamiento de la respuesta
        const data = await response.json();
        if (!data || !data.choices || data.choices.length === 0) {
            console.error("La API de OpenAI no devolvió resultados válidos");
            return {
                statusCode: 500,
                body: JSON.stringify({ error: "La API de OpenAI no devolvió resultados válidos" })
            };
        }

        // Respuesta exitosa
        return {
            statusCode: 200,
            body: JSON.stringify({ result: data.choices[0].text.trim() })
        };

    } catch (error) {
        // Manejo de excepciones
        console.error("Error en la función openai.js:", error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error del servidor", details: error.message })
        };
    }
};
