import {BoxBuilder, Color3, Mesh, Scene, SphereBuilder} from "@babylonjs/core";
import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {Exercise} from "../domain";
import {createModel0} from "./model0";
import {createModel1} from "./model1";
import {createModel2} from "./model2";
import {createModel3} from "./model3";

export type FigureType = 'sphere' | 'square-chip'

export const buildTemplates = (scene: Scene): Record<FigureType, Mesh> => {
    return {
        'sphere': buildTemplate('sphere', scene),
        'square-chip': buildTemplate('square-chip', scene),
    }
}

export const squareChipHeight = 0.2

export const buildTemplate = (figureType: FigureType, scene: Scene) => {
    switch (figureType) {
        case 'sphere':
            const sphere = SphereBuilder.CreateSphere(figureType, { diameter: 1 }, scene)
            sphere.receiveShadows = true
            return sphere
        case 'square-chip':
            const box = BoxBuilder.CreateBox(figureType, {width: 2, depth: 2, height: squareChipHeight}, scene)
            box.receiveShadows
            return box
    }
}

export const singleTemplate = (figures: Figure[], scene: Scene) => {
    const figureType = figures[0].type
    if (!figures.every((figure) => figure.type === figureType)) {
        throw new Error("Expected all figures to have the same type")
    }

    return buildTemplate(figureType, scene)
}

export interface Figure {
    position: Vector3
    rotation?: Vector3
    type: FigureType,
    color: Color3
    name: string
}

export interface Model {
    hasGround: boolean
    figures: Figure[]
}

export const selectModel = (exercise: Exercise): Model => {
    switch (exercise) {
        case Exercise.Exercise0:
            return createModel0()

        case Exercise.Exercise1:
            return createModel1()

        case Exercise.Exercise2:
            return createModel2()

        case Exercise.Exercise3:
            return createModel3()
    }
}
