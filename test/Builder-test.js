import { Builder } from "../src";
import Container from "../src/Container";

describe("Builder", function() {
    beforeEach(() => {
        const that = this;
        this.MockedContainerProperties = {
            components: [
                { constr: chai.spy(), parameters: [1, 2, 3] },
                { constr: chai.spy(), parameters: [2, 3, 4] }
            ],
            addComponent: chai.spy(),
            rolesGetter: chai.spy(() => "this is the value of 'roles'"),
            forEachNewableComponent: chai.spy(func => {
                this.MockedContainerProperties.components.forEach(component => {
                    func(component);
                });
            })
        };
        class MockedContainer {
            addComponent(...args){
                return that.MockedContainerProperties.addComponent(...args);
            }
            get roles(){
                return that.MockedContainerProperties.rolesGetter();
            }
            forEachNewableComponent(...args){
                return that.MockedContainerProperties.forEachNewableComponent(...args);
            }
        }

        this.savedContainerPrototype = Container.prototype;
        Container.prototype = MockedContainer.prototype;

        this.builder = new Builder();
    });

    afterEach(() => {
        Container.prototype = this.savedContainerPrototype;
    });

    it("implements interface", () => {
        this.builder.should.respondTo("addComponent");
        this.builder.should.respondTo("build");
    });

    describe("Calling addComponent", () => {
        beforeEach(() => {
            this.builder.addComponent(1, "a", 3);
        });
        it("calls 'addComponent' on the Container with the same parameters", () => {
            this.MockedContainerProperties.addComponent.should.have.been.called.once;
            this.MockedContainerProperties.addComponent.should.have.been.called.with(1, "a", 3);
        });
    });

    describe("Calling build", () => {
        beforeEach(() => {
            return this.builder.build();
        });
        it("should call container.forEachNewableComponent once", () => {
            this.MockedContainerProperties.forEachNewableComponent.should.have.been.called.once;
        });
        it("gets the 'roles' property", () => {
            this.MockedContainerProperties.rolesGetter.should.have.been.called(3);
        });
        it("calls all the components constructors", () => {
            this.MockedContainerProperties.components.forEach(({ constr }, index) => {
                constr.should.have.been.called.once;
                constr.should.have.been.called.with("this is the value of 'roles'", index + 1, index + 2, index + 3);
            });
        });
    });
});
