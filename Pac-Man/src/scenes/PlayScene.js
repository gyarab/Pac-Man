// inicializace promennych 

var keys;
var PacMan;
var RedGhost;
var GreenGhost;
var PurpleGhost;
var GreyGhost;
var CoinLayer;
var BonusLayer;
var coins;
var bonus;
var coinScore = 0;
var totalScore;
var level = 1;
var topLayer;
var map;
var terrain;
var bonusF;
var text;

var tileset;
var properties;
var acceptableTiles = [];

var bonusFCheck;
var esc;
var resume;

var lives = 3;
var speed = 320;

var Srdce1;
var Srdce2;
var Srdce3;

var timedEvent;
var scoreField = [];
var spawn = 0;

// promenne se souradnicemi znovuobjeveni duchu a PacMana v případě kolize a ubrání života

var PacManRespawnX = 656;
var PacManRespawnY = 592;

var RedGhostRespawnX = 656;
var RedGhostRespawnY = 336;
var RedGhostDeadX = 640;
var RedGhostDeadY = 432;

var GreenGhostRespawnX = 1232;
var GreenGhostRespawnY = 464;
var GreenGhostDeadX = 658;
var GreenGhostDeadY = 400;

var PurpleGhostRespawnX = 48;
var PurpleGhostRespawnY = 464;
var PurpleGhostDeadX = 623;
var PurpleGhostDeadY = 400;

var GreyGhostRespawnX = 656;
var GreyGhostRespawnY = 848;
var GreyGhostDeadX = 640;
var GreyGhostDeadY = 464;

// promenna se souradnicemi pohybu duchu

var GreenTargetValue = 1;
var GreenTargetCoordinateX;
var GreenTargetCoordinateY;

var PurpleTargetValue = 1;
var PurpleTargetCoordinateX;
var PurpleTargetCoordinateY;

var GreyTargetValue = 1;
var GreyTargetCoordinateX;
var GreyTargetCoordinateY;

var finder;
var finder2;
var finder3;
var finder4;
var grid;

// metody cele sceny

// metoda, ktera vypocita a vrati vzdalenost mezi 2 body
function distance(x1, y1, x2, y2) {
    var dx = x1 - x2;
    var dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);
}

// metoda, ktera vrati ID tile na dane souradnici
function getTileID(x, y) {
    var tile = map.getTileAt(x, y);
    return tile.index;
};

// metoda, ktera se spusti pri kolizi PacMana s coinem, odstrani dany coin z herni plochy a pricte score, ktere zaroven aktualizuje
function collectCoin(PacMan, coin) {
    coin.destroy(coin.x, coin.y);
    coinScore++;
    totalScore++;
    text.setText(`Nickname: ${localStorage.getItem("playerName")}   Score: ${totalScore}`)

    return false;
}

// metoda, ktera se spusti pri kolizi PacMana s bonusem, odstrani dany bonus z herni plochy a aktivuje ho, dale pricte a aktualizuje skore
function collectBonus(PacMan, bonus) {
    // pokud je efekt bonusu aktivni v dobe sebrani dalsiho bonusu, nastavi se promenna bonusFCheck, aby došlo s prodloužení trvání bonusu
    if (bonusF === true) {
        bonusFCheck = true;
    }
    bonus.destroy(bonus.x, bonus.y);
    totalScore = totalScore + 5;
    text.setText(`Nickname: ${localStorage.getItem("playerName")}   Score: ${totalScore}`)
    bonusF = true;
    RedGhost.setTexture("BlackGhost");

    // zastavi duchy a nastavi jim odlisnou texturu
    PurpleGhost.setTexture("BlackGhost");
    PurpleGhost.setVelocityX(0);
    PurpleGhost.setVelocityY(0);

    GreenGhost.setTexture("BlackGhost");
    GreenGhost.setVelocityX(0);
    GreenGhost.setVelocityY(0);

    GreyGhost.setTexture("BlackGhost");
    // casovana udalost, ktera se spusti po 3s, opet probudi duchy a nastavi jim puvodni texturu
    timedEvent = this.time.delayedCall(3000, waitEvent, [], this);
    function waitEvent() {

        // pokud hrac nesebral druhy bonus v dobe trvani prvniho bonus skonci
        if (bonusFCheck === false) {

            RedGhost.setTexture("RedGhost");
            PurpleGhost.setTexture("PurpleGhost");
            GreenGhost.setTexture("GreenGhost");
            GreyGhost.setTexture("GreyGhost");

            // vypne aktivni bonus
            bonusF = false;

        }

        bonusFCheck = false;

    }
    return false;
}

