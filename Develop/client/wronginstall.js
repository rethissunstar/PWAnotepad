const installBtn = document.getElementById('buttonInstall');
const textHeader = document.querySelector('h1'); 

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  installBtn.style.visibility = 'visible';
  textHeader.textContent = 'Click the button to install!';

  installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the prompt');
          installBtn.style.display = 'none'; 
        } else {
          console.log('User dismissed the prompt');
        }
        deferredPrompt = null; 
      });
    }
  });
});

window.addEventListener('appinstalled', (event) => {
  textHeader.textContent = 'Successfully installed!';
  console.log('👍', 'appinstalled', event);
});