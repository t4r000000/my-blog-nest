import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const server = await app.listen(8080);
  server.setTimeout(120000); //timeout 2min
};
bootstrap();
