// 'use strict';


const barcodeList=['ITEM000000','ITEM000001-1.5']
const barcodeList2=['ITEM000000','ITEM000000-1.5']
const barcodeList3=['ITEM000000-4','ITEM000002-2']



describe('check validation', () => {
  it('Should return true when input ITEM000001', () => {
    expect(isItemValid(['ITEM000001','ITEM000003-2.5'])).toBe(true)
  })  

  it('Should return true when input ITEM000022', () => {
    expect(isItemValid(['ITEM000022'])).toBe(false)
  })

}) 

describe('Convert Items', () => {
  it('should return {{barcode:"ITEM000001",count:1},{barcode:"ITEM000002",count:1.5}} when input barcodeList', () => {
    expect(ConvertItems(barcodeList)).toEqual([{barcode:"ITEM000000",count:1},{barcode:"ITEM000001",count:1.5}])
  })
}) 

describe('calculate Original Price', () => {
  it('should return except and total_cost when input ConvertItems(barcodeList)', () => {
    expect(calculateOriginalPrice(ConvertItems(barcodeList))).toEqual({
      settlementItems: [{
        detail: { barcode: "ITEM000000", name: "可口可乐",unit:"瓶", price: 3.00 },
        count: 1,
        originalTotal: 3,
        promotion:undefined,
        promotionPrice:undefined,
    },{
      detail: { barcode: "ITEM000001", name: "雪碧",unit:"瓶", price: 3.00 },
      count: 1.5,
      originalTotal: 4.5,
      promotion:undefined,
      promotionPrice:undefined,
  }
    ],
    total_cost: 7.5
    })
  })  
  it('should return expect and total_cost when input ConvertItems(barcodeList2)', () => {
    expect(calculateOriginalPrice(ConvertItems(barcodeList2))).toEqual({
      settlementItems: [{
        detail: { barcode: "ITEM000000", name: "可口可乐",unit:"瓶", price: 3.00 },
        count: 2.5,
        originalTotal: 7.5,
        promotion:undefined,
        promotionPrice:undefined,
    }],
    total_cost: 7.5
    })
  })  
})

describe('calculate promotion Price', () => {
  it('should return promotiontItems and totalPromotion when   ', () => {
    expect(calculatePromotionPrice( calculateOriginalPrice( ConvertItems(barcodeList2)).settlementItems ,calculateOriginalPrice( ConvertItems(barcodeList2)).total_cost )  )
          .toEqual({
      settlementItems: [{
      detail: { barcode: "ITEM000000", name: "可口可乐",unit:"瓶", price: 3.00 },
      count: 2.5,
      originalTotal: 7.5,
      promotion:'BUY_TWO_GET_ONE_FREE',
      promotionPrice:3,
  }
    ],
    totalPromotion: 3,
    total_cost:7.5
    })
})
})


let finaItems=calculatePromotionPrice( calculateOriginalPrice( ConvertItems(barcodeList3)).settlementItems ,calculateOriginalPrice( ConvertItems(barcodeList3)).total_cost ) 
describe('creat Receipt', () => {

    const expectText = `***<没钱赚商店>收据***
名称：可口可乐，数量：4瓶，单价：3.00(元)，小计：6.00(元)
名称：苹果，数量：2斤，单价：5.50(元)，小计：11.00(元)
----------------------
总计：17.00(元)
节省：6.00(元)
**********************`;

  it('should return receipt} when input barcodeList', () => {
    expect(creatReceipt(finaItems.settlementItems,finaItems.total_cost,finaItems.totalPromotion)).toEqual(expectText)
  })
}) 

describe('print Receipt', () => {

  const expectText = `***<没钱赚商店>收据***
名称：可口可乐，数量：4瓶，单价：3.00(元)，小计：6.00(元)
名称：苹果，数量：2斤，单价：5.50(元)，小计：11.00(元)
----------------------
总计：17.00(元)
节省：6.00(元)
**********************`;

it('should print Receipt', () => {
  expect(printReceipt(barcodeList3)).toEqual(expectText)
})
}) 