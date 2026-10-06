export async function getAiCognitiveScore(title: string, description?: string) {
  const response = await fetch('/api/ai-scorer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description }),
  });

  if (!response.ok) {
    throw new Error('Gagal mendapatkan skor dari AI');
  }

  return response.json();
}