import Player from "./Player.js";
import Obstacle from "./Obstacle.js";
import ObstacleAnime from "./ObstacleAnime.js";
import Exit from "./Exit.js";
import { rectsOverlap } from "./collisions.js";
import { initListeners } from "./ecouteurs.js";

export default class Game {
    objetsGraphiques = [];

    constructor(canvas) {
        this.canvas = canvas;
        this.inputStates = {
            mouseX: 0,
            mouseY: 0,
        };
        this.niveau = 1;
        this.nbNiveaux = 3;
    }

    async init() {
        this.ctx = this.canvas.getContext("2d");
        initListeners(this.inputStates, this.canvas);
        this.chargerNiveau(this.niveau);
    }

    chargerNiveau(niveau) {
        this.objetsGraphiques = [];

        // On crée le joueur
        this.player = new Player(50, 50);
        this.objetsGraphiques.push(this.player);

        // On crée la sortie 
        this.exit = new Exit(this.canvas.width - 50, this.canvas.height - 50);
        this.objetsGraphiques.push(this.exit);

        switch (niveau) {
            case 1:
                // Niveau 1 
                this.objetsGraphiques.push(new Obstacle(200, 100, 40, 400, "red"));
                this.objetsGraphiques.push(new Obstacle(400, 200, 40, 400, "blue"));
                break;
            case 2:
                // Niveau 2 
                this.objetsGraphiques.push(new Obstacle(200, 0, 40, 300, "red"));
                this.objetsGraphiques.push(new Obstacle(200, 400, 40, 200, "red"));
                this.objetsGraphiques.push(new Obstacle(400, 300, 30, 500, "blue"));
                this.objetsGraphiques.push(new Obstacle(600, 200, 200, 475, "purple"));
                break;
            case 3:
                // Niveau 3
                this.objetsGraphiques.push(new ObstacleAnime(100, 100, 60, 40, "red", 6, 0));
                this.objetsGraphiques.push(new ObstacleAnime(300, 500, 40, 60, "blue", 0, 6));
                this.objetsGraphiques.push(new ObstacleAnime(550, 550, 50, 50, "purple", 5, 4));
                break;
        }
    }

    start() {
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    mainAnimationLoop() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawAllObjects();
        this.update();
        requestAnimationFrame(this.mainAnimationLoop.bind(this));
    }

    drawAllObjects() {
        this.ctx.save();
        this.ctx.fillStyle = "black";
        this.ctx.font = "20px Arial";
        this.ctx.fillText("Niveau " + this.niveau, 10, 30);
        this.ctx.restore();

        // Dessine tous les objets du jeu
        this.objetsGraphiques.forEach(obj => obj.draw(this.ctx));
    }

    update() {
        // Déplacement du joueur
        this.movePlayer();


        if (this.niveau === 3) {
            this.objetsGraphiques.forEach(obj => {
                if (obj instanceof ObstacleAnime) {
                    obj.move();
                }
            });
        }
        this.testCollisionExit();
    }

    movePlayer() {
        this.player.vitesseX = 0;
        this.player.vitesseY = 0;

        if (this.inputStates.ArrowRight) {
            this.player.vitesseX = 3;
        }
        if (this.inputStates.ArrowLeft) {
            this.player.vitesseX = -3;
        }
        if (this.inputStates.ArrowUp) {
            this.player.vitesseY = -3;
        }
        if (this.inputStates.ArrowDown) {
            this.player.vitesseY = 3;
        }

        this.player.move();
        this.testCollisionsPlayer();
    }

    testCollisionsPlayer() {
        this.testCollisionPlayerBordsEcran();
        this.testCollisionPlayerObstacles();
    }

    testCollisionPlayerBordsEcran() {
        if (this.player.x - this.player.w / 2 < 0) {
            this.player.vitesseX = 0;
            this.player.x = this.player.w / 2;
        }
        if (this.player.x + this.player.w / 2 > this.canvas.width) {
            this.player.vitesseX = 0;
            this.player.x = this.canvas.width - this.player.w / 2;
        }
        if (this.player.y - this.player.h / 2 < 0) {
            this.player.y = this.player.h / 2;
            this.player.vitesseY = 0;
        }
        if (this.player.y + this.player.h / 2 > this.canvas.height) {
            this.player.vitesseY = 0;
            this.player.y = this.canvas.height - this.player.h / 2;
        }
    }

    testCollisionPlayerObstacles() {
        this.objetsGraphiques.forEach(obj => {
            if (obj instanceof Obstacle) {
                if (rectsOverlap(
                        this.player.x - this.player.w / 2,
                        this.player.y - this.player.h / 2,
                        this.player.w,
                        this.player.h,
                        obj.x,
                        obj.y,
                        obj.w,
                        obj.h
                    )) {
                    // on le remet au point de contact
                    this.player.x = 50;
                    this.player.y = 50;
                    this.player.vitesseX = 0;
                    this.player.vitesseY = 0;
                }
            }
        });
    }

    testCollisionExit() {
        let dx = this.player.x - this.exit.x;
        let dy = this.player.y - this.exit.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.exit.rayon + this.player.w / 4) {
            if (this.niveau < this.nbNiveaux) {
                this.niveau++;
                this.chargerNiveau(this.niveau);
            } else {
                alert("Félicitations ! Vous avez terminé tous les niveaux !");
                this.niveau = 1;
                this.chargerNiveau(1);
            }
        }
    }
}