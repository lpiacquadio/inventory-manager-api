import { Module, Global } from '@nestjs/common'
import { HttpModule, HttpService } from '@nestjs/axios'

@Global()
@Module({
    imports: [HttpModule],
    providers: [
        {
            provide: 'TASKS',
            useFactory: async (http: HttpService) => {
                const tasks = await http
                    .get('https://jsonplaceholder.typicode.com/todos')
                    .toPromise()
                return tasks.data
            },
            inject: [HttpService]
        }
    ],
    exports: ['TASKS']
})
export class DatabaseModule {}
