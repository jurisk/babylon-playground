import {Color3, Mesh, Scene, StandardMaterial} from "@babylonjs/core"
import {buildTemplate, FigureType, Model} from "../models/models";
import {DisposeFunction, nodeDisposer} from "./renderer";

export const meshRenderer = (scene: Scene, model: Model): DisposeFunction => {
    const createMesh = (name: string, figureType: FigureType, color: Color3): Mesh => {
        const mesh = buildTemplate(figureType, scene)
        mesh.name = name
        const material = new StandardMaterial(`${name}-material`, scene)
        material.diffuseColor = color
        mesh.material = material
        return mesh
    }

    const createdMeshes = []

    model.figures.forEach((figure) => {
        const mesh = createMesh(figure.name, figure.type, figure.color)
        mesh.position = figure.position
        if (figure.rotation) {
            mesh.rotation = figure.rotation
        }
        createdMeshes.push(mesh)
    })

    return nodeDisposer(createdMeshes)
}
