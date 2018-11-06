This is a babel project meant to demonstrate an issue I'm facing with VSCode where it doesn't seem able to resolve aliased paths correctly

The folder structure for this project looks like this:

```
src/
  lib/
    parser/
      index.js
    index.js
  routes/
    index.js
  index.js
```

My goal is to refer to `'src/lib/parser/index.js'` from anywhere using `'@lib/parser'` and have VSCode recognize that resolution so that it could "Go to definition"

You can can see this project working by running `npm run start` or `yarn start`. The main reason behind that is in `.bablerc`. In there you will see this section:

```
["module-resolver", {
  "root": [ "." ],
  "alias": {
    "^@(.+)": "./src/\\1"
  }
}]
```

the alias `"^@(.+)": "./src/\\1"` here transforms anything that starts with an `@` to resolve in `./src/`

The only issue is, the equivelant of `module-resolver` in VSCode is to add a `compilerOptions` in your `jsconfig.json`

A lot of people have posted many solutions, but after following as many of them as I can I was still left with VSCode unable to "Go to definition" and resolve to the correct path.

## Research Thus far

As of this moment this is the best I could come up with based on what I understand.

```
{
  "compilerOptions": {
    "moduleResolution": "node",
    "baseUrl": ".",
    "paths": {
      "@*": [ "src/*" ]
    }
  },
  "include": ["**/*.js"],
  "exclude": ["node_modules", "**/node_modules/*", "dist"]
}
```

I'm keen to keep the `baseURL` at `.` because I intend on having other folders aside from `src`.

As for the `moduleResolution`, [aphillipo] had written that it would be [necessary if you have your exports from your alias in an index.js file.][aphillipo indexjs] in this [mega issue][similarIssue_1]

Following the rules in the [Module Resolution Handbook] especially in this section:

>1. `"*"`: meaning the same name unchanged, so map `<moduleName> => <baseUrl>/<moduleName>`
>2. `"generated/*"` meaning the module name with an appended prefix "generated", so map `<moduleName> => <baseUrl>/generated/<moduleName>`

I set my `"paths"` to `"@*": [ "src/*" ]`


----

What Can I do to make module resolution work for this project?


[Module Resolution Handbook]: https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Module%20Resolution.md#path-mapping

[aphillipo indexjs]: https://github.com/Microsoft/vscode/issues/16320#issuecomment-380761115

[aphillipo]: https://github.com/aphillipo

[similarIssue_1]: https://github.com/Microsoft/vscode/issues/16320