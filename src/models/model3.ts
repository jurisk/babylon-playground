import {FigureType, Model, squareChipHeight} from "./models";
import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {Color3} from "@babylonjs/core";
import {range} from "fp-ts/Array";

export const createModel3 = (): Model => {
    const colours: [number, number, number][] = range(0, 16).map((idx) => [(16 - idx) * 16, 0, idx * 16])

    const figures = colours.map((rgb, idx) => {
        return {
            name: `figure-${idx}`,
            type: 'square-chip' as FigureType,
            position: new Vector3(0, squareChipHeight / 2 + idx * squareChipHeight, 0),
            rotation: new Vector3(0, idx * (Math.PI / 2) / (colours.length - 1), 0),
            color: new Color3(rgb[0] / 256, rgb[1] / 256, rgb[2] / 256),
        }
    })

    return {
        hasGround: true,
        figures: figures,
    }
}

