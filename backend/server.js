const jsonServer = require("json-server-relationship");
const express = require("express");
const multer = require("multer");
const path = require("path");
const server = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

const router = jsonServer.router("db/db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use("/uploads", express.static("uploads"));
server.post("/planetas", upload.single("imagem"), (req, res) => {
  const newPlaneta = {
    id: router.db.get("planetas").size() + 1,
    nome: req.body.nome,
    descricao: req.body.descricao,
    categoriaId: req.body.categoriaId,
    gravidadeId: req.body.gravidadeId,
    climaId: req.body.climaId,
    foto: req.file ? `/uploads/${req.file.filename}` : null,
  };

  router.db.get("planetas").push(newPlaneta).write();
  res.status(201).json(newPlaneta);
});

server.use(router);
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
