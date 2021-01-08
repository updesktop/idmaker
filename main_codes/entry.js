function fm_entry(m){
  var clientcode=document.getElementById('div_main_view_pvc').getAttribute('data-clientcode');  
  //var clientname=JBE_GETFLD('clientname',DB_PVC1,'clientcode',clientcode);
  var clientname=document.getElementById('div_main_view_pvc').getAttribute('data-clientname');
  document.getElementById('div_main_view_pvc').setAttribute('data-entrymode',m);
  var len_view=document.querySelectorAll('.cl_viewItems').length;  
  var num=document.getElementById('div_pvcclient').getAttribute ('data-num');

  var ctr=0;
  for(var i=0;i < DB_PVC2.length;i++){  
    if(DB_PVC2[i]['clientcode']!=clientcode){ continue; }
    if(!DB_PVC2[i]['FLDNAME']){ continue; }
    ctr++;
  }
  if(ctr==0){ 
    snackBar('No Field Names found in this PVC.');
    return; 
  }

  if(num==0){ 
    if(m==2){
      snackBar('Select a record');
      return; 
    }
  }

  clear_THISFILE();

  var aryPVC2=DB_PVC2;
  aryPVC2.sort(sortByMultipleKey(['clientcode','ndx']));  
  var ctr_item=0;
  var tilt='Add Entry';
  if(m==2){ tilt='Edit Entry'; }
  
  var aryDB=JBE_GETARRY(DB_PVCCLIENT,'NUM',num);
  var dtl=        
    '<div style="width:100%;height:100%;text-align:center;padding:5px;background:white;">'+  
      '<div style="width:100%;height:100%;margin-top:0px;padding:0px;overflow:auto;text-align:left;font-size:12px;border:1px solid black;overflow:auto;background:none;">';
        var dtl_in='';

        for(var i=0;i < len_view;i++){  
          var div=document.getElementById('vFLD'+(i+1));
          
          var data_tag=div.getAttribute('data-tag');          
          var data_tagname=div.getAttribute('data-tagname');
          var fldname=div.getAttribute('data-fldname');                    
          if(!fldname){ continue; }

          ctr_item++;
          
          var v_value='';
          if(m==2){ v_value=aryDB[fldname]; }          
          
          dtl_in+= 
            '<div id="jj'+ctr_item+'" class="dta_entry" style="width:100%;height:35px;margin-bottom:2px;padding:2px;text-align:left;font-size:12px;border:0px solid black;background:lightgray;">';
          
          if(data_tag=='txt'){
            dtl_in+=
                '<div id="ee_div'+ctr_item+'" style="float:left;width:30%;height:100%;">'+retFLDNAME(clientcode,fldname)+'</div>'+
                '<input id="ee_inp'+ctr_item+'" data-fld="'+fldname+'" data-eetag="'+data_tag+'" data-tagname="'+data_tagname+'"type="text" style="float:left;width:70%;height:100%;" value="'+v_value+'"/>';
          }else if(data_tag=='img'){            
            dtl_in+=
                '<div id="ee_div'+ctr_item+'" class="cl_entry_img" style="float:left;width:30%;height:100%;">'+retFLDNAME(clientcode,fldname)+'</div>'+
                '<div style="float:left;width:70%;height:100%;">'+
                  '<input type="file" id="id_file_image'+ctr_item+'" data-orig="" data-sel=0 name="id_file_image" hidden="hidden" />'+
                  '<img id="ee_inp'+ctr_item+'" data-fld="'+fldname+'" data-img="'+v_value+'" data-eetag="'+data_tag+'" data-tagname="'+data_tagname+'" class="asyncImage" src="'+JBE_API+'upload/layout/'+clientname+'/img/'+v_value+'" style="float:left;height:100%;background:red;"/>'+                  
                  '<div id="ee_span'+ctr_item+'" style="float:left;margin-left:2%;width:auto;max-width:50%;height:100%;overflow:auto;background:green;">'+v_value+'</div>'+                  
                  '<button onclick="JBE_GET_IMAGE('+ctr_item+',id_file_image'+ctr_item+'.id,ee_inp'+ctr_item+'.id,&quot;&quot;,false)" style="float:right;width:40px;height:100%;">...</button>'+                  
                '</div>';
          }                    
          dtl_in+=
            '</div>';
        }
        
                      
  dtl+=dtl_in+'</div></div>';

  openView(dtl,tilt,'close_div_viewEdit_pvc');
  mnu_viewEdit_pvc();
}

