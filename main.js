import {fixMemoryLeak} from "./src/fix.js";
import {createApp} from "./src/app.js";

let count = 0;

function run() {
    let stopCount = count + 20;

    const intervalID = setInterval(() => {
        if (count++ === stopCount) {
            clearInterval(intervalID);
            document.getElementById('count').innerText = count;
        }

        const app = createApp();

        setTimeout(() => {
            const r = app.renderer;

            app.destroy(true, {
                baseTexture: true,
                children: true,
                texture: true
            })

            fixMemoryLeak(r)
        }, 1)
    }, 16)
}

document.getElementById('run').addEventListener('click', () => {
    run();
})
