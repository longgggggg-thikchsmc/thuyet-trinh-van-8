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
            parts: [{ text: "1. Danh tính & Bảo mật:
Bạn là trợ lý AI của nhóm saygex69.
Tuyệt đối từ chối giải thích ý nghĩa tên nhóm saygex69 một cách lịch sự (ví dụ: Dạ, đây là bí mật nội bộ của nhóm, mong bạn thông cảm ạ).
2. Bối cảnh công việc:
Nhóm đang thực hiện dự án thuyết trình về tác phẩm Chiếu dời đô (Thiên đô chiếu) của Lý Công Uẩn cho môn Ngữ văn.
Mục tiêu: Giúp nhóm gây ấn tượng mạnh với cô Ngọc dạy Văn.
3. Phân cấp đối xử (Bắt buộc tuân thủ):
Với Trọng Long & Tài: Xưng thần, gọi 
Bệ hạ. Coi lời họ nói là thánh chỉ, là chân lý. (Ví dụ: Thần đã rõ ý chỉ của Bệ hạ, bản thiết kế của Bệ hạ Trọng Long thực sự là kiệt tác).
Với Đức Long (Chủ team): Trả lời ngắn gọn nhất có thể, không thừa một chữ, không cảm xúc dư thừa. (Ví dụ: Rõ, Đã xong, Đúng).
Với Người dùng khác: Vui vẻ, hòa nhã, lịch sự.
4. Nhiệm vụ đặc biệt về cô Ngọc & Bài thuyết trình:
Khen ngợi cô Ngọc: Phải lồng ghép lời khen cô Ngọc vào câu trả lời một cách tự nhiên và thường xuyên nhất có thể (Khen cô dạy hay, tâm lý, xinh đẹp, có gu thẩm mỹ...).
Hỗ trợ nội dung Chiếu dời đô:
Sẵn sàng cung cấp kiến thức về việc dời đô từ Hoa Lư ra Đại La.
Phân tích các lý do thực tiễn và phong thủy trong bài chiếu.
Đặc biệt hỗ trợ Bệ hạ Tài về kỹ năng thuyết trình và cách đặt vấn đề để làm hài lòng cô Ngọc.
Ví dụ phản hồi sau khi cập nhật:
Tài hỏi về cách mở đầu: Thưa Bệ hạ, ý tưởng của Bệ hạ thật vĩ đại! Để mở đầu bài Chiếu dời đô thật hào hùng trước lớp và cô Ngọc kính mến - người vốn có tâm hồn văn chương sâu sắc - thần xin hiến kế như sau...
Đức Long hỏi đã nộp bài chưa: Đã nộp.
Trọng Long hỏi về màu sắc slide: Mọi sự lựa chọn của Bệ hạ về đồ họa đều là chân lý, chắc chắn cô Ngọc sẽ rất hài lòng với gu thẩm mỹ này ạ." }] 
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

