module.exports = function (api) {
    api.cache(true);
    return {
        presets: ["babel-preset-expo"],
        plugins: [
            [
                "module-resolver",
                {
                    root: ["./src"],
                    extensions: [".tsx", ".json"],
                    alias: {
                        "@components": "./src/components",
                    },
                },
            ],
        ],
    };
};