// metoda, ktera se spusti pri kolizi ducha a PacMana, celkem jsou 4 pro kazdeho ducha je 1 metoda
function damageR() {
    // pokud neni aktivni bonus
    if (bonusF === false) {

        // pozastavi hru, nastavi puvodni polohu duchum a PacMan
        this.scene.pause();
        this.scene.launch("PauseScene");

        keys.W.isDown = false;
        keys.A.isDown = false;
        keys.S.isDown = false;
        keys.D.isDown = false;

        resume = true;

        PurpleGhost.setVelocityX(0)
        PurpleGhost.setVelocityY(0)
        GreenGhost.setVelocityX(0)
        GreenGhost.setVelocityY(0)

        PacMan.setVelocityX(0)
        PacMan.setVelocityY(0)
        PacMan.x = PacManRespawnX;
        PacMan.y = PacManRespawnY;

        RedGhost.x = RedGhostRespawnX;
        RedGhost.y = RedGhostRespawnY;

        PurpleGhost.x = PurpleGhostDeadX;
        PurpleGhost.y = PurpleGhostDeadY;

        GreyGhost.x = GreyGhostDeadX;
        GreyGhost.y = GreyGhostDeadY;

        GreenGhost.x = GreenGhostDeadX;
        GreenGhost.y = GreenGhostDeadY;

        // ubere zivot
        lives = lives - 1;

        // promenna ktera spousti znovuobjevovani duchu
        spawn = 0;

        return false;
    }
    // v pripade, ze je bonus aktivni pricte hraci skore a posle ducha do vezeni do doby nez se znovu objevi
    else {
        var test = lives;
        totalScore = totalScore + 10;
        text.setText(`Nickname: ${localStorage.getItem("playerName")}   Score: ${totalScore}`)
        RedGhost.x = RedGhostDeadX;
        RedGhost.y = RedGhostDeadY;
        // casovana udalost, kdy se po 3s znovuobjevi duch
        timedEvent = this.time.delayedCall(3000, respawnEvent, [], this);
        function respawnEvent() {
            if (lives === test) {
                RedGhost.x = RedGhostRespawnX;
                RedGhost.y = RedGhostRespawnY;

            }
        }
    }
}

// identicka metoda jako predchozi jen pro zeleneho ducha
function damageG() {
    if (bonusF === false) {

        this.scene.pause();
        this.scene.launch("PauseScene");
        keys.W.isDown = false;
        keys.A.isDown = false;
        keys.S.isDown = false;
        keys.D.isDown = false;

        resume = true;

        PurpleGhost.setVelocityX(0)
        PurpleGhost.setVelocityY(0)
        GreenGhost.setVelocityX(0)
        GreenGhost.setVelocityY(0)

        PacMan.setVelocityX(0)
        PacMan.setVelocityY(0)
        PacMan.x = PacManRespawnX;
        PacMan.y = PacManRespawnY;

        RedGhost.x = RedGhostRespawnX;
        RedGhost.y = RedGhostRespawnY;

        PurpleGhost.x = PurpleGhostDeadX;
        PurpleGhost.y = PurpleGhostDeadY;

        GreyGhost.x = GreyGhostDeadX;
        GreyGhost.y = GreyGhostDeadY;

        GreenGhost.x = GreenGhostDeadX;
        GreenGhost.y = GreenGhostDeadY;

        lives = lives - 1;
        spawn = 0;
        return false;
    }
    else {
        var test = lives;
        totalScore = totalScore + 10;
        text.setText(`Nickname: ${localStorage.getItem("playerName")}   Score: ${totalScore}`)
        GreenGhost.x = GreenGhostDeadX;
        GreenGhost.y = GreenGhostDeadY;

        GreenGhost.setVelocityX(0)
        GreenGhost.setVelocityY(0)

        var timedEvent = this.time.delayedCall(3000, respawnEvent, [], this);
        function respawnEvent() {
            if (lives === test) {
                GreenGhost.x = GreenGhostRespawnX;
                GreenGhost.y = GreenGhostRespawnY;
            }
        }
    }
}

// identicka metoda jako predchozi jen pro fialoveho ducha
function damageP() {
    if (bonusF === false) {

        this.scene.pause();
        this.scene.launch("PauseScene");
        keys.W.isDown = false;
        keys.A.isDown = false;
        keys.S.isDown = false;
        keys.D.isDown = false;

        resume = true;

        PurpleGhost.setVelocityX(0)
        PurpleGhost.setVelocityY(0)
        GreenGhost.setVelocityX(0)
        GreenGhost.setVelocityY(0)

        PacMan.setVelocityX(0)
        PacMan.setVelocityY(0)
        PacMan.x = PacManRespawnX;
        PacMan.y = PacManRespawnY;

        RedGhost.x = RedGhostRespawnX;
        RedGhost.y = RedGhostRespawnY;

        PurpleGhost.x = PurpleGhostDeadX;
        PurpleGhost.y = PurpleGhostDeadY;

        GreyGhost.x = GreyGhostDeadX;
        GreyGhost.y = GreyGhostDeadY;

        GreenGhost.x = GreenGhostDeadX;
        GreenGhost.y = GreenGhostDeadY;

        lives = lives - 1;
        spawn = 0;
        return false;
    }
    else {
        var test = lives;
        totalScore = totalScore + 10;
        text.setText(`Nickname: ${localStorage.getItem("playerName")}   Score: ${totalScore}`)
        PurpleGhost.x = PurpleGhostDeadX
        PurpleGhost.y = 272;

        PurpleGhost.setVelocityX(0)
        PurpleGhost.setVelocityY(0)

        var timedEvent1 = this.time.delayedCall(3000, respawnEvent1, [], this);
        function respawnEvent1() {
            if (lives === test) {
                PurpleGhost.x = PurpleGhostRespawnX;
                PurpleGhost.y = PurpleGhostRespawnY;
            }

        }

    }
}

