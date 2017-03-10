class Animal {
    private name: string;
    constructor(theName: string) { this.name = theName; }
}

- why is there a 'name' above the constructor and what does this do?
- Not sure about the relation between the www.js file and the server.ts files. This line in www / server.Server.bootstrap().app?

-     public static bootstrap(): Server {
        // Returns the newly created injector for this app
        return new Server();
    }
        - Does this mean of 'type' server?

- If app = the returned server, where does set come from? in the www file

- What do these lines mean within a class
    protected title: string;
    private scripts: string[];
