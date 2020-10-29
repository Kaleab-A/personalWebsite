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
var modalBody = document.querySelector("#modalBody");
var myPhoto = document.querySelector("#myPhoto");
var submitComment = document.querySelector("#submitComment");
var userName = document.querySelector("#userName");
var comment1 = document.querySelector("#comment1");
var commentDiv = document.querySelector("#commentDiv");
var addComment = document.querySelector("#addComment");
// var circle = document.querySelector("#circle");
// var switch1 = document.querySelector("#switch");
// var lightOff = document.querySelector("#lightOff");
// var lost = document.querySelector("#lost");

var jsonData;
var activeElement;
var langList = ["python", "cpp", "html", "css", "js", "unknown"];
var projectList;
var cursorX = 0;
var cursorY = 0;
var circleRad = 85;

https: fetch("https://api.jsonbin.io/b/5f9a922d9291173cbca5426c", {
  headers: {
    "secret-key":
      "$2b$10$dvh4iValdopj2Uuuv6.0z.yvT5/Z4.OefRsJIH6didh3.guwl57Ju",
  },
})
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
      projectDiv.classList.add("cardMain");

      let project = document.createElement("div");
      project.classList.add("card");
      project.classList.add("projectList");
      project.setAttribute("data-toggle", "modal");
      project.setAttribute("data-target", "#projectPreview");
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

      modalImg = document.createElement("img");
      modalImg.setAttribute("src", data[element]);

      modalDiv.appendChild(modalImg);
      modalBody.appendChild(modalDiv);
    }

    myPhoto.setAttribute("src", data["myPhoto"]);
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
  // circle.style.top = cursorY - circleRad + document.body.scrollTop;
  // circle.style.left = cursorX - circleRad + document.body.scrollLeft;
}

tinymce.init({
  selector: "textarea",
  plugins: "emoticons",
  toolbar: "emoticons",
  toolbar_location: "bottom",
  menubar: false,
});

submitComment.addEventListener("click", function (event) {
  fetch("http://worldclockapi.com/api/json/utc/now")
    .then((response) => response.json())
    .then((data) => {
      const timeMap = new Map(Object.entries(data));
      let curr = String(timeMap.get("currentDateTime"));
      curr =
        curr.split("T")[1].slice(0, 5) + " " + curr.split("T")[0].slice(0, 10);
      userNameText = userName.value;
      commentText = tinymce.get("comment1").getContent();
      if (userNameText == "") userNameText = "Anonymous";
      if (commentText == "") return;

      let singleComm = document.createElement("div");
      singleComm.classList.add("comments");

      let commName = document.createElement("h5");
      commName.classList.add("card-title");
      commName.innerHTML = userNameText + " <span>(" + curr + ")</span>";

      let commBody = document.createElement("p");
      commBody.classList.add("card-text");
      commBody.innerHTML = commentText;

      singleComm.appendChild(commName);
      singleComm.appendChild(commBody);
      commentDiv.appendChild(singleComm);
      userName.value = "";
      tinymce.get("comment1").setContent("");
      $("#addComment").modal("hide");
    });
});

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
