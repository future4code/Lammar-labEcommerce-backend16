import { app } from "./app";
import { getAllProducts } from "./endpoints/getAllProducts";
import { getAllUsers } from "./endpoints/getAllUsers";
import { registerProduct } from "./endpoints/registerProduct";
import { registerPurchase } from "./endpoints/registerPurchase";
import { registerUser } from "./endpoints/registerUser";

app.get("/users", getAllUsers)

app.get("/products", getAllProducts)

app.post("/users", registerUser)

app.post("/products", registerProduct)

app.post("/purchases", registerPurchase)