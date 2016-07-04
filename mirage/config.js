import ENV from 'knockout/config/environment';

export default function() {
  this.passthrough(`https://${ENV['auth0-ember-simple-auth'].domain}/**`);

  this.get('/tournaments');
  this.get('/tournaments/:id');
  this.get('/followings');
  this.post('/followings');
  this.patch('/followings/:id');
  this.del('/followings/:id');
  this.post('/spoilers');
  this.post('/watchings');
  this.del('/watchings/:id');
  this.post('/likes');
  this.del('/likes/:id');

  this.get('/users/:id', function(schema, request) {
    const user = schema.users.find(request.params.id);

    if (!user) {
      return schema.users.create();
    }

    return user;
  });
}
