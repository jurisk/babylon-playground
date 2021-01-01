import {Figure, Model} from "./models";
import {Vector3} from "@babylonjs/core/Maths/math.vector";
import {Color3} from "@babylonjs/core";

export const createModel3 = (): Model => {
    // TODO: implement
    const figures3: Figure[] = [{
        name: 'test',
        position: new Vector3(0, 0, 0),
        color: new Color3(0.5, 0.5, 0.5),
    }]

    return {
        hasGround: true,
        figures: figures3,
    }
}

