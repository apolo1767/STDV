const content = document.getElementById("content");
const pageTitle = document.getElementById("pageTitle");

const db = {
  inventory: JSON.parse(localStorage.getItem("inventory")) || [],
  sales: JSON.parse(localStorage.getItem("sales")) || [],
  clients: JSON.parse(localStorage.getItem("clients")) || []
};

function saveDB() {
  localStorage.setItem("inventory", JSON.stringify(db.inventory));
  localStorage.setItem("sales", JSON.stringify(db.sales));
  localStorage.setItem("clients", JSON.stringify(db.clients));
}

function loadView(view) {
  pageTitle.textContent = view.charAt(0).toUpperCase() + view.slice(1);

  if (view === "dashboard") dashboard();
  if (view === "inventory") inventory();
  if (view === "sales") sales();
  if (view === "finance") finance();
  if (view === "crm") crm();
  if (view === "hr") hr();
  if (view === "settings") settings();
}

/* DASHBOARD */
function dashboard() {
  content.innerHTML = `
    <div class="card">
      <h3>Total Inventory</h3>
      <strong>${db.inventory.length}</strong>
    </div>
    <div class="card">
      <h3>Total Sales</h3>
      <strong>${db.sales.length}</strong>
    </div>
    <div class="card">
      <h3>Clients</h3>
      <strong>${db.clients.length}</strong>
    </div>
    <div class="card">
      <h3>Revenue</h3>
      <strong>$${db.sales.length * 50}</strong>
    </div>
  `;
}

/* INVENTORY */
function inventory() {
  content.innerHTML = `
    <div class="card">
      <h3>Add Product</h3>
      <input id="pname" placeholder="Product name">
      <input id="pimei" placeholder="IMEI / Serial">
      <button class="action" onclick="addInventory()">Add</button>
    </div>
    ${db.inventory.map(p => `
      <div class="card">
        <h3>${p.name}</h3>
        <small>${p.imei}</small>
      </div>
    `).join("")}
  `;
}

function addInventory() {
  const name = document.getElementById("pname").value;
  const imei = document.getElementById("pimei").value;
  if (!name || !imei) return;
  db.inventory.push({ name, imei });
  saveDB();
  inventory();
}

/* SALES */
function sales() {
  content.innerHTML = `
    <div class="card">
      <h3>Register Sale</h3>
      <input id="sale" placeholder="Product sold">
      <button class="action" onclick="addSale()">Register</button>
    </div>
    ${db.sales.map(s => `
      <div class="card">${s}</div>
    `).join("")}
  `;
}

function addSale() {
  const sale = document.getElementById("sale").value;
  if (!sale) return;
  db.sales.push(sale);
  saveDB();
  sales();
}

/* FINANCE */
function finance() {
  content.innerHTML = `
    <div class="card">
      <h3>Finance 360°</h3>
      <strong>$${db.sales.length * 50}</strong>
    </div>
  `;
}

/* CRM */
function crm() {
  content.innerHTML = `
    <div class="card">
      <h3>Add Client</h3>
      <input id="client">
      <button class="action" onclick="addClient()">Add</button>
    </div>
    ${db.clients.map(c => `
      <div class="card">${c}</div>
    `).join("")}
  `;
}

function addClient() {
  const client = document.getElementById("client").value;
  if (!client) return;
  db.clients.push(client);
  saveDB();
  crm();
}

/* HR & SETTINGS */
function hr() {
  content.innerHTML = `<div class="card"><h3>HR Module</h3><p>Ready for payroll & commissions</p></div>`;
}

function settings() {
  content.innerHTML = `<div class="card"><h3>Settings</h3><p>Subscription: $45/month</p></div>`;
}

loadView("dashboard");
