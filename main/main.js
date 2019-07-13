'use strict';

const isItemValid =(Items)=> {
    let barcodes=loadAllItems().map((item)=>item.barcode)
    return Items.every(item=>{
        if(item.indexOf("-")!=-1){
            return barcodes.includes(item.split("-")[0])
        }else{
            return barcodes.includes(item)
        }
    })
}

const ConvertItems =(Items)=> {
    return Items.map(item=>{
        let ConvertItem=item.split("-")
        return({
            barcode:ConvertItem[0],
            count:ConvertItem[1]?parseFloat(ConvertItem[1]):1
        })
    })
}

const calculateOriginalPrice =(ConvertItems)=> {
    let total_cost=0
    let settlementItems=[]
    ConvertItems.forEach(item=>{
        let settleItem=settlementItems.find(it=>item.barcode===it.detail.barcode)
        if(!settleItem){
            let itemDetail=loadAllItems().find(it=>item.barcode===it.barcode)
            settlementItems.push({
                detail:itemDetail,
                count:item.count,
                originalTotal:item.count*itemDetail.price,
                promotion:undefined,
                promotionPrice:undefined,
            })
            total_cost+=item.count*itemDetail.price
        }else{
            settleItem.count+=item.count
            settleItem.originalTotal+=item.count*settleItem.detail.price
            total_cost+=item.count*settleItem.detail.price
        }
    })
    console.log(settlementItems)
    return {settlementItems,total_cost}
}

const calculatePromotionPrice =(settlementItems,total_cost)=> {
    let totalPromotion=0
        // set promotion
    settlementItems.forEach(item=>{
        let hasPromotionItem=loadPromotions().find(it=>it.barcodes.includes

(item.detail.barcode))
        if(hasPromotionItem){
            item.promotion=hasPromotionItem.type
        }
    })
    settlementItems.forEach(item=>{
        // calculate promotion
        if(item.promotion=="BUY_TWO_GET_ONE_FREE"){
            item.promotionPrice=parseInt(item.count/2)*item.detail.price
            totalPromotion+=item.promotionPrice
        }
    })
    return{settlementItems,totalPromotion,total_cost}
}

const creatReceipt=(finaItems,total_cost,totalPromotion)=>{
    let receipt = `***<没钱赚商店>收据***\n`;
    finaItems.forEach(item=>{
        let finalCost=item.originalTotal
        if(item.promotionPrice){
            finalCost=item.originalTotal-item.promotionPrice
        }
        console.log(item.detail.price)
        console.log(finalCost)
        receipt+= `名称：${item.detail.name}，数量：${item.count}${item.detail.unit}，单价：${item.detail.price.toFixed(2)}(元)，小计：${finalCost.toFixed(2)}(元)\n`
    })

    receipt += `----------------------\n总计：${(total_cost-totalPromotion).toFixed(2)}(元)\n节省：${totalPromotion.toFixed(2)}(元)\n**********************`
    return receipt;
}

const printReceipt=(barcodeLists)=>{
    if(!isItemValid(barcodeLists)){
        return 'illegal barcodeLists'
    }else{
        let convertItems=ConvertItems(barcodeList3)
        let settlementItems=calculateOriginalPrice(convertItems).settlementItems
        let total_cost=calculateOriginalPrice(convertItems).total_cost
        let finalSettlementItems=calculatePromotionPrice

(settlementItems,total_cost).settlementItems
        let totalPromotion=calculatePromotionPrice(settlementItems,total_cost).totalPromotion
        return creatReceipt(finalSettlementItems,total_cost,totalPromotion)
    }
}
