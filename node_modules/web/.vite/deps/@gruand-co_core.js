import { n as __commonJSMin, t as require_react } from "./react-DI8Hxiyg.js";
//#region node_modules/react/cjs/react-jsx-runtime.development.js
/**
* @license React
* react-jsx-runtime.development.js
*
* Copyright (c) Meta Platforms, Inc. and affiliates.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/
var require_react_jsx_runtime_development = /* @__PURE__ */ __commonJSMin(((exports) => {
	(function() {
		function getComponentNameFromType(type) {
			if (null == type) return null;
			if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
			if ("string" === typeof type) return type;
			switch (type) {
				case REACT_FRAGMENT_TYPE: return "Fragment";
				case REACT_PROFILER_TYPE: return "Profiler";
				case REACT_STRICT_MODE_TYPE: return "StrictMode";
				case REACT_SUSPENSE_TYPE: return "Suspense";
				case REACT_SUSPENSE_LIST_TYPE: return "SuspenseList";
				case REACT_ACTIVITY_TYPE: return "Activity";
			}
			if ("object" === typeof type) switch ("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof) {
				case REACT_PORTAL_TYPE: return "Portal";
				case REACT_CONTEXT_TYPE: return type.displayName || "Context";
				case REACT_CONSUMER_TYPE: return (type._context.displayName || "Context") + ".Consumer";
				case REACT_FORWARD_REF_TYPE:
					var innerType = type.render;
					type = type.displayName;
					type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
					return type;
				case REACT_MEMO_TYPE: return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
				case REACT_LAZY_TYPE:
					innerType = type._payload;
					type = type._init;
					try {
						return getComponentNameFromType(type(innerType));
					} catch (x) {}
			}
			return null;
		}
		function testStringCoercion(value) {
			return "" + value;
		}
		function checkKeyStringCoercion(value) {
			try {
				testStringCoercion(value);
				var JSCompiler_inline_result = !1;
			} catch (e) {
				JSCompiler_inline_result = !0;
			}
			if (JSCompiler_inline_result) {
				JSCompiler_inline_result = console;
				var JSCompiler_temp_const = JSCompiler_inline_result.error;
				var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
				JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
				return testStringCoercion(value);
			}
		}
		function getTaskName(type) {
			if (type === REACT_FRAGMENT_TYPE) return "<>";
			if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
			try {
				var name = getComponentNameFromType(type);
				return name ? "<" + name + ">" : "<...>";
			} catch (x) {
				return "<...>";
			}
		}
		function getOwner() {
			var dispatcher = ReactSharedInternals.A;
			return null === dispatcher ? null : dispatcher.getOwner();
		}
		function UnknownOwner() {
			return Error("react-stack-top-frame");
		}
		function hasValidKey(config) {
			if (hasOwnProperty.call(config, "key")) {
				var getter = Object.getOwnPropertyDescriptor(config, "key").get;
				if (getter && getter.isReactWarning) return !1;
			}
			return void 0 !== config.key;
		}
		function defineKeyPropWarningGetter(props, displayName) {
			function warnAboutAccessingKey() {
				specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
			}
			warnAboutAccessingKey.isReactWarning = !0;
			Object.defineProperty(props, "key", {
				get: warnAboutAccessingKey,
				configurable: !0
			});
		}
		function elementRefGetterWithDeprecationWarning() {
			var componentName = getComponentNameFromType(this.type);
			didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
			componentName = this.props.ref;
			return void 0 !== componentName ? componentName : null;
		}
		function ReactElement(type, key, props, owner, debugStack, debugTask) {
			var refProp = props.ref;
			type = {
				$$typeof: REACT_ELEMENT_TYPE,
				type,
				key,
				props,
				_owner: owner
			};
			null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
				enumerable: !1,
				get: elementRefGetterWithDeprecationWarning
			}) : Object.defineProperty(type, "ref", {
				enumerable: !1,
				value: null
			});
			type._store = {};
			Object.defineProperty(type._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			});
			Object.defineProperty(type, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			});
			Object.defineProperty(type, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugStack
			});
			Object.defineProperty(type, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: debugTask
			});
			Object.freeze && (Object.freeze(type.props), Object.freeze(type));
			return type;
		}
		function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
			var children = config.children;
			if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
				for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++) validateChildKeys(children[isStaticChildren]);
				Object.freeze && Object.freeze(children);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else validateChildKeys(children);
			if (hasOwnProperty.call(config, "key")) {
				children = getComponentNameFromType(type);
				var keys = Object.keys(config).filter(function(k) {
					return "key" !== k;
				});
				isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
				didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
			}
			children = null;
			void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
			hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
			if ("key" in config) {
				maybeKey = {};
				for (var propName in config) "key" !== propName && (maybeKey[propName] = config[propName]);
			} else maybeKey = config;
			children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
			return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
		}
		function validateChildKeys(node) {
			isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
		}
		function isValidElement(object) {
			return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
		}
		var React = require_react(), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
			return null;
		};
		React = { react_stack_bottom_frame: function(callStackForError) {
			return callStackForError();
		} };
		var specialPropKeyWarningShown;
		var didWarnAboutElementRef = {};
		var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
		var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
		var didWarnAboutKeySpread = {};
		exports.Fragment = REACT_FRAGMENT_TYPE;
		exports.jsx = function(type, config, maybeKey) {
			var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
			return jsxDEVImpl(type, config, maybeKey, !1, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
		};
		exports.jsxs = function(type, config, maybeKey) {
			var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
			return jsxDEVImpl(type, config, maybeKey, !0, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
		};
	})();
}));
//#endregion
//#region node_modules/react/jsx-runtime.js
var require_jsx_runtime = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_react_jsx_runtime_development();
}));
//#endregion
//#region node_modules/@gruand-co/core/dist/index.js
var import_react = require_react();
var import_jsx_runtime = require_jsx_runtime();
var o = {
	colors: {
		background: "#141413",
		surface: "#d4a338",
		primary: "#d4af3780",
		textMain: "#f8f8f8",
		textMuted: "#d3c8a9d2",
		border: "#c28d43e5"
	},
	typography: {
		fontFamilyHeading: "Akt, \"Playfair Display\", \"Cinzel\", serif",
		fontFamilyBody: "Raleway, sans-serif"
	}
}, s = {
	colors: {
		background: "#FDFBF7",
		surface: "#1A1A1A",
		primary: "#D4AF37",
		textMain: "#111111",
		textMuted: "#706F6C",
		border: "#E6E1DA"
	},
	typography: {
		fontFamilyHeading: "Cormorant Garamond, serif",
		fontFamilyBody: "Inter, sans-serif"
	}
}, c = (0, import_react.createContext)(null);
function l({ children: e }) {
	let [t, n] = (0, import_react.useState)(s);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(c.Provider, {
		value: {
			theme: t,
			setTheme: n
		},
		children: e
	});
}
function u() {
	let e = (0, import_react.useContext)(c);
	if (!e) throw Error("useTheme doit être utilisé à l'intérieur de ThemeProvider");
	return e;
}
var d = ({ level: e = 1, variant: t = "default", children: n, style: r, ...a }) => {
	let { theme: o } = u(), s = `h${e}`, c = {
		fontFamily: o.typography.fontFamilyHeading,
		fontSize: {
			1: "2.5rem",
			2: "2rem",
			3: "1.75rem",
			4: "1.5rem",
			5: "1.25rem",
			6: "1.1rem"
		}[e],
		fontWeight: 600,
		lineHeight: 1.2,
		margin: 0,
		letterSpacing: "0.03em",
		textTransform: e === 1 || e === 2 ? "uppercase" : "none",
		transition: "color 0.3s ease, background 0.3s ease",
		...(() => {
			switch (t) {
				case "gold": return {
					background: "linear-gradient(135deg, #FFE082 0%, #D4AF37 50%, #8A6D1C 100%)",
					WebkitBackgroundClip: "text",
					WebkitTextFillColor: "transparent",
					color: o.colors.primary
				};
				case "primary": return { color: o.colors.primary };
				case "muted": return { color: o.colors.textMuted };
				default: return { color: o.colors.textMain };
			}
		})(),
		...r
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(s, {
		...a,
		style: c,
		children: n
	});
}, f = ({ variant: e = "default", children: t, style: n, ...r }) => {
	let { theme: a } = u(), o = {
		fontFamily: e === "serif" ? a.typography.fontFamilyHeading : a.typography.fontFamilyBody,
		margin: 0,
		transition: "color 0.3s ease",
		...(() => {
			switch (e) {
				case "muted": return {
					color: a.colors.textMuted,
					fontSize: "0.95rem"
				};
				case "lead": return {
					color: a.colors.textMain,
					fontSize: "1.2rem",
					fontWeight: 300,
					lineHeight: 1.6
				};
				case "serif": return {
					color: a.colors.textMain,
					fontFamily: a.typography.fontFamilyHeading,
					fontSize: "1.1rem",
					fontStyle: "italic"
				};
				case "small": return {
					color: a.colors.textMuted,
					fontSize: "0.8rem",
					letterSpacing: "0.05em"
				};
				default: return {
					color: a.colors.textMain,
					fontSize: "1rem",
					lineHeight: 1.5
				};
			}
		})(),
		...n
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		...r,
		style: o,
		children: t
	});
}, p = ({ children: e, ...t }) => {
	let { theme: n } = u();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...t,
		style: {
			backgroundColor: n.colors.background,
			color: n.colors.primary,
			fontFamily: n.typography.fontFamilyHeading,
			border: `1px solid ${n.colors.border}`,
			padding: "12px 24px",
			borderRadius: "4px",
			letterSpacing: "0.05em",
			cursor: "pointer",
			transition: "all 0.2s ease",
			...t.style
		},
		children: e
	});
}, m = ({ variant: e = "primary", size: t = "md", children: n, style: a, onMouseEnter: o, onMouseLeave: s, onFocus: c, onBlur: l, disabled: d, ...f }) => {
	let { theme: p } = u(), [m, h] = (0, import_react.useState)(!1), [g, _] = (0, import_react.useState)(!1), v = (e) => {
		h(!0), o && o(e);
	}, y = (e) => {
		h(!1), s && s(e);
	}, b = (e) => {
		_(!0), c && c(e);
	}, x = (e) => {
		_(!1), l && l(e);
	}, S = {
		sm: "8px 16px",
		md: "12px 24px",
		lg: "16px 36px"
	}, C = {
		sm: {
			fontSize: "0.8rem",
			letterSpacing: "0.08em"
		},
		md: {
			fontSize: "0.9rem",
			letterSpacing: "0.06em"
		},
		lg: {
			fontSize: "1.05rem",
			letterSpacing: "0.1em"
		}
	}, w = () => {
		if (d) return {
			backgroundColor: "rgba(128, 128, 128, 0.1)",
			color: p.colors.textMuted,
			border: `1px solid ${p.colors.border}`,
			cursor: "not-allowed"
		};
		let t = p.typography.fontFamilyHeading.includes("Cormorant");
		switch (e) {
			case "secondary": return {
				backgroundColor: m ? p.colors.primary : p.colors.surface,
				color: m ? t ? "#111111" : "#141413" : t ? "#FDFBF7" : "#141413",
				border: `1px solid ${m ? p.colors.primary : p.colors.border}`
			};
			case "outline": return {
				backgroundColor: m ? "rgba(212, 175, 55, 0.08)" : "transparent",
				color: p.colors.primary,
				border: `1px solid ${m ? p.colors.primary : p.colors.border}`
			};
			case "ghost": return {
				backgroundColor: m ? "rgba(212, 175, 55, 0.05)" : "transparent",
				color: m ? p.colors.primary : p.colors.textMain,
				border: "1px solid transparent"
			};
			default: return {
				backgroundColor: m ? p.colors.surface : p.colors.primary,
				color: m ? p.colors.primary : t ? "#111111" : "#f8f8f8",
				border: `1px solid ${m ? p.colors.primary : "transparent"}`,
				boxShadow: m ? "0 4px 20px rgba(212, 175, 55, 0.25)" : "none"
			};
		}
	}, T = {
		fontFamily: p.typography.fontFamilyBody,
		fontWeight: 500,
		textTransform: "uppercase",
		padding: S[t],
		borderRadius: "4px",
		cursor: "pointer",
		outline: "none",
		transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
		transform: m && !d ? "translateY(-1px)" : "none",
		boxShadow: g && !d ? `0 0 0 2px ${p.colors.background}, 0 0 0 4px ${p.colors.primary}` : "none",
		...C[t],
		...w(),
		...a
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...f,
		disabled: d,
		onMouseEnter: v,
		onMouseLeave: y,
		onFocus: b,
		onBlur: x,
		style: T,
		children: n
	});
}, h = ({ children: e, circle: t = !0, style: n, onMouseEnter: a, onMouseLeave: o, disabled: s, ...c }) => {
	let { theme: l } = u(), [d, f] = (0, import_react.useState)(!1), p = (e) => {
		f(!0), a && a(e);
	}, m = (e) => {
		f(!1), o && o(e);
	}, h = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		width: "40px",
		height: "40px",
		padding: 0,
		borderRadius: t ? "50%" : "4px",
		backgroundColor: d && !s ? "rgba(212, 175, 55, 0.08)" : "transparent",
		color: d && !s ? l.colors.primary : l.colors.textMain,
		border: `1px solid ${d && !s ? l.colors.primary : l.colors.border}`,
		cursor: s ? "not-allowed" : "pointer",
		opacity: s ? .5 : 1,
		transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
		transform: d && !s ? "scale(1.05)" : "scale(1)",
		outline: "none",
		...n
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		...c,
		disabled: s,
		onMouseEnter: p,
		onMouseLeave: m,
		style: h,
		children: e
	});
}, g = ({ label: e, error: t, variant: n = "outline", style: o, onFocus: s, onBlur: c, id: l, type: d = "text", ...f }) => {
	let { theme: p } = u(), [m, h] = (0, import_react.useState)(!1), g = l || `input-${Math.random().toString(36).substr(2, 9)}`, _ = (e) => {
		h(!0), s && s(e);
	}, v = (e) => {
		h(!1), c && c(e);
	};
	p.typography.fontFamilyHeading.includes("Cormorant");
	let y = () => {
		let e = {
			width: "100%",
			boxSizing: "border-box",
			padding: "12px 16px",
			fontSize: "1rem",
			fontFamily: p.typography.fontFamilyBody,
			backgroundColor: "transparent",
			color: p.colors.textMain,
			outline: "none",
			transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
		};
		return n === "underline" ? {
			...e,
			padding: "12px 0 8px 0",
			border: "none",
			borderBottom: `1px solid ${t ? "#E53E3E" : m ? p.colors.primary : p.colors.border}`,
			borderRadius: 0
		} : {
			...e,
			border: `1px solid ${t ? "#E53E3E" : m ? p.colors.primary : p.colors.border}`,
			borderRadius: "4px",
			boxShadow: m && !t ? `0 0 0 1px ${p.colors.primary}40` : "none"
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			gap: "6px"
		},
		children: [
			e && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: g,
				style: {
					fontFamily: p.typography.fontFamilyHeading,
					fontSize: "0.85rem",
					fontWeight: 600,
					textTransform: "uppercase",
					letterSpacing: "0.08em",
					color: m ? p.colors.primary : p.colors.textMuted,
					transition: "color 0.3s ease"
				},
				children: e
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				...f,
				id: g,
				type: d,
				onFocus: _,
				onBlur: v,
				style: {
					...y(),
					...o
				}
			}),
			t && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					fontFamily: p.typography.fontFamilyBody,
					fontSize: "0.75rem",
					color: "#E53E3E",
					marginTop: "2px",
					fontStyle: "italic"
				},
				children: t
			})
		]
	});
}, _ = ({ label: e, options: t, error: n, children: o, style: s, onFocus: c, onBlur: l, id: d, ...f }) => {
	let { theme: p } = u(), [m, h] = (0, import_react.useState)(!1), g = d || `select-${Math.random().toString(36).substr(2, 9)}`, _ = (e) => {
		h(!0), c && c(e);
	}, v = (e) => {
		h(!1), l && l(e);
	}, y = p.typography.fontFamilyHeading.includes("Cormorant"), b = {
		width: "100%",
		boxSizing: "border-box",
		padding: "12px 16px",
		fontSize: "1rem",
		fontFamily: p.typography.fontFamilyBody,
		backgroundColor: y ? "#FDFBF7" : "#141413",
		color: p.colors.textMain,
		border: `1px solid ${n ? "#E53E3E" : m ? p.colors.primary : p.colors.border}`,
		borderRadius: "4px",
		outline: "none",
		transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
		cursor: "pointer",
		appearance: "none",
		backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${encodeURIComponent(p.colors.primary)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
		backgroundRepeat: "no-repeat",
		backgroundPosition: "right 16px center",
		backgroundSize: "16px",
		...s
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
			gap: "6px"
		},
		children: [
			e && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: g,
				style: {
					fontFamily: p.typography.fontFamilyHeading,
					fontSize: "0.85rem",
					fontWeight: 600,
					textTransform: "uppercase",
					letterSpacing: "0.08em",
					color: m ? p.colors.primary : p.colors.textMuted,
					transition: "color 0.3s ease"
				},
				children: e
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "relative",
					width: "100%"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
					...f,
					id: g,
					onFocus: _,
					onBlur: v,
					style: b,
					children: t ? t.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
						value: e.value,
						style: {
							backgroundColor: y ? "#FDFBF7" : "#1A1A1A",
							color: p.colors.textMain
						},
						children: e.label
					}, e.value)) : o
				})
			}),
			n && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					fontFamily: p.typography.fontFamilyBody,
					fontSize: "0.75rem",
					color: "#E53E3E",
					marginTop: "2px",
					fontStyle: "italic"
				},
				children: n
			})
		]
	});
}, v = ({ label: e, error: t, style: n, checked: o, onChange: s, id: c, ...l }) => {
	let { theme: d } = u(), [f, p] = (0, import_react.useState)(!1), m = o === void 0 ? f : o, h = c || `checkbox-${Math.random().toString(36).substr(2, 9)}`, g = (e) => {
		o === void 0 && p(e.target.checked), s && s(e);
	}, _ = {
		display: "inline-flex",
		alignItems: "center",
		cursor: "pointer",
		userSelect: "none",
		gap: "10px",
		...n
	}, v = {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		width: "20px",
		height: "20px",
		border: `1px solid ${m ? d.colors.primary : d.colors.border}`,
		backgroundColor: m ? "rgba(212, 175, 55, 0.15)" : "transparent",
		borderRadius: "3px",
		transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			flexDirection: "column",
			gap: "4px"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			style: _,
			htmlFor: h,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					...l,
					id: h,
					type: "checkbox",
					checked: m,
					onChange: g,
					style: {
						position: "absolute",
						opacity: 0,
						width: 0,
						height: 0,
						margin: 0
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: v,
					children: m && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "12",
						height: "10",
						viewBox: "0 0 12 10",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M1 5L4.5 8.5L11 1.5",
							stroke: d.colors.primary,
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})
				}),
				e && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						fontFamily: d.typography.fontFamilyBody,
						fontSize: "0.95rem",
						color: d.colors.textMain
					},
					children: e
				})
			]
		}), t && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			style: {
				fontFamily: d.typography.fontFamilyBody,
				fontSize: "0.75rem",
				color: "#E53E3E",
				marginLeft: "30px",
				fontStyle: "italic"
			},
			children: t
		})]
	});
}, y = ({ label: e, style: t, checked: n, onChange: o, id: s, ...c }) => {
	let { theme: l } = u(), [d, f] = (0, import_react.useState)(!1), p = n === void 0 ? d : n, m = s || `switch-${Math.random().toString(36).substr(2, 9)}`, h = (e) => {
		n === void 0 && f(e.target.checked), o && o(e);
	}, g = {
		display: "inline-flex",
		alignItems: "center",
		cursor: "pointer",
		userSelect: "none",
		gap: "12px",
		...t
	}, _ = {
		position: "relative",
		width: "44px",
		height: "24px",
		backgroundColor: p ? "rgba(212, 175, 55, 0.25)" : "rgba(128, 128, 128, 0.15)",
		border: `1px solid ${p ? l.colors.primary : l.colors.border}`,
		borderRadius: "12px",
		transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)"
	}, v = {
		position: "absolute",
		top: "2px",
		left: p ? "22px" : "2px",
		width: "18px",
		height: "18px",
		backgroundColor: p ? l.colors.primary : l.colors.textMuted,
		borderRadius: "50%",
		transition: "all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
		boxShadow: p ? "0 2px 4px rgba(212, 175, 55, 0.4)" : "none"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		style: g,
		htmlFor: m,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				...c,
				id: m,
				type: "checkbox",
				checked: p,
				onChange: h,
				style: {
					position: "absolute",
					opacity: 0,
					width: 0,
					height: 0,
					margin: 0
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: _,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: v })
			}),
			e && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					fontFamily: l.typography.fontFamilyBody,
					fontSize: "0.95rem",
					color: l.colors.textMain
				},
				children: e
			})
		]
	});
}, b = ({ elevation: e = "low", hoverable: t = !1, children: n, style: o, onMouseEnter: s, onMouseLeave: c, ...l }) => {
	let { theme: d } = u(), [f, p] = (0, import_react.useState)(!1), m = (e) => {
		p(!0), s && s(e);
	}, h = (e) => {
		p(!1), c && c(e);
	}, g = d.typography.fontFamilyHeading.includes("Cormorant"), _ = {
		none: "none",
		low: g ? "0 2px 8px rgba(0, 0, 0, 0.04)" : "0 2px 8px rgba(0, 0, 0, 0.2)",
		medium: g ? "0 10px 30px rgba(0, 0, 0, 0.06)" : "0 10px 30px rgba(0, 0, 0, 0.4)",
		high: g ? "0 20px 50px rgba(0, 0, 0, 0.08)" : "0 20px 50px rgba(0, 0, 0, 0.6)"
	}, v = {
		backgroundColor: g ? "#FDFBF7" : "#1A1A1A",
		color: d.colors.textMain,
		border: `1px solid ${f && t ? d.colors.primary : d.colors.border}`,
		borderRadius: "8px",
		padding: "24px",
		boxShadow: f && t ? g ? "0 15px 40px rgba(212, 175, 55, 0.15)" : "0 15px 40px rgba(212, 175, 55, 0.3)" : _[e],
		transform: f && t ? "translateY(-4px)" : "translateY(0)",
		transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
		position: "relative",
		overflow: "hidden",
		...o
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		...l,
		onMouseEnter: m,
		onMouseLeave: h,
		style: v,
		children: [t && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
			position: "absolute",
			top: 0,
			left: 0,
			right: 0,
			height: "3px",
			backgroundColor: d.colors.primary,
			transform: f ? "scaleX(1)" : "scaleX(0)",
			transformOrigin: "left",
			transition: "transform 0.4s ease"
		} }), n]
	});
}, x = ({ orientation: e = "horizontal", ornament: t = !1, children: n, style: r, ...o }) => {
	let { theme: s } = u();
	if (e === "vertical") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		...o,
		style: {
			display: "inline-block",
			width: "1px",
			height: "100%",
			minHeight: "1em",
			backgroundColor: s.colors.border,
			margin: "0 16px",
			alignSelf: "stretch",
			...r
		}
	});
	let c = {
		display: "flex",
		alignItems: "center",
		width: "100%",
		margin: "24px 0",
		...r
	}, l = {
		flexGrow: 1,
		height: "1px",
		backgroundColor: s.colors.border
	}, d = {
		padding: "0 16px",
		color: s.colors.textMuted,
		fontFamily: s.typography.fontFamilyHeading,
		fontSize: "0.85rem",
		fontWeight: 500,
		letterSpacing: "0.15em",
		textTransform: "uppercase"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		...o,
		style: c,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: l }),
			(n || t) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: d,
				children: n || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: {
						color: s.colors.primary,
						fontSize: "1.1rem"
					},
					children: "◇"
				})
			}),
			(n || t) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: l })
		]
	});
}, S = ({ isOpen: e, onClose: t, title: o, children: s, style: c, ...l }) => {
	let { theme: f } = u(), [p, h] = (0, import_react.useState)(!1);
	if ((0, import_react.useEffect)(() => (e ? document.body.style.overflow = "hidden" : document.body.style.overflow = "unset", () => {
		document.body.style.overflow = "unset";
	}), [e]), !e) return null;
	let g = f.typography.fontFamilyHeading.includes("Cormorant"), _ = {
		position: "fixed",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 1e3,
		backgroundColor: g ? "rgba(26, 26, 26, 0.4)" : "rgba(0, 0, 0, 0.65)",
		backdropFilter: "blur(8px)",
		WebkitBackdropFilter: "blur(8px)",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "20px",
		animation: "fadeIn 0.3s ease-out forwards"
	}, v = {
		position: "relative",
		width: "100%",
		maxWidth: "500px",
		backgroundColor: g ? "#FDFBF7" : "#141413",
		color: f.colors.textMain,
		border: `1px solid ${f.colors.border}`,
		borderRadius: "8px",
		boxShadow: g ? "0 25px 50px -12px rgba(0, 0, 0, 0.25)" : "0 25px 50px -12px rgba(212, 175, 55, 0.15)",
		padding: "30px",
		display: "flex",
		flexDirection: "column",
		gap: "20px",
		animation: "slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards",
		...c
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: _,
		onClick: t,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: "\n        @keyframes fadeIn {\n          from { opacity: 0; }\n          to { opacity: 1; }\n        }\n        @keyframes slideUp {\n          from { transform: translateY(20px); opacity: 0; }\n          to { transform: translateY(0); opacity: 1; }\n        }\n      " }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			...l,
			style: v,
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						borderBottom: `1px solid ${f.colors.border}`,
						paddingBottom: "16px"
					},
					children: [o ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(d, {
						level: 3,
						style: { fontSize: "1.4rem" },
						children: o
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: t,
						onMouseEnter: () => h(!0),
						onMouseLeave: () => h(!1),
						style: {
							background: "transparent",
							border: "none",
							color: p ? f.colors.primary : f.colors.textMuted,
							cursor: "pointer",
							fontSize: "1.5rem",
							padding: "4px 8px",
							fontFamily: "monospace",
							lineHeight: 1,
							transition: "color 0.2s"
						},
						children: "×"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontFamily: f.typography.fontFamilyBody,
						fontSize: "0.95rem",
						lineHeight: 1.6
					},
					children: s
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						display: "flex",
						justifyContent: "flex-end",
						gap: "12px",
						marginTop: "10px"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(m, {
						variant: "ghost",
						size: "sm",
						onClick: t,
						children: "Fermer"
					})
				})
			]
		})]
	});
}, C = ({ variant: e = "primary", children: t, style: n, ...r }) => {
	let { theme: a } = u(), o = a.typography.fontFamilyHeading.includes("Cormorant"), s = {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		padding: "3px 10px",
		fontSize: "0.7rem",
		fontWeight: 600,
		textTransform: "uppercase",
		letterSpacing: "0.12em",
		lineHeight: 1,
		borderRadius: "12px",
		fontFamily: a.typography.fontFamilyBody,
		transition: "all 0.3s ease",
		...(() => {
			switch (e) {
				case "outline": return {
					backgroundColor: "transparent",
					color: a.colors.primary,
					border: `1px solid ${a.colors.primary}`
				};
				case "surface": return {
					backgroundColor: o ? "rgba(26, 26, 26, 0.05)" : "rgba(255, 255, 255, 0.08)",
					color: a.colors.textMuted,
					border: `1px solid ${a.colors.border}`
				};
				case "accent": return {
					backgroundColor: "transparent",
					color: a.colors.textMain,
					border: `1px dashed ${a.colors.primary}`
				};
				default: return {
					backgroundColor: a.colors.primary,
					color: o ? "#111111" : "#141413",
					border: `1px solid ${a.colors.primary}`
				};
			}
		})(),
		...n
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		...r,
		style: s,
		children: t
	});
};
//#endregion
export { C as Badge, o as BlackWhiteTheme, m as Button, b as Card, v as Checkbox, x as Divider, d as Heading, h as IconButton, g as Input, S as Modal, p as OldMoneyButton, s as OldMoneyTheme, _ as Select, y as Switch, f as Text, l as ThemeProvider, u as useTheme };

//# sourceMappingURL=@gruand-co_core.js.map