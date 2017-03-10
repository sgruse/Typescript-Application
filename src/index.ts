import { NextFunction, Request, Response, Router } from 'express';
import { BaseRoute } from './route';

export class IndexRoute extends BaseRoute {

    public static create(router: Router) {
        // log the creation of route
        console.log('[IndexRoute::create] Creating the index route');

        // add home page route
        router.get('/', (req: Request, res: Response, next: NextFunction) => {
            new IndexRoute().index(req, res, next);
        });

        // this is where you would have multiple routes for this class such as:
        // users/signin
        // users/signup
    }

    constructor() {
        super();
    }

    public index(req: Request, res: Response, next: NextFunction) {
        // custom title
        this.title = 'MESH ATTACKS';

        // set options
        let options: Object = {
            'message': 'Welcome to the ATTACK of MESH!'
        };

        // render the template
        this.render(req, res, 'index', options);
    }
}
