import { Application, Router } from 'express';
import { HealthRouter } from './healt.route';
import { StudentRouter } from './student.route';

const _routes: Array<[string, Router]> = [
    ['health', HealthRouter],
    ['student', StudentRouter]
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, router] = route;
        app.use(`/api/${url}`, router);
    });
};
