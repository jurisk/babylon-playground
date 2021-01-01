import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {Color3} from "@babylonjs/core";
import {Figure, Model} from "./models";
import {normalizeColor} from "../utils/utils";

const normalizeColor0 = (c: number) => normalizeColor(c, -1.5 * distance, 1.5 * distance)
const distance = 1
const array = [-1.5, -0.5, 0.5, 1.5].map((x) => x * distance)

const figures0: Figure[] =
    array.flatMap((x) =>
        array.flatMap((y) =>
            array.map((z) => {
                return {
                    name: `figure_${x}_${y}_${z}`,
                    position: new Vector3(x, y, z),
                    color: new Color3(normalizeColor0(x), normalizeColor0(y), normalizeColor0(z)),
                }
            })
        )
    )

export const model0: Model = {
    hasGround: false,
    figures: figures0,
}