// identicka metoda jako predchozi jen pro sediveho ducha
function damageGrey() {
    if (bonusF === false) {

        this.scene.pause();
        this.scene.launch("PauseScene");
        keys.W.isDown = false;
        keys.A.isDown = false;
        keys.S.isDown = false;
        keys.D.isDown = false;

        resume = true;

        PurpleGhost.setVelocityX(0)
        PurpleGhost.setVelocityY(0)
        GreenGhost.setVelocityX(0)
        GreenGhost.setVelocityY(0)

        PacMan.setVelocityX(0)
        PacMan.setVelocityY(0)

        PacMan.x = PacManRespawnX
        PacMan.y = PacManRespawnY;

        RedGhost.x = RedGhostRespawnX;
        RedGhost.y = RedGhostRespawnY;

        PurpleGhost.x = PurpleGhostDeadX;
        PurpleGhost.y = PurpleGhostDeadY;

        GreyGhost.x = GreyGhostDeadX;
        GreyGhost.y = GreyGhostDeadY;

        GreenGhost.x = GreenGhostDeadX;
        GreenGhost.y = GreenGhostDeadY;

        lives = lives - 1;
        spawn = 0;
        return false;
    }
    else {
        var test = lives;
        totalScore = totalScore + 10;
        text.setText(`Nickname: ${localStorage.getItem("playerName")}   Score: ${totalScore}`)
        GreyGhost.x = 640;
        GreyGhost.y = 304;
        var timedEvent2 = this.time.delayedCall(3000, respawnEvent2, [], this);
        function respawnEvent2() {
            if (lives === test) {
                GreyGhost.x = GreyGhostRespawnX;
                GreyGhost.y = GreyGhostRespawnY;
            }
        }

    }
}




// trida sceny, rozsiruje PhaserScene, exportuje se
export class PlayScene extends Phaser.Scene {
    constructor() {
        super({
            key: "PlayScene",
        })
    }
    // dostava data z predchozi z sceny, pokud je potreba dostat data z minule sceny, zde se z data.promennaZMinuleSceny dá získat promenna predchazejici sceny
    init(data) {

    }

