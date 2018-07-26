const assert = require('assert');
const request = require('supertest');
const utils = require('./utils');
const mm = require('mm');

describe('/test/loader.test.ts', () => {

  describe('load ts file', () => {
    let app;
    before(() => {
      app = utils.app('base-app', {
        typescript: true
      });
      return app.ready();
    });

    after(() => app.close());

    it('should load ts directory', (done) => {
      request(app.callback())
        .get('/api')
        .expect(200)
        .expect('hello', done);
    });
  });

  describe('load ts file and use config, plugin decorator', () => {
    let app;
    before(() => {
      app = utils.app('base-app-decorator', {
        typescript: true
      });
      return app.ready();
    });

    after(() => app.close());

    it('should load ts directory', (done) => {
      request(app.callback())
        .get('/api')
        .expect(200)
        .expect(/3t/, done);
    });
  });

  describe('load ts file and use third party module', () => {
    let app;
    before(() => {
      app = utils.app('base-app-utils', {
        typescript: true
      });
      return app.ready();
    });

    after(() => app.close());

    it('should load ts directory and inject module', (done) => {
      request(app.callback())
        .get('/api/test')
        .expect(200)
        .expect('false3', done);
    });
  });

  describe('load ts file and use async init', () => {
    let app;
    before(() => {
      app = utils.app('base-app-async', {
        typescript: true
      });
      return app.ready();
    });

    after(() => app.close());

    it('should load ts directory and inject module', (done) => {
      request(app.callback())
        .get('/api')
        .expect(200)
        .expect('10t', done);
    });
  });

  describe('load ts file support constructor inject', () => {
    let app;
    before(() => {
      app = utils.app('base-app-constructor', {
        typescript: true
      });
      return app.ready();
    });

    after(() => app.close());

    it('should load ts directory and inject in constructor', (done) => {
      request(app.callback())
        .get('/api/test')
        .expect(200)
        .expect('63t', done);
    });
  });

  describe('auto load function file and inject by function name', () => {
    let app;
    before(() => {
      app = utils.app('base-app-function', {
        typescript: true
      });
      return app.ready();
    });

    after(() => app.close());

    it('should load ts directory and inject in constructor', (done) => {
      request(app.callback())
        .get('/api')
        .expect(200)
        .expect('63t', done);
    });
  });
});