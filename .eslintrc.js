module.exports = {
  root: true,

  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "prettier",
    "react",
    "react-native",
    "react-hooks"
  ],
  env: { "react-native/react-native": true },
  extends: [
    '@react-native-community',
    "eslint:recommended",

    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from the @typescript-eslint/eslint-plugin

    "plugin:react/recommended", // Enable recommended React specific rules

    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors
    "prettier/react", // Uses eslint-config-prettier to disable ESLint rules regarding React that would conflict with prettier
    "prettier/@typescript-eslint" // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
  ],
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    extraFileExtensions: [".json"],
    project: "./tsconfig.json",
    sourceType: "module", // Allows for the use of imports
    useJSXTextNode: false
  },
  settings: {
    react: {
      pragma: "React", // Pragma to use, default to "React"
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  rules: {
    "no-catch-shadow": "off",
    "no-shadow": "off",
    "no-console": "off",

    "prettier/prettier": "error",

    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // React
    "react/boolean-prop-naming": "off", // Enforces consistent naming for boolean props
    "react/button-has-type": "off", // Forbid "button" element without an explicit "type" attribute
    "react/default-props-match-prop-types": "off", // Prevent extraneous defaultProps on components
    "react/destructuring-assignment": "off", // Rule enforces consistent usage of destructuring assignment in component
    "react/display-name": "off", // Prevent missing displayName in a React component definition
    "react/forbid-component-props": "off", // Forbid certain props on Components
    "react/forbid-dom-props": "off", // Forbid certain props on DOM Nodes
    "react/forbid-elements": "off", // Forbid certain elements
    "react/forbid-prop-types": "off", // Forbid certain propTypes
    "react/forbid-foreign-prop-types": "off", // Forbid foreign propTypes
    "react/no-access-state-in-setstate": "error", // Prevent using this.state inside this.setState
    "react/no-array-index-key": "off", // Prevent using Array index in key props
    "react/no-children-prop": "off", // Prevent passing children as props
    "react/no-danger": "off", // Prevent usage of dangerous JSX properties
    "react/no-danger-with-children": "off", // Prevent problem with children and props.dangerouslySetInnerHTML
    "react/no-deprecated": "error", // Prevent usage of deprecated methods, including component lifecyle methods
    "react/no-did-mount-set-state": "error", // Prevent usage of setState in componentDidMount
    "react/no-did-update-set-state": "error", // Prevent usage of setState in componentDidUpdate
    "react/no-direct-mutation-state": "error", // Prevent direct mutation of this.state
    "react/no-find-dom-node": "off", // Prevent usage of findDOMNode
    "react/no-is-mounted": "error", // Prevent usage of isMounted
    "react/no-multi-comp": "off", // Prevent multiple component definition per file
    "react/no-redundant-should-component-update": "error", // Prevent usage of shouldComponentUpdate when extending React.PureComponent
    "react/no-render-return-value": "off", // Prevent usage of the return value of React.render
    "react/no-set-state": "off", // Prevent usage of setState
    "react/no-typos": "off", // Prevent common casing typos
    "react/no-string-refs": "error", // Prevent using string references in ref attribute.
    "react/no-this-in-sfc": "error", // Prevent using this in stateless functional components
    "react/no-unescaped-entities": "off", // Prevent invalid characters from appearing in markup
    "react/no-unknown-property": "off", // Prevent usage of unknown DOM property (fixable)
    "react/no-unsafe": "error", // Prevent usage of unsafe lifecycle methods
    "react/no-unused-prop-types": "error", // Prevent definitions of unused prop types
    "react/no-unused-state": "error", // Prevent definitions of unused state properties
    "react/no-will-update-set-state": "error", // Prevent usage of setState in componentWillUpdate
    "react/prefer-es6-class": "off", // Enforce ES5 or ES6 class for React Components
    "react/prefer-stateless-function": "off", // Enforce stateless React Components to be written as a pure function
    "react/prop-types": "off", // Prevent missing props validation in a React component definition
    "react/react-in-jsx-scope": "error", // Prevent missing React when using JSX
    "react/require-default-props": "off", // Enforce a defaultProps definition for every prop that is not a required prop
    "react/require-optimization": "off", // Enforce React components to have a shouldComponentUpdate method
    "react/require-render-return": "error", // Enforce ES5 or ES6 class for returning value in render function
    "react/self-closing-comp": "error", // Prevent extra closing tags for components without children (fixable)
    "react/sort-comp": "off", // Enforce component methods order (fixable)
    "react/sort-prop-types": "off", // Enforce propTypes declarations alphabetical sorting
    // "react/state-in-constructor": ["error", "never"], // Enforce the state initialization style to be either in a constructor or with a class property
    "react/style-prop-object": "off", // Enforce style prop value being an object
    "react/void-dom-elements-no-children": "off", // Prevent void DOM elements (e.g. <img />, <br />) from receiving children

    // React/JSX
    "react/jsx-boolean-value": ["error", "never"], // Enforce boolean attributes notation in JSX (fixable)
    "react/jsx-child-element-spacing": "off", // Enforce or disallow spaces inside of curly braces in JSX attributes and expressions.
    "react/jsx-closing-bracket-location": "error", // Validate closing bracket location in JSX (fixable)
    "react/jsx-closing-tag-location": "error", // Validate closing tag location in JSX (fixable)
    "react/jsx-curly-spacing": "error", // Enforce or disallow spaces inside of curly braces in JSX attributes and expressions (fixable)
    "react/jsx-equals-spacing": "error", // Enforce or disallow spaces around equal signs in JSX attributes (fixable)
    "react/jsx-filename-extension": "off", // Restrict file extensions that may contain JSX
    "react/jsx-first-prop-new-line": "off", // Enforce position of the first prop in JSX (fixable)
    "react/jsx-handler-names": "off", // Enforce event handler naming conventions in JSX
    "react/jsx-indent": "off", // Validate JSX indentation (fixable)
    "react/jsx-indent-props": "off", // Validate props indentation in JSX (fixable)
    "react/jsx-key": "error", // Validate JSX has key prop when in array or iterator
    "react/jsx-max-depth": "off", // Validate JSX maximum depth
    "react/jsx-max-props-per-line": "off", // Limit maximum of props on a single line in JSX (fixable)
    "react/jsx-no-bind": "off", // Prevent usage of .bind() and arrow functions in JSX props
    "react/jsx-no-comment-textnodes": "off", // Prevent comments from being inserted as text nodes
    "react/jsx-no-duplicate-props": "error", // Prevent duplicate props in JSX
    "react/jsx-no-literals": "off", // Prevent usage of unwrapped JSX strings
    "react/jsx-no-target-blank": "off", // Prevent usage of unsafe target='_blank'
    "react/jsx-no-undef": "error", // Disallow undeclared variables in JSX
    "react/jsx-one-expression-per-line": "off", // Limit to one expression per line in JSX
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "ignore" }
    ], // Enforce curly braces or disallow unnecessary curly braces in JSX
    "react/jsx-fragments": "off", // Enforce shorthand or standard form for React fragments
    "react/jsx-pascal-case": "off", // Enforce PascalCase for user-defined JSX components
    "react/jsx-props-no-multi-spaces": "error", // Disallow multiple spaces between inline JSX props (fixable)
    "react/jsx-props-no-spreading": "off", // Disallow JSX props spreading
    "react/jsx-sort-default-props": "off", // Enforce default props alphabetical sorting
    "react/jsx-sort-props": "off", // Enforce props alphabetical sorting (fixable)
    "react/jsx-space-before-closing": "off", // Validate spacing before closing bracket in JSX (fixable)
    "react/jsx-tag-spacing": "off", // Validate whitespace in and around the JSX opening and closing brackets (fixable)
    "react/jsx-uses-react": "error", // Prevent React to be incorrectly marked as unused
    "react/jsx-uses-vars": "error", // Prevent variables used in JSX to be incorrectly marked as unused
    "react/jsx-wrap-multilines": "off", // Prevent missing parentheses around multilines JSX (fixable)

    // React Native
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": "off",
    "react-native/no-inline-styles": "off",
    "react-native/no-color-literals": 2,
    "react-native/no-raw-text": 2,

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};