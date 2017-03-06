/**
 * Created by dchambi on 03/02/2017.
 */
// var config = module.exports;
const config = module.exports;

config.express = {
  port: process.env.EXPRESS_PORT || 8000,
  ip: '192.168.4.34' || process.env.EXPRESS_IP,
};
