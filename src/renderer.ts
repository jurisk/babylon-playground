import {Renderer} from "./domain";
import {meshRenderer} from "./meshRenderer";
import {Node, Scene} from "@babylonjs/core";
import {cloneRenderer} from "./cloneRenderer";
import {Model} from "./models";
import {thinInstanceRenderer} from "./thin-instance-renderer"
import {instancedMeshRenderer} from "./instanced-mesh-renderer";
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
        case Renderer.ThinInstance:
            return thinInstanceRenderer
        case Renderer.InstancedMesh:
            return instancedMeshRenderer
        case Renderer.SolidParticleSystem:
            return solidParticleSystemRenderer
    }
}
