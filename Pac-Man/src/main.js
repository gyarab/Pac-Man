// soubor se zakladni konfiguraci Phaseru

/* @type {import("../typings/phaser")} */ // import typingu
// importy scen
import { MenuScene } from "./scenes/MenuScene"; 
import { PlayScene } from "./scenes/PlayScene"; 
import { PlayScene2 } from "./scenes/PlayScene2"; 
import { PlayScene3 } from "./scenes/PlayScene3"; 
import { PauseScene } from "./scenes/PauseScene"; 
import { PauseScene2 } from "./scenes/PauseScene2"; 
import { PauseScene3 } from "./scenes/PauseScene3"; 
import { LeaderBoardScene} from "./scenes/LeaderBoardScene"; 

// ohraniceni okna hry
var myCustomCanvas = document.createElement('canvas');
myCustomCanvas.id = 'myCustomCanvas';
myCustomCanvas.style = 'border: 4px solid black';

document.body.appendChild(myCustomCanvas);

// inicializace hry
let game = new Phaser.Game({
    type: Phaser.AUTO,
    width: 1280, // sirka okna
    height: 896, // vyska okna
    canvas: document.getElementById('myCustomCanvas'),
    // seznam scen
    scene: [
        MenuScene, PlayScene, PauseScene, LeaderBoardScene, PlayScene2, PauseScene2, PlayScene3, PauseScene3

    ],
    audio: {
        disableWebAudio: false
    },
    render: {
        pixelArt: true
    },
    // nastaveni fyziky (typ, gravitace, fps ..)
    physics: {
        default: "arcade",
        arcade: {
            fps: 60,
            gravity: { y: 0 },
        }
    }
});
