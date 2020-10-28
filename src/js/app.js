var myName = document.querySelectorAll(".name");
var myFullName = document.querySelectorAll(".fullName");
var titleJob = document.querySelector("#titleJob");
var homeImage = document.querySelector("#homeImage");
var logo = document.querySelector("#logo");
var titleSection = document.querySelector("#titleSection");
var aboutImage = document.querySelector("#aboutImage");
var langSection = document.querySelector("#languages");
var expDiv = document.querySelector("#expDiv");
var expSection = document.querySelector("#experience-area");
var projectArea = document.querySelector("#projectArea");
var modalBody = document.querySelector("#modalBody");

var jsonData;
var activeElement;
var langList = ["python", "cpp", "html", "css", "js", "unknown"];
var projectList;

fetch("./src/json/data.json")
  .then((response) => response.json())
  .then((data) => {
    myName.forEach((element) => {
      element.innerHTML += " " + data.name;
    });

    myFullName.forEach((element) => {
      element.innerHTML += " " + data.fullName;
    });

    titleJob.innerHTML += " " + data.job;
    titleJob.style.letterSpacing = 80 / data.job.length + "px";
    logo.setAttribute("src", data.logo);
    homeImage.setAttribute("src", data.homeImage);
    aboutImage.setAttribute("src", data.aboutImage);

    langList.forEach((element) => {
      let langDiv = document.createElement("div");
      langDiv.classList.add("col-lg-4");
      langDiv.classList.add("col-md-6");
      langDiv.classList.add("col-sm-6");

      let iconDiv = document.createElement("div");
      iconDiv.classList.add("icon-div");

      let imgIcon = document.createElement("img");
      imgIcon.classList.add("img-icon");
      imgIcon.setAttribute("src", data[element + "Logo"]);

      iconDiv.appendChild(imgIcon);
      langDiv.appendChild(iconDiv);
      langSection.appendChild(langDiv);
    });

    expDiv.style.background = "url(" + data.expBg + ") no-repeat";

    for (let index = 0; index < 4; index++) {
      const element = "project" + index;
      let projectDiv = document.createElement("div");
      projectDiv.classList.add("col-lg-3");
      projectDiv.classList.add("cardMain");

      let project = document.createElement("div");
      project.classList.add("card");
      project.classList.add("projectList");
      project.setAttribute("data-toggle", "modal");
      project.setAttribute("data-target", "#exampleModal");
      project.setAttribute("id", element);

      project.addEventListener("click", function (event) {
        var children = modalBody.children;
        for (var i = 0; i < children.length; i++) {
          var modalChild = children[i];
          if (activeElement && modalChild.classList.contains("active")) {
            modalChild.classList.remove("active");
          }
          if (modalChild.classList.contains(element)) {
            modalChild.classList.add("active");
          }
        }
        activeElement = element;
      });

      let cardImage = document.createElement("img");
      cardImage.classList.add("card-img-top");
      cardImage.setAttribute("src", data[element]);

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      let cardTitle = document.createElement("h5");
      cardTitle.classList.add("card-title");
      cardTitle.innerHTML = data[element + "Title"];

      let cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.innerHTML = data[element + "Desc"];

      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      project.appendChild(cardImage);
      project.appendChild(cardBody);
      projectDiv.appendChild(project);
      projectArea.appendChild(projectDiv);

      modalDiv = document.createElement("div");
      modalDiv.classList.add("carousel-item");
      modalDiv.classList.add(element);
      console.log(element, activeElement);

      modalImg = document.createElement("img");
      console.log(element, data[element]);
      modalImg.setAttribute("src", data[element]);

      modalDiv.appendChild(modalImg);
      modalBody.appendChild(modalDiv);
    }
    // titleSection.style.background =
    //   "url('./src/Images/computer.png') no-repeat";
    // titleSection.style.backgroundPosition = "5% 75%";
  });

// Added event listener to the scroll
window.addEventListener("scroll", moveScrollIndicator);

const scrollIndicatorElt = document.getElementById("scrollIndicator");
const maxHeight = window.document.body.scrollHeight - window.innerHeight;
function moveScrollIndicator(e) {
  var percentage =
    $(window).scrollTop() / ($(document).height() - $(window).height());
  percentage *= 100;
  scrollIndicatorElt.style.width = percentage + "%";
}
