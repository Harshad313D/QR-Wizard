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



downloadBtnEl.addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Load the QR code image
  const qrCodeUrl = qrImageEl.src;
  const img = new Image();
  img.crossOrigin = 'Anonymous'; // This may be required to prevent CORS issues

  img.onload = () => {
    doc.text('Welcome to QR Wizard! ', 70, 10); 
    doc.text('Created by Harshad313D (github) ', 60, 140); 
    doc.text('Scan the QR code below to access the content:', 50, 50); 
    doc.addImage(img, 'PNG', 80, 60, 50, 50);
    doc.save('qrcode.pdf');
  };

  img.src = qrCodeUrl;
});


document.addEventListener('contextmenu', function (event) {
  // Prevent right-click context menu
  event.preventDefault();
});