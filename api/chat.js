export default async function handler(req) {
  // Kiểm tra phương thức request
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }

  try {
    const { history } = await req.json();
    
    // Đảm bảo lấy đúng API Key từ môi trường Vercel
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(JSON.stringify({ error: { message: "API Key chưa hoạt động. Hãy Redeploy dự án!" } }), { status: 500 });
    }

    const MODEL_NAME = "gemini-2.5-flash-preview-09-2025";

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: history,
        systemInstruction: { 
            parts: [{ text: "Bạn là trợ lý AI của nhóm saygex69, đang thuyết trình bài Chiếu dời đô. Hãy xưng thần với Bệ hạ Tài và Trọng Long, khen cô Ngọc xinh đẹp." }] 
        }
      }),
    });

    const data = await response.json();

    // Trả về dữ liệu cho trình duyệt
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: { message: error.message } }), { status: 500 });
  }
}
