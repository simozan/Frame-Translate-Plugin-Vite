// This plugin will open a window to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for plugins. Code in this file has access to
// the *figma document* via the figma global object.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (See https://www.figma.com/plugin-docs/how-plugins-run).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, {
  height: 500,
  width: 500,
});

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage =  async (msg) => {

  if(msg.type === 'translate') {
    const selectedFrameId = msg.frameId;
    const targetLanguage = msg.language;

    const selectedFrame = figma.getNodeById(selectedFrameId) as FrameNode;
     
    if (selectedFrame && selectedFrame.type === 'FRAME') {
      const textNodes = selectedFrame.findAll(node => node.type === 'TEXT') as TextNode[];
      let originalTexts = textNodes.map(node => node.characters);

      const tarnslatedTexts = originalTexts.map(text => `[Translated ${targetLanguage}]: ${text}`);

      textNodes.forEach((node, index) => {
        node.characters = tarnslatedTexts[index];
      });

      figma.ui.postMessage({ type: 'translation-done' });
    }
  }

  if (msg.type ==='cancel') {
    figma.closePlugin();
  }


}