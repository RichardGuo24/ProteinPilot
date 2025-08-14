import React from "react"



import IngredientList from "./IngredientList";
import ClaudeRecipe from "/src/components/ClaudeRecipe.jsx"
import { getRecipeFromServer } from "/src/apiClient.js"


export default function Main()
{
    const PROTEINS = [
        "Chicken breast", "Chicken thighs", "Ground beef", "Beef steak",
        "Pork loin", "Bacon", "Turkey", "Salmon", "Tuna", "Shrimp",
        "Eggs", "Tofu", "Tempeh", "Seitan", "Lentils", "Chickpeas", "Black beans"
    ];
    const [ingredientList, setIngredientList] = React.useState([]);
    const [protein, setProtein] = React.useState("")
    const [recipe, setRecipe] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    function addIngredient(formData)
    {
        const newIngredient = formData.get("ingredient")
        if (newIngredient === "")
        {
            return;
        }
        setIngredientList(prev => [...prev, newIngredient])
    }

    function proteinChange(event)
    {
        setProtein(event.target.value)
    }

    async function getRecipe()
    {
        setLoading(true)
        try
        {
            const recipeMarkdown = await getRecipeFromServer([...ingredientList, protein]);
            setRecipe(recipeMarkdown)
        } finally
        {
            setLoading(false)
        }
    }

    return (
        <main>
            <div className="choosing-ingredients">
                <div className="protein-group">
                    <select
                        className="protein-select"
                        onChange={proteinChange}
                        name="protein"
                        value={protein}
                    >
                        <option value="" disabled>SELECT A PROTEIN</option>
                        {PROTEINS.map(pro => <option key={pro} value={pro}>{pro}</option>)}
                    </select>
                    <button className="protein-clear" onClick={() => setProtein("")}>Clear</button>
                </div>
                <form className="add-ingredient-form" action={addIngredient}>
                    <input
                        type="text"
                        placeholder="e.g. oregano"
                        aria-label="Add ingredients"
                        name="ingredient"
                    />

                    <button>Add Ingredient</button>
                </form>
            </div>

            {ingredientList.length > 0 && protein != "" &&
                <IngredientList
                    getRecipe={getRecipe}
                    ingredientList={ingredientList}
                />
            }
            {recipe ? <ClaudeRecipe recipe={recipe} /> : null}
            {loading ? <h1>Loading cuh</h1> : null}
        </main>
    )
}