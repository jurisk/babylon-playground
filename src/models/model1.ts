import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {Color3} from "@babylonjs/core";
import {Figure, Model} from "./models"
import {normalize} from "../utils/utils";

export const createModel1 = (): Model => {
    const normalizeColor = (c: number) => normalize(c, 0.5 * distance, 3.5 * distance)
    const distance = 1
    const array = [0.5, 1.5, 2.5, 3.5].map((x) => x * distance)

    const figures1: Figure[] =
        array.flatMap((x) =>
            array.flatMap((y) =>
                array.flatMap((z) => {
                    return (x + y + z < distance * 5) ? [{
                        name: `figure_${x}_${y}_${z}`,
                        position: new Vector3(x, y, z),
                        color: new Color3(normalizeColor(x), normalizeColor(y), normalizeColor(z)),
                    }] : []
                })
            )
        )

    return {
        hasGround: true,
        figures: figures1,
    }
}
