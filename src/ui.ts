import * as GUI from "@babylonjs/gui";
import {Exercise, Renderer} from "./domain";

export const createUi = (changeExercise: (exercise: Exercise) => void, changeRenderer: (renderer: Renderer) => void) => {
    const createButton = (parent: GUI.Container, name: string, text: string, callback: () => void) => {
        const button = GUI.Button.CreateSimpleButton(name, text)
        button.width = "120px"
        button.height = "40px"
        button.color = "white"
        button.background = "blue"
        button.onPointerUpObservable.add(callback)
        parent.addControl(button)
    }

    const ui = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI")
    const exercisePanel = new GUI.StackPanel("exercisePanel")
    ui.addControl(exercisePanel)
    exercisePanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP
    exercisePanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    createButton(exercisePanel,"exercise0", "Exercise 0", () => changeExercise(Exercise.Exercise0))
    createButton(exercisePanel,"exercise1", "Exercise 1", () => changeExercise(Exercise.Exercise1))
    createButton(exercisePanel,"exercise2", "Exercise 2", () => changeExercise(Exercise.Exercise2))
    createButton(exercisePanel,"exercise3", "Exercise 3", () => changeExercise(Exercise.Exercise3))

    const renderingPanel = new GUI.StackPanel("renderingPanel")
    ui.addControl(renderingPanel)
    renderingPanel.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM
    renderingPanel.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER
    createButton(renderingPanel,"mesh", "Mesh", () => changeRenderer(Renderer.Mesh))
    createButton(renderingPanel,"clone", "Clone", () => changeRenderer(Renderer.Clone))
    createButton(renderingPanel,"instancedMesh", "Instanced Mesh", () => changeRenderer(Renderer.InstancedMesh))
    createButton(renderingPanel,"thinInstance", "Thin Instance", () => changeRenderer(Renderer.ThinInstance))
    createButton(renderingPanel,"solidParticleSystem", "Solid Particle System", () => changeRenderer(Renderer.SolidParticleSystem))
}
