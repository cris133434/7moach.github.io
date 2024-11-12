<script>
    // Variables para el monto de la donación seleccionada
    let selectedAmount = 0;

    // Actualiza el monto seleccionado al hacer clic en los botones de aporte
    document.querySelectorAll('.btn-outline-primary').forEach(button => {
        button.addEventListener('click', function() {
            selectedAmount = parseInt(this.innerText.replace('$', ''));
            document.getElementById('selectedAmount').innerText = `$${selectedAmount} seleccionado`;
        });
    });

      // Renderizar el botón de PayPal
    paypal.Buttons({
        createOrder: function(data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: {
                        value: selectedAmount
                    }
                }]
            });
        },
        onApprove: function(data, actions) {
            return actions.order.capture().then(function(details) {
                alert('Gracias por tu aporte de $' + selectedAmount + '!');
            });
        }
    }).render('#paypal-button');
</script>

const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
    const userMessage = req.body.message;
    // Llama a la API de IA aquí (OpenAI o similar)
    try {
        const response = await axios.post("https://api.openai.com/v1/engines/text-davinci-003/completions", {
            prompt: userMessage,
            max_tokens: 50
        }, {
            headers: {
                Authorization: `Bearer YOUR_API_KEY`
            }
        });
        res.json({ respuesta: response.data.choices[0].text });
    } catch (error) {
        res.status(500).send("Error en la IA");
    }
});

app.listen(3000, () => console.log("Servidor en http://localhost:3000"));
async function fetchRespuestaIA(mensaje) {
    const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: mensaje })
    });
    const data = await response.json();
    return data.respuesta;
}

// Abrir y cerrar el chatbot
document.getElementById("openChatBot").onclick = function() {
    document.getElementById("chatbotWindow").style.display = "block";
    document.getElementById("openChatBot").style.display = "none";
};

document.getElementById("closeChatBot").onclick = function() {
    document.getElementById("chatbotWindow").style.display = "none";
    document.getElementById("openChatBot").style.display = "block";
};

// Enviar el mensaje del usuario
async function enviarMensaje() {
    const mensaje = document.getElementById("userMessage").value;
    if (!mensaje) return;

    // Mostrar el mensaje del usuario en la ventana del chat
    const chatMessages = document.getElementById("chatMessages");
    const userMessageDiv = document.createElement("div");
    userMessageDiv.textContent = "Tú: " + mensaje;
    chatMessages.appendChild(userMessageDiv);

    // Limpiar el input
    document.getElementById("userMessage").value = "";

    // Obtener la respuesta de la IA (simulación de ejemplo)
    const respuestaIA = await fetchRespuestaIA(mensaje);

    // Mostrar la respuesta de la IA en la ventana del chat
    const botMessageDiv = document.createElement("div");
    botMessageDiv.textContent = "7moA IA: " + respuestaIA;
    chatMessages.appendChild(botMessageDiv);

    // Desplazarse al final de los mensajes
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Función simulada para obtener respuesta IA
async function fetchRespuestaIA(mensaje) {
    // Aquí llamas al backend (como en el paso anterior)
    const response = await fetch("http://localhost:3000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: mensaje })
    });
    const data = await response.json();
    return data.respuesta;
}
// Funciones para abrir y cerrar el chatbot
document.getElementById("openChatBot").addEventListener("click", function() {
    document.getElementById("chatbotWindow").style.display = "block";
});

document.getElementById("closeChatBot").addEventListener("click", function() {
    document.getElementById("chatbotWindow").style.display = "none";
});
