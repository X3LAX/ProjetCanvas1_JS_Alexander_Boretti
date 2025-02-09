function drawCircle(ctx, x, y, r, color) {
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.restore();
}
class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.w = 100;
        this.h = 100;
        this.vitesseX = 0;
        this.vitesseY = 0;
    }

    draw(ctx) {
        ctx.save();
        ctx.translate(this.x - this.w / 2, this.y - this.h / 2);

        // Corps 
        ctx.fillStyle = "#6495ED";
        ctx.fillRect(0, 0, this.w, this.h);

        // Yeux
        drawCircle(ctx, 30, 30, 10, "white");
        drawCircle(ctx, 70, 30, 10, "white");


        // Pupilles
        drawCircle(ctx, 30, 30, 5, "black");
        drawCircle(ctx, 70, 30, 5, "black");

        // Bouche 
        ctx.fillStyle = "black";
        ctx.fillRect(30, 60, 40, 10);

        // Jambes
        ctx.fillStyle = "#6495ED";
        ctx.fillRect(25, 100, 15, 40);
        ctx.fillRect(60, 100, 15, 40);

        ctx.restore();
    }
}

export default Player;