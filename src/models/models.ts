import {Color3} from "@babylonjs/core";
import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {Exercise} from "../domain";
import {model0} from "./model0";
import {model1} from "./model1";

export interface Figure {
    position: Vector3
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
            return model0

        case Exercise.Exercise1:
            return model1

        case Exercise.Exercise2:
            return {
                hasGround: true,
                figures: figures2,
            }

        case Exercise.Exercise3:
            return {
                hasGround: true,
                figures: figures3,
            }
    }
}

// TODO: implement
const figures2: Figure[] = [{
    name: 'test',
    position: new Vector3(0, 0, 0),
    color: new Color3(0.5, 0.5, 0.5),
}]

// TODO: implement
const figures3: Figure[] = [{
    name: 'test',
    position: new Vector3(0, 0, 0),
    color: new Color3(0.5, 0.5, 0.5),
}]
