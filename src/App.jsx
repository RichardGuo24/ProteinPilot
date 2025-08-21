import Header from "./components/Header.jsx"
import Main from "./components/Main.jsx"


import { BrowserRouter, Route, Routes } from "react-router-dom"
import SavedRecipes from "./components/SavedRecipes.jsx"


export default function App()
{
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/recipes" element={<SavedRecipes />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </>

  )
}