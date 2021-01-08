var dragItem;
var container;
var margin_top=10;
var margin_left=10;
var glob_idheight=325;
var glob_idwidth=205;

var curr_item=1;
var curr_Y=0;
var curr_X=0;
var active = false;
var currentX=0;
var currentY=0;
var initialX=0;
var initialY=0;
var xOffset = [];
var yOffset = [];
var pvc_slider;
var f_edit_pvc=false;

function fm_pvc(){
  if(!JBE_ONLINE){ 
    snackBar('OFFLINE');
    return;
  }
  if(!CURR_USER){
    snackBar("Please Log In");
    return;
  }
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;    
  mnu_pvc();

  var dtl='<div id="div_main_pvc" style="width:100%;height:100%;padding:0px;background-color:white;"></div>';
  openView(dtl,'PVC Box','close_div_pvc');  
  disp_pvc();
  if(!JBE_ONLINE){
    //showMenu('mnu_offline');
    return;
  }  
}
function disp_pvc(){
  var xdivx=document.getElementById('div_main_pvc');
  if(!xdivx){    
    return;
  }
  var aryPVC1=DB_PVC1;    
  aryPVC1.sort(sortByMultipleKey(['clientname']));  
  //aryPVC1.sort(sortByMultipleKey(['id']));  
  var dtl='';
  var bg='white';
  for(var i=0;i<aryPVC1.length;i++){    
    var clientcode=aryPVC1[i]['clientcode'];
    dtl+=
      '<div onclick="view_pvc(&quot;'+clientcode+'&quot;)" style="cursor:pointer;padding:5px;background:'+bg+'">'+
        aryPVC1[i]['clientname']+        
      '</div>';
    if(bg=='white'){ 
      bg="lightgray";
    }else{
      bg="white";
    }
  }
  dtl+='</div>';
  document.getElementById('div_main_pvc').innerHTML=dtl;
}

function close_div_pvc(){       
  showMainPage();  
}
function close_div_view_pvc(){     
  //alert('shawa bye');
  get_db_pvc();        
  mnu_pvc();
}
function close_div_viewEdit_pvc(){           
  mnu_view_pvc();    
}
function close_div_add_new_pvc(){           
  mnu_pvc();    
}

function close_div_edit_pvc(){         
  /*  
  if(f_edit_pvc){ 
    snackBar('DENIED:<br>You are still in Edit Mode.');
    return false; 
  }
  */
  var clientcode=document.getElementById('div_main_view_pvc').getAttribute('data-clientcode');  
  disp_view_ele(clientcode); 
}

function view_pvc(clientcode){  
  var clientname=JBE_GETFLD('clientname',DB_PVC1,'clientcode',clientcode);
  var rkey=JBE_GETFLD('rkey',DB_PVC1,'clientcode',clientcode); 
  var idtype=JBE_GETFLD('TYPE',DB_PVC1,'clientcode',clientcode); 
  var aryPVC2=DB_PVC2;
  aryPVC2.sort(sortByMultipleKey(['clientcode','ndx']));  

  
  var div_left_edit=225;
  var div_right_edit=window.innerWidth-div_left_edit;
  if(!JBE_MOBILE){ 
    div_left_edit=240;
    div_right_edit=800-div_left_edit; 
  }
 
  var dtl=
    '<div id="div_main_view_pvc" data-clientcode="'+clientcode+'" data-clientname="'+clientname+'" data-rkey="'+rkey+'" data-idtype="'+idtype+'" data-entrymode=0 style="width:100%;height:100%;background:gray;">'+
    '</div>';
  openView(dtl,'PVC View','close_div_view_pvc'); 
  disp_view_ele(clientcode);  
}

