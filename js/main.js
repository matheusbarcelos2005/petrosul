const imageBase = "imagens/";
const imageSrc = (fileName) => `${imageBase}${fileName}`;

const fleet = [
  {
    name: "Professor David Cunha",
    type: "Graneleiro",
    thumbnail: "navio5.jpeg",
    images: ["navio5.jpeg", "navio1.jpeg"],
    description:
      "Embarcacao graneleira para transporte de graos e outras cargas a granel na Lagoa dos Patos. As fotos mostram navegacao lateral e tomada frontal em area lacustre ampla.",
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
    type: "Graneleiro",
    thumbnail: "navio6.jpeg",
    images: ["navio6.jpeg"],
    description:
      "Embarcacao graneleira para transporte de graos e outras cargas a granel, com poroes adequados a operacao na Lagoa dos Patos.",
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
    type: "Graneleiro",
    thumbnail: "navio7,jpeg.jpg",
    images: ["navio7,jpeg.jpg"],
    description:
      "Embarcacao graneleira destinada a graos e outras cargas a granel. Registro mais distante, bom para acervo e identificacao historica.",
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
    type: "Graneleiro",
    thumbnail: "navio4.jpeg",
    images: ["navio4.jpeg"],
    description:
      "Embarcacao graneleira de maior porte, usada para graos e outras cargas a granel. A imagem de proa e lateral transmite escala e robustez.",
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
    type: "Graneleiro",
    thumbnail: "navio3.jpeg",
    images: ["navio3.jpeg", "WhatsApp Image 2026-05-02 at 14.03.48 (3).jpeg"],
    description:
      "Embarcacao graneleira para transporte de graos e outras cargas a granel, com casco verde em destaque e boa leitura do comprimento.",
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
let lightbox = null;

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

function renderFleet(shouldScroll = true) {
  if (!tabs || !detail.image || !detail.name || !detail.type || !detail.description || !detail.specs || !detail.dots) {
    return;
  }

  const vessel = fleet[activeFleet];
  const currentImage = vessel.images[activeImage] || vessel.images[0];

  detail.image.src = imageSrc(currentImage);
  detail.image.alt = imageAlt(vessel);
  detail.image.title = "Clique para ampliar";
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

  if (shouldScroll) {
    tabs?.querySelector('[aria-selected="true"]')?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest"
    });
  }
}

function selectFleet(index) {
  activeFleet = (index + fleet.length) % fleet.length;
  activeImage = 0;
  renderFleet();
}

function getCurrentImage() {
  const vessel = fleet[activeFleet];
  return {
    src: imageSrc(vessel.images[activeImage] || vessel.images[0]),
    alt: imageAlt(vessel)
  };
}

function ensureLightbox() {
  if (lightbox || !detail.image) return lightbox;

  lightbox = document.createElement("div");
  lightbox.className = "image-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Imagem ampliada do navio");
  lightbox.innerHTML = `
    <button class="lightbox-close" type="button" aria-label="Fechar imagem ampliada">&times;</button>
    <img alt="">
  `;

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox || event.target.closest(".lightbox-close")) {
      closeLightbox();
    }
  });

  document.body.appendChild(lightbox);
  return lightbox;
}

function openLightbox() {
  const box = ensureLightbox();
  if (!box) return;

  const image = getCurrentImage();
  const img = box.querySelector("img");
  img.src = image.src;
  img.alt = image.alt;
  box.classList.add("is-open");
  document.body.classList.add("has-lightbox");
  box.querySelector(".lightbox-close")?.focus();
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove("is-open");
  document.body.classList.remove("has-lightbox");
}

if (tabs) {
  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("[data-fleet-index]");
    if (!button) return;

    selectFleet(Number(button.dataset.fleetIndex));
  });
}

document.querySelector("[data-prev-image]")?.addEventListener("click", () => {
  selectFleet(activeFleet - 1);
});

document.querySelector("[data-next-image]")?.addEventListener("click", () => {
  selectFleet(activeFleet + 1);
});

detail.image?.addEventListener("click", openLightbox);

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLightbox();
  }
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
renderFleet(false);
