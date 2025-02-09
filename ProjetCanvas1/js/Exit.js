import ObjectGraphique from "./ObjectGraphique.js";
import { drawCircleImmediat } from "./utils.js";

export default class Exit extends ObjectGraphique {
    constructor(x, y, rayon = 30) {
        super(x, y, rayon * 2, rayon * 2);
        this.rayon = rayon;
        this.image = new Image();
        this.image.src = "assets/images/cible.png";
    }

    draw(ctx) {
        ctx.save();
        // la cible
        if (this.image.complete) {
            ctx.drawImage(this.image, this.x - this.w / 2, this.y - this.h / 2, this.w, this.h);
        }
        ctx.restore();
    }
}