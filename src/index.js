import axios from "axios";

const targetNumber = 2;

// 点赞转发的 URL
const url1 = 'https://api.bilibili.com/x/polymer/web-dynamic/v1/detail/reaction?id=971318935771152418&offset=&web_location=333.1369';

// 评论的url
const url2 = 'https://api.bilibili.com/x/v2/reply/wbi/main?oid=327173667&type=11&mode=3&pagination_str=%7B%22offset%22:%22%22%7D&plat=1&seek_rpid=&web_location=1315875&w_rid=c8335c32ffcdc800c78985844c43063c&wts=1725703446';

// Cookie
const cookies = 'buvid3=0494894B-3B0C-0DB6-3B4D-9FFA676B5D4D79864infoc; b_nut=1708246579; i-wanna-go-back=-1; b_ut=7; _uuid=3B235385-F43F-2F11-8546-6611FF2D13BD80109infoc; buvid_fp=e2d0125d3e6be1000be501b7a16352cf; buvid4=E74828B7-997F-C501-7D4E-45E108A8E39C80482-024021808-WssZSOH1x6iNR8Cv29ndVA%3D%3D; enable_web_push=DISABLE; header_theme_version=undefined; home_feed_column=5; browser_resolution=1440-788; CURRENT_FNVAL=4048; bsource=search_baidu; b_lsid=456E9963_191CBEEE0B8; bili_ticket=eyJhbGciOiJIUzI1NiIsImtpZCI6InMwMyIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjU5NjI1MTYsImlhdCI6MTcyNTcwMzI1NiwicGx0IjotMX0.2w3Z7PnCIdXlxXsp2FxtTeq_fXZN9mv3nHGQOoZjjiU; bili_ticket_expires=1725962456; SESSDATA=6079999f%2C1741255387%2Cb7b97%2A92CjAVSI4XEJz8a6GdXt1rTCW12o8sOR_BjzNGVpixuqHTDOzc7kKn1T5r-uP61eBCbp4SVmdxQjE3NDRfTThqQ096ck00bWllek5VVmU2S2tEOVRZQWtDazdZeTNyMGwxQVB6RTl4UUdQUW9RUWFVb25NakhnRTNTSXJENzlac1dabnd0MmtCaVhBIIEC; bili_jct=6850eb1dd06794d28bfccfd618e2d0db; DedeUserID=12591775; DedeUserID__ckMd5=95e38b09aaad80db; sid=mmasnset';

const request1 = axios.get(url1, { headers: { 'Cookie': cookies } });
const request2 = axios.get(url2, { headers: { 'Cookie': cookies } });

// 使用 Promise 发起请求
Promise.all([request1, request2]).then(responses => {
        const forwards = responses[0].data.data.items;
        const forwardNames = forwards.map(item => item.name);

        const replies = responses[1].data.data.replies;
        const repliedNames = replies.map(item => item.member.uname);        

        const allUniqueNames = [...new Set([...forwardNames, ...repliedNames])];
        console.log(`一共有好兄弟${allUniqueNames.length}人, 随机抽出${targetNumber}位`);
        const luckyOnes = getRandomElements(allUniqueNames, targetNumber);
        console.log(luckyOnes);
    }
).catch(error => {
    console.log('请求失败啦'. error);
});

function getRandomElements(arr, numElements) {
    if (numElements > arr.length) {
      throw new Error('请求的元素数量超过了数组的长度');
    }
  
    // 创建一个数组来保存随机选择的索引
    const indices = new Set();
  
    // 生成 numElements 个唯一的随机索引
    while (indices.size < numElements) {
      indices.add(Math.floor(Math.random() * arr.length));
    }
  
    // 使用生成的索引从原数组中提取元素
    return Array.from(indices).map(index => arr[index]);
  }