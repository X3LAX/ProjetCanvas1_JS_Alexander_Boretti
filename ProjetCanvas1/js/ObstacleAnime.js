import Obstacle from "./Obstacle.js";

export default class ObstacleAnime extends Obstacle {
    constructor(x, y, w, h, couleur, vitesseX = 2, vitesseY = 0) {
        super(x, y, w, h, couleur);
        this.vitesseX = vitesseX;
        this.vitesseY = vitesseY;
        this.xInitial = x;
        this.yInitial = y;
        this.deplacement = 0;
        this.maxDeplacement = 250;
    }

    move() {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
        this.deplacement += Math.abs(this.vitesseX) + Math.abs(this.vitesseY);

        if (this.deplacement >= this.maxDeplacement) {
            this.vitesseX = -this.vitesseX;
            this.vitesseY = -this.vitesseY;
            this.deplacement = 0;
        }
    }

    draw(ctx) {
        ctx.save();
        // un ptit degrade sur les objet animés
        let gradient = ctx.createLinearGradient(this.x, this.y, this.x + this.w, this.y + this.h);
        gradient.addColorStop(0, this.couleur);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0.5)");
        ctx.fillStyle = gradient;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.restore();
    }
}