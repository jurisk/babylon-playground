import {
    ArcRotateCamera,
    Camera,
    DebugLayer,
    DirectionalLight,
    Engine, HemisphericLight,
    Scene,
    Vector3
} from "@babylonjs/core"
import '@babylonjs/inspector'
import {Exercise, Renderer} from "./domain";
import {setupScene} from "./setup-scene";
import {createUi, recreate} from "./ui";
import {showAxis} from "./utils/show-axis";
import {DisposeFunction} from "./renderers/renderer";

const createLights = (scene: Scene): void => {
    const directionalLight = new DirectionalLight("directional-light", new Vector3(1, -1, 0.5), scene)
    directionalLight.intensity = 1

    const hemisphericLight = new HemisphericLight("hemispheric-light", new Vector3(0, 1, 0), scene)
    hemisphericLight.intensity = 0.25
}

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

const showDebugger: (scene: Scene) => Promise<DebugLayer> = (scene: Scene) => scene.debugLayer.show()

const createScene =  (canvas: HTMLCanvasElement, engine: Engine) => {
    const scene = new Scene(engine)

    createLights(scene)
    createCamera(canvas, scene)

    showAxis(scene, 10)
    showDebugger(scene)

    return scene
}

let disposePrevious: DisposeFunction = () => {}

const recreateScene = (scene: Scene, exercise: Exercise, renderer: Renderer): void => {
    disposePrevious()
    disposePrevious = setupScene(scene, exercise, renderer)
}

const run = () => {
    const canvas = createCanvas()
    const engine = createEngine(canvas)
    const scene = createScene(canvas, engine)

    createUi(scene, recreateScene)

    engine.resize()
    window.addEventListener("resize", () => engine.resize())
    engine.runRenderLoop(() => {
        scene.render()
    })

    recreate(scene, recreateScene)
}

run()
