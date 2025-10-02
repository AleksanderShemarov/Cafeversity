export default async function generateMessage(userPrompt: string){
    try {
        const response = await fetch('/api/groqai', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt: userPrompt }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data.text; 
    }
    catch (error) {
        console.error('Error:', error);
        return 'Failed to generate an answer.';
    }
}
