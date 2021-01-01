import {Color3, Mesh, Scene, SphereBuilder, StandardMaterial} from "@babylonjs/core"
import {Model} from "./models";
import {DisposeFunction, nodeDisposer} from "./renderer";

export const meshRenderer = (scene: Scene, model: Model): DisposeFunction => {
    const createMesh = (name: string, diameter: number, scene: Scene, color: Color3): Mesh => {
        const mesh = SphereBuilder.CreateSphere(name, { diameter }, scene)
        const material = new StandardMaterial(`${name}-material`, scene)
        material.diffuseColor = color
        mesh.material = material
        return mesh
    }

    const createdMeshes = []

    model.figures.forEach((figure) => {
        const mesh = createMesh(figure.name, 1, scene, figure.color)
        mesh.position = figure.position
        createdMeshes.push(mesh)
    })

    return nodeDisposer(createdMeshes)
}
