import express from 'express';

const contactRouter = express.Router();

contactRouter.post('/send', (req, res) => {
    // Logic to save message or send email (Nodemailer)
    res.json({ success: true, message: "Message received" });
});

export default contactRouter;