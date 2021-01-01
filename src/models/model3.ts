import {FigureType, Model} from "./models";
import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {Color3} from "@babylonjs/core";

export const createModel3 = (): Model => {
    const colours: [number, number, number][] = [
        [76, 5, 148],
        [53, 126, 205],
        [36, 196, 66],
        [229, 227, 63],
        [229, 124, 0],
        [206, 20, 31],
    ]

    const figures = colours.map((rgb, idx) => {
        return {
            name: `figure-${idx}`,
            type: 'square-chip' as FigureType,
            position: new Vector3(0, 0.25 + idx * 0.5, 0),
            rotation: new Vector3(0, idx * (Math.PI / 2) / (colours.length - 1), 0),
            color: new Color3(rgb[0] / 256, rgb[1] / 256, rgb[2] / 256),
        }
    })

    return {
        hasGround: true,
        figures: figures,
    }
}

