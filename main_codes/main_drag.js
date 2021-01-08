function sel_item(v){  
  curr_item=v;
  document.querySelectorAll('.cl_item').forEach(function(el) {
    el.style.border='0px dashed black';
    el.style.backgroundColor='gray';
    el.style.zIndex='1';    
  });

  dragItem = document.getElementById("item"+v);      
  dragItem.style.border='0px dashed red';
  dragItem.style.backgroundColor='coral';
  dragItem.style.zIndex='2';  
  disp_el_obj();
  
  document.querySelectorAll('.cl_ebtn').forEach(function(el) {
    el.disabled=false;
  });
  document.getElementById('div_main_layout').style.pointerEvents='auto';
  document.querySelectorAll('.cl_ibtn').forEach(function(el) {
    el.disabled=false;
    el.style.color='white';
    el.style.backgroundColor='red';
  });  
  
  f_edit_pvc=true;
}

function disp_el_obj(){
  var ele=dragItem.getAttribute('data-tag');
  
  document.getElementById('el_type').disabled=false;
  document.getElementById('el_fld').disabled=false;
  document.getElementById('el_tagname').disabled=false;

  //alert(dragItem.style.textAlign);
  document.getElementById('el_align').value=dragItem.style.textAlign;
  
  //alert(elefld);
  document.getElementById('el_type').value=ele;
  document.getElementById('el_fld').value=dragItem.getAttribute('data-fldname');
  document.getElementById('el_tagname').value=dragItem.getAttribute('data-tagname');
  document.getElementById('el_tagname').disabled=false;
  if(!dragItem.getAttribute('data-fldname')){ 
    document.getElementById('el_tagname').value='';
    document.getElementById('el_tagname').disabled=true;
  } 
  document.getElementById('el_top').innerHTML=parseInt(dragItem.getAttribute('data-top'));
  document.getElementById('el_left').innerHTML=parseInt(dragItem.getAttribute('data-left'));
  
  document.getElementById('el_width').innerHTML=parseInt(dragItem.style.width);
  document.getElementById('el_width').disabled=false;  
  document.getElementById('el_height').innerHTML=parseInt(dragItem.style.height);
  document.getElementById('el_height').disabled=false;  
  document.getElementById('el_obj').innerHTML=dragItem.id.toUpperCase();
  
  document.getElementById('el_value').value=dragItem.innerHTML;
  document.getElementById('div_txts').style.display='block';
  document.getElementById('div_imgs').style.display='none';
  document.getElementById('btn_editImg').disabled=true;
  document.getElementById('btn_editImg').style.backgroundColor='gray';
  if(ele=='img'){
    document.getElementById('div_txts').style.display='none';
    document.getElementById('div_imgs').style.display='block';
    document.getElementById('btn_editImg').disabled=false;
    document.getElementById('btn_editImg').style.backgroundColor='red';
  }else{    
    var ff=dragItem.style.fontFamily.replace(/["]+/g, '');
    document.getElementById('el_fontname').value=retFontNo(ff);  
    
    document.getElementById('el_fontsize').value=parseInt(dragItem.style.fontSize);  
    document.getElementById('el_fontbold').checked=false;
    if(dragItem.style.fontWeight=='bold'){ document.getElementById('el_fontbold').checked=true; }  
    document.getElementById('el_fontstyle').checked=false;
    if(dragItem.style.fontStyle=='italic'){ document.getElementById('el_fontstyle').checked=true; }  
    
    document.getElementById('el_fontcolor').value='#000000';
    if(dragItem.style.color){ document.getElementById('el_fontcolor').value=JBE_COLORHEX(dragItem.style.color); }  
  }

  pvc_slider.disabled=false;
  pvc_slider.value=parseInt(dragItem.style.width);
  document.getElementById('el_width').value=parseInt(dragItem.style.width);
  pvc_slider.oninput = function() {    
    dragItem.style.width = this.value+'px';
    document.getElementById('el_width').value=this.value;
  }
  document.getElementById('el_height').value=parseInt(dragItem.style.height);
}

function retFontNo(c){
  var rval=0;
  for(var i=0;i<aryFONTS.length;i++){
    if(c==aryFONTS[i]){
      //alert(c+' vs '+aryFONTS[i]);
      rval=i;
      break;
    }
  } 
  return rval;
}

function dragStart(e) {
  if (e.target === dragItem) {
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset[curr_item];
      initialY = e.touches[0].clientY - yOffset[curr_item];
    } else {
      initialX = e.clientX - xOffset[curr_item];
      initialY = e.clientY - yOffset[curr_item];
    }       
    active = true;
  }  
}

function dragEnd(e) {
  if(active){
    initialX = currentX;
    initialY = currentY;
    curr_X=parseInt(document.getElementById('el_left').innerHTML);
    curr_Y=parseInt(document.getElementById('el_top').innerHTML);

    initialX = curr_X;
    initialY = curr_Y;
    
    //if(initialX && initialY){
      dragItem.setAttribute('data-top',initialY);
      dragItem.setAttribute('data-left',initialX);
      document.getElementById('el_top').innerHTML=initialY;
      document.getElementById('el_left').innerHTML=initialX;
    //}
    
    active = false;
  }  
}

function drag(e) {
  if (active) {
  
    e.preventDefault();
  
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    xOffset[curr_item] = currentX;
    yOffset[curr_item] = currentY;

    curr_X=parseInt(dragItem.style.left)+parseInt(currentX)-margin_left;
    curr_Y=parseInt(dragItem.style.top)+parseInt(currentY)-margin_top;

    document.getElementById('el_top').innerHTML=curr_Y;
    document.getElementById('el_left').innerHTML=curr_X;  
    setTranslate(currentX, currentY, dragItem);     
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

// ===== JBE FUNC

function clear_sel_items(){
  document.querySelectorAll('.cl_item').forEach(function(el) {
    el.style.border='0px dashed black';
    el.style.backgroundColor='gray';
    el.style.zIndex='1';
  });
  active = false;
  dragItem = null;
  document.getElementById('el_obj').innerHTML='';
  document.getElementById('el_type').disabled=true;
  document.getElementById('btn_editImg').disabled=true;
  document.getElementById('btn_editImg').style.backgroundColor='gray';
  document.getElementById('el_fld').value='';
  document.getElementById('el_fld').disabled=true;
  document.getElementById('el_tagname').value='';
  document.getElementById('el_tagname').disabled=true;
  
  document.getElementById('el_top').innerHTML='';
  document.getElementById('el_left').innerHTML='';
  document.getElementById('el_align').value=0;

  //width
  document.getElementById('el_width').value='';
  document.getElementById('el_width').disabled=true;
  //height
  document.getElementById('el_height').value='';
  document.getElementById('el_height').disabled=true;

  document.querySelectorAll('.cl_ebtn').forEach(function(el) {
    el.disabled=true;
  });

  document.getElementById('div_txts').style.display='none';
  document.getElementById('div_imgs').style.display='none';
  if(pvc_slider){ 
    pvc_slider.value=100; 
    pvc_slider.disabled=true;
  }
  document.getElementById('div_main_layout').style.pointerEvents='auto';
  
  document.querySelectorAll('.cl_ibtn').forEach(function(el) {
    el.disabled=true;
    el.style.color='gray';
    el.style.backgroundColor='lightgray';
  });  

  f_edit_pvc=false;
}

function HL_Row(row,div){
  var obg=document.getElementById(div).style.backgroundColor;
  document.getElementById(div).style.backgroundColor='red'; 
}

function disp_dtl_rec(num){
  var n = new Date().toLocaleTimeString('it-IT');  
  var clientname=document.getElementById('div_main_view_pvc').getAttribute('data-clientname');
  
  document.getElementById('div_pvcclient').setAttribute('data-num',num);
  var el_ctr=document.querySelectorAll('.cl_viewItems').length;    
  //alert('disp_dtl_rec: '+el_ctr);
  var aryDB=JBE_GETARRY(DB_PVCCLIENT,'NUM',num);
  //var obj_ctr=Object.keys(aryDB).length;  
  for(var i=1;i <= el_ctr;i++){    
    var div=document.getElementById('vFLD'+i);
    //alert(div.id+' fld:'+div.getAttribute('data-fldname'));

    var fld=div.getAttribute('data-fldname');     
    if(!fld){ continue; }

    var v_unod=aryDB[fld];
    /*
    alert(
      'fld# '+fld+'\n'+
      'fld val '+v_unod
      );
    */
    
    var tag=document.getElementById('vFLD'+i).getAttribute('data-tag');

    if(tag=='img'){              
      div.style.backgroundImage='url('+JBE_API+'upload/layout/'+clientname+'/img/'+v_unod+'?'+n+')';
      div.style.backgroundRepeat='no-repeat'; 
      div.style.backgroundSize='auto 100%';
    }else{
      div.innerHTML=v_unod;
    }
  }

  document.querySelectorAll('.cl_ngalan').forEach(function(el) {
    el.style.color='black';
    el.style.border='1px solid gray';
  });
  document.getElementById('divdtl'+num).style.color='red';
  document.getElementById('divdtl'+num).style.border='1px solid red';
}


function get_len_fld(){
  var ctr=0;
  for(var i=1;i <= document.querySelectorAll('.cl_item').length;i++){
    if(document.getElementById('item'+i).style.display=='block'){ ctr++; }
  }  
  return ctr;
}

function make_fld(v){
  var f_found=false;
  document.querySelectorAll('.cl_item').forEach(function(el) {
    if(v && el.getAttribute('data-fldname')==v){  
      f_found =true;      
    }
  });
  if(f_found){
    snackBar('ERROR: Field already exist.');
    return;
  }
  dragItem.innerHTML=v;
  dragItem.setAttribute('data-fldname',v);
  
  document.getElementById('el_tagname').disabled=false;
  if(!v){
    document.getElementById('el_tagname').value='';
    document.getElementById('el_tagname').disabled=true;
  }
}
function add_el(m){  
  var idx=get_len_fld()+1;  
  var div=document.getElementById('item'+idx);
  div.style.top=(idx*10)+'px';
  div.style.left=(idx*10)+'px';
  div.style.display='block';
  
  var vtype='txt'; //label
  if(m==2){  //image
    vtype='img';
    div.style.backgroundImage='url('+JBE_EMPTY_IMG+')';
    div.style.height='100px';
  }
  div.setAttribute('data-tag',vtype);
  div.innerHTML=div.id.toUpperCase();   
  sel_item(idx);  
}
