const  $siteList =$('.siteList')
const  $lastLi =$('.lastLi')
const hashLI = localStorage.getItem('x');
const  lObject = JSON.parse(hashLI);
let hashMap =  lObject ||[
{'logo':'A','url':"https://www.acfun.com"},
    {'logo':'B','url':"https://www.baidu.com"},
    {'logo':'T','url':"https://www.taobao.com"},
];

const simplyUrl= (url) => {
   return  url.replace('https://','')
        .replace('http://','')
        .replace('www.','')
        .replace(/\/.*/,'')//删除/开头所有的内容
}
const refresh = function (){
    $siteList.find('li:not(.lastLi)').remove();
    hashMap.forEach((node,index) =>{
        const $li = $(`<li>
            <div class="site">
                <div class="logo">${node.logo}</div>
                <div class="link">${simplyUrl(node.url)}</div>
                <div class="deletebtn">
                    <svg class="icon" >
                        <use xlink:href="#icon-close"></use>
                     </svg>
                
                </div>
            </div>
    </li>`).insertBefore($lastLi)
        $li.on('click','.site',(e)=>{
            console.log('site执行了')
           window.open(node.url);
        })

        $li.on('click','.deletebtn',(e)=>{
            console.log('close执行了')
            e.stopPropagation();
            hashMap.splice(index,1)
            $li.remove();
            // refresh();
        })

    })

}

refresh();

$('.addButton')
.on('click',()=>{
    let url = window.prompt('请问你要添加的网址是？')
    if(url && url.indexOf('http')!==0){
        url = 'https://'+url;
    }
    hashMap.push({
       'logo': simplyUrl(url)[0].toUpperCase(),
        'url':url
        })
    refresh()

});

window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);//得到是字符串
    localStorage.setItem('x',string)//localStorage是全局变量，存储以键值对的形式。存在本地存储。
}

$(document).on('keypress',(e)=>{
console.log(e.key)
    const  {key} = e
    for (let i =0 ;i < hashMap.length;i++){
        if (key === hashMap[i].logo.toLowerCase()){
            window.open(hashMap[i].url)
        }
    }
})