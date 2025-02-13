function initialize() {
  $.state.items = null
  $.state.pannelManager = null;
  $.state.pannelManagerId = null;
  $.state.pannelManagerItemHandle = null;

  const distance = 30;
  if ($.state.items == null)
    $.state.items = $.getItemsNear($.getPosition(), distance);

  $.state.switchNumber = $.getStateCompat("this", "SwitchNumber", "integer");
}

$.onStart(() => {
  initialize();
})

$.onReceive((messageType, arg, sender) => {
  switch (messageType) {
    case 'switchInitialize':
      $.state.pannelManager = sender;
      break;
  }
})

$.onInteract((player) => {
  $.log("Switch on Interact");
  const pannelManager = $.state.pannelManager;
  const switchNumber = $.state.switchNumber;
  $.log(switchNumber);
  pannelManager.send("onSwitchInteracted", { player: player, interactedSwitchNumber: switchNumber })
});

$.onUpdate(() => {
  let pannelManagerId = $.state.pannelManagerId;
  setStatePannelManagerItemHandle(pannelManagerId);
})

function setStatePannelManagerItemHandle(pannelManagerId) {
  const isStateExist = Boolean($.state.pannelManagerItemHandle);
  if (isStateExist) return;

  const items = $.state.items

  items.forEach(item => {
    if (item.id === pannelManagerId) {
      $.state.pannelManagerItemHandle = item;
    }
  });
}