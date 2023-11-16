const testimonialData = [
  {
    author: "nousnou iwasaki",
    quote: "New Moon",
    image:
      "https://images.unsplash.com/photo-1445146484482-fb1e008bfedc?q=80&w=1881&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4,
  },
  {
    author: "EartSky",
    quote: "Waxing Crescent",
    image: "https://c.tadst.com/gfx/600x337/waxing-crescent-moon.jpg?1",
    rating: 2,
  },
  {
    author: "Tiago Fioreze",
    quote: "First Quarter",
    image:
      "https://images.unsplash.com/photo-1534836738818-382f56365e75?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 3,
  },
  {
    author: "Renden Yoder",
    quote: "Waxing Gibbous",
    image:
      "https://images.unsplash.com/photo-1583553072273-da60026c6ef4?q=80&w=1967&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4,
  },
  {
    author: "Mike Petrucci",
    quote: "Full Moon",
    image:
      "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 5,
  },

  {
    author: "Geoffrey Wyatt",
    quote: "Wanning Gibbous",
    image:
      "https://images.unsplash.com/photo-1637096990374-a06f80ed6e99?q=80&w=1856&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4,
  },
];

function allTestimonial() {
  let testimonialHTML = "";

  testimonialData.forEach(function (item) {
    testimonialHTML += `
    <div class="testimonial">
        <img
            class="profile-testimonial"
            src="${item.image}"
            />
            <p class="quote">${item.quote}</p>
            <p class="author">- ${item.author}</p>
            <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
    </div>
    `;
  });
  document.getElementById("testimonials").innerHTML = testimonialHTML;
}

allTestimonial();

//Filtered testimonial
function filterTestimonial(rating) {
  let testimonialHTML = "";

  const testimonialFiltered = testimonialData.filter(function (item) {
    return item.rating === rating;
  });

  if (testimonialFiltered.length === 0) {
    testimonialHTML += `<h1>Data not found!</h1>`;
  } else {
    testimonialFiltered.forEach(function (item) {
      testimonialHTML += `
        <div class="testimonial">
        <img
            class="profile-testimonial"
            src="${item.image}"
            />
            <p class="quote">${item.quote}</p>
            <p class="author">${item.author}</p>
            <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
    </div>
    `;
    });
  }

  document.getElementById("testimonials").innerHTML = testimonialHTML;
}
