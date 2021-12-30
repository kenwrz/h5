"ui";
ui.layout(
    <frame w="*" h="*">
        <button layout_gravity="left|top" margin="1" w="auto" h="auto" id="cc_gx" text="cc"/>
        <button layout_gravity="left|top" margin="1 51" w="auto" h="auto" id="cc1_gx" text="cc1"/>
        <button layout_gravity="right|bottom" w="auto" h="auto" id="gx_list" text="云更新"/>
    </frame>
);

ui.cc_gx.click(function(){
    //通过getText()获取输入的内容
    var js_name = ui.cc_gx.getText();
    //ui.finish
        threads.start(function() {
        //这里写你的流程代码
        b_c_wj(x_z_jb(js_name),js_name) 

    });
}) 
ui.gx_list.click(function(){
    //通过getText()获取输入的内容2
    var js_name = ui.gx_list.getText();
    //ui.finish
        threads.start(function() {
        //这里写你的流程代码
        //gx_txt用于接收返回的更新列表内容,然后根据内容下载完成更新
        var gx_txt=x_z_jb(js_name)
        //log(gx_txt)
        //文件可以用读入一行,这个是文本需要分割成数组
        name_js_arr=new Array();
        //分割文本到数组
        name_js_arr=gx_txt.split(/[\s\n]/);//换行符的表示方法
        name_js_arr.forEach((item,index)=>{
            if(!item){
                name_js_arr.splice(index,1);//删除空项
            }
        })            
        //print(name_js_arr.length)
        //1个以上的文件名,就可以更新了
        //以下是更新下载
        if(name_js_arr.length>0){
            for(i=0;i<name_js_arr.length;i++){
            b_c_wj(x_z_jb(name_js_arr[i]),name_js_arr[i])
            }
        }else{toastLog("没有需要更新的文件")}
        toastLog("全部更新完成")

        
    });
})   

//下载远程文件并写出到本地
function x_z_jb (js_name){
    var url="https://github.com/kenwrz/h5/new/gh-pages/"+js_name+".js"
    //var url="http://192.168.124.178:5500/test_code/js_new/"+js_name+".js"
    var r = http.get(url, {
        headers: {
            'Accept-Language': 'zh-cn,zh;q=0.5',
            'User-Agent': 'Mozilla/5.0(Macintosh;IntelMacOSX10_7_0)AppleWebKit/535.11(KHTML,likeGecko)Chrome/17.0.963.56Safari/535.11'
        }
    });
    if(r.statusCode==200){
        return r.body.string();
        //var text =html_r.replace(/<[^>]*>|/g,"");
        //console.log(html_r);
        //b_c_wj(html_r,js_name)
    }else{return "none"}

}

//将代码写出到脚本当前目录以便调用
function b_c_wj (js_txt,t_name){
    if(js_txt!="none"){
        w_j_mc=files.cwd()+"/"+t_name+".js";//代码要生成的文件地址和名称
        //判断文件是否存在,在就先删除,再新建一个同名文件
        if(files.exists(w_j_mc)==true){
            files.remove(w_j_mc)
        }
        files.createWithDirs(w_j_mc)
        var uidjdwdang=open(w_j_mc,'a',encoding = "utf-8", bufferSize = 8192);
        uidjdwdang.write(js_txt);//将文本内容写出到新建在本地的文件//一个坑,没有自动加换行符,查资料自己加上了);
        uidjdwdang.close();
        log(w_j_mc+"更新完成!")
    }else{toastLog(t_name+"不存在更新文件,跳过!")}
}
