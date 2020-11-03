var myName = document.querySelectorAll(".name");
var myFullName = document.querySelectorAll(".fullName");
var titleJob = document.querySelector("#titleJob");
var desc = document.querySelector("#desc");
var desc1 = document.querySelector("#desc1");
var homeImage = document.querySelector("#homeImage");
var logo = document.querySelector("#logo");
var titleSection = document.querySelector("#titleSection");
var aboutImage = document.querySelector("#aboutImage");
var langSection = document.querySelector("#languages");
var expDiv = document.querySelector("#expDiv");
var expSection = document.querySelector("#experience-area");
var projectArea = document.querySelector("#projectArea");
var projectPreview = document.querySelector("#projectPreview1");
var modalContent = document.querySelector("#modalContent");
var myPhoto = document.querySelector("#myPhoto");
var submitComment = document.querySelector("#submitComment");
var userName = document.querySelector("#userName");
var comment1 = document.querySelector("#comment1");
var commentDiv = document.querySelector("#commentDiv");
var addComment = document.querySelector("#addComment");
var flipCard = document.querySelector("#flipCard");
var hoverMe = document.querySelector("#hoverMe");

var jsonData;
var langList = ["python", "cpp", "html", "css", "js", "unknown"];
var projectList;
var firstTime = true;

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
    desc.innerHTML = data.desc;
    desc1.innerHTML = data.desc1;

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
      projectDiv.classList.add("col-6");
      projectDiv.classList.add("col-xs-12");
      projectDiv.classList.add("cardMain");

      let project = document.createElement("div");
      project.classList.add("card");
      project.classList.add("projectList");
      project.setAttribute("data-toggle", "modal");
      project.setAttribute("data-target", "#projectPreview1");
      project.setAttribute("id", element);

      project.addEventListener("click", function (event) {
        modalContent.innerHTML = "";
        modalHeader = document.createElement("div");
        modalHeader.classList.add("modal-header");
        modalTitle = document.createElement("h5");
        modalTitle.classList.add("modal-title");
        modalTitle.setAttribute("id", "projectPreviewLabel");
        modalTitle.innerHTML = data[element + "Title"];
        closeButton = document.createElement("button");
        closeButton.classList.add("close");
        closeButton.setAttribute("data-dismiss", "modal");
        closeButton.setAttribute("aria-label", "Close");
        closeButton.innerHTML = '<span aria-hidden="true">&times;</span>';

        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        modalContent.appendChild(modalHeader);

        modalBody = document.createElement("div");
        modalBody.classList.add("modal-body");
        modalImg = document.createElement("img");
        modalImg.setAttribute("src", data[element + "gif"]);
        modalImg.style.width = "465px";
        modalBody.appendChild(modalImg);
        modalContent.appendChild(modalBody);

        modalFooter = document.createElement("div");
        modalFooter.classList.add("modal-footer");
        modalFooter.classList.add("justify-content-center");
        modalFooter.innerHTML =
          "Check out the&nbsp<a href='" +
          data[element + "Link"] +
          "' target='_blank'>project</a>.";
        modalContent.appendChild(modalFooter);
        $("projectPreview1").hide();
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
    }
    myPhoto.setAttribute("src", data["myPhoto"]);
  });

flipCard.addEventListener("mouseenter", function (event) {
  hoverMe.style.backgroundColor = "dodgerblue";
  hoverMe.style.color = "dodgerblue";
  hoverMe.style.border = "none";
  hoverMe.style.marginBottom = "-2px";
  hoverMe.style.width = "298px";
});

flipCard.addEventListener("mouseleave", function (event) {
  hoverMe.style.backgroundColor = "#EFEFEF";
  hoverMe.style.color = "black";
  hoverMe.style.marginBottom = "0px";
  hoverMe.style.width = "300px";
});

window.addEventListener("scroll", moveScrollIndicator);
const scrollIndicatorElt = document.getElementById("scrollIndicator");
const maxHeight = window.document.body.scrollHeight - window.innerHeight;
function moveScrollIndicator(e) {
  var percentage =
    $(window).scrollTop() / ($(document).height() - $(window).height());
  percentage *= 100;
  scrollIndicatorElt.style.width = percentage + "%";
}
var commentTable;
function updateComments() {
  commentTable = [];
  function readData() {
    var data = spData;
    var rowData = [];
    for (var r = 0; r < data.length; r++) {
      var cell = data[r]["gs$cell"];
      var val = cell["$t"];
      if (cell.col == 1) {
        commentTable.push(rowData);
        rowData = [];
      }
      rowData.push(val);
    }
    commentTable.push(rowData);
  }
  $(document).ready(function () {
    readData();
    setTimeout(() => {
      for (let index = 2; index < commentTable.length; index++) {
        const element = commentTable[index];
        appendComment(element[0], element[1], element[2]);
      }
    }, 50);
  });
}

updateComments();
setTimeout(() => {
  location.reload();
}, 60 * 1000);

function appendComment(time, userNameText, commentText) {
  if (userNameText == "") userNameText = "Anonymous";
  if (commentText == "") return;

  let singleComm = document.createElement("div");
  singleComm.classList.add("comments");

  let commName = document.createElement("h5");
  commName.classList.add("card-title");
  commName.innerHTML = userNameText + " <span>(" + time + ")</span>";

  let commBody = document.createElement("p");
  commBody.classList.add("card-text");
  commBody.innerHTML = commentText;

  singleComm.appendChild(commName);
  singleComm.appendChild(commBody);
  commentDiv.appendChild(singleComm);
}
submitComment.addEventListener("click", function (event) {
  setTimeout(() => {
    location.reload();
  }, 1000);
});
