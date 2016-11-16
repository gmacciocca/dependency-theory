import Container from "../src/Container";

describe("Container", function() {
    beforeEach(() => {
        this.container = new Container();
    });

    it("implements interface", () => {
        this.container.should.respondTo("addComponent");
        this.container.should.respondTo("forEachNewableComponent");
        this.container.should.have.property("roles");
    });
});
