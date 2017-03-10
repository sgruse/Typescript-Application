import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as logger from "morgan";
import * as path from "path";
import errorHandler = require("errorhandler");
import methodOverride = require("method-override");

// routes
import { IndexRoute } from './routes/index';

export class Server {
    // This is a single publicly available variable named 'app' and is of type express.Application
    public app: express.Application;

    /*
    * Boot strapping the application =
    * A boostrap loader is the first piece of code
    * that rns when a machine starts and is responsible for
    * loading the rest of the operating system.
    */

    public static bootstrap(): Server {
        // Returns the newly created injector for this app
        return new Server();
    }

    constructor() {
        // Creates, configures, and adds routes to the application
        this.app = express();

        this.config();

        this.routes();

        this.api();
    }

    public api() {

    }

    public config() {
        // add static paths
        this.app.use(express.static(path.join(__dirname, 'public')));

        // configure the pug view file
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');

        // use logger middleware
        this.app.use(logger('dev'));

        // use json from parser middleware
        this.app.use(bodyParser.json());

        // use query string parser
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        // use cookie parser
        this.app.use(cookieParser('SECRET_GOES_HERE'));

        // user override middleware
        this.app.use(methodOverride());

        // catch 404 and forward to error handler
        this.app.use(function(err: any, req: express.Request, res: express.Response, next: express.NextFunction) {
            err.status = 404;
            next(err);
        });

        // error handling
        this.app.use(errorHandler());
    }

    private routes() {
        let router: express.Router;
        router = express.Router();

        // Index route
        IndexRoute.create(router);

        // use router middleware
        this.app.use(router);
    }
}
