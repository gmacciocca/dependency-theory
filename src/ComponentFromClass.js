import COMPONENT_TYPES from "./ComponentTypes";
import Component from "./Component";

export default class ComponentFromClass extends Component {
    constructor(roleName, constr, ...parameters) {
        super({ type: COMPONENT_TYPES.CLASS, roleName, constr, parameters });
    }

    get constr() {
        return this._constr;
    }

    get parameters() {
        return this._parameters;
    }
}
