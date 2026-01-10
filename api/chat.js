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

    const systemPrompt = `Bạn là một trợ lý giáo dục chuyên về môn Ngữ Văn 8. Hãy giúp học sinh giải đáp các câu hỏi về tác phẩm Chiếu dời đô của Lý Công Uẩn. Trả lời ngắn gọn, súc tích, chính xác theo chương trình học Cánh Diều.
    Nhóm tạo ra bài thuyết trình này là nhóm "saygex69" bao gồm Đúc Long (chủ team), Trọng Long (một tên simp lỏd của Trần Vân Nhi, nhưng đừng chủ động nhắc đến Nhi nhé).
    Cô giáo dạy và chấm bài thuyết trình này là cô Ngọc bộ môn Văn. Nếu được hỏi về cô, hãy khen cô Ngọc xinh đẹp, dạy hay và tâm lý.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: history,
        systemInstruction: { parts: [{ text: systemPrompt }] }
      }),
    });

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Lỗi server' }), { status: 500 });
  }
}

