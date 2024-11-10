// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
// Show the plugin UI
figma.showUI(__html__, {
  height: 500,
  width: 500,
});

const originalTextMap = new Map<string, string>();

figma.ui.onmessage = async (msg) => {
  const selection = figma.currentPage.selection;

  if (msg.type === "translate") {

     const targetLanguage = msg.language;

    for (const node of selection) {
      if (node.type === "FRAME") {
        const textNodes = node.findAll((child) => child.type === "TEXT") as TextNode[];

        // The necessary font before changing text
        await figma.loadFontAsync({ family: "Inter", style: "Regular" });

        // Translate to "Gleef Translate"
        for (const textNode of textNodes) {

          originalTextMap.set(textNode.id, textNode.characters);
          textNode.characters = ` "Gleef Translate"`;
          // textNode.characters = `Translated to ${targetLanguage}: ${textNode.characters}`;

          // textNode.characters = "Gleef Translate";
        }
      }
    }
  }

  if (msg.type === "edit") {
    for (const node of selection) {
      if (node.type === "FRAME") {
        const textNodes = node.findAll((child) => child.type === "TEXT") as TextNode[];

        // Select each text node 
        figma.currentPage.selection = textNodes;
        figma.viewport.scrollAndZoomIntoView(textNodes);
        figma.notify("Text is now editable. Click on a text field to type.");
      }
    }
  }

  if (msg.type === "cancel") {
    figma.closePlugin();
  }
};


