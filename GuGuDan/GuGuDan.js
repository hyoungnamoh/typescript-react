"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
exports.__esModule = true;
var React = __importStar(require("react"));
var react_1 = require("react");
var GuGuDan = function () {
    var _a = react_1.useState(Math.ceil(Math.random() * 9)), first = _a[0], setFirst = _a[1];
    var _b = react_1.useState(Math.ceil(Math.random() * 9)), second = _b[0], setSecond = _b[1];
    var _c = react_1.useState(''), value = _c[0], setValue = _c[1];
    var _d = react_1.useState(''), result = _d[0], setResult = _d[1];
    var inputEl = react_1.useRef(null);
    var onSubmitForm = function (e) {
        e.preventDefault();
        var input = inputEl.current;
        if (parseInt(value) === first * second) {
            setResult('정답');
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue('');
            if (input) {
                input.focus();
            }
        }
        else {
            setResult('땡');
            setValue('');
            if (input) {
                input.focus();
            }
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", null,
            first,
            " \uACF1\uD558\uAE30 ",
            second,
            "\uB294?"),
        React.createElement("form", { onSubmit: onSubmitForm },
            React.createElement("input", { ref: inputEl, type: "number", value: value, onChange: function (e) { return setValue(e.target.value); } }),
            React.createElement("button", null, "\uC785\uB825!")),
        React.createElement("div", { id: "result" }, result)));
};
exports["default"] = GuGuDan;
