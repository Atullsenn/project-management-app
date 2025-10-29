export default () => ({
  jwtSecret: process.env.JWT_SECRET || 'project_management_Fj84nK2qL8mZd9!tVxY4Rq',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h',
});
