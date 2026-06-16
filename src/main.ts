const COLS = 80;
const ROWS = 27;
const FONT_SIZE = 14;
const SPACING = 8;
const FONT_FAMILY = 'Courier New, Courier, monospace';
const HEADER_TEXT = 'MY ' + COLS + 'X' + ROWS + ' TERMINAL CANVAS TEXT GRID';

/*
SERVERS ASCII ART 😜
┌───────────────────────┐
│ ╭─╮         ■■■■ ■■■■ │
│ ╰─╯         ■■■■ ■■■■ │
├───────────────────────┤
│ ╭─╮         ■■■■ ■■■■ │
│ ╰─╯         ■■■■ ■■■■ │
└───────────────────────┘
 */


const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d')!;

const screenBuffer: string[][] = Array.from({ length: ROWS }, () =>
    Array(COLS).fill(' ')
);

ctx.font = `${FONT_SIZE}px ${FONT_FAMILY}`;
const textMetrics = ctx.measureText('M');
const charWidth = Math.ceil(textMetrics.width);
const charHeight = SPACING + Math.ceil(textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent);

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

writeAt(HEADER_TEXT, 0, 0);
writeAt("BABY, YOU OVERCLOCK MY PROCESSOR...", 0, 1);
writeAt("  GIVE ME YOUR SUDO ACCESS SO I CAN MOUNT YOUR DISK!", 0, 2);
writeAt(">", 0, ROWS - 1);

let cursorCol = 2;
let cursorRow = 3;
window.addEventListener('keydown', (e) => {
    //TODO: Actually think about a good way to handle this!
    if (e.key === 'Enter' && cursorCol < COLS) {
        writeAt(screenBuffer[ROWS - 1].join('').substring(1), 0, cursorRow);
        screenBuffer[ROWS - 1].fill(' ', 1);
        cursorCol = 2;
        cursorRow++;
    } else if (e.key.length === 1 && cursorCol < COLS) {
        writeAt(e.key, cursorCol, ROWS - 1);
        cursorCol++;
    } else if (e.key === 'Backspace' && cursorCol > 1) {
        cursorCol--;
        writeAt(' ', cursorCol, ROWS - 1);
    }
});