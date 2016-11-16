import DepError from "./DepError";
import Container from "./Container";

export default class Builder {
    constructor() {
        this._container = new Container();
    }

    addComponent(...args) {
        return this._container.addComponent(...args);
    }

    build() {
        return new Promise((resolve, reject) => {
            try {
                this._createDepencencyClasses();
                resolve(this._container.roles);
            } catch (err) {
                reject(new DepError("DEP.BUILD_ERROR", {
                    message: "Dependency Builder: error creating components.",
                    originalError: err
                }));
            }
        });
    }

    _createDepencencyClasses() {
        this._container.forEachNewableComponent(component => {
            const { constr, parameters } = component;
            component.value = new constr(this._container.roles, ...parameters);
        });
    }
}
