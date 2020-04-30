// inicializace promennych (kdyz se inicializuji v create, tak to nefunguje)
var background;
var playbutton;
var title;
var Menu = -1;
var leaderboardbutton;
var playerName;
var rules;
var continuebutton;

// trida scena, rozsiruje PhaserScene a musi se exportovat
export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: "MenuScene", active: true,  // vstupni data
        })
    }
    init(data) {




    }

    preload() { // funkce ve ktere se nactou obrazky a zvuky ze souboru assets pro vsechny sceny

        this.load.image("title", "./assets/title.png");
        this.load.image("menuBackground", "./assets/MenuBackground.jpg");
        this.load.image("menu", "./assets/Menu.png")
        this.load.image("resume", "./assets/Resume.png")

        this.load.image("play", "./assets/Play.png");
        this.load.image("leaderboard", "./assets/Leaderboard.png");

        this.load.image("PacMan", "./assets/Pacman.png")
        this.load.image("PacMan2", "./assets/PacMan2.png")
        this.load.image("RedGhost", "./assets/RedGhost.png")
        this.load.image("GreenGhost", "./assets/GreenGhost.png")
        this.load.image("PurpleGhost", "./assets/PurpleGhost.png")
        this.load.image("GreyGhost", "./assets/GreyGhost.png")
        this.load.image("BlackGhost", "./assets/BlackGhost.png")
        this.load.image("Srdce", "./assets/Srdce2.png")
        this.load.image("coin", "assets/Point.png");
        this.load.image("bonus", "assets/BonusPoint.png");

        this.load.image("rules", "./assets/Rules.png");
        this.load.image("background", "./assets/RedBackground.png");
        this.load.image("continue", "./assets/Continue.png");





    }

    create() {

        // souradnice x, y  a nazev obrazku, co se do toho da
        Menu = 0;
        
        background = this.add.image(640, 448, "background")
        title = this.add.image(640, 100, 'title');
        playbutton = this.add.image(640, 250, 'play');
        leaderboardbutton = this.add.image(640, 320, 'leaderboard');



        playbutton.setInteractive();
        leaderboardbutton.setInteractive();


        playbutton.on('pointerdown', function (pointer) {
            Menu = 1;

            playerName = prompt("Please enter your nickname", "Pacman");
            if (playerName === null) {
                playerName = "Pacman";
            }
            else {
                while (playerName.length > 20) {
                    alert('Please enter a shorter name');

                    playerName = prompt("Please enter your nickname", "Pacman");
                }
                localStorage.setItem("playerName", playerName);
            }
        });



        leaderboardbutton.on('pointerup', function (pointer) {
            Menu = 2;

        });

    }

    update() {

        if (Menu === 1) {
            
            background.destroy();
            title.destroy();
            playbutton.destroy();
            leaderboardbutton.destroy();

            rules = this.add.image(640, 448, "rules");
            continuebutton = this.add.image(1100, 828, 'continue');
            continuebutton.setInteractive();
            Menu = 0;
            continuebutton.on('pointerdown', function (pointer) {   
                Menu = 3;
            });
        }
        
        if (Menu === 3) {
            this.scene.stop();
            this.scene.start("PlayScene")
            Menu = 0;
        }
        if (Menu === 2) {
            this.scene.start("LeaderBoardScene")
            Menu = 0;
        }


    }
}