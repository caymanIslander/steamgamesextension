/* document.addEventListener('mouseup', function() {
    var selectedText = window.getSelection().toString(); // Seçilen metni alın
    if (selectedText !== '') {
      chrome.runtime.sendMessage({text: selectedText}); // Konsola seçilen metni yazdırın
    }
  });
   */

  document.addEventListener('click', function(event) {
    console.log('Tıklanan Element:', event.target);
  });
  