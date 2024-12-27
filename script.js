window.onload = function () {
    const parts = []
    let mediaRecorder
    let record = false
    navigator.mediaDevices.getUserMedia({audio: true, video: true}).then(stream =>{
        document.getElementById('video').srcObject = stream

            document.getElementById('btn').onclick = function(){

                if(record){
                    mediaRecorder.stop()
                    const blob = new Blob(parts, {
                        type: "video/webm"
                    })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement("a")
                    document.body.appendChild(a)
                    a.style = "display: none";
                    a.href = url
                    a.download = "session.webm"
                    a.click()
                    document.getElementById('rec').src = 'record.svg'        
                    record = !record                    
                }else{
                    document.getElementById('rec').src = 'stoprecord.svg'
                    mediaRecorder = new MediaRecorder(stream)
                    mediaRecorder.start(1000)
        
                    mediaRecorder.ondataavailable = function(e){
                        parts.push(e.data)
                    }
                    record = !record                            
                }

        }

    })


}