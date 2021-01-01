import {Color3, InstancedMesh, Mesh, Scene, SphereBuilder, StandardMaterial} from "@babylonjs/core";
import {Model} from "./models";
import {DisposeFunction, nodeDisposer} from "./renderer";

export const instancedMeshRenderer = (scene: Scene, model: Model): DisposeFunction => {
    const createdMeshes = []

    const createTemplate = (name: string, diameter: number, scene: Scene): Mesh => {
        const mesh = SphereBuilder.CreateSphere(name, { diameter }, scene)
        const material = new StandardMaterial(`${name}-material`, scene)
        material.diffuseColor = new Color3(0.5, 0.5, 0.5)
        mesh.material = material
        return mesh
    }

    const createInstancedMesh = (name: string, template: Mesh): InstancedMesh => {
        return template.createInstance(name)
    }

    const template = createTemplate('template', 1, scene)
    createdMeshes.push(template)

    const array = [-1, 0, 1]

    array.forEach((x) =>
        array.forEach((y) =>
            array.forEach((z) => {
                const mesh = createInstancedMesh(`mesh_${x}_${y}_${z}`, template)
                mesh.position.set(x, y, z)
                createdMeshes.push(mesh)
            })
        )
    )

    template.setEnabled(false)

    return nodeDisposer(createdMeshes)
}