function disp_view_ele(clientcode){  
  mnu_view_pvc();
  //var clientname=JBE_GETFLD('clientname',DB_PVC1,'clientcode',clientcode);  
  var clientname=document.getElementById('div_main_view_pvc').getAttribute('data-clientname');
  var n = new Date().toLocaleTimeString('it-IT');

  var aryDB=JBE_GETARRY(DB_PVC1,'clientcode',clientcode);
  var frontImg=aryDB['IMGFRONT'];
  var backImg=aryDB['IMGBACK'];
  var idheight=parseInt(aryDB['HEIGHT']);
  var idwidth=parseInt(aryDB['WIDTH']);
  var idtype=parseInt(aryDB['TYPE']);
  var div_left_edit=225;
  
  var div_right_edit=window.innerWidth-div_left_edit;
  if(!JBE_MOBILE){ 
    div_left_edit=240;
    if(idtype==2){ div_left_edit=350; }
    div_right_edit=800-div_left_edit; 
  }
  
  var dtl=
  '<div id="div_left_view_pvc" style="float:left;position:relative;width:'+div_left_edit+'px;height:100%;text-align:left;overflow:auto;background:white;">'+
    
    '<div style="width:100%;height:10px;background:none;"></div>'+
    '<div style="margin-left:10px;width:'+idwidth+'px;height:'+idheight+'px;border:1px solid black;background:none;">'+
      '<div id="front_disp_view_img" style="width:100%;height:100%;background:url('+JBE_API+'upload/layout/'+clientname+'/'+frontImg+'?'+n+') no-repeat;background-size: 100% 100%;"></div>'+
    '</div>'+

    '<div style="margin-left:10px;width:'+idwidth+'px;height:'+idheight+'px;border:1px solid black;background:none;">'+
      '<div id="back_disp_view_img" style="width:100%;height:100%;background:url('+JBE_API+'upload/layout/'+clientname+'/'+backImg+'?'+n+') no-repeat;background-size: 100% 100%;"></div>'+
    '</div>'+
    '<div style="height:10px;background:none;"></div>';
  
  var dtl2='';
  var dtl3='';
  var dtl_gfx='';

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
  

  var ctr_item=0;
  var aryPVC2=DB_PVC2;
  aryPVC2.sort(sortByMultipleKey(['clientcode','ndx']));  

  for(var i=0;i<aryPVC2.length;i++){        
    if(aryPVC2[i]['clientcode'] != clientcode){ continue; }
    
    ctr_item++;

    vTop=margin_top+parseInt(aryPVC2[i]['vtop']);
    vLeft=margin_left+parseInt(aryPVC2[i]['vleft']);     
    vValue=aryPVC2[i]['vvalue'];  
    vWidth=parseInt(aryPVC2[i]['vwidth']);
    vHeight=parseInt(aryPVC2[i]['vheight']);
    vValue=aryPVC2[i]['vvalue']; 
    vTag=aryPVC2[i]['tag'];    
    vTagname=aryPVC2[i]['tagname'];    

    vFontname=aryPVC2[i]['fontname'];     if(!vFontname){ vFontname=aryFONTS[0]; }
    
    vFontsize=aryPVC2[i]['fontsize'];     if(vFontsize==0){ vFontsize=12; }
    vFontcolor=aryPVC2[i]['fontcolor'];   if(!vFontcolor){ vFontcolor='#000000'; }
    vFontbold=aryPVC2[i]['fontbold'];     if(!vFontbold){ vFontbold='normal'; }
    vFontitalic=aryPVC2[i]['fontitalic']; if(!vFontitalic){ vFontitalic='normal'; }
    vFontalign=aryPVC2[i]['fontalign'];
    vFLDNAME=aryPVC2[i]['FLDNAME'];
    vTitle=ctr_item+' = '+vTagname;
    //vFontbold='bold';
    //alert(vFontname);
    
    if(vTag == 'txt'){ 
      if(vFLDNAME){ 
        dtl3='';        
      }else{
        dtl3=vValue;    
        vTitle=ctr_item+' = '+vTag;    
      }
      dtl_gfx='';      
    }else if(vTag == 'img'){
      if(vFLDNAME){   
        dtl3='';
        dtl_gfx=''; 
      }else{        
        vTitle=ctr_item+' = '+vTag;
        dtl3='';        
        dtl_gfx='background:url('+JBE_API+'upload/layout/'+clientname+'/'+vValue+'?'+n+');background-repeat:no-repeat;background-size:100% 100%;';          
      }      
    }  
    
    dtl2+=    
      '<div id="vFLD'+ctr_item+'" class="cl_viewItems" data-fldname="'+vFLDNAME+'" data-tag="'+vTag+'" data-tagname="'+vTagname+'" title="'+vTitle+'"'+
          ' style="position:absolute;top:'+vTop+'px;left:'+vLeft+'px;width:'+vWidth+'px;height:'+vHeight+'px;'+
          'font-family:'+vFontname+';font-size:'+vFontsize+'px;color:'+vFontcolor+';font-weight:'+vFontbold+';font-style:'+vFontitalic+';text-align:'+vFontalign+';'+
        dtl_gfx+'">'+
        dtl3+
      '</div>';    
  }
  // ================= END
    
  dtl+=dtl2+'</div>'+
    '<div id="div_right_view_pvc" data-num=0 class="cl_pvc_right" style="float:left;width:'+div_right_edit+'px;height:100%;font-size:12px;padding:2px;background:black;">'+
    
      '<div style="width:100%;height:30px;padding:2px;color:white;background:none;">'+           
        '<input id="chkSel" type="checkbox" onchange="do_select(0,this.checked)" style="float:right;width:30px;height:100%;text-align:left;margin:0px;background:none;"/>'+
        '<div style="float:right;height:100%;width:auto;padding:5px;font-size:15px;background:none;">Select All</div>'+        
      '</div>'+

      '<div id="div_names" data-rec="" style="display:block;width:100%;height:'+(H_VIEW-35)+'px;overflow:auto;padding:0px;background:none;">'+        
      '</div>'+
      
    '</div>'+
  '</div>';
  document.getElementById('div_main_view_pvc').innerHTML=dtl;

  disp_names(clientcode);
}

