"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movementTypes = exports.playerTypes = exports.messageTypes = void 0;
var messageTypes;
(function (messageTypes) {
    messageTypes["MOVEMENT"] = "movement";
})(messageTypes || (exports.messageTypes = messageTypes = {}));
var playerTypes;
(function (playerTypes) {
    playerTypes["PLAYER1"] = "player1";
    playerTypes["PLAYER2"] = "player2";
})(playerTypes || (exports.playerTypes = playerTypes = {}));
var movementTypes;
(function (movementTypes) {
    movementTypes["LEFT"] = "left";
    movementTypes["RIGHT"] = "right";
    movementTypes["JUMP"] = "jump";
    movementTypes["ATTACK"] = "attack";
})(movementTypes || (exports.movementTypes = movementTypes = {}));
