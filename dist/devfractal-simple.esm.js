import { Field, Button, Notification, Delete, Label, ButtonsGroup, NavbarBrand, NavbarItem, NavbarBurger, Section, Icon, TableHead, Tr, Th, Text, Table, TableBody, Td, CheckBox } from 'devfractal-ui-core';
export { Navbar as Nav, NavbarEnd as NavEnd, NavbarMenu as NavMenu } from 'devfractal-ui-core';
import { FieldArray, Formik, Form, FormikConsumer } from 'formik';
import React from 'react';
import { CheckboxField, ErrorField, RadioGroupField, SelectField, TextAreaField, consoleSubmit, DebugField, InputField, DateField } from 'devfractal-forms';
import { camelCaseToPhrase, date as date$1, boolean } from 'technoidentity-utils';
import { string, number, date } from 'yup';
import { NavLink } from 'react-router-dom';
import { faStepBackward, faAngleDoubleLeft, faAngleDoubleRight, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Get } from 'devfractal-ui-api';
import { format } from 'date-fns';
import { Tabs, TabsItem, RoutedTabs, RoutedTabsItem } from 'devfractal-ui';

function SimpleArrayField(_ref) {
  var name = _ref.name,
      data = _ref.data,
      noRemove = _ref.noRemove,
      onAdd = _ref.onAdd,
      Component = _ref.render;
  return React.createElement(FieldArray, {
    name: name
  }, function (_ref2) {
    var unshift = _ref2.unshift,
        remove = _ref2.remove;
    return React.createElement(React.Fragment, null, onAdd && React.createElement(Field, {
      addonsModifier: "addons-right"
    }, React.createElement(Button, {
      variant: "success",
      onClick: function onClick() {
        return unshift(onAdd());
      }
    }, "Add")), data.map(function (v, i) {
      return React.createElement(Notification, {
        key: i
      }, noRemove || React.createElement(Delete, {
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

  return React.createElement(Field, Object.assign({}, fieldProps), React.createElement(Label, null, label || camelCaseToPhrase(props.name)), React.createElement(InputField, Object.assign({}, props, {
    validate: validator(schema, validations)
  })), React.createElement(ErrorField, {
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

  return React.createElement(Field, Object.assign({}, fieldProps), React.createElement(Label, null, label || camelCaseToPhrase(props.name)), React.createElement(DateField, Object.assign({}, props, {
    validate: validator(date(), validations)
  })), React.createElement(ErrorField, {
    name: props.name
  }));
}

var SimpleFormButtons = function SimpleFormButtons(_ref2) {
  var _ref2$submit = _ref2.submit,
      submit = _ref2$submit === void 0 ? 'Submit' : _ref2$submit,
      _ref2$reset = _ref2.reset,
      reset = _ref2$reset === void 0 ? 'Reset' : _ref2$reset,
      props = _objectWithoutPropertiesLoose(_ref2, ["submit", "reset"]);

  return React.createElement(FormikConsumer, null, function (_ref3) {
    var dirty = _ref3.dirty,
        isSubmitting = _ref3.isSubmitting,
        handleReset = _ref3.handleReset;
    return React.createElement(ButtonsGroup, Object.assign({}, props), submit !== false && React.createElement(Button, {
      type: "submit",
      variant: "info",
      disabled: isSubmitting,
      noControl: true
    }, submit), reset !== false && React.createElement(Button, {
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
        schema: string()
      }));
    },
    Date: function Date(props) {
      return React.createElement(SimpleDate, Object.assign({}, props));
    },
    Number: function Number(props) {
      return React.createElement(SimpleInput, Object.assign({
        schema: number()
      }, props, {
        type: "number"
      }));
    },
    Password: function Password(props) {
      return React.createElement(SimpleInput, Object.assign({
        schema: string()
      }, props, {
        type: "password"
      }));
    },
    Email: function Email(props) {
      return React.createElement(SimpleInput, Object.assign({}, props, {
        type: "email",
        schema: string()
      }));
    },
    // @TODO: I think Telephone shouldn't be no?
    Telephone: function Telephone(props) {
      return React.createElement(SimpleInput, Object.assign({
        schema: number()
      }, props, {
        type: "tel"
      }));
    },
    Url: function Url(props) {
      return React.createElement(SimpleInput, Object.assign({
        schema: string()
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

      return React.createElement(Field, Object.assign({}, fieldProps), React.createElement(Label, null, children || !noLabel && " " + camelCaseToPhrase(props.name)), React.createElement(CheckboxField, Object.assign({}, props)), React.createElement(ErrorField, {
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

      return React.createElement(Field, Object.assign({}, fieldProps), React.createElement(Label, null, label || camelCaseToPhrase(props.name)), React.createElement(RadioGroupField, Object.assign({}, props), children), React.createElement(ErrorField, {
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

      return React.createElement(Field, Object.assign({}, fieldProps), React.createElement(Label, null, label || camelCaseToPhrase(props.name)), React.createElement(SelectField, Object.assign({}, props), children), React.createElement(ErrorField, {
        name: props.name
      }));
    },
    TextArea: function TextArea(_ref7) {
      var label = _ref7.label,
          args = _objectWithoutPropertiesLoose(_ref7, ["label"]);

      var _splitFieldProps6 = splitFieldProps(args),
          fieldProps = _splitFieldProps6[0],
          props = _splitFieldProps6[1];

      return React.createElement(Field, Object.assign({}, fieldProps), React.createElement(Label, null, label || camelCaseToPhrase(props.name)), React.createElement(TextAreaField, Object.assign({}, props)), React.createElement(ErrorField, {
        name: props.name
      }));
    },
    Form: function Form$1(_ref8) {
      var initialValues = _ref8.initialValues,
          validationSchema = _ref8.validationSchema,
          _ref8$onSubmit = _ref8.onSubmit,
          onSubmit = _ref8$onSubmit === void 0 ? consoleSubmit(0) : _ref8$onSubmit,
          children = _ref8.children;
      return React.createElement(Formik, {
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: onSubmit
      }, React.createElement(Form, null, children));
    }
  };
} // tslint:disable-next-line:typedef

var Simple =
/*#__PURE__*/
_extends({},
/*#__PURE__*/
typedForm(), {
  FormButtons: SimpleFormButtons,
  Debug: DebugField
});

var NavBurger = function NavBurger(props) {
  return React.createElement(NavbarBurger, Object.assign({
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

  return React.createElement(NavbarBrand, Object.assign({}, props), React.createElement(NavLink, {
    to: "/"
  }, children), React.createElement(NavBurger, null));
};

var NavItem = function NavItem(_ref2) {
  var to = _ref2.to,
      children = _ref2.children,
      props = _objectWithoutPropertiesLoose(_ref2, ["to", "children"]);

  return React.createElement(NavbarItem, Object.assign({}, props), React.createElement(NavLink, {
    to: to
  }, children));
};

var SimplePagerView = function SimplePagerView(_ref) {
  var currentPage = _ref.currentPage,
      maximumPages = _ref.maximumPages,
      onPageChange = _ref.onPageChange;
  return React.createElement(Section, null, React.createElement(Field, {
    groupModifier: "grouped-right"
  }, React.createElement(Button, {
    variant: "white",
    disabled: currentPage === 1,
    onClick: function onClick() {
      return onPageChange(1);
    }
  }, React.createElement(Icon, {
    icon: faStepBackward
  })), React.createElement(Button, {
    variant: "white",
    disabled: currentPage === 1,
    onClick: function onClick() {
      return onPageChange(currentPage - 1);
    }
  }, React.createElement(Icon, {
    icon: faAngleDoubleLeft
  })), React.createElement(Button, {
    variant: "white",
    disabled: currentPage === maximumPages,
    onClick: function onClick() {
      return onPageChange(currentPage + 1);
    }
  }, React.createElement(Icon, {
    icon: faAngleDoubleRight
  })), React.createElement(Button, {
    variant: "white",
    disabled: currentPage === maximumPages,
    onClick: function onClick() {
      return onPageChange(maximumPages);
    }
  }, React.createElement(Icon, {
    icon: faStepForward
  }))));
};

function formatDate(date) {
  return date && format(date, 'dd/MM/yyyy');
}

var SimpleTableHeader = function SimpleTableHeader(_ref) {
  var headers = _ref.headers;
  return React.createElement(TableHead, null, React.createElement(Tr, null, headers.map(function (h) {
    return React.createElement(Th, {
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
    return React.createElement(Tr, {
      key: i,
      onClick: function onClick() {
        return onRowClicked && onRowClicked({
          value: data[i]
        });
      }
    }, select.map(function (h) {
      return React.createElement(Td, {
        key: h
      }, date$1.is(value[h]) ? React.createElement(React.Fragment, null, formatDate(value[h])) : boolean.is(value[h]) ? React.createElement(CheckBox, {
        readOnly: true,
        checked: value[h]
      }) : value[h] !== undefined ? value[h] : render && render(h, value));
    }), extra && extra.map(function (e) {
      return render && React.createElement(Td, {
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
    return React.createElement(Text, {
      textSize: "3"
    }, "No Values");
  }

  var keys = select === undefined ? Object.keys(data[0]) : select;
  var labels = [].concat(keys.map(function (s) {
    return override && s in override ? override[s] : camelCaseToPhrase(s);
  }), extra || []);
  return React.createElement(Table, Object.assign({}, props, {
    fullWidth: true
  }), React.createElement(SimpleTableHeader, {
    headers: labels
  }), React.createElement(TableBody, null, React.createElement(Rows, {
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

  return typeof data === 'function' ? React.createElement(Get, {
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

  return React.createElement(Tabs, Object.assign({}, props, {
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
    return React.createElement(TabsItem, {
      key: value,
      value: value
    }, camelCaseToPhrase(value));
  }));
};
var SimpleRoutedTabs = function SimpleRoutedTabs(_ref2) {
  var _ref2$values = _ref2.values,
      values = _ref2$values === void 0 ? [] : _ref2$values,
      props = _objectWithoutPropertiesLoose(_ref2, ["values"]);

  return React.createElement(RoutedTabs, Object.assign({}, props), values.map(function (value) {
    return React.createElement(RoutedTabsItem, {
      key: value,
      value: value
    }, camelCaseToPhrase(value));
  }));
};

export { NavBrand, NavItem, Simple, SimpleArrayField, SimplePagerView, SimpleRoutedTabs, SimpleTable, SimpleTableHeader, SimpleTabs, typedForm };
//# sourceMappingURL=devfractal-simple.esm.js.map
