import {
    Mesh,
    Scene,
} from "@babylonjs/core"
import {Exercise, Renderer} from "./domain"
import {selectModel} from "./models/models";
import {DisposeFunction, selectRenderer} from "./renderers/renderer";

export const setupScene = (scene: Scene, exercise: Exercise, renderer: Renderer): DisposeFunction => {
    const model = selectModel(exercise)
    const selectedRenderer = selectRenderer(renderer)
    const disposeFunction = selectedRenderer(scene, model)

    const createGround = (scene: Scene) => Mesh.CreateGround("ground1", 10, 10, 1, scene)

    const ground = model.hasGround ? createGround(scene) : null

    return () => {
        disposeFunction()
        ground?.dispose()
    }
}
