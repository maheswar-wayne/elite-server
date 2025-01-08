import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export const sendWhatsappMessage = async ({
  desc,
  phoneNumber,
  mediaUrl
}: {
  desc: string;
  phoneNumber: string;
  mediaUrl: string;
}) => {
  try {
    const message = await client.messages.create({
      from: 'whatsapp:+14155238886',
      mediaUrl: [mediaUrl],
      to: `whatsapp:${phoneNumber}`,
      body: desc
    });

    console.log(message.sid);
  } catch (error) {
    console.log("🚀 ~ error:", error)
    throw new Error('Error Sending Newsletter');
  }
};
