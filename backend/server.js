import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB conectado"))
.catch((err) => {
  console.error("❌ Error al conectar a MongoDB:", err.message);
  process.exit(1); // Detener la app si falla la conexión
});

// Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Ruta por defecto
app.get("/", (req, res) => {
  res.send("API TODO funcionando");
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada" });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Servidor escuchando en http://localhost:${PORT}`)
);
