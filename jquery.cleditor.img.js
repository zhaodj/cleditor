(function($) {
 
  // Define the image button
  $.cleditor.buttons.image = {
    name: "image",
	stripIndex:23,
    title: "添加图片",
    command: "insertimage",
    popupName: "image",
    popupClass: "cleditorPrompt",
    popupContent: "输入图片链接:<br><input type='text' value='http://' size='10'><input type='button' value='提交'><br><iframe id='imageUploadFrame' name='imageUploadFrame' style='display:none'></iframe><form method='post' target='imageUploadFrame' enctype='multipart/form-data'>上传图片:<br><input type='file' name='image' accept='image/*'><input type='submit' value='上传'></form>",
    buttonClick: imageClick
  };
 
  // Handle the hello button click event
  function imageClick(e, data) {
      
	var uploadUrl=data.editor.options.uploadUrl;
	$(data.popup).find("form").attr("action",uploadUrl);
    // Wire up the submit button click event
    $(data.popup).children(":button")
      .unbind("click")
      .bind("click", function(e) {
 
	      // Insert the image or link if a url was entered
              var editor=data.editor,$text = $(data.popup).find(":text"),
                url = $.trim($text.val());
              if (url !== ""){
		      editor.execCommand(data.command,url,null,data.button);
	      }

              // Reset the text, hide the popup and set focus
              $text.val("http://");
              editor.hidePopups();
              editor.focus(editor);
 
      });
 
  }
    
	$.cleditor.buttons.face={
		name:"face",
		stripIndex:32,
		title:"添加表情",
		command:"insertimage",
		popupName:"face",
		popupClass:"cleditorPrompt",
		poputContent:"",
		buttonClick:faceClick
	};

	function getFaceContent(url){
		var faceData=$.data("body","faceData");
		if(!faceData){
			$.ajax({url:url,async:false,dataType:"json",success:function(data){
				faceData=data;
				$.data("body","faceData",faceData);
			}});
		}
		var arr=["<div style='max-width:220px'>"];
		for(var p in faceData){
			arr.push("<img src='"+faceData[p]+"' title='"+p+"' data-val='"+p+"'>");
		}
		arr.push("</div>");
		return arr.join("");
	}

	function faceClick(e,data){
		var faceUrl=data.editor.options.faceUrl;
		if($(data.popup).find("img").length==0){
			$(data.popup).append(getFaceContent(faceUrl));
			$(data.popup).find("img").bind("click",function(e){
				var editor=data.editor,url=$(e.target).attr("src");
				editor.execCommand(data.command,url,null,data.button);
				editor.hidePopups();
				editor.focus(editor);
			});
		}
	}

 
})(jQuery);
