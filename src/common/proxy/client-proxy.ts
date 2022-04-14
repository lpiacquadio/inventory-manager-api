import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import {
    ClientProxy,
    ClientProxyFactory,
    Transport
} from '@nestjs/microservices'

import { config } from 'src/config'
import { RabbitMQ } from '../constants'

@Injectable()
export class ClientProxyInventoryManager {
    constructor(
        @Inject(config.KEY) private configService: ConfigType<typeof config>
    ) {}

    clientProxyUsers(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.amqpUrl],
                queue: RabbitMQ.UserQueue
            }
        })
    }

    clientProxyCustomers(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.amqpUrl],
                queue: RabbitMQ.CustomerQueue
            }
        })
    }

    clientProxyBrands(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.amqpUrl],
                queue: RabbitMQ.BrandQueue
            }
        })
    }

    clientProxyCategories(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.amqpUrl],
                queue: RabbitMQ.CategoryQueue
            }
        })
    }

    clientProxyOrders(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.amqpUrl],
                queue: RabbitMQ.OrderQueue
            }
        })
    }

    clientProxyProducts(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [this.configService.amqpUrl],
                queue: RabbitMQ.ProductQueue
            }
        })
    }
}
