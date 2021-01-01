import {Color3} from "@babylonjs/core";
import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {Exercise} from "./domain";

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
            return {
                hasGround: false,
                figures: figures0,
            }

        case Exercise.Exercise1:
            return {
                hasGround: true,
                figures: figures1,
            }

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

const normalizeColor1 = (c: number) => c / (3 * distance)
const distance = 1
const array = [0, 1, 2, 3].map((x) => x * distance)

const figures0: Figure[] =
    array.flatMap((x) =>
        array.flatMap((y) =>
            array.map((z) => {
                return {
                    name: `figure_${x}_${y}_${z}`,
                    position: new Vector3(x, y, z),
                    color: new Color3(normalizeColor1(x), normalizeColor1(y), normalizeColor1(z)),
                }
            })
        )
    )

const figures1: Figure[] =
    array.flatMap((x) =>
        array.flatMap((y) =>
            array.flatMap((z) => {
                return (x + y + z > distance * 5) ? [{
                    name: `figure_${x}_${y}_${z}`,
                    position: new Vector3(x, y, z),
                    color: new Color3(normalizeColor1(x), normalizeColor1(y), normalizeColor1(z)),
                }] : []
            })
        )
    )

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
