import {Color3, Mesh, Scene, SphereBuilder, StandardMaterial} from "@babylonjs/core"
import {Model} from "../models/models";
import {DisposeFunction, nodeDisposer} from "./renderer";

export const cloneRenderer = (scene: Scene, model: Model): DisposeFunction => {
    const createdMeshes = []

    const createMesh = (name: string, diameter: number, scene: Scene): Mesh =>
        SphereBuilder.CreateSphere(name, {diameter}, scene)

    const createMeshFromTemplate = (name: string, template: Mesh, scene: Scene, color: Color3): Mesh => {
        const mesh = template.clone(name)
        const material = new StandardMaterial(`${name}-material`, scene)
        material.diffuseColor = color
        mesh.material = material
        return mesh
    }

    const template = createMesh('template', 1, scene)
    createdMeshes.push(template)

    model.figures.forEach((figure) => {
        const color = figure.color
        const mesh = createMeshFromTemplate(figure.name, template, scene, color)
        mesh.position = figure.position
        createdMeshes.push(mesh)
    })

    template.setEnabled(false)

    return nodeDisposer(createdMeshes)
}
