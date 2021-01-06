var aryFONTS=[];
aryFONTS[0]='Arial, sans-serif';
aryFONTS[1]='Arial Black, sans-serif';
aryFONTS[2]='Verdana, sans-serif';
aryFONTS[3]='Tahoma, sans-serif';
aryFONTS[4]='Trebuchet MS, sans-serif';
aryFONTS[5]='Impact, sans-serif';
aryFONTS[6]='Times New Roman, serif';
aryFONTS[7]='Didot, serif';
aryFONTS[8]='Georgia, serif';
aryFONTS[9]='American Typewriter, serif';
aryFONTS[10]='Andalé Mono, monospace';
aryFONTS[11]='Courier, monospace';
aryFONTS[12]='Lucida Console, monospace';
aryFONTS[13]='Monaco, monospace';
aryFONTS[14]='Bradley Hand, cursive';
aryFONTS[15]='Brush Script MT, cursive';
aryFONTS[16]='Luminari, fantasy';
aryFONTS[17]='Comic Sans MS, cursive';

function fm_layout(m){ // =========== EDIT PVC LAYOUT =======  
  //alert('fm_layout: '+m);
  clear_THISFILE();
  var vDate=new Date();  
  var vTime = vDate.toLocaleTimeString('it-IT'); 
  var vDate = new Date(vDate.getTime() - (vDate.getTimezoneOffset() * 60000 )).toISOString().split("T")[0];  
  var clientcode='JBE_'+vDate+'_'+vTime;  
  clientcode = clientcode.replace(/-/g, "").replace(/:/g, "").replace("T", "-");
  var clientname='';  
  var rkey='FLD1';
  var frontImg='main_gfx/blank1.jpg';
  var backImg='main_gfx/blank2.jpg';
  var n = new Date().toLocaleTimeString('it-IT');
  var v_idwidth=glob_idwidth;
  var v_idheight=glob_idheight;
  var v_idtype=1;
  if(m==2){ //edit
    clientcode=document.getElementById('div_main_view_pvc').getAttribute('data-clientcode');
    clientname=document.getElementById('div_main_view_pvc').getAttribute('data-clientname');
    rkey=document.getElementById('div_main_view_pvc').getAttribute('data-rkey');
    //clientname=JBE_GETFLD('clientname',DB_PVC1,'clientcode',clientcode);   
    //rkey=JBE_GETFLD('rkey',DB_PVC1,'clientcode',clientcode);   
    frontImg=JBE_API+'upload/layout/'+clientname+'/'+JBE_GETFLD('IMGFRONT',DB_PVC1,'clientcode',clientcode);
    backImg= JBE_API+'upload/layout/'+clientname+'/'+JBE_GETFLD('IMGBACK',DB_PVC1,'clientcode',clientcode);
    v_idwidth=parseInt(JBE_GETFLD('WIDTH',DB_PVC1,'clientcode',clientcode));
    v_idheight=parseInt(JBE_GETFLD('HEIGHT',DB_PVC1,'clientcode',clientcode));
    v_idtype=parseInt(JBE_GETFLD('TYPE',DB_PVC1,'clientcode',clientcode));
  }

  var div_left_edit=225;
  var div_right_edit=window.innerWidth-div_left_edit;
  var n = new Date().toLocaleTimeString('it-IT');

  if(!JBE_MOBILE){ 
    div_left_edit=240;
    if(v_idtype==2){ div_left_edit=350; }
    div_right_edit=800-div_left_edit; 
  }

  var dtl=
  '<div id="div_main_layout" data-mode='+m+' data-clientcode="'+clientcode+'" data-clientname="'+clientname+'" data-rkey="'+rkey+'" data-idtype='+v_idtype+
        ' data-idheight='+v_idheight+' data-idwidth='+v_idwidth+
        ' style="width:100%;height:100%;background:lightgray;">'+
    '<div id="div_left_edit_pvc" style="float:left;position:relative;width:'+div_left_edit+'px;height:100%;text-align:left;overflow:auto;background:white;">'+
      '<div style="width:100%;height:10px;background:none;"></div>'+
      '<div id="lay_front" style="margin-left:10px;width:'+v_idwidth+'px;height:'+v_idheight+'px;border:1px solid red;background:none;">'+
        '<div id="div_layout_frontImg" onclick="clear_sel_items()" data-img="'+nopath(frontImg)+'" style="width:100%;height:100%;background:url('+frontImg+') no-repeat;background-size: 100% 100%;"></div>'+        
      '</div>'+
      '<div id="lay_back" style="margin-left:10px;width:'+v_idwidth+'px;height:'+v_idheight+'px;border:1px solid red;background:none;">'+
        '<div id="div_layout_backImg"  onclick="clear_sel_items()" data-img="'+nopath(backImg)+'"  style="width:100%;height:100%;background:url('+backImg+') no-repeat;background-size: 100% 100%;"></div>'+        
      '</div>'+
      '<div style="height:10px;background:none;"></div>';
  
  var aryPVC2=DB_PVC2;
  aryPVC2.sort(sortByMultipleKey(['clientcode','ndx']));  

  var dtl2='';
  var dtl3='';  
  var dtl_gfx='';
  var ctr_item=0;
  var f_included=true;

  var vTop=10;
  var vLeft=10;
  var vWidth=100;
  var vHeight=20;

  var vValue='';
  var vTag='txt';
  var vTagname='';
  var vTitle='';
  var vFontname=aryFONTS[0];  
  var vFontsize=12;    
  var vFontcolor='black';    
  var vFontbold='normal';
  var vFontitalic='normal';
  var vFontalign='left';
  var vFLDNAME='FLD1';

  var aryFLD=[];
  for(var i=0;i<aryPVC2.length;i++){      
    if(aryPVC2[i]['clientcode'] != clientcode){ continue; }
    
    ctr_item++;    
    xOffset[ctr_item]=0;
    yOffset[ctr_item]=0;

    aryFLD[ctr_item]=aryPVC2[i]['tagname']; 
        
    vTop=parseInt(aryPVC2[i]['vtop']);
    vLeft=parseInt(aryPVC2[i]['vleft']);
    vWidth=parseInt(aryPVC2[i]['vwidth']);    if(vWidth==0){ vWidth=100; }
    vHeight=parseInt(aryPVC2[i]['vheight']);  if(vHeight==0){ vHeight=30; }
    
    vValue=aryPVC2[i]['vvalue'];
    vTag=aryPVC2[i]['tag'];
    vTagname=aryPVC2[i]['tagname'];
    vTitle=aryPVC2[i]['vvalue'];
    vTitle=aryPVC2[i]['fontname'];
    
    vFontname=aryPVC2[i]['fontname'];             if(!vFontname){ vFontname=aryFONTS[0]; }
    //alert(vFontname);
    vFontsize=parseInt(aryPVC2[i]['fontsize']);   if(vFontsize==0){ vFontsize=12; }
    vFontcolor=aryPVC2[i]['fontcolor'];           if(!vFontcolor){ vFontcolor='#000000'; }
      
    vFontbold=aryPVC2[i]['fontbold'];
    vFontitalic=aryPVC2[i]['fontitalic'];
    vFontalign=aryPVC2[i]['fontalign'];
    vFLDNAME=aryPVC2[i]['FLDNAME'];
      
    if(vTag == 'txt'){ 
      if(aryPVC2[i]['FLDNAME']){ 
        dtl3=vTagname;        
      }else{
        dtl3=vValue;        
      } 
      dtl_gfx='';     
      //dtl_gfx='font-family:'+vFontname+';font-size:'+vFontsize+'px;color:'+vFontcolor+';text-align:'+vFontalign+';font-weight:'+vFontbold+';font-style:'+vFontitalic+';';
    }else if(vTag == 'img'){     
      if(aryPVC2[i]['FLDNAME']){   
        dtl3=vTagname;
        vValue=JBE_EMPTY_IMG;
        dtl_gfx='background:url('+vValue+');background-repeat:no-repeat;background-size:auto 100%;';          
      }else{
        dtl3='';        
        dtl_gfx='background:url('+JBE_API+'upload/layout/'+clientname+'/'+vValue+'?'+n+');background-repeat:no-repeat;background-size:100% 100%;';      
      }
      //dtl_gfx='background:url('+JBE_API+'upload/layout/'+clientname+'/img/'+vValue+');background-repeat:no-repeat;background-size:auto 100%;';      
    }  
    
    dtl2+=
      '<div id="item'+ctr_item+'" data-fldname="'+vFLDNAME+'" data-img="'+vValue+'" data-tagname="'+vTagname+'" data-top='+vTop+' data-left='+vLeft+' class="cl_item" onclick="sel_item('+ctr_item+')" data-tag="'+vTag+'" title="item:'+ctr_item+'"'+      
          ' style="display:block;top:'+(margin_top+vTop)+'px;left:'+(margin_left+vLeft)+'px;width:'+vWidth+'px;height:'+vHeight+'px;'+
          'font-family:'+vFontname+';font-size:'+vFontsize+'px;color:'+vFontcolor+';font-weight:'+vFontbold+';font-style:'+vFontitalic+';text-align:'+vFontalign+';'+
        dtl_gfx+'">'+
        dtl3+
      '</div>';    
    
  }  

  // =================================== add additional text/fields =============================================================================

  var maxItem=40-ctr_item;  
  ctr_item++;
  
  for(var i=ctr_item;i<=maxItem;i++){     
    xOffset[i]=0;
    yOffset[i]=0;
    
    vTop=10;vLeft=10;vHeight=30;vWidth=100;
        
    dtl2+=
      '<div id="item'+i+'" data-fldname="" data-img="" data-top='+vTop+' data-left='+vLeft+' class="cl_item" onclick="sel_item('+i+')" data-tag="" data-obj="" title="add'+ctr_item+'"'+
          ' style="display:none;top:'+(margin_top+vTop)+'px;left:'+(margin_left+vLeft)+'px;width:'+vWidth+'px;height:'+vHeight+'px;border:1px solid gold;">'+
      '</div>';    
  }
  
  var btn_arrow_size=30;
  var h_head=120;  
  var h_foot=145;
  var h_mid=H_VIEW-(h_head+h_foot+55);
  var w_inp=div_right_edit-58;
  
  dtl+=dtl2+'</div>'+
    '<div class="cl_jbe" style="float:left;width:'+div_right_edit+'px;height:100%;font-size:12px;padding:5px;background:none;">'+
      '<div style="width:100%;height:'+h_head+'px;padding:0px;background:none;">'+

        '<div style="width:100%;height:20px;padding:2px;background:none;">'+
          '<div style="float:left;height:100%;width:40px;padding:0px;">Object:</div>'+
          '<div id="el_obj" style="float:left;width:'+w_inp+'px;height:100%;"></div>'+
        '</div>'+

        '<div style="width:100%;height:20px;padding:2px;font-size:12px;background:none;">'+
          '<div style="float:left;height:100%;width:40px;padding:0px;">Type:</div>'+
          '<select id="el_type" name="el_type" value="" onchange="chg_el_type(this.value)" style="float:left;width:'+(w_inp-20)+'px;height:100%;font-size:11px;padding:0px;">'+
            '<option value="txt"> Text </option>'+
            '<option value="img"> Image </option>'+ 
          '</select>'+
          
          '<input type="file" id="id_file_editImg" data-orig="" data-sel=0 name="id_file_editImg" hidden="hidden" />'+
          '<input type="image" src="main_gfx/jcam.png" id="btn_editImg" onclick="JBE_GET_IMAGE(parseInt(el_obj.innerHTML.substr(4)), id_file_editImg.id, el_obj.innerHTML.toLowerCase(), &quot;&quot;, true)" style="float:left;margin-left:2px;width:15px;height:100%;padding:1px;background:black;" />'+
        '</div>'+
        
        '<div style="width:100%;height:20px;padding:2px;background:none;">'+
          '<div style="float:left;height:100%;width:40px;padding:0px;">FLD:</div>'+
          '<select id="el_fld" name="el_fld" value="" onchange="make_fld(this.value)" style="float:left;width:'+w_inp+'px;height:100%;font-size:11px;padding:0px;">';
            var dtlfld='<option value=""> NONE </option>';            
            for(var i=1;i <= 15;i++){
              //if(aryPVC2[i]['clientcode'] != clientcode){ continue; }
              dtlfld+='<option value="FLD'+i+'">FLD'+i+' : '+retFLDNAME(clientcode,'FLD'+i)+'</option>';
            }
            dtl+=dtlfld+
          '</select>'+
        '</div>'+    
        
        '<div style="width:100%;height:20px;padding:2px;font-size:12px;background:none;">'+
          '<div style="float:left;height:100%;width:40px;padding:0px;">TAG:</div>'+
          '<input type="text" id="el_tagname" name="el_tagname" value="" onchange="chg_el_tagname(this.value)" style="float:left;width:'+w_inp+'px;height:100%;font-size:11px;padding:0px;" />'+
        '</div>'+
      
        '<div style="margin-top:5px;width:100%;height:35px;padding:2px;font-size:12px;border:1px solid black;background:white;">'+
          '<div style="float:left;width:50%;height:50%;background:none;">Top: <span id="el_top"></span></div><div style="float:left;width:50%;height:50%;">Left: <span id="el_left"></span></div>'+        
          '<div style="width:100%;height:50%;padding:0px;background:coral:">'+
            '<div style="float:left;height:100%;width:40px;padding:0px;">Align:</div>'+
            '<select id="el_align" name="el_align" value="left" onchange="chg_el_align(this.value)" style="float:left;width:'+(w_inp)+'px;height:100%;font-size:11px;padding:0px;">'+
              '<option value="left"> Left </option>'+
              '<option value="center"> Center </option>'+ 
              '<option value="right"> Right </option>'+ 
            '</select>'+
          '</div>'+
        '</div>'+
                
      '</div>'+
         
      '<div style="width:100%;height:'+h_mid+'px;margin-top:0px;padding:2px;border:1px solid black;background:white;">'+        
        '<div id="div_txts" style="display:block;width:100%;height:100%;padding:0px;overflow:auto;">'+          
          '<div class="cl_sel_el">'+
            '<div>Font:</div>'+
            '<select id="el_fontname" name="el_fontname" onchange="chg_fontname(this.value)">';
              var ddtl='<option selected value=0>'+aryFONTS[0]+'</option>';
              for(var i=1;i<aryFONTS.length;i++){  
                ddtl+='<option value='+i+'>'+aryFONTS[i]+'</option>';
              }
              dtl+=ddtl+
            '</select>'+
          '</div>'+
          '<div class="cl_sel_el"><div>Size:</div><input id="el_fontsize" type="number" onchange="chg_fontsize(this.value)"/></div>'+
          '<div class="cl_sel_el"><div>Bold:</div><input id="el_fontbold" type="checkbox" onchange="chg_bold(this.checked)" style="width:auto;"/></div>'+
          '<div class="cl_sel_el"><div>Italic:</div><input id="el_fontstyle" type="checkbox" onchange="chg_italic(this.checked)" style="width:auto;"/></div>'+
          '<div class="cl_sel_el"><div>Color:</div><input id="el_fontcolor" type="color" onchange="dragItem.style.color=this.value;" style="width:13px;height:100%;padding:0px;margin:0px;"/></div>'+
          '<div class="cl_sel_el"><div>VAL:</div><input id="el_value" type="text" onchange="chg_value(this.value)" /></div>'+
        '</div>'+
        '<div id="div_imgs" style="display:none;width:100%;height:100%;margin-top:0px;padding:0px;background:none;">'+        
          '<div style="width:100%;height:20px;padding:0px;background:none;">Path: <span id="el_path"></span></div>'+        
        '</div>'+
      '</div>'+
      
      '<div style="width:100%;height:'+h_foot+'px;padding:0px;margin-top:5px;">'+        

        '<div style="width:100%;height:45px;padding:2px;margin-top:0px;border:1px solid black;background:gray;">'+
          '<span style="float:left;width:50%;height:50%;">Width:</span><input type="number" onchange="upd_range(this.value)" id="el_width" style="float:left;width:50%;text-align:center;" />'+
          '<input type="range" min="20" max="300" value="50" id="myRange" style="width:100%;height:50%;margin:0;" />'+
        '</div>'+        
        

        '<div style="width:100%;height:45px;padding:2px;margin-top:5px;border:1px solid black;background:gray;">'+
          '<span style="float:left;width:50%;height:50%;">Height:</span>'+
          '<button class="cl_ebtn" onclick="upd_rangeH(-1)" style="float:right;width:30px;height:50%;font-size:14px;font-weight:bold;">-</button>'+
          '<input type="number" id="el_height" onchange="upd_rangeH(0)" style="float:left;width:50%;text-align:center;color:red;" value=0/>'+
          '<button class="cl_ebtn" onclick="upd_rangeH(1)" style="float:right;width:30px;height:50%;font-size:14px;font-weight:bold;">+</button>'+          
        '</div>'+        
        
        '<div style="width:100%;height:'+(btn_arrow_size+4)+'px;margin-top:5px;padding:0px;text-align:center;border:1px solid black;padding:1px;color:white;background:black;">'+       
          '<div style="margin:0 auto;width:120px;height:100%;font-weight:bold;color:black;background:yellow;">'+       
      
            '<div style="float:left;width:25%;height:'+btn_arrow_size+'px;padding:0px;margin-top:0px;">'+       
              '<button class="cl_ebtn" onclick="upd_ARROWS(1)" style="width:'+btn_arrow_size+'px;height:100%;text-align:center;">&#x25B2;</button>'+
            '</div>'+            
            '<div style="float:left;width:25%;height:'+btn_arrow_size+'px;padding:0px;margin-top:0px;text-align:center;">'+       
              '<button class="cl_ebtn" onclick="upd_ARROWS(4)" style="width:'+btn_arrow_size+'px;height:100%;">&#x25BC;</button>'+
            '</div>'+
            
            '<div style="float:left;width:25%;height:'+btn_arrow_size+'px;padding:0px;margin-top:0px;">'+       
              '<button class="cl_ebtn" onclick="upd_ARROWS(2)" style="float:left;width:'+btn_arrow_size+   'px;height:100%;text-align:center;">&#x25C0;</button>'+
            '</div>'+        
            '<div style="float:left;width:25%;height:'+btn_arrow_size+'px;padding:0px;margin-top:0px;text-align:center;">'+       
              '<button class="cl_ebtn" onclick="upd_ARROWS(3)" style="width:'+btn_arrow_size+'px;height:100%;">&#x25B6;</button>'+
            '</div>'+
          
          '</div>'+
        '</div>'+        
        
      '</div>'+

      '<div style="width:100%;height:30px;text-align:center;padding:0px;margin-top:7px;background:none;">'+
        '<button id="btn_icancel" onclick="clear_sel_items()" class="cl_ibtn" disabled style="width:auto;">C L E A R</button>'+
      '</div>'+
    
    '</div></div>';

  openView(dtl,'Edit PVC','close_fm_layout');
  mnu_layout_pvc();
  pvc_slider = document.getElementById("myRange");
  clear_sel_items();
  
  //dragItem = document.querySelector("#item1");
  container = document.querySelector("#div_main_layout");
  container.addEventListener("touchstart", dragStart, false);
  container.addEventListener("touchend", dragEnd, false);
  container.addEventListener("touchmove", drag, false);

  container.addEventListener("mousedown", dragStart, false);
  container.addEventListener("mouseup", dragEnd, false);
  container.addEventListener("mousemove", drag, false);  
}

