$(function() {
  App.VideoController.init();
});


var App = {
  videoClient: null,
  activeRoom: null,
  previewMedia: null,
  identity: null,
  roomName: 'Nearsoft',
};


App.VideoController = (function() {
  function init() {
    $.getJSON('/token', function (data) {
      App.identity = data.identity;
      App.videoClient = new Twilio.Video.Client(data.token);

      log("Joining to portal '" + App.roomName + "'...");
      App.videoClient.connect({ to: App.roomName}).then(_roomJoined)
      .catch(function(error) {
        log('Could not connect : ' + error.message);
      });
    });
  }

  return {
    init: init
  }
})();

function _roomJoined(room) {
  App.activeRoom = room;
  log("Joined as '" + App.identity + "'");
  room.localParticipant.media.attach('#local-media');

  room.participants.forEach(function(participant) {
    log("Already in Room: '" + participant.identity + "'");

    participant.media.attach('#remote-media');
  });

  room.on('participantConnected', function (participant) {
    log("Joining: '" + participant.identity + "'");
    participant.media.attach('#remote-media');
  });

  room.on('participantDisconnected', function (participant) {
    log("Participant '" + participant.identity + "' left the room");
    participant.media.detach();
  });

  room.on('disconnected', function () {
    log('Left');
    room.localParticipant.media.detach();
    room.participants.forEach(function(participant) {
      participant.media.detach();
    });
    App.activeRoom = null;
  });
}

function log(message) {
  console.log(message);
}
