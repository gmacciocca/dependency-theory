import ComponentFromValue from "./ComponentFromValue";
import ComponentFromClass from "./ComponentFromClass";
import COMPONENT_TYPES from "./ComponentTypes";

export default class Container {
    constructor() {
        this._components = {};
        this._roles = { isRolesContanier: true };
    }

    addComponent({ roleName, value, constr, ...parameters }) {
        this._components[roleName] = constr ?
            new ComponentFromClass(roleName, constr, ...parameters) :
            new ComponentFromValue(roleName, value, ...parameters);
        return this;
    }

    forEachNewableComponent(func) {
        Object.keys(this._components)
        .filter(roleName => this._components[roleName].type === COMPONENT_TYPES.CLASS)
        .forEach(roleName => func(this._components[roleName]));
    }

    get roles() {
        Object.keys(this._components).forEach(roleName => {
            if (this._components[roleName].value) {
                this._roles[roleName] = this._components[roleName].value;
            }
        });
        return this._roles;
    }
}