function close_div_viewEdit_pvc(){
  //alert('byexxxx');
  mnu_view_pvc();
}

function del_entry(){   
  var clientcode=document.getElementById('div_main_view_pvc').getAttribute('data-clientcode');  
  var fld_num=document.getElementById('div_pvcclient').getAttribute('data-num');
  
  if(fld_num==0){ 
    
      snackBar('Select a record');
      return; 
    
  }

  MSG_SHOW(vbYesNo,"CONFIRM: ","Delete this Record?",function(){      
    showProgress(true);    
    axios.post(JBE_API+'z_entry.php', { request: 4,     
      clientcode,   
      fld_num
    },JBE_HEADER)
    .then(function (response) { 
      showProgress(false);
      console.log(response.data);
      DB_PVCCLIENT=response.data;
      disp_view_ele(clientcode);
    },JBE_HEADER)    
    .catch(function (error) { console.log(error); showProgress(false); }); 
  },function(){ return; });  
}

function save_entry(){ 
  var clientcode=document.getElementById('div_main_view_pvc').getAttribute('data-clientcode');  
  var clientname=document.getElementById('div_main_view_pvc').getAttribute('data-clientname');
  var el_ctr=document.querySelectorAll('.dta_entry').length;
  var img_ctr=document.querySelectorAll('.cl_entry_img').length;
  
  var vmode=document.getElementById('div_main_view_pvc').getAttribute('data-entrymode');
  var fld_num=document.getElementById('div_pvcclient').getAttribute ('data-num');
  var req=2;
  if(vmode==2){ req=3; }

  var aryItems=[];    
  var aryItems_ctr=0;
  var aryDTL=[];
  for(var i=0;i<15;i++){    
    aryDTL[i]='';
  }

  var targetDIR=JBE_API+'upload/layout/'+clientname+'/img/';    

  for(var i=1;i<=el_ctr;i++){    
    var div_ee=document.getElementById('ee_inp'+i);    
    var div_fld=div_ee.getAttribute('data-fld');    
    var div_tag=div_ee.getAttribute('data-eetag');
    var div_tagname=div_ee.getAttribute('data-tagname');

    //alert(div_tag);
    var div_val=iif(div_tag=='img',div_ee.getAttribute('data-img'),div_ee.value);
    
    //alert('div_val '+div_val);
    if(div_val.trim().length==0 && div_tag=='txt'){
      snackBar("Empty Field - "+div_tagname);
      //MSG_SHOW(vbOk,"ERROR: ","Empty Field - "+div_tagname,function(){},function(){});  
      //return;
    }

    if(div_tag=='img'){
      div_val=div_ee.getAttribute('data-img');          
      if(THISFILE[i]){
        uploadNOW(THISFILE[i],div_val,targetDIR,'',true,false);        
      }
    }    
    aryItems_ctr=parseInt(div_fld.substr(3));    
    aryDTL[aryItems_ctr-1]=div_val;    
  }
  
    
  let ob={  
    fld1:aryDTL[0],fld2:aryDTL[1],fld3:aryDTL[2],fld4:aryDTL[3],fld5:aryDTL[4],
    fld6:aryDTL[5],fld7:aryDTL[6],fld8:aryDTL[7],fld9:aryDTL[8],fld10:aryDTL[9],
    fld11:aryDTL[10],fld12:aryDTL[11],fld13:aryDTL[12],fld14:aryDTL[13],fld15:aryDTL[14]    
  };  
  aryItems[0]=ob;
  showProgress(true);    
  axios.post(JBE_API+'z_entry.php', { request: req,        
    clientcode,
    clientname,
    fld_num,
    aryItems:JSON.stringify(aryItems)
  },JBE_HEADER)
  .then(function (response) { 
    showProgress(false);
    console.log(response.data);
    //alert('bantay: '+response.data.length);
    DB_PVCCLIENT=response.data;       
    if(vmode==1){ fld_num=DB_PVCCLIENT[response.data.length-1]['NUM']; }     
    closeView(); 
    disp_names(clientcode);
    disp_dtl_rec(fld_num);
  },JBE_HEADER)    
  .catch(function (error) { console.log(error); showProgress(false); }); 
}