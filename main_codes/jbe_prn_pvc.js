function fm_prn_pvc(){
  window.history.pushState({ noBackExitsApp: true }, '');
  f_MainPage=false;    
  mnu_prn_pvc();
  var sugod=parseInt(document.getElementById('div_main_prn').getAttribute('data-sugod'));
  var hunong=parseInt(document.getElementById('div_main_prn').getAttribute('data-hunong'));
  var dtl='<div id="div_main_prn_pvc" style="position:relative;width:100%;height:100%;overflow:auto;padding:0px;background-color:white;"></div>';
  openView(dtl,'PVC PRN','close_div_prn_pvc');  
  disp_layout_prn(true,sugod,hunong,arySELECTED);
}

function close_div_prn_pvc(){    
  document.getElementById('div_main_prn_pvc').innerHTML='';
  mnu_prn();
}

function do_print_pvc(){  
  var originalContents = document.body.innerHTML;    
  var printContents = document.getElementById('div_main_prn_pvc').innerHTML;//.cloneNode(true);
    
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
}

function mnu_prn_pvc(){  
  if(CURR_AXTYPE == 5){ vdisp='block'; }
  var jmenu=
    '<div style="width:100%;height:100%;">'+

      '<div onclick="do_print_pvc()" style="float:left;width:20%;height:100%;color:'+JBE_TXCLOR1+';background:none;">'+        
        '<div class="footer_gfxs">'+
          '<img src="main_gfx/jprn.png"  style="height:100%;" alt="send image" />'+
        '</div>'+
        '<span class="footer_fonts">PRINT</span>'+        
      '</div>'+
      
    '</div>';
  dispMenu(false,jmenu);
}

