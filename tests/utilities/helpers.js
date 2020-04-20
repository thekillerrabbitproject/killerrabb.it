'use strict';

const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const homedir = require('os').homedir();

// via WebPageTest settings
// WPO-Foundation/webpagetest/blob/master/www/settings/connectivity.ini.sample
const NETWORK = {
  edge: {
    offline: false,
    latency: 840,
    downloadThroughput: 240000,
    uploadThroughput: 240000,
  },
  twog: {
    offline: false,
    latency: 800,
    downloadThroughput: 280000,
    uploadThroughput: 256000,
  },
  threegslow: {
    offline: false,
    latency: 400,
    downloadThroughput: 400000,
    uploadThroughput: 400000,
  },
  threeg: {
    offline: false,
    latency: 300,
    downloadThroughput: 1600000,
    uploadThroughput: 768000,
  },
  threegfast: {
    offline: false,
    latency: 170,
    downloadThroughput: 1600000,
    uploadThroughput: 768000,
  },
  fourg: {
    offline: false,
    latency: 150,
    downloadThroughput: 9000000,
    uploadThroughput: 9000000,
  },
  lte: {
    offline: false,
    latency: 70,
    downloadThroughput: 12000000,
    uploadThroughput: 12000000,
  },
};

/**
 * launch Chrome via Puppeteer, use puppeteer to throttle connection, run
lighthouse. Not ideal; would prefer adv throttle via comcast os level util
 *
 * @param {string} url - browser url.
 * @param {object} opts - options for.this thing
 * @param {object} config - object this thing
 * @returns {Promise} - returns browser?!
 * @example launchChromeAndRunLighthouse(url, opts, config) fuck that
 */
async function launchChromeAndRunLighthouse(url, opts, config) {
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null,
    args: ['--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage'],
  });

  browser.on('targetchanged', async target => {
    const page = await target.page();

    if (page && page.target().url() === url) {
      await page
        .target()
        .createCDPSession()
        .then(client => {
          return client.send(
            'Network.emulateNetworkConditions',
            NETWORK[opts.connection]
          );
        })
        .catch(err => {
          return browser.close().then(() => {
            return new Error(err);
            // eslint-disable-next-line unicorn/no-process-exit
          }, process.exit(1));
        });
    }
  });

  opts.port = new URL(browser.wsEndpoint()).port;
  return lighthouse(url, opts, config)
    .then(results => {
      return browser.close().then(() => results);
    })
    .catch(err => {
      return browser.close().then(() => {
        throw err;
        // eslint-disable-next-line unicorn/no-process-exit
      }, process.exit(1));
    });
}

module.exports = {
  launchChromeAndRunLighthouse: launchChromeAndRunLighthouse,
  homedir: homedir,
};
