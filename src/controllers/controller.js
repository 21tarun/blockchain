
const coinModel =require('../model/coinModel')

const fetch =require('node-fetch')




var url ="https://api.coincap.io/v2/assets"
// var apiKey="Bearerf95db5fd-93ad-4bb1-bad2-6de6ebe0aed3"


const assets = async function(req,res){
    try{


        let result= await fetch(url,{
            method:"GET",
            headers: {
                "Authorization": "Bearerf95db5fd-93ad-4bb1-bad2-6de6ebe0aed3"
            }
            
        })
        
        result=await result.json()
        const coins =result.data
        
        for(let i=0;i<coins.length-1;i++){
            for(let j=i;j<coins.length;j++){
                if(coins[i].changePercent24Hr <coins[j].changePercent24Hr )
                {
                    var temp=coins[i].changePercent24Hr
                    coins[i].changePercent24Hr=coins[j].changePercent24Hr
                    coins[j].changePercent24Hr=temp
                }
            }
        }
    
        await coinModel.deleteMany()
        
        const db_data= await coinModel.insertMany(coins,{ordered:true})
        res.status(201).send({status:true,data:coins})
       
    }
    catch(err){
        res.status(500).send({status:false,message:err.message})
    }
}




module.exports.assets=assets