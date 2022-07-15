function dropHandler(ev) {
    console.log('File(s) dropped');
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    document.getElementsByClassName('upload-rect')[0].style.animation = 'slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both';
    document.getElementsByClassName('upload-rect')[0].style["-webkit-animation"] = 'slide-out-top 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both';
    //document.getElementsByClassName('load')[0].style.animation = 'drop-load 2s ease-in-out forwards';
    //document.getElementsByClassName('load')[0].style["-webkit-animation"] = 'drop-load 2s ease-in-out forwards';
    typeWriter(false)
    setTimeout(typeWriter, 5000, true);
    
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === 'file') {
          const file = ev.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.name);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.files.length; i++) {
        console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
      }
    }
  }

  function dragOverHandler(ev) {
    document.getElementsByClassName('drop-image-rect')[0].style.border = '1px solid rgba(0, 0, 0, 0.35)';
  }

  function dragLeaveHandler(ev) {
    document.getElementsByClassName('drop-image-rect')[0].style.border = '1px dashed rgba(0, 0, 0, 0.35)';
  }
  function typeWriter(rewrite){
    var speed = 300;
    if(rewrite==false){
      setTimeout(typeWriterRemove, speed);
      setTimeout(typeWriterRemove, speed*2);
      setTimeout(typeWriterAdd, speed*3 , 'i');
      setTimeout(typeWriterAdd, speed*4, 'n');
      setTimeout(typeWriterAdd, speed*5, 'g');
    }else{
      setTimeout(typeWriterRemove, speed);
      setTimeout(typeWriterRemove, speed*2);
      setTimeout(typeWriterRemove, speed*3);
      setTimeout(typeWriterAdd, speed*4 , 'e');
      setTimeout(typeWriterAdd, speed*5, 'r');
    }
  }

  function typeWriterRemove() {
    document.getElementsByClassName('load')[0].innerHTML = document.getElementsByClassName('load')[0].innerHTML.slice(0, -1);
  }

  function typeWriterAdd(char){
    document.getElementsByClassName('load')[0].innerHTML += char;
  }