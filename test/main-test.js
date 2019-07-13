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

