import express from "express";
import { sendEmail } from "../utils/EmailSender.js";

const router = express.Router();

router.post("/contact", async (req, res) => {
  const { name, lastName, email, subject, message } = req.body;
  try {
    const htmlContent = `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `;
    await sendEmail(
      process.env.EMAIL_USER, // Set this in your .env file
      `Contact Form: ${subject}`,
      htmlContent
    );
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send message." });
  }
});

export default router;