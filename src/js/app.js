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
// var circle = document.querySelector("#circle");
// var switch1 = document.querySelector("#switch");
// var lightOff = document.querySelector("#lightOff");
// var lost = document.querySelector("#lost");

var jsonData;
var langList = ["python", "cpp", "html", "css", "js", "unknown"];
var projectList;
var firstTime = true;
// var cursorX = 0;
// var cursorY = 0;
// var circleRad = 85;

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
      // projectDiv.setAttribute(
      //   "onclick",
      //   "window.open('https://www.google.com', '_blank')"
      // );
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
        console.log("aaaaaa");
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
  // circle.style.top = cursorY - circleRad + document.body.scrollTop;
  // circle.style.left = cursorX - circleRad + document.body.scrollLeft;
}

// submitComment.addEventListener("click", function (event) {
//   var curr = new Date();
//   curr = String(curr).slice(4, 31);
//   userNameText = userName.value;
//   commentText = tinymce.get("comment1").getContent();
//   if (userNameText == "") userNameText = "Anonymous";
//   if (commentText == "") return;

//   let singleComm = document.createElement("div");
//   singleComm.classList.add("comments");

//   let commName = document.createElement("h5");
//   commName.classList.add("card-title");
//   commName.innerHTML = userNameText + " <span>(" + curr + ")</span>";

//   let commBody = document.createElement("p");
//   commBody.classList.add("card-text");
//   commBody.innerHTML = commentText;

//   singleComm.appendChild(commName);
//   singleComm.appendChild(commBody);
//   commentDiv.appendChild(singleComm);
//   userName.value = "";
//   tinymce.get("comment1").setContent("");
//   $("#addComment").modal("hide");
// });

//  ========= Leave the Comment After this ==========
//  <div class="comments">
//   <h5 class="card-title">Kaleab Asfaw <span>(2:54 PM)</span></h5>
//   <p class="card-text">Liked the design, Great Job.</p>
// </div>

// fetch("./src/json/comments.json")
//   .then((response) => response.json())
//   .then((data) => {
//     lengthJson = Object.keys(data["userInfo"]).length;
//     console.log(data, Object.keys(data["userInfo"]).length);
//     for (let index = 0; index < lengthJson; index++) {
//       const element = data["userInfo"][index];
//       console.log(element);
//       // const element = data["result"][index];
//       let singleComm = document.createElement("div");
//       singleComm.classList.add("comments");

//       let commName = document.createElement("h5");
//       commName.classList.add("card-title");
//       commName.innerHTML =
//         element.name + " <span>(" + element.time + ")</span>";

//       let commBody = document.createElement("p");
//       commBody.classList.add("card-text");
//       commBody.innerHTML = element.comment;

//       singleComm.appendChild(commName);
//       singleComm.appendChild(commBody);
//       commentDiv.appendChild(singleComm);
//     }

//     submitComment.addEventListener("click", function (event) {
//       userNameText = userName.value;
//       commentText = tinymce.get("comment1").getContent();
//       console.log(userNameText, commentText);
//     });
//   });

// ============================== Lost Mode ===============================
// document.addEventListener("mousemove", function (event) {
//   cursorX = event.clientX;
//   cursorY = event.clientY;
//   // console.log(cursorX, cursorY);
//   if (cursorY > 66 + circleRad) {
//     circle.style.top = cursorY - circleRad + document.body.scrollTop;
//     if (cursorX > 1172 && cursorX < 1342 && cursorY >= 74 && cursorY <= 280) {
//       switch1.style.display = "block";
//     } else {
//       switch1.style.display = "none";
//     }
//   }
//   if (cursorX < 1348 - circleRad) {
//     circle.style.left = cursorX - circleRad + document.body.scrollLeft;
//   }
// });

// switch1.addEventListener("click", function (event) {
//   switch1.style.top = "50px";
//   var id = setInterval(frame, 20);
//   function frame() {
//     if (parseInt(switch1.style.top) >= 70) {
//       clearInterval(id);
//     } else {
//       switch1.style.top = parseInt(switch1.style.top) + 1 + "px";
//     }
//   }
//   var id = setInterval(frame, 5);
//   function frame() {
//     if (parseInt(switch1.style.top) <= -190) {
//       clearInterval(id);
//     } else {
//       switch1.style.top = parseInt(switch1.style.top) - 1 + "px";
//     }
//   }
//   switch1.style.display = "none";
//   lightOff.style.opacity = "0";
//   circle.style.backgroundColor = "rgb(187, 187, 187)";
//   circleRad = 50;
//   circle.style.width = "100px";
//   circle.style.height = "100px";
// });

// setTimeout(function () {
//   lost.style.opacity = "0";
// }, 5000);
