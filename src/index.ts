import {
    ArcRotateCamera,
    Camera,
    DebugLayer,
    DirectionalLight,
    Engine, HemisphericLight,
    Scene, ShadowGenerator,
    Vector3
} from "@babylonjs/core"
import '@babylonjs/inspector'
import {Exercise, Renderer} from "./domain";
import {setupScene} from "./setup-scene";
import {createUi} from "./ui";
import {showAxis} from "./utils/show-axis";
import {DisposeFunction} from "./renderers/renderer";

const createLightsAndShadows = (scene: Scene) => {
    const directionalLight = new DirectionalLight("directional-light", new Vector3(1, -1, 0.5), scene)
    directionalLight.intensity = 1

    const hemisphericLight = new HemisphericLight("hemispheric-light", new Vector3(0, 1, 0), scene)
    hemisphericLight.intensity = 0.25

    const shadowGenerator = new ShadowGenerator(4096, directionalLight)
    shadowGenerator.usePoissonSampling = true
    return shadowGenerator
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

const createScene = (canvas: HTMLCanvasElement, engine: Engine): [ShadowGenerator, Scene] => {
    const scene = new Scene(engine)

    const shadowGenerator = createLightsAndShadows(scene)
    createCamera(canvas, scene)

    showAxis(scene, 10)
    showDebugger(scene)

    return [shadowGenerator, scene]
}

let disposePrevious: DisposeFunction = () => {}

let selectedExercise: Exercise = Exercise.Exercise0
let selectedRenderer = Renderer.Mesh

const recreateScene = (scene: Scene, shadowGenerator: ShadowGenerator, exercise: Exercise, renderer: Renderer): void => {
    disposePrevious()
    disposePrevious = setupScene(scene, exercise, renderer)
    shadowGenerator.getShadowMap().renderList = scene.meshes
}

const changeExercise = (exercise: Exercise, scene: Scene, shadowGenerator: ShadowGenerator): void => {
    selectedExercise = exercise
    recreateScene(scene, shadowGenerator, selectedExercise, selectedRenderer)
}

const changeRenderer = (renderer: Renderer, scene: Scene, shadowGenerator: ShadowGenerator): void => {
    selectedRenderer = renderer
    recreateScene(scene, shadowGenerator, selectedExercise, selectedRenderer)
}

const run = () => {
    const canvas = createCanvas()
    const engine = createEngine(canvas)
    const [shadowGenerator, scene] = createScene(canvas, engine)

    createUi(
        (exercise) => changeExercise(exercise, scene, shadowGenerator),
        (renderer) => changeRenderer(renderer, scene, shadowGenerator),
    )

    engine.resize()
    window.addEventListener("resize", () => engine.resize())
    engine.runRenderLoop(() => {
        scene.render()
    })

    recreateScene(scene, shadowGenerator, selectedExercise, selectedRenderer)
}

run()
