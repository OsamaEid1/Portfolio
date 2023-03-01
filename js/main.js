// Start Menu button
let menuBtn = document.querySelector("header .menu-btn");
let firstSpan = document.querySelector("header .menu-btn span:first-child");
let secondSpan = document.querySelector("header .menu-btn span:nth-child(2)");
let thirdSpan = document.querySelector("header .menu-btn span:last-child");

function showOrHideNav() {
   //Open Or Close Menu Button
   firstSpan.classList.toggle("first-close-span");
   secondSpan.classList.toggle("second-close-span");
   thirdSpan.classList.toggle("third-close-span");

   //Show Nav In Mobile
   let nav = document.querySelector("nav");
   nav.classList.toggle("show-nav");
}

//Clicking On Menu
menuBtn.onclick = () => showOrHideNav();

//Go To a Section
let sections = document.querySelectorAll("nav .sections");
sections.forEach((section) => (section.onclick = () => showOrHideNav()));

//Mouse trail
let landingSection = document.querySelector(".landing");
landingSection.addEventListener("mousemove", (mouse) => {
   //Create and styling trail effect
   let trail = document.createElement("div");
   trail.className = "trail";
   trail.style.cssText = `left: ${mouse.clientX - 3.5}px; top: ${
      mouse.clientY - 3.5}px;`;

   //Remove trail effect when Element's Animation finished
   trail.onanimationend = () => {
      trail.remove();
   };

   landingSection.appendChild(trail);
});

//Start TagCanvas
window.onload = () => {
   //Show the landing's contents
   showLandingContent();

   //Start Canvas
   try {
      TagCanvas.Start("myCanvas");
   } catch (e) {
      // something went wrong, hide the canvas container
      document.getElementById("myCanvasContainer").style.display = "none";
   }
};

//Show Landing's contents when page is loaded
showLandingContent = () => {
   //Show Special Letters in the content of landing section
   let specialLetters = document.querySelectorAll(".landing .logo");
   specialLetters.forEach((letter) => {
      letter.style.opacity = "1";
      // letter.style.transform = "translateX(0)";
   });

   //Show the normal letters(dancing letters) in the content of landing section
   showLetters(document.querySelectorAll(".landing .letter"));

   //Show Contact Btn After Showing the letters
   document.querySelector(".landing .main-btn").style.opacity = "1";
};

//Waiting for 150ms then return promise
sleep = () => new Promise((resolve) => setTimeout(resolve, 150));

//Show The letters in the dancing-text
showLetters = async (sectionLetters) => {
   let lettersLength = sectionLetters.length;
   for (let i = 0; i < lettersLength; i++) {
      sectionLetters[i].style.transform = "scale(1)";
      await sleep();
   }
};

//Select The Link's Section when reach to it
function focusOnSectionLink() {
   let aboutSection = document.querySelector(".about");
   let mySkillsSection = document.querySelector(".my-skills");
   let myWorksSection = document.querySelector(".my-works");
   let contactSection = document.querySelector(".contact");
   let sectionsLinks = document.querySelectorAll(".sections a");

   //Remove effects from all links
   sectionsLinks.forEach((link) => {
      link.style.removeProperty("font-size");
      link.style.removeProperty("padding");
      link.style.removeProperty("color");
   });

   //Add effects to the link that describe the visiting section
   if (
      scrollY + 1 >= aboutSection.offsetTop &&
      scrollY + 1 < mySkillsSection.offsetTop
   ) {
      document.querySelector("[href='#about']").style.fontSize = "1.1rem";
      document.querySelector("[href='#about']").style.padding = "19px";
      document.querySelector("[href='#about']").style.color = "#05FDD8";
   } else if (
      scrollY + 1 >= mySkillsSection.offsetTop &&
      scrollY + 1 < myWorksSection.offsetTop
   ) {
      document.querySelector("[href='#my-skills']").style.fontSize = "1.1rem";
      document.querySelector("[href='#my-skills']").style.padding = "19px";
      document.querySelector("[href='#my-skills']").style.color = "#05FDD8";
   } else if (
      scrollY + 1 >= myWorksSection.offsetTop &&
      scrollY + 50 < contactSection.offsetTop
   ) {
      document.querySelector("[href='#my-works']").style.fontSize = "1.1rem";
      document.querySelector("[href='#my-works']").style.padding = "19px";
      document.querySelector("[href='#my-works']").style.color = "#05FDD8";
   } else if (scrollY + 50 >= contactSection.offsetTop) {
      document.querySelector("[href='#contact']").style.fontSize = "1.1rem";
      document.querySelector("[href='#contact']").style.padding = "19px";
      document.querySelector("[href='#contact']").style.color = "#05FDD8";
   }
}

//Refresh effects while scrolling
window.onscroll = () => {
   focusOnSectionLink();

   //check if mediaQuery exists and if the value for mediaQuery does not match 'reduce', return the scrollAnimation.
   const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
   if (mediaQuery && !mediaQuery.matches) {
      throttle(handleScrollAnimation, 250);
   }
};

