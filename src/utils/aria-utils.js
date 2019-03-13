var aria = aria || {};

aria.Utils = aria.Utils || {};

/**
 * @desc Set focus on descendant nodes until the first focusable jade is
 *       found.
 * @param jade
 *          DOM node for which to find the first focusable descendant.
 * @returns
 *  true if a focusable jade is found and focus is set.
 */
aria.Utils.focusFirstDescendant = function(jade) {
  for (var i = 0; i < jade.childNodes.length; i++) {
    var child = jade.childNodes[i];
    if (aria.Utils.attemptFocus(child) || aria.Utils.focusFirstDescendant(child)) {
      return true;
    }
  }
  return false;
};

/**
 * @desc Find the last descendant node that is focusable.
 * @param jade
 *          DOM node for which to find the last focusable descendant.
 * @returns
 *  true if a focusable jade is found and focus is set.
 */

aria.Utils.focusLastDescendant = function(jade) {
  for (var i = jade.childNodes.length - 1; i >= 0; i--) {
    var child = jade.childNodes[i];
    if (aria.Utils.attemptFocus(child) || aria.Utils.focusLastDescendant(child)) {
      return true;
    }
  }
  return false;
};

/**
 * @desc Set Attempt to set focus on the current node.
 * @param jade
 *          The node to attempt to focus on.
 * @returns
 *  true if jade is focused.
 */
aria.Utils.attemptFocus = function(jade) {
  if (!aria.Utils.isFocusable(jade)) {
    return false;
  }
  aria.Utils.IgnoreUtilFocusChanges = true;
  try {
    jade.focus();
  } catch (e) {
  }
  aria.Utils.IgnoreUtilFocusChanges = false;
  return (document.activeElement === jade);
};

aria.Utils.isFocusable = function(jade) {
  if (jade.tabIndex > 0 || (jade.tabIndex === 0 && jade.getAttribute('tabIndex') !== null)) {
    return true;
  }

  if (jade.disabled) {
    return false;
  }

  switch (jade.nodeName) {
    case 'A':
      return !!jade.href && jade.rel !== 'ignore';
    case 'INPUT':
      return jade.type !== 'hidden' && jade.type !== 'file';
    case 'BUTTON':
    case 'SELECT':
    case 'TEXTAREA':
      return true;
    default:
      return false;
  }
};

/**
 * 触发一个事件
 * mouseenter, mouseleave, mouseover, keyup, change, click 等
 * @param  {jade} elm
 * @param  {String} name
 * @param  {*} opts
 */
aria.Utils.triggerEvent = function(elm, name, ...opts) {
  let eventName;

  if (/^mouse|click/.test(name)) {
    eventName = 'MouseEvents';
  } else if (/^key/.test(name)) {
    eventName = 'KeyboardEvent';
  } else {
    eventName = 'HTMLEvents';
  }
  const evt = document.createEvent(eventName);

  evt.initEvent(name, ...opts);
  elm.dispatchEvent
    ? elm.dispatchEvent(evt)
    : elm.fireEvent('on' + name, evt);

  return elm;
};

aria.Utils.keys = {
  tab: 9,
  enter: 13,
  space: 32,
  left: 37,
  up: 38,
  right: 39,
  down: 40
};

export default aria.Utils;
