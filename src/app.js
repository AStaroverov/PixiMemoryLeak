import {Application, Graphics} from "pixi.js";

export function createApp() {
    const app = new Application();
    const graphics = new Graphics();

    graphics.beginFill(0xDE3249);
    graphics.drawRect(50, 50, 100, 100);
    graphics.endFill();

    app.stage.addChild(graphics);
    document.body.appendChild(app.view);

    return app;
}