let myProject = [];

let days = "";
let months = "";

function waktu(startDate, endDate) {
  let dataStart = new Date(startDate);
  let dateEnd = new Date(endDate);
  let oneDay = 1000 * 3600 * 24;

  let selisih = dateEnd.getTime() - dataStart.getTime();
  let totaldays = selisih / oneDay;
  let totalmonths = Math.floor(totaldays / 30);
  totaldays = totaldays % 30;

  days = totaldays;
  months = totalmonths;
}

function addmyProject(event) {
  event.preventDefault();

  let projectName = document.getElementById("nama-project").value;
  let startDate = document.getElementById("start-date").value;
  let endDate = document.getElementById("end-date").value;
  let description = document.getElementById("desc-project").value;
  let NodeJs = document.getElementById("node-js").checked;
  let ReactJs = document.getElementById("react-js").checked;
  let Nextjs = document.getElementById("next-js").checked;
  let typescript = document.getElementById("typescript").checked;
  let image = document.getElementById("input-blog-image").files;

  image = URL.createObjectURL(image[0]);

  waktu(startDate, endDate);

  const data = {
    projectName,
    startDate,
    endDate,
    description,
    days,
    months,
    NodeJs,
    ReactJs,
    Nextjs,
    typescript,
    image,
  };

  myProject.push(data);
  console.log(myProject);

  renderMyProject();
}

function renderMyProject() {
  document.getElementById("contents").innerHTML = "";
  for (let i = 0; i < myProject.length; i++) {
    document.getElementById("contents").innerHTML += `
    <div class="project-list">
        <div class="project-list-items">
            <img src="${myProject[i].image}" alt="code" />
            <h1>
              <a href="myproject.html" target="_blank">${
                myProject[i].projectName
              }</a>
            </h1>
            <div class:"durasi">
            <p>Durasi:${myProject[i].months} bulan</p>
            <p>
            
            </div>
             ${myProject[i].description}
            </p>
            <i ${renderIcon(myProject[i])}></i>
            <div class="edit">
              <button>Edit</button>
              <button>Delete</button>
            </div>
         </div> 
    </div>`;
  }
}

function renderIcon(icon) {
  let renderIcon = "";

  if (icon.usingNode == true) {
    renderIcon += `<i class="fa-brands fa-node-js"></i>`;
  }
  if (icon.usingNext == true) {
    renderIcon += `<i class="fa-brands fa-react"></i>`;
  }
  if (icon.usingReact == true) {
    renderIcon += `<i class="fa-brands fa-vuejs"></i>`;
  }
  if (icon.usingType == true) {
    renderIcon += `<i class="fa-brands fa-js"></i>`;
  }

  return renderIcon;
}
