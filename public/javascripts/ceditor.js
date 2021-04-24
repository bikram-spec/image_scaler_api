console.log($("#user").val());
socket.emit("auth",$("#user").val());

// this event to send the request to the server to get the image data
socket.emit("getdetails",{type:"image classfication"});

$(document).on("click", ".chip.chip-checkbox", function(){
    let $this = $(this);
    let $option = $this.find("input");
    $option.prop("checked", !$this.hasClass("active"));
    $option.change();
  });
  
$(document).on("change", ".chip.chip-checkbox input", function(){
let $chip = $(this).parent(".chip");
$chip.toggleClass("active",this.checked);
$chip.attr("aria-checked", this.checked ? "true" : "false");
});

$(document).ready(function(){
    chips=[]
    image=""
    socket.on("details",function(data){
        if(!data.data)
        {
            console.log(data);
            this.chips=data.ObjectsToAnnotate;
            this.imageuri=`http://localhost:3000/api/getdata/${data.filename}`;
            image=document.querySelector("#image");
            image.src=this.imageuri;
            this.chips.forEach((val)=>{
                let parrent=$("#chip").clone();
                parrent.css({"display":"block"});
                input=parrent.children('input').val(val);
                span=parrent.children('span').text(val);
                // console.log(input.val());
                parrent.insertAfter("#chip")
            })
        
            $("#submit").on("click",function(){
                $('input[name="chip"]:checked').each(function() {
                    console.log(this.value);
                 });
            })
        }
        else 
        {
            console.log(data);
        }
    })
})