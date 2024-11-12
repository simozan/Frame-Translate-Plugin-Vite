import { useEffect, useState } from "preact/hooks";
import { createClient } from "@supabase/supabase-js";
import "./app.css";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
);
export function App() {
  const [language, setLanguage] = useState<string>("en");

  const validateLanguage = (language: string) => {
    const supportedLanguage = ["en", "es", "fr", "de"];
    return supportedLanguage.includes(language);
  }
  

  const createRecord = async (originalText: string) => {
    if (!validateLanguage(language)) {
      console.log("Unsupported language selected:", language);
      return;
    }
    try {
      const { data } = await supabase
        .from("translations")
        .insert([{
            original_text: originalText,
            translated_text: "Gleef Translate",  
            language,
            validated: true,
        }]);
        console.log("Record added:", data);
    } catch (error) {
      console.log("Error adding record:", error);
    }
  }

  const getRecord = async () => {
    try {
       await supabase
      .from("translations")
      .select("*");
      
    } catch (error) {
      console.log("Error fetching records:", error);
    }
  }

  useEffect(()=> {
    getRecord();
  }, [])

  function translateText() {
    console.log("Selected language: ", language);
    
    parent.postMessage({ pluginMessage: { type: "getOriginalText" } }, "*");

     window.onmessage = async (event) => {
      const { pluginMessage } = event.data;

      if (pluginMessage?.type === "originalText") {
        const originalText = pluginMessage.text;
        console.log("Original text received:", originalText);

        // Store original text along with translation in Supabase
        createRecord(originalText);

        // Send translate message to Figma plugin
        parent.postMessage({ pluginMessage: { type: "translate", language } }, "*");
      }
    };
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
