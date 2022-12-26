/**
 * Allows you to add a smooth button background transition, with a fade in and fade out effect, and even shadows to the button.
 * @param {boolean} fadeIn 
 * @param {int} timer 
 * @param {string} color
 * @param {boolean} fade
 * @param {string} textFadeColor
 * @param {string} htmlClass
 * @stuncs69
 * @copyright **©️ KubyX Softworks 2022**
 */
var initBtnAnim = (fadeIn, timer, color, fade, textFadeColor="white", htmlClass="btnanim") => {
    // get all button elements with the class specified
    const btns = document.getElementsByClassName(htmlClass);
    // for each button
    for (let i = 0; i < btns.length; i++) {
        // load initial CSS
        btns[i].style.borderRadius = "0.45rem";
        btns[i].style.borderColor = color;
        btns[i].style.cursor = "pointer";
        btns[i].style.borderStyle = "solid";
        // create event listener for mouse enter
        btns[i].addEventListener("mouseenter", function () {
            // if fade in is enabled
            if (fadeIn) {
                // fade in
                btns[i].style.backgroundColor = color;
                btns[i].style.color = textFadeColor;
                btns[i].style.transition = timer + "ms";
                if (fade) {
                    btns[i].style.boxShadow = `0px 0px 1rem 0px ${color}`;
                }
            } else {
                // if fade in is disabled, just change the background color
                btns[i].style.backgroundColor = color;
                btns[i].style.color = textFadeColor;
            }
        });
        // create event listener for mouse leave
        btns[i].addEventListener("mouseleave", function () {
            // if fade in is enabled
            if (fadeIn) {
                // fade out
                btns[i].style.backgroundColor = "transparent";
                btns[i].style.color = "inherit";
                btns[i].style.transition = timer + "ms";
                if (fade) {
                    btns[i].style.boxShadow = "none";
                }
            } else {
                // if fade in is disabled, just change the background color
                btns[i].style.backgroundColor = "transparent";
                btns[i].style.color = "inherit";
            }
        }
        );
    }
}