import Container from "./Container";
import DepError from "./DepError";

export default class Factory {
    static createDepError(...args) {
        return new DepError(...args);
    }
    static createContainer(...args) {
        return new Container(...args);
    }
}
