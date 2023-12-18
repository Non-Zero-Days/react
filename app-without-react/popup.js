window.onload = function () {
    // Get a reference to the elements by their IDs
    const popupButton = document.getElementById('popupButton');
    const popupText = document.getElementById('popupText');
    
    // Function to display a popup
    function displayPopup(inputText) {
        if (inputText === '') {
            alert('Please type something!');
        } else {
            alert(inputText);
        } 
    }

    // Add a click event listener to the button
    popupButton.addEventListener('click', () => displayPopup(popupText?.value));
};
