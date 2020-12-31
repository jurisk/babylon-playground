import {Scene} from "@babylonjs/core";
import * as GUI from "@babylonjs/gui";
import {Exercise, Renderer} from "./domain";

let selectedExercise: Exercise = Exercise.Exercise0
let selectedRenderer = Renderer.Mesh

const createButton = (parent: GUI.Container, name: string, text: string, callback: () => void) => {
    const button = GUI.Button.CreateSimpleButton(name, text)
    button.width = "120px"
    button.height = "40px"
    button.color = "white"
    button.background = "blue"
    button.onPointerUpObservable.add(callback)
    parent.addControl(button)
}

const changeExercise = (exercise: Exercise, scene: Scene, recreateScene: (scene: Scene, exercise: Exercise, renderer: Renderer) => void): void => {
    selectedExercise = exercise
    recreateScene(scene, selectedExercise, selectedRenderer)
}

const changeRendering = (renderer: Renderer, scene: Scene, recreateScene: (scene: Scene, exercise: Exercise, renderer: Renderer) => void): void => {
    selectedRenderer = renderer
    recreateScene(scene, selectedExercise, selectedRenderer)
}

export const createUi = (scene: Scene, recreateScene: (scene: Scene, exercise: Exercise, renderer: Renderer) => void) => {
    const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI")
    const exercisePanel = new GUI.StackPanel("exercisePanel")
    ui.addControl(exercisePanel)
    exercisePanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    exercisePanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    createButton(exercisePanel,"exercise0", "Exercise 0", () => changeExercise(Exercise.Exercise0, scene, recreateScene))
    createButton(exercisePanel,"exercise1", "Exercise 1", () => changeExercise(Exercise.Exercise1, scene, recreateScene))
    createButton(exercisePanel,"exercise2", "Exercise 2", () => changeExercise(Exercise.Exercise2, scene, recreateScene))
    createButton(exercisePanel,"exercise3", "Exercise 3", () => changeExercise(Exercise.Exercise3, scene, recreateScene))

    const renderingPanel = new GUI.StackPanel("renderingPanel")
    ui.addControl(renderingPanel)
    renderingPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    renderingPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    createButton(renderingPanel,"mesh", "Mesh", () => changeRendering(Renderer.Mesh, scene, recreateScene))
    createButton(renderingPanel,"clone", "Clone", () => changeRendering(Renderer.Clone, scene, recreateScene))
    createButton(renderingPanel,"instancedMesh", "Instanced Mesh", () => changeRendering(Renderer.InstancedMesh, scene, recreateScene))
    createButton(renderingPanel,"thinInstance", "Thin Instance", () => changeRendering(Renderer.ThinInstance, scene, recreateScene))
}
