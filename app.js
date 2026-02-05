let voyages = [];
let editId = null;

const container = document.getElementById("voyagesContainer");
const form = document.getElementById("voyageForm");
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("openModal");
const closeModalBtn = document.getElementById("closeModal");

openModalBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  modal.classList.add("flex");
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

function afficherVoyages() {
  container.innerHTML = "";

  if (voyages.length === 0) {
    container.innerHTML = "<p class='text-center text-gray-500'>No voyages yet</p>";
    return;
  }

  voyages.forEach(v => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-xl shadow overflow-hidden";

    card.innerHTML = `
      <div class="h-40 bg-cover bg-center" style="background-image:url('${v.image}')"></div>
      <div class="p-3">
        <h3 class="font-bold text-lg">${v.titre}</h3>
        <p>${v.destination}</p>
        <p> ${v.note}</p>
        <p class="text-sm text-gray-500">${v.categorie}</p>

        <div class="flex gap-2 mt-2">
          <button class="edit bg-blue-500 text-white px-2 rounded">Edit</button>
          <button class="delete bg-red-500 text-white px-2 rounded">Delete</button>
        </div>
      </div>
    `;

    card.querySelector(".delete").addEventListener("click", () => {
      voyages = voyages.filter(x => x.id !== v.id);
      afficherVoyages();
    });

    card.querySelector(".edit").addEventListener("click", () => {
      titre.value = v.titre;
      destination.value = v.destination;
      note.value = v.note;
      categorie.value = v.categorie;
      image.value = v.image;
      editId = v.id;
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    });

    container.appendChild(card);
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  const newVoyage = {
    id: editId || Date.now(),
    titre: titre.value,
    destination: destination.value,
    note: note.value,
    categorie: categorie.value,
    image: image.value
  };

  if (editId) {
    voyages = voyages.map(v => v.id === editId ? newVoyage : v);
    editId = null;
  } else {
    voyages.push(newVoyage);
  }

  afficherVoyages();
  form.reset();
  modal.classList.add("hidden");
});

document.addEventListener("DOMContentLoaded", afficherVoyages);
