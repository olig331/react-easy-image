const path = require('path');

module.exports = {
   entry: "./src/app.js",
   output: {
      filename: "bundle.js",
      path: path.join(__dirname, 'public')
   },
   module: {
      rules: [
         {
            test: /\.(jsx|js|ts|tsx)$/,
            exclude: /node_modules/,
            use: {
               loader: 'babel-loader',
            },
         },
         {
            test: /\.(js|jsx|png|jpg|svg|gif|ico)$/,
            exclude: /node_modules/,
            use: "babel-loader"
         },
         {
            test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
            use: [{
               loader: 'url-loader',
               options: {
                  limit: 10000,
               }
            }],
         },
         {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
         }
      ],
   },

   devServer: {
      contentBase: path.join(__dirname, 'public'),
      port: 3000
   }
}