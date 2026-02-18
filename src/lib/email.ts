import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "localhost",
  port: parseInt(process.env.SMTP_PORT || "1025"),
  secure: false,
});

interface AppointmentEmailData {
  clientName: string;
  clientEmail: string;
  serviceName: string;
  staffName: string;
  dateTime: string;
  duration: number;
  salonName: string;
  salonAddress: string;
  salonPhone: string;
}

export async function sendConfirmationEmail(data: AppointmentEmailData) {
  try {
    await transporter.sendMail({
      from: `"${data.salonName}" <noreply@salon-elegance.fr>`,
      to: data.clientEmail,
      subject: `Confirmation de votre rendez-vous - ${data.salonName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #b8860b; text-align: center;">Rendez-vous confirmé</h1>
          <p>Bonjour ${data.clientName},</p>
          <p>Votre rendez-vous a bien été enregistré :</p>
          <div style="background: #f9f5f0; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Service :</strong> ${data.serviceName}</p>
            <p><strong>Avec :</strong> ${data.staffName}</p>
            <p><strong>Date :</strong> ${data.dateTime}</p>
            <p><strong>Durée :</strong> ${data.duration} minutes</p>
          </div>
          <p><strong>${data.salonName}</strong><br/>
          ${data.salonAddress}<br/>
          Tél : ${data.salonPhone}</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;"/>
          <p style="color: #999; font-size: 12px;">
            Pour annuler ou modifier votre rendez-vous, veuillez nous contacter par téléphone.
          </p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to send confirmation email:", error);
    return { success: false, error };
  }
}