//Contact with Whatsapp
send_handle = () => window.open(`https://wa.me/201142014769?`, "_blank");

//Animation on scrolling
let throttleTimer = false;
throttle = (handleScrollAnimation, time) => {
   //don't run the function while throttle timer is true
   if (throttleTimer) return;
   //first set throttle timer to true so the function doesn't run
   throttleTimer = true;
   setTimeout(() => {
      handleScrollAnimation();
      throttleTimer = false;
   }, time);
};

//return true value if the top of the section has passed the offset
const elementInView = (section, offset = 0) => {
   const sectionTop = section.getBoundingClientRect().top;
   return (
      sectionTop <=
      (window.innerHeight || document.documentElement.clientHeight) - offset
   );
};

//Handle scroll animations
const handleScrollAnimation = () => {
   let aboutSection = document.querySelector(".about");
   let mySkillsSection = document.querySelector(".my-skills");
   let myWorksSection = document.querySelector(".my-works");
   let contactSection = document.querySelector(".contact");

   if (elementInView(aboutSection, 250)) {
      document
         .querySelector(".about .image")
         .classList.add("show-horizontal-elements");
      document
         .querySelector(".about .details")
         .classList.add("show-horizontal-elements");
      showLetters(document.querySelectorAll(".about .letter"));
   }
   if (elementInView(mySkillsSection, 250)) {
      showLetters(document.querySelectorAll(".my-skills .letter"));
      document
         .querySelector("#myCanvasContainer")
         .classList.add("show-vertical-elements");
   }
   if (elementInView(myWorksSection, 250)) {
      showLetters(document.querySelectorAll(".my-works .letter"));
      showWorks();
   }
   if (elementInView(contactSection, 250)) {
      showLetters(document.querySelectorAll(".contact .letter"));
      document.querySelector(".contact p").style.opacity = "1";
      document
         .querySelector(".contact-box h4")
         .classList.add("show-horizontal-elements");
      showSocialContacts();
   }
};

//Show Works one by one
showWorks = async () => {
   let works = document.querySelectorAll(".works .work");
   let worksLength = works.length;
   for (let i = 0; i < worksLength; i++) {
      works[i].classList.add("show-vertical-elements");
      await sleep();
   }
};

//Show Social Contacts one by one
showSocialContacts = async () => {
   let showSocialContacts = document.querySelectorAll(
      ".contact-box .social-contacts li"
   );
   let showSocialContactsLength = showSocialContacts.length;
   for (let i = 0; i < showSocialContactsLength; i++) {
      showSocialContacts[i].classList.add("show-vertical-elements");
      await sleep();
   }
};

// Start Menu button
let menuBtn = document.querySelector("header .menu-btn");
let firstSpan = document.querySelector("header .menu-btn span:first-child");
let secondSpan = document.querySelector("header .menu-btn span:nth-child(2)");
let thirdSpan = document.querySelector("header .menu-btn span:last-child");

function showOrHideNav() {
   //Open Or Close Menu Button
   firstSpan.classList.toggle("first-close-span");
   secondSpan.classList.toggle("second-close-span");
   thirdSpan.classList.toggle("third-close-span");

   //Show Nav In Mobile
   let nav = document.querySelector("nav");
   nav.classList.toggle("show-nav");
}

//Clicking On Menu
menuBtn.onclick = () => showOrHideNav();

//Go To a Section
let sections = document.querySelectorAll("nav .sections");
sections.forEach((section) => (section.onclick = () => showOrHideNav()));

//Mouse trail
let landingSection = document.querySelector(".landing");
landingSection.addEventListener("mousemove", (mouse) => {
   //Create and styling trail effect
   let trail = document.createElement("div");
   trail.className = "trail";
   trail.style.cssText = `left: ${mouse.clientX - 3.5}px; top: ${
      mouse.clientY - 3.5
   }px;`;

   //Remove trail effect when Element's Animation finished
   trail.onanimationend = () => {
      trail.remove();
   };

   landingSection.appendChild(trail);
});

//Start TagCanvas
window.onload = () => {
   //Show the landing's contents
   showLandingContent();

   //Start Canvas
   try {
      TagCanvas.Start("myCanvas");
   } catch (e) {
      // something went wrong, hide the canvas container
      document.getElementById("myCanvasContainer").style.display = "none";
   }
};

//Show Landing's contents when page is loaded
showLandingContent = () => {
   //Show Special Letters in the content of landing section
   let specialLetters = document.querySelectorAll(".landing .logo");
   specialLetters.forEach((letter) => {
      letter.style.opacity = "1";
      // letter.style.transform = "translateX(0)";
   });

   //Show the normal letters(dancing letters) in the content of landing section
   showLetters(document.querySelectorAll(".landing .letter"));

   //Show Contact Btn After Showing the letters
   document.querySelector(".landing .main-btn").style.opacity = "1";
};

//Waiting for 150ms then return promise
sleep = () => new Promise((resolve) => setTimeout(resolve, 150));

