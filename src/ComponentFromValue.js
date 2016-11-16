import COMPONENT_TYPES from "./ComponentTypes";
import Component from "./Component";

export default class ComponentFromValue extends Component {
    constructor(roleName, value) {
        super({ type: COMPONENT_TYPES.VALUE, roleName, value });
    }
}
