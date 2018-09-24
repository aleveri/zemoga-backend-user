var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
const jwtAuthz = require('express-jwt-authz');

var auth = {};

auth.checkJwt = function () {
    try {
        return jwt({
            secret: jwks.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: "https://marketplace-admin.au.auth0.com/.well-known/jwks.json"
            }),
            audience: 'Seguro-Autocontenido',
            issuer: "https://marketplace-admin.au.auth0.com/",
            algorithms: ['RS256']
        });
    } catch (error) {
        return next(new UnauthorizedError('Unauthorized: ', error.message));
    }
}

auth.checkScopes = function (scope) {
    try {
        var scopes = [];
        scopes.push(scope);
        return jwtAuthz(scopes);
    } catch (error) {
        return next(new UnauthorizedError('Unauthorized: ', error.message));
    }
}

module.exports = auth;