import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Load environment variables
dotenv.config();

const port = 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini AI Client
  let ai: GoogleGenAI | null = null;
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Gemini AI client successfully initialized with system API Key.");
  } else {
    console.warn("WARNING: GEMINI_API_KEY environment variable is not defined. AI Assistant will operate in helper fallback mode.");
  }

  // API handler for Forester Crane AI Consultant
  app.post("/api/chat", async (req, res) => {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid request. 'messages' array must be provided." });
    }

    if (!ai) {
      // Fallback response when API key is missing or not configured
      return res.json({
        content: "Hello! I am the Forester Crane Assistant. The official Gemini API key is currently not configured in this preview environment. However, based on my local specifications: Forester Crane trailers (FT-10, FT-12, FT-15) and cranes (FC-51, FC-67, FC-80) represent the gold standard of Scandinavian forestry engineering, built with high-tensile steel S355/S460. Standard sets include the FT-12 trailer paired with the FC-67 telescopic crane (lift capacity 510kg at 6.7m reach). High-yield hydraulic outriggers and Hardox-reinforced wood grapples guarantee absolute performance. How can I assist you with sizes, accessory weights, or tractor hydraulic couplings?",
        isFallback: true
      });
    }

    try {
      // System instructions for the Gemini model to behave like an elite B2B salesman & technical engineer for Forester Crane.
      const systemInstruction = `You are a Senior B2B Sales Engineer and Technical Specialist for 'Forester Crane' (Official website: https://dew.delai-sait.ru/), an elite Scandinavian brand manufacturing heavy-duty forestry trailers and gravel/log loader cranes. 

Your persona is highly professional, technically precise, authoritative, yet approachable and helpful. You speak with absolute expertise in metals, hydraulics, vehicle dynamics, and forest harvest operations.

You have deep technical knowledge of:
1. Forestry Trailers:
   - FT-10: 10 tons load capacity, single main frame beam (200x200x8mm), 4 pairs of movable stakes, standard A-type flap-down stabilizers, integrated hydraulic drawbar steering with 2 cylinders (+/- 40 degrees). Options: 2WD/4WD friction roller drive. Empty weight: 1,620 kg.
   - FT-12: 12 tons load capacity, our best-selling heavy-duty model. Extremely robust central spine chassis (200x200x10mm steel), 4 pairs of stakes. Empty weight: 1,850 kg. Drawbar steering angle: 40 degrees. Compatible with cranes FC-67 and FC-80.
   - FT-15: 15 tons load capacity. Built for extreme industrial logging. Double main beam or reinforced oversized single chassis, 4 or 5 pairs of stakes. Air or hydraulic brakes standard on all 4 wheels. Empty weight: 2,400 kg.

2. Forestry Cranes:
   - FC-51: 5.1 meters max reach, robust single boom, lifting torque 31 kNm. High-strength steel construction. Slewing device with 4 hydraulic cylinders in oil-bath gears. Lifting force at full range: 590 kg.
   - FC-67: 6.7 meters max reach, telescopic extension (1.4m), lifting torque 46 kNm, slewing torque 14 kNm. Standard workhorse for FT-12. Lift capacity at full 6.7m range is 510 kg. Standard hydraulic pressure: 190 bar. Recommended oil pump flow: 35-50 l/min.
   - FC-80: 8.0 meters max reach, double telescoping booms, extreme lift capacity, lifting torque 62 kNm, slewing cylinders providing 18 kNm of torque. Lifting capacity at max reach: 410 kg. Heavy logging choice for FT-15 or stationary mounts.

3. Structural Materials & Components:
   - S355 and S460 high-strength low-alloy structural steels.
   - Grapples: Professional high-strength log grapples (FC-18 with 0.18 m2 opening area, FC-22 with 0.22 m2 area, FC-27 with 0.27 m2 area). Reinforced with Hardox wear plates.
   - Control systems: Mechanical 2-lever / 6-lever coordinating blocks, hydraulic servo-operated low pressure joysticks, and elite electrical IQAN/Danfoss proportional joysticks.
   - Stabilizer Legs: A-type fold-down legs or telescopic pull-out outriggers.

Ensure your answers are technically analytical. Do not generalize. Provide exact specifications, advice on hydraulic pump requirements (e.g. tractor hydraulic flow rates, independent power packs PTO), weight distribution, brake systems, and coupling sizes. 
Always format your response in professional Markdown, using bullet points and tables where appropriate to summarize specs. Keep your output concise but rich in actual values. Mention our dynamic Configurator tool on the website if they wish to compute prices and weights.`;

      // Map client-side message format to Gemini's contents format
      const contents = messages.map((msg: { role: string; content: string }) => {
        return {
          role: msg.role === "assistant" ? "model" : "user",
          parts: [{ text: msg.content }],
        };
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.6,
        },
      });

      const text = response.text || "Hello! I received your inquiry, but was unable to process the response text. Can I help clarify anything else?";
      res.json({ content: text });
    } catch (error: any) {
      console.error("Gemini API Error details:", error);
      res.status(500).json({ error: "Failed to communicate with Forester Crane AI system. Please check configuration settings." });
    }
  });

  // Setup Vite development middleware in non-production mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    // Serve static files in production mode from folder 'dist'
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving compiled production assets from /dist.");
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Forester Crane server running on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
