import { NextRequest, NextResponse } from "next/server";


const POST = async (request: NextRequest) => {
    try {
        const { prompt } = await request.json();

        if (!prompt) return NextResponse.json(
            { error: "Prompt is required!" },
            { status: 400 }
        );

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: prompt },
                ],
            max_tokens: 500,
        }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    const generatedText = data.choices[0]?.message?.content || 'No response generated.';

        return NextResponse.json({ text: generatedText });
    }
    catch (error) {
        console.error('Error calling Groq API:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export { POST };
