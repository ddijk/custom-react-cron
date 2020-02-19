const { NODE_ENV } = process.env;

const presets = [
  "@babel/preset-env",
  "@babel/preset-react",
];
const plugins = [
  "@babel/plugin-proposal-object-rest-spread",
  "@babel/plugin-proposal-class-properties",
  "@babel/plugin-transform-react-jsx"

];

if (NODE_ENV === "production") {
  plugins.push("transform-react-remove-prop-types");
}

module.exports = { presets, plugins };