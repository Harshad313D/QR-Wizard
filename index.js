const qrFormEl = document.getElementById("qrForm");
const qrImageEl = document.getElementById("qrImg");
const qrContainerEl = document.getElementById("qrContainer");
const qrInputTextEl = document.getElementById("qrInputText");
const generateBtnEl = document.getElementById("generateBtn");
const downloadBtnEl = document.getElementById("downloadBtn");

const renderQRCode = (url) => {
  if (!url) return;

  generateBtnEl.innerText = "Generating QR Code...";
  qrImageEl.src = url;

  const onImageLoad = () => {
    setTimeout(() => {
      qrContainerEl.classList.add("show");
      generateBtnEl.innerText = "Generate QR Code";
      downloadBtnEl.classList.remove("hidden"); 
    }, 500); 
  };

  
  qrImageEl.addEventListener("load", onImageLoad);
};

qrFormEl.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(qrFormEl);
  const text = formData.get("qrText");
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(text)}`;

  renderQRCode(qrCodeUrl);
});

qrInputTextEl.addEventListener("keyup", () => {
  if (!qrInputTextEl.value.trim()) {
    qrContainerEl.classList.remove("show");
    downloadBtnEl.classList.add("hidden"); 
  }
});

downloadBtnEl.addEventListener("click", () => {
  const qrCodeUrl = qrImageEl.src;

  const a = document.createElement('a');
  a.href = qrCodeUrl;
  a.download = 'qrcode.png'; 
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

document.addEventListener('contextmenu', function (event) {
  // Prevent right-click context menu
  event.preventDefault();
});
