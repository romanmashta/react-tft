import Reconciler from "react-reconciler";

// @ts-ignore
export default Reconciler({
  supportsMutation: true,
  getRootHostContext: function (...args) {
    console.log('getRootHostContext', ...args)
    let context = {
      name: "rootnode",
    };
    return context;
  },
  getChildHostContext: function (...args) {
    console.log('getChildHostContext', ...args);
    return {};
  },
  createTextInstance: function (...args) {
    console.log('createTextInstance', ...args)
    return {text: 1};
  },
  createInstance: function (type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    console.log('createInstance', type, props, rootContainerInstance, hostContext, internalInstanceHandle);
    return {
      type,
      props
    };
  },
  appendInitialChild: function (...args) {
    console.log('appendInitialChild', ...args);
    return true;
  },
  resetAfterCommit: function (...args) {
    console.log('resetAfterCommit', ...args)
  },
  prepareForCommit: function (...args) {
    console.log('prepareForCommit', ...args);
    return null;
  },
  appendChild: function (...args) {
    console.log('appendChild', ...args)
  },
  appendChildToContainer: function (...args) {
    console.log('appendChildToContainer', ...args)
  },
  shouldSetTextContent: function (...args) {
    console.log('shouldSetTextContent', ...args);
    return false;
  },
  clearContainer: function (...args) {
    console.log('clearContainer', ...args)
  },
  finalizeInitialChildren: function (...args) {
    console.log('finalizeInitialChildren', ...args)
    return true;
  },
  commitUpdate: function (...args) {
    console.log('commitUpdate', ...args)
  },
  commitTextUpdate: function (...args) {
    console.log('commitTextUpdate', ...args)
  },
  removeChildFromContainer: function (...args) {
    console.log('removeChildFromContainer', ...args)
  },
  prepareUpdate: function (element: any, type: any, oldProps: any, newProps: any) {
    console.log('prepareUpdate', element, type, oldProps, newProps);
    let payload: any = null;
    for (let key in oldProps) {
      if (key === 'children') continue;
      if (oldProps[key] !== newProps[key]) {
        if (!payload) {
          payload = {};
        }
        payload[key] = newProps[key];
      }
    }
    return payload;
  },
  createContainerChildSet: function (...args) {
    console.log('createContainerChildSet', ...args)
  },
  appendChildToContainerChildSet: function (...args) {
    console.log('appendChildToContainerChildSet', ...args)
  },
  finalizeContainerChildren: function (...args) {
    console.log('finalizeContainerChildren', ...args)
  },
  replaceContainerChildren: function (...args) {
    console.log('replaceContainerChildren', ...args)
  },
  cloneInstance: function (...args) {
    console.log('cloneInstance', ...args)
  },
  detachDeletedInstance: function (...args) {
    console.log('detachDeletedInstance', ...args)
  },
  commitMount: function (...args) {
    console.log('commitMount', ...args)
  }
});
