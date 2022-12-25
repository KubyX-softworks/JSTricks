/**
 * Allows you to add a smooth button background transition, with a fade in and fade out effect, and even shadows to the button.
 * @param {boolean} fadeIn 
 * @param {int} timer 
 * @param {string} color
 * @author **©️ KubyX Softworks 2022**
 */
function init(fadeIn, timer, color) {
    // get all button elements with the class "btnanim"
    const btns = document.getElementsByClassName("btnanim");
    // for each button
    for (let i = 0; i < btns.length; i++) {
        // create event listener for mouse enter
        btns[i].addEventListener("mouseenter", function () {
            // if fade in is enabled
            if (fadeIn) {
                // fade in
                btns[i].style.backgroundColor = color;
                btns[i].style.transition = timer + "ms";
            } else {
                // if fade in is disabled, just change the background color
                btns[i].style.backgroundColor = color;
            }
        });
        // create event listener for mouse leave
        btns[i].addEventListener("mouseleave", function () {
            // if fade in is enabled
            if (fadeIn) {
                // fade out
                btns[i].style.backgroundColor = "transparent";
                btns[i].style.transition = timer + "ms";
            } else {
                // if fade in is disabled, just change the background color
                btns[i].style.backgroundColor = "transparent";
            }
        }
        );
        // add shadow if enabled
        if (btns[i].getAttribute("shadow") == "true") {
            btns[i].style.boxShadow = "0px 0px 0.5rem black";
        }
    }
}