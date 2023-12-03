const hope = new Promise((resolve, reject) => {
  const one = new XMLHttpRequest();
  one.open("GET", "https://api.npoint.io/204b092ec2bbaf7ea9fe", true);
  one.onload = () => {
    if (one.status === 200) {
      resolve(JSON.parse(one.response));
    } else {
      reject("Internet Server Error!");
    }
  };
  one.onerror = () => {
    reject("Network Error!");
  };
  one.send();
});

function html(item) {
  return `
    <div class="testimonial">
        <img
            class="profile-testimonial"
            src="${item.image}"
            />
            <p class="quote">${item.quote}</p>
            <p class="author">- ${item.author}</p>
            <p class="author">${item.rating} <i class="fa-solid fa-star"></i></p>
    </div>`;
}

async function allTestimonial() {
  let testimonialHTML = "";
  const testimonialData = await hope;

  testimonialData.forEach((item) => {
    testimonialHTML += html(item);
  });
  document.getElementById("testimonials").innerHTML = testimonialHTML;
}

allTestimonial();

async function filterTestimonial(rating) {
  let testimonialHTML = "";
  const testimonialData = await hope;
  const testimonialFiltered = testimonialData.filter((item) => {
    return item.rating === rating;
  });

  if (testimonialFiltered.length === 0) {
    testimonialHTML += `<h1>Data not found!</h1>`;
  } else {
    testimonialFiltered.forEach((item) => {
      testimonialHTML += html(item);
    });
  }

  document.getElementById("testimonials").innerHTML = testimonialHTML;
}
