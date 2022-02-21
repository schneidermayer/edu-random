// create the image data
const imageWidth = 20;
const imageHeight = 8;
let imageData: boolean[] = createImageData();


// draw smiley
drawRectangle(0, 0, 20, 8);
drawDot(7, 2);
drawDot(12, 2);
drawDot(4, 4);
drawHorizontalLine(4, 5, 12);
drawDot(15, 4);
outputImage();

// draw with bresenham alg
drawLine(1, 1, 20, 5);
outputImage();

drawCircle(4, 4, 2);
outputImage();


// bresenham modification
function drawCircle(xCenter: number, yCenter: number, radius: number): void {
    let xlast = -1;
    let ylast = -1;
    let x: number, y: number;

    for (let i = 0; i <= 50; i++) {
        x = Math.floor(xCenter + (radius * Math.sin(i * 2 * (Math.PI / 50))) + 0.5);
        y = Math.floor(yCenter + (radius * Math.cos(i * 2 * (Math.PI / 50))) + 0.5);
        if (xlast != x || ylast != y) {
            xlast = x;
            ylast = y;
            drawDot(x, y);
        }
    }
}

// shoutouts bresenham to his algorithm
// ibm engineer and real OG
function drawLine(x0: number, y0: number, x1: number, y1: number): void {
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;

    // errorvariable checkt, ob in die kleinere richtung gegangen werden muss
    let err = dx - dy;

    while(true) {
        drawDot(x0, y0); // Do what you need to for this

        if ((x0 === x1) && (y0 === y1)) {
            break;
        }
        const e2 = 2 * err;
        if (e2 > -dy) {
            err -= dy; x0  += sx;
        }
        if (e2 < dx) {
            err += dx; y0  += sy;
        }
    }
}

function drawRectangle(
    x: number,
    y: number,
    width: number,
    height: number
) {
    // top
    drawHorizontalLine(x, y, width);
    // bottom
    drawHorizontalLine(x, y + height - 1, width);
    // left
    drawVerticalLine(x, y, height);
    // right
    drawVerticalLine(x + width - 1, y, height);
}

function drawHorizontalLine(x: number, y: number, length: number): void {
    for (let i = 0; i < length; i++) {
        drawDot(x + i, y);
    }
}

function drawVerticalLine(x: number, y: number, length: number): void {
    for (let i = 0; i < length; i++) {
        drawDot(x, y + i);
    }
}

function drawDot(x: number, y: number): void {
    if (isPointInImage(x, y)) {
        const index = y * imageWidth + x;
        imageData[index] = true;
    } else {
        console.error("Tried to draw out of bounds!");
    }
}

/**
 * Gets if the provided point is in the image.
 * @param x - The horizontal position within the image.
 * @param y - The vertical position within the image.
 */
function isPointInImage(x: number, y: number): boolean {
    return x >= 0 && x < imageWidth && y >= 0 && y < imageHeight;
}

/**
 * Outputs the image data state to the console.
 * @param onChar - Character to render an "on" pixel with.
 * @param offChar - Character to render an "off" pixel with.
 */
function outputImage(onChar = "x", offChar = " ") {
    let text = "";

    for (let i = 0; i < imageData.length; i++) {
        if (i > 0 && i % imageWidth === 0) {
            text += "\n"; // new line
        }

        text += imageData[i] ? onChar : offChar;
    }
    console.log(text);
    reset();
}

/**
 * Creates an array of booleans where a pixel is "on" whe
 * n the value is `true` and "off" when the value is `false`.
 *
 * The pixel values are stored in rows (row-major order) where the index of a pixel in the array can be found via:
 *
 *     index = y * imageWidth + x
 *
 * `x` is the horizontal position in the image and `y` is the vertical position from the top left corner.
 *
 * Note: This function has a return type annotation of `boolean[]`. That means it's an array of booleans.
 */
function createImageData(): boolean[] {
    // create array of size `length` containing `false` values
    const length = imageWidth * imageHeight;
    return new Array(length).fill(false);
}

function reset(): void {
    imageData = createImageData();
}
