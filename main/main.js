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
