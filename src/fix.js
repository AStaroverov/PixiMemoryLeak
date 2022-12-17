import {utils} from "pixi.js";

export function fixMemoryLeak(renderer) {
    const { buffer, texture, CONTEXT_UID } = renderer;
    const { BaseTextureCache, TextureCache, ProgramCache } = utils;
    const disposeContextTexture = disposeTexture.bind(null, CONTEXT_UID);

    // Clear all WebGL allocated buffers
    buffer.disposeAll(true);

    // Clear all WebGL allocated textures
    texture.boundTextures.forEach(disposeContextTexture);
    texture.boundTextures.length = 0;
    texture.managedTextures.forEach(disposeContextTexture);
    texture.managedTextures.length = 0;

    // Clear GLTexture from singleton cache for current webgl context
    for (const key in TextureCache) {
        disposeContextTexture(TextureCache[key]?.baseTexture);
    }

    // Clear GLTexture from singleton cache for current webgl context
    for (const key in BaseTextureCache) {
        disposeContextTexture(BaseTextureCache[key]);
    }

    // Clear GLPrograms from singleton cache for current webgl context
    for (const key in ProgramCache) {
        removeGlProgram(CONTEXT_UID, ProgramCache[key]);
    }
}

export function disposeTexture(
    ctx_uid,
    tex
) {
    if (tex) {
        tex.dispose();
        tex.removeAllListeners();
        removeGlTexture(ctx_uid, tex);
    }
}

export function removeGlTexture(
    ctx_id,
    tex,
) {
    tex && delete tex._glTextures[ctx_id];
}

export function removeGlProgram(
    ctx_id,
    program,
) {
    program && delete program.glPrograms[ctx_id];
}