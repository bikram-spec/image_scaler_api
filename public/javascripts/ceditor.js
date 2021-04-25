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
        /* this.chips=[];*/
        //()=>{
            console.log("the remover is executed...");
            $(".chip-div1").remove();
        //} 
        // image=""
        if(!data.data)
        {
            $instrcution=$("#instruction").html(data.Instruction);
            console.log(socket.id)
            $taskid=$("#taskid").html(socket.id);
            console.log(data);
            this.chips=data.ObjectsToAnnotate;
            this.imageuri=`http://localhost:3000/api/getdata/${data.filename}`;
            image=document.querySelector("#image");
            image.src=this.imageuri;
            this.chips.forEach((val)=>{
                let parrent=$("#chip").clone();
                parrent.attr("id","chip1")
                parrent.attr("class","chip-div1")
                let parrent1=parrent.children('div');
                parrent.css({"display":"block"});
                input=parrent1.children('input').val(val);
                span=parrent1.children('span').text(val);
                // console.log(input.val());
                parrent.insertAfter("#chip")
            })
        
        }
        else 
        {
            console.log(data);
        }
    })
})


// zoom manager
          // zoom in
          $("#zoom-in").click(function(e){
            console.log("click event executed...")
            $("#image").width($("#image").width()+10);
            $("#image").height($("#image").height()+10);
          })

        // zoom-out 
        $("#zoom-out").click(function(e){
          console.log("click event executed...")
          $("#image").width($("#image").width()-10);
          $("#image").height($("#image").height()-10);
        })

        // reset zoom 
        $("#reset-zoom").click(function(e){
          $("#image").width(860);
          $("#image").height(620);
        })


// reporting the broken images
 // broken image Handler 
 $("#broken_button").click(function(e){
    var message=$("#message").val().trim();
    if(!message||message==""){
      $("#err-msg").css({
        "visibility":"visible",
        "display":"block"
      })
    }
    else {
      if(!message||message==""){
        $("#err-msg").css({
          "visibility":"hidden",
          "display":"block"
        })
      }
      socket.emit("broken",message);
      socket.emit("getdetails",{type:"image classfication"});
      $("#message").val("")
    }
  })


//  submit the event 
$("#submit_button").click(function(e){
    // console.log($("#annotation_data").val())
    // var annotation= $("#annotation_data").val()
    // console.log(selected_chips);
    /* socket.emit("annotations",annotation)
    socket.emit("getdetails","");
    annotator.clear_all(); */
    selected_chips=[]
    $('input[name="chip"]:checked').each(function() {
        console.log(this.value);
        selected_chips.push(this.value);
     });
     console.log(selected_chips);
     socket.emit("classfication",{objects:selected_chips})
     socket.emit("getdetails",{type:"image classfication"});
  })

