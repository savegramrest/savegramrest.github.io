const root = document.documentElement;
const themeToggle = document.getElementById("themeToggle");


// ===============================
// THEME
// ===============================

const savedTheme = localStorage.getItem("savegram-theme");

if (savedTheme) {
    root.setAttribute("data-theme", savedTheme);
} else {
    const prefersLight = window.matchMedia(
        "(prefers-color-scheme: light)"
    ).matches;

    root.setAttribute(
        "data-theme",
        prefersLight ? "light" : "dark"
    );
}


themeToggle.addEventListener("click", () => {

    const currentTheme =
        root.getAttribute("data-theme");

    const newTheme =
        currentTheme === "dark"
            ? "light"
            : "dark";

    root.setAttribute(
        "data-theme",
        newTheme
    );

    localStorage.setItem(
        "savegram-theme",
        newTheme
    );

});


// ===============================
// HEADER ON SCROLL
// ===============================

const header =
    document.querySelector(".header");


function updateHeader() {

    header.classList.toggle(
        "scrolled",
        window.scrollY > 10
    );

}


window.addEventListener(
    "scroll",
    updateHeader,
    {
        passive: true
    }
);


updateHeader();


// ===============================
// COMMAND FILTERS
// ===============================

const cards =
    document.querySelectorAll(
        ".command-card"
    );

const filters =
    document.querySelectorAll(
        ".filter"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );


let activeFilter = "all";


function filterCommands() {

    const query =
        searchInput.value
            .trim()
            .toLowerCase();


    cards.forEach(card => {

        const category =
            card.dataset.category;

        const searchText =
            card.dataset.search
                .toLowerCase();


        const matchesCategory =
            activeFilter === "all" ||
            category === activeFilter;


        const matchesSearch =
            searchText.includes(query);


        const show =
            matchesCategory &&
            matchesSearch;


        card.classList.toggle(
            "hidden",
            !show
        );

    });

}


filters.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            filters.forEach(btn => {
                btn.classList.remove(
                    "active"
                );
            });


            button.classList.add(
                "active"
            );


            activeFilter =
                button.dataset.filter;


            filterCommands();

        }
    );

});


searchInput.addEventListener(
    "input",
    filterCommands
);


// ===============================
// COPY COMMANDS
// ===============================

const copyButtons =
    document.querySelectorAll(
        ".copy-button"
    );


copyButtons.forEach(button => {

    button.addEventListener(
        "click",
        async () => {

            const command =
                button.dataset.copy;


            try {

                await navigator.clipboard
                    .writeText(command);


                button.classList.add(
                    "copied"
                );


                const originalHTML =
                    button.innerHTML;


                button.innerHTML = `
                    <svg viewBox="0 0 24 24">
                        <path d="m5 12 4 4L19 6"></path>
                    </svg>
                `;


                setTimeout(() => {

                    button.innerHTML =
                        originalHTML;

                    button.classList.remove(
                        "copied"
                    );

                }, 1300);


            } catch {

                button.classList.add(
                    "copied"
                );


                setTimeout(() => {

                    button.classList.remove(
                        "copied"
                    );

                }, 1000);

            }

        }
    );

});


// ===============================
// SCROLL REVEAL
// ===============================

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target
                        .classList
                        .add("visible");


                    revealObserver
                        .unobserve(
                            entry.target
                        );

                }

            });

        },
        {
            threshold: 0.08,
            rootMargin:
                "0px 0px -30px 0px"
        }
    );


revealElements.forEach(
    element => {

        revealObserver.observe(
            element
        );

    }
);


// ===============================
// FAQ
// ===============================

const faqItems =
    document.querySelectorAll(
        ".faq-item"
    );


faqItems.forEach(item => {

    const question =
        item.querySelector(
            ".faq-question"
        );

    const answer =
        item.querySelector(
            ".faq-answer"
        );


    question.addEventListener(
        "click",
        () => {

            const alreadyOpen =
                item.classList
                    .contains("active");


            faqItems.forEach(
                otherItem => {

                    otherItem.classList
                        .remove("active");


                    const otherAnswer =
                        otherItem
                            .querySelector(
                                ".faq-answer"
                            );


                    otherAnswer.style
                        .maxHeight =
                        null;

                }
            );


            if (!alreadyOpen) {

                item.classList.add(
                    "active"
                );


                answer.style.maxHeight =
                    answer.scrollHeight +
                    "px";

            }

        }
    );

});
