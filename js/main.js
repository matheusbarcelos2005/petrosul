const imageBase = "imagens/";
const imageSrc = (fileName) => `${imageBase}${fileName}`;

const fleet = [
  {
    name: "Professor David Cunha",
    type: "Navio graneleiro",
    thumbnail: "navio5.jpeg",
    images: ["navio5.jpeg", "navio1.jpeg"],
    description:
      "Embarcacao longa, branca e verde, com poroes cobertos. As fotos mostram navegacao lateral e tomada frontal em area lacustre ampla.",
    specs: {
      IRIN: "PP-6891",
      Comprimento: "84,70 m",
      Boca: "14,00 m",
      Pontal: "04,80 m",
      TPB: "3755,84 t"
    }
  },
  {
    name: "Professor Lelis Espartel",
    type: "Navio graneleiro",
    thumbnail: "navio6.jpeg",
    images: ["navio6.jpeg"],
    description:
      "Navio com casco verde marcado pelo uso operacional, visto em angulo alto. A imagem valoriza tamanho, volume e poroes cobertos.",
    specs: {
      IRIN: "PP-6908",
      Comprimento: "84,70 m",
      Boca: "14,00 m",
      Pontal: "04,80 m",
      TPB: "3782,00 t"
    }
  },
  {
    name: "Professor Luiz Leseigneur de Faria",
    type: "Navio graneleiro",
    thumbnail: "navio7,jpeg.jpg",
    images: ["navio7,jpeg.jpg"],
    description:
      "Registro mais distante, bom para acervo e identificacao historica. Ha marca d'agua em uma das imagens recebidas.",
    specs: {
      IRIN: "PP-6919",
      Comprimento: "84,70 m",
      Boca: "14,00 m",
      Pontal: "04,80 m",
      TPB: "3782,00 t"
    }
  },
  {
    name: "NM Piratini",
    type: "Navio graneleiro",
    thumbnail: "navio4.jpeg",
    images: ["navio4.jpeg"],
    description:
      "Imagem forte de proa e lateral, com nome legivel. A composicao transmite escala e robustez com boa presenca do casco.",
    specs: {
      IRIN: "PS-2674",
      Comprimento: "99,78 m",
      Boca: "16,40 m",
      Pontal: "05,85 m",
      TPB: "5099,75 t"
    }
  },
  {
    name: "NM Rio Grande do Sul",
    type: "Navio graneleiro",
    thumbnail: "navio3.jpeg",
    images: ["navio3.jpeg", "WhatsApp Image 2026-05-02 at 14.03.48 (3).jpeg"],
    description:
      "As melhores fotos da frota para impacto visual: angulo alto, casco verde em destaque e boa leitura do comprimento da embarcacao.",
    specs: {
      IRIN: "PP-2927",
      Comprimento: "84,34 m",
      Boca: "12,54 m",
      Pontal: "05,31 m",
      TPB: "2825,89 t"
    }
  },
  {
    name: "NT Rio Grande",
    type: "Navio tanque",
    thumbnail: "navio9.jpeg",
    images: [
      "navio9.jpeg",
      "navio8.jpeg",
      "WhatsApp Image 2026-05-02 at 14.03.48.jpeg",
      "WhatsApp Image 2026-05-02 at 14.03.48 (4).jpeg"
    ],
    description:
      "Embarcacao tanque com perfil mais baixo e tubular, fotografada de lado. Algumas imagens sao ideais para comparacao tecnica.",
    specs: {
      IRIN: "PP-6796",
      Comprimento: "57,71 m",
      Boca: "07,42 m",
      Pontal: "04,03 m",
      TPB: "1370,00 t"
    }
  }
];

const tabs = document.querySelector("[data-fleet-tabs]");
const detail = {
  image: document.querySelector("[data-fleet-image]"),
  name: document.querySelector("[data-fleet-name]"),
  type: document.querySelector("[data-fleet-type]"),
  description: document.querySelector("[data-fleet-description]"),
  specs: document.querySelector("[data-fleet-specs]"),
  dots: document.querySelector("[data-image-dots]"),
  counter: document.querySelector("[data-fleet-counter]")
};

let activeFleet = 0;
let activeImage = 0;

function imageAlt(vessel) {
  return `${vessel.name} navegando`;
}

function renderTabs() {
  if (!tabs) return;

  tabs.innerHTML = fleet
    .map(
      (vessel, index) => `
        <button class="fleet-tab" type="button" role="tab" aria-selected="${index === activeFleet}" data-fleet-index="${index}">
          <img src="${imageSrc(vessel.thumbnail)}" alt="${vessel.name}" loading="lazy">
          <span>
            <strong>${vessel.name}</strong>
            <span>${vessel.type}</span>
          </span>
        </button>
      `
    )
    .join("");
}

function renderFleet() {
  if (!tabs || !detail.image || !detail.name || !detail.type || !detail.description || !detail.specs || !detail.dots) {
    return;
  }

  const vessel = fleet[activeFleet];
  const currentImage = vessel.images[activeImage] || vessel.images[0];

  detail.image.src = imageSrc(currentImage);
  detail.image.alt = imageAlt(vessel);
  detail.name.textContent = vessel.name;
  detail.type.textContent = vessel.type;
  detail.description.textContent = vessel.description;
  detail.specs.innerHTML = Object.entries(vessel.specs)
    .map(([key, value]) => `<div><dt>${key}</dt><dd>${value}</dd></div>`)
    .join("");
  detail.dots.innerHTML = vessel.images
    .map(
      (_, index) =>
        `<button type="button" aria-label="Ver imagem ${index + 1}" aria-current="${index === activeImage}" data-image-index="${index}"></button>`
    )
    .join("");

  document.querySelectorAll(".fleet-tab").forEach((tab, index) => {
    tab.setAttribute("aria-selected", String(index === activeFleet));
  });

  if (detail.counter) {
    detail.counter.textContent = `${activeFleet + 1} / ${fleet.length}`;
  }

  tabs?.querySelector('[aria-selected="true"]')?.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "nearest"
  });
}

if (tabs) {
  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-fleet-index]");
    if (!button) return;

    activeFleet = Number(button.dataset.fleetIndex);
    activeImage = 0;
    renderFleet();
  });
}

document.querySelector("[data-prev-image]")?.addEventListener("click", () => {
  const total = fleet[activeFleet].images.length;
  activeImage = (activeImage - 1 + total) % total;
  renderFleet();
});

document.querySelector("[data-next-image]")?.addEventListener("click", () => {
  const total = fleet[activeFleet].images.length;
  activeImage = (activeImage + 1) % total;
  renderFleet();
});

detail.dots?.addEventListener("click", (event) => {
  const button = event.target.closest("[data-image-index]");
  if (!button) return;

  activeImage = Number(button.dataset.imageIndex);
  renderFleet();
});

const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
}

document.querySelector(".contact-form")?.addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.reset();
});

renderTabs();
renderFleet();
