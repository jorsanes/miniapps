const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const apiKey = process.env.OpenAI_API_KEY;
  const body = JSON.parse(event.body);

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o", // Asegúrate de que este modelo sea accesible
        prompt: body.prompt,
        max_tokens: body.max_tokens || 150,
        temperature: body.temperature || 0.7,
      }),
    });

    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error(`Error de OpenAI: ${errorDetails}`);
    }

    const data = await response.json();

    // Verificar que 'choices' exista y tenga datos
    if (!data.choices || data.choices.length === 0) {
      throw new Error("La API de OpenAI no devolvió resultados en 'choices'");
    }

    const text = data.choices[0].text.trim();
    return {
      statusCode: 200,
      body: JSON.stringify({ result: text }),
    };
  } catch (error) {
    console.error("Error al procesar la solicitud:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Error al procesar la solicitud de OpenAI",
        details: error.message,
      }),
    };
  }
};
