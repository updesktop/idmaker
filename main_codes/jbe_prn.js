var arySELECTED=[];

function init_selected(){
  var clientcode=document.getElementById('div_main_view_pvc').getAttribute('data-clientcode');
  arySELECTED=[];
  var ctr=0;  
  for(var i=0;i<DB_PVCCLIENT.length;i++){
    if(DB_PVCCLIENT[i]['clientcode'] != clientcode){ continue; }
    if(DB_PVCCLIENT[i]['sel'] == 0){ continue; }
    //arySELECTED[ctr]=DB_PVCCLIENT[i]; 
    arySELECTED[ctr]=DB_PVCCLIENT[i]; 
    ctr++;
  }
}

function fm_prn(){
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;    
  
  
  //alert(clientcode);
  init_selected();
  if(arySELECTED.length==0){    
    //MSG_SHOW(vbOk,"DENIED: ","Nothing to Print. Please select entries.",function(){},function(){});        
    snackBar("Nothing to Print. Please select entries.");
    return;
  }
    
  //arySELECTED=JBE_GETARRY(DB_PVCCLIENT,'clientcode',clientcode);
  var sugod=1;
  var hunong=5;  
  if(hunong > arySELECTED.length){ hunong = arySELECTED.length; }
  var vpage=1;
    
  var dtl='<div id="div_main_prn" data-sugod=1 data-hunong=3 data-pg=1 style="width:100%;height:100%;overflow:auto;padding:0px;background-color:white;"></div>';
  openView(dtl,'VIEW IDs','close_div_prn');
  mnu_prn();
  disp_layout_prn(false,sugod,hunong,arySELECTED);
}

function close_div_prn(){
  var clientcode=document.getElementById('div_main_view_pvc').getAttribute('data-clientcode');
  disp_names(clientcode);
  mnu_view_pvc();
}

function show_prn_pvc(){
  fm_prn_pvc();
}

function do_print(){    
  var originalContents = document.body.innerHTML;    
  var printContents = document.getElementById('div_main_prn').innerHTML;//.cloneNode(true);
    
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
}

function mnu_prn(){
  var vdisp='none';
  var rkey=document.getElementById('div_main_view_pvc').getAttribute('data-rkey');
  //alert(rkey);
  if(CURR_AXTYPE == 5){ vdisp='block'; }
  var jmenu=
    '<div style="width:100%;height:100%;">'+

      '<div id="arrow_left" onclick="do_move(-1)" style="float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jPrev.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">Prev</span>'+        
      '</div>'+
      '<div id="arrow_right" onclick="do_move(1)" style="float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jNext.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">Next</span>'+        
      '</div>'+

      '<div onclick="do_print()" style="float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jprn.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">PRINT</span>'+        
      '</div>'+     

      '<div onclick="show_prn_pvc()" style="float:right;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jprn.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">PVC</span>'+        
      '</div>'+
      
    '</div>';
  dispMenu(false,jmenu);
}

function do_move(v){
  var tot_page=parseInt(arySELECTED.length/5);
  var rem=arySELECTED.length % 5;  
  if(arySELECTED.length>5 && rem > 0){ tot_page++; }
  
  var pg=parseInt(document.getElementById('div_main_prn').getAttribute('data-pg')); 
  var sugod=1;
  var hunong=5;  

  if(v>0){    
    if(pg >= tot_page){
      //MSG_SHOW(vbOk,"FYI: ","End of Page.",function(){},function(){});   
      snackBar("End of Page.");
      return;
    }    
    pg++;      
  }else{        
    if(pg <= 1){
      //MSG_SHOW(vbOk,"FYI: ","Start of Page.",function(){},function(){});     
      snackBar("Start of Page.");
      return;
    }       
    pg--; 
  }
  
  sugod=((pg-1)*5)+1;

  if(sugod+5 > arySELECTED.length){     
    hunong=(arySELECTED.length-sugod)+1; 
  }
  
  disp_layout_prn(false,sugod,hunong,arySELECTED);  
  document.getElementById('div_main_prn').setAttribute('data-pg',pg);
}
