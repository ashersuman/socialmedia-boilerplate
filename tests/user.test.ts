import request from 'supertest';
import app from '../src/index'; // Import your Express app instance

describe('User API Endpoints', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({
        username: 'testUser',
        email: 'test@example.com',
      });
    
    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User created successfully');
  });

  it('should retrieve a user by ID', async () => {
    const user = await request(app)
      .post('/api/users')
      .send({
        username: 'testUser',
        email: 'test@example.com',
      });

    const res = await request(app).get(`/api/users/${user.body._id}`);
    
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('username', 'testUser');
  });
});
