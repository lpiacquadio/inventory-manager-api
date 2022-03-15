import { Injectable, Inject } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { config } from './config'

@Injectable()
export class AppService {
    constructor(
        @Inject('TASKS') private tasks: any[],
        @Inject(config.KEY) private configService: ConfigType<typeof config>
    ) {}
    getApiKey(): string {
        console.log(this.tasks)
        return `api_key: ${this.configService.apiKey}, db_name: ${this.configService.database.name}`
    }
}
