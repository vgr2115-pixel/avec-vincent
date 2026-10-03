/* =========================================================
   AVEC VINCENT — CONFIGURATION
   ========================================================= */

/*
  À MODIFIER AVANT LA MISE EN LIGNE :

  email: ton adresse professionnelle
  phone: ton numéro
*/

const CONFIG = {
  email: "votre@email.fr",
  phone: "06 00 00 00 00"
};


/* =========================================================
   HEADER
   ========================================================= */

const header = document.querySelector(".site-header");

if (header) {
  const updateHeader = () => {
    header.classList.toggle(
      "scrolled",
      window.scrollY > 15
    );
  };

  updateHeader();

  window.addEventListener(
    "scroll",
    updateHeader
  );
}


/* =========================================================
   MOBILE MENU
   ========================================================= */

const menuButton =
  document.querySelector(".menu-button");

const mobileMenu =
  document.querySelector(".mobile-menu");

if (menuButton && mobileMenu) {

  menuButton.addEventListener(
    "click",
    () => {

      const open =
        mobileMenu.classList.toggle("open");

      menuButton.setAttribute(
        "aria-expanded",
        open
      );

    }
  );

  mobileMenu
    .querySelectorAll("a")
    .forEach(link => {

      link.addEventListener(
        "click",
        () => {

          mobileMenu.classList.remove("open");

          menuButton.setAttribute(
            "aria-expanded",
            "false"
          );

        }
      );

    });

}


/* =========================================================
   ACTIVE NAV LINK
   ========================================================= */

const currentPage =
  document.body.dataset.page;

if (currentPage) {

  document
    .querySelectorAll(
      `[data-nav="${currentPage}"]`
    )
    .forEach(link => {
      link.classList.add("active");
    });

}


/* =========================================================
   YEAR
   ========================================================= */

document
  .querySelectorAll("[data-year]")
  .forEach(element => {

    element.textContent =
      new Date().getFullYear();

  });


/* =========================================================
   CONTACT
   ========================================================= */

document
  .querySelectorAll("[data-email]")
  .forEach(element => {

    element.textContent = CONFIG.email;

    if (element.tagName === "A") {
      element.href =
        `mailto:${CONFIG.email}`;
    }

  });


document
  .querySelectorAll("[data-phone]")
  .forEach(element => {

    element.textContent = CONFIG.phone;

    if (element.tagName === "A") {

      element.href =
        "tel:" +
        CONFIG.phone.replace(/\s/g, "");

    }

  });


/* =========================================================
   PHOTO FALLBACK
   ========================================================= */

document
  .querySelectorAll(".profile-photo")
  .forEach(image => {

    image.addEventListener(
      "error",
      () => {
        image.remove();
      }
    );

  });


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

const revealItems =
  document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {

            entry.target
              .classList
              .add("visible");

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.1
      }
    );

  revealItems.forEach(item => {
    observer.observe(item);
  });

} else {

  revealItems.forEach(item => {
    item.classList.add("visible");
  });

}


/* =========================================================
   FAQ
   ========================================================= */

document
  .querySelectorAll(".faq-button")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const item =
          button.closest(".faq-item");

        const isOpen =
          item.classList.toggle("open");

        button.setAttribute(
          "aria-expanded",
          isOpen
        );

      }
    );

  });


/* =========================================================
   BOOKING FORM
   ========================================================= */

const bookingForm =
  document.getElementById("bookingForm");

if (bookingForm) {

  bookingForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const data =
        new FormData(bookingForm);

      const name =
        data.get("name");

      const student =
        data.get("student");

      const email =
        data.get("email");

      const phone =
        data.get("phone");

      const level =
        data.get("level");

      const subject =
        data.get("subject");

      const format =
        data.get("format");

      const objective =
        data.get("objective");


      const subjectLine =
        `Demande de cours — ${subject} — ${level}`;


      const message = `
Bonjour,

Je souhaite demander un premier cours.

Nom : ${name}
Élève : ${student}
E-mail : ${email}
Téléphone : ${phone}

Niveau : ${level}
Matière : ${subject}
Format souhaité : ${format}

Objectif / difficultés :
${objective}

Merci.
      `.trim();


      const mailto =
        `mailto:${CONFIG.email}` +
        `?subject=${encodeURIComponent(subjectLine)}` +
        `&body=${encodeURIComponent(message)}`;


      window.location.href = mailto;

    }
  );

}
