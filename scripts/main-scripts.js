/*-- Load the content of header.html into the headerContainer div--*/
const headerContainer = document.getElementById('headerContainer');
const xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState === XMLHttpRequest.DONE) {
    if (xhr.status === 200) {
      // Successfully loaded the content, inject it into the container
      headerContainer.innerHTML = xhr.responseText;
    } else {
      console.error('Error loading header:', xhr.status);
    }
  }
};

xhr.open('GET', '/components/header.html', true);
xhr.send();

/*--Load Footer (same as header)--*/
const footerContainer = document.getElementById('footerContainer');
const xhrf = new XMLHttpRequest();

xhrf.onreadystatechange = function() {
  if (xhrf.readyState === XMLHttpRequest.DONE) {
    if (xhrf.status === 200) {
      // Successfully loaded the content, inject it into the container
      footerContainer.innerHTML = xhrf.responseText;
    } else {
      console.error('Error loading footer:', xhrf.status);
    }
  }
};

xhrf.open('GET', '/components/footer.html', true);
xhrf.send();