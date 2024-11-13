document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const movieCards = document.querySelectorAll(".movie-card");
        const dialog = document.getElementById("ligthbox");
        const dialogImage = dialog ? dialog.querySelector("img") : null;
        const dialogTitle = dialog ? dialog.querySelector("h1") : null;
        const dialogDescription = dialog ? dialog.querySelector(".description") : null;
        const trailerContainer = dialog ? dialog.querySelector(".trailer-container") : null;
        const closeDialogButton = document.getElementById("close-dialog");

        if (!dialog) console.error("El elemento con id 'ligthbox' no se encontró en el DOM.");
        if (!dialogImage) console.error("El elemento de imagen dentro del dialog no se encontró en el DOM.");
        if (!dialogTitle) console.error("El título dentro del dialog no se encontró en el DOM.");
        if (!dialogDescription) console.error("La descripción dentro del dialog no se encontró en el DOM.");
        if (!trailerContainer) console.error("El contenedor del trailer dentro del dialog no se encontró en el DOM.");
        if (!closeDialogButton) console.error("El botón de cierre con id 'close-dialog' no se encontró en el DOM.");

        if (movieCards.length > 0 && dialog && dialogImage && dialogTitle && dialogDescription && trailerContainer && closeDialogButton) {
            movieCards.forEach((card) => {
                card.addEventListener("click", () => {
                    const movieImageSrc = card.querySelector("img").src;
                    const movieTitle = card.querySelector("p").textContent;
                    const movieDescription = card.getAttribute("data-description");
                    const trailerIframe = card.getAttribute("data-trailer-url");

                    dialogImage.src = movieImageSrc;
                    dialogImage.alt = movieTitle;
                    dialogTitle.textContent = movieTitle;
                    dialogDescription.textContent = movieDescription;

                    trailerContainer.innerHTML = trailerIframe;

                    dialog.showModal();
                });
            });

            closeDialogButton.addEventListener("click", (event) => {
                event.preventDefault();
                dialog.close();
                trailerContainer.innerHTML = "";
            });
        } else {
            console.error("Algunos elementos necesarios no se encontraron en el DOM.");
        }
    }, 500); // Retrasa la ejecución 500 ms
});