function do_select(num,f_all){
  var clientcode=document.getElementById('div_main_view_pvc').getAttribute('data-clientcode');
  var fld_num=document.getElementById('div_pvcclient').getAttribute('data-num');
  var div=document.getElementById('divdtl'+num);  
  var vsel=0;
  var vmode=1; //select one only
  if(num==0){ //select ALL
    vmode=0; 
    if(f_all){
      vsel=1;
    }else{
      vsel=0;
    }
  }else{
    if(div.style.backgroundColor=='white'){    
      vsel=1;
    }else{        
      vsel=0;
    }
  } 

  //showProgress(true);    
  axios.post(JBE_API+'z_entry.php', { request: 5,  
    vmode:vmode,   
    clientcode:clientcode,   
    fld_num:fld_num,
    sel:vsel
  },JBE_HEADER)
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);
    //alert(response.data);
    DB_PVCCLIENT=response.data;
    disp_names(clientcode);
  },JBE_HEADER)    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}

function disp_names(clientcode){
  // =================display entries of the right corner
  var aryPVCCLIENT=DB_PVCCLIENT;
  var rkey=document.getElementById('div_main_view_pvc').getAttribute('data-rkey');
  aryPVCCLIENT.sort(sortByMultipleKey(['clientcode',rkey]));    
  var clientname=document.getElementById('div_main_view_pvc').getAttribute('data-clientname');  
  var edtl='<div id="div_pvcclient" data-num=0 style="width:100%;height:100%;padding:0px;background-color:white;">';
  
  for(var i=0;i<aryPVCCLIENT.length;i++){    
    if(aryPVCCLIENT[i]['clientcode'] != clientcode){ continue; }
    var num=aryPVCCLIENT[i]['NUM'];
    var bg='white';
    if(aryPVCCLIENT[i]['sel'] == 1){ bg='lightblue'; }
    edtl+=
      '<div id="divdtl'+num+'" onclick="disp_dtl_rec('+num+')" ondblclick="do_select('+num+',false)" class="cl_ngalan" style="width:100%;min-height:20px;overflow:auto;cursor:pointer;padding:5px;border:1px solid gray;background:'+bg+'">'+aryPVCCLIENT[i][rkey]+'</div>';    
  }

  edtl+='</div>';
  document.getElementById('div_names').innerHTML=edtl;
}

function upd_value(v){
  dragItem.innerHTML=v;
}
function upd_range(v){
  pvc_slider.value=v;
  dragItem.style.width=v+'px';
}
function upd_rangeH(m){
  var upd_height=parseInt(dragItem.style.height);
  if(m==0){
    upd_height=parseInt(document.getElementById('el_height').value);
  }else if(m>0){
    upd_height++;
  }else{
    upd_height--;
  }
  dragItem.style.height=upd_height+'px';
  document.getElementById('el_height').value=upd_height; 
  
}

function upd_ARROWS(m){
  var vtop=parseInt(dragItem.style.top);
  var vleft=parseInt(dragItem.style.left);
  var vvtop=parseInt(dragItem.getAttribute('data-top'));
  var vvleft=parseInt(dragItem.getAttribute('data-left'));
 
  if(m==1){
    vtop--; vvtop--;
  }else if(m==2){
    vleft--; vvleft--;
  }else if(m==3){
    vleft++; vvleft++;
  }else if(m==4){
    vtop++; vvtop++;
  }

  dragItem.style.top=vtop+'px';
  dragItem.style.left=vleft+'px';
  document.getElementById('el_top').innerHTML=vvtop;
  document.getElementById('el_left').innerHTML=vvleft;
  dragItem.setAttribute('data-top',vvtop);
  dragItem.setAttribute('data-left',vvleft);  
}

