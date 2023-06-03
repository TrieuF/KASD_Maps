import Hapi from "@hapi/hapi";
import Vision from "@hapi/vision";
import Handlebars from "handlebars";
import path from "path";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import Inert from "@hapi/inert"
import { fileURLToPath } from "url";
import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js"
import { db } from "./models/db.js";
import {accountController} from "./controllers/accounts-controller.js";
import { maggie } from "../test/fixtures.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function init() {
    const server = Hapi.server({
        port: process.env.PORT || 3000,
        host: "localhost",
    });
    await server.register(Vision);
    await server.register(Cookie);
    await server.register(Inert);

    const result = dotenv.config();
    if (result.error){
        console.log(result.error.message);
        process.exit(1);
    };

    server.views({
        engines: {
            hbs: Handlebars,
        },
        relativeTo: __dirname,
        path: "./pages",
        layoutPath: "./pages",
        partialsPath: "./pages/partials",
        layout: true,
        isCached: false,
    });

    server.auth.strategy("session", "cookie",{
        cookie:{
            name: process.env.cookie_name,
            password: process.env.cookie_password,
            isSecure: false,
        },
        redirectTo: "/",
        validate: accountController.validate,
    });
    server.auth.default("session");
    db.init();
    const usertest = await db.userStore.getUserByEmail("maggie@simpson.com"); //creating Admin account, later seeded in deployment
    if(!usertest){ await db.userStore.addUser(maggie);}
    server.route(webRoutes);
    server.route(apiRoutes);
    await server.start();
    console.log("Server running on %s", server.info.uri);
}

process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);


});

init();