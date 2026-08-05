const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
const cors = require('cors'); // 1. Importa CORS

app.use(cors()); // 2. Activa CORS para permitir conexiones externas

// Permite al servidor leer la información enviada desde el formulario HTML
app.use(express.urlencoded({ extended: true}));

app.use(express.json()); // Permite leer datos en formato JSON si es necesario

// Esta ruta procesa el envío cuando el usuario hace clic en el botón
app.post("/enviar-correo", async (req, res) => {
    const { nombre, email, telefono, asunto, mensaje } = req.body;

    // CONFIGURACIÓN DE TU CUENTA DE CORREO (Remitente)
    const transportador = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "fortalece.david@gmail.com", // Escribe aquí tu correo de Gmail
            pass: "zqcz unzr hhjk ehry" // Tu contraseña segura de aplicación
        }
    });

    // DISEÑO DEL CORREO QUE TE LLEGARÁ A TI (Destinatario)
    const opcionesCorreo = {
        from: email,
        to: "fortalece.david@gmail.com", // Correo donde quieres recibir los mensajes
        subject: `Nuevo mensaje en portafolio de: ${nombre}`,
        text: `Nombre del remitente: ${nombre}\nTeléfono: ${telefono}\nCorreo: ${email}\n\nAsunto: ${asunto}\n\nMensaje:\n${mensaje}`
    };

    try {
        await transportador.sendMail(opcionesCorreo);
        // Cambia el antiguo res.send('<h1>¡Formulario enviado!</h1>') por esto:
        res.sendStatus(200); // Envía un estado "OK" de código de éxito al Frontend    
    } catch (error) {
        console.error(error);
        res.status(500).send("Hubo un error al preocesar o enviar el correo.");
    }
});

// Enciende el servidor local
app.listen(3000, () => {
    console.log("Tu servidor backend está corriendo en http://localhost:3000");
});