import { Module } from '@nestjs/common'

import { ClientProxyInventoryManager } from './client-proxy'

@Module({
    providers: [ClientProxyInventoryManager],
    exports: [ClientProxyInventoryManager]
})
export class ProxyModules {}
