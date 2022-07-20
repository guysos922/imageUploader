async function browseHandler(ev) {
    //loading animation
    intoLoadTransition();
    //gets the file from browse button
    var file = document.getElementById('myfile').files[0];
    //if file isn't empty
    if (file) {
        //sends the file to the server
        if (sendFile(file)) {
            console.log("file", file.name, "was sent");
        }
        else {
            console.log("file", file.name, "was not sent");
        }
    }
    else {
        console.log("file is empty");
    }

    //starts filling loading bar
    loadingBar();
}

function dropHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    //loading animation
    intoLoadTransition();
    //gets file from dropArea
    file = ev.dataTransfer.items[0];
    //if file isn't empty
    if (file) {
        //sends the file to the server
        if (sendFile(file)) {
            console.log("file", file.name, "was sent");
        }
        else {
            console.log("file", file.name, "was not sent");
        }
    }
    else {
        console.log("file is empty");
    }
    //starts filling loading bar
    loadingBar()
}

function changeResult(fileName){
    document.getElementById("uploaded-img").src = fileName;
    console.log(window.location.href +'/'+fileName);
    document.getElementsByClassName('copy-link-button')[0].onclick = function() { location.href =window.location.href +'/'+fileName;}
}
/*
function: loading animation
input: none
output: none
*/
function intoLoadTransition() {
    //removes upload-rect with animation
    document.getElementsByClassName('upload-rect')[0].style.animation = 'slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both';
    document.getElementsByClassName('upload-rect')[0].style["-webkit-animation"] = 'slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both';
    //starts changing loader into loading
    typeWriter(false)
    //after 5 seconds changes it back
    setTimeout(typeWriter, 5000, true);
    //brings load-bar into display with animation
    document.getElementsByClassName('loader')[0].style.display = 'block';
    document.getElementsByClassName('loader')[0].style.animation = 'bounce-in-bottom 1.1s both 1s';
    document.getElementsByClassName('loader')[0].style["-webkit-animation"] = 'bounce-in-bottom 1.1s both 1s';
}

/*
function: out of loading animation
input: none
output: none
*/
function outLoadTransition() {
    //removes loader with animation
    document.getElementsByClassName('loader')[0].style.animation = 'slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both';
    document.getElementsByClassName('loader')[0].style["-webkit-animation"] = 'slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both';
    document.getElementsByClassName('loader')[0].style.display = 'none';
    //starts changing upload-rect into loading
    typeWriter(false)
    //after 5 seconds changes it back
    setTimeout(typeWriter, 5000, true);
    //brings load-bar into display with animation
    document.getElementsByClassName('result-rect')[0].style.display = 'block';
    document.getElementsByClassName('result-rect')[0].style.animation = 'bounce-in-bottom 1.1s both 1s';
    document.getElementsByClassName('result-rect')[0].style["-webkit-animation"] = 'bounce-in-bottom 1.1s both 1s';
}

/*
function: fills the loading bar
input: none
output:none
*/
function loadingBar() {
    var greenBar = document.getElementsByClassName('green-line')[0];
    var width = 1;
    var id = setInterval(scene, 10);
    function scene() {
        if (width >= 100) {
            clearInterval(id);
            outLoadTransition();
        } else {
            width++;
            greenBar.style.width = width + '%';
        }
    }
}

/*
function: sends file to the server
input: the file
output: if it was sent
*/
async function sendFile(file) {
    let formData = new FormData();

    //check if file is'nt Null
    if (file) {
        //adds form data the photo under key name photo
        formData.append("photo", file);

        //sends formData in post request into url/upload-image
        var response = await fetch('/upload-image', {
            method: 'POST',
            body: formData
        });
        let data = await response.text();
        console.log(data)
        changeResult(data)
        //if file sent to the function is successful
        return true;
    }
    //if file sent to the function is empty
    return false;
}


function dragOverHandler(ev) {
    document.getElementsByClassName('drop-image-rect')[0].style.border = '1px solid rgba(0, 0, 0, 0.35)';
}

function dragLeaveHandler(ev) {
    document.getElementsByClassName('drop-image-rect')[0].style.border = '1px dashed rgba(0, 0, 0, 0.35)';
}

function typeWriter(rewrite) {
    var speed = 300;
    if (rewrite == false) {
        setTimeout(typeWriterRemove, speed);
        setTimeout(typeWriterRemove, speed * 2);
        setTimeout(typeWriterAdd, speed * 3, 'i');
        setTimeout(typeWriterAdd, speed * 4, 'n');
        setTimeout(typeWriterAdd, speed * 5, 'g');
    } else {
        setTimeout(typeWriterRemove, speed);
        setTimeout(typeWriterRemove, speed * 2);
        setTimeout(typeWriterRemove, speed * 3);
        setTimeout(typeWriterAdd, speed * 4, 'e');
        setTimeout(typeWriterAdd, speed * 5, 'r');
    }
}

function typeWriterRemove() {
    document.getElementsByClassName('load')[0].innerHTML = document.getElementsByClassName('load')[0].innerHTML.slice(0, -1);
}

function typeWriterAdd(char) {
    document.getElementsByClassName('load')[0].innerHTML += char;
}


///////////////////////////////////////////////////////

