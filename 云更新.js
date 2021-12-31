"ui";
ui.layout(
    <frame w="*" h="*">;
        <button layout_gravity="left|top" margin="1" w="auto" h="auto" id="cc_gx" text="cc"/>;
        <button layout_gravity="left|top" margin="1 41" w="auto" h="auto" id="cc1_gx" text="cc1"/>;
        <button layout_gravity="center" w="auto" h="auto" id="gx_list" text="更新"/>;
    </frame>
);


ui.gx_list.click(function(){
    //通过getText()获取输入的内容;
    var js_name = ui.gx_list.getText();
    //ui.finish
        threads.start(function() {
        //这里写你的流程代码;
        //gx_txt用于接收返回的更新列表内容,然后根据内容下载完成更新;
        let gx_tq_txt=x_z_jb(js_name);
        if(gx_tq_txt=="none"){
            toastLog("暂无更新");
        }else{
            name_js_arr=new Array();
            //分割文本到数组;
            name_js_arr=gx_tq_txt.split(",");
            //1个以上的文件名,就可以更新了;
            //以下是更新下载;
            if(name_js_arr.length>0){
                for(i=0;i<name_js_arr.length;i++){
                    //下载并生成文件到本地;
                    b_c_wj(x_z_jb(name_js_arr[i]),name_js_arr[i]);
                };
            }else{toastLog("没有需要更新的文件")};
            toastLog("全部更新完成");
        };   
    });
});   

//下载打开远程文件,返回处理好的文件内容(仅提取内容)
function x_z_jb (js_name){
    
    var url="https://github.com/kenwrz/h5/blob/gh-pages/"+js_name+".js";
    //var url="http://192.168.124.178:5500/test_code/js_new/"+js_name+".js";
    var r = http.get(url, {
        headers: {
            'Accept-Language': 'zh-cn,zh;q=0.5',
            'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
        }
    });
    var html_r=r.body.string();
    log(html_r)
    if(r.statusCode==200){
        //提取网页内容后,交给其它需要的程序处理;
        //提取字符串之前的所有字符
        let index = html_r.lastIndexOf("</table");
        html_r =html_r.substring(0,index);
        //提取字符串之后的所有字符
        index = html_r.lastIndexOf("<table");
        html_r =html_r.substring(index+1,html_r.length);
        return t_q_wb(html_r);
        
    }else{return "none"};

};

//处理网页文件内容,去掉不需要的标签代码;
function t_q_wb (html_r){
    //log(html_r);
    //这网络上做一个提取的操作,不然都是嵌入的代码,非常乱杂;
        //var sTr = "<p><img src=\"/media/goods/images/2_20170719161405_249.jpg\" title=\"\" alt=\"2";
        //var regex = "media";//此变量可以变动;
        //sTr = sTr.replace(new RegExp(regex, 'g'), 'AAA');//将regex=midia换成AAA;
    if(html_r!="none"||html_r!=null){
        //做10万条代码的准备,不太可能写这么多了吧?;
        //const re=/<span class=pl-(\S*)<\/span>/g;
        var str_txt_all="";
        const re_LC=/LC/g;
        var LC_cisu_arr =html_r.match(re_LC);
        if(LC_cisu_arr==null){toastLog("没有更新文件");return "none";
        }else{
                //log("内容行数:",LC_cisu_arr.length);
                for(ci=1;ci<LC_cisu_arr.length+1;ci++){
                    let lc_str="LC"+ci;
                    let index_lc= html_r.indexOf(lc_str);
                    let index_tr= html_r.indexOf("</tr>")+6
                    var str_txt=html_r.substring(index_lc,index_tr);
                    html_r =html_r.substring(index_tr+1,html_r.length);
                    //有注释直接跳过;
                    if(str_txt.indexOf("//")!=-1){continue;};
                    if(str_txt.match(/<spa.*<\/s[a-z]{3}>/)!=null){
                        str_txt = str_txt.match(/<spa.*<\/s[a-z]{3}>/)[0];}else{continue;};
                    //log(str_txt);
                    //str_txt = str_txt.replace(/LC.*?-line">/g, '');
                    str_txt = str_txt.replace(/<spa.*?>/g, '');
                    str_txt = str_txt.replace(/<\/s[a-z]{3}>/g, '');
                    str_txt = str_txt.replace(/&lt;/g, '<');
                    str_txt = str_txt.replace(/&gt;/g, '>');
                    str_txt = str_txt.replace(/&quot;/g, '"');
                    str_txt = str_txt.replace(/&#39;/g, "'");
                    str_txt = str_txt.replace(/&amp;/g, '&');
                    //str_txt = str_txt.replace(/&nbsp;/g, '');
                    //清右边空白
                    str_txt =str_txt.replace(/(\s*$)/g,"");
                    log("==>",str_txt);
                    if(str_txt_all==""){
                        str_txt_all=str_txt;
                    }else{
                        str_txt_all=str_txt_all+str_txt;};        
                };
                log("总"+ci+"===>",str_txt_all);
                return str_txt_all;
            };
        
    }else{return "none"};
};
//将代码写出到脚本当前目录以便调用;
function b_c_wj (html_r,t_name){
    if(html_r!="none"){
        //这里需要提取脚本源码内容;
        w_j_mc=files.cwd()+"/"+t_name+".js";
        //代码要生成的文件地址和名称;
        //判断文件是否存在,在就先删除,再新建一个同名文件;
        if(files.exists(w_j_mc)==true){
            files.remove(w_j_mc);
        };
        files.createWithDirs(w_j_mc);
        var uidjdwdang=open(w_j_mc,'a',encoding = "utf-8", bufferSize = 8192);
        uidjdwdang.write(html_r);
        //将文本内容写出到新建在本地的文件//一个坑,没有自动加换行符,查资料自己加上了);
        uidjdwdang.close();
        // //log(w_j_mc+"更新完成!");
        log("ok");
    }else{log(t_name+"不存在更新文件,跳过!")};
}
