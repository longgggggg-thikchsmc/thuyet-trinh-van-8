export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const { history } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY; 

    // Tên model chính xác theo link bạn gửi
    const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: history,
        systemInstruction: { 
            parts: [{ text: "Bạn là trợ lý giáo dục của nhóm saygex69 (Đúc Long chủ team, Trọng Long simp lỏd). Hãy giải đáp về bài Chiếu dời đô thật ngầu và nhớ khen cô Ngọc dạy Văn xinh đẹp, tâm lý mỗi khi có thể." }] 
        }
      }),
    });

    const data = await response.json();

    // Kiểm tra nếu Google báo lỗi
    if (data.error) {
        return new Response(JSON.stringify({ error: data.error.message }), { status: 400 });
    }

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Lỗi server rồi bạn ơi' }), { status: 500 });
  }
}

