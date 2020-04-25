inputFile = document.querySelector("input[type = file]");
imgInput = document.getElementById("imgInput");
imgPreview = document.getElementById("imgPreview");
imgPreviewContainer = document.getElementById("imgPreviewContainer");
buttonClose = document.getElementById("buttonClose");

inputFile.addEventListener("change", () => {
  const file = inputFile.files[0];

  if (file) {
    const reader = new FileReader();

    imgInput.style.display = "none";
    imgPreviewContainer.style.display = "block";

    reader.addEventListener("load", () => {
      imgPreview.setAttribute("src", reader.result);
    });

    reader.readAsDataURL(file);
  } else {
    imgInput.style.display = null;
    imgPreview.style.display = null;
  }
});

buttonClose.addEventListener("click", () => {
  imgPreview.setAttribute("src", null);
  imgInput.style.display = null;
  imgPreviewContainer.style.display = null;
});
