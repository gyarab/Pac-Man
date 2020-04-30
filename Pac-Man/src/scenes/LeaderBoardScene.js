// inicializace promennych
var backsbutton;
var back = false;
var scoreText = [];
var nameText = [];
var scoreField = [];
var x;
var title;
var background;

export class LeaderBoardScene extends Phaser.Scene {
    constructor() {
        super({
            key: "LeaderBoardScene",
        })
    }

    preload() {
        this.load.image("back", "./assets/Back2.png");
    }

    create() {
        // vytvoreni tlacitek z obrazku
        background = this.add.image(640,448,"background")
        title = this.add.image(640, 100, 'title');
        backsbutton = this.add.image(160, 850, 'back');
        backsbutton.setInteractive();

        backsbutton.on('pointerup', function (pointer) {
            back = true;


        });

        // nacteni skore a pridani nove serazeneho skore do pameti prohlizece
        
        scoreField = JSON.parse(localStorage.getItem("score"));
      
        for (var i = 0; i < 10; i++) {
            scoreText.push(this.add.text(800, 198 + i * 65));
            nameText.push(this.add.text(400, 198 + i * 65));

        }
        if (scoreField !== null && scoreField !== undefined) {
            x = scoreField.length;
            if (x > 10) {
                x = 10;
            }
            for (var i = 0; i < 10; i++) {
                if (i < x) {
                    scoreText[i].setText(" " + scoreField[i].score);
                    nameText[i].setText(i + 1 + ": " + scoreField[i].playerName);
                }
                else {
                    nameText[i].setText(i + 1 + ": ");
                }
            }
        }
        else {
            for (var i = 0; i < 10; i++) {
                scoreText[i].setText(i + 1 + ": ");
            }
        }

    }
    update() {
        // pri stisknuti back se znovu spusti scena s menu
        if (back) {
            this.scene.start("MenuScene");
            back = false;
            scoreText = [];
            nameText = [];
            scoreField = [];
        }

    }
}