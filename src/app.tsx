import { useState } from "preact/hooks";
import "./app.css";

export function App() {
  const [language, setLanguage] = useState("en");

  function translateText() {
    console.log("Selected language: ", language);
    parent.postMessage({ pluginMessage: { type: "translate", language: language  } }, "*");
  }

  function editText() {
    parent.postMessage({ pluginMessage: { type: "edit" } }, "*");
  }

  function handleCancel() {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  }

   const handleLanguageChange = (e: Event) => {
    const target = e.target as HTMLSelectElement;
    setLanguage(target.value);
  };

  return (
    <>
      <h2>"Gleef Translate"</h2>
      <p>Select a frame and translate the text to "Gleef Translate"</p>

      <label htmlFor="language-select">Choose a language:</label>
      <select
        id="language-select"
        value={language}
        onChange={handleLanguageChange}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
        <option value="de">German</option>
      </select>

      <button id="translate-text" onClick={translateText}>Translate</button>
      <button id="edit-text" onClick={editText}>Edit</button>
      <button id="cancel" onClick={handleCancel}>Cancel</button>
    </>
  );
}