//Show The letters in the dancing-text
showLetters = async (sectionLetters) => {
   let lettersLength = sectionLetters.length;
   for (let i = 0; i < lettersLength; i++) {
      sectionLetters[i].style.transform = "scale(1)";
      await sleep();
   }
};

//Select The Link's Section when reach to it
function focusOnSectionLink() {
   let aboutSection = document.querySelector(".about");
   let mySkillsSection = document.querySelector(".my-skills");
   let myWorksSection = document.querySelector(".my-works");
   let contactSection = document.querySelector(".contact");
   let sectionsLinks = document.querySelectorAll(".sections a");

   //Remove effects from all links
   sectionsLinks.forEach((link) => {
      link.style.removeProperty("font-size");
      link.style.removeProperty("padding");
      link.style.removeProperty("color");
   });

   //Add effects to the link that describe the visiting section
   if (
      scrollY + 1 >= aboutSection.offsetTop &&
      scrollY + 1 < mySkillsSection.offsetTop
   ) {
      document.querySelector("[href='#about']").style.fontSize = "1.1rem";
      document.querySelector("[href='#about']").style.padding = "19px";
      document.querySelector("[href='#about']").style.color = "#05FDD8";
   } else if (
      scrollY + 1 >= mySkillsSection.offsetTop &&
      scrollY + 1 < myWorksSection.offsetTop
   ) {
      document.querySelector("[href='#my-skills']").style.fontSize = "1.1rem";
      document.querySelector("[href='#my-skills']").style.padding = "19px";
      document.querySelector("[href='#my-skills']").style.color = "#05FDD8";
   } else if (
      scrollY + 1 >= myWorksSection.offsetTop &&
      scrollY + 50 < contactSection.offsetTop
   ) {
      document.querySelector("[href='#my-works']").style.fontSize = "1.1rem";
      document.querySelector("[href='#my-works']").style.padding = "19px";
      document.querySelector("[href='#my-works']").style.color = "#05FDD8";
   } else if (scrollY + 50 >= contactSection.offsetTop) {
      document.querySelector("[href='#contact']").style.fontSize = "1.1rem";
      document.querySelector("[href='#contact']").style.padding = "19px";
      document.querySelector("[href='#contact']").style.color = "#05FDD8";
   }
}

//Refresh effects while scrolling
window.onscroll = () => {
   focusOnSectionLink();

   //check if mediaQuery exists and if the value for mediaQuery does not match 'reduce', return the scrollAnimation.
   const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
   if (mediaQuery && !mediaQuery.matches) {
      throttle(handleScrollAnimation, 250);
   }
};

//Contact with Whatsapp
send_handle = () => window.open(`https://wa.me/201142014769?`, "_blank");

//Animation on scrolling
let throttleTimer = false;
throttle = (handleScrollAnimation, time) => {
   //don't run the function while throttle timer is true
   if (throttleTimer) return;
   //first set throttle timer to true so the function doesn't run
   throttleTimer = true;
   setTimeout(() => {
      handleScrollAnimation();
      throttleTimer = false;
   }, time);
};

//return true value if the top of the section has passed the offset
const elementInView = (section, offset = 0) => {
   const sectionTop = section.getBoundingClientRect().top;
   return (
      sectionTop <=
      (window.innerHeight || document.documentElement.clientHeight) - offset
   );
};

//Handle scroll animations
const handleScrollAnimation = () => {
   let aboutSection = document.querySelector(".about");
   let mySkillsSection = document.querySelector(".my-skills");
   let myWorksSection = document.querySelector(".my-works");
   let contactSection = document.querySelector(".contact");

   if (elementInView(aboutSection, 250)) {
      document
         .querySelector(".about .image")
         .classList.add("show-horizontal-elements");
      document
         .querySelector(".about .details")
         .classList.add("show-horizontal-elements");
      showLetters(document.querySelectorAll(".about .letter"));
   }
   if (elementInView(mySkillsSection, 250)) {
      showLetters(document.querySelectorAll(".my-skills .letter"));
      document
         .querySelector("#myCanvasContainer")
         .classList.add("show-vertical-elements");
   }
   if (elementInView(myWorksSection, 250)) {
      showLetters(document.querySelectorAll(".my-works .letter"));
      showWorks();
   }
   if (elementInView(contactSection, 250)) {
      showLetters(document.querySelectorAll(".contact .letter"));
      document.querySelector(".contact p").style.opacity = "1";
      document
         .querySelector(".contact-box h4")
         .classList.add("show-horizontal-elements");
      showSocialContacts();
   }
};

//Show Works one by one
showWorks = async () => {
   let works = document.querySelectorAll(".works .work");
   let worksLength = works.length;
   for (let i = 0; i < worksLength; i++) {
      works[i].classList.add("show-vertical-elements");
      await sleep();
   }
};

//Show Social Contacts one by one
showSocialContacts = async () => {
   let showSocialContacts = document.querySelectorAll(
      ".contact-box .social-contacts li"
   );
   let showSocialContactsLength = showSocialContacts.length;
   for (let i = 0; i < showSocialContactsLength; i++) {
      showSocialContacts[i].classList.add("show-vertical-elements");
      await sleep();
   }
};
