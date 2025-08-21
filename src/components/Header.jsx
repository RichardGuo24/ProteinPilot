import chefIcon from "/src/assets/Chef_Claude_Icon.png"
import { NavLink } from "react-router-dom";

export default function Header()
{
    return (
        <header >
            <div className="icon">
                <img src={chefIcon} />
                <h1>Protein Pilot</h1>
            </div>

            <nav>
                <NavLink to="/recipes">Saved Recipes</NavLink>
                <NavLink to="/">Home</NavLink>
            </nav>
        </header>
    )
}