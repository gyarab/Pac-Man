// inicializace promennych
var resumebutton;
var resume = false;
var menubutton;


export class PauseScene extends Phaser.Scene {
    constructor() {
        super({
            key: "PauseScene",
        })
    }
    init(data) {
    }

    preload() {

    }

    create() {
        // vytvoreni tlacitek
        resumebutton = this.add.image(643, 535, 'resume');
        menubutton = this.add.image(645, 505, 'menu');
        resumebutton.setInteractive();
        menubutton.setInteractive();

        resumebutton.on('pointerup', function (pointer) {
            resume = true;

        });
        // pri stisknuti tlacitka menu navrat do menu
        menubutton.on('pointerup', function (pointer) {
            this.scene.start("MenuScene");
            this.scene.stop("PlayScene");
            this.scene.stop();

        }, this);
    }

    update() {
        // obnoveni sceny hry
        if (resume) {
            resume = false;
            this.scene.resume("PlayScene");
            this.scene.stop();
        }
    }
}