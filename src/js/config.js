

var config = {
    /**
     * Danh sách API của form chi tiết chứng từ và màn hình danh sách chứng từ
     * Created by: NDCHIEN(8/5/2023) 
     */
    voucherAPI: {
        deleteVoucher: "https://localhost:7210/api/Vouchers/List",
        filterVoucher: function(keyWord, pageSize, pageNumber) {
            return `https://localhost:7210/api/Vouchers/filter?voucherFilter=${keyWord}&pageSize=${pageSize}&pageNumber=${pageNumber}`
        },
        getVoucherDetail: function(voucherID) {
            return `https://localhost:7210/api/VoucherDetails/filter?voucherId=${voucherID}`
        },
        updateVoucher: function(voucherID) {
            return `https://localhost:7210/api/Vouchers/Detail/${voucherID}`
        },
        getVoucherByCode: function(voucherCode) {
            return `https://localhost:7210/api/Vouchers/Code?voucherCode=${voucherCode}`
        },
        insertVoucher: function() {
            return `https://localhost:7210/api/Vouchers/Detail`
        },
        getMaxCode: function() {
            return `https://localhost:7210/api/Vouchers/maxCode`
        }
    },

    assetAdjustmentAPI: {
        deleteVoucher: "https://localhost:7210/api/AssetAdjustments/List",
        filterVoucher: function(keyWord, pageSize, pageNumber) {
            return `https://localhost:7210/api/AssetAdjustments/filter?voucherFilter=${keyWord}&pageSize=${pageSize}&pageNumber=${pageNumber}`
        },
        getVoucherDetail: function(voucherID) {
            return `https://localhost:7210/api/AssetAdjustmentDetails/filter?voucherId=${voucherID}`
        },
        getVoucherByCode: function(voucherCode) {
            return `https://localhost:7210/api/AssetAdjustments/Code?voucherCode=${voucherCode}`
        },
        getMaxCode: function() {
            return `https://localhost:7210/api/AssetAdjustments/maxCode`
        },
        updateVoucher: function(voucherID) {
            return `https://localhost:7210/api/AssetAdjustments/Detail/${voucherID}`
        },
        insertVoucher: function() {
            return `https://localhost:7210/api/AssetAdjustments/Detail`
        },
    },

    AssetTransferAPI: {
        deleteVoucher: "https://localhost:7210/api/AssetTransfers/List",
        filterVoucher: function(keyWord, pageSize, pageNumber) {
            return `https://localhost:7210/api/AssetTransfers/filter?voucherFilter=${keyWord}&pageSize=${pageSize}&pageNumber=${pageNumber}`
        },
        getVoucherByCode: function(voucherCode) {
            return `https://localhost:7210/api/AssetTransfers/Code?voucherCode=${voucherCode}`
        },
        getMaxCode: function() {
            return `https://localhost:7210/api/AssetTransfers/maxCode`
        },
        updateVoucher: function(voucherID) {
            return `https://localhost:7210/api/AssetTransfers/Detail/${voucherID}`
        },
        getVoucherDetail: function(voucherID) {
            return `https://localhost:7210/api/AssetTransferDetails/filter?voucherId=${voucherID}`
        },
        insertVoucher: function() {
            return `https://localhost:7210/api/AssetTransfers/Detail`
        },
    },

    assetDepreciationAPI: {
        deleteVoucher: "https://localhost:7210/api/AssetDepreciations/List",
        filterVoucher: function(keyWord, pageSize, pageNumber) {
            return `https://localhost:7210/api/AssetDepreciations/filter?voucherFilter=${keyWord}&pageSize=${pageSize}&pageNumber=${pageNumber}`
        },
        getVoucherDetail: function(voucherID) {
            return `https://localhost:7210/api/AssetDepreciationDetails/filter?voucherId=${voucherID}`
        },
        getVoucherByCode: function(voucherCode) {
            return `https://localhost:7210/api/AssetDepreciations/Code?voucherCode=${voucherCode}`
        },
        getMaxCode: function() {
            return `https://localhost:7210/api/AssetDepreciations/maxCode`
        },
        updateVoucher: function(voucherID) {
            return `https://localhost:7210/api/AssetDepreciations/Detail/${voucherID}`
        },
        insertVoucher: function() {
            return `https://localhost:7210/api/AssetDepreciations/Detail`
        },
    },

    accountAPI: {
        getAccountList: function() {
            return `https://localhost:7210/api/AccountSystems`
        }
    },

    /**
     * API của form sửa tài sản trong chứng từ
     * Created by: NDCHIEN(8/5/2023)
     */
    editAssetAPI: {
        editAsset: function(assetCode) {
            return `https://localhost:7210/api/Assets/CostAsset/${assetCode}`
        },
        getBudgetPlace: "https://localhost:7210/api/BudgetPlaces",
        getAsset: function(assetCode) {
            return `https://localhost:7210/api/Assets/Budget?assetCode=${assetCode}`
        }
    },

    printReportAPI: {
        getReport: function(){
            return `https://localhost:7210/api/Report`
        }
    }
}

export default config;