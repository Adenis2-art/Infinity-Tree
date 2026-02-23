// ************ Themes ************
var themes = [
    "default", "dark", "aqua", "neon_blue", "neon_pink", 
    "neon_green", "neon_yellow", "neon_red", "cyberpunk", 
    "matrix", "lava", "ice", "space", "void", "midnight", 
    "toxic", "ocean", "hacker"
]

var colors = {
    default: { 1: "#ffffff", 2: "#bfbfbf", 3: "#7f7f7f", color: "#dfdfdf", points: "#ffffff", locked: "#bf8f8f", background: "#0f0f0f", background_tooltip: "rgba(0, 0, 0, 0.75)" },
    dark: { 1: "#ffffff", 2: "#bfbfbf", 3: "#7f7f7f", color: "#dfdfdf", points: "#ffffff", locked: "#ff4d4d", background: "#050505", background_tooltip: "rgba(10, 10, 10, 0.85)" },
    aqua: { 1: "#bfdfff", 2: "#8fa7bf", 3: "#5f6f7f", color: "#bfdfff", points: "#dfefff", locked: "#c4a7b3", background: "#001f3f", background_tooltip: "rgba(0, 15, 31, 0.75)" },
    neon_blue: { 1: "#00f2ff", 2: "#0066ff", 3: "#003366", color: "#00f2ff", points: "#ffffff", locked: "#222222", background: "#00050a", background_tooltip: "rgba(0, 10, 20, 0.9)" },
    neon_pink: { 1: "#ff00ff", 2: "#990099", 3: "#440044", color: "#ff00ff", points: "#ffffff", locked: "#222222", background: "#0a000a", background_tooltip: "rgba(20, 0, 20, 0.9)" },
    neon_green: { 1: "#00ff00", 2: "#008800", 3: "#004400", color: "#00ff00", points: "#ffffff", locked: "#222222", background: "#000a00", background_tooltip: "rgba(0, 20, 0, 0.9)" },
    neon_yellow: { 1: "#ffff00", 2: "#888800", 3: "#444400", color: "#ffff00", points: "#ffffff", locked: "#222222", background: "#0a0a00", background_tooltip: "rgba(20, 20, 0, 0.9)" },
    neon_red: { 1: "#ff0000", 2: "#880000", 3: "#440000", color: "#ff0000", points: "#ffffff", locked: "#222222", background: "#0a0000", background_tooltip: "rgba(20, 0, 0, 0.9)" },
    cyberpunk: { 1: "#ffee00", 2: "#ff00ff", 3: "#00ffff", color: "#ffee00", points: "#00ffff", locked: "#333333", background: "#120415", background_tooltip: "rgba(30, 0, 40, 0.9)" },
    matrix: { 1: "#00ff41", 2: "#008f11", 3: "#003b00", color: "#00ff41", points: "#d1ffd1", locked: "#002200", background: "#000000", background_tooltip: "rgba(0, 20, 0, 0.95)" },
    lava: { 1: "#ff4500", 2: "#8b0000", 3: "#330000", color: "#ff4500", points: "#ffdab9", locked: "#220000", background: "#0d0200", background_tooltip: "rgba(30, 5, 0, 0.9)" },
    ice: { 1: "#afeeee", 2: "#4682b4", 3: "#191970", color: "#e0ffff", points: "#ffffff", locked: "#2f4f4f", background: "#f0f8ff", background_tooltip: "rgba(200, 230, 255, 0.8)" },
    space: { 1: "#ffffff", 2: "#4b0082", 3: "#00008b", color: "#e6e6fa", points: "#ffffff", locked: "#1a1a1a", background: "#020205", background_tooltip: "rgba(5, 5, 15, 0.9)" },
    void: { 1: "#222222", 2: "#111111", 3: "#000000", color: "#444444", points: "#666666", locked: "#050505", background: "#000000", background_tooltip: "rgba(0,0,0,1)" },
    midnight: { 1: "#34495e", 2: "#2c3e50", 3: "#1a252f", color: "#5dade2", points: "#ebf5fb", locked: "#17202a", background: "#0b0e11", background_tooltip: "rgba(10, 15, 20, 0.9)" },
    toxic: { 1: "#adff2f", 2: "#32cd32", 3: "#008000", color: "#adff2f", points: "#f0fff0", locked: "#004d00", background: "#050f00", background_tooltip: "rgba(10, 30, 0, 0.8)" },
    ocean: { 1: "#00d2ff", 2: "#3a7bd5", 3: "#004e92", color: "#00d2ff", points: "#e0f7fa", locked: "#002d52", background: "#000b14", background_tooltip: "rgba(0, 15, 30, 0.8)" },
    hacker: { 1: "#00ff00", 2: "#00dd00", 3: "#00aa00", color: "#00ff00", points: "#ffffff", locked: "#111111", background: "#0a0a0a", background_tooltip: "rgba(0,0,0,0.9)" }
}

function changeTheme() {
    let colors_theme = colors[options.theme || "default"];
    if (!colors_theme) colors_theme = colors["default"];

    let root = document.body.style;
    root.setProperty('--background', colors_theme["background"]);
    root.setProperty('--background_tooltip', colors_theme["background_tooltip"]);
    root.setProperty('--color', colors_theme["color"]);
    root.setProperty('--points', colors_theme["points"]);
    root.setProperty("--locked", colors_theme["locked"]);
    
    // Кольори ліній, щоб зв'язки було видно!
    root.setProperty('--line-1', colors_theme[1]);
    root.setProperty('--line-2', colors_theme[2]);
    root.setProperty('--line-3', colors_theme[3]);
}

// ОСЬ ЦЯ ФУНКЦІЯ БУЛА ПРОПУЩЕНА І ЛАМАЛА ГРУ
function getThemeName() {
    return options.theme ? options.theme : "default";
}

function switchTheme() {
    let index = themes.indexOf(options.theme || "default")
    index++;
    if (index >= themes.length || index < 0) index = 0; 
    
    options.theme = themes[index];
    changeTheme();
    resizeCanvas();
}