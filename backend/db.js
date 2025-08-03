import pkg from "pg";

const {Pool} =pkg;

 const pool = new Pool({
    user: "postgres",
    password: "Greetika1@",
    host: "localhost",
    database: "task_manager",
    port: "5432"
});
export default pool;