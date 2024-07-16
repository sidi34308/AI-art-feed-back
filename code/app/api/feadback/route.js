// pages/api/feedback.js

export default function handler(req, res) {
  if (req.method === "POST") {
    const { tags, feedback, selectedImage } = req.body;
    // Process the feedback submission here
    res.status(200).json({ message: "Feedback received successfully!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