function mnu_pvc(){
  var vdisp='none';
  var vwidth=100;
  if(CURR_AXTYPE == 5){ vdisp='block';vwidth=70; }
  var jmenu=
    '<div style="width:100%;height:100%;text-align:center;padding:0px 0 0 0;">'+
      '<div onclick="fm_layout(1)" style="display:'+vdisp+';float:left;width:30%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jadd.png"  style="height:100%;" alt="Refresh image" />'+
        '</div>'+
        '<span class="footer_fonts">New</span>'+      
      '</div>'+
      '<div style="float:left;width:'+vwidth+'%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+              
        '<div style="padding:10px 0 0px 0;">Select PVC ID</span>'+      
      '</div>'+      
    '</div>';
  dispMenu(false,jmenu);
}

function mnu_view_pvc(){
  var vdisp='none';
  if(CURR_AXTYPE == 5){ vdisp='block'; }
  var jmenu=
    '<div style="width:100%;height:100%;">'+

      '<div onclick="fm_entry(1)" style="float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jadd.png"  style="height:100%;" alt="Refresh image" />'+
        '</div>'+
        '<span class="footer_fonts">Add</span>'+      
      '</div>'+
  
      '<div onclick="fm_entry(2)" style="float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jedit.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">Edit</span>'+        
      '</div>'+

      '<div onclick="fm_prn()" style="display:'+vdisp+';float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jprn.png"  style="height:100%;" alt="prn image" />'+
        '</div>'+
        '<span class="footer_fonts">PRN</span>'+        
      '</div>'+
      
      '<div onclick="fm_layout(2)" style="display:'+vdisp+';float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jedit.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">Layout</span>'+        
      '</div>'+
            
      '<div onclick="del_entry()" style="float:right;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jdele.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">Delete</span>'+        
      '</div>'+
      
    '</div>';
  dispMenu(false,jmenu);
}

function mnu_viewEdit_pvc(){
  var jmenu=
    '<div id="mnu_viewEdit_pvc" style="width:100%;height:100%;text-align:center;padding:0px 0 0 0;">'+      

      '<div onclick="save_entry()" style="float:left;width:25%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jsave.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">Save</span>'+        
      '</div>'+
      
      '<div onclick="closeView()" style="float:right;width:25%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jcancel.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">Cancel</span>'+        
      '</div>'+
      
    '</div>';
  dispMenu(false,jmenu);
}

function mnu_layout_pvc(){
  var jmenu=
    '<div id="mnu_layout_pvc" style="width:100%;height:100%;text-align:center;padding:0px 0 0 0;">'+      
      '<div onclick="add_el(1)" style="float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jadd.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">Label</span>'+        
      '</div>'+
      '<div onclick="add_el(2)" style="float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jadd.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">Image</span>'+        
      '</div>'+
      '<div onclick="main_info()" style="float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jcategory.png"  style="height:100%;padding:2px;background:white;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">MAIN</span>'+        
      '</div>'+
      '<div onclick="del_layout()" style="float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jdele.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">Del</span>'+        
      '</div>'+
      '<div onclick="save_layout()" style="float:right;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jsave.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">Save</span>'+        
      '</div>'+
    '</div>';
  dispMenu(false,jmenu);
}



function chg_el_tagname(v){  
  dragItem.setAttribute('data-tagname',v.toUpperCase());
}

function chg_el_type(v){
  dragItem.setAttribute('data-tag',v);
  var idx=dragItem.id;
  if(v=='img'){
    dragItem.style.backgroundImage='url('+JBE_EMPTY_IMG+')';
    dragItem.style.height='100px';
    document.getElementById('btn_editImg').style.backgroundColor='red';
    document.getElementById('btn_editImg').disabled=false;
  }else{
    dragItem.style.backgroundImage='';
    dragItem.style.height='15px';
    document.getElementById('btn_editImg').style.backgroundColor='gray';
    document.getElementById('btn_editImg').disabled=true;
  }
  dragItem.innerHTML=v.toUpperCase()+idx;    
}

function chg_el_align(v){
  dragItem.setAttribute('data-tag',v);  
  if(v=='img'){    
    dragItem.style.textAlign=v;
  }else{
    dragItem.style.textAlign=v;
  }  
}

function retFLDNAME(clientcode,fldname){
  var rval='';
  for(var i=0;i<DB_PVC2.length;i++){
    if(clientcode==DB_PVC2[i]['clientcode'] && fldname==DB_PVC2[i]['FLDNAME']){
      rval=DB_PVC2[i]['tagname'];
      break;
    }
  }
  return rval;
}