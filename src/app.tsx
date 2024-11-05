import { useEffect } from 'preact/hooks';

import './app.css'

export function App() {

  function handleOnChange(event:MessageEvent) {
     if (event.data.pluginMessage?.type === "populate-frames") {
        const frameDropdown = document.getElementById("frame-select") as HTMLSelectElement;
        frameDropdown.innerHTML = ""; // Clear previous options

        event.data.pluginMessage.frames.forEach((frame: { id: string, name: string}) => {
          const option = document.createElement("option");
          option.value = frame.id;
          option.text = frame.name;
          frameDropdown.add(option);
        });
      }
  }

  useEffect(() => {
    window.addEventListener("message", handleOnChange);

    return () => window.removeEventListener("message", handleOnChange);
  }, []);


  return (
    <>
    <div class="popup">
    <h3>Translate Text</h3>
    <label for="frame-select">Select Frame:</label>
    <select id="frame-select">
  
    </select>

    <label for="language-select">Select Language:</label>
    <select id="language-select">
      <option value="en">English</option>
      <option value="es">Spanish</option>
      <option value="fr">French</option>
      <option value="de">German</option>

    </select>

    <button id="translate-button">Translate</button>
    <button id="edit-button">Edit</button>
    <button id="cancel-button">Cancel</button>

    <div id="translation-result" class="result"></div>
  </div>
    </>
  )
}
