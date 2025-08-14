
export async function getRecipeFromServer(ingredients)
{
    const res = await fetch("/api/recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
    });

    if (!res.ok)
    {
        throw new Error(`Recipe API failed with status ${res.status}`);
    }

    const data = await res.json();
    return data.recipe;
}



{/*
import Anthropic from "@anthropic-ai/sdk"

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

const anthropic = new Anthropic({
    // Make sure you set an environment variable in Scrimba 
    // for ANTHROPIC_API_KEY
    apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    dangerouslyAllowBrowser: true,
})

export async function getRecipeFromChefClaude(ingredientsArr)
{
    const ingredientsString = ingredientsArr.join(", ")

    const msg = await anthropic.messages.create({
        model: "claude-3-5-sonnet-20240620",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
            { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
        ],
    });
    return msg.content[0].text
}
*/
}