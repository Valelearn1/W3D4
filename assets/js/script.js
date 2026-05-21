const now = new Date();
const getYear = now.getFullYear(); // prende l'anno, usando il local time
const getMonth = now.getMonth(); // getMonth contiene i numeri da 0 a 11 (perché si parte da 0)

console.log(getYear);
console.log(getMonth);

// ci servono array per sapere cosa ciclare. In partenza, ci servono 2 array: quello dei mesi e quello dei giorni della settimana
const monthNames = [
  "Gennaio",
  "Febbraio",
  "Marzo",
  "Aprile",
  "Maggio",
  "Giugno",
  "Luglio",
  "Agosto",
  "Settembre",
  "Ottobre",
  "Novembre",
  "Dicembre",
];

const dayNames = [
  "Domenica",
  "Lunedì",
  "Martedì",
  "Mercoledì",
  "Giovedì",
  "Venerdì",
  "Sabato",
];

// Scriviamo il nome del mese
const printCurrentMonth = () => {
  const title = document.querySelector("h1");
  const currentMonth = monthNames[getMonth];
  title.textContent = currentMonth;
};

printCurrentMonth(); // chiamiamo la funzione

// parto dal primo giorno del mese successivo
const dayInMonth = () => {
  const lastDay = new Date(getYear, getMonth + 1, 0); // gli stiamo chiedendo il giorno 0 del mese successivo (0 giugno 2026 sarà il 31 maggio 2026)
  const numberOfDays = lastDay.getDate(); // restituisce il giorno del mese
  return numberOfDays; // la restituisco perché la chiamerò dove mi serve
};

// Creiamo la griglia (i div)
const createDays = (daysNumber) => {
  // daysNumber è un numero
  const calendarDiv = document.querySelector("#calendar"); // intercettiamo l'id del div
  for (let i = 1; i <= daysNumber; i++) {
    // da 1 a daysNumber
    // creera n quadrati per n giorni
    // creiamo il div padre (quadrati dei giorni) (il nonno è il div grande, il padre sono i quadrati dei giorni e il div figlio è il testo dei giorni)
    const dayCellDiv = document.createElement("div"); // crea il div
    dayCellDiv.classList.add("day"); // aggiungiamo la classe day
    // le celle dovranno essere cliccabili - DA FARE POI
    dayCellDiv.addEventListener("click", function () {
      unselectAllDays(); // delezionare il giorno selezionato prima / dopo aver rimosso la classe,
      dayCellDiv.classList.add("selected"); // aggiungi dove ho fatto clic
    });

    // Creiamo il giorno
    const cellValue = document.createElement("h3"); // crea un h3 (nome e numero del giorno)
    if (i === now.getDate()) {
      // se i è oggi, aggiungi la classe currentDay (sfondo rosa)
      // evidenziamo il giorno corrente
      dayCellDiv.classList.add("currentDay"); // per evidenziare il giorno in corso
    }
    // scriviamo la domenica in rosso
    let thisDay = new Date(getYear, getMonth, i); // creiamo variabile [i: da 1 a 31]
    if (thisDay.getDay() === 0) {
      // ogni volta che thisDay è uguale a 0, ossia domenica,
      cellValue.classList.add("sunday"); // aggiungi la classe sunday
    }

    // scriviamo il nome del giorno
    let dayNumber = thisDay.getDay(); // restituisce numero da 0 a 31, estraggo il numero del giorno
    let dayName = dayNames[dayNumber]; // tira fuori un numero dall'array da 0 a 6, chiamo la voce dell'array
    cellValue.textContent = `${dayName} ${i}`; // nella cella scrive dayName e i (ossia il ciclo 28-31)
    dayCellDiv.appendChild(cellValue);
    calendarDiv.appendChild(dayCellDiv); // appendi il quadratino al grande div
  }
};

createDays(dayInMonth()); // chiamo la funzione una volta sola

function unselectAllDays() {
  // deseleziona l'elemento selezionato prima
  const previousSelected = document.querySelector(".selected"); // deve beccare l'unico elemento che ha quella classe
  if (previousSelected) {
    // quando lo trovi,
    previousSelected.classList.remove("selected"); // rimuovi la classe
  }
}
