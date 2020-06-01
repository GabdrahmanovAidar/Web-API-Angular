export default class Support {
    constructor(
        public email: string,
        public problem: string,
        public message: string
    ) {
        this.email = email;
        this.problem = problem;
        this.message = message;
    }
}
