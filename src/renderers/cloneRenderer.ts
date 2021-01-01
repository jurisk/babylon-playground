import {BoxBuilder, Color3, Mesh, Scene, SphereBuilder, StandardMaterial} from "@babylonjs/core"
import {FigureType, Model} from "../models/models";
import {DisposeFunction, nodeDisposer} from "./renderer";

export const cloneRenderer = (scene: Scene, model: Model): DisposeFunction => {
    const createdMeshes = []

    const createMeshFromTemplate = (name: string, template: Mesh, scene: Scene, color: Color3): Mesh => {
        const mesh = template.clone(name)
        const material = new StandardMaterial(`${name}-material`, scene)
        material.diffuseColor = color
        mesh.material = material
        return mesh
    }

    const templates: Record<FigureType, Mesh> = {
        'sphere': SphereBuilder.CreateSphere('sphere-template', { diameter: 1 }, scene),
        'square-chip': BoxBuilder.CreateBox('square-chip-template', {width: 2, depth: 2, height: 0.5}, scene),
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
