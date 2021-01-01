import {Color3, Mesh, Scene, StandardMaterial} from "@babylonjs/core"
import {buildTemplates, FigureType, Model} from "../models/models";
import {DisposeFunction, nodeDisposer} from "./renderer";

export const cloneRenderer = (scene: Scene, model: Model): DisposeFunction => {
    const createdMeshes = []

    const templates: Record<FigureType, Mesh> = buildTemplates(scene)

    const createMeshFromTemplate = (name: string, template: Mesh, scene: Scene, color: Color3): Mesh => {
        const mesh = template.clone(name)
        const material = new StandardMaterial(`${name}-material`, scene)
        material.diffuseColor = color
        mesh.material = material
        return mesh
    }

    createdMeshes.push(...Object.values(templates))

    model.figures.forEach((figure) => {
        const color = figure.color
        const mesh = createMeshFromTemplate(figure.name, templates[figure.type], scene, color)
        mesh.position = figure.position
        if (figure.rotation) {
            mesh.rotation = figure.rotation
        }
        createdMeshes.push(mesh)
    })

    Object.values(templates).forEach((template) => template.setEnabled(false))

    return nodeDisposer(createdMeshes)
}
