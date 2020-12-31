import {
    ArcRotateCamera,
    Camera, Color3,
    Engine,
    HemisphericLight, InstancedMesh, Light, Mesh,
    Scene, SphereBuilder, StandardMaterial,
    Vector3
} from "@babylonjs/core"
import '@babylonjs/inspector'

const createLight = (scene: Scene): Light =>
    new HemisphericLight("light", new Vector3(0, 1, 0), scene)

const createCanvas = (): HTMLCanvasElement => {
    const canvas = document.createElement("canvas")
    document.body.appendChild(canvas)
    return canvas
}

const createEngine = (canvas: HTMLCanvasElement): Engine => new Engine(canvas, true, {}, true)

const createCamera = (canvas: HTMLCanvasElement, scene: Scene): Camera => {
    const camera = new ArcRotateCamera("camera", -Math.PI  * 0.5, Math.PI * 0.25, 12, Vector3.Zero(), scene)
    camera.attachControl(canvas)
    return camera

}

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

const showDebugger = (scene: Scene): void => {
    scene.debugLayer.show()
}

const setupScene = (scene: Scene) => {
    const template = createTemplate('template', 1, scene)
    const array = [-1, 0, 1]

    array.forEach((x) =>
        array.forEach((y) =>
            array.forEach((z) => {
                const mesh = createInstancedMesh(`mesh_${x}_${y}_${z}`, template)
                mesh.position.set(x, y, z)
            })
        )
    )

    template.setEnabled(false)
}

const createScene =  (canvas: HTMLCanvasElement, engine: Engine) => {
    const scene = new Scene(engine)

    createLight(scene)
    createCamera(canvas, scene)
    setupScene(scene)
    showDebugger(scene)

    return scene
}

const run = () => {
    const canvas = createCanvas()
    const engine = createEngine(canvas)
    const scene = createScene(canvas, engine)
    engine.resize()
    window.addEventListener("resize", () => engine.resize())
    engine.runRenderLoop(() => {
        scene.render()
    })
}

run()
