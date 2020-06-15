const shareButton = document.querySelectorAll(".share");
const eventLink = document.querySelectorAll(".eventLink");

for (let x = 0; x < shareButton.length; x++) {
  shareButton[x].addEventListener("click", () => {
    navigator.clipboard.writeText(eventLink[x].value);
    navigator.clipboard.readText().then((text) => {
      if (eventLink[x] == text) {
        shareButton[x].innerHTML = "Link copiado!";
        shareButton[x].setAttribute("desabled", true);
      } else {
        shareButton[x].innerHTML =
          <i className="fa fa-share"></i> + "Compartilhar";
        shareButton[x].setAttribute("desabled", false);
      }
    });
  });
}
