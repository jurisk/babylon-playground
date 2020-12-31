import {Color3} from "@babylonjs/core";
import {Vector3} from "@babylonjs/core/Maths/math.vector";

export interface Figure {
    coordinates: Vector3
    color: Color3
}

const normalizeColor1 = (c: number) => c / (3 * distance)
const distance = 1
const array = [0, 1, 2, 3].map((x) => x * distance)

export const figures0: Figure[] =
    array.flatMap((x) =>
        array.flatMap((y) =>
            array.map((z) => {
                return {
                    coordinates: new Vector3(x, y, z),
                    color: new Color3(normalizeColor1(x), normalizeColor1(x), normalizeColor1(x)),
                }
            })
        )
    )

export const figures1: Figure[] =
    array.flatMap((x) =>
        array.flatMap((y) =>
            array.flatMap((z) => {
                return (x + y + z > distance * 5) ? [{
                    coordinates: new Vector3(x, y, z),
                    color: new Color3(normalizeColor1(x), normalizeColor1(x), normalizeColor1(x)),
                }] : []
            })
        )
    )
