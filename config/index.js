'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/Login-0.0.1-SNAPSHOT/login':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/login',
        changeOrigin:true,
        pathRewrite: {
          '^/Login-0.0.1-SNAPSHOT/login': ''
        }
      },
      '/Login-0.0.1-SNAPSHOT/register':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/register',
        changeOrigin:true,
        pathRewrite: {
          '^/Login-0.0.1-SNAPSHOT/register': ''
        }
      },
      '/Login-0.0.1-SNAPSHOT/getFlightById':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/getFlightById',
        changeOrigin:true,
        pathRewrite: {
          '^/Login-0.0.1-SNAPSHOT/getFlightById': ''
        }
      },
      '/Login-0.0.1-SNAPSHOT/getTicket':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/getTicket',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/getTicket':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/getTicketByCondition':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/getTicketByCondition',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/getTicketByCondition':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/getClientInfo':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/getClientInfo',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/getClientInfo':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/getFlightBySAndA':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/getFlightBySAndA',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/getFlightBySAndA':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/addFlight':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/addFlight',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/addFlight':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/addBook':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/addBook',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/addBook':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/deleteFlight':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/deleteFlight',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/deleteFlight':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/updateFlight':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/updateFlight',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/updateFlight':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/getBook':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/getBook',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/getBook':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/deleteBook':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/deleteBook',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/deleteBook':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/updateTicketRest':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/updateTicketRest',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/updateTicketRest':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/getGlobalVar':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/getGlobalVar',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/getGlobalVar':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/updateGlobalVar':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/updateGlobalVar',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/updateGlobalVar':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/addClient':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/addClient',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/addClient':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/getClient':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/getClient',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/getClient':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/deleteClient':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/deleteClient',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/deleteClient':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/updateClient':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/updateClient',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/updateClient':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/addTicket':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/addTicket',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/addTicket':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/deleteTicket':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/deleteTicket',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/deleteTicket':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/updateTicket':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/updateTicket',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/updateTicket':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/getPassenger':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/getPassenger',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/getPassenger':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/getQuantity':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/getQuantity',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/getQuantity':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/getRecommend':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/getRecommend',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/getRecommend':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/updateRecommend':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/updateRecommend',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/updateRecommend':''
        }
      },
      '/Login-0.0.1-SNAPSHOT/updatePassword':{
        target:'http://120.25.192.156/Login-0.0.1-SNAPSHOT/updatePassword',
        changeOrigin:true,
        pathRewrite:{
          '^/Login-0.0.1-SNAPSHOT/updatePassword':''
        }
      },
    },

    // Various Dev Server settings
    host: '0.0.0.0', // can be overwritten by process.env.HOST
    port: 80, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
  // devServer:{
  //   proxy:{
  //     ["/Login-0.0.1-SNAPSHOT/login"]:{
  //       target:'http://120.25.192.156',
  //       changeOrigin:true,
  //       pathRewrite: {
  //         ['^' + "/Login-0.0.1-SNAPSHOT/login"]: ''
  //       }
  //     }
  //   }
  //
  // }
}
