import {Color3} from "@babylonjs/core";
import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {Exercise} from "../domain";
import {createModel0} from "./model0";
import {createModel1} from "./model1";
import {createModel2} from "./model2";
import {createModel3} from "./model3";

export type FigureType = 'sphere' | 'square-chip'

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
