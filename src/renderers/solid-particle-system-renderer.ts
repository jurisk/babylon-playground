import {DisposeFunction} from "./renderer";
import {Color4, Scene, SolidParticleSystem} from "@babylonjs/core";
import {Model, singleTemplate} from "../models/models";

export const solidParticleSystemRenderer = (scene: Scene, model: Model): DisposeFunction => {
    const template = singleTemplate(model.figures, scene)

    const sps = new SolidParticleSystem("sps", scene)
    sps.addShape(template, model.figures.length)
    template.dispose()
    sps.buildMesh()
    sps.initParticles = () => {
        model.figures.forEach((figure, idx) => {
            const particle = sps.particles[idx]
            particle.position = figure.position
            particle.color = new Color4(figure.color.r, figure.color.g, figure.color.b, 1)
            if (figure.rotation) {
                particle.rotation = figure.rotation
            }
        })
    }
    sps.initParticles()
    sps.setParticles()

    return () => sps.dispose()
}
