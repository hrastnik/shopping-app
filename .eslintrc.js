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
    extraFileExtensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
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
    "no-console": 0,
    "no-shadow": "off",
    "no-catch-shadow": "off",
    "eslint-comments/no-unlimited-disable": "off",

    "prettier/prettier": "error",

    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/camelcase": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-use-before-define": 0,
    "@typescript-eslint/no-var-requires": 0,
    // React
    "react/boolean-prop-naming": 0, // Enforces consistent naming for boolean props
    "react/button-has-type": 0, // Forbid "button" element without an explicit "type" attribute
    "react/default-props-match-prop-types": 0, // Prevent extraneous defaultProps on components
    "react/destructuring-assignment": 0, // Rule enforces consistent usage of destructuring assignment in component
    "react/display-name": 0, // Prevent missing displayName in a React component definition
    "react/forbid-component-props": 0, // Forbid certain props on Components
    "react/forbid-dom-props": 0, // Forbid certain props on DOM Nodes
    "react/forbid-elements": 0, // Forbid certain elements
    "react/forbid-prop-types": 0, // Forbid certain propTypes
    "react/forbid-foreign-prop-types": 0, // Forbid foreign propTypes
    "react/no-access-state-in-setstate": "error", // Prevent using this.state inside this.setState
    "react/no-array-index-key": 0, // Prevent using Array index in key props
    "react/no-children-prop": 0, // Prevent passing children as props
    "react/no-danger": 0, // Prevent usage of dangerous JSX properties
    "react/no-danger-with-children": 0, // Prevent problem with children and props.dangerouslySetInnerHTML
    "react/no-deprecated": "error", // Prevent usage of deprecated methods, including component lifecyle methods
    "react/no-did-mount-set-state": "error", // Prevent usage of setState in componentDidMount
    "react/no-did-update-set-state": "error", // Prevent usage of setState in componentDidUpdate
    "react/no-direct-mutation-state": "error", // Prevent direct mutation of this.state
    "react/no-find-dom-node": 0, // Prevent usage of findDOMNode
    "react/no-is-mounted": "error", // Prevent usage of isMounted
    "react/no-multi-comp": 0, // Prevent multiple component definition per file
    "react/no-redundant-should-component-update": "error", // Prevent usage of shouldComponentUpdate when extending React.PureComponent
    "react/no-render-return-value": 0, // Prevent usage of the return value of React.render
    "react/no-set-state": 0, // Prevent usage of setState
    "react/no-typos": 0, // Prevent common casing typos
    "react/no-string-refs": "error", // Prevent using string references in ref attribute.
    "react/no-this-in-sfc": "error", // Prevent using this in stateless functional components
    "react/no-unescaped-entities": 0, // Prevent invalid characters from appearing in markup
    "react/no-unknown-property": 0, // Prevent usage of unknown DOM property (fixable)
    "react/no-unsafe": "error", // Prevent usage of unsafe lifecycle methods
    "react/no-unused-prop-types": "error", // Prevent definitions of unused prop types
    "react/no-unused-state": "error", // Prevent definitions of unused state properties
    "react/no-will-update-set-state": "error", // Prevent usage of setState in componentWillUpdate
    "react/prefer-es6-class": 0, // Enforce ES5 or ES6 class for React Components
    "react/prefer-stateless-function": 0, // Enforce stateless React Components to be written as a pure function
    "react/prop-types": 0, // Prevent missing props validation in a React component definition
    "react/react-in-jsx-scope": "error", // Prevent missing React when using JSX
    "react/require-default-props": 0, // Enforce a defaultProps definition for every prop that is not a required prop
    "react/require-optimization": 0, // Enforce React components to have a shouldComponentUpdate method
    "react/require-render-return": "error", // Enforce ES5 or ES6 class for returning value in render function
    "react/self-closing-comp": "error", // Prevent extra closing tags for components without children (fixable)
    "react/sort-comp": 0, // Enforce component methods order (fixable)
    "react/sort-prop-types": 0, // Enforce propTypes declarations alphabetical sorting
    // "react/state-in-constructor": ["error", "never"], // Enforce the state initialization style to be either in a constructor or with a class property
    "react/style-prop-object": 0, // Enforce style prop value being an object
    "react/void-dom-elements-no-children": 0, // Prevent void DOM elements (e.g. <img />, <br />) from receiving children

    // React/JSX
    "react/jsx-boolean-value": ["error", "never"], // Enforce boolean attributes notation in JSX (fixable)
    "react/jsx-child-element-spacing": 0, // Enforce or disallow spaces inside of curly braces in JSX attributes and expressions.
    "react/jsx-closing-bracket-location": "error", // Validate closing bracket location in JSX (fixable)
    "react/jsx-closing-tag-location": "error", // Validate closing tag location in JSX (fixable)
    "react/jsx-curly-spacing": "error", // Enforce or disallow spaces inside of curly braces in JSX attributes and expressions (fixable)
    "react/jsx-equals-spacing": "error", // Enforce or disallow spaces around equal signs in JSX attributes (fixable)
    "react/jsx-filename-extension": 0, // Restrict file extensions that may contain JSX
    "react/jsx-first-prop-new-line": 0, // Enforce position of the first prop in JSX (fixable)
    "react/jsx-handler-names": "off", // Enforce event handler naming conventions in JSX
    "react/jsx-indent": 0, // Validate JSX indentation (fixable)
    "react/jsx-indent-props": 0, // Validate props indentation in JSX (fixable)
    "react/jsx-key": "error", // Validate JSX has key prop when in array or iterator
    "react/jsx-max-depth": 0, // Validate JSX maximum depth
    "react/jsx-max-props-per-line": 0, // Limit maximum of props on a single line in JSX (fixable)
    "react/jsx-no-bind": 0, // Prevent usage of .bind() and arrow functions in JSX props
    "react/jsx-no-comment-textnodes": 0, // Prevent comments from being inserted as text nodes
    "react/jsx-no-duplicate-props": "error", // Prevent duplicate props in JSX
    "react/jsx-no-literals": 0, // Prevent usage of unwrapped JSX strings
    "react/jsx-no-target-blank": 0, // Prevent usage of unsafe target='_blank'
    "react/jsx-no-undef": "error", // Disallow undeclared variables in JSX
    "react/jsx-one-expression-per-line": 0, // Limit to one expression per line in JSX
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "ignore" }
    ], // Enforce curly braces or disallow unnecessary curly braces in JSX
    "react/jsx-fragments": 0, // Enforce shorthand or standard form for React fragments
    "react/jsx-pascal-case": 0, // Enforce PascalCase for user-defined JSX components
    "react/jsx-props-no-multi-spaces": "error", // Disallow multiple spaces between inline JSX props (fixable)
    "react/jsx-props-no-spreading": 0, // Disallow JSX props spreading
    "react/jsx-sort-default-props": 0, // Enforce default props alphabetical sorting
    "react/jsx-sort-props": 0, // Enforce props alphabetical sorting (fixable)
    "react/jsx-space-before-closing": 0, // Validate spacing before closing bracket in JSX (fixable)
    "react/jsx-tag-spacing": 0, // Validate whitespace in and around the JSX opening and closing brackets (fixable)
    "react/jsx-uses-react": "error", // Prevent React to be incorrectly marked as unused
    "react/jsx-uses-vars": "error", // Prevent variables used in JSX to be incorrectly marked as unused
    "react/jsx-wrap-multilines": 0, // Prevent missing parentheses around multilines JSX (fixable)

    // React Native
    "react-native/no-unused-styles": 2,
    "react-native/split-platform-components": 0,
    "react-native/no-inline-styles": 2,
    "react-native/no-color-literals": 2,
    "react-native/no-raw-text": 2,

    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};