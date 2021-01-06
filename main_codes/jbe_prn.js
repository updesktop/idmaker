var arySELECTED=[];

function fm_prn(){
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;    
  mnu_prn();
  var clientcode=document.getElementById('div_main_view_pvc').getAttribute('data-clientcode');
  //alert(clientcode);
  arySELECTED=[];
  var ctr=0;
  for(var i=0;i<DB_PVCCLIENT.length;i++){
    if(DB_PVCCLIENT[i]['clientcode'] != clientcode){ continue; }
    arySELECTED[ctr]=DB_PVCCLIENT[i]; 
    ctr++;
  }
    
  //arySELECTED=JBE_GETARRY(DB_PVCCLIENT,'clientcode',clientcode);
  var sugod=1;
  var hunong=5;
  //alert('arySELECTED.length '+arySELECTED.length);
  if(hunong > arySELECTED.length){ hunong = arySELECTED.length; }
  var vpage=1;
    
  var dtl='<div id="div_main_prn" data-sugod=1 data-hunong=3 data-pg=1 style="width:100%;height:100%;overflow:auto;padding:0px;background-color:white;"></div>';
  openView(dtl,'VIEW IDs','close_div_prn');  
  disp_layout_prn(false,sugod,hunong,arySELECTED);
}

function swapper(s,v){  
  var len=(s+v)-1;
  var aryTMP=[];
  var ctr=0;
  for(var i=(s-1);i<len;i++){    
    aryTMP[ctr]=arySELECTED[i];
    ctr++;
  }
  
  var max_h=glob_idheight;
  var clientcode=document.getElementById('div_main_view_pvc').getAttribute('data-clientcode');
  var v1=1;
  var v2=aryTMP.length;
  var vvv=parseInt(v2/2);
  /*
  alert(
    'v1 '+v1+'\n'+
    'v2 '+v2+'\n'+
    'vvv '+vvv
  );
  */
  var aryPVC2=DB_PVC2;
  aryPVC2.sort(sortByMultipleKey(['clientcode','FLDNAME']));  
  for(var i=0;i<aryPVC2.length;i++){
    if(aryPVC2[i]['clientcode'] != clientcode){ continue; }

    var fldname=aryPVC2[i]['FLDNAME'];
    if(!fldname){ continue; }
    //alert(fldname);
    if(parseInt(aryPVC2[i]['vtop']) > max_h){ continue; }
    
    for(var ii=0;ii<vvv;ii++){      
      var sv_fld=aryTMP[v1-1][fldname]; //save column 1      
      //alert(ii+' = '+fldname+' = '+sv_fld);
      aryTMP[v1-1][fldname]=aryTMP[v2-1][fldname]; //assign column 1 with column 5
      aryTMP[v2-1][fldname]=sv_fld; // assign column 5 with saved column1
      v1++; v2--;
    }    
  }  
  return aryTMP;
}

function close_div_prn(){
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

      '<div onclick="alert(888)" style="float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jham.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">Sel</span>'+        
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
  var pg=parseInt(document.getElementById('div_main_prn').getAttribute('data-pg')); 
  var hunong=5;  

  if(v>0){    
    pg++;    
  }else{
    document.getElementById('arrow_left').style.pointerEvents='auto';
    pg--;    
  }

  if(pg==0){        
    MSG_SHOW(vbOk,"FYI: ","Start of Page.",function(){},function(){});     
    return; 
  }
  if((sugod) > arySELECTED.length){
    hunong=arySELECTED.length-sugod+1;
    MSG_SHOW(vbOk,"FYI: ","End of Page.",function(){},function(){});    
    return;
  }

  
  var sugod=((pg-1)*5)+1;

  if((sugod+5) > arySELECTED.length){
    hunong=arySELECTED.length-sugod+1;    
    if(hunong < 0){
      MSG_SHOW(vbOk,"FYI: ","End of Page.",function(){},function(){});    
      return;
    }
  }

  /*
  alert(
    'page   : '+pg+'\n'+
    'sugod  : '+sugod+'\n'+
    'hunong : '+hunong+'\n'+
    'Sel len: '+arySELECTED.length
  );
  */ 
  disp_layout_prn(false,sugod,hunong,arySELECTED);  
  document.getElementById('div_main_prn').setAttribute('data-pg',pg);
}
