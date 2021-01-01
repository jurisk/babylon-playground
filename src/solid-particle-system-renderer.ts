import {DisposeFunction} from "./renderer";
import {Scene, SolidParticleSystem, SphereBuilder} from "@babylonjs/core";
import {Model} from "./models";

export const solidParticleSystemRenderer = (scene: Scene, model: Model): DisposeFunction => {
    const size = 0.5
    const rows = 4
    const columns = 4
    const sps = new SolidParticleSystem("sps", scene)
    const template = SphereBuilder.CreateSphere("template", { diameter: size })
    sps.addShape(template, rows * columns)
    template.dispose()
    sps.buildMesh()
    sps.initParticles = () => {
        for (let i = 0; i < sps.nbParticles; i++) {
            const column = i % columns
            const row = Math.floor(i / rows)
            const particle = sps.particles[i]
            particle.position.x = column * size
            particle.position.z = row * size
        }
    }
    sps.initParticles()
    sps.setParticles()

    return () => sps.dispose()
}
