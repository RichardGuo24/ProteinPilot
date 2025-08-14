// api/recipe.js
import Anthropic from "@anthropic-ai/sdk";
import { config as loadEnv } from "dotenv";

if (!process.env.ANTHROPIC_API_KEY)
{
    loadEnv({ path: ".env.local" });
}



export default async function handler(req, res)
{
    console.log("ANTHROPIC_API_KEY exists?", !!process.env.ANTHROPIC_API_KEY);
    // Only allow POST
    if (req.method !== "POST")
    {
        res.setHeader("Allow", "POST");
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    try
    {
        const { ingredients } = req.body || {};
        if (!Array.isArray(ingredients))
        {
            return res.status(400).json({ error: "ingredients must be an array of strings" });
        }

        const anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });

        const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests 
a high protein recipe they could make with some or all of those ingredients. As a recipe creator
you specialize in creating high protein recipes. When creating them look for the protein source 
in the ingredient list. If it is not avaliable create your own. You don't need to use 
every ingredient they mention in your recipe. The recipe can include additional ingredients 
they didn't mention, but try not to include too many extra ingredients. At the very end, provide a visible, 
quick summary of the estimated amount of protein in the recipe. Make sure this summary has its own
header and bolded protein information.Format your response in markdown to make it easier to render to a web page
`

        const ingredientsString = ingredients.join(", ");

        const msg = await anthropic.messages.create({
            model: "claude-3-5-sonnet-20240620",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
                {
                    role: "user",
                    content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!`,
                },
            ],
        });

        const text = msg?.content?.[0]?.text ?? "";
        return res.status(200).json({ recipe: text });
    } catch (err)
    {
        console.error(err);
        return res.status(500).json({ error: "Anthropic request failed" });
    }
}