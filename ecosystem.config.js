module.exports = {
    apps: [
      {
        name: 'blog',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs',
        env: {
            "PORT": 10001,
            "NODE_ENV": "development"
        },
      }
    ],
  }