function chg_fontname(v){
  dragItem.style.fontFamily=aryFONTS[v];  
}
function chg_fontsize(v){
  dragItem.style.fontSize=v+'px';    
}
function chg_value(v){  
  dragItem.innerHTML=v;  
}
function chg_bold(v){  
  var vv='normal';
  if(v){ vv="bold"; }  
  dragItem.style.fontWeight=vv;
}
function chg_italic(v){  
  var vv='normal';
  if(v){ vv="italic"; } 
  dragItem.style.fontStyle=vv;
}

function del_layout(){ 
  MSG_SHOW(vbYesNo,"CONFIRM: ","Are you sure to Delete this Layout?",function(){  
    var clientcode=document.getElementById('div_main_layout').getAttribute('data-clientcode');
    var clientname=document.getElementById('div_main_layout').getAttribute('data-clientname');
  
    showProgress(true);    
    axios.post(JBE_API+'z_layout.php', { request: 4,        
      clientcode,
      clientname
    },JBE_HEADER)
    .then(function (response) { 
      showProgress(false);
      console.log(response.data);
      //alert(response.data);
      
      DB_PVC1=response.data[0];
      DB_PVC2=response.data[1];
      DB_PVCCLIENT=response.data[2];
      
      document.getElementById('div_main_layout').setAttribute('data-mode',1);
      closeView();
      close_fm_layout();
      //fm_pvc();
    },JBE_HEADER)    
    .catch(function (error) { console.log(error); showProgress(false); }); 
  },function(){return;});  
}

