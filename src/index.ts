import { app } from "./app";
import { registerUser } from "./endpoints/registerUser";

app.post("/users", registerUser)