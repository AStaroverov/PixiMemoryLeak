import {fixMemoryLeak} from "./src/fix.js";
import {createApp} from "./src/app.js";

let count = 0;

function run(withFix) {
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

            withFix && fixMemoryLeak(r)
        }, 1)
    }, 16)
}

const withoutFix = document.getElementById('run-without-fix');
const withFix = document.getElementById('run-with-fix');

withoutFix.addEventListener('click', () => {
    run();
    withFix.remove();
});

withFix.addEventListener('click', () => {
    run(true);
    withoutFix.remove();
});
