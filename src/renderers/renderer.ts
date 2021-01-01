import {Renderer} from "../domain";
import {Node, Scene} from "@babylonjs/core";
import {Model} from "../models/models";
import {meshRenderer} from "./meshRenderer";
import {cloneRenderer} from "./cloneRenderer";
import {instancedMeshRenderer} from "./instanced-mesh-renderer";
import {thinInstanceRenderer} from "./thin-instance-renderer"
import {solidParticleSystemRenderer} from "./solid-particle-system-renderer";

export type DisposeFunction = () => void
export type RenderFunction = (scene: Scene, model: Model) => DisposeFunction

export const nodeDisposer = (nodes: Node[]): DisposeFunction => () =>
    nodes.forEach((node) => node.dispose())

export const selectRenderer = (renderer: Renderer): RenderFunction => {
    switch (renderer) {
        case Renderer.Mesh:
            return meshRenderer
        case Renderer.Clone:
            return cloneRenderer
        case Renderer.InstancedMesh:
            return instancedMeshRenderer
        case Renderer.ThinInstance:
            return thinInstanceRenderer
        case Renderer.SolidParticleSystem:
            return solidParticleSystemRenderer
    }
}
