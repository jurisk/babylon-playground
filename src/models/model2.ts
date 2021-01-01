import {Color3} from "@babylonjs/core";
import {Figure, FigureType, Model} from "./models";
import {normalize} from "../utils/utils";
import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {range} from "fp-ts/Array";

export const createModel2 = (): Model => {
    const figures: Figure[] = [];

    range(0, 3).forEach((level) => {
        range(0, 3 - level).forEach((r) => {
            range(0, 3 - level).forEach((c) => {
                const x = level + r - level / 2 - 1.5
                const z = level + c - level / 2 - 1.5
                const y = 0.5 + level * (1 / Math.sqrt(2)) // Height of a equilateral square pyramid: https://en.wikipedia.org/wiki/Square_pyramid#Equilateral_square_pyramid,_Johnson_solid_J1
                const figure = {
                    name: `figure_${x}_${y}_${z}`,
                    type: 'sphere' as FigureType,
                    position: new Vector3(x, y, z),
                    color: new Color3(normalize(r, 0, 3 - level), normalize(level, 0, 3), normalize(c, 0, 3 - level)),
                }

                figures.push(figure)
            })
        })
    })

    return {
        hasGround: true,
        figures: figures,
    }
}
