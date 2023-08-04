const butInstall = document.getElementById('buttonInstall');
const textHeader = document.querySelector('h1');


// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  
  event.preventDefault();

  butInstall.style.visibility = 'visible';
  textHeader.textContent = 'Click the button to install!';

  // TODO: Implement a click event handler on the `butInstall` element
  butInstall.addEventListener("click", async () => {
    const promptEvent = window.deferredPrompt;
  
    if (!promptEvent) {
      return;
    }
  
    promptEvent.prompt();
  
    window.deferredPrompt = null;
  
    butInstall.classList.toggle("hidden", true);
  });
  
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  textHeader.textContent = 'Successfully installed!';
  console.log('👍', 'appinstalled', event);
});