    // nacteni dat (obrazky, mapa ..) ze slozky hry
    preload() {
        this.load.tilemapTiledJSON("map1", "./assets/Tilemaps/map1.json")
        this.load.image("terrain", "./assets/Tilesets/BlokyF.png")
    }
    // zakladni metoda Phaseru, dochazi zde k vytvoreni zakladnich objektu a struktur hry
    create() {
        // obnovi puvodni hodnotu promennych
        lives = 3;
        bonusF = false;
        bonusFCheck = false;
        GreenTargetValue = 1;
        PurpleTargetValue = 1;
        GreyTargetValue = 1;
        coinScore = 0;
        totalScore = 0;
        level = 1;
        spawn = 0;

        // nastavi vstup z klávesnice
        keys = this.input.keyboard.addKeys("W,Q,E,A,D,S");
        esc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

        // ukazatel zivotu
        Srdce1 = this.add.image(1000, 15, 'Srdce');
        Srdce2 = this.add.image(1050, 15, 'Srdce');
        Srdce3 = this.add.image(1100, 15, 'Srdce');

        // textovy ukazatel skore a jmena hrace
        text = this.add.text(100, 10, `Nickname: ${localStorage.getItem("playerName")}   Score: ${totalScore}`, {
            fontSize: '20px',
            fill: '#ffa500'
        });
        text.setScrollFactor(0);

        // ukazatel poctu zivotu
        var text2 = this.add.text(900, 10, `Lives:`, {
            fontSize: '20px',
            fill: '#ff0000'
        });
        text2.setScrollFactor(0);


        // vytvoreni mapy podle .json mapy
        map = this.add.tilemap("map1");
        terrain = map.addTilesetImage("Bloky", "terrain")
        topLayer = map.createStaticLayer("top", [terrain], 0, 0).setDepth(-1)

        // vytvoreni jednotlivych vrstev mapy podle .json souboru
        CoinLayer = map.getObjectLayer('points')['objects'];
        coins = this.physics.add.staticGroup()
        CoinLayer.forEach(object => {
            let obj = coins.create(object.x + 16, object.y - 16, "coin");
            obj.setScale(0.5)
            obj.body.width = object.width;
            obj.body.height = object.height;
        });  
        BonusLayer = map.getObjectLayer('bonus')['objects'];
        bonus = this.physics.add.staticGroup()
        BonusLayer.forEach(object => {
            let obj = bonus.create(object.x + 16, object.y - 16, "bonus");
            obj.setScale(0.5)
            obj.body.width = object.width;
            obj.body.height = object.height;
        });
        // pokud ma tile vlastnost collide, nastavi se jeho kolize s objekty hry (PacMan a duchove)
        topLayer.setCollisionByProperty({ collide: true });

        // vytvori PacMan a duchy a nastavi jejich kolize s hranicemi a tily
        PacMan = this.physics.add.sprite(PacManRespawnX, PacManRespawnY, "PacMan");
        PacMan.setSize(30, 30);
        RedGhost = this.physics.add.image(RedGhostRespawnX, RedGhostRespawnY, 'RedGhost');
        GreenGhost = this.physics.add.image(GreenGhostDeadX, GreenGhostDeadY, 'GreenGhost');
        PurpleGhost = this.physics.add.image(PurpleGhostDeadX, PurpleGhostDeadY, 'PurpleGhost');
        GreyGhost = this.physics.add.image(GreyGhostDeadX, GreyGhostDeadY, 'GreyGhost');

        this.physics.add.collider(PacMan, topLayer);
        this.physics.add.collider(RedGhost, topLayer);
        this.physics.add.collider(GreenGhost, topLayer);
        this.physics.add.collider(GreyGhost, topLayer);
        this.physics.add.collider(PurpleGhost, topLayer);

        PacMan.setCollideWorldBounds(false);
        RedGhost.setCollideWorldBounds(true);
        PurpleGhost.setCollideWorldBounds(true);
        GreyGhost.setCollideWorldBounds(true);
        GreenGhost.setCollideWorldBounds(true);

        //  nastavi se overlap, ktery hlida kolizi objektu a v pripade kolize spusti metodu
        // this.physics.add.overlap(kdo, s cim, metodaKolize, null, this);
        this.physics.add.overlap(PacMan, coins, collectCoin, null, this);
        this.physics.add.overlap(PacMan, bonus, collectBonus, null, this);

        this.physics.add.overlap(PacMan, RedGhost, damageR, null, this);
        this.physics.add.overlap(PacMan, GreyGhost, damageGrey, null, this);
        this.physics.add.overlap(PacMan, GreenGhost, damageG, null, this);
        this.physics.add.overlap(PacMan, PurpleGhost, damageP, null, this);


        // nastaveni pluginu, ktery se stara o hledani cesty v ramci tilu mapy
        var easystarjs = require('easystarjs');
        var easystar = new easystarjs.js();
        finder = easystar;
        finder2 = easystar;
        finder3 = easystar;
        finder4 = easystar;
        grid = [];

        // vlozi jednotlive tily do mrizky
        for (var y = 0; y < map.height; y++) {
            var col = [];
            for (var x = 0; x < map.width; x++) {
                col.push(getTileID(x, y));
            }
            grid.push(col);
        }

        finder.setGrid(grid);
        finder2.setGrid(grid);
        finder3.setGrid(grid);
        finder4.setGrid(grid);

        tileset = map.tilesets[0];
        properties = tileset.tileProperties;
        acceptableTiles = [];

        // nastavi ktere tily jsou pruchozi
        for (var i = tileset.firstgid - 1; i < 1120; i++) {
            if (!properties.hasOwnProperty(i)) {

                acceptableTiles.push(i + 1);
                continue;
            }
            if (!properties[i].collide) { acceptableTiles.push(i + 1); }
        }

        finder.setAcceptableTiles(acceptableTiles);
        finder2.setAcceptableTiles(acceptableTiles);
        finder3.setAcceptableTiles(acceptableTiles);
        finder4.setAcceptableTiles(acceptableTiles);

    }

