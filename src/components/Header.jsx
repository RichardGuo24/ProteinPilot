import chefIcon from "/src/assets/Chef_Claude_Icon.png"

export default function Header()
{
    return (
        <header >
            <img src={chefIcon} />
            <h1>Protein Pilot</h1>
            <a href="">Saved Recipes</a>
        </header>
    )
}