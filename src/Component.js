export default class Component {
    constructor(args) {
        Object.keys(args).map(propertyName => {
            this[`_${propertyName}`] = args[propertyName];
        });
    }

    get type() {
        return this._type;
    }

    get roleName() {
        return this._roleName;
    }

    get value() {
        return this._value;
    }

    set value(newValue) {
        return this._value = newValue;
    }
}
