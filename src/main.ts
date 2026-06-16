const COLS = 80;
const ROWS = 27;
const FONT_SIZE = 14;
const FONT_FAMILY = 'Courier New, Courier, monospace';
const HEADER_TEXT = 'MY ' + COLS + 'X' + ROWS + ' TERMINAL CANVAS TEXT GRID';

/*

 */


const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d')!;

const screenBuffer: string[][] = Array.from({ length: ROWS }, () =>
    Array(COLS).fill(' ')
);

ctx.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
const charWidth = Math.ceil(ctx.measureText('M').width);
const charHeight = Math.ceil(FONT_SIZE * 1.2);

canvas.width = COLS * charWidth;
canvas.height = ROWS * charHeight;

function renderScreen() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Render text grid
    ctx.fillStyle = '#00ff00';
    ctx.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
    ctx.textBaseline = 'top';

    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const char = screenBuffer[r][c];
            if (char !== ' ') {
                const x = c * charWidth;
                const y = r * charHeight;
                ctx.fillText(char, x, y);
            }
        }
    }
}

function writeAt(text: string, col: number, row: number) {
    for (let i = 0; i < text.length; i++) {
        const targetCol = col + i;
        if (targetCol < COLS && row < ROWS) {
            screenBuffer[row][targetCol] = text[i];
        }
    }
    renderScreen();
}

writeAt(HEADER_TEXT, Math.round((COLS - HEADER_TEXT.length) / 2), 0);
writeAt("Line 2: System initialized...", 0, 1);
writeAt(">", 0, ROWS - 1);

let cursorCol = 1;
window.addEventListener('keydown', (e) => {
    if (e.key.length === 1 && cursorCol < COLS) {
        writeAt(e.key, cursorCol, ROWS - 1);
        cursorCol++;
    } else if (e.key === 'Backspace' && cursorCol > 1) {
        cursorCol--;
        writeAt(' ', cursorCol, ROWS - 1);
    }
});