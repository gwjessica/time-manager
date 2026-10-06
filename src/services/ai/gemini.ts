import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

export async function analyzeTaskDifficulty(taskTitle: string, taskDescription?: string) {
  const prompt = `
    Analisis tugas/kegiatan berikut untuk mahasiswa:
    Judul: "${taskTitle}"
    Deskripsi: "${taskDescription || '-'}"

    Berikan estimasi Cognitive Load / Beban Mental dari skala 1 sampai 5:
    1 = Sangat Mudah / Rutinitas (misal: isi kuesioner)
    2 = Mudah (misal: baca artikel singkat)
    3 = Sedang (misal: resume materi kuliah)
    4 = Sulit (misal: koding program / makalah riset)
    5 = Sangat Sulit / Kompleks (misal: skripsi / proyek sistem berskala besar)

    Kembalikan HANYA format JSON valid seperti berikut tanpa penjelasan tambahan:
    {"cognitiveLoad": number, "reason": "alasan singkat"}
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  try {
    const text = response.text || '{}';
    // Clean json formatting string if wrapped in markdown codeblock
    const cleanJson = text.replace(/```json|```/g, '').trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    return { cognitiveLoad: 3, reason: 'Gagal menganalisis AI, default ke 3' };
  }
}