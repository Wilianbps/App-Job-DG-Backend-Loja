import express from "express";
import router from './router.js';
import cors from "cors";

const app = express();

// Middleware de CORS
app.use(cors());

// Configurar o limite máximo para JSON e URL-encoded
app.use(express.json({ limit: '500mb' })); // Define o limite para JSON
app.use(express.urlencoded({ limit: '500mb', extended: true })); // Define o limite para forms

// Adicionar rotas
app.use(router);

export default app;
