                    let config = {
                      mode: 'development',
                      resolve: {
                        modules: [
                          "node_modules"
                        ]
                      },
                      plugins: [],
                      module: {
                        rules: []
                      },
                      resolveLoader: {
  modules: ['node_modules', process.env['KOTLIN_TOOLING_DIR']]
}
                    };
                    
// entry
config.entry = {
    main: [require('path').resolve(__dirname, "kotlin/KotlinProject-webApp.mjs")]
};
config.output = {
    filename: (chunkData) => {
        return chunkData.chunk.name === 'main'
            ? "webApp.js"
            : "webApp-[name].js";
    },
    library: "webApp",
    libraryTarget: "umd",
    clean: true,
    globalObject: "globalThis"
};
// source maps
config.module.rules.push({
        test: /\.m?js$/,
        use: ["source-map-loader"],
        enforce: "pre"
});
config.devtool = false;
config.ignoreWarnings = [
    /Failed to parse source map/,
    /Accessing import\.meta directly is unsupported \(only property access or destructuring is supported\)/
];  
;(function(config) {
    const webpack = require("webpack"); 
    const EvalSourceMapDevToolPlugin = webpack.EvalSourceMapDevToolPlugin;
    config.plugins.push(new EvalSourceMapDevToolPlugin({
                            "module": true,
                "columns": true,
                "noSources": false,
                "ignoreList": /NATIVE_IMPLEMENTATIONS.kt/
    }))
})(config);

// dev server
config.devServer = {
  "open": true,
  "client": {
    "overlay": {
      "errors": true,
      "warnings": false
    }
  },
  "static": [
    {
      "directory": require('path').resolve(__dirname, "kotlin"),
      "watch": false
    },
    {
      "directory": require('path').resolve(__dirname, "../../../../webApp/build/processedResources/wasmJs/main"),
      "watch": false
    },
    {
      "directory": require('path').resolve(__dirname, "../../../.."),
      "watch": false
    }
  ]
};

                config.watchOptions = {
  "ignored": [
    "**/node_modules",
    "**/*.kt"
  ]
};
// noinspection JSUnnecessarySemicolon
;(function(config) {
    const tcErrorPlugin = require('kotlin-web-helpers/dist/tc-log-error-webpack');
    config.plugins.push(new tcErrorPlugin())
    config.stats = config.stats || {}
    Object.assign(config.stats, config.stats, {
        warnings: false,
        errors: false
    })
})(config);
;(function(config) {
    const webpack = require("webpack"); 
    const DefinePlugin = webpack.DefinePlugin;
    config.plugins.push(new DefinePlugin({
                            "typeof process": JSON.stringify('undefined'),
                "typeof Deno": JSON.stringify('undefined'),
                "typeof d8": JSON.stringify('undefined'),
                "typeof inIon": JSON.stringify('undefined'),
                "typeof jscOptions": JSON.stringify('undefined')
    }))
})(config);

config.experiments = {
    asyncWebAssembly: true,
    topLevelAwait: true,
}
// section: Extra JS code from KotlinWebpackConfig.extraJs
// section end
module.exports = config