//------------------------------------------------------------------------------------------------------------------
function disp_layout_prn(f_pvc,sugod,hunong,arySELECTED){
  //alert('f_pvc='+f_pvc+' sugod:'+sugod+'  hunong:'+hunong);
  var clientcode=document.getElementById('div_main_view_pvc').getAttribute('data-clientcode');
  var clientname=document.getElementById('div_main_view_pvc').getAttribute('data-clientname');
  var n = new Date().toLocaleTimeString('it-IT');
  var cur_page=parseInt(document.getElementById('div_main_view_pvc').getAttribute('data-pg'));

  //alert('hunong '+hunong);
  
  var aryDB=JBE_GETARRY(DB_PVC1,'clientcode',clientcode);
  var frontImg=aryDB['IMGFRONT'];
  var backImg=aryDB['IMGBACK'];
  var idHeight=parseInt(aryDB['HEIGHT']);
  var idWidth=parseInt(aryDB['WIDTH']);
  var idType=parseInt(aryDB['TYPE']);
  
  var aryPRN=[];
  for(var i=0;i<arySELECTED.length;i++){
    aryPRN[i]=arySELECTED[i];
  }

  var div_boxname='prnBox';
  var div_mainname='div_main_prn';
  var v_css='';
  if(f_pvc){
    div_boxname='prnBOXPVC';
    div_mainname='div_main_prn_pvc';
    v_css='transform:scaleX(-1);';
    if(idType==1){ swapper(sugod,hunong); }
  }else{
    document.getElementById('div_main_prn').setAttribute('data-sugod',sugod);
    document.getElementById('div_main_prn').setAttribute('data-hunong',hunong);   
  }
  
  var div_box_width=205;
  var div_right_edit=window.innerWidth-div_box_width;
  if(!JBE_MOBILE){ 
    div_box_width=240;
    div_right_edit=800-div_box_width; 
  }  

  var dtl2='';
  var dtl3='';
  var dtl_gfx='';

  var aryPVC2=DB_PVC2;
  aryPVC2.sort(sortByMultipleKey(['clientcode','ndx']));  

  var ctrPvc=5;
  if(aryPRN.length  < ctrPvc){ ctrPvc=aryPRN.length; }
  if(hunong < ctrPvc) { ctrPvc=hunong; }

  var wtop=5;
  var wleft=5;
      
  var tot_height=(idHeight+5) * 2; 
  var tot_width=(idWidth+17)*ctrPvc;
  var v_idtype_css='';
  var v_padding='5px 0px 5px 5px';
  if(idType==2){
    tot_height=(idHeight+5)*ctrPvc;
    tot_width=(idWidth+17)*2;
    v_idtype_css='float:left;';
    v_padding='5px 5px 0px 5px';
    wtop = 5;
    wleft = 5;
  }
   
  var aryPVC2=DB_PVC2;
  aryPVC2.sort(sortByMultipleKey(['clientcode','ndx']));  

  var dtl='<div id="'+div_boxname+'" style="display:block;position:relative;margin-top:10px;margin-left:5px;width:'+tot_width+'px;height:'+tot_height+'px;padding:5px;background:none;">';
  
  for(var i=1;i<=ctrPvc;i++){       
    dtl2=''; 
    dtl+=
      '<div id="div_view_prn'+i+'" style="'+v_css+'float:left;border:1px solid lightgray;padding:'+v_padding+';-webkit-print-color-adjust:exact;position:relative;width:auto;height:auto;margin-left:0px;background:none;">';
        if(idType == 2){
          //dtl+='<div style="width:100%;height:5px;border:1px solid red;background:none;"></div>';
        }
        dtl+=
        '<div style="width:'+idWidth+'px;height:'+idHeight+'px;'+v_idtype_css+'border:1px solid black;background:none;">'+
          '<div id="front_prn_img" style="width:100%;height:100%;background:url('+JBE_API+'upload/layout/'+clientname+'/'+frontImg+'?'+n+') no-repeat;background-size: 100% 100%;"></div>'+
        '</div>';

        //if(idType == 1){
        //  dtl+='<div style="'+v_css+'width:5px;height:5px;border:1px solid red;background:black;"></div>';
        //}

        var xborder1=0;
        //if(idType == 2){ xborder1=1; }
          
        dtl+=
        '<div style="width:'+idWidth+'px;height:'+idHeight+'px;'+v_idtype_css+'border:'+xborder1+'px solid lightgray;background:none;">'+
          '<div id="back_prn_img" style="width:100%;height:100%;background:url('+JBE_API+'upload/layout/'+clientname+'/'+backImg+'?'+n+') no-repeat;background-size: 100% 100%;"></div>'+
        '</div>';

        if(idType == 1){
          dtl+='<div style="width:5px;height:auto;border:1px solid red;background:none;"></div>';
        }else{
          dtl+='<div style="width:5px;height:5px;border:1px solid red;background:none;"></div>';
        }
        
        for(var ii=0;ii<aryPVC2.length;ii++){ 
          if(aryPVC2[ii]['clientcode'] != clientcode){ continue; }
          
          var jFLD=aryPVC2[ii]['FLDNAME'];
          
          if(jFLD){
            //alert(jFLD);
            //var vvalue=DB_PVCCLIENT[sugod-1][jFLD]; 
            var vvalue=aryPRN[sugod-1][jFLD];                 
            if(aryPVC2[ii]['tag']=='txt'){    
              dtl_gfx='';
              dtl3=vvalue;
            }else{           
              dtl_gfx='background:url('+JBE_API+'upload/layout/'+clientname+'/img/'+vvalue+'?'+n+');background-repeat:no-repeat;background-size:100% 100%;';          
              dtl3='';
            }            
          }else{          
            if(aryPVC2[ii]['tag']=='txt'){
              dtl_gfx=''; 
              dtl3=aryPVC2[ii]['vvalue'];   
            }else{           
              dtl_gfx='background:url('+JBE_API+'upload/layout/'+clientname+'/'+aryPVC2[ii]['vvalue']+'?'+n+');background-repeat:no-repeat;background-size:100% 100%;';          
              dtl3='';        
            }
          }

          wtop = 5; wleft = 5;
          if(idType == 2 && parseInt(aryPVC2[ii]['vtop']) > idHeight){ 
            wtop = -idHeight+6; 
            wleft = idWidth+6; 
          }
                     
          dtl2+=
            '<div id="C'+i+aryPVC2[ii]['FLDNAME']+'" class="xcl_viewItems" data-fldname="'+aryPVC2[ii]['FLDNAME']+'" data-tag="'+aryPVC2[ii]['tag']+'" data-tagname="'+aryPVC2[ii]['tagname']+'"'+
                ' style="position:absolute;top:'+(parseInt(aryPVC2[ii]['vtop'])+wtop)+'px;left:'+(parseInt(aryPVC2[ii]['vleft'])+wleft)+'px;width:'+aryPVC2[ii]['vwidth']+'px;height:'+aryPVC2[ii]['vheight']+'px;'+
                'font-family:'+aryPVC2[ii]['fontname']+';font-size:'+aryPVC2[ii]['fontsize']+'px;color:'+aryPVC2[ii]['fontcolor']+';font-weight:'+aryPVC2[ii]['fontbold']+';font-style:'+aryPVC2[ii]['fontitalic']+';text-align:'+aryPVC2[ii]['fontalign']+';'+              
                dtl_gfx+'">'+
                dtl3+
            '</div>';
          
        }        
        sugod++;
        dtl+=dtl2+
      '</div>';
  }
  dtl+='</div>';  
  document.getElementById(div_mainname).innerHTML=dtl;    
}