function save_layout(){  
  var clientcode=document.getElementById('div_main_layout').getAttribute('data-clientcode');
  //var clientname=JBE_GETFLD('clientname',DB_PVC1,'clientcode',clientcode);   
  var clientname=document.getElementById('div_main_layout').getAttribute('data-clientname');
  var vmode=document.getElementById('div_main_layout').getAttribute('data-mode');

  

  if(clientname.trim().length==0){ 
    MSG_SHOW(vbOk,"ERROR: ","Client Name is Empty",function(){},function(){});  
    return; 
  }
  var frontImg=document.getElementById('div_layout_frontImg').getAttribute('data-img');
  var backImg=document.getElementById('div_layout_backImg').getAttribute('data-img');
  
  if(frontImg=='blank1.jpg' || backImg=='blank2.jpg'){
    MSG_SHOW(vbOk,"ERROR: ","No Front/Back Design",function(){},function(){});  
    return;
  }
  MSG_SHOW(vbYesNo,"CONFIRM: ","Save now?",function(){ do_save_layout(clientcode,clientname,vmode,frontImg,backImg); },function(){ return; });  
}

function do_save_layout(clientcode,clientname,vmode,frontImg,backImg){  
  var rkey=document.getElementById('div_main_layout').getAttribute('data-rkey');
  var targetDIR=JBE_API+'upload/layout/'+clientname+'/';     
  var aryItems=[];  
  var len_items=get_len_fld(); 
  var idheight=document.getElementById('div_main_layout').getAttribute('data-idheight');
  var idwidth=document.getElementById('div_main_layout').getAttribute('data-idwidth');
  var idtype=document.getElementById('div_main_layout').getAttribute('data-idtype');

  if(THISFILE[20]){
    frontImg='F_'+clientcode+'.jpg';
  }
  if(THISFILE[21]){
    backImg='B_'+clientcode+'.jpg';
  }
  
  for(var i=0;i<len_items;i++){    
    var div_item=document.getElementById('item'+(i+1));         
    var v_value=div_item.innerHTML;
    var v_color='#000000';
    if(div_item.getAttribute('data-tag')=='txt'){ 
      if(div_item.style.color){ v_color=JBE_COLORHEX(div_item.style.color); }
    }else if(div_item.getAttribute('data-tag')=='img'){ 
      v_value=div_item.getAttribute('data-img');
      if(THISFILE[(i+1)]){
        //alert(v_value);
        var ext= v_value.slice((v_value.lastIndexOf(".") - 1 >>> 0) + 1);
        //alert(ext);
        v_value='gfx_'+(i+1)+ext;
        uploadNOW(THISFILE[(i+1)],v_value,targetDIR,'',true,false);
      }
    }
        
    let ob = {
      obj:div_item.getAttribute('data-obj'),
      vtop:div_item.getAttribute('data-top'),
      vleft:div_item.getAttribute('data-left'),
      vwidth:div_item.style.width,
      vheight:div_item.style.height,      

      vvalue:v_value,

      fontname:div_item.style.fontFamily.replace(/["]+/g, ''),
      fontcolor:v_color,
      fontsize:div_item.style.fontSize,
      fontlen:div_item.style.width,
      fontalign:div_item.style.textAlign,
      fontbold:div_item.style.fontWeight,
      fontitalic:div_item.style.fontStyle,      
      OT:'',
      tagged:0,
      tagname:div_item.getAttribute('data-tagname'),
      locked:0,
      FLDNAME:div_item.getAttribute('data-fldname'),
      UNIQ:0,
      HIDEFLD:0,
      idcode:'jbe',
      tag:div_item.getAttribute('data-tag')
    };
    aryItems[i]=ob;       
  }
  
  var req=2;
  if(vmode==2){      
    req=3; 
  }

  showProgress(true);   
  
  axios.post(JBE_API+'z_layout.php', { request: req,    
    clientcode:clientcode,
    clientname:clientname,
    frontImg:frontImg,
    backImg:backImg,
    idheight:idheight,
    idwidth:idwidth,
    idtype:idtype,
    rkey:rkey,
    aryItems:JSON.stringify(aryItems)
  },JBE_HEADER)
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);    
    //alert('response.data: '+response.data);
    DB_PVC1=response.data[0];
    DB_PVC2=response.data[1];
    
    var ob;
    if(THISFILE[20]){  
      ob = [
        { "div":"div_layout_frontImg" }
      ];    
      //alert('going to save front img');
      uploadNOW(THISFILE[20],frontImg,targetDIR,'',true,true);
    }
    if(THISFILE[21]){   
      ob = [        
        { "div":"div_layout_backImg" }
      ];   
      //alert('going to save back img');
      uploadNOW(THISFILE[21],backImg,targetDIR,'',true,true);
    }
    clear_sel_items();
    snackBar('Layout Saved');
    req=3;
  },JBE_HEADER)    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function close_fm_layout(){         
  var clientcode=document.getElementById('div_main_layout').getAttribute('data-clientcode');
  var m=document.getElementById('div_main_layout').getAttribute('data-mode');
  //alert('close_fm_layout '+m);
  //alert(num);
  if(m==1){         
    get_db_pvc();    
    mnu_pvc();
  }else if(m==2){
    var num=document.getElementById('div_pvcclient').getAttribute ('data-num');
    disp_view_ele(clientcode);
    if(num!=0){ disp_dtl_rec(num); }
  }
}

