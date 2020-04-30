// PauseScene2 je analogicka k PauseScene, zmenene jsou pouze nazvy, protoze funguji stejne jsou komentare pouze v PauseScene
var resumebutton;
var resume = false;
var menubutton;

export class PauseScene2 extends Phaser.Scene {
    constructor() {
        super({
            key: "PauseScene2",
        })
    }

    init(data) {
    }

    preload() {
    }

    create() {

        resumebutton = this.add.image(643, 535, 'resume');
        menubutton = this.add.image(645, 505, 'menu');
        resumebutton.setInteractive();
        menubutton.setInteractive();

        resumebutton.on('pointerup', function (pointer) {
            resume = true;

        });
        menubutton.on('pointerup', function (pointer) {
            this.scene.start("MenuScene");
            this.scene.stop("PlayScene2");
            this.scene.stop();

        }, this);
    }

    update() {
        if (resume) {
            resume = false;
            this.scene.resume("PlayScene2");
            this.scene.stop();
        }
    }
}