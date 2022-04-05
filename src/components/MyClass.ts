class Greeter {
    private greeting: string;
    constructor(message: string) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
    sayHello() {
        console.log(this.greet());
    }
    setGreeting(message: string) {
        this.greeting = message;
    }
}

let greeter = new Greeter("world");
greeter.setGreeting("ruobing");
greeter.sayHello();
