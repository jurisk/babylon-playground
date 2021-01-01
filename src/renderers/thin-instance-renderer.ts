import {BoxBuilder, Color4, Matrix, Scene, SphereBuilder, StandardMaterial} from "@babylonjs/core";
import {FigureType, Model} from "../models/models";
import {DisposeFunction} from "./renderer";

export const thinInstanceRenderer = (scene: Scene, model: Model): DisposeFunction => {
    const buildMesh = (name: string, figureType: FigureType) => {
        switch (figureType) {
            case 'sphere':
                return SphereBuilder.CreateSphere(name, { diameter: 1 }, scene)
            case 'square-chip':
                return BoxBuilder.CreateBox(name, {width: 2, depth: 2, height: 0.5}, scene)
        }
    }

    const figureType = model.figures[0].type
    if (!model.figures.every((figure) => figure.type === figureType)) {
        throw new Error("Expected all figures to have the same type")
    }

    const template = buildMesh('template', figureType)
    template.material = new StandardMaterial("template-material", scene)
    const bufferMatrices = new Float32Array(16 * model.figures.length)
    const bufferColors = new Float32Array(4 * model.figures.length)

    model.figures.forEach((figure, idx) => {
        const translation = Matrix.Translation(figure.position.x, figure.position.y, figure.position.z)
        const rotationX = Matrix.RotationX(figure.rotation?.x || 0)
        const rotationY = Matrix.RotationY(figure.rotation?.y || 0)
        const rotationZ = Matrix.RotationZ(figure.rotation?.z || 0)

        const combined = translation
            .multiply(rotationX)
            .multiply(rotationY)
            .multiply(rotationZ)

        combined.copyToArray(bufferMatrices, 16 * idx)

        const color = new Color4(figure.color.r, figure.color.g, figure.color.b, 1)
        bufferColors[4 * idx] = color.r
        bufferColors[4 * idx + 1] = color.g
        bufferColors[4 * idx + 2] = color.b
        bufferColors[4 * idx + 3] = color.a
    })

    template.thinInstanceSetBuffer("matrix", bufferMatrices, 16, true)
    template.thinInstanceSetBuffer("color", bufferColors, 4, true)

    return () => {
        template.dispose()
    }
}
