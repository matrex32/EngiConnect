const path = require('path');

module.exports = [
  {
    entry: './src/login.js',
    output: {
      path: path.join(__dirname, '../engiconnect/src/main/resources/static/app'),
      filename: 'login.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },

  {
    entry: './src/profile.js',
    output: {
      path: path.join(__dirname, '../engiconnect/src/main/resources/static/app'),
      filename: 'profile.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  }, 

  {
    entry: './src/reset.js',
    output: {
      path: path.join(__dirname, '../engiconnect/src/main/resources/static/app'),
      filename: 'reset.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },

  {
    entry: './src/user-profile.js',
    output: {
      path: path.join(__dirname, '../engiconnect/src/main/resources/static/app'),
      filename: 'user-profile.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },

  {
    entry: './src/searched-user.js',
    output: {
      path: path.join(__dirname, '../engiconnect/src/main/resources/static/app'),
      filename: 'searched-user.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },

  {
    entry: './src/feed.js',
    output: {
      path: path.join(__dirname, '../engiconnect/src/main/resources/static/app'),
      filename: 'feed.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },

  {
    entry: './src/job.js',
    output: {
      path: path.join(__dirname, '../engiconnect/src/main/resources/static/app'),
      filename: 'job.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  },

  {
    entry: './src/library.js',
    output: {
      path: path.join(__dirname, '../engiconnect/src/main/resources/static/app'),
      filename: 'library.js',
    },
    mode: "development",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  }
]