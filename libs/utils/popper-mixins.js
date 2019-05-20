import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import PopperJS from 'popper.js';
import { require_condition } from './assert';

var mixinPrototype = {
  //---------- start: public methods
  /**
   * @param {HTMLElement} popupElement - The reference element used to position the popper.
   * @param {HTMLElement} refElement - The HTML element used as popper, or a configuration used to
   *   generate the popper.
   * @param {object} popperOptions, PopperJS options
   */
  createPopper: function createPopper(popupElement, refElement, popperOptions) {
    var _this = this;

    require_condition(popupElement && refElement);

    var _popper_config = this._popper_config,
      visibleArrow = _popper_config.visibleArrow,
      placement = _popper_config.placement,
      zIndex = _popper_config.zIndex,
      offset = _popper_config.offset,
      width = _popper_config.width,
      others = _objectWithoutProperties(_popper_config, [
        'visibleArrow',
        'placement',
        'zIndex',
        'offset',
        'width'
      ]);

    popperOptions = _extends({}, popperOptions, others);

    if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(placement)) {
      return;
    }

    var popper = popupElement;
    var reference = refElement;

    if (!popper || !reference) return;
    if (visibleArrow) this._appendArrow(popper);
    if (this._poperJS) {
      this._poperJS.destroy();
    }

    // these options are perserved only for smooth the migiration from eleme/element
    if (!popperOptions.placement) {
      popperOptions.placement = placement;
    }
    if (!popperOptions.offset) {
      popperOptions.offset = offset;
    }

    popperOptions.onCreate = function () {
      _this._resetTransformOrigin();
      _this._popper_state.isCreated = true;
      _this._poperJS.popper.style.zIndex = zIndex;
      _this._poperJS.popper.style.width = width !== null
                                          ? width + 'px'
                                          : reference.getBoundingClientRect().width + 'px';
    };

    this._poperJS = new PopperJS(reference, popper, popperOptions);
  },
  destroyPopper: function destroyPopper() {
    if (this._poperJS && this._popper_state.isCreated) {
      this._poperJS.destroy();
      this._poperJS = null;
      this._popper_state = {};
      this._popper_config = {};
    }
  },
  updatePopper: function updatePopper() {
    if (!this._poperJS && this._popper_state.isCreated) return;
    this._poperJS.update();
  },


  //---------- end: public methods

  _resetTransformOrigin: function _resetTransformOrigin() {
    var placementMap = { top: 'bottom', bottom: 'top', left: 'right', right: 'left' };
    var placement = this._poperJS.popper.getAttribute('x-placement').split('-')[0];
    var origin = placementMap[placement];
    this._poperJS.popper.style.transformOrigin = ['top', 'bottom'].indexOf(placement) > -1
                                                 ? 'center ' + origin
                                                 : origin + ' center';
  },
  _appendArrow: function _appendArrow(element) {
    if (this._popper_state.appended) {
      return;
    }
    this._popper_state.appended = true;
    var arrow = document.createElement('div');
    arrow.setAttribute('x-arrow', '');
    arrow.className = 'popper__arrow';
    element.appendChild(arrow);
  }
};

/**
 * @param {args} @see PopperMixin
 * @param {object} config
 * @param {String} [placement=button] - Placement of the popper accepted values: top(-start, -end),
 *   right(-start, -end), bottom(-start, -right), left(-start, -end)
 * @param {Number} [offset=0] - Amount of pixels the popper will be shifted (can be negative).
 * @param {Number} [boundariesPadding=5]
 * @param {Boolean} [visibleArrow=false] Visibility of the arrow, no style.
*/
export function PopperMixin(config) {
  this._popper_config = Object.assign({}, {
    width: null,
    zIndex: 1050,
    offset: 0,
    placement: 'bottom',
    boundariesPadding: 5,
    visibleArrow: false
  }, config);
  this._popper_state = {};
}

PopperMixin.prototype = mixinPrototype;

var PopperReactMixinMethods = {
  hookReactLifeCycle: function hookReactLifeCycle(getPopperRootDom, getRefDom) {

    var componentDidMount = this.componentDidMount;
    var componentWillUnmount = this.componentWillUnmount;

    this.componentDidMount = function () {
      var root = getPopperRootDom();
      var ref = getRefDom();
      require_condition(root, 'method `getPopperRootDom()` require a HTMLElement instance when componentDidMount is called');
      require_condition(ref, 'method `getRefDom()` require a HTMLElement instance when componentDidMount is called');

      this.createPopper(root, ref);
      this._animateRef = window.requestAnimationFrame(this.updatePopper.bind(this));

      if (typeof componentDidMount === 'function') {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        componentDidMount.apply(this, args);
      }
    };

    this.componentWillUnmount = function () {
      window.cancelAnimationFrame(this._animateRef);
      this.destroyPopper();

      if (typeof componentWillUnmount === 'function') {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        componentWillUnmount.apply(this, args);
      }
    };
  }
};

/**
 * this Mixin provide utility method to hook reactjs component lifecycle
 *
 * @param getPopperRootDom: ()=>HTMLElement, return your popper root HTMLElement when
 *   componentDidMount is called
 * @param getRefDom: ()=>HTMLElement, ref node, the node that popper aligns its pop-up to, see the
 *   popperjs doc for more information
 */
export function PopperReactMixin(getPopperRootDom, getRefDom, config) {
  var _this2 = this;

  require_condition(typeof getPopperRootDom === 'function', '`getPopperRootDom` func is required!');
  require_condition(typeof getRefDom === 'function', '`getRefDom` func is required!');

  PopperMixin.call(this, config);
  Object.keys(mixinPrototype).forEach(function (k) {
    return _this2[k] = mixinPrototype[k];
  });
  PopperReactMixinMethods.hookReactLifeCycle.call(this, getPopperRootDom, getRefDom);

  return this;
}