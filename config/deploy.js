/* jshint node: true */

module.exports = function(deployTarget) {
  var ENV = {
    build: {
      environment: 'production'
    },

    pipeline: {
      // This setting runs the ember-cli-deploy activation hooks on every deploy
      // which is necessary in order to run ember-cli-deploy-cloudfront.
      // To disable CloudFront invalidation, remove this setting or change it to `false`.
      // To disable ember-cli-deploy-cloudfront for only a particular environment, add
      // `ENV.pipeline.activateOnDeploy = false` to an environment conditional below.
      activateOnDeploy: true
    },

    s3: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_REGION
    },

    's3-index': {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      bucket: process.env.AWS_BUCKET,
      region: process.env.AWS_REGION
    },

    'revision-data': {
      'type': 'version-commit'
    }
  };

  if (deployTarget === 'staging') {}
  if (deployTarget === 'production') {}

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
