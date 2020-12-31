import {
    BoxBuilder,
    Color3,
    InstancedMesh,
    Mesh,
    Scene,
    SphereBuilder,
    StandardMaterial
} from "@babylonjs/core";
import {Exercise, Renderer} from "./domain";

const createGround = (scene: Scene) => Mesh.CreateGround("ground1", 10, 10, 1, scene)

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

export const setupScene = (scene: Scene, exercise: Exercise, renderer: Renderer): () => void => {
    const createdMeshes = []

    if (exercise === Exercise.Exercise1) {
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
    }

    if (exercise === Exercise.Exercise2) {
        const ground = createGround(scene)
        createdMeshes.push(ground)
    }

    if (exercise === Exercise.Exercise3) {
        const box = BoxBuilder.CreateBox("box", {size: 1}, scene)
        createdMeshes.push(box)
    }

    return () => {
        createdMeshes.forEach((mesh) => mesh.dispose())
    }
}
