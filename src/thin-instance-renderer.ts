import {Color4, Matrix, Scene, SphereBuilder, StandardMaterial} from "@babylonjs/core";
import {Model} from "./models";
import {DisposeFunction} from "./renderer";

export const thinInstanceRenderer = (scene: Scene, model: Model): DisposeFunction => {
    const template = SphereBuilder.CreateSphere("template", {}, scene)
    template.material = new StandardMaterial("template-material", scene)
    const bufferMatrices = new Float32Array(16 * 4 * 4)
    const bufferColors = new Float32Array(4 * 4 * 4)

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            const idx = i + j * 4
            const translation = Matrix.Translation(i, j, 0)
            translation.copyToArray(bufferMatrices, 16 * idx)
            const color = new Color4(Math.random(), Math.random(), Math.random(), 1)
            bufferColors[4 * idx] = color.r
            bufferColors[4 * idx + 1] = color.g
            bufferColors[4 * idx + 2] = color.b
            bufferColors[4 * idx + 3] = color.a
        }
    }

    template.thinInstanceSetBuffer("matrix", bufferMatrices, 16, true)
    template.thinInstanceSetBuffer("color", bufferColors, 4, true)

    return () => {
        template.dispose()
    }
}
