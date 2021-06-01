## SETUP ESLINT
1. npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
2. touch .eslintignore
```node_modules
dist
```
3. touch .eslintrc
```{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint"
  ],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ], 
  "rules": { 
    "no-useless-escape": "off",
    "@typescript-eslint/no-empty-function": [
      "error", { 
        "allow": ["arrowFunctions", "constructors"] 
      }
    ],
    "@typescript-eslint/ban-types": ["error",
      {
          "types": {
              "Object": false,
              "object": false,
              "Function": false
          },
          "extendDefaults": true
      }
    ]
  }
}
```
4. Add line (2) into package.json
```1."scripts": {
2.  "check": "eslint src --fix --ext .ts",
3.}
```

5. Run eslint
```bash
npm run check
```

## SETUP PRETTIER
1. npm install --save-dev prettier
2. npm install --save-dev eslint-config-prettier eslint-plugin-prettier
3. touch ..prettierrc
```{
  "semi": true,
  "trailingComma": "none",
  "singleQuote": true,
  "printWidth": 120
}```

4. modify .eslintrc
```{
  "plugins": [
    "prettier" <-- add this line
  ],
  "extends": [
    "prettier" <-- add this line
  ], 
  "rules": { 
    "prettier/prettier": 2, <-- add this line
  }
}
```

4. Run eslint
```bash
npm run check
```

## RUN
1. npm install
2. npm run webpack
3. Open new terminal and run command
```bash
npm start
```