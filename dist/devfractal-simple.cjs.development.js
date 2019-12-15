'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var devfractalUiCore = require('devfractal-ui-core');
var formik = require('formik');
var React = _interopDefault(require('react'));
var devfractalForms = require('devfractal-forms');
var t = require('technoidentity-utils');
var yup = require('yup');
var reactRouterDom = require('react-router-dom');
var freeSolidSvgIcons = require('@fortawesome/free-solid-svg-icons');
var devfractalUiApi = require('devfractal-ui-api');
var dateFns = require('date-fns');
var devfractalUi = require('devfractal-ui');

function SimpleArrayField(_ref) {
  var name = _ref.name,
      data = _ref.data,
      noRemove = _ref.noRemove,
      onAdd = _ref.onAdd,
      Component = _ref.render;
  return React.createElement(formik.FieldArray, {
    name: name
  }, function (_ref2) {
    var unshift = _ref2.unshift,
        remove = _ref2.remove;
    return React.createElement(React.Fragment, null, onAdd && React.createElement(devfractalUiCore.Field, {
      addonsModifier: "addons-right"
    }, React.createElement(devfractalUiCore.Button, {
      variant: "success",
      onClick: function onClick() {
        return unshift(onAdd());
      }
    }, "Add")), data.map(function (v, i) {
      return React.createElement(devfractalUiCore.Notification, {
        key: i
      }, noRemove || React.createElement(devfractalUiCore.Delete, {
        onClick: function onClick() {
          return remove(i);
        }
      }), React.createElement(Component, {
        name: name + "[" + i + "]",
        index: i,
        data: v
      }));
    }));
  });
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function validator(initialSchema, validations) {
  return function (value) {
    if (validations === undefined) {
      return undefined;
    }

    var schema = initialSchema;
    validations.forEach(function (v) {
      return schema = v(schema);
    });

    try {
      schema.validateSync(value);
      return undefined;
    } catch (err) {
      return err.message;
    }
  };
}

function splitFieldProps(_ref) {
  var grouped = _ref.grouped,
      addons = _ref.addons,
      horizontal = _ref.horizontal,
      groupedMultiline = _ref.groupedMultiline,
      groupModifier = _ref.groupModifier,
      addonsModifier = _ref.addonsModifier,
      fieldSize = _ref.fieldSize,
      rest = _objectWithoutPropertiesLoose(_ref, ["grouped", "addons", "horizontal", "groupedMultiline", "groupModifier", "addonsModifier", "fieldSize"]);

  return [{
    grouped: grouped,
    addons: addons,
    horizontal: horizontal,
    groupedMultiline: groupedMultiline,
    groupModifier: groupModifier,
    addonsModifier: addonsModifier,
    size: fieldSize
  }, rest];
}

function SimpleInput(args) {
  var _splitFieldProps = splitFieldProps(args),
      fieldProps = _splitFieldProps[0],
      rest = _splitFieldProps[1];

  var schema = rest.schema,
      label = rest.label,
      validations = rest.validations,
      props = _objectWithoutPropertiesLoose(rest, ["schema", "label", "validations"]);

  return React.createElement(devfractalUiCore.Field, Object.assign({}, fieldProps), React.createElement(devfractalUiCore.Label, null, label || t.camelCaseToPhrase(props.name)), React.createElement(devfractalForms.InputField, Object.assign({}, props, {
    validate: validator(schema, validations)
  })), React.createElement(devfractalForms.ErrorField, {
    name: props.name
  }));
}

function SimpleDate(args) {
  var _splitFieldProps2 = splitFieldProps(args),
      fieldProps = _splitFieldProps2[0],
      rest = _splitFieldProps2[1];

  var label = rest.label,
      validations = rest.validations,
      props = _objectWithoutPropertiesLoose(rest, ["label", "validations"]);

  return React.createElement(devfractalUiCore.Field, Object.assign({}, fieldProps), React.createElement(devfractalUiCore.Label, null, label || t.camelCaseToPhrase(props.name)), React.createElement(devfractalForms.DateField, Object.assign({}, props, {
    validate: validator(yup.date(), validations)
  })), React.createElement(devfractalForms.ErrorField, {
    name: props.name
  }));
}

var SimpleFormButtons = function SimpleFormButtons(_ref2) {
  var _ref2$submit = _ref2.submit,
      submit = _ref2$submit === void 0 ? 'Submit' : _ref2$submit,
      _ref2$reset = _ref2.reset,
      reset = _ref2$reset === void 0 ? 'Reset' : _ref2$reset,
      props = _objectWithoutPropertiesLoose(_ref2, ["submit", "reset"]);

  return React.createElement(formik.FormikConsumer, null, function (_ref3) {
    var dirty = _ref3.dirty,
        isSubmitting = _ref3.isSubmitting,
        handleReset = _ref3.handleReset;
    return React.createElement(devfractalUiCore.ButtonsGroup, Object.assign({}, props), submit !== false && React.createElement(devfractalUiCore.Button, {
      type: "submit",
      variant: "info",
      disabled: isSubmitting,
      noControl: true
    }, submit), reset !== false && React.createElement(devfractalUiCore.Button, {
      disabled: !dirty || isSubmitting,
      variant: "danger",
      type: "reset",
      onClick: handleReset,
      noControl: true
    }, reset));
  });
};

function typedForm() {
  return {
    Text: function Text(props) {
      return React.createElement(SimpleInput, Object.assign({}, props, {
        type: "text",
        schema: yup.string()
      }));
    },
    Date: function Date(props) {
      return React.createElement(SimpleDate, Object.assign({}, props));
    },
    Number: function Number(props) {
      return React.createElement(SimpleInput, Object.assign({
        schema: yup.number()
      }, props, {
        type: "number"
      }));
    },
    Password: function Password(props) {
      return React.createElement(SimpleInput, Object.assign({
        schema: yup.string()
      }, props, {
        type: "password"
      }));
    },
    Email: function Email(props) {
      return React.createElement(SimpleInput, Object.assign({}, props, {
        type: "email",
        schema: yup.string()
      }));
    },
    // @TODO: I think Telephone shouldn't be no?
    Telephone: function Telephone(props) {
      return React.createElement(SimpleInput, Object.assign({
        schema: yup.number()
      }, props, {
        type: "tel"
      }));
    },
    Url: function Url(props) {
      return React.createElement(SimpleInput, Object.assign({
        schema: yup.string()
      }, props, {
        type: "url"
      }));
    },
    Checkbox: function Checkbox(_ref4) {
      var children = _ref4.children,
          noLabel = _ref4.noLabel,
          args = _objectWithoutPropertiesLoose(_ref4, ["children", "noLabel"]);

      var _splitFieldProps3 = splitFieldProps(args),
          fieldProps = _splitFieldProps3[0],
          props = _splitFieldProps3[1];

      return React.createElement(devfractalUiCore.Field, Object.assign({}, fieldProps), React.createElement(devfractalUiCore.Label, null, children || !noLabel && " " + t.camelCaseToPhrase(props.name)), React.createElement(devfractalForms.CheckboxField, Object.assign({}, props)), React.createElement(devfractalForms.ErrorField, {
        name: props.name
      }));
    },
    RadioGroup: function RadioGroup(_ref5) {
      var children = _ref5.children,
          label = _ref5.label,
          args = _objectWithoutPropertiesLoose(_ref5, ["children", "label"]);

      var _splitFieldProps4 = splitFieldProps(args),
          fieldProps = _splitFieldProps4[0],
          props = _splitFieldProps4[1];

      return React.createElement(devfractalUiCore.Field, Object.assign({}, fieldProps), React.createElement(devfractalUiCore.Label, null, label || t.camelCaseToPhrase(props.name)), React.createElement(devfractalForms.RadioGroupField, Object.assign({}, props), children), React.createElement(devfractalForms.ErrorField, {
        name: props.name
      }));
    },
    Select: function Select(_ref6) {
      var children = _ref6.children,
          label = _ref6.label,
          args = _objectWithoutPropertiesLoose(_ref6, ["children", "label"]);

      var _splitFieldProps5 = splitFieldProps(args),
          fieldProps = _splitFieldProps5[0],
          props = _splitFieldProps5[1];

      return React.createElement(devfractalUiCore.Field, Object.assign({}, fieldProps), React.createElement(devfractalUiCore.Label, null, label || t.camelCaseToPhrase(props.name)), React.createElement(devfractalForms.SelectField, Object.assign({}, props), children), React.createElement(devfractalForms.ErrorField, {
        name: props.name
      }));
    },
    TextArea: function TextArea(_ref7) {
      var label = _ref7.label,
          args = _objectWithoutPropertiesLoose(_ref7, ["label"]);

      var _splitFieldProps6 = splitFieldProps(args),
          fieldProps = _splitFieldProps6[0],
          props = _splitFieldProps6[1];

      return React.createElement(devfractalUiCore.Field, Object.assign({}, fieldProps), React.createElement(devfractalUiCore.Label, null, label || t.camelCaseToPhrase(props.name)), React.createElement(devfractalForms.TextAreaField, Object.assign({}, props)), React.createElement(devfractalForms.ErrorField, {
        name: props.name
      }));
    },
    Form: function Form(_ref8) {
      var initialValues = _ref8.initialValues,
          validationSchema = _ref8.validationSchema,
          _ref8$onSubmit = _ref8.onSubmit,
          onSubmit = _ref8$onSubmit === void 0 ? devfractalForms.consoleSubmit(0) : _ref8$onSubmit,
          children = _ref8.children;
      return React.createElement(formik.Formik, {
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit
      }, React.createElement(formik.Form, null, children));
    }
  };
} // tslint:disable-next-line:typedef

var Simple =
/*#__PURE__*/
_extends({},
/*#__PURE__*/
typedForm(), {
  FormButtons: SimpleFormButtons,
  Debug: devfractalForms.DebugField
});

var NavBurger = function NavBurger(props) {
  return React.createElement(devfractalUiCore.NavbarBurger, Object.assign({
    role: "button"
  }, props), React.createElement("span", {
    "aria-hidden": "true"
  }), React.createElement("span", {
    "aria-hidden": "true"
  }), React.createElement("span", {
    "aria-hidden": "true"
  }));
};

var NavBrand = function NavBrand(_ref) {
  var children = _ref.children,
      props = _objectWithoutPropertiesLoose(_ref, ["children"]);

  return React.createElement(devfractalUiCore.NavbarBrand, Object.assign({}, props), React.createElement(reactRouterDom.NavLink, {
    to: "/"
  }, children), React.createElement(NavBurger, null));
};

var NavItem = function NavItem(_ref2) {
  var to = _ref2.to,
      children = _ref2.children,
      props = _objectWithoutPropertiesLoose(_ref2, ["to", "children"]);

  return React.createElement(devfractalUiCore.NavbarItem, Object.assign({}, props), React.createElement(reactRouterDom.NavLink, {
    to: to
  }, children));
};

var SimplePagerView = function SimplePagerView(_ref) {
  var currentPage = _ref.currentPage,
      maximumPages = _ref.maximumPages,
      onPageChange = _ref.onPageChange;
  return React.createElement(devfractalUiCore.Section, null, React.createElement(devfractalUiCore.Field, {
    groupModifier: "grouped-right"
  }, React.createElement(devfractalUiCore.Button, {
    variant: "white",
    disabled: currentPage === 1,
    onClick: function onClick() {
      return onPageChange(1);
    }
  }, React.createElement(devfractalUiCore.Icon, {
    icon: freeSolidSvgIcons.faStepBackward
  })), React.createElement(devfractalUiCore.Button, {
    variant: "white",
    disabled: currentPage === 1,
    onClick: function onClick() {
      return onPageChange(currentPage - 1);
    }
  }, React.createElement(devfractalUiCore.Icon, {
    icon: freeSolidSvgIcons.faAngleDoubleLeft
  })), React.createElement(devfractalUiCore.Button, {
    variant: "white",
    disabled: currentPage === maximumPages,
    onClick: function onClick() {
      return onPageChange(currentPage + 1);
    }
  }, React.createElement(devfractalUiCore.Icon, {
    icon: freeSolidSvgIcons.faAngleDoubleRight
  })), React.createElement(devfractalUiCore.Button, {
    variant: "white",
    disabled: currentPage === maximumPages,
    onClick: function onClick() {
      return onPageChange(maximumPages);
    }
  }, React.createElement(devfractalUiCore.Icon, {
    icon: freeSolidSvgIcons.faStepForward
  }))));
};

function formatDate(date) {
  return date && dateFns.format(date, 'dd/MM/yyyy');
}

var SimpleTableHeader = function SimpleTableHeader(_ref) {
  var headers = _ref.headers;
  return React.createElement(devfractalUiCore.TableHead, null, React.createElement(devfractalUiCore.Tr, null, headers.map(function (h) {
    return React.createElement(devfractalUiCore.Th, {
      key: h
    }, h);
  })));
};

function Rows(props) {
  var data = props.data,
      select = props.select,
      extra = props.extra,
      render = props.render,
      onRowClicked = props.onRowClicked;
  return React.createElement(React.Fragment, null, data.map(function (value, i) {
    return React.createElement(devfractalUiCore.Tr, {
      key: i,
      onClick: function onClick() {
        return onRowClicked && onRowClicked({
          value: data[i]
        });
      }
    }, select.map(function (h) {
      return React.createElement(devfractalUiCore.Td, {
        key: h
      }, t.date.is(value[h]) ? React.createElement(React.Fragment, null, formatDate(value[h])) : t.boolean.is(value[h]) ? React.createElement(devfractalUiCore.CheckBox, {
        readOnly: true,
        checked: value[h]
      }) : value[h] !== undefined ? value[h] : render && render(h, value));
    }), extra && extra.map(function (e) {
      return render && React.createElement(devfractalUiCore.Td, {
        key: e
      }, render(e, value));
    }));
  }));
}

function TableView(args) {
  var select = args.select,
      override = args.override,
      extra = args.extra,
      data = args.data,
      onRowClicked = args.onRowClicked,
      children = args.children,
      props = _objectWithoutPropertiesLoose(args, ["select", "override", "extra", "data", "onRowClicked", "children"]);

  if (data.length === 0) {
    return React.createElement(devfractalUiCore.Text, {
      textSize: "3"
    }, "No Values");
  }

  var keys = select === undefined ? Object.keys(data[0]) : select;
  var labels = [].concat(keys.map(function (s) {
    return override && s in override ? override[s] : t.camelCaseToPhrase(s);
  }), extra || []);
  return React.createElement(devfractalUiCore.Table, Object.assign({}, props, {
    fullWidth: true
  }), React.createElement(SimpleTableHeader, {
    headers: labels
  }), React.createElement(devfractalUiCore.TableBody, null, React.createElement(Rows, {
    data: data,
    select: keys,
    extra: extra,
    onRowClicked: onRowClicked,
    render: children
  })));
}

function SimpleTable(args) {
  var data = args.data,
      props = _objectWithoutPropertiesLoose(args, ["data"]);

  return typeof data === 'function' ? React.createElement(devfractalUiApi.Get, {
    asyncFn: data
  }, function (data) {
    return React.createElement(TableView, Object.assign({}, props, {
      data: data
    }));
  }) : React.createElement(TableView, Object.assign({
    data: data
  }, props));
}

var SimpleTabs = function SimpleTabs(_ref) {
  var name = _ref.name,
      _ref$values = _ref.values,
      values = _ref$values === void 0 ? [] : _ref$values,
      props = _objectWithoutPropertiesLoose(_ref, ["name", "values"]);

  var _React$useState = React.useState(values[0]),
      value = _React$useState[0],
      set = _React$useState[1];

  return React.createElement(devfractalUi.Tabs, Object.assign({}, props, {
    value: value,
    onChange: function onChange(evt) {
      if (evt.value) {
        set(evt.value);
      }

      if (props.onChange) {
        props.onChange(evt);
      }
    },
    name: name
  }), values.map(function (value) {
    return React.createElement(devfractalUi.TabsItem, {
      key: value,
      value: value
    }, t.camelCaseToPhrase(value));
  }));
};
var SimpleRoutedTabs = function SimpleRoutedTabs(_ref2) {
  var _ref2$values = _ref2.values,
      values = _ref2$values === void 0 ? [] : _ref2$values,
      props = _objectWithoutPropertiesLoose(_ref2, ["values"]);

  return React.createElement(devfractalUi.RoutedTabs, Object.assign({}, props), values.map(function (value) {
    return React.createElement(devfractalUi.RoutedTabsItem, {
      key: value,
      value: value
    }, t.camelCaseToPhrase(value));
  }));
};

Object.defineProperty(exports, 'Nav', {
  enumerable: true,
  get: function () {
    return devfractalUiCore.Navbar;
  }
});
Object.defineProperty(exports, 'NavEnd', {
  enumerable: true,
  get: function () {
    return devfractalUiCore.NavbarEnd;
  }
});
Object.defineProperty(exports, 'NavMenu', {
  enumerable: true,
  get: function () {
    return devfractalUiCore.NavbarMenu;
  }
});
exports.NavBrand = NavBrand;
exports.NavItem = NavItem;
exports.Simple = Simple;
exports.SimpleArrayField = SimpleArrayField;
exports.SimplePagerView = SimplePagerView;
exports.SimpleRoutedTabs = SimpleRoutedTabs;
exports.SimpleTable = SimpleTable;
exports.SimpleTableHeader = SimpleTableHeader;
exports.SimpleTabs = SimpleTabs;
exports.typedForm = typedForm;
//# sourceMappingURL=devfractal-simple.cjs.development.js.map
