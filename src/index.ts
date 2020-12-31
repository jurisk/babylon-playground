import {
    ArcRotateCamera,
    Camera, DebugLayer,
    Engine,
    HemisphericLight, Light, Scene, Vector3
} from "@babylonjs/core"
import '@babylonjs/inspector'
import * as GUI from "@babylonjs/gui";
import {Exercise, Renderer} from "./domain";
import {setupScene} from "./setup-scene";

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

const showDebugger: (scene: Scene) => Promise<DebugLayer> = (scene: Scene) => scene.debugLayer.show()

const createScene =  (canvas: HTMLCanvasElement, engine: Engine) => {
    const scene = new Scene(engine)

    createLight(scene)
    createCamera(canvas, scene)
    showDebugger(scene)

    return scene
}

const createButton = (parent: GUI.Container, name: string, text: string, callback: () => void) => {
    const button = GUI.Button.CreateSimpleButton(name, text)
    button.width = "120px"
    button.height = "40px"
    button.color = "white"
    button.background = "blue"
    button.onPointerUpObservable.add(callback)
    parent.addControl(button)
}

let selectedExercise: Exercise = Exercise.Exercise1

let selectedRenderer = Renderer.Mesh
let disposePrevious: () => void = () => {}

const changeExercise = (exercise: Exercise, scene: Scene): void => {
    selectedExercise = exercise
    recreateScene(scene)
}

const changeRendering = (renderer: Renderer, scene: Scene): void => {
    selectedRenderer = renderer
    recreateScene(scene)
}

const recreateScene = (scene: Scene): void => {
    disposePrevious()
    disposePrevious = setupScene(scene, selectedExercise, selectedRenderer)
}

const createUi = (scene: Scene) => {
    const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI")
    const exercisePanel = new GUI.StackPanel("exercisePanel")
    ui.addControl(exercisePanel)
    exercisePanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    exercisePanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    createButton(exercisePanel,"exercise1", "Exercise 1", () => changeExercise(Exercise.Exercise1, scene))
    createButton(exercisePanel,"exercise2", "Exercise 2", () => changeExercise(Exercise.Exercise2, scene))
    createButton(exercisePanel,"exercise3", "Exercise 3", () => changeExercise(Exercise.Exercise3, scene))

    const renderingPanel = new GUI.StackPanel("renderingPanel")
    ui.addControl(renderingPanel)
    renderingPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    renderingPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    createButton(renderingPanel,"mesh", "Mesh", () => changeRendering(Renderer.Mesh, scene))
    createButton(renderingPanel,"clone", "Clone", () => changeRendering(Renderer.Clone, scene))
    createButton(renderingPanel,"instanceMesh", "Instance Mesh", () => changeRendering(Renderer.InstanceMesh, scene))
    createButton(renderingPanel,"thinInstance", "Thin Instance", () => changeRendering(Renderer.ThinInstance, scene))
}

const run = () => {
    const canvas = createCanvas()
    const engine = createEngine(canvas)
    const scene = createScene(canvas, engine)

    createUi(scene)

    engine.resize()
    window.addEventListener("resize", () => engine.resize())
    engine.runRenderLoop(() => {
        scene.render()
    })

    recreateScene(scene)
}

run()