function main_info(){  
  var clientcode=document.getElementById('div_main_layout').getAttribute('data-clientcode');  
  var clientname=document.getElementById('div_main_layout').getAttribute('data-clientname');
  var vmode=document.getElementById('div_main_layout').getAttribute('data-mode');
  var idtype=parseInt(JBE_GETFLD('TYPE',DB_PVC1,'clientcode',clientcode));
  var v_idwidth=parseInt(JBE_GETFLD('WIDTH',DB_PVC1,'clientcode',clientcode));
  var v_idheight=parseInt(JBE_GETFLD('HEIGHT',DB_PVC1,'clientcode',clientcode));  
  //alert('vmode: '+vmode);
  var vdisabled='disabled';
  if(vmode==1){ 
    vdisabled=''; 
    v_idwidth=glob_idwidth;
    v_idheight=glob_idheight;
    idtype=1;
  }
  var rkey=document.getElementById('div_main_layout').getAttribute('data-rkey');
  var tilt='MAIN INFO';
  var dtl=      
    '<div id="div_main_info" data-zoom=0 style="width:100%;height:'+260+'px;overflow:auto;font-size:12px;text-align:center;padding:0px;background-color:white;">'+
     
      '<div style="height:40px;width:100%;margin-top:0px;padding:2px;background:lightgray;">'+ 
        '<div style="width:100%;height:40%;">Client Code: </div>'+
        '<div style="width:100%;height:60%;font-weight:bold;">'+clientcode+'</div>'+
      '</div>'+

      '<div style="height:40px;width:100%;margin-top:5px;padding:2px;background:lightgray;">'+
        '<div style="width:100%;height:40%;">Client Name </div>'+
        '<input id="main_inp_clientname" '+vdisabled+' type="text" onchange="chk_clientname(this.value)" style="width:100%;height:60%;text-align:center;font-weight:bold;" value="'+clientname+'" />'+
      '</div>'+
      
      '<div style="height:25px;width:100%;margin-top:5px;padding:2px;background:lightgray;">'+        
        '<div style="float:left;width:25%;height:100%;padding:3px 0 0 0;">PVC Type:</div>'+
        '<select id="id_type" name="id_type" value='+idtype+' onchange="chg_idtype(this.value)" style="float:left;width:25%;height:100%;font-size:11px;padding:0px;">'+
          '<option value=1>Portrait</option>'+
          '<option value=2>Landscape</option>'+
          '<option value=3>Other</option>'+
        '</select>'+
        '<div style="float:left;width:5%;height:100%;text-align:right;padding:3px 0 0 0;">H:</div><input id="inp_h" type="number" disabled value="'+v_idheight+'" style="float:left;width:20%;height:100%;" />'+
        '<div style="float:left;width:5%;height:100%;text-align:right;padding:3px 0 0 0;">W:</div><input id="inp_w" type="number" disabled value="'+v_idwidth+'" style="float:left;width:20%;height:100%;" />'+
      '</div>'+

      '<div style="height:40px;width:100%;margin-top:5px;padding:2px;background:lightgray;">'+        
        '<div style="width:100%;height:40%;">Record Key (Name) </div>'+
        '<select id="id_rkey" name="id_rkey" value="" onchange="document.getElementById(&quot;div_main_layout&quot;).setAttribute(&quot;data-rkey&quot;,this.value);" style="width:100%;height:60%;font-size:11px;padding:0px;">';
          var dtlfld='';
          for(var i=1;i <= 15;i++){              
            dtlfld+='<option value="FLD'+i+'">FLD'+i+'</option>';
          }
          dtl+=dtlfld+
        '</select>'+
      '</div>'+
      
      '<div style="height:40px;width:100%;margin-top:5px;padding:2px;background:lightgray;">'+          
        '<div style="float:left;height:100%;width:50%;">'+
            '<input type="file" id="id_file_front" data-orig="" name="id_file_front" hidden="hidden" />'+            
            '<button onclick="JBE_GET_IMAGE(20,id_file_front.id,div_layout_frontImg.id,&quot;&quot;,true)" style="width:150px;height:100%;">Front Image</button>'+
        '</div>'+
        '<div style="float:left;height:100%;width:50%;">'+
            '<input type="file" id="id_file_back" data-orig="" name="id_file_back" hidden="hidden" />'+                                
            '<button onclick="JBE_GET_IMAGE(21,id_file_back.id,div_layout_backImg.id,&quot;&quot;,true)" style="width:150px;height:100%;">Back Image</button>'+
        '</div>'+
      '</div>'+

    '</div>';
  
  var dtl2=      
    '<div style="width:100%;height:100%;padding:11px 0 0 0;text-align:center;color:'+JBE_TXCLOR1+';background:none;">'+
      tilt+      
    '</div>';   

  JBE_OPENBOX('div_main_info',tilt,dtl,dtl2); 
  document.getElementById('id_rkey').value=rkey; 
}

