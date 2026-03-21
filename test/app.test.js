const request = require('supertest');
const app = require('../src/app');


//Evaluamos la ruta base, esperando un 200 y que retorne el mensaje de prueba tenica apap y la version del api
describe('GET /', () => {
  test('/ Retorna status 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
 
  test('retorna el mensaje "Prueba Técnica APAP"', async () => {
    const res = await request(app).get('/');
    expect(res.body.message).toBe('Prueba Técnica APAP');
  });
 
  test('retorna un campo version', async () => {
    const res = await request(app).get('/');
    expect(res.body).toHaveProperty('version');
  });
});


//Evaluamos endpoint de health, esperando un 200 y propiedades como status = healthy y otras mas
describe('GET /health',()=>{

  test('Validar que health retorne 200 ', async ()=>{
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
  });

  test('Validar que health retorne propiedad status igual a healthy ', async ()=>{
    const res = await request(app).get('/health');
    expect(res.body.status).toBe('healthy');
  });

  test('retorna los campos timestamp y uptime', async () => {
    const res = await request(app).get('/health');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('uptime');
  });
});





// Ruta de info del api, aqui evaluamos esperar propiedades de info del API
describe('GET /api/info', () => {
  test('retorna status 200', async () => {
    const res = await request(app).get('/api/info');
    expect(res.statusCode).toBe(200);
  });
 
  test('retorna el nombre de la app correcto', async () => {
    const res = await request(app).get('/api/info');
    expect(res.body.app).toBe('prueba-tecnica-apap');
  });
 
  test('retorna un array de endpoints', async () => {
    const res = await request(app).get('/api/info');
    expect(Array.isArray(res.body.endpoints)).toBe(true);
    expect(res.body.endpoints.length).toBeGreaterThan(0);
  });
});
 
// Rutas que no existen 404
describe('Rutas no existentes', () => {
  test('GET /ruta-ficticia retorna status 404', async () => {
    const res = await request(app).get('/ruta-test');
    expect(res.statusCode).toBe(404);
  });
 
  test('GET /ruta-ficticia retorna el mensaje de error correcto', async () => {
    const res = await request(app).get('/home');
    expect(res.body.error).toBe('Ruta no encontrada');
  });
 
  test('POST /ruta-ficticia también retorna 404', async () => {
    const res = await request(app).post('/user/stats');
    expect(res.statusCode).toBe(404);
  });
});
 