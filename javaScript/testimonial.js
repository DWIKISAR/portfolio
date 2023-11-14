class Testimonial {
  constructor(image, quote, author) {
    this.author = author;
    this.quote = quote;
    this.image = image;
  }

  html() {
    return `
        <div class="testimonial">
        <img
          class="profile-testimonial"
          src="${this.iamge}"
        />
        <p class="quote">${this.quote}</p>
        <p class="author">-${this.author}</p>
      </div>
        `;
  }
}

const testimonial1 = new Testimonial(
  "https://i.postimg.cc/9FSVHqvG/nousnou-iwasaki-Dc3-YQuyr2p-U-unsplash.jpg",
  "New Moon",
  "Nousnou iwasaki"
);
const testimonial2 = new Testimonial(
  "https://i.postimg.cc/2j1rcwtz/patrick-ilao-E98q-CAl6re-U-unsplash.jpg",
  "Waxing Cresent ",
  "Patrick Ilao"
);
const testimonial3 = new Testimonial(
  "https://i.postimg.cc/pLRNHYs5/syed-ahmad-e-WD4-O1-Me4r-M-unsplash.jpg",
  "Full Moon",
  "Syed Ahmad"
);

const testimonials = [testimonial1, testimonial2, testimonial3];

let testimonialHTML = ``;
for (let index = 0; index < testimonials.length; index++) {
  testimonialHTML += testimonials[index].html();
}

document.getElementById("testimonials").innerHTML = testimonialHTML;