function chg_idtype(v){  
  var vdisabled=true;
  var h=glob_idheight;
  var w=glob_idwidth;
  var t=v;
  if(v==1){
  }else if(v==2){
    h=glob_idwidth;
    w=glob_idheight;
  }else{
    h=document.getElementById('inp_h').value;
    w=document.getElementById('inp_w').value;
    vdisabled=false;    
    document.getElementById('inp_h').focus();
  }
  
  document.getElementById('inp_h').value=h;
  document.getElementById('inp_w').value=w;

  document.getElementById('inp_h').disabled=vdisabled;
  document.getElementById('inp_w').disabled=vdisabled;

  document.getElementById('div_main_layout').setAttribute('data-idheight',h);
  document.getElementById('div_main_layout').setAttribute('data-idwidth',w);
  document.getElementById('div_main_layout').setAttribute('data-idtype',t);
  
  document.getElementById('lay_front').style.height=h+'px';
  document.getElementById('lay_front').style.width=w+'px';
  document.getElementById('lay_back').style.height=h+'px';
  document.getElementById('lay_back').style.width=w+'px';
}

function chk_clientname(v){
  for(var i=0;i < DB_PVC1.length;i++){
    if(DB_PVC1[i]['clientname'].trim().toUpperCase()==v.trim().toUpperCase()){
      MSG_SHOW(vbOk,"ERROR: ","Client Name Already Exist",function(){},function(){});  
      v='';
      break;
    }
  }
  document.getElementById('div_main_layout').setAttribute('data-clientname',v);
}