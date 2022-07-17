async function browseHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    document.getElementsByClassName('upload-rect')[0].style.animation = 'slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both';
    document.getElementsByClassName('upload-rect')[0].style["-webkit-animation"] = 'slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both';
    //document.getElementsByClassName('load')[0].style.animation = 'drop-load 2s ease-in-out forwards';
    //document.getElementsByClassName('load')[0].style["-webkit-animation"] = 'drop-load 2s ease-in-out forwards';
    typeWriter(false)
    setTimeout(typeWriter, 5000, true);
    document.getElementsByClassName('loader')[0].style.display = 'block';
    document.getElementsByClassName('loader')[0].style.animation = 'bounce-in-bottom 1.1s both 1s';
    document.getElementsByClassName('loader')[0].style["-webkit-animation"] = 'bounce-in-bottom 1.1s both 1s';


    let formData = new FormData();

    if (document.getElementById('myfile').files[0]) {
        console.log("caught file")
        // If dropped items aren't files, reject them
        const photo = document.getElementById('myfile').files[0];
        console.log('file name = ' + photo.name);
        formData.append("photo", photo);

        let response = await fetch('/upload-image', {
            method: 'POST',
            body: formData
        });

        console.log(response);
    }

    var greenBar = document.getElementsByClassName('green-line')[0];
    var width = 1;
    var id = setInterval(scene, 100);
    function scene() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            greenBar.style.width = width + '%';
        }
    }
}

function dropHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    document.getElementsByClassName('upload-rect')[0].style.animation = 'slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both';
    document.getElementsByClassName('upload-rect')[0].style["-webkit-animation"] = 'slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both';
    //document.getElementsByClassName('load')[0].style.animation = 'drop-load 2s ease-in-out forwards';
    //document.getElementsByClassName('load')[0].style["-webkit-animation"] = 'drop-load 2s ease-in-out forwards';
    typeWriter(false)
    setTimeout(typeWriter, 5000, true);
    document.getElementsByClassName('loader')[0].style.display = 'block';
    document.getElementsByClassName('loader')[0].style.animation = 'bounce-in-bottom 1.1s both 1s';
    document.getElementsByClassName('loader')[0].style["-webkit-animation"] = 'bounce-in-bottom 1.1s both 1s';

    let req = new XMLHttpRequest();
    let formData = new FormData();

    if (ev.dataTransfer.items) {
        console.log("caught file")
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < ev.dataTransfer.items.length; i++) {
            // If dropped items aren't files, reject them
            if (ev.dataTransfer.items[i].kind === 'file') {
                const photo = ev.dataTransfer.items[i].getAsFile();
                console.log('... file[' + i + '].name = ' + photo.name);
                formData.append("photo", photo);
                req.open("POST", '/upload-image');
                req.send(formData);
            }
        }

        var greenBar = document.getElementsByClassName('green-line')[0];
        var width = 1;
        var id = setInterval(scene, 100);
        function scene() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++;
                greenBar.style.width = width + '%';
            }
        }
    }
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

