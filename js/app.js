// ----------------- LOGIN -----------------
const loginPanel = document.getElementById("loginPanel");
const mainContainer = document.getElementById("mainContainer");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");
const usuarioInput = document.getElementById("usuario");
const passwordInput = document.getElementById("password");
const logoutBtn = document.getElementById("logoutBtn");

const USUARIO = "admin";
const PASSWORD = "1234";

loginBtn.addEventListener("click", () => {
  const usuario = usuarioInput.value;
  const password = passwordInput.value;

  if(usuario === USUARIO && password === PASSWORD){
    loginPanel.style.display = "none";
    mainContainer.style.display = "flex";
    loginError.style.display = "none";
  } else {
    loginError.style.display = "block";
  }
});

logoutBtn.addEventListener("click", () => {
  mainContainer.style.display = "none";
  loginPanel.style.display = "flex";
  usuarioInput.value = "";
  passwordInput.value = "";
});

// ----------------- DATOS -----------------

// Loterías con horario (24h)
const loterias = [
  { nombre: "Lotto Activo", horaInicio: 8, horaFin: 19 },
  { nombre: "La Granjita", horaInicio: 8, horaFin: 19 }
];

// Animales 00-36
const animales = [
  { numero: "00", nombre: "Delfín" },
  { numero: "01", nombre: "Burro" },
  { numero: "02", nombre: "Águila" },
  { numero: "03", nombre: "Búho" },
  { numero: "04", nombre: "Caballo" },
  { numero: "05", nombre: "Caimán" },
  { numero: "06", nombre: "Camello" },
  { numero: "07", nombre: "Cangrejo" },
  { numero: "08", nombre: "Canguro" },
  { numero: "09", nombre: "Carnero" },
  { numero: "10", nombre: "Cerdo" },
  { numero: "11", nombre: "Chivo" },
  { numero: "12", nombre: "Conejo" },
  { numero: "13", nombre: "Cuervo" },
  { numero: "14", nombre: "Elefante" },
  { numero: "15", nombre: "Foca" },
  { numero: "16", nombre: "Gato" },
  { numero: "17", nombre: "Gallo" },
  { numero: "18", nombre: "Gallina" },
  { numero: "19", nombre: "Jirafa" },
  { numero: "20", nombre: "León" },
  { numero: "21", nombre: "Lobo" },
  { numero: "22", nombre: "Mono" },
  { numero: "23", nombre: "Oso" },
  { numero: "24", nombre: "Oveja" },
  { numero: "25", nombre: "Pato" },
  { numero: "26", nombre: "Perro" },
  { numero: "27", nombre: "Tigre" },
  { numero: "28", nombre: "Zamuro" },
  { numero: "29", nombre: "Elefante bebé" },
  { numero: "30", nombre: "Rinoceronte" },
  { numero: "31", nombre: "Tortuga" },
  { numero: "32", nombre: "Vaca" },
  { numero: "33", nombre: "Ballena" },
  { numero: "34", nombre: "Culebra" },
  { numero: "35", nombre: "Lemur" },
  { numero: "36", nombre: "Culera" }
];

// Sorteos
const sorteos = [
  { nombre: "Sorteo Mañana" },
  { nombre: "Sorteo Tarde" },
  { nombre: "Sorteo Noche" }
];

// ----------------- ESTADO -----------------
let loteriaActiva = null;
let seleccionActual = [];

// ----------------- REFERENCIAS -----------------
const loteriasDiv = document.getElementById("loterias");
const sorteosDiv = document.getElementById("sorteos");
const animalesDiv = document.getElementById("animales");
const seleccionadosDiv = document.getElementById("seleccionados");
const montoInput = document.getElementById("monto");
const agregarBtn = document.getElementById("agregarBtn");

// ----------------- FUNCIONES -----------------

function renderLoterias() {
  loteriasDiv.innerHTML = "";
  const horaActual = new Date().getHours();

  loterias.forEach(loteria => {
    if(horaActual >= loteria.horaInicio && horaActual < loteria.horaFin){
      const div = document.createElement("div");
      div.textContent = `${loteria.nombre} (${loteria.horaInicio}h - ${loteria.horaFin}h)`;
      div.addEventListener("click", () => {
        document.querySelectorAll("#loterias div").forEach(d => d.classList.remove("active"));
        div.classList.add("active");
        loteriaActiva = loteria.nombre;
        seleccionActual = [];
        renderSeleccionados();
      });
      loteriasDiv.appendChild(div);
    }
  });
}

function renderSorteos() {
  sorteosDiv.innerHTML = "";
  sorteos.forEach(sorteo => {
    const div = document.createElement("div");
    div.textContent = sorteo.nombre;
    sorteosDiv.appendChild(div);
  });
}

function renderAnimales() {
  animalesDiv.innerHTML = "";
  animales.forEach(animal => {
    const div = document.createElement("div");
    div.classList.add("animal");
    div.textContent = `${animal.numero} - ${animal.nombre}`;
    div.addEventListener("click", () => {
      if(!loteriaActiva){
        alert("Selecciona primero una lotería");
        return;
      }
      div.classList.toggle("selected");
      if(seleccionActual.includes(animal.numero)){
        seleccionActual = seleccionActual.filter(n => n !== animal.numero);
      } else {
        seleccionActual.push(animal.numero);
      }
      renderSeleccionados();
    });
    animalesDiv.appendChild(div);
  });
}

function renderSeleccionados(){
  seleccionadosDiv.innerHTML = "";
  seleccionActual.forEach(numero => {
    const animal = animales.find(a => a.numero === numero);
    const div = document.createElement("div");
    div.textContent = `${numero} - ${animal.nombre}`;
    seleccionadosDiv.appendChild(div);
  });
}

// Agregar monto
agregarBtn.addEventListener("click", () => {
  if(!loteriaActiva){
    alert("Selecciona primero una lotería");
    return;
  }
  const monto = parseFloat(montoInput.value);
  if(monto <= 0){
    alert("Ingresa un monto válido");
    return;
  }
  alert(`Se agregaron ${seleccionActual.length} animales a ${loteriaActiva} con monto ${monto}`);
  seleccionActual = [];
  document.querySelectorAll(".animal.selected").forEach(div => div.classList.remove("selected"));
  renderSeleccionados();
  montoInput.value = 0;
});

// ----------------- INICIALIZACIÓN -----------------
renderLoterias();
renderSorteos();
renderAnimales();
setInterval(renderLoterias, 60000); // Actualizar horarios cada minuto
