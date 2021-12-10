# Canvas-GUI-and-Image

Implement graphics drawing and GUI interaction in HTML5 at three different levels: vector graphics (SVG), raster graphics (Canvas API) and raw raster data (Image processing).
 
Part 1: Simple Graphics – Vector and Raster
Q1) PacMan graphics:
Recreate the image containing PacMan Ghost BLINKY using two techniques: a) Canvas API, using paths and text b) SVG, using path/poly tags and text tag.
Q2) Modifying graphics after user’s click:
We want to add interactivity to the graphics: when the user clicks on it, it will change color and change the name of the ghost, and cycle through all 4 of them: CLYDE (orange), BLINKY (red), PINKY (pink), INKY (cyan).

Part 2: Interactive Drawing
Objective: We want to develop a drawing app that allows the user to create and modify polygons in the 2D Canvas, by using the Model-View-Controlled approach.
Q1) Drawing shapes:
Use case: We want to draw an arbitrary polygon with its vertices numbers at startup on the canvas.
Q2) Selecting and moving vertices:n when the user clicks several times. If the click is not close to any vertex, unselect the currently selected vertex.
Use case: We want to let the user select a vertex of the polygon by clicking close to it on the canvas and move it around using the keyboard. The selected vertex should appear in a different color. If the click is not close to any vertex, unselect the currently selected vertex.
Q3) Adding and removing vertices:
a) When the user presses the key ‘-‘, remove the current vertex. All remaining vertices should be reorganized in the pts array, and the id of the current vertex also, before redrawing.
b) When the user presses the key ‘+’, add a vertex located as the midpoint between the current vertex and the next vertex, then redraw.
Q4) Dragging vertices:
Let the user move the position of the selected vertex by dragging the mouse (mousedown, move, mouseup). The display (of the polygon and its bounding box) should be refreshed after each mouseMove until the mouse button is released.

Part 3: Chroma-key
Objective: Implement image processing at the raw raster data level. The application is the chroma- key technique to replace the green background by another image.
Q1) Gray-scale image representation and display [10]
Using the data structures ImageData and DoubleData described in appendix and associated functions perform the following:
a) When user clicks button “Load”, load image “shelley4.jpg” into canvas1 and “montage.png” into canvas2. Resize the images to fit the 256x256 size of the canvas.
Caution: since loading is not synchronous, you need to draw the image in the canvas AFTER is has loaded (use the onload callback for the Image object).
b) When user clicks button “To gray”, convert the RGBA content of canvas1 into a grey-level DoubleImage representation and display it in canvas3.
Q2) Chroma-key segmentation [10]
a) Write a function detectChroma(image, mask) that detects the pixels of the background: it sets the corresponding value of mask to 255 for background pixels, and to 0 for other pixels. image is in ImageData format, mask is in DoubleData format.
b) When user clicks button “Chroma-Key”, use previous function to segment the green background of the canvas and display the mask as a black/white image in canvas3 (white for background and black for foreground).
Q3) Alpha-compositing [10]
a) Write a function compositing(image1, image2, mask, image3) that copies all foreground pixels from image1 and the background pixels from image2 based on mask, and outputs the result in image3. image1, image2 and image3 are in ImageData format, mask is in DoubleData format.
b) When the user clicks button “Compose”, use previously defined functions to display in canvas3 the result of the alpha composition of canvas1 and canvas2 with the mask of Q2.
