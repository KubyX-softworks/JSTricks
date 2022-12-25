const container = document.getElementsByTagName("PowerQuery");

let query;
let preValue;
let lastQuery;

// get PowerQuery content
if (container[0].innerHTML != "") {
    preValue = container[0].innerHTML;
} else {
    preValue = "Example !Query";
}

function removeFirstWord(str) {
    const indexOfSpace = str.indexOf(' ');
    if (indexOfSpace === -1) {
      return '';
    }
    return str.substring(indexOfSpace + 1);
  }
  

function runQuery() {
    document.getElementById("debug").innerHTML = "WORKS";
    document.getElementById('pquery-inp').innerHTML = '';   
}

const stopWords = [
    "i","me","my","myself","we","our","ours","ourselves","you","your","yours","yourself","yourselves","he","him","his","himself","she","her","hers","herself","it","its","itself","they","them","their","theirs","themselves","what","which","who","whom","this","that","these","those","am","is","are","was","were","be","been","being","have","has","had","having","do","does","did","doing","a","an","the","and","but","if","or","because","as","until","while","of","at","by","for","with","about","against","between","into","through","during","before","after","above","below","to","from","up","down","in","out","on","off","over","under","again","further","then","once","here","there","when","where","why","how","all","any","both","each","few","more","most","other","some","such","no","nor","not","only","own","same","so","than","too","very","s","t","can","will","just","don","should","now"
]
function handleError(err) {
    document.body.style.backgroundColor = "red";
    document.body.style.color = "white";
    document.body.innerHTML = `<h1>Uh Oh!</h1><p>${err}</p>`
}

if (container.length > 0 && container.length < 2) {
    // cool! it seems we have 1 PowerQuery element to take care of! return an error in case there are more or none.
} else {
    handleError(`It seems you have ${container.length} instances of PowerQuery, however, that should be 1.`);
}

//! INIT POWERQUERY
let element = container[0];

// get width. default is 20rem if it isnt found
let width = element.getAttribute("width");
if (width == null) {
    width = "20rem";
}

// add HTML for query input
element.innerHTML = `<div spellcheck=false id='pquery-inp' style='background-color: transparent; text-decoration z-index: 1; color: transparent; position: absolute;' contenteditable='true'>${preValue}</div> <div style='overflow-wrap: break-word; z-index: -1; position: absolute; padding: 0.2rem' id='pquery-out'></div>`;
element.style.width = width;

// configure output
const out = document.getElementById('pquery-out');
out.style.width = width;
out.style.backgroundColor = "gray";
out.style.fontFamily = "arial";
out.style.color = "white";
out.style.borderRadius = "0.3rem"
out.style.minHeight = "1rem"

// get pquery input
const inp = document.getElementById('pquery-inp');
inp.style.border = "0.2rem solid black";
inp.style.borderRadius = "0.3rem";
inp.style.width = width;
inp.style.height = "1rem;";
inp.style.fontFamily = "arial";

// register classes for syntax highlighting
const EXCLUDE = "pquery-exclude";
const INCLUDE = "pquery-include";
const WARNING = "pquery-warning";

// add CSS events
const cssEvents = `
#pquery-inp:focus {
    
}
`;

const styleElement = document.createElement("style");

styleElement.innerHTML = cssEvents;

document.head.appendChild(styleElement);

// register keydown event if enter is pressed and input is not empty and it is selected
inp.addEventListener("keydown", function (e) {
    if (e.key == "Enter" && inp.innerHTML != "" && document.activeElement == inp) {
        let query = inp.innerHTML;
        inp.innerHTML = "";
        runQuery(query);
    }
});

inp.addEventListener("keydown", function (e) {
    if (e.key == "Control" && document.activeElement == inp) {
        let cmd = prompt("PowerQuery Command (help for help.)");
        if (cmd != null) {
            switch (cmd.split(" ")[0]) {
                case "help":
                    let help = `
                    help - Helps you out.
                    log [substr] - Logs something to the terminal.
                    copy - Copies PowerQuery content to your clipboard.
                    paste - Pastes clipboard content to PowerQuery.
                    del - Deletes the current text in PowerQuery.
                    `
                    alert(help);
                    break;
                case "log":
                    console.log(removeFirstWord(cmd));
                    break;
                case "remove":
                    let pr = prompt("Are you sure? this might break the site. Only use this for debugging :p (y/n)")
                    if (pr == "y" || pr == "yes") {
                        container[0].remove();
                    } else {
                        alert("Wise choice.")
                    }
                    break;
                case "copy":
                    navigator.clipboard.writeText(inp.innerHTML);
                    break;
                case "c":
                    navigator.clipboard.writeText(inp.innerHTML);
                    break;
                case "paste":
                    alert("to be fixed");
                    break;
                case "p":
                    alert("to be fixed");
                    break;
                case "del":
                    inp.innerHTML = "";
                    break;
                default:
                    alert(`${cmd} is not a valid command/command structure.`)
                    break;
            }
        }
    }
})

//! syntax highlight thingye
setInterval(() => {
    let quer = {
        include: [],
        exclude: []
    }
    let newstr = '';
    const data = inp.innerHTML;
    if (data === lastQuery) {
        // do nothing :p same inputs babey
    } else {
        const splitter = data.split(" ");
        splitter.forEach(value => {
            if (value.startsWith("!")) {
                newstr += `<span style="color: red; text-decoration: underline;"><span style="color: black;">${value}</span></span> `;
                quer.exclude.push(value.slice(1));
            } else if (stopWords.includes(value.toLowerCase().replace(' ',''))) {
                newstr += `<span style="color: yellow; text-decoration: underline;"><span style="color: black;">${value}</span></span> `;
            } else if (value.startsWith(":")) {
                newstr += `<span style="color: magenta; text-decoration: underline;"><span style="color: black;">${value}</span></span> `;
            } else {
                newstr += `<span style="color: green; text-decoration: underline;"><span style="color: black;">${value}</span></span> `;
                quer.include.push(value);
            }
        })
        out.innerHTML = newstr;
        lastQuery = data;
        console.log(quer);
    }   
}, 1);