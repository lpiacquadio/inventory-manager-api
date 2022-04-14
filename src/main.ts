import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { AllExceptionFilter } from './common/filters/http-exception.filter'
import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalFilters(new AllExceptionFilter())
    app.useGlobalInterceptors(new TimeOutInterceptor())
    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transformOptions: {
                enableImplicitConversion: true
            }
        })
    )
    const config = new DocumentBuilder()
        .setTitle('API')
        .setDescription('INVENTORY MANAGER')
        .setVersion('1.0')
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)
    app.enableCors()
    await app.listen(process.env.PORT || 3000)
}
bootstrap()
