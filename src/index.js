const slides = [
  {
    title: "Tempesta - Giorgione",
    url: "https://lasottilelineadombrablog.files.wordpress.com/2017/03/la-tempesta-giorgione-1505.jpg?w=940",
    id: 1,
  },
  {
    title: "Torre di Babele - Bruegel",
    url: "https://lasottilelineadombrablog.files.wordpress.com/2017/03/pieter_bruegel_vecchio_torre_babele-grande-fb.jpg?w=940",
    id: 2,
  },
  {
    title: "Viandante sul mare - Friedrich",
    url: "https://lasottilelineadombrablog.files.wordpress.com/2017/04/caspar-david-friedrich-viandante-mare-nebbia-fb.jpg?w=940",
    id: 3,
  },
  {
    title: "Casa vicino alla Ferrovia - E. Hopper",
    url: "https://lasottilelineadombrablog.files.wordpress.com/2017/09/house_railroad_edward_hopper-fb.jpg?w=940",
    id: 4,
  },
  {
    title: "Image - Generate",
    url: "https://picsum.photos/1200/600",
    id: 5,
  },
  {
    title: "Image - Generate 2",
    url: "https://picsum.photos/800/600",
    id: 6,
  },
  {
    title: "Image - Generate 3",
    url: "https://picsum.photos/800/700",
    id: 7,
  },
];

// import { slides } from "./mock";

const d = document;
const slider = d.getElementById("js-slider");
const bullet = d.getElementById("js-bullet");
const titleImage = d.getElementById("js-title");
const progress = d.getElementById("js-progress");
const arrowLeft = d.querySelector(".slider__arrow--left");
const arrowRight = d.querySelector(".slider__arrow--right");
let counter = 0;

const imageSlider = (title, url, id) => {
  const first = id === 1;

  return `
  <img class="slider__image ${first ? "slider__image--active" : ""}" 
  src="${url}" 
  alt="${title}" data-id="${id}">
  `;
};

const bulletSlider = (id) => {
  const first = id === 1;

  const bulletElement = `
  <button class="slider__bullet ${
    first ? "slider__bullet--active" : ""
  }" data-id="${id}" onclick="button(${id})"></button>
  `;
  // console.log(bulletElement);
  // console.log(arrowRight);
  return bulletElement;
};

const titleSlider = (title, id) => {
  return `
  <p class="slider__text" data-id=${id}>${title}</p>
  `;
};

const progressionSlider = (id) => {
  return `
  <p class="slider__progression-text" data-id=${id}>${id}/${slides.length}</p>
  `;
};

slides.forEach((image) => {
  const { id } = image;
  const slideShow = imageSlider(
    slides[counter].title,
    slides[counter].url,
    slides[counter].id
  );
  const bullets = bulletSlider(id);
  const titleImg = titleSlider(slides[counter].title, slides[counter].id);
  const progressImage = progressionSlider(slides[counter].id);

  slider.innerHTML = slideShow;
  bullet.innerHTML += bullets;
  titleImage.innerHTML = titleImg;
  progress.innerHTML = progressImage;
});

const singleBullet = d.querySelectorAll(".slider__bullet");

arrowLeft.addEventListener("click", () => {
  const isSliderPresent = Boolean(slides[counter - 1]);
  //if (!isSliderPresent) return;

  if (!isSliderPresent) {
    counter = slides.length - 1;
    console.log(slides.length - 1);
    bulletUpdate(counter - (slides.length - 1));
    sliderUpdate();

    return;
  }
  counter = counter - 1;

  sliderUpdate();
  bulletUpdate(counter + 1);
});

arrowRight.addEventListener("click", () => {
  const isSliderPresent = Boolean(slides[counter + 1]);
  // if (!isSliderPresent) return;

  if (!isSliderPresent) {
    counter = 0;
    bulletUpdate(slides.length - 1);
    sliderUpdate();

    return;
  }

  counter = counter + 1;

  sliderUpdate();
  bulletUpdate(counter - 1);
});

window.button = (id) => {
  singleBullet.forEach((element) => {
    element.classList.remove("slider__bullet--active");
  });
  const activeBullet = d.querySelector(`button[data-id='${id}'`);
  //console.dir(activeBullet);
  activeBullet.classList.add("slider__bullet--active");
  counter = Number(activeBullet.dataset.id) - 1;
  sliderUpdate();
};

const sliderUpdate = () => {
  const currentImg = d.querySelector(".slider__image");
  currentImg.classList.remove("slider__image--active");

  currentImg.addEventListener("transitionend", () => {
    console.log("Animation ended");
    slider.innerHTML = imageSlider(
      slides[counter].title,
      slides[counter].url,
      slides[counter].id
    );

    const nextImage = d.querySelector(".slider__image");

    titleImage.innerHTML = titleSlider(
      slides[counter].title,
      slides[counter].id
    );

    progress.innerHTML = progressionSlider(slides[counter].id);

    setTimeout(() => {
      nextImage.classList.add("slider__image--active");
    }, 100);
  });
};

const bulletUpdate = (value) => {
  bullet.children[value].classList.remove("slider__bullet--active");
  bullet.children[counter].classList.add("slider__bullet--active");
};

// singleBullet.forEach((button) => {
//   button.addEventListener("click", () => {
//     singleBullet.forEach((element) => {
//       element.classList.remove("slider__bullet--active");
//     });
//     let slide = slides.find((slide) => slide.id === Number(button.dataset.id));
//     counter = slide.id - 1;
//     sliderUpdate();
//     button.classList.add("slider__bullet--active");
//   });
// });

// window.highlightBullet = (id) => {
//   console.log(id);
// };

console.log(slides);
