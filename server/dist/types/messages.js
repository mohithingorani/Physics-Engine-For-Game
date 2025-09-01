"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movementTypes = exports.messageTypes = void 0;
var messageTypes;
(function (messageTypes) {
    messageTypes["MOVEMENT"] = "movement";
})(messageTypes || (exports.messageTypes = messageTypes = {}));
var movementTypes;
(function (movementTypes) {
    movementTypes["LEFT"] = "left";
    movementTypes["RIGHT"] = "right";
    movementTypes["JUMP"] = "jump";
    movementTypes["ATTACK"] = "attack";
})(movementTypes || (exports.movementTypes = movementTypes = {}));
