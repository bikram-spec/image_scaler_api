$("#image").on("load",function(){
 var ctx=document.getElementById("canvas-img").getContext("2d");
 var img=document.getElementById("image");
 console.log(img.width)
 ctx.drawImage(img,0,0,img.width,img.height); 
})
$(document).ready(function() {
  // Initialize the bounding-box annotator.\
  // server msg checker 
  socket.on("msg",function(msg){
    console.log(msg);
  })


  // the editor javascirpt
  socket.on("details",function(data){
    if(!data.data)
    {
      // creting the text instruction data
        $instrcution=$("#instruction").html(data.Instruction);
        console.log(socket.id)
        $taskid=$("#taskid").html(socket.id);
        
        // creating the annotator fix
        var annotator = new BBoxAnnotator({
          url:`http://localhost:3000/api/getdata/${data.filename}`,
          input_method: 'select',    // Can be one of ['text', 'select', 'fixed']
          labels: data.ObjectsToAnnotate,
          guide: true,
          width:860,
          height:620,
          onchange: function(entries) {
            // Input the text area on change. Use "hidden" input tag unless debugging.
            // <input id="annotation_data" name="annotation_data" type="hidden" />
            // $("#annotation_data").val(JSON.stringify(entries))
            console.log(entries);
            let new_entries=[]
            // Adding the px at the end of the annotations 
            Object.values(entries).forEach(function(value){
              if(typeof(value.left)!="string"&&typeof(value.top)!="string"&&typeof(value.width)!="string"&&typeof(value.height)!="string")
              {
                value.left=value.left+"px";
                value.top=value.top+"px";
                value.width=value.width+"px";
                value.height=value.height+"px";
                new_entries.push(value);
              }
            })
            // console.log(new_entries);
            // new_entries.push(val)
            
            $("#annotation_data").text(JSON.stringify(entries, null, "  "));
          }
        });
          // Initialize the reset button.
          $("#reset_button").click(function(e) {
            annotator.clear_all();
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

      // handeling  the form submission and the broken image submission 
        $("#submit_button").click(function(e){
          // console.log($("#annotation_data").val())
          var annotation= $("#annotation_data").val()
          socket.emit("annotations",annotation)
          socket.emit("getdetails","");
          annotator.clear_all();

        })

        // broken image Handler 
        $("#broken_button").click(function(e){
          var message=$("#message").val().trim();
          if(!message||message==""){
            $("#err-msg").css({
              "visibility":"visible"
            })
          }
          else {
            if(!message||message==""){
              $("#err-msg").css({
                "visibility":"hidden"
              })
            }
            socket.emit("broken",message);
            socket.emit("getdetails","")
            $("#message").val("")
            annotator.clear_all();
          }
        })

        // handeling broken images ends here 
        
        

        // captureing canvas ends here 
    
    }
    else 
    {
      console.log(data.data)
    }

  });

});
