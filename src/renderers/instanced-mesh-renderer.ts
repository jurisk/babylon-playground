import {
    Color3,
    InstancedMesh,
    Mesh,
    Scene,
    StandardMaterial
} from "@babylonjs/core";
import {buildTemplates, Model} from "../models/models";
import {DisposeFunction, nodeDisposer} from "./renderer";

export const instancedMeshRenderer = (scene: Scene, model: Model): DisposeFunction => {
    const createdMeshes = []

    const templates = buildTemplates(scene)

    Object.entries(templates).forEach(([name, mesh]) => {
        const material = new StandardMaterial(`${name}-material`, scene)
        material.diffuseColor = new Color3(0.5, 0.5, 0.5)
        mesh.material = material
    })

    const createInstancedMesh = (name: string, template: Mesh): InstancedMesh =>
        template.createInstance(name)

    createdMeshes.push(...Object.values(templates))

    model.figures.forEach((figure) => {
        const mesh = createInstancedMesh(figure.name, templates[figure.type])
        mesh.position = figure.position
        if (figure.rotation) {
            mesh.rotation = figure.rotation
        }
        createdMeshes.push(mesh)
    })

    Object.values(templates).forEach((template) => template.setEnabled(false))

    return nodeDisposer(createdMeshes)
}
