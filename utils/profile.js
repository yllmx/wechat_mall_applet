const app = getApp()

function getZichanSlides (resolve) {
  wx.request({
    url: `${app.globalData.API_URL}/profiles/zichan_sildes`,
    data: {token: app.globalData.token},
    header: { 'Content-Type': 'application/json'},
    success: resolve,
    fail: function(){}
  })
}

function getCustomerInfo (data, cb) {
  data['code'] = app.globalData.code
  wx.request({
    url: `${app.globalData.API_URL}/sessions/new`,
    header: { 'Content-Type': 'application/json'},
    data: data,
    success: function(res) {
      if (res.data.code === 4) {
        return
      } else if (res.data.code === 5) {
        wx.showModal({
          title: '错误',
          content: `${res.data.msg}`,
          showCancel: false,
          success: function(res) {
          }
        })
        return
      }
      var pages = getCurrentPages()
      pages[pages.length-1].setData({needBindMobile: false})
      app.globalData.currentCustomer = res.data.customer
      app.globalData.token = res.data.token
      wx.setStorage({
        key: 'userToken',
        data: res.data.token
      })
      typeof cb == "function" && cb(app.globalData.currentCustomer)
    },
    fail: function(res) {
    }
  })
}

function getPassCode (mobile, cb) {
  wx.request({
    url: `${app.globalData.API_URL}/profiles/get_mobile_passcode`,
    header: { 'Content-Type': 'application/json'},
    data: {
      mobile: mobile
    },
    success: cb,
    fail: function(res) {
    }
  })
}

module.exports = {
  getZichanSlides (resolve) {
    return getZichanSlides(resolve)
  },
  getCustomerInfo (data, resolve) {
    return getCustomerInfo(data, resolve)
  },
  getPassCode (mobile, cb) {
    return getPassCode(mobile, cb)
  }
}