##Configuration

### tsconfig.json

Sample:

```json
{
    "extends": "./node_modules/yeanay-commons/base/tsconfig.base",

    "compilerOptions": {
        "rootDir": ".",
        "sourceRoot": ".",
        "outDir": "./lib"
    },
    "include": [
        "./src/**/*",
        "./*"
    ],
    "exclude": ["./src/**/__tests__/*"]
}
```

### tslint.json

Sample:
```json
/**
  * These rule settings are a broad, general recommendation for a good default
  * configuration, but should be tuned for personal or team preferences if needed.
  */

{
"extends": "./node_modules/yeanay-commons/base/tslint.base.json"
}
```