    // metoda, ktera bezi neustale dokola, stara se o chod hry
    update() {

        // podminka kdyz hrac sesbira vsechny mince
        if (coinScore === 183) {


            PacMan.setVelocityX(0);
            PacMan.setVelocityY(0);
            RedGhost.setVelocityX(0);
            RedGhost.setVelocityY(0);
            GreenGhost.setVelocityX(0);
            GreenGhost.setVelocityY(0);
            GreyGhost.setVelocityX(0);
            GreyGhost.setVelocityY(0);
            PurpleGhost.setVelocityX(0);
            PurpleGhost.setVelocityY(0);

            // vytvori text o dokonceni levelu   
            var text3 = this.add.text(230, 100, `You won this level!`, {
                fontSize: '80px',
                fill: '#ff0000'

            });
            text3.setScrollFactor(0);

            // casovana udalost dokonceni urovne
            timedEvent = this.time.delayedCall(3000, winEvent, [], this);
            function winEvent() {

                // nacteni skore a pridani nove serazeneho skore do pameti prohlizece
                var testObject = JSON.parse(localStorage.getItem("score"));
                if (testObject !== null) {
                    scoreField = JSON.parse(localStorage.getItem("score"));
                }
                var scoreObject = {
                    playerName: localStorage.getItem("playerName"),
                    score: totalScore,
                };
                if (scoreField === null || scoreField === undefined) {
                    scoreField[0] = scoreObject;
                }
                else {
                    scoreField.push(scoreObject);


                    var length = scoreField.length;
                    for (var i = (length - 1); i >= 0; i--) {
                        for (var j = (length - i); j > 0; j--) {
                            if (scoreField[j] === undefined) {
                                break;
                            }
                            if (scoreField[j].score > scoreField[j - 1].score) {

                                var tmp = scoreField[j];
                                scoreField[j] = scoreField[j - 1];
                                scoreField[j - 1] = tmp;

                            }
                        }
                    }
                }
                // uloze pole skore do pameti prohlizece
                localStorage.setItem("score", JSON.stringify(scoreField));
                coinScore = 0;

                // ukonci scenu a spusti dalsi uroven
                this.scene.stop();
                this.scene.launch("PlayScene2", {totalScore: totalScore });

            }
        }

        if (coinScore !== 183) {

            if (lives === 2) {

                Srdce3.visible = false
            }
            if (lives === 1) {

                Srdce2.visible = false;
            }

            if (lives === 0) {


                Srdce1.visible = false;
                var text3 = this.add.text(325, 100, `Game Over :(`, {
                    fontSize: '80px',
                    fill: '#ff0000'
                });
                text3.setScrollFactor(0);
                timedEvent = this.time.delayedCall(3000, loseEvent, [], this);
                function loseEvent() {
                    // nacteni skore a pridani nove serazeneho skore do pameti prohlizece
                    var testObject = JSON.parse(localStorage.getItem("score"));
                    if (testObject !== null) {
                        scoreField = JSON.parse(localStorage.getItem("score"));
                    }
                    var scoreObject = {
                        playerName: localStorage.getItem("playerName"),
                        score: totalScore,
                    };
                    if (scoreField === null || scoreField === undefined) {
                        scoreField[0] = scoreObject;
                    }
                    else {
                        scoreField.push(scoreObject);


                        var length = scoreField.length;
                        for (var i = (length - 1); i >= 0; i--) {
                            for (var j = (length - i); j > 0; j--) {
                                if (scoreField[j] === undefined) {
                                    break;
                                }
                                if (scoreField[j].score > scoreField[j - 1].score) {

                                    var tmp = scoreField[j];
                                    scoreField[j] = scoreField[j - 1];
                                    scoreField[j - 1] = tmp;
                                }
                            }
                        }
                    }
                    // ulozi skore do pameti prohlizece
                    localStorage.setItem("score", JSON.stringify(scoreField));
                    totalScore = 0;
                    coinScore = 0;

                    // ukonci uroven a spusti menu    
                    this.scene.stop();
                    this.scene.launch("MenuScene");

                }
            }


            // znovuobjeveni duchu v 3s intervalech
            if (spawn === 0) {
                timedEvent = this.time.delayedCall(3000, spawn1Event, [], this);
                function spawn1Event() {
                    PurpleGhost.x = PurpleGhostRespawnX;
                    PurpleGhost.y = PurpleGhostRespawnY;
                }
                timedEvent = this.time.delayedCall(6000, spawn2Event, [], this);
                function spawn2Event() {
                    GreenGhost.x = GreenGhostRespawnX;
                    GreenGhost.y = GreenGhostRespawnY;
                }
                timedEvent = this.time.delayedCall(9000, spawn3Event, [], this);
                function spawn3Event() {
                    GreyGhost.x = GreyGhostRespawnX;
                    GreyGhost.y = GreyGhostRespawnY;
                }
                spawn = 1;
            }

            // finder, diky pluginu easystar js vytvori pole path ve kterem jsou jednotlive tily, ktere vedou k cily nejkratsi cestou
            finder.findPath(Math.floor(RedGhost.x / 32), Math.floor(RedGhost.y / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path) {
                if (path === null || path[1] === undefined) {

                } else {
                    // pokud neni aktivni bonus, duchove se pohybuji po ceste vytvorene finderem, cesta k hraci se obnovuje a duch nasleduje tuto vytvorenou cestu, tudiz pronasleduje hrace
                    if (bonusF === false) {

                        if (path[1].x * 32 + 16 > RedGhost.x) {
                            RedGhost.setVelocityX(speed / 2);
                        }
                        if (path[1].x * 32 + 16 < RedGhost.x) {
                            RedGhost.setVelocityX(-speed / 2);
                        }
                        if (path[1].y * 32 + 16 > RedGhost.y) {
                            RedGhost.setVelocityY(speed / 2);
                        }
                        if (path[1].y * 32 + 16 < RedGhost.y) {
                            RedGhost.setVelocityY(-speed / 2);
                        }

                        if (path[1].x * 32 + 16 === RedGhost.x) {
                            RedGhost.setVelocityX(0)
                        }
                        if (path[1].y * 32 + 16 === RedGhost.y) {
                            RedGhost.setVelocityY(0)
                        }

                    }
                }
            });
            // finder prepocita nalezenou cestu a opět se uloží do path
            finder.calculate();

            // zeleny duch se pohybuje po dane ceste a v pripade ze se hrac priblizi do kruhoveho okolo 192 pixelu zacne ho pronasledovat dokud se opet nevzdali, pokud hrac neni v danem okoli duch pokracuje po puvodni trase
            // podminka hlidajici vzdalenost ducha a PacMana
            if ((distance(PacMan.x, PacMan.y, GreenGhost.x, GreenGhost.y) <= 192)) {

                // finder hleda nejkratsi cestu z pozice zeleneho ducha na pozici PacMana
                finder2.findPath(Math.floor((GreenGhost.x - 16) / 32), Math.floor((GreenGhost.y - 16) / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path2) {

                    if (path2 === null || path2[1] === undefined) {
                    } else {

                        if (bonusF === false) {

                            // duch nasleduje vytvorenou cestu, nastavi rychlost ve smeru cestu
                            if (path2[1].x * 32 + 16 > GreenGhost.x) {
                                GreenGhost.setVelocityX(speed / 2);
                            }
                            if (path2[1].x * 32 + 16 < GreenGhost.x) {
                                GreenGhost.setVelocityX(-speed / 2);
                            }
                            if (path2[1].y * 32 + 16 > GreenGhost.y) {
                                GreenGhost.setVelocityY(speed / 2);
                            }
                            if (path2[1].y * 32 + 16 < GreenGhost.y) {
                                GreenGhost.setVelocityY(-speed / 2);
                            }

                            if (path2[1].x * 32 + 16 === GreenGhost.x) {
                                GreenGhost.setVelocityX(0)
                            }
                            if (path2[1].y * 32 + 16 === GreenGhost.y) {
                                GreenGhost.setVelocityY(0)
                            }
                        }

                    }
                    finder2.calculate();
                });

            }
            else {
                // pokud neni hrac v blizkosti nasleduje duch vytvorenou cestu, ma 4 body mezi kterymi se pohybuje, v kazdem case se nastavi jeden z bodu a pokud duch dorazi do danych souradnic switch se zvysi o jedna a duch se pohybuje smerem k nasledujicim bodu
                switch (GreenTargetValue) {
                    case 1:
                        GreenTargetCoordinateX = 1216 / 32; GreenTargetCoordinateY = 32 / 32; if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 2;
                        break;

                    case 2: GreenTargetCoordinateX = 1056 / 32; GreenTargetCoordinateY = 32 / 32; if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 3;
                        break;

                    case 3: GreenTargetCoordinateX = 1056 / 32; GreenTargetCoordinateY = 832 / 32; if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 4;
                        break;

                    case 4: GreenTargetCoordinateX = 1216 / 32; GreenTargetCoordinateY = 832 / 32; if (GreenTargetCoordinateX * 32 === GreenGhost.x - 16 && GreenTargetCoordinateY * 32 === GreenGhost.y - 16) GreenTargetValue = 1;
                        break;

                    default: break;

                }
                // finder2 vytvari cestu na zaklade aktualni polohy zeleneho ducha a ciloveho bodu, ktery se nastavuje ve switchi
                finder2.findPath(Math.floor((GreenGhost.x - 16) / 32), Math.floor((GreenGhost.y - 16) / 32), GreenTargetCoordinateX, GreenTargetCoordinateY, function (path2) {

                    if (path2 === null || path2[1] === undefined) {

                    } else {

                        if (bonusF === false) {

                            if (path2[1].x * 32 + 16 > GreenGhost.x) {
                                GreenGhost.setVelocityX(speed / 2);
                            }
                            if (path2[1].x * 32 + 16 < GreenGhost.x) {
                                GreenGhost.setVelocityX(-speed / 2);
                            }
                            if (path2[1].y * 32 + 16 > GreenGhost.y) {
                                GreenGhost.setVelocityY(speed / 2);
                            }
                            if (path2[1].y * 32 + 16 < GreenGhost.y) {
                                GreenGhost.setVelocityY(-speed / 2);
                            }

                            if (path2[1].x * 32 + 16 === GreenGhost.x) {
                                GreenGhost.setVelocityX(0)
                            }
                            if (path2[1].y * 32 + 16 === GreenGhost.y) {
                                GreenGhost.setVelocityY(0)
                            }

                        }

                    }
                    finder2.calculate();
                });
            }

            // analogie pro zeleneho ducha, fialovy ma jinou trasu ale pohyb funguje stejne
            if ((distance(PacMan.x, PacMan.y, PurpleGhost.x, PurpleGhost.y) <= 192)) {

                finder3.findPath(Math.floor((PurpleGhost.x - 16) / 32), Math.floor((PurpleGhost.y - 16) / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path3) {

                    if (path3 === null || path3[1] === undefined) {

                    } else {

                        if (bonusF === false) {

                            if (path3[1].x * 32 + 16 > PurpleGhost.x) {
                                PurpleGhost.setVelocityX(speed / 2);
                            }
                            if (path3[1].x * 32 + 16 < PurpleGhost.x) {
                                PurpleGhost.setVelocityX(-speed / 2);
                            }
                            if (path3[1].y * 32 + 16 > PurpleGhost.y) {
                                PurpleGhost.setVelocityY(speed / 2);
                            }
                            if (path3[1].y * 32 + 16 < PurpleGhost.y) {
                                PurpleGhost.setVelocityY(-speed / 2);
                            }

                            if (path3[1].x * 32 + 16 === PurpleGhost.x) {
                                PurpleGhost.setVelocityX(0)
                            }
                            if (path3[1].y * 32 + 16 === PurpleGhost.y) {
                                PurpleGhost.setVelocityY(0)
                            }
                        }

                    }
                    finder3.calculate();
                });

            }
            else {
                switch (PurpleTargetValue) {
                    case 1:
                        PurpleTargetCoordinateX = 64 / 32; PurpleTargetCoordinateY = 832 / 32; if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 2;
                        break;

                    case 2: PurpleTargetCoordinateX = 192 / 32; PurpleTargetCoordinateY = 832 / 32; if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 3;
                        break;

                    case 3: PurpleTargetCoordinateX = 192 / 32; PurpleTargetCoordinateY = 32 / 32; if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 4;
                        break;

                    case 4: PurpleTargetCoordinateX = 64 / 32; PurpleTargetCoordinateY = 32 / 32; if (PurpleTargetCoordinateX * 32 === PurpleGhost.x - 16 && PurpleTargetCoordinateY * 32 === PurpleGhost.y - 16) PurpleTargetValue = 1;
                        break;

                    default: break;

                }

                finder3.findPath(Math.floor((PurpleGhost.x - 16) / 32), Math.floor((PurpleGhost.y - 16) / 32), PurpleTargetCoordinateX, PurpleTargetCoordinateY, function (path3) {

                    if (path3 === null || path3[1] === undefined) {

                    } else {

                        if (bonusF === false) {

                            if (path3[1].x * 32 + 16 > PurpleGhost.x) {
                                PurpleGhost.setVelocityX(speed / 2);
                            }
                            if (path3[1].x * 32 + 16 < PurpleGhost.x) {
                                PurpleGhost.setVelocityX(-speed / 2);
                            }
                            if (path3[1].y * 32 + 16 > PurpleGhost.y) {
                                PurpleGhost.setVelocityY(speed / 2);
                            }
                            if (path3[1].y * 32 + 16 < PurpleGhost.y) {
                                PurpleGhost.setVelocityY(-speed / 2);
                            }

                            if (path3[1].x * 32 + 16 === PurpleGhost.x) {
                                PurpleGhost.setVelocityX(0)
                            }
                            if (path3[1].y * 32 + 16 === PurpleGhost.y) {
                                PurpleGhost.setVelocityY(0)
                            }

                        }

                    }
                    finder3.calculate();
                });
            }


            // analogie zelenho ducha, pouze se sedivy pohybuje jinou trasou, vse funguje obdobne jako u zeleneho
            if ((distance(PacMan.x, PacMan.y, GreyGhost.x, GreyGhost.y) <= 192)) {

                finder4.findPath(Math.floor((GreyGhost.x - 16) / 32), Math.floor((GreyGhost.y - 16) / 32), Math.floor(PacMan.x / 32), Math.floor(PacMan.y / 32), function (path4) {

                    if (path4 === null || path4[1] === undefined) {

                    } else {

                        if (bonusF === false) {

                            if (path4[1].x * 32 + 16 > GreyGhost.x) {
                                GreyGhost.setVelocityX(speed / 2);
                            }
                            if (path4[1].x * 32 + 16 < GreyGhost.x) {
                                GreyGhost.setVelocityX(-speed / 2);
                            }
                            if (path4[1].y * 32 + 16 > GreyGhost.y) {
                                GreyGhost.setVelocityY(speed / 2);
                            }
                            if (path4[1].y * 32 + 16 < GreyGhost.y) {
                                GreyGhost.setVelocityY(-speed / 2);
                            }

                            if (path4[1].x * 32 + 16 === GreyGhost.x) {
                                GreyGhost.setVelocityX(0)
                            }
                            if (path4[1].y * 32 + 16 === GreyGhost.y) {
                                GreyGhost.setVelocityY(0)
                            }
                        }

                    }
                    finder4.calculate();
                });

            }
            else {

                switch (GreyTargetValue) {
                    case 1:
                        GreyTargetCoordinateX = 192 / 32; GreyTargetCoordinateY = 832 / 32; if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 2;
                        break;

                    case 2: GreyTargetCoordinateX = 192 / 32; GreyTargetCoordinateY = 32 / 32; if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 3;
                        break;

                    case 3: GreyTargetCoordinateX = 1056 / 32; GreyTargetCoordinateY = 32 / 32; if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 4;
                        break;

                    case 4: GreyTargetCoordinateX = 1056 / 32; GreyTargetCoordinateY = 832 / 32; if (GreyTargetCoordinateX * 32 === GreyGhost.x - 16 && GreyTargetCoordinateY * 32 === GreyGhost.y - 16) GreyTargetValue = 1;
                        break;

                    default: break;

                }

                finder4.findPath(Math.floor((GreyGhost.x - 16) / 32), Math.floor((GreyGhost.y - 16) / 32), GreyTargetCoordinateX, GreyTargetCoordinateY, function (path4) {

                    if (path4 === null || path4[1] === undefined) {

                    } else {

                        if (bonusF === false) {

                            if (path4[1].x * 32 + 16 > GreyGhost.x) {
                                GreyGhost.setVelocityX(speed / 2);
                            }
                            if (path4[1].x * 32 + 16 < GreyGhost.x) {
                                GreyGhost.setVelocityX(-speed / 2);
                            }
                            if (path4[1].y * 32 + 16 > GreyGhost.y) {
                                GreyGhost.setVelocityY(speed / 2);
                            }
                            if (path4[1].y * 32 + 16 < GreyGhost.y) {
                                GreyGhost.setVelocityY(-speed / 2);
                            }

                            if (path4[1].x * 32 + 16 === GreyGhost.x) {
                                GreyGhost.setVelocityX(0)
                            }
                            if (path4[1].y * 32 + 16 === GreyGhost.y) {
                                GreyGhost.setVelocityY(0)
                            }

                        }

                    }
                    finder4.calculate();
                });
            }

            // podminky pro pohyb pruchodem zleva doprava a zprava doleva, pri prekroceni mapy se PacMan objevi vlevo/vpravo v zavisloti na smeru pohybu
            if (PacMan.x > 1270) {
                PacMan.x = 10
            }
            if (PacMan.x < 10) {
                PacMan.x = 1270
            }

            // podminky, ktere zastavuji hrace ve stredech tilu, usnadnuje zataceni
            if (Math.floor((PacMan.x)) % 32 == 16) {
                PacMan.setVelocityX(0);
            }
            if (Math.floor((PacMan.y)) % 32 == 16) {
                PacMan.setVelocityY(0);
            }
            if (Math.floor((RedGhost.x)) % 32 == 16) {
                RedGhost.setVelocityX(0);
            }
            if (Math.floor((RedGhost.y)) % 32 == 16) {
                RedGhost.setVelocityY(0);
            }
            if (Math.floor((GreenGhost.x)) % 32 == 16) {
                GreenGhost.setVelocityX(0);
            }
            if (Math.floor((GreenGhost.y)) % 32 == 16) {
                GreenGhost.setVelocityY(0);
            }
            if (Math.floor((GreyGhost.x)) % 32 == 16) {
                GreyGhost.setVelocityX(0);
            }
            if (Math.floor((GreyGhost.y)) % 32 == 16) {
                GreyGhost.setVelocityY(0);
            }
            if (Math.floor((PurpleGhost.x)) % 32 == 16) {
                PurpleGhost.setVelocityX(0);
            }
            if (Math.floor((PurpleGhost.y)) % 32 == 16) {
                PurpleGhost.setVelocityY(0);
            }

            // zaokrouhlovaní souradnic duchu a PacMana z toho duvodu, ze pri pohybu rychlosti vznikaji nepresnosti (nepohybuji se po celych pixelech) a je ztizene zataceni
            PacMan.y = Math.floor(PacMan.y);
            PacMan.x = Math.floor(PacMan.x);

            RedGhost.y = Math.floor(RedGhost.y)
            RedGhost.x = Math.floor(RedGhost.x)

            PurpleGhost.y = Math.floor(PurpleGhost.y)
            PurpleGhost.x = Math.floor(PurpleGhost.x)

            GreyGhost.y = Math.floor(GreyGhost.y)
            GreyGhost.x = Math.floor(GreyGhost.x)

            GreenGhost.y = Math.floor(GreenGhost.y)
            GreenGhost.x = Math.floor(GreenGhost.x)

            // otaceni PacMana do smeru pohybu
            if (PacMan.body.velocity.x < 0) {
                PacMan.angle = 0;
                PacMan.setTexture("PacMan2");
            }

            if (PacMan.body.velocity.x > 0) {
                PacMan.angle = 0;
                PacMan.setTexture("PacMan");
            }
            if (PacMan.body.velocity.y < 0) {
                PacMan.angle = 270;
                PacMan.setTexture("PacMan");
            }
            if (PacMan.body.velocity.y > 0) {
                PacMan.angle = 90;
                PacMan.setTexture("PacMan");
            }

            // podminky zajistujici pohyb, pouzivaji nadefinovany vstup z klavesnice
            if ((keys.W.isDown || keys.S.isDown || keys.A.isDown || keys.D.isDown)) {

                // pohyb hrace
                if (keys.W.isDown) {
                    PacMan.setVelocityY(-1 * speed);
                }
                else if (keys.S.isDown) {
                    PacMan.setVelocityY(speed);
                }
                if (keys.A.isDown) {
                    PacMan.setVelocityX(-1 * speed);
                }
                else if (keys.D.isDown) {
                    PacMan.setVelocityX(speed);
                }

            }
            // pri zmacknuti klavesy ESC spusti pauzu   
            if (Phaser.Input.Keyboard.JustDown(esc)) {
                this.scene.pause();
                this.scene.launch("PauseScene");
                keys.W.isDown = false;
                keys.A.isDown = false;
                keys.S.isDown = false;
                keys.D.isDown = false;

                resume = true;
            }

        }
    }
}




