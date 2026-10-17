/*
|--------------------------------------------------------------------------
| Application middleware
|--------------------------------------------------------------------------
|
| Global middleware runs, in order, for every HTTP request.
|
*/

import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([() => import('@ioc:Adonis/Core/BodyParser')])

Server.middleware.registerNamed({})
