const express = require("express");
const { mapCSVFields } = require("../services/geminiService");

const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    console.log("Received CSV:");
    console.log(req.body);

    const aiResult = await mapCSVFields(req.body);

    console.log("AI Result:");
    console.log(aiResult);

    return res.json({
      success: true,
      message: "AI Mapping Completed Successfully",
      aiResult,
      summary: aiResult.summary,
      records: aiResult.records,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
});

module.exports = router;