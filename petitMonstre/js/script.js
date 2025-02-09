window.onload = init;

async function init() {
    let canvas = document.querySelector("#myCanvas");
    let ctx = canvas.getContext("2d");

    const Player = (await
        import ("./Player.js")).default;
    const player = new Player(400, 400);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.draw(ctx);
}