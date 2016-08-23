/* eslint-disable */
;(function () {
  var progress = new Progress()
  var start = $('.demo-1 .start')
  var stop = $('.demo-1 .stop')

  start.on('click', function () {
    progress.start()
  })

  stop.on('click', function() {
    progress.end()
  })
})()

;(function () {
  var progress = new Progress()
  var sendRequest = $('.demo-2 .send-ajax')
  var requestResult = $('.demo-2 .request-result')
  var $document = $(document)
  var requestList = []

  $document.ajaxSend(function (event, xhr, option) {
    requestList.push(option.url)
    if (progress.status !== 'loading') {
      progress.start()
    }
  })
  $document.ajaxComplete(function (event, xhr, option) {
    requestList.splice(requestList.indexOf(option.url), 1)
    if (!requestList.length) {
      progress.end()
    }
  })
  sendRequest.on('click', function () {
    $.get('/').success(function () {
      requestResult.html('request finished') 
    })
  })
})()

;(function () {
  var progress = new Progress()
  var angularDemo = angular.module('app', [])
  var requestList = []
  var requestResult = $('.demo-3 .request-result')
  angularDemo.factory('httpInterceptor', function () {
    var responseInterceptor = {
      request: function (config) {
        requestList.push(config.url)
        if (progress.status !== 'loading') {
          progress.start()
        }
        return config
      },
      response: function (response) {
        requestList.splice(requestList.indexOf(response.config.url), 1)
        if (!requestList.length) {
          progress.end()
        }
        return response
      }
    }
    return responseInterceptor
  })
  angularDemo.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('httpInterceptor')
  }])
  angularDemo.controller('ctrl', function ($http) {
    this.makeRequest = function () {
      $http.get('/').then(function (res) {
        requestResult.html('request finished') 
      })
    }
  })
})()
