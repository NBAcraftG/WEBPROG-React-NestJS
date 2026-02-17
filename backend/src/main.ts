const app = await NestFactory.create(AppModule);
app.enableCors(); // Essential for React communication
await app.listen(3000);