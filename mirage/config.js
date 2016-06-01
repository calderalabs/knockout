import ENV from 'knockout/config/environment';
import { faker } from 'ember-cli-mirage';

export default function() {
  this.passthrough(`https://${ENV['auth0-ember-simple-auth'].domain}/**`);

  this.get('/tournaments');
  this.get('/tournaments/:id');
  this.get('/followings');
  this.post('/followings');
  this.del('/followings/:id');
  this.post('/spoilers');

  this.get('/users/:id', function(schema, request) {
    const user = schema.users.find(request.params.id);

    if (!user) {
      return schema.users.create({
        name: faker.name.findName()
      });
    }

    return user;
  });
}
