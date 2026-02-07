// ===== CREDENZIALI ADMIN =====
const ADMIN_EMAIL = "admin@ladolcetavola.it"; // cambia email
const ADMIN_PASSWORD = "123456";             // cambia password

// ===== STATO LOGIN =====
const isAdmin = localStorage.getItem("logged") === "true";

// ===== MENU DATI =====
let menu = JSON.parse(localStorage.getItem("menu")) || [
    { nome: "Margherita", prezzo: 8 },
    { nome: "Marinara", prezzo: 6 },
    { nome: "Napoli", prezzo: 8 },
    { nome: "Tartufo & Burrata", prezzo: 13 },
    { nome: "Prosciutto Crudo e Rucola", prezzo: 11 }
];

// ===== LOGIN =====
function login() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        localStorage.setItem("logged", "true");
        window.location.href = "/"; // ritorna al sito principale
    } else {
        alert("Credenziali errate");
    }
}

// ===== LOGOUT =====
function logout() {
    localStorage.removeItem("logged");
    location.reload();
}

// ===== RENDER MENU =====
function renderMenu() {
    const lista = document.getElementById("menu");
    if (!lista) return;

    lista.innerHTML = "";

    menu.forEach((item, index) => {
        const li = document.createElement("li");

        if (isAdmin) {
            li.innerHTML = `
                <input value="${item.nome}" onchange="menu[${index}].nome=this.value">
                <input type="number" value="${item.prezzo}" onchange="menu[${index}].prezzo=this.value">
            `;
        } else {
            li.innerHTML = `
                <span>${item.nome}</span>
                <span>€${item.prezzo}</span>
            `;
        }

        lista.appendChild(li);
    });

    if (isAdmin) {
        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Salva Modifiche";
        saveBtn.onclick = salvaMenu;
        lista.parentElement.appendChild(saveBtn);

        const logoutBtn = document.createElement("button");
        logoutBtn.textContent = "Esci";
        logoutBtn.onclick = logout;
        lista.parentElement.appendChild(logoutBtn);
    }
}

// ===== SALVA MENU =====
function salvaMenu() {
    localStorage.setItem("menu", JSON.stringify(menu));
    alert("Menu aggiornato!");
}

// ===== AVVIO =====
document.addEventListener("DOMContentLoaded", renderMenu);
