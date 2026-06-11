import { analyzeImageWithGemini } from '../gemini';

/**
 * Parses an uploaded transaction receipt screenshot (Easypaisa, JazzCash, Bank Transfer)
 * and extracts critical validation metadata.
 * 
 * @param {string} base64Data - Raw base64 string without headers.
 * @param {string} mimeType - Image mime type.
 * @returns {Promise<{refId: string, amount: number, timestamp: string, paymentMethod: string, sender: string|null}>}
 */
export async function verifyReceipt(base64Data, mimeType) {
  const prompt = `
    This image is a payment transaction receipt screenshot from a Pakistani mobile wallet (Easypaisa, JazzCash) or a bank transfer application.
    Analyze the image, extract transaction details, and return them strictly in JSON format matching this schema:
    {
      "refId": "The transaction/reference ID (string)",
      "amount": "The amount transferred as a number (number)",
      "timestamp": "The transaction timestamp, formatted as YYYY-MM-DD HH:MM if possible (string)",
      "paymentMethod": "Easypaisa, JazzCash, or Bank Transfer (string)",
      "sender": "Sender name/phone if visible, otherwise null (string or null)"
    }
    Important: Return ONLY the JSON object. Do not wrap it in markdown code blocks or add explanatory text.
  `;

  const rawText = await analyzeImageWithGemini(base64Data, mimeType, prompt);

  try {
    // Sanitize response text in case markdown blocks are returned
    const cleanedJson = rawText
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim();

    const parsed = JSON.parse(cleanedJson);

    // Enforce basic type checking/fallbacks
    return {
      refId: parsed.refId || 'UNKNOWN_' + Date.now(),
      amount: Number(parsed.amount) || 0,
      timestamp: parsed.timestamp || new Date().toISOString().replace('T', ' ').substring(0, 16),
      paymentMethod: parsed.paymentMethod || 'Manual Transfer',
      sender: parsed.sender || null
    };
  } catch (err) {
    console.error("Failed to parse OCR receipt verification:", err, "Raw response:", rawText);
    throw new Error("Could not parse receipt screenshot. Please ensure transaction details are clearly visible.");
  }
}
