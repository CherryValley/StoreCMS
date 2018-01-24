var app = new Vue({
  el: '#app',
  data: {
    optionType: '',
    itemID: '添加成功后自动创建',
    itemCode: '',
    itemCodeValid: false,
    itemStatusList: [],
    selectedItemStatus: '',
    brandList: [],
    selectedBrand: 0,
    categoryList: [],
    selectedCategory: 0,
    subCategoryList: [],
    selectedSubCategory: 0,
    seriesList: [],
    selectedSeries: 0,
    itemNameCN: '',
    itemNameCNValid: false,
    itemNameEN: '',
    itemNameENValid: false,
    unitPrice4RMB: '',
    unitPriceValid4RMB: false,
    promotionPrice4RMB: '',
    promotionPriceValid4RMB: false,
    unitPrice4USD: '',
    unitPriceValid4USD: false,
    promotionPrice4USD: '',
    promotionPriceValid4USD: false,
    rate: '',
    rateValid: false,
    colorList: [],
    selectedColor: 0,
    sizeList: [],
    selectedSize: 0,
    materialList: [],
    selectedMaterial: 0,
    countryList: [],
    selectedMadeIn: 0,
    itemLength:'',
    adjustLength: '',
    suitablePetCN: '',
    suitablePetEN: '',
    itemShortDescriptionCN: '',
    itemShortDescriptionEN: '',
    itemDescriptionCN: '',
    itemDescriptionEN: ''
  },
  computed: {
    enabledSave: function () {
      return this.selectedItemStatus.length > 0
        && this.selectedBrand > 0
        && this.selectedCategory > 0
        && this.selectedSubCategory > 0
        && this.itemCode.length > 0
        && this.itemCodeValid
        && this.itemNameCN.length > 0
        && this.itemNameEN.length > 0
        && this.itemNameCNValid
        && this.itemNameENValid
        && this.unitPrice4RMB.length > 0
        && this.unitPriceValid4RMB
        && this.promotionPrice4RMB.length > 0
        && this.promotionPriceValid4RMB
        && this.unitPrice4USD.length > 0
        && this.unitPriceValid4USD
        && this.promotionPrice4USD.length > 0
        && this.promotionPriceValid4USD
        && this.rate.length > 0
        && this.rateValid
        && this.selectedColor > 0
        && this.selectedSize > 0
        // && this.selectedMaterial > 0
        && this.selectedMadeIn > 0
        // && this.itemLength.length > 0
        // && this.adjustLength.length > 0
        && this.suitablePetCN.length > 0
        && this.suitablePetEN.length > 0
        && this.itemShortDescriptionCN.length > 0
        && this.itemShortDescriptionEN.length > 0
        && this.itemDescriptionCN.length > 0
        && this.itemDescriptionEN.length > 0;
    }
  },
  methods: {
    initProcess: function () {
      this.initValues();
      this.initItemStatus();
      this.initUpdateData();
      // this.initBrand();
      // this.initCategory();
      // this.initSubCategory();
      // this.initSeriesList();
      // this.initColor();
      // this.initSize();
      // this.initMaterial();
      // this.initMadeCountry();
    },
    initValues: function () {
      this.optionType = $('#hidden-optionType').val();
      if(this.optionType === 'upd'){
        this.itemID = $('#hidden-itemID').val();
      }
    },
    initItemStatus: function () {
      this.itemStatusList.push({
        'code': 'P',
        'text': '待销售'
      });
      this.itemStatusList.push({
        'code': 'N',
        'text': '销售中'
      });
      this.itemStatusList.push({
        'code': 'E',
        'text': '已下架'
      });
    },

    initBrand: function () {
      $.ajax({
        url: '/brand/all',
        type: 'GET',
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            app.$data.brandList = res.brandList
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    initCategory: function () {
      $.ajax({
        url: '/category/all',
        type: 'GET',
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            app.$data.categoryList = res.categoryList
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    initSubCategory: function () {
      $.ajax({
        url: '/subCategory/all',
        type: 'GET',
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            app.$data.subCategoryList = res.subCategoryList
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    initSeriesList: function () {
      $.ajax({
        url: '/itemSeries/all',
        type: 'GET',
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            app.$data.seriesList = res.seriesList
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    initColor: function () {
      $.ajax({
        url: '/color/all',
        type: 'GET',
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            app.$data.colorList = res.colorList
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    initSize: function () {
      $.ajax({
        url: '/size/all',
        type: 'GET',
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            app.$data.sizeList = res.sizeList
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    initMaterial: function () {
      $.ajax({
        url: '/material/all',
        type: 'GET',
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            app.$data.materialList = res.materialList
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    initMadeCountry: function () {
      $.ajax({
        url: '/country/all',
        type: 'GET',
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            app.$data.countryList = res.countryList
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },

    initUpdateData: function () {
      if(this.optionType !== 'upd'){
        return false;
      }
      $.ajax({
        url: '/addItem/detail?itemID=' + this.itemID,
        type: 'GET',
        dataType: 'json',
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            app.$data.itemCode = res.data.itemCode;
            app.$data.selectedItemStatus = res.data.itemStatus;
            app.$data.selectedBrand = res.data.brandID;
            app.$data.selectedCategory = res.data.categoryID;
            app.$data.selectedSubCategory = res.data.subCategoryID;
            app.$data.selectedSeries = res.data.seriesID;
            app.$data.itemNameCN = res.data.itemNameCN;
            app.$data.itemNameEN = res.data.itemNameEN;
            app.$data.unitPrice4RMB = res.data.unitPrice4RMB.toString();
            app.$data.promotionPrice4RMB = res.data.promotionPrice4RMB.toString();
            app.$data.unitPrice4USD = res.data.unitPrice4USD.toString();
            app.$data.promotionPrice4USD = res.data.promotionPrice4USD.toString();
            app.$data.rate = res.data.rate.toString();
            app.$data.selectedColor = res.data.colorID;
            app.$data.selectedSize = res.data.sizeID;
            app.$data.selectedMaterial = res.data.materialID;
            app.$data.selectedMadeIn = res.data.madeInID;
            app.$data.itemLength = res.data.itemLength;
            app.$data.adjustLength = res.data.adjustLength;
            app.$data.suitablePetCN = res.data.suitablePetCN;
            app.$data.suitablePetEN = res.data.suitablePetEN;
            app.$data.itemShortDescriptionCN = res.data.itemShortDescriptionCN;
            app.$data.itemShortDescriptionEN = res.data.itemShortDescriptionEN;
            app.$data.itemDescriptionCN = res.data.itemDescriptionCN;
            app.$data.itemDescriptionEN = res.data.itemDescriptionEN;
            app.$data.itemCodeValid = true;
            app.$data.itemNameCNValid = true;
            app.$data.itemNameENValid = true;
            app.$data.unitPriceValid4RMB = true;
            app.$data.promotionPriceValid4RMB = true;
            app.$data.unitPriceValid4USD = true;
            app.$data.promotionPriceValid4USD = true;
            app.$data.rateValid = true;
            $('#form-field-itemCode').attr('disabled', 'disabled');
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('无法连接网络,，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    checkItemName: function (itemName, lan) {
      if($.trim(itemName).length === 0
          || app.$data.selectedBrand === 0
          || app.$data.selectedCategory === 0
          || app.$data.selectedSubCategory === 0){
        return false;
      }
      $.ajax({
        url: '/addItem/checkItemName?brandID=' + app.$data.selectedBrand +
        '&categoryID=' + app.$data.selectedCategory +
        '&subCategoryID=' + app.$data.selectedSubCategory +
        '&seriesID=' + app.$data.selectedSeries +
        '&itemName=' + itemName,
        type: 'GET',
        success: function(res){
          if(res.err){
            lan === 'CN' ?
                app.$data.itemNameCNValid = false :
                app.$data.itemNameENValid = false;
            lan === 'CN' ?
                propAlert(res.msg, '#form-field-itemNameCN') :
                propAlert(res.msg, '#form-field-itemNameEN');
          }else if(res.exist){
            lan === 'CN' ?
                app.$data.itemNameCNValid = false :
                app.$data.itemNameENValid = false;
            lan === 'CN' ?
                propAlert('商品名称' + itemName + '已存在。', '#form-field-itemNameCN') :
                propAlert('商品名称' + itemName + '已存在。', '#form-field-itemNameEN');
          }else{
            lan === 'CN' ?
                app.$data.itemNameCNValid = true :
                app.$data.itemNameENValid = true;
            lan === 'CN' ?
                resetInputStatus('#form-field-itemNameCN') :
                resetInputStatus('#form-field-itemNameEN');
          }
        },
        error: function(XMLHttpRequest, textStatus){
          showMessage('远程服务无响应，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onBrandChange: function () {
      if(parseInt(this.selectedBrand) === 0){
        return false;
      }
      this.checkItemName(this.itemNameCN, 'CN');
      this.checkItemName(this.itemNameEN, 'EN');
    },
    onCategoryChange: function () {
      if(parseInt(this.selectedCategory) === 0){
        return false;
      }
      this.checkItemName(this.itemNameCN, 'CN');
      this.checkItemName(this.itemNameEN, 'EN');
    },
    onSubCategoryChange: function () {
      if(parseInt(this.selectedCategory) === 0){
        return false;
      }
      this.checkItemName(this.itemNameCN, 'CN');
      this.checkItemName(this.itemNameEN, 'EN');
    },
    onSeriesChange: function () {
      if(parseInt(this.selectedSeries) === 0){
        return false;
      }
      this.checkItemName(this.itemNameCN, 'CN');
      this.checkItemName(this.itemNameEN, 'EN');
    },
    onItemNameCNBlur: function () {
      if(this.optionType === 'upd'){
        return false;
      }
      app.checkItemName(app.$data.itemNameCN, 'CN');
    },
    onItemNameENBlur: function () {
      if(this.optionType === 'upd'){
        return false;
      }
      app.checkItemName(app.$data.itemNameEN, 'EN');
    },
    onItemCodeBlur: function () {
      if($.trim(this.itemCode).length === 0 || this.optionType === 'upd'){
        return false;
      }
      $.ajax({
        url: '/addItem/checkItemCode?itemCode=' + app.$data.itemCode,
        type: 'GET',
        success: function(res){
          if(res.err){
            app.$data.itemCodeValid = false;
            propAlert(res.msg, '#form-field-itemCode');
          }else if(res.exist){
            app.$data.itemCodeValid = false;
            propAlert('商品编码' + app.$data.itemCode + '已存在。', '#form-field-itemCode');
          }else{
            app.$data.itemCodeValid = true;
            resetInputStatus('#form-field-itemCode');
          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('无法连接网络,，状态码：' + XMLHttpRequest.status);
        }
      });
    },
    onUnitPrice4RMBBlur: function () {
      if(app.$data.unitPrice4RMB.length === 0){
        return false;
      }
      var result = isDecimal(app.$data.unitPrice4RMB);
      if(result){
        app.$data.unitPriceValid4RMB = true;
        resetInputStatus('#form-field-unitPrice4RMB');
      }else{
        app.$data.unitPriceValid4RMB = false;
        propAlert('请输入正确的单价！', '#form-field-unitPrice4RMB');
      }
    },
    onPromotionPrice4RMBBlur: function () {
      if(app.$data.promotionPrice4RMB.length === 0){
        return false;
      }
      var result = isDecimal(app.$data.promotionPrice4RMB);
      if(result){
        app.$data.promotionPriceValid4RMB = true;
        resetInputStatus('#form-field-promotionPrice4RMB');
      }else{
        app.$data.promotionPriceValid4RMB = false;
        propAlert('请输入正确的促销价！', '#form-field-promotionPrice4RMB');
      }
    },
    onUnitPrice4USDBlur: function () {
      if(app.$data.unitPrice4USD.length === 0){
        return false;
      }
      var result = isDecimal(app.$data.unitPrice4USD);
      if(result){
        app.$data.unitPriceValid4USD = true;
        resetInputStatus('#form-field-unitPrice4USD');
      }else{
        app.$data.unitPriceValid4USD = false;
        propAlert('请输入正确的单价！', '#form-field-unitPrice4USD');
      }
    },
    onPromotionPrice4USDBlur: function () {
      if(app.$data.promotionPrice4USD.length === 0){
        return false;
      }
      var result = isDecimal(app.$data.promotionPrice4USD);
      if(result){
        app.$data.promotionPriceValid4USD = true;
        resetInputStatus('#form-field-promotionPrice4USD');
      }else{
        app.$data.promotionPriceValid4USD = false;
        propAlert('请输入正确的促销价！', '#form-field-promotionPrice4USD');
      }
    },

    onRateBlur: function () {
      if(app.$data.rate.length === 0){
        return false;
      }
      var result = isRate(app.$data.rate);
      if(result){
        app.$data.rateValid = true;
        resetInputStatus('#form-field-rate');
      }else{
        app.$data.rateValid = false;
        propAlert('请输入正确的折扣，折扣只能输入小数！', '#form-field-rate');
      }
    },
    onSave: function () {
      var saveData = {
        itemID: this.itemID,
        brandID: this.selectedBrand,
        categoryID: this.selectedCategory,
        subCategoryID: this.selectedSubCategory,
        seriesID: this.selectedSeries,
        itemCode: this.itemCode,
        itemNameCN: this.itemNameCN,
        itemNameEN: this.itemNameEN,
        unitPrice4RMB: this.unitPrice4RMB,
        promotionPrice4RMB: this.promotionPrice4RMB,
        unitPrice4USD: this.unitPrice4USD,
        promotionPrice4USD: this.promotionPrice4USD,
        rate: this.rate,
        colorID: this.selectedColor,
        sizeID: this.selectedSize,
        materialID: this.selectedMaterial,
        madeInID: this.selectedMadeIn,
        itemLength: this.itemLength,
        adjustLength: this.adjustLength,
        suitablePetCN: this.suitablePetCN,
        suitablePetEN: this.suitablePetEN,
        itemShortDescriptionCN: this.itemShortDescriptionCN,
        itemShortDescriptionEN: this.itemShortDescriptionEN,
        itemDescriptionCN: this.itemDescriptionCN,
        itemDescriptionEN: this.itemDescriptionEN,
        itemStatus: this.selectedItemStatus,
        loginUser: getLoginUser()
      };

      var requestType = 'POST';
      if(this.optionType === 'upd'){
        requestType = 'PUT';
      }
      $.ajax({
        url: '/addItem',
        type: requestType,
        dataType: 'json',
        data: saveData,
        success: function(res){
          if(res.err){
            propAlert(res.msg);
          }else{
            if(app.$data.optionType === 'add'){
              location.href = '/uploadItemImage?optionType=' + app.$data.optionType + '&itemID=' + res.data.responseData;
            }else{
              location.href = '/uploadItemImage?optionType=' + app.$data.optionType + '&itemID=' + app.$data.itemID;
            }

          }
        },
        error: function(XMLHttpRequest, textStatus){
          propAlert('无法连接网络,，状态码：' + XMLHttpRequest.status);
        }
      });
    }
  },
  mounted: function () {
    this.initProcess();
  }
});