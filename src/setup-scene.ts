import {
    Color3,
    Mesh,
    Scene, StandardMaterial,
} from "@babylonjs/core"
import {Exercise, Renderer} from "./domain"
import {selectModel} from "./models/models";
import {DisposeFunction, selectRenderer} from "./renderers/renderer";

export const setupScene = (scene: Scene, exercise: Exercise, renderer: Renderer): DisposeFunction => {
    const model = selectModel(exercise)
    const selectedRenderer = selectRenderer(renderer)
    const disposeFunction = selectedRenderer(scene, model)

    const createGround = (scene: Scene) => {
        const ground = Mesh.CreateGround("ground", 100, 100, 100, scene, false)
        const groundMaterial = new StandardMaterial("ground", scene)
        groundMaterial.specularColor = new Color3(0, 0, 0)
        ground.material = groundMaterial
        ground.receiveShadows = true
        return ground
    }

    const ground = model.hasGround ? createGround(scene) : null

    return () => {
        disposeFunction()
        ground?.dispose()
    }
}
