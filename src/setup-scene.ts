import {
    BoxBuilder,
    Color3, Color4,
    InstancedMesh, Matrix,
    Mesh,
    Scene, SolidParticleSystem,
    SphereBuilder,
    StandardMaterial
} from "@babylonjs/core"
import {Exercise, Renderer} from "./domain"
import {figures0} from "./figures";

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

    if (exercise === Exercise.Exercise0 && renderer === Renderer.Mesh) {
        const createMesh = (name: string, diameter: number, scene: Scene, color: Color3): Mesh => {
            const mesh = SphereBuilder.CreateSphere(name, { diameter }, scene)
            const material = new StandardMaterial(`${name}-material`, scene)
            material.diffuseColor = color
            mesh.material = material
            return mesh
        }

        figures0.forEach((figure) => {
            const mesh = createMesh(`mesh_${Math.random()}`, 1, scene, figure.color)
            mesh.position.set(figure.coordinates.x, figure.coordinates.y, figure.coordinates.z)
            createdMeshes.push(mesh)
        })
    }

    if (exercise === Exercise.Exercise0 && renderer === Renderer.Clone) {
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

        const array = [-1, 0, 1]
        const normalize = (c: number) => (c + 1) / 2

        array.forEach((x) =>
            array.forEach((y) =>
                array.forEach((z) => {
                    const color = new Color3(normalize(x), normalize(y), normalize(z))
                    const mesh = createMeshFromTemplate(`mesh_${x}_${y}_${z}`, template, scene, color)
                    mesh.position.set(x, y, z)
                    createdMeshes.push(mesh)
                })
            )
        )

        template.setEnabled(false)
    }

    if (exercise === Exercise.Exercise0 && renderer === Renderer.InstancedMesh) {
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

    if (exercise === Exercise.Exercise0 && renderer === Renderer.ThinInstance) {
        const template = SphereBuilder.CreateSphere("template", {}, scene)
        template.material = new StandardMaterial("template-material", scene)
        createdMeshes.push(template)
        const bufferMatrices = new Float32Array(16 * 4 * 4)
        const bufferColors = new Float32Array(4 * 4 * 4)

        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {
                const idx = i + j * 4
                const translation = Matrix.Translation(i, j, 0)
                translation.copyToArray(bufferMatrices, 16 * idx)
                const color = new Color4(Math.random(), Math.random(), Math.random(), 1)
                bufferColors[4 * idx] = color.r
                bufferColors[4 * idx + 1] = color.g
                bufferColors[4 * idx + 2] = color.b
                bufferColors[4 * idx + 3] = color.a
            }
        }

        template.thinInstanceSetBuffer("matrix", bufferMatrices, 16, true)
        template.thinInstanceSetBuffer("color", bufferColors, 4, true)
    }

    if (exercise === Exercise.Exercise0 && renderer === Renderer.SolidParticleSystem) {
        const size = 0.5
        const rows = 4
        const columns = 4
        const sps = new SolidParticleSystem("sps", scene)
        const template = SphereBuilder.CreateSphere("template", { diameter: size })
        sps.addShape(template, rows * columns)
        template.dispose()
        sps.buildMesh()
        sps.initParticles = () => {
            for (let i = 0; i < sps.nbParticles; i++) {
                const column = i % columns
                const row = Math.floor(i / rows)
                const particle = sps.particles[i]
                particle.position.x = column * size
                particle.position.z = row * size
            }
        }
        sps.initParticles()
        sps.setParticles()
    }

    if (exercise === Exercise.Exercise1) {
        const box = BoxBuilder.CreateBox("box", {size: 1}, scene)
        createdMeshes.push(box)
    }

    if (exercise === Exercise.Exercise2) {
        const ground = createGround(scene)
        createdMeshes.push(ground)
    }

    if (exercise === Exercise.Exercise3) {
        const box = BoxBuilder.CreateBox("box", {size: 2}, scene)
        createdMeshes.push(box)
    }

    return () => {
        createdMeshes.forEach((mesh) => mesh.dispose())
    }
}
