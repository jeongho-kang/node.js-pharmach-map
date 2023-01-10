let express = require("express"); // express 모듈을 사용 가능하게 된다
let axios = require("axios")

let app = express(); // app이라는 변수는 express 모듈을 가리키게 된다.
let port = process.env.PORT || 80; // process.env.PORT는 환경설정 포트

app.use(express.static("public_html"));
app.listen(port, function() {
    console.log("html 서버 시작중..")
})

app.get("/pharmach_list", (req,res) => {
    
        let api = async() => {
            let response = null;
            try{
            response = await axios.get("http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire", {
                 params: {
                     "serviceKey" : "bUewzAlqRlRu6GgFIUalx0Eckqlj8+ReHxX7g8Mqn5SxVqy8DzuumQ+yMHNR7KSTMauOvztjaUqFvllzNQ88Sg==",
                     "Q0" : req.query.Q0,
                     "Q1" : req.query.Q1,
                     "QT" : req.query.QT,
                     "QN" : req.query.QN,
                     "ORD" : req.query.ORD,
                     "pageNo" : req.query.pageNo,
                     "numOfRows" : req.query.numOfRows,
                 }
             })
            }
             catch(e) {
                console.log(e)
            }
             return response;
        }
         
         
         api().then((response) => {
            res.setHeader("Access-Control-Allow-Origin","*")
            res.json(response.data.response.body); // 약국 데이터를 그대로 경로로 접속한 컴퓨터에 전달해줌
         })
    }
    
    
);



// http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?serviceKey=bUewzAlqRlRu6GgFIUalx0Eckqlj8%2BReHxX7g8Mqn5SxVqy8DzuumQ%2ByMHNR7KSTMauOvztjaUqFvllzNQ88Sg%3D%3D&Q0=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C&Q1=%EA%B0%95%EB%82%A8%EA%B5%AC&QT=1&QN=%EC%82%BC%EC%84%B1%EC%95%BD%EA%B5%AD&ORD=NAME&pageNo=1&numOfRows=